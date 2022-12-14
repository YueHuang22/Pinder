from app.models.db import db
from dateutil import tz

class Playdate(db.Model):
    __tablename__ = 'playdates'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(255), nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    detail = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    sender_pet_id = db.Column(
        db.Integer, db.ForeignKey("dogs.id", ondelete="cascade"), nullable=False)
    receiver_pet_id = db.Column(
        db.Integer, db.ForeignKey("dogs.id", ondelete="cascade"), nullable=False)
    
    sender = db.relationship("Dog", foreign_keys=[
                             sender_pet_id], backref=db.backref("playdates_sent", cascade="all, delete-orphan"))
    receiver = db.relationship(
        "Dog", foreign_keys=[receiver_pet_id], backref=db.backref("playdates_received", cascade="all, delete-orphan"))

    def to_dict(self):
        return {
            'id': self.id,
            'location': self.location,
            'time': self.time.replace(tzinfo=tz.gettz('US/Eastern')),
            'detail': self.detail,
            'status': self.status,
            'senderPetId': self.sender_pet_id,
            'receiverPetId': self.receiver_pet_id,
            'sender': self.sender.to_dict_no_additions(),
            'receiver': self.receiver.to_dict_no_additions(),
        }

    def to_dict_no_additions(self):
        return {
            'id': self.id,
            'location': self.location,
            'time': self.time.replace(tzinfo=tz.gettz('US/Eastern')),
            'detail': self.detail,
            'status': self.status,
            'senderPetId': self.sender_pet_id,
            'receiverPetId': self.receiver_pet_id,
        }
