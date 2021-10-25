import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from .user import users
from .database import db


def create_app():
    app = Flask(__name__)

    app.config.from_object('config.Config')

    db.init_app(app)
    with app.app_context():
        app.register_blueprint(users, url_prefix='/api/user/')
        db.create_all()  # Create sql tables for our data models

        return app
