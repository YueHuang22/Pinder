from app.models.db import db


class Playdate(db.Model):
    __tablename__ = 'playdates'

    id = db.Column(db.Integer, primary_key=True)
    sender_pet_id = db.Column(
        db.Integer, db.ForeignKey("dogs.id"), nullable=False)
    receiver_pet_id = db.Column(
        db.Integer, db.ForeignKey("dogs.id"), nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(300), nullable=False)
    detail = db.Column(db.String(450), nullable=False)
    status = db.Column(db.String(20), nullable=False)

    sender = db.relationship("Dog", foreign_keys=[
                             sender_pet_id], backref="playdates_sent")
    receiver = db.relationship(
        "Dog", foreign_keys=[receiver_pet_id], backref="playdates_received")

    def to_dict(self):
        return {
            'id': self.id,
            'senderPetId': self.sender_pet_id,
            'receiverPetId': self.receiver_pet_id,
            'time': self.time,
            'location': self.location,
            'detail': self.detail,
            'status': self.status,
            'sender': self.sender.to_dict_no_additions(),
            'receiver': self.receiver.to_dict_no_additions(),
        }

    def to_dict_no_additions(self):
        return {
            'id': self.id,
            'senderPetId': self.sender_pet_id,
            'receiverPetId': self.receiver_pet_id,
            'time': self.time,
            'location': self.location,
            'detail': self.detail,
            'status': self.status,
        }
