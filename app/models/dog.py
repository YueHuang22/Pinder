from app.models.db import db


class Dog(db.Model):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    breed = db.Column(db.String(35), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    fixed = db.Column(db.Boolean, nullable=False)
    energy_level = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(300), nullable=True)
    image_url = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates='dogs')

    # playdates_sent = db.relationship("Playdate",  back_populates="sender")
    # playdates_received = db.relationship("Playdate", back_populates="receiver")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'birthday': f"{self.birthday.year}-{self.birthday.month:02}-{self.birthday.day:02}",
            'weight': self.weight,
            'breed': self.breed,
            'gender': self.gender,
            'fixed': self.fixed,
            'energyLevel': self.energy_level,
            'description': self.description,
            'imageUrl': self.image_url,
            'ownerId': self.owner_id,
            'owner': self.user.to_dict_no_additions(),
            # 'playdates': [p.to_dict_no_additions() for p in self.playdates]
        }

    def to_dict_no_additions(self):
        return {
            'id': self.id,
            'name': self.name,
            'birthday': str(self.birthday),
            'weight': self.weight,
            'breed': self.breed,
            'gender': self.gender,
            'fixed': self.fixed,
            'energyLevel': self.energy_level,
            'description': self.description,
            'imageUrl': self.image_url,
            'ownerId': self.owner_id,
        }
