from typing import Dict

def run(data: Dict) -> Dict:
    """
    Processes raw input data from the FastAPI form + file-extraction step.
    Handles optional rate_card_upload if not provided.
    """
    input_payload = {
        "estimation_technique": data["estimation_technique"],
        "project_type": data["project_type"],
        "time_constraint": data["time_constraint"],
        "project_scale": data["project_scale"],
        "document_text": data["document_text"],
        "rate_card_upload": data.get("rate_card_upload", ""),  # Optional: empty string if not provided
        "project_budget": data["project_budget"]
    }

    return input_payload