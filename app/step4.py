import os
import json
import re
from typing import Dict
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=genai_api_key)

def run(data: Dict) -> Dict:
    """
    Step 4: Generate a cost estimation plan using use-case data + metadata.
    Adds 'cost_estimation_output' to the data dict.
    """
    # Extract metadata
    estimation_technique = data.get("estimation_technique", "").lower()
    metadata_info = {
        "Estimation Technique": estimation_technique,
        "Project Type": data.get("project_type"),
        "Time Constraint (months)": data.get("time_constraint"),
        "Project Scale": data.get("project_scale"),
        "Project Budget": data.get("project_budget")
    }

    use_case_rows = data.get("estimation_output", {}).get("rows", [])
    use_case_rows_str = json.dumps(use_case_rows, indent=2)

    # Load schema
    schema_path = os.path.join("output_schemas", "cost_estimation.schema.json")
    with open(schema_path, "r") as f:
        cost_schema = f.read()

    # Prepare prompt
    cost_prompt = f"""
You are a helpful cost planning assistant. Based on the **project metadata** and the **use case estimation table**, generate a cost estimation plan that fits within the project budget. Output valid JSON data matching the schema provided.

Project Metadata:
{json.dumps(metadata_info, indent=2)}

Use Case Estimation Table:
{use_case_rows_str}

Cost Estimation Output Schema:
{cost_schema}

Note:
- Do not exceed the budget mentioned in metadata.
- Cost should be realistic and aligned with the use cases.
- Output should conform strictly to the schema.

Only provide valid JSON data for the costEstimation output. Do not add any explanations or extra text.
""".strip()

    # Call Gemini model
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        cost_prompt,
        generation_config={"max_output_tokens": 2000, "temperature": 0.0}
    )

    # Parse response
    raw = response.text.strip()
    clean = re.sub(r"^```(?:json)?\s*|```$", "", raw.strip(), flags=re.MULTILINE)

    try:
        cost_data = json.loads(clean)
        data["cost_estimation_output"] = cost_data
    except json.JSONDecodeError:
        data["cost_estimation_output"] = clean  # fallback

    return data
