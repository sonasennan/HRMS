from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import mapped_column,relationship,Mapped
from sqlalchemy import String,Integer,ForeignKey,DateTime
from typing import List
from datetime import datetime
from sqlalchemy.sql import func

db_uri='postgresql://postgres:1234@localhost:5432/hrms'

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base) 

class HR(db.Model):
    __tablename__ = "hr"
    user_id  : Mapped[int] = mapped_column(primary_key=True)
    username : Mapped[str] = mapped_column(String(50))
    password : Mapped[str] = mapped_column(String(250))
    

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Designation(db.Model):
    __tablename__="designation"

    designation_id  : Mapped[int] = mapped_column(primary_key=True)
    designation_name : Mapped[str] = mapped_column(String(50))
    maximum_leave : Mapped[int] = mapped_column()
    created_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now())
    deleted_at:Mapped[DateTime] = mapped_column(DateTime,nullable=True)
    updated_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now(), onupdate=func.now())

    employee : Mapped[List["Employee"]] = relationship("Employee", back_populates="designation",cascade="all, delete-orphan")


class Employee(db.Model):
    __tablename__="employee"
    employee_id : Mapped[int] = mapped_column(primary_key=True)
    employee_name : Mapped[str] = mapped_column(String(50))
    address : Mapped[str] = mapped_column(String(100))
    phone_number : Mapped[str] = mapped_column(String(20))
    email : Mapped[str] = mapped_column(String(50))
    leave_taken : Mapped[int] = mapped_column(default=0)
    des_id : Mapped[int] = mapped_column(ForeignKey("designation.designation_id"))

    designation : Mapped["Designation"] = relationship(back_populates="employee")
    created_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now())
    deleted_at:Mapped[DateTime] = mapped_column(DateTime,nullable=True)
    updated_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now(), onupdate=func.now())
    





def init_db(db_uri):
    logger = logging.getLogger("FlaskApp")
    engine = create_engine(db_uri)
    Base.metadata.create_all(engine)
    logger.info("Created database")

def get_session(db_uri):
    engine = create_engine(db_uri)
    Session = sessionmaker(bind = engine)
    session = Session()
    return session