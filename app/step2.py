import os
import uuid
from typing import Dict
import chromadb
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=genai_api_key)

def chunk_text(text: str, chunk_size=500, overlap=100):
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = words[i:i+chunk_size]
        chunks.append(" ".join(chunk))
        i += chunk_size - overlap
    return chunks

def run(data: Dict) -> Dict:
    """
    Step 2: Accepts parsed document + metadata,
    chunks the document, generates embeddings via Gemini,
    and stores them in a ChromaDB session with a unique path.
    """

    # Generate a unique session path for this run
    session_id = str(uuid.uuid4())
    session_path = f"./chroma_sessions/{session_id}"
    os.makedirs(session_path, exist_ok=True)

    # Init Chroma client for this session
    chroma_client = chromadb.PersistentClient(path=session_path)
    collection = chroma_client.get_or_create_collection("documents")

    document_text = data.get("document_text", "").strip()
    if not document_text:
        raise ValueError("❌ Document text is empty or missing.")

    chunks = chunk_text(document_text)

    for idx, chunk in enumerate(chunks):
        try:
            response = genai.embed_content(
                model="models/embedding-001",
                content=chunk
            )
            embedding = response["embedding"]
            collection.add(
                ids=[f"doc_chunk_{idx}"],
                embeddings=[embedding],
                documents=[chunk],
                metadatas=[{
                    "chunk_index": idx,
                    "estimation_technique": data.get("estimation_technique"),
                    "project_type": data.get("project_type"),
                    "time_constraint": data.get("time_constraint"),
                    "project_scale": data.get("project_scale"),
                    "project_budget": data.get("project_budget")
                }]
            )
        except Exception as e:
            print(f"⚠️ Failed to embed chunk {idx}: {e}")

    # Store session info for future reference/cleanup
    data["chunks_stored"] = collection.count()
    data["chroma_session_id"] = session_id
    data["chroma_session_path"] = session_path

    return data
