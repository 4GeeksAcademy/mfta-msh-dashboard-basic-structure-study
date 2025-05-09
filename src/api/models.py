import enum
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Enum
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

# role enum
class RoleEnum(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"

    @classmethod
    def get_choices(cls):
        return [role.value for role in cls]


# user model
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(300), nullable=False)
    role: Mapped[enum] = mapped_column(Enum(RoleEnum), nullable=False, default=RoleEnum.USER.value)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "role": self.role,
            "is_active": self.is_active,
            # do not serialize the password, its a security breach
        }