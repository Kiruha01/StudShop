import json

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
from .user import users
from .product.route import products
from .user.model import User
from .category.route import categories
from .location.route import locations
from .deals.route import bookings
from .database import db


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
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE'
        return response

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    client = WebApplicationClient(app.config['GOOGLE_CLIENT_ID'])

    @app.route('/hook/')
    def hook():
        user = User.query.get(2)
        login_user(user)
        return '', 204

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
        login_user(user)

        return redirect('/')

    @login_required
    @app.route('/logout')
    def logout():
        logout_user()
        return redirect('/')

    app.register_blueprint(users, url_prefix='/api/user/')
    app.register_blueprint(products, url_prefix='/api/products/')
    app.register_blueprint(categories, url_prefix='/api/categories/')
    app.register_blueprint(locations, url_prefix='/api/locations/')



    with app.app_context():
        db.create_all()  # Create sql tables for our data models

        return app
