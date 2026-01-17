"""
数据库初始化脚本
支持 SQLite, MySQL, PostgreSQL
"""
import os
import sys
from sqlalchemy import text
from database import engine, Base, Client, Token, SessionLocal

def init_database():
    """初始化数据库表结构"""
    print("正在创建数据库表...")
    Base.metadata.create_all(bind=engine)
    print("✅ 数据库表创建成功")

def seed_data():
    """插入初始测试数据"""
    print("正在插入初始数据...")

    db = SessionLocal()
    try:
        # 检查是否已有数据
        existing_client = db.query(Client).filter(Client.id == "test-client").first()
        if existing_client:
            print("⚠️  初始数据已存在，跳过插入")
            return

        # 插入测试客户端
        test_client = Client(
            id="test-client",
            secret="test-secret",
            redirect_uris="http://localhost:3000/callback,http://127.0.0.1:3000/callback",
            grants="authorization_code,refresh_token,client_credentials"
        )
        db.add(test_client)
        db.commit()

        print("✅ 初始数据插入成功")
        print("\n测试客户端信息:")
        print(f"  Client ID: test-client")
        print(f"  Client Secret: test-secret")
        print(f"  Redirect URIs: http://localhost:3000/callback")

    except Exception as e:
        print(f"❌ 插入数据失败: {e}")
        db.rollback()
    finally:
        db.close()

def check_connection():
    """检查数据库连接"""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("✅ 数据库连接成功")
        return True
    except Exception as e:
        print(f"❌ 数据库连接失败: {e}")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("OAuth2 Lab - 数据库初始化")
    print("=" * 50)

    db_type = os.getenv("DB_TYPE", "sqlite")
    print(f"\n数据库类型: {db_type.upper()}")

    if not check_connection():
        sys.exit(1)

    init_database()
    seed_data()

    print("\n" + "=" * 50)
    print("初始化完成!")
    print("=" * 50)
