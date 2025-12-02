import os
import shutil

def safe_delete(path: str):
    if os.path.exists(path):
        try:
            shutil.rmtree(path)
            print(f"🧹 Deleted folder: {path}")
        except Exception as e:
            print(f"⚠️ Could not delete {path}: {e}")

def cleanup_all_chroma_sessions():
    folders = ["./chroma_sessions", "./chroma_db_sessions"]
    for folder in folders:
        safe_delete(folder)
