import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def get_database_url():
    """根据环境变量获取数据库连接URL"""
    db_type = os.getenv("DB_TYPE", "sqlite").lower()

    if db_type == "sqlite":
        db_path = os.getenv("DB_PATH", "./data/oauth2.db")
        return f"sqlite:///{db_path}"

    elif db_type == "mysql":
        host = os.getenv("DB_HOST", "localhost")
        port = os.getenv("DB_PORT", "3306")
        user = os.getenv("DB_USER", "root")
        password = os.getenv("DB_PASSWORD", "")
        database = os.getenv("DB_NAME", "oauth2_lab")
        return f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}"

    elif db_type == "postgresql":
        host = os.getenv("DB_HOST", "localhost")
        port = os.getenv("DB_PORT", "5432")
        user = os.getenv("DB_USER", "postgres")
        password = os.getenv("DB_PASSWORD", "")
        database = os.getenv("DB_NAME", "oauth2_lab")
        return f"postgresql://{user}:{password}@{host}:{port}/{database}"

    else:
        raise ValueError(f"Unsupported database type: {db_type}")
