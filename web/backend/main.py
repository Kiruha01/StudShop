import os

from flask import Flask

from .user import users


def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.register_blueprint(users, url_prefix='/api/user/')

    return app
