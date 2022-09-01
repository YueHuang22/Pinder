from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def validate_email(form, field):
    email = field.data
    if '@' not in email:
        raise ValidationError("Invalid email address.")


def password_length(form, field):
    password = field.data
    if len(password) < 6:
        raise ValidationError("Password must be 6 characters or more.")


# def social_exists(form, field):
#     social_url = field.data
#     user = User.query.filter(User.social_url == social_url).first()
#     if user:
#         raise ValidationError('Social account is already in use.')


def is_img(form, field):
    image_url = field.data
    if (image_url):
        if ('.jpg'not in image_url) and ('.jpeg'not in image_url) and ('.png'not in image_url) and ('.webp'not in image_url) and ('.gif'not in image_url) and ('.svg' not in image_url):
            raise ValidationError("Invalid image URL.")


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, validate_email])
    password = StringField('password', validators=[
                           DataRequired(), password_length])
    image_url = StringField('image_url', validators=[is_img])
    social_url = StringField('social_url',)
