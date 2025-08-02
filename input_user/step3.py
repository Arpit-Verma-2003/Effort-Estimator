import os
import json
import re
from typing import Dict
import chromadb
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
genai_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=genai_api_key)

# Step 1: Chunk retrieval logic
def get_relevant_chunks(query: str, collection, max_chunks=12):
    query_embedding = genai.embed_content(
        model="models/embedding-001",
        content=query
    )["embedding"]

    total_chunks = collection.count()
    retrieved_texts = []

    if total_chunks > 20:
        top_k = max(1, total_chunks // 4)
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            include=["documents"]
        )
        long_context = "\n\n".join(dict.fromkeys(results["documents"][0]))
        summary_prompt = f"""
        You are a summarization assistant. Summarize this document carefully:
        {long_context}
        Output: Concise but detailed summary for effort estimation.
        """
        summary_model = genai.GenerativeModel("gemini-1.5-flash")
        summary_response = summary_model.generate_content(summary_prompt)
        return summary_response.text.strip()
    else:
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=max_chunks,
            include=["documents"]
        )
        return "\n\n".join(dict.fromkeys(results["documents"][0]))

# Step 2: Prompt construction + model call
def run(data: Dict) -> Dict:
    # Load required inputs
    estimation_technique = data["estimation_technique"].lower()
    document_text = data["document_text"]
    chroma_path = data["chroma_session_path"]

    project_metadata = {
        "Estimation Technique": estimation_technique,
        "Project Type": data.get("project_type"),
        "Time Constraint (months)": data.get("time_constraint"),
        "Project Scale": data.get("project_scale"),
        "Project Budget": data.get("project_budget")
    }

    # Load schema files
    schema_map = {
        "used-case based": "use_case_estimation.schema.json",
        "t-shirt sizing based": "tshirt_estimation.schema.json",
        "story point estimation": "story_point_estimation.schema.json",
        "function point estimation": "function_point_estimation.schema.json",
        "cocomo": "cocomo_estimation.schema.json"
    }

    schema_filename = schema_map.get(estimation_technique)
    if not schema_filename:
        raise ValueError(f"Unknown estimation technique: {estimation_technique}")

    input_schema_path = os.path.join("input_schemas", schema_filename)
    output_schema_path = os.path.join("output_schemas", schema_filename)

    with open(input_schema_path, "r") as f:
        input_schema_json = f.read()

    with open(output_schema_path, "r") as f:
        output_schema_json = f.read()

    # Load ChromaDB session
    chroma_client = chromadb.PersistentClient(path=chroma_path)
    collection = chroma_client.get_or_create_collection("documents")

    # Build metadata string
    metadata_info = "\n".join(
        f"{k}: {v}" for k, v in project_metadata.items() if v is not None
    )

    context = get_relevant_chunks(
        query="Generate use cases/epics/modules for a new project based on the provided document and rate card.",
        collection=collection
    )

    prompt = f"""
You are a helpful assistant. Based on the following project metadata and document context, generate output in the specified JSON format.

Project Metadata:
{metadata_info}

Project Documents:
{context}

Input JSON Schema:
{input_schema_json}

Expected Output JSON Format:
Only provide valid JSON matching this output schema.
{output_schema_json}

IMPORTANT: Do NOT add explanations. Only return the final JSON output.
""".strip()

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        prompt,
        generation_config={"max_output_tokens": 2000, "temperature": 0.0}
    )

    raw = response.text.strip()
    clean = re.sub(r"^```(?:json)?\s*|```$", "", raw.strip(), flags=re.MULTILINE)

    try:
        parsed_output = json.loads(clean)
        data["estimation_output"] = parsed_output
    except json.JSONDecodeError:
        data["estimation_output"] = clean

    return data
