from backend.database import db
from backend.user.model import User, user_fields

from flask_restful import fields


class Category(db.Model):
    __tablename__ = 'category'
    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)


category_fields = {
    'category_id': fields.Integer,
    'name': fields.String
}


class Location(db.Model):
    __tablename__ = 'location'
    location_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)


location_fields = {
    'location_id': fields.Integer,
    'name': fields.String
}


#TODO: переписать с ассоциативной таблицей с пользователми, которые забронировали: users = db.relationship()
class Product(db.Model):
    __tablename__ = 'product'
    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Numeric(7, 2), nullable=False)
    description = db.Column(db.Text)
    category_id = db.Column(db.ForeignKey(Category.category_id), nullable=True)
    category = db.relationship(Category)
    location_id = db.Column(db.ForeignKey(Location.location_id), nullable=False)
    location = db.relationship(Location)
    owner_id = db.Column(db.ForeignKey(User.user_id), nullable=False)
    owner = db.relationship(User)
    is_active = db.Column(db.Boolean, server_default='t', nullable=False)
    is_approved = db.Column(db.Boolean, server_default='f', nullable=False)
    pictures = db.relationship("Picture", lazy="joined", backref='product')


class Picture(db.Model):
    __tablename__ = 'picture'
    picture_id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(100), nullable=False)
    product_id = db.Column(db.ForeignKey(Product.product_id, ondelete='CASCADE'), nullable=False)


picture_field = {
    'picture_id': fields.Integer,
    'url': fields.String,
}

product_fields_small = {
    'product_id': fields.Integer,
    'name': fields.String,
    'price': fields.Float,
    'location': fields.Nested(location_fields),
    'owner': fields.Nested(user_fields),
    'pictures': fields.Nested(picture_field, allow_null=True),
    'is_booking': fields.Boolean,
}
product_fields = product_fields_small.copy()


product_fields.update({
    'description': fields.String,
    "queue_len": fields.Integer,
    "you_booked": fields.Boolean,
    "category": fields.Nested(category_fields, allow_null=True)
})
