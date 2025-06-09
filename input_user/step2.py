# step - 2 - Store extracted text from document in ChromaDB
import os
import shutil
import chromadb
import google.generativeai as genai
import json
from dotenv import load_dotenv
load_dotenv()

# Configure Gemini API
genai_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=genai_api_key)

chroma_path = "./chroma_db"

if os.path.exists(chroma_path):
    shutil.rmtree(chroma_path)  # ❌ Deletes the folder and all files inside
    print("🧹 Old ChromaDB directory deleted.")

# Initialize ChromaDB
chroma_client = chromadb.PersistentClient(path=chroma_path)
collection = chroma_client.get_or_create_collection("documents")
print("📁 New ChromaDB directory created.")

# Load extracted text from `input_payload.json`
with open("input_payload.json", "r") as f:
    input_data = json.load(f)

document_text = input_data.get("document_text", "No document text found.")

# Chunking logic
def chunk_text(text, chunk_size=500, overlap=100):
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = words[i:i+chunk_size]
        chunks.append(" ".join(chunk))
        i += chunk_size - overlap
    return chunks

chunks = chunk_text(document_text)

# Store chunks with embeddings
for idx, chunk in enumerate(chunks):
    try:
        response = genai.embed_content(model="models/embedding-001", content=chunk)
        embedding = response["embedding"]
        collection.add(
            ids=[f"doc_chunk_{idx}"],
            embeddings=[embedding],
            documents=[chunk],
            metadatas=[{
                "chunk_index": idx,
                "estimation_technique": input_data.get("estimation_technique"),
                "project_type": input_data.get("project_type"),
                "time_constraint": input_data.get("time_constraint"),
                "project_scale": input_data.get("project_scale"),
                "project_budget": input_data.get("project_budget")
            }]
        )
    except Exception as e:
        print(f"⚠️ Failed to embed chunk {idx}: {e}")

print("Total chunks saved in collection:", collection.count())

print("✅ Document stored in ChromaDB using Gemini embeddings.")
