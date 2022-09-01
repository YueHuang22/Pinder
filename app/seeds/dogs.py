from app.models import db, Dog
from datetime import date


def seed_dogs():
    d1 = Dog(
        name='Mochi',
        birthday=date(2021, 1, 16),
        weight=18,
        breed='American Eskimo',
        gender='Male',
        fixed=True,
        energy_level='Medium',
        description='Mochi is very friendly',
        image_url='https://i.pinimg.com/originals/0a/66/80/0a6680651b7139d63e66b95f5e376151.jpg',
        owner_id=1
    )

    d2 = Dog(
        name='Truffle',
        birthday=date(2021, 11, 28),
        weight=4,
        breed='Chihuahua',
        gender='Male',
        fixed=True,
        energy_level='High',
        description='Mochi is shy at first',
        image_url='https://i.pinimg.com/originals/0a/66/80/0a6680651b7139d63e66b95f5e376151.jpg',
        owner_id=1
    )

    db.session.add(d1)
    db.session.add(d2)

    db.session.commit()


def undo_dogs():
    db.session.execute('TRUNCATE dogs RESTART IDENTITY CASCADE;')
    db.session.commit()
