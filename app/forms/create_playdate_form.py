from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from datetime import datetime

class CreatePlaydateForm(FlaskForm):
    sender_pet_id = StringField('sender_pet_id', validators=[DataRequired()])
    receiver_pet_id = StringField('receiver_pet_id', validators=[DataRequired()])
    time = DateTimeField('time', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    detail = StringField('detail', validators=[DataRequired()])

    def validate_time(form, field):
        if field.data <= datetime.now():
            raise ValidationError("Time need to be in the future")