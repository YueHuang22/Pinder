from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Yue', last_name='Huang',  email='demo@aa.io', password='password')
    tony = User(
        first_name='Tony', last_name='Seok',  email='tony@aa.io', password='password')
    vivian = User(
        first_name='Vivian', last_name='Wang',  email='vivian@aa.io', password='password')
    lena = User(
        first_name='Lena', last_name='Li',  email='lena@aa.io', password='password')
    christine = User(
        first_name='Christine', last_name='Cai',  email='christine@aa.io', password='password')
    ni = User(
        first_name='Wennie', last_name='Wen',  email='wennie@aa.io', password='password')
    mira = User(
        first_name='Mira', last_name='Zu',  email='mira@aa.io', password='password')
    chao = User(
        first_name='Chao', last_name='Wang',  email='chao@aa.io', password='password')
    yiwei = User(
        first_name='Yiwei', last_name='Zhang',  email='yiwei@aa.io', password='password')
    jing = User(
        first_name='Jing', last_name='Bai',  email='jing@aa.io', password='password')

    db.session.add(demo)
    db.session.add(tony)
    db.session.add(vivian)
    db.session.add(lena)
    db.session.add(christine)
    db.session.add(ni)
    db.session.add(mira)
    db.session.add(chao)
    db.session.add(yiwei)
    db.session.add(jing)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
