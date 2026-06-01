from sqlalchemy import create_engine

# SQLite database
DATABASE_URL = "sqlite:///./nextflim.db"

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)