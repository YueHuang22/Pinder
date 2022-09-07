from flask_wtf import FlaskForm
from wtforms import StringField, DateField, FloatField, SelectField
from wtforms.validators import DataRequired, NumberRange, ValidationError

def is_img(form, field):
    image_url = field.data
    if (image_url):
        if ('.jpg'not in image_url) and ('.jpeg'not in image_url) and ('.png'not in image_url) and ('.webp'not in image_url) and ('.gif'not in image_url) and ('.svg' not in image_url):
            raise ValidationError("Invalid image URL.")
        
class EditDogForm(FlaskForm):
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
