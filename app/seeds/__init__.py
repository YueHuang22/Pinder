from flask.cli import AppGroup
from app.seeds.users import seed_users, undo_users
from app.seeds.dogs import seed_dogs, undo_dogs
from app.seeds.playdates import seed_playdates, undo_playdates

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_dogs()
    seed_playdates()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_dogs()
    undo_playdates()
    # Add other undo functions here
