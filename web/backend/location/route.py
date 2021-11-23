from flask import Blueprint
from flask_restful import Resource, Api, marshal_with, reqparse


from backend.product.model import Location, location_fields
from backend.database import db
from backend.utils import staff_required

locations = Blueprint('locations', __name__)
api = Api(locations)


class LocationListView(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str, required=True)

    @marshal_with(location_fields)
    def get(self):
        return Location.query.all()

    @staff_required
    @marshal_with(location_fields)
    def post(self):
        args = self.parser.parse_args()
        location = Location(name=args['name'])
        db.session.add(location)
        db.session.commit()
        return location, 201


class LocationView(Resource):
    @marshal_with(location_fields)
    def get(self, location_id):
        return Location.query.get_or_404(location_id)

    @staff_required
    def delete(self, location_id):
        Location.query.get_or_404(location_id)
        db.session.query(Location).filter_by(location_id=location_id).delete()
        db.session.commit()
        return '', 204


api.add_resource(LocationListView, '/')
api.add_resource(LocationView, '/<int:location_id>/')