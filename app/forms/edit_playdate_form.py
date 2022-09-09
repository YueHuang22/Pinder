from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from datetime import datetime

def validate_time(form, field):
    if field.data <= datetime.now():
        raise ValidationError("Please enter a future time.")

class EditPlaydateForm(FlaskForm):
    location = StringField('location', validators=[DataRequired(message="Please enter location for playdate.")])
    time = DateTimeField('time', format="%m/%d/%Y, %I:%M:%S %p", validators=[DataRequired(message="Please enter time for playdate."), validate_time])
    detail = StringField('detail', validators=[DataRequired(message="Please enter detail for playdate.")])

        