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


user_fields = {
    'user_id': fields.Integer,
    'name': fields.String,
    'email': fields.String,
    'com_method': fields.String,
    'is_staff': fields.Boolean
}
