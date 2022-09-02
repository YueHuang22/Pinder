from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, SelectField
from wtforms.validators import DataRequired


class CreatePlaydateForm(FlaskForm):
    time = DateTimeField('time', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    detail = StringField('detail', validators=[DataRequired()])
    status = SelectField('status', choices=[
        'Pending', 'Approved'], validators=[DataRequired()])
