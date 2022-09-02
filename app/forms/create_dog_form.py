from flask_wtf import FlaskForm
from wtforms import StringField, DateField, FloatField, SelectField
from wtforms.validators import DataRequired, NumberRange


class CreateDogForm(FlaskForm):
    name = StringField('name', validators=[
                       DataRequired(), ])
    birthday = DateField('birthday', validators=[DataRequired()])
    weight = FloatField('weight', validators=[DataRequired(), NumberRange(
        min=0, max=None, message='Weight must be positive')])
    breed = StringField('breed', validators=[DataRequired()])
    gender = SelectField('gender', choices=[
                         'Female', 'Male'], validators=[DataRequired()])
    fixed = SelectField('fixed', choices=[
        'Spayed/Neutered', 'Not fixed'], validators=[DataRequired()])
    energy_level = SelectField('energy_level', choices=[
        'Low', 'Medium', 'High'], validators=[DataRequired()])
    description = StringField('description')
    image_url = StringField('image_url', validators=[DataRequired()])
