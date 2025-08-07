import pdfplumber
from typing import Optional
from io import BytesIO

def extract_text_from_pdf(file_bytes: bytes) -> Optional[str]:
    text = ""
    try:
        with pdfplumber.open(BytesIO(file_bytes)) as pdf:  # ✅ fix here
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"❌ PDF extraction failed: {e}")
        return ""

    return text.strip() if text else ""
