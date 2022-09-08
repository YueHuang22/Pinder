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
        sender_pet_id=1,
        receiver_pet_id=6,
        time=datetime(2022, 10, 3, 9, 0,),
        location="180 Morgan street",
        detail="Monthly catchup",
        status='Approved',
    )

    p3 = Playdate(
        sender_pet_id=4,
        receiver_pet_id=1,
        time=datetime(2022, 9, 4, 9, 0,),
        location="180 Morgan street",
        detail="Monthly catchup",
        status='Pending',
    )
    
    p4 = Playdate(
        sender_pet_id=5,
        receiver_pet_id=1,
        time=datetime(2022, 10, 14, 9, 0,),
        location="180 Morgan street",
        detail="Monthly catchup",
        status='Pending',
    )
    
    p5 = Playdate(
        sender_pet_id=1,
        receiver_pet_id=7,
        time=datetime(2022, 11, 4, 9, 0,),
        location="180 Morgan street",
        detail="Monthly catchup",
        status='Pending',
    )
    
    p6 = Playdate(
        sender_pet_id=1,
        receiver_pet_id=9,
        time=datetime(2022, 11, 24, 9, 0,),
        location="180 Morgan street",
        detail="Monthly catchup",
        status='Pending',
    )

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    db.session.add(p6)
    db.session.commit()


def undo_playdates():
    db.session.execute('TRUNCATE playdates RESTART IDENTITY CASCADE;')
    db.session.commit()
