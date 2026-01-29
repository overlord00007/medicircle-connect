from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

from pathlib import Path

env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Default to a local sqlite file if no DATABASE_URL is provided (for easy testing without Neon initially)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./local.db")

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
