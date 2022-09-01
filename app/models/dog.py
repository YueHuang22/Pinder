from app.models.db import db


class Dog(db.Model):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(35), nullable=False)
    birthday = db.Column(db.DateTime, nullable=False)
    weight = db.Column(db.Float(precision=2, asdecimal=False), nullable=False)
    breed = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    fixed = db.Column(db.Boolean, nullable=False)
    energy_level = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(300), nullable=True)
    image_url = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates='dogs')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'birthday': self.birthday,
            'weight': self.weight,
            'breed': self.breed,
            'gender': self.gender,
            'fixed': self.fixed,
            'energyLevel': self.energy_level,
            'description': self.description,
            'imageUrl': self.image_url,
            'ownerId': self.owner_id,
            'owner': self.user.to_dict_no_additions(),
        }

    def to_dict_no_additions(self):
        return {
            'id': self.id,
            'name': self.name,
            'birthday': self.birthday,
            'weight': self.weight,
            'breed': self.breed,
            'gender': self.gender,
            'fixed': self.fixed,
            'energyLevel': self.energy_level,
            'description': self.description,
            'imageUrl': self.image_url,
            'ownerId': self.owner_id,
        }
