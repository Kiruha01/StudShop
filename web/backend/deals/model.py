from backend.database import db
from backend.user.model import User
from backend.product.model import Product

from sqlalchemy import func, UniqueConstraint


class Booking(db.Model):
    __tablename__ = 'booking'
    booking_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey(User.user_id, ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.ForeignKey(Product.product_id, ondelete='CASCADE'), nullable=False)
    date = db.Column(db.DateTime, nullable=False, server_default=func.now())
    __table_args__ = (UniqueConstraint('user_id', 'product_id', name='_booking_user_product_uc'),
                      )


class Deal(db.Model):
    __tablename__ = 'deals'
    booking_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey(User.user_id, ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.ForeignKey(Product.product_id, ondelete='CASCADE'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    __table_args__ = (UniqueConstraint('user_id', 'product_id', name='_deals_user_product_uc'),
                      )
