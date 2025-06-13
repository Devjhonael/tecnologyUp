from db_config import db
from sqlalchemy import Column,Integer,String,DateTime
from datetime import datetime

class User(db.Model):
    __tablename__ = 'usuarios'
    id = Column('id',Integer, primary_key=True)
    email = Column('email',String(120), unique=True, nullable=False)
    password = Column('password',String(128), nullable=False)
    created_at = Column('fecha_creacion',DateTime, default=datetime.utcnow)
    last_login = Column('ultimo_acceso',DateTime, nullable=True)
