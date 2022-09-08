from flask_wtf import FlaskForm
from wtforms import StringField, DateField, FloatField, BooleanField, SelectField
from wtforms.validators import DataRequired, NumberRange, ValidationError
from datetime import date

def is_img(form, field):
    image_url = field.data
    if (image_url):
        if ('.jpg'not in image_url) and ('.jpeg'not in image_url) and ('.png'not in image_url) and ('.webp'not in image_url) and ('.gif'not in image_url) and ('.svg' not in image_url):
            raise ValidationError("Invalid image URL.")
        
def validate_birthday(form, field):
    if field.data >= date.today():
        raise ValidationError("Invalid birthday input.")
        
class EditDogForm(FlaskForm):
  name = StringField('name', validators=[
                       DataRequired(message="Please enter name for your dog."), ])
  birthday = DateField('birthday', validators=[DataRequired(message="Please enter birthday for your dog."), validate_birthday])
  weight = FloatField('weight', validators=[DataRequired(message="Please enter weight for your dog."), NumberRange(
        min=0, max=None, message='Invalid weight amount.')])
  breed = StringField('breed', validators=[DataRequired(message="Please enter breed for your dog.")])
  gender = SelectField('gender', choices=[
                         'Female', 'Male'], validators=[DataRequired(message="Please enter gender for your dog.")])
  fixed = BooleanField("fixed", validators=[DataRequired(message="Is your dog fixed? Please enter.")])
  energy_level = SelectField('energy_level', choices=[
        'Low', 'Medium', 'High'], validators=[DataRequired(message="Please enter energy level for your dog.")])
  description = StringField('description')
  image_url = StringField('image_url', validators=[DataRequired(message="Please upload image for your dog."), is_img])
