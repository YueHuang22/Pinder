from flask_wtf import FlaskForm
from wtforms import StringField, DateField, FloatField, BooleanField, IntegerField
from wtforms.validators import DataRequired, NumberRange


class CreateDogForm(FlaskForm):
    name = StringField('name', validators=[
                       DataRequired(), ])
    birthday = DateField('birthday', validators=[DataRequired()])
    weight = FloatField('weight', validators=[DataRequired(), NumberRange(
        min=0, max=None, message='Price must be positive')])
    breed = StringField('breed', validators=[DataRequired()])
    gender = StringField('gender', validators=[DataRequired()])
    fixed = BooleanField('fixed', validators=[DataRequired()])
    energy_level = StringField('energy_level', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
