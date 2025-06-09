# step - 3 - Use LLM to generate epics and desired output by using chromaDB and input + output schema
import os
import json
import google.generativeai as genai
import chromadb
import re
import google.ai.generativelanguage as genai_types
from dotenv import load_dotenv
load_dotenv()

# Step 0: Load input payload
with open("input_payload.json", "r") as f:
    input_data = json.load(f)

# Extract project metadata
estimation_technique = input_data.get("estimation_technique", "").lower()
project_metadata = {
    "Estimation Technique": estimation_technique,
    "Project Type": input_data.get("project_type"),
    "Time Constraint (months)": input_data.get("time_constraint"),
    "Project Scale": input_data.get("project_scale"),
    "Project Budget": input_data.get("project_budget")
}

# Step 1: Determine appropriate schema file based on technique
schema_map = {
    "used-case based": "use_case_estimation.schema.json",
    "t-shirt sizing based": "tshirt_estimation.schema.json",
    "story point estimation": "story_point_estimation.schema.json",
    "function point estimation": "function_point_estimation.schema.json",
    "cocomo": "cocomo_estimation.schema.json"
}

schema_file_name = schema_map.get(estimation_technique.lower())
if not schema_file_name:
    raise ValueError(f"Unknown estimation technique: {estimation_technique}")

input_schema_path = os.path.join("..", "input_schemas", schema_file_name)
output_schema_path = os.path.join("..", "output_schemas", schema_file_name)

with open(input_schema_path, "r") as f:
    input_schema_json = f.read()

with open(output_schema_path, "r") as f:
    output_schema_json = f.read()

# Configure Gemini API
genai_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=genai_api_key)
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection("documents")

# Step 3: User query + embedding
user_query = "Generate use cases/epics/modules for a new project based on the provided document and rate card."
query_embedding = genai.embed_content(model="models/embedding-001", content=user_query)["embedding"]

# print("Available documents in collection:", collection.peek(3))


# Step 4: Retrieve relevant docs from ChromaDB
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=12,
    include=["metadatas", "documents"]
)

retrieved_texts = list(dict.fromkeys(results['documents'][0]))  # List of top 9 document texts (unique)

if not retrieved_texts:
    print("No relevant documents found in ChromaDB.")
    retrieved_texts = ["No context available."]

# Step 5: Build project metadata string
metadata_info = "\n".join(f"{k}: {v}" for k, v in project_metadata.items() if v is not None)

# Step 6: Final Prompt Assembly
context = "\n\n".join(retrieved_texts)

# print(retrieved_texts)
# Step 4: Build prompt with retrieved docs
context = "\n\n".join(retrieved_texts)
prompt = f"""
You are a helpful assistant. Based on the following **project metadata** and **retrieved documents**, generate output in the specified JSON format.

Project Metadata:
{metadata_info}

Project Documents:
{context}

Input JSON Schema:
{input_schema_json}

Expected Output JSON Format:
{output_schema_json}

Only and only provide produced JSON output. Do not provide any other text.
"""

# ✅ Count total input tokens BEFORE sending to LLM
model = genai.GenerativeModel("gemini-1.5-flash")
input_token_count = model.count_tokens(prompt).total_tokens
print(f"📏 Total input tokens going to Gemini: {input_token_count}")

# Load the Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

# Generate response using generate_content
response = model.generate_content(
    prompt,
    generation_config={
        "max_output_tokens": 1500,
        "temperature": 0.0,
        "top_p": 1.0
    }
)

# Save the response to output.json
output_path = "output.json"

raw_text = response.text.strip()
clean_text = re.sub(r"^```(?:json)?\s*|```$", "", raw_text.strip(), flags=re.MULTILINE)

# Try to parse response as JSON (if valid), else write raw text
try:
    parsed_output = json.loads(clean_text)
    with open(output_path, "w") as f:
        json.dump(parsed_output, f, indent=2)
except json.JSONDecodeError:
    with open(output_path, "w") as f:
        f.write(clean_text)

print(f"\n✅ Output written to {output_path}")