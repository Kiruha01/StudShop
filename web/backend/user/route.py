from flask import Blueprint, redirect, url_for, request

from flask_restful import Resource, Api

users = Blueprint('auth_users', __name__)
api = Api(users)


class UserView(Resource):
    def get(self):
        return {
            'user': 'Flask'
        }


api.add_resource(UserView, '/')