from backend.database import db
from backend.user.model import User


class Category(db.Model):
    __tablename__ = 'category'
    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)


class Location(db.Model):
    __tablename__ = 'location'
    location_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)


class Product(db.Model):
    __tablename__ = 'product'
    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Integer, nullable=False),
    description = db.Column(db.Text)
    category_id = db.Column(db.ForeignKey(Category.category_id), nullable=True)
    location_id = db.Column(db.ForeignKey(Location.location_id), nullable=False)
    owner_id = db.Column(db.ForeignKey(User.user_id), nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    is_approved = db.Column(db.Boolean, default=False, nullable=False)


class Picture(db.Model):
    __tablename__ = 'picture'
    picture_id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(100), nullable=False)
    product_id = db.Column(db.ForeignKey(Product.product_id, ondelete='CASCADE'), nullable=False)
