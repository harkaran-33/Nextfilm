from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base, Movie, Rating
from session import SessionLocal

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB session
db = SessionLocal()

# Insert movies only once
if db.query(Movie).count() == 0:

    movies_data = [

        Movie(
            title="Avengers Endgame",
            genre="Action",
            image="https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg"
        ),

        Movie(
            title="Interstellar",
            genre="Sci-Fi",
            image="https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
        ),

        Movie(
            title="Joker",
            genre="Crime",
            image="https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg"
        ),

        Movie(
            title="Batman",
            genre="Action",
            image="https://upload.wikimedia.org/wikipedia/en/8/87/The_Batman_%282022_film%29_poster.jpg"
        ),

        Movie(
            title="Inception",
            genre="Sci-Fi",
            image="https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg"
        ),

        Movie(
            title="Doctor Strange",
            genre="Fantasy",
            image="https://upload.wikimedia.org/wikipedia/en/c/c7/Doctor_Strange_poster.jpg"
        ),

        Movie(
            title="John Wick",
            genre="Action",
            image="https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg"
        ),

        Movie(
            title="Spider-Man No Way Home",
            genre="Action",
            image="https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg"
        ),

        Movie(
            title="Titanic",
            genre="Romance",
            image="https://upload.wikimedia.org/wikipedia/en/2/22/Titanic_poster.jpg"
        ),

        Movie(
            title="The Dark Knight",
            genre="Action",
            image="https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg"
        ),

        Movie(
            title="Frozen",
            genre="Animation",
            image="https://upload.wikimedia.org/wikipedia/en/0/05/Frozen_%282013_film%29_poster.jpg"
        ),

        Movie(
            title="Avatar",
            genre="Sci-Fi",
            image="https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg"
        ),

        Movie(
            title="Black Panther",
            genre="Action",
            image="https://upload.wikimedia.org/wikipedia/en/d/d6/Black_Panther_%28film%29_poster.jpg"
        ),

        Movie(
            title="Deadpool",
            genre="Comedy",
            image="https://upload.wikimedia.org/wikipedia/en/4/46/Deadpool_poster.jpg"
        ),

        Movie(
            title="The Conjuring",
            genre="Horror",
            image="https://upload.wikimedia.org/wikipedia/en/1/1f/Conjuring_poster.jpg"
        ),

        Movie(
            title="Toy Story",
            genre="Animation",
            image="https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg"
        ),

        Movie(
            title="Iron Man",
            genre="Action",
            image="https://upload.wikimedia.org/wikipedia/en/7/70/Ironmanposter.JPG"
        ),

        Movie(
            title="The Nun",
            genre="Horror",
            image="https://upload.wikimedia.org/wikipedia/en/3/34/TheNunPoster.jpg"
        ),

        Movie(
            title="Fast and Furious",
            genre="Action",
            image="https://upload.wikimedia.org/wikipedia/en/8/8f/Fast_and_Furious_Poster.jpg"
        ),

        Movie(
            title="Moana",
            genre="Animation",
            image="https://upload.wikimedia.org/wikipedia/en/2/26/Moana_Teaser_Poster.jpg"
        ),

        Movie(
            title="The Matrix",
            genre="Sci-Fi",
            image="https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg"
        ),

        Movie(
            title="Harry Potter",
            genre="Fantasy",
            image="https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_and_the_Philosopher%27s_Stone_banner.jpg"
        ),

        Movie(
            title="Shrek",
            genre="Comedy",
            image="https://upload.wikimedia.org/wikipedia/en/3/39/Shrek.jpg"
        ),

        Movie(
            title="Finding Nemo",
            genre="Animation",
            image="https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg"
        ),
    ]

    db.add_all(movies_data)

    db.commit()

# Home API
@app.get("/")
def home():
    return {
        "message": "Welcome to NextFlim API"
    }

# Get Movies
@app.get("/movies")
def get_movies():

    movies = db.query(Movie).all()

    return movies

# Add Rating
@app.post("/rate")
def rate_movie(user: str, movie_id: int, rating: int):

    new_rating = Rating(
        user=user,
        movie_id=movie_id,
        rating=rating
    )

    db.add(new_rating)

    db.commit()

    return {
        "message": "Rating Added Successfully"
    }

# Get Ratings
@app.get("/ratings")
def get_ratings():

    ratings = db.query(Rating).all()

    return ratings

# Recommendation API
@app.get("/recommend/{user}")
def recommend_movies(user: str):

    user_ratings = db.query(Rating).filter(
        Rating.user == user
    ).all()

    if not user_ratings:
        return {
            "message": "No ratings found for user"
        }

    liked_movie_ids = [
        rating.movie_id
        for rating in user_ratings
        if rating.rating >= 4
    ]

    liked_movies = db.query(Movie).filter(
        Movie.id.in_(liked_movie_ids)
    ).all()

    liked_genres = [
        movie.genre
        for movie in liked_movies
    ]

    recommendations = db.query(Movie).filter(
        Movie.genre.in_(liked_genres)
    ).all()

    return recommendations