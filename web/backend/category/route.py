from flask import Blueprint
from flask_restful import Resource, Api, marshal_with, reqparse


from backend.product.model import Category, category_fields
from backend.database import db
from backend.utils import staff_required

categories = Blueprint('categories', __name__)
api = Api(categories)


class CategoriesListView(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str, required=True)

    @marshal_with(category_fields)
    def get(self):
        return Category.query.all()

    @marshal_with(category_fields)
    @staff_required
    def post(self):
        args = self.parser.parse_args()
        category = Category(name=args['name'])
        db.session.add(category)
        db.session.commit()
        return category, 201


class CategoryView(Resource):
    @marshal_with(category_fields)
    def get(self, category_id):
        return Category.query.get_or_404(category_id)

    @staff_required
    def delete(self, category_id):
        Category.query.get_or_404(category_id)
        db.session.query(Category).filter_by(category_id=category_id).delete()
        db.session.commit()
        return '', 204


api.add_resource(CategoriesListView, '/')
api.add_resource(CategoryView, '/<int:category_id>/')

