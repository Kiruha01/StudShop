from flask import Blueprint
from flask_restful import Resource, Api, marshal_with, reqparse
from flask_login import login_required, current_user

from .model import Booking, booking_fields
from backend.database import db
from backend.utils import staff_required

bookings = Blueprint('products', __name__)
api = Api(bookings)


class BookingListView(Resource):
    @login_required
    @marshal_with(booking_fields)
    def get(self, product_id):
        return Booking.query.filter_by(product_id=product_id).all()

    @login_required
    def post(self, product_id):
        if Booking.query.filter_by(product_id=product_id, user_id=current_user.user_id).first():
            return {'message': 'Already booked by you'}, 409

        book = Booking(user_id=current_user.user_id, product_id=product_id)
        db.session.add(book)
        db.session.commit()
        return book.booking_id, 201

    @login_required
    def delete(self, product_id):
        book = Booking.query.filter_by(product_id=product_id, user_id=current_user.user_id).first()
        if book:
            db.session.delete(book)
            db.session.commit()
            return '', 204
        else:
            return {'message': 'Not booked'}, 409


