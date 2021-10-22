from logging import DEBUG
from dotenv import load_dotenv
from pathlib import Path
import os

# set path to env file
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)


class Config:
    """Set Flask configuration vars from .env file."""

    # Load in enviornemnt variables
    EMAIL = os.getenv("EMAIL")
    PASSWORD = os.getenv("PASSWORD")
    DEBUG = os.getenv("DEBUG")
    MAIL_CLIENT = os.getenv("MAIL_CLIENT")
    PORT = os.getenv("PORT")
    RECIVER_ADDR = os.getenv("RECIVER_ADDR")
