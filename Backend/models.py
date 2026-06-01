from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

# Movie Table
class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    genre = Column(String)

    image = Column(String)

# Ratings Table
class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)

    user = Column(String)

    movie_id = Column(Integer)

    rating = Column(Integer)