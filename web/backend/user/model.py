import datetime
import os

import jwt

from backend.database import db
from flask_login import UserMixin
from flask_restful import fields


class User(db.Model, UserMixin):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(25), unique=True, nullable=False)
    com_method = db.Column(db.String(100), nullable=False)
    is_staff = db.Column(db.Boolean, nullable=False, server_default='f')

    def get_id(self):
        return self.user_id

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=10),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                os.getenv('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, os.getenv('SECRET_KEY'), algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'


user_fields = {
    'user_id': fields.Integer,
    'name': fields.String,
    'email': fields.String,
    'com_method': fields.String,
    'is_staff': fields.Boolean
}
