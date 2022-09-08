from app.models import db, Playdate
from datetime import datetime


def seed_playdates():
    p1 = Playdate(
        sender_pet_id=1,
        receiver_pet_id=5,
        time=datetime(2022, 10, 3, 9, 0, 0),
        location="Hunter's Point South Park Center Blvd. &, 51st Ave, Long Island City, NY 11101",
        detail="Monthly catchup with Mao Dou & Taro.",
        status='Approved',
    )
    
    p2 = Playdate(
        sender_pet_id=1,
        receiver_pet_id=6,
        time=datetime(2022, 10, 3, 9, 0, 0),
        location="Hunter's Point South Park Center Blvd. &, 51st Ave, Long Island City, NY 11101",
        detail="Monthly catchup with Mao Dou & Taro.",
        status='Approved',
    )

    p3 = Playdate(
        sender_pet_id=3,
        receiver_pet_id=1,
        time=datetime(2022, 9, 28, 18, 30, 0),
        location="108 1st St, Jersey City, NJ 07302",
        detail="Explore this new dog park with me.",
        status='Pending',
    )
    
    p4 = Playdate(
        sender_pet_id=4,
        receiver_pet_id=1,
        time=datetime(2022, 10, 4, 9, 0, 0),
        location="308 York St, Jersey City, NJ 07302",
        detail="Mochi and Luna will be a great match.",
        status='Pending',
    )
    
    p5 = Playdate(
        sender_pet_id=1,
        receiver_pet_id=7,
        time=datetime(2022, 11, 4, 9, 0, 0),
        location="308 York St, Jersey City, NJ 07302",
        detail="Let's share our new toys!",
        status='Pending',
    )
    
    p6 = Playdate(
        sender_pet_id=1,
        receiver_pet_id=10,
        time=datetime(2022, 11, 24, 9, 0, 0),
        location="108 1st St, Jersey City, NJ 07302",
        detail="This dog park separate small dogs and big dogs. Let's check it out!",
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
