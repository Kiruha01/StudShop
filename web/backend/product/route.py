from flask import Blueprint
from flask_restful import Resource, Api, marshal_with, reqparse
from sqlalchemy import func, sql

from flask_login import current_user

from .model import *
from backend.deals.model import Booking
from backend.database import db
from backend.utils import remove_none_filters
from backend.utils import login_required

from backend.deals.route import BookingListView, ApproveBooking, BookingView

products = Blueprint('products', __name__)
api = Api(products)


def get_products_with_is_booking(product_id=None):
    is_booking_case = sql.expression.case((func.count(Booking.booking_id) > 0, "true"), else_="false")
    query = db.session.query(Product, func.count(Booking.booking_id), is_booking_case). \
        outerjoin(Booking, Product.product_id == Booking.product_id). \
        group_by(Product.product_id)
    if product_id is None:
        return query
    else:
        return query.filter(Product.product_id == product_id)


class ProductListView(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str, required=True)
    parser.add_argument('price', type=float, required=True)
    parser.add_argument('category_id', type=int)
    parser.add_argument('location_id', type=int, required=True)
    parser.add_argument('description', type=str)
    # parser.add_argument('images')

    parser2 = reqparse.RequestParser()
    parser2.add_argument('is_booking')
    parser2.add_argument('my')



    # TODO: переписать
    @marshal_with(product_fields_small)
    def get(self):
        q = get_products_with_is_booking()
        args = remove_none_filters(self.parser2.parse_args())

        out = []
        for prod, queue, book in q:
            prod.is_booking = queue > 0
            if args.get('is_booking') is None or (args.get('is_booking') == 'true') == prod.is_booking:
                if args.get('my') is None or (args.get('my') == 'true' and  prod.owner_id == current_user.user_id):
                    out.append(prod)
        return out

    @login_required
    def post(self):
        # TODO: Add pictures
        args = self.parser.parse_args()
        product = Product(**args, owner_id=current_user.user_id)
        db.session.add(product)
        db.session.commit()
        return product.product_id, 201


class ProductView(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str)
    parser.add_argument('price', type=float)
    parser.add_argument('category_id', type=int)
    parser.add_argument('location_id', type=int)
    parser.add_argument('description', type=str)

    @marshal_with(product_fields)
    def get(self, product_id):
        prod, queue, book = get_products_with_is_booking(product_id).first_or_404()

        prod.queue_len = queue
        prod.is_booking = queue > 0
        try:
            cnt = db.session.query(func.count()).filter(Booking.user_id == current_user.user_id,
                                                        Booking.product_id == product_id).first()
            prod.you_booked = cnt[0] > 0
        except AttributeError:
            prod.you_booked = False
        return prod

    @login_required
    def put(self, product_id):
        prod = Product.query.get_or_404(product_id)
        if prod.owner_id != current_user.user_id:
            return {"message": "Only for owner"}, 403
        args = remove_none_filters(self.parser.parse_args())
        db.session.query(Product).filter_by(product_id=product_id).update(args)
        db.session.commit()
        return '', 204

    @login_required
    def delete(self, product_id):
        prod = Product.query.get_or_404(product_id)
        if prod.owner_id != current_user.user_id:
            return {"message": "Only for owner"}, 403
        db.session.delete(prod)
        db.session.commit()
        return '', 204


class PictureView(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('url', type=str, required=True)

    @login_required
    def post(self, product_id):
        prod = Product.query.get_or_404(product_id)
        if prod.owner_id != current_user.user_id:
            return {"message": "Only for owner"}, 403
        args = self.parser.parse_args()
        pic = Picture(**args, product_id=product_id)
        db.session.add(pic)
        db.session.commit()
        return '', 204


class PictureItemView(Resource):
    @login_required
    def delete(self, product_id, picture_id):
        prod = Product.query.get_or_404(product_id)
        if prod.owner_id != current_user.user_id:
            return {"message": "Only for owner"}, 403
        pic = Picture.query.get_or_404(picture_id)
        db.session.delete(pic)
        db.session.commit()
        return '', 204


api.add_resource(ProductListView, '/')
api.add_resource(ProductView, '/<int:product_id>/')
api.add_resource(PictureView, '/<int:product_id>/pictures/')
api.add_resource(PictureItemView, '/<int:product_id>/pictures/<int:picture_id>/')
api.add_resource(BookingListView, '/<int:product_id>/bookings/')
api.add_resource(ApproveBooking, '/<int:product_id>/bookings/approve/')
api.add_resource(BookingView, '/<int:product_id>/bookings/<int:booking_id>/')
