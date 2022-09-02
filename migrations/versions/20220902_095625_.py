"""empty message

Revision ID: 397b1b563e0b
Revises: 
Create Date: 2022-09-02 09:56:25.426992

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '397b1b563e0b'
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
    sa.Column('image_url', sa.String(length=500), nullable=True),
    sa.Column('social_url', sa.String(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('dogs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=35), nullable=False),
    sa.Column('birthday', sa.DateTime(), nullable=False),
    sa.Column('weight', sa.Float(precision=2), nullable=False),
    sa.Column('breed', sa.String(length=50), nullable=False),
    sa.Column('gender', sa.String(length=10), nullable=False),
    sa.Column('fixed', sa.String(length=50), nullable=False),
    sa.Column('energy_level', sa.String(length=20), nullable=False),
    sa.Column('description', sa.String(length=300), nullable=True),
    sa.Column('image_url', sa.String(length=500), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('dogs')
    op.drop_table('users')
    # ### end Alembic commands ###