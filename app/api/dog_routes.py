from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Dog
from app.forms import CreateDogForm, EditDogForm
from app.api.auth_routes import validation_errors_to_error_messages

dog_routes = Blueprint('dogs', __name__)


@dog_routes.route('')
@login_required
def get_dogs():
    mydogs = current_user.dogs
    dogs = Dog.query.filter(Dog.id.notin_([dog.id for dog in mydogs])).all()
    return {'dogs': [dog.to_dict() for dog in dogs]}


@dog_routes.route('/my')
@login_required
def get_my_dogs():
    dogs = current_user.dogs
    return {'dogs': [dog.to_dict() for dog in dogs]}


@dog_routes.route('/<int:id>')
@login_required
def get_dog_by_id(id):
    dog = Dog.query.get(id)

    if dog:
        return dog.to_dict()
    else:
        return {"message": "Dog not found"}, 404


@dog_routes.route('', methods=["POST"])
@login_required
def create_dog():
    form = CreateDogForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        user = current_user
        new_dog = Dog(name=data['name'],
                      birthday=data['birthday'],
                      weight=data['weight'],
                      breed=data['breed'],
                      gender=data['gender'],
                      fixed=data['fixed'],
                      energy_level=data['energy_level'],
                      description=data['description'],
                      image_url=data['image_url'],
                      owner_id=user.id)
        db.session.add(new_dog)
        db.session.commit()
        return new_dog.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@dog_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_dog(id):
    form = EditDogForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        dog = Dog.query.get(id)
        dog.name = data['name']
        dog.birthday = data['birthday']
        dog.weight = data['weight']
        dog.breed = data['breed'],
        dog.gender = data['gender']
        dog.fixed = data['fixed']
        dog.energy_level = data['energy_level']
        dog.description = data['description']
        dog.image_url = data['image_url']
        db.session.commit()
        return dog.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@dog_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_dog(id):

    dog = Dog.query.get(id)

    if dog is not None:
        db.session.delete(dog)
        db.session.commit()
        return {"message": "Successfully deleted"}
    else:
        return {"message": "Dog not found"}, 404
