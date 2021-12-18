import json
import os

import requests as requests
from flask import Flask, request, redirect
from oauthlib.oauth2 import WebApplicationClient
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)

import config
from backend.user.route import users
from backend.product.route import products
from backend.user.model import User
from backend.category.route import categories, Category
from backend.location.route import locations, Location
from backend.database import db


def get_google_provider_cfg():
    return requests.get(config.Config.GOOGLE_DISCOVERY_URL).json()


def create_app():
    app = Flask(__name__)

    app.config.from_object('config.Config')
    db.init_app(app)

    login_manager = LoginManager()
    login_manager.init_app(app)

    @app.after_request
    def apply_caching(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,authorization"
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

    @login_manager.request_loader
    def load_user_from_request(request):
        auth_header = request.headers.get('Authorization')
        user_id = User.decode_auth_token(auth_header)
        if isinstance(user_id, str):
            return None
        user = User.query.get_or_404(user_id)
        return user

    client = WebApplicationClient(app.config['GOOGLE_CLIENT_ID'])

    @app.route("/")
    def index():
        if current_user.is_authenticated:
            return (
                "<p>Hello, {}! You're logged in! Email: {}</p>"
                "<div><p>Google Profile Picture:</p>"
                '</div>'
                '<a class="button" href="/logout">Logout</a>'.format(
                    current_user.name, current_user.email
                )
            )
        else:
            return '<a class="button" href="/login">Google Login</a>'

    @app.route("/login")
    def login():
        # Find out what URL to hit for Google login
        google_provider_cfg = get_google_provider_cfg()
        authorization_endpoint = google_provider_cfg["authorization_endpoint"]

        # Use library to construct the request for Google login and provide
        # scopes that let you retrieve user's profile from Google
        request_uri = client.prepare_request_uri(
            authorization_endpoint,
            redirect_uri=request.base_url + "/callback",
            scope=["openid", "email", "profile"],
        )
        return redirect(request_uri)

    @app.route("/login/callback")
    def callback():
        # Get authorization code Google sent back to you
        code = request.args.get("code")
        google_provider_cfg = get_google_provider_cfg()
        token_endpoint = google_provider_cfg["token_endpoint"]

        print(code)

        token_url, headers, body = client.prepare_token_request(
            token_endpoint,
            authorization_response=request.url,
            redirect_url=request.base_url,
            code=code
        )

        token_response = requests.post(
            token_url,
            headers=headers,
            data=body,
            auth=(config.Config.GOOGLE_CLIENT_ID, config.Config.GOOGLE_CLIENT_SECRET),
        )
        client.parse_request_body_response(json.dumps(token_response.json()))
        userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
        uri, headers, body = client.add_token(userinfo_endpoint)
        userinfo_response = requests.get(uri, headers=headers, data=body)

        users_email = userinfo_response.json()["email"]
        users_name = userinfo_response.json()["name"]

        user = User.query.filter_by(email=users_email).first()

        if not user:
            user = User(name=users_name, email=users_email, com_method=users_email)
            db.session.add(user)
            db.session.commit()
        token = user.encode_auth_token(user.user_id)

        return redirect('http://localhost?token=' + token)

    @login_required
    @app.route('/logout')
    def logout():
        logout_user()
        return redirect('/')

    app.register_blueprint(users, url_prefix='/api/user/')
    app.register_blueprint(products, url_prefix='/api/products/')
    app.register_blueprint(categories, url_prefix='/api/categories/')
    app.register_blueprint(locations, url_prefix='/api/locations/')

    @app.cli.command()
    def recreate_db():
        db.drop_all()
        db.create_all()

    @app.cli.command()
    def make_admin():
        db.session.query(User).update({"is_admin": True})
        db.session.commit()

    @app.cli.command()
    def create_data():
        db.session.add(Location(name="ПУНК"))
        db.session.add(Location(name="ВУНК"))
        db.session.add(Location(name="ДУНК"))

        db.session.add(Category(name="Одежда"))
        db.session.add(Category(name="Техника"))
        db.session.add(Category(name="Канцелярия"))
        db.session.add(Category(name="Продукты"))
        db.session.add(Category(name="Услуги"))
        db.session.add(Category(name="Учёба"))
        db.session.add(Category(name="Проездной"))

        db.session.commit()

    with app.app_context():
        db.create_all()  # Create sql tables for our data models

        return app
