from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from datetime import datetime

def validate_time(form, field):
    if field.data <= datetime.now():
        raise ValidationError("Please enter a future time")

class CreatePlaydateForm(FlaskForm):
    location = StringField('location', validators=[DataRequired(message="Please enter location for playdate.")])
    time = DateTimeField('time', format="%m/%d/%Y, %H:%M:%S %p", validators=[DataRequired(message="Please enter time for playdate."), validate_time])
    detail = StringField('detail', validators=[DataRequired(message="Please enter detail for playdate.")])
    sender_pet_id = StringField('sender_pet_id', validators=[DataRequired(message="Please select a sender for playdate.")])
    receiver_pet_id = StringField('receiver_pet_id', validators=[DataRequired()])