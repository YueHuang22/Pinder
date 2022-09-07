from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Playdate
from app.forms import CreatePlaydateForm, EditPlaydateForm
from app.api.auth_routes import validation_errors_to_error_messages

playdate_routes = Blueprint('playdates', __name__)


@playdate_routes.route('')
@login_required
def get_playdates():
    dogs = current_user.dogs
    playdates = []
    for dog in dogs:
        for date in dog.playdates_sent:
            date_details = date.to_dict_no_additions()
            date_details["playmate"] = date.receiver.to_dict()
            playdates.append(date_details)
        for date in dog.playdates_received:
            date_details = date.to_dict_no_additions()
            date_details["playmate"] = date.sender.to_dict()
            playdates.append(date_details)
    return {"playdates": playdates}


@playdate_routes.route('/<int:id>')
@login_required
def get_playdate_by_id(id):
    playdate = Playdate.query.get(id)

    if playdate:
        return playdate.to_dict()
    else:
        return {"message": "Playdate not found"}, 404


@playdate_routes.route('', methods=["POST"])
@login_required
def create_playdate():
    form = CreatePlaydateForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        user = current_user
        new_playdate = Playdate(time=data['time'],
                                location=data['location'],
                                detail=data['detail'],
                                status="Pending",
                                sender_pet_id=data['sender_pet_id'],
                                receiver_pet_id=data['receiver_pet_id'])
        db.session.add(new_playdate)
        db.session.commit()
        date_details = new_playdate.to_dict_no_additions()
        date_details["playmate"] = new_playdate.receiver.to_dict()
        return date_details
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@playdate_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_playdate(id):
    form = EditPlaydateForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        playdate = Playdate.query.get(id)
        playdate.time = data['time']
        playdate.location = data['location']
        playdate.detail = data['detail']
        db.session.commit()
        date_details = playdate.to_dict_no_additions()
        date_details["playmate"] = playdate.receiver.to_dict()
        return date_details
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@playdate_routes.route('/<int:id>/approve', methods=["PUT"])
@login_required
def approve_playdate(id):
    playdate = Playdate.query.get(id)
    playdate.status = "Approved"
    db.session.commit()
    date_details = playdate.to_dict_no_additions()
    date_details["playmate"] = playdate.sender.to_dict()
    return date_details

@playdate_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_playdate(id):

    playdate = Playdate.query.get(id)

    if playdate is not None:
        db.session.delete(playdate)
        db.session.commit()
        return {"message": "Successfully deleted"}
    else:
        return {"message": "Playdate not found"}, 404
