from flask import Blueprint, request
from flask_restful import Resource, Api, marshal_with, reqparse, inputs
from sqlalchemy import func, sql
from sqlalchemy.orm import aliased

from flask_login import current_user

from .model import *
from backend.deals.model import Booking
from backend.database import db
from backend.utils import staff_required

products = Blueprint('products', __name__)
api = Api(products)


def get_products_with_is_booking(product_id=None):
    is_booking_case = sql.expression.case((func.count(Booking.booking_id) > 0, "true"), else_="false")
    query = db.session.query(Product, func.count(Booking.booking_id), is_booking_case). \
        outerjoin(Booking, Product.product_id == Booking.product_id). \
        group_by(Product.product_id)
    if product_id is None:
        return query.all()
    else:
        return query.filter(Product.product_id == product_id).first_or_404()


class ProductListView(Resource):
    @marshal_with(product_fields_small)
    def get(self):
        q = get_products_with_is_booking()

        out = []
        for prod, queue, book in q:
            prod.is_booking = queue > 0
            out.append(prod)
        return out


class ProductView(Resource):
    @marshal_with(product_fields)
    def get(self, product_id):
        prod, queue, book = get_products_with_is_booking(product_id)

        prod.queue_len = queue
        prod.is_booking = queue > 0
        cnt = db.session.query(func.count()).filter(Booking.user_id == current_user.user_id,
                                                    Booking.product_id == product_id).first()
        prod.you_booked = cnt[0] > 0
        return prod


api.add_resource(ProductListView, '/')
api.add_resource(ProductView, '/<int:product_id>/')
