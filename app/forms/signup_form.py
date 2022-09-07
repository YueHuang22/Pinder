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


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired( message="Please enter your first name.")])
    last_name = StringField('last_name', validators=[DataRequired( message="Please enter your last name.")])
    email = StringField('email', validators=[
                        DataRequired(message="Please enter your email."), user_exists, validate_email])
    password = StringField('password', validators=[
                           DataRequired(message="Please enter your password."), password_length])

