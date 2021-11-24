from backend.database import db
from backend.user.model import User, user_fields
from backend.product.model import Product, product_fields_small
from flask_restful import fields

from sqlalchemy import func, UniqueConstraint


class MyDateFormat(fields.Raw):
    def format(self, value):
        return value.strftime('%Y.%m.%d - %H:%m')


class Booking(db.Model):
    __tablename__ = 'booking'
    booking_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey(User.user_id, ondelete='CASCADE'), nullable=False)
    user = db.relationship(User, backref='bookings')
    product_id = db.Column(db.ForeignKey(Product.product_id, ondelete='CASCADE'), nullable=False)
    product = db.relationship(Product, backref='bookings')
    date = db.Column(db.DateTime, nullable=False, server_default=func.now())
    __table_args__ = (UniqueConstraint('user_id', 'product_id', name='_booking_user_product_uc'),
                      )


booking_fields = {
    'booking_id': fields.Integer,
    'product': fields.Nested(product_fields_small),
    'user': fields.Nested(user_fields),
    'date': MyDateFormat
}


class Deal(db.Model):
    __tablename__ = 'deals'
    deal_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey(User.user_id, ondelete='CASCADE'), nullable=False)
    user = db.relationship(User, backref='deals')
    product_id = db.Column(db.ForeignKey(Product.product_id, ondelete='CASCADE'), nullable=False)
    product = db.relationship(Product)
    date = db.Column(db.DateTime, nullable=False)
    __table_args__ = (UniqueConstraint('user_id', 'product_id', name='_deals_user_product_uc'),
                      )


deal_fields = {
    'deal_id': fields.Integer,
    'product': fields.Nested(product_fields_small),
    'user': fields.Nested(user_fields),
    'date': MyDateFormat
}
