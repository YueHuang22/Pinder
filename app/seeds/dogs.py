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
        image_url='https://i.imgur.com/1wQZ4Fn.jpg',
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
        image_url='https://i.imgur.com/8X5CMvO.jpg',
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
        image_url='https://i.imgur.com/D3rIL7X.jpg',
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
        image_url='https://i.imgur.com/BRKultc.jpg',
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
        image_url='https://i.imgur.com/VWRVtZh.jpg',
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
        image_url='https://i.imgur.com/YpBNLHk.jpg',
        owner_id=4
    )

    d7 = Dog(
        name='Henry',
        birthday=date(2022, 7, 12),
        weight=8,
        breed='Golden Doodle',
        gender='Male',
        fixed=False,
        energy_level='High',
        description='',
        image_url='https://i.imgur.com/jHUMcnR.jpg',
        owner_id=5
    )
    
    d8 = Dog(
        name='Didi',
        birthday=date(2021, 11, 12),
        weight=6,
        breed='Maltipoo',
        gender='Male',
        fixed=True,
        energy_level='High',
        description='',
        image_url='https://i.imgur.com/kJiYx1x.jpg',
        owner_id=6
    )
    
    d9 = Dog(
        name='Miki',
        birthday=date(2019, 10, 12),
        weight=35,
        breed='Westie',
        gender='Male',
        fixed=True,
        energy_level='High',
        description='',
        image_url='https://i.imgur.com/znyDRxa.jpg',
        owner_id=7
    )
    
    d10 = Dog(
        name='Coke',
        birthday=date(2011, 12, 22),
        weight=40,
        breed='Corgi',
        gender='Male',
        fixed=True,
        energy_level='Low',
        description='',
        image_url='https://i.imgur.com/eiVOEk6.jpg',
        owner_id=8
    )

    db.session.add(d1)
    db.session.add(d2)
    db.session.add(d3)
    db.session.add(d4)
    db.session.add(d5)
    db.session.add(d6)
    db.session.add(d7)
    db.session.add(d8)
    db.session.add(d9)
    db.session.add(d10)

    db.session.commit()


def undo_dogs():
    db.session.execute('TRUNCATE dogs RESTART IDENTITY CASCADE;')
    db.session.commit()
