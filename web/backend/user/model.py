from backend.database import db


class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(25), unique=True, nullable=False)
    com_method = db.Column(db.String(100), nullable=False)
    is_staff = db.Column(db.Boolean, nullable=False, default=False)
