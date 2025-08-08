from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from app import step1,step2,step3,step4,step5
from utils.file_handler import extract_text_from_pdf
import uuid
import os
import base64

router = APIRouter()

@router.get('/')
def hello():
    return JSONResponse(status_code=200,content={"message":"hello"})

@router.post('/estimate')
async def estimate_effort(request: Request):
    try:
        data = await request.json()

        estimation_technique = data["estimation_technique"]
        project_type = data["project_type"]
        time_constraint = data["time_constraint"]
        project_scale = data["project_scale"]
        project_budget = data["project_budget"]

        # decode base64 files
        document_file_b64 = data.get("document_file")
        rate_card_file_b64 = data.get("rate_card_file","") #optional

        if not document_file_b64:
            return JSONResponse(status_code=400,content={"error":"Document file isn't uploaded"})
        
        document_bytes = base64.b64decode(document_file_b64)
        document_text = extract_text_from_pdf(document_bytes)

        rate_card_text = ""
        if rate_card_file_b64:
            try:
                rate_card_bytes = base64.b64decode(rate_card_file_b64)
                rate_card_text = extract_text_from_pdf(rate_card_bytes)
            except Exception as e:
                print(f"⚠️ Could not extract rate card: {e}")

        #generate session - to be moved to login in future
        session_id = str(uuid.uuid4())
        chroma_session_path = f"./chroma_db_sessions/{session_id}"
        os.makedirs(chroma_session_path, exist_ok=True)

        # payload - 
        payload = {
            "estimation_technique": estimation_technique,
            "project_type": project_type,
            "time_constraint": time_constraint,
            "project_scale": project_scale,
            "project_budget": project_budget,
            "document_text": document_text,
            "rate_card_upload": rate_card_text,
            "chroma_session_path": chroma_session_path
        }

        # Sequential pipeline
        step1_data = step1.run(payload)
        step2_data = step2.run(step1_data)
        step3_data = step3.run(step2_data)
        step4_data = step4.run(step3_data)
        step5_data = step5.run(step4_data)

        return JSONResponse(content={
            "estimation_table": step5_data["estimation_output"]["properties"]["rows"],
            "cost_estimation_table": step5_data["cost_estimation_output"]["rows"]
        })
    except Exception as e:
        return JSONResponse(status_code=500,content={"error":str(e)})
