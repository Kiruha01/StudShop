from flask import Blueprint
from flask_restful import Resource, Api, marshal_with, reqparse
from flask_login import login_required, current_user
from sqlalchemy import desc

from .model import Booking, booking_fields, Deal
from backend.database import db
from backend.utils import staff_required
from backend.product.model import Product

bookings = Blueprint('products', __name__)
api = Api(bookings)


class BookingListView(Resource):
    @login_required
    @marshal_with(booking_fields)
    def get(self, product_id):
        Product.query.get_or_404(product_id)
        return Booking.query.filter_by(product_id=product_id).all()

    @login_required
    def post(self, product_id):
        Product.query.get_or_404(product_id)
        if Booking.query.filter_by(product_id=product_id, user_id=current_user.user_id).first():
            return {'message': 'Already booked by you'}, 409

        book = Booking(user_id=current_user.user_id, product_id=product_id)
        db.session.add(book)
        db.session.commit()
        return book.booking_id, 201

    @login_required
    def delete(self, product_id):
        Product.query.get_or_404(product_id)
        book = Booking.query.filter_by(product_id=product_id, user_id=current_user.user_id).first()
        if book:
            db.session.delete(book)
            db.session.commit()
            return '', 204
        else:
            return {'message': 'Not booked'}, 409


class BookingView(Resource):
    @login_required
    @marshal_with(booking_fields)
    def get(self, product_id, booking_id):
        return Booking.query.get_or_404(booking_id)

    @login_required
    def delete(self, product_id, booking_id):
        prod = Product.query.get_or_404(product_id)
        if prod.owner_id != current_user.user_id:
            return {"message": "Only for owner"}, 403
        Booking.query.get_or_404(booking_id)
        db.session.query(Booking).filter_by(booking_id=booking_id).delete()
        return '', 204


class ApproveBooking(Resource):
    @login_required
    @marshal_with(booking_fields)
    def get(self, product_id):
        Product.query.get_or_404(product_id)
        booking = Booking.query.filter_by(product_id=product_id).order_by(Booking.date).first()
        try:
            deal = Deal(user_id=booking.product.owner_id, product_id=booking.product_id, date=booking.date)
            db.session.add(deal)
            db.session.query(Booking).filter_by(product_id=product_id).delete()
            ## TODO: Disable advert
            db.session.commit()
        except:
            db.session.rollback()
            return {'message': "unexpected error"}, 400
        return '', 204

