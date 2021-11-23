from flask import Blueprint, redirect, url_for, request
from flask_restful import Resource, Api, marshal_with, reqparse, inputs
from flask_login import login_required, current_user

from .model import User, user_fields
from backend.database import db
from backend.utils import staff_required

from backend.deals.model import Deal, deal_fields


users = Blueprint('auth_users', __name__)
api = Api(users)


class UserView(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('com_method', type=str)

    @login_required
    @marshal_with(user_fields)
    def get(self):
        return current_user

    @login_required
    def put(self):
        args = self.parser.parse_args()
        com_method = args['com_method'] or current_user.com_method
        current_user.com_method = com_method
        db.session.add(current_user)
        db.session.commit()
        return '', 204


class UserViewById(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('is_staff', type=inputs.boolean)

    @marshal_with(user_fields)
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return user

    @staff_required
    def put(self, user_id):
        user = User.query.get_or_404(user_id)
        is_staff = self.parser.parse_args()['is_staff']
        if is_staff is not None:
            user.is_staff = is_staff
            db.session.commit()
        return '', 204


class UserDealsViewById(Resource):
    @marshal_with(deal_fields)
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return user.deals


api.add_resource(UserView, '/')
api.add_resource(UserViewById, '/<int:user_id>/')
api.add_resource(UserDealsViewById, '/<int:user_id>/deals/')


