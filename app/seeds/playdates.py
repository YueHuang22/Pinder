from app.models import db, Playdate
from datetime import datetime


def seed_playdates():
    p1 = Playdate(
        sender_pet_id=1,
        receiver_pet_id=3,
        time=datetime(2022, 9, 3, 9, 0,),
        location="180 Morgan street",
        detail="Monthly catchup",
        status='Approved',
    )

    p2 = Playdate(
        sender_pet_id=4,
        receiver_pet_id=1,
        time=datetime(2022, 9, 4, 9, 0,),
        location="180 Morgan street",
        detail="Monthly catchup",
        status='Pending',
    )

    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()


def undo_playdates():
    db.session.execute('TRUNCATE playdates RESTART IDENTITY CASCADE;')
    db.session.commit()
