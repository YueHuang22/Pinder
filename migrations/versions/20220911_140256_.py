"""empty message

Revision ID: e0ae1afbf606
Revises: 
Create Date: 2022-09-11 14:02:56.760510

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e0ae1afbf606'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=20), nullable=False),
    sa.Column('last_name', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('dogs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=15), nullable=False),
    sa.Column('birthday', sa.Date(), nullable=False),
    sa.Column('weight', sa.Integer(), nullable=False),
    sa.Column('breed', sa.String(length=35), nullable=False),
    sa.Column('gender', sa.String(length=10), nullable=False),
    sa.Column('fixed', sa.Boolean(), nullable=False),
    sa.Column('energy_level', sa.String(length=20), nullable=False),
    sa.Column('description', sa.String(length=300), nullable=True),
    sa.Column('image_url', sa.String(length=500), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playdates',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(length=255), nullable=False),
    sa.Column('time', sa.DateTime(), nullable=False),
    sa.Column('detail', sa.String(length=100), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('sender_pet_id', sa.Integer(), nullable=False),
    sa.Column('receiver_pet_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['receiver_pet_id'], ['dogs.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['sender_pet_id'], ['dogs.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('playdates')
    op.drop_table('dogs')
    op.drop_table('users')
    # ### end Alembic commands ###
