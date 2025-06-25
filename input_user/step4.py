import json
import google.generativeai as genai
import re
import os
# Read use case output
with open("output.json", "r") as f:
    use_case_data = json.load(f)

with open("input_payload.json", "r") as f:
    input_data = json.load(f)

with open("../output_schemas/cost_estimation.schema.json", "r") as f:
    cost_estimation_schema = f.read()

estimation_technique = input_data.get("estimation_technique", "").lower()
metadata_info = {
    "Estimation Technique": estimation_technique,
    "Project Type": input_data.get("project_type"),
    "Time Constraint (months)": input_data.get("time_constraint"),
    "Project Scale": input_data.get("project_scale"),
    "Project Budget": input_data.get("project_budget")
}

# Optional: pass use case rows directly
use_case_rows = use_case_data.get("rows", [])

# Format rows as JSON string
use_case_rows_str = json.dumps(use_case_rows, indent=2)

cost_prompt = f"""
You are a helpful cost planning assistant. Based on the **project metadata** and the **use case estimation table**, generate a cost estimation plan that fits within the project budget. Output valid JSON data matching the schema provided.

Project Metadata:
{metadata_info}

Use Case Estimation Table:
{use_case_rows_str}

Cost Estimation Output Schema:
{cost_estimation_schema}

Note:
- Do not exceed the budget mentioned in metadata.
- Cost should be realistic and aligned with the use cases.
- Output should conform strictly to the schema.

Only provide valid JSON data for the costEstimation output. Do not add any explanations or extra text.
"""
# ✅ Count total input tokens BEFORE sending to LLM
model = genai.GenerativeModel("gemini-1.5-flash")
input_token_count = model.count_tokens(cost_prompt).total_tokens
print(f"📏 Total input tokens going to Gemini: {input_token_count}")

# Generate costEstimation
model = genai.GenerativeModel("gemini-1.5-flash")
cost_response = model.generate_content(
    cost_prompt,
    generation_config={
        "max_output_tokens": 2000,
        "temperature": 0.0,
        "top_p": 1.0
    }
)

# Clean and parse
raw_cost_text = cost_response.text.strip()
clean_cost_text = re.sub(r"^```(?:json)?\s*|```$", "", raw_cost_text.strip(), flags=re.MULTILINE)
cost_data = json.loads(clean_cost_text)

# Save costEstimation output
with open("cost_output.json", "w") as f:
    json.dump(cost_data, f, indent=2)

print("✅ Step 2: Cost estimation written to cost_output.json")

# Delete input_payload.json
input_payload_path = "input_payload.json"
if os.path.exists(input_payload_path):
    try:
        os.remove(input_payload_path)
        print(f"\n🗑️ Deleted input file: {input_payload_path}")
    except Exception as e:
        print(f"\n⚠️ Failed to delete {input_payload_path}: {e}")
