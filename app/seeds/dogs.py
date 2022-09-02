from app.models import db, Dog
from datetime import date


def seed_dogs():
    d1 = Dog(
        name='Mochi',
        birthday=date(2021, 1, 14),
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
        description='Truffle is shy at first',
        image_url='https://i.pinimg.com/originals/0a/66/80/0a6680651b7139d63e66b95f5e376151.jpg',
        owner_id=1
    )

    d3 = Dog(
        name='Maui',
        birthday=date(2016, 6, 28),
        weight=60,
        breed='Doberman',
        gender='Male',
        fixed=True,
        energy_level='High',
        description='',
        image_url='https://i.pinimg.com/originals/0a/66/80/0a6680651b7139d63e66b95f5e376151.jpg',
        owner_id=2
    )

    d4 = Dog(
        name='Luna',
        birthday=date(2021, 3, 22),
        weight=16,
        breed='Jindo',
        gender='Female',
        fixed=True,
        energy_level='Low',
        description='',
        image_url='https://i.pinimg.com/originals/0a/66/80/0a6680651b7139d63e66b95f5e376151.jpg',
        owner_id=3
    )

    d5 = Dog(
        name='Maodou',
        birthday=date(2020, 4, 22),
        weight=25,
        breed='Pomsky',
        gender='Male',
        fixed=True,
        energy_level='High',
        description='',
        image_url='https://i.pinimg.com/originals/0a/66/80/0a6680651b7139d63e66b95f5e376151.jpg',
        owner_id=4
    )

    d6 = Dog(
        name='Taro',
        birthday=date(2021, 5, 10),
        weight=28,
        breed='Pomsky',
        gender='Male',
        fixed=True,
        energy_level='Medium',
        description='',
        image_url='https://i.pinimg.com/originals/0a/66/80/0a6680651b7139d63e66b95f5e376151.jpg',
        owner_id=4
    )

    d7 = Dog(
        name='Yellow',
        birthday=date(2022, 7, 12),
        weight=8,
        breed='Golden Doodle',
        gender='Male',
        fixed=False,
        energy_level='High',
        description='',
        image_url='https://i.pinimg.com/originals/0a/66/80/0a6680651b7139d63e66b95f5e376151.jpg',
        owner_id=5
    )

    db.session.add(d1)
    db.session.add(d2)
    db.session.add(d3)
    db.session.add(d4)
    db.session.add(d5)
    db.session.add(d6)
    db.session.add(d7)

    db.session.commit()


def undo_dogs():
    db.session.execute('TRUNCATE dogs RESTART IDENTITY CASCADE;')
    db.session.commit()
