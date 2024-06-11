from pydantic_settings import BaseSettings

class Settings(BaseSettings):

    USER: str

    PASSWORD: str

    HOST: str

    DATABASE: str

    class Config:
        env_file = "./backend/.env"

def get_settings():
    return Settings()

settings = get_settings()