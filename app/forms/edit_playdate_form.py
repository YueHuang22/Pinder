from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from datetime import datetime

class EditPlaydateForm(FlaskForm):
    time = DateTimeField('time', format="%m/%d/%Y, %H:%M:%S %p", validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    detail = StringField('detail', validators=[DataRequired()])

    def validate_time(form, field):
        if field.data <= datetime.now():
            raise ValidationError("Time need to be in the future")
        