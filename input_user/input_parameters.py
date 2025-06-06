import json
import os
import base64
import pdfplumber

# Define options for selection
options = {
    "Estimation Technique": ["Used-Case based", "T-shirt Sizing based", "Story Point Estimation", "Function Point Estimation", "COCOMO"],
    "Project Type": ["AI/Machine Learning", "Web Application", "Enterprise Application", "IoT", "Dashboard", "Mobile Application"],
    "Project Scale": ["Small", "Medium", "Large", "Mega"]
}

# Function to display options and get user selection
def get_choice(category):
    while True:
        print(f"\nChoose {category}:")
        for i, option in enumerate(options[category], start=1):
            print(f"{i}. {option}")

        try:
            choice = int(input("Enter option number: "))
            if 1 <= choice <= len(options[category]):
                return options[category][choice - 1]
            else:
                print("❌ Invalid choice. Please enter a valid option from the list.")
        except ValueError:
            print("❌ Invalid input format. Please enter a number.")

# Function to get validated numeric input
def get_numeric_input(prompt, input_type):
    while True:
        try:
            value = input_type(input(prompt))
            return value
        except ValueError:
            print("❌ Invalid input format. Please enter a number.")

def extract_text_from_pdf(pdf_path):
    if not os.path.exists(pdf_path):
        print(f"❌ Error: File '{pdf_path}' not found!")
        return None
    
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"❌ Error extracting text from PDF '{pdf_path}': {e}")
        return None
    
    return text.strip() if text else "❌ No readable text found in the document."

# Function to read a file's content
def read_file(file_path):
    if not os.path.exists(file_path):
        print(f"❌ Error: File '{file_path}' not found!")
        return None
    
    try:
        with open(file_path, "rb") as file:
            return file.read()
    except Exception as e:
        print(f"❌ Error reading file '{file_path}': {e}")
        return None

# Get user inputs with validation
estimation_technique = get_choice("Estimation Technique")
project_type = get_choice("Project Type")
time_constraint = get_numeric_input("\nEnter time constraint in months: ", int)
project_scale = get_choice("Project Scale")

document_upload_path = input("\nEnter the path for Document Upload (PDF file): ")
document_content = extract_text_from_pdf(document_upload_path)

rate_card_upload_path = input("Enter the path for Rate Card Upload (Excel/PDF file): ")
rate_card_content = extract_text_from_pdf(rate_card_upload_path)

project_budget = get_numeric_input("Enter Project Budget in Dollars: ", float)

# Prepare input payload for document processing
input_payload = {
    "estimation_technique": estimation_technique,
    "project_type": project_type,
    "time_constraint": time_constraint,
    "project_scale": project_scale,
    "document_text": document_content,
    "rate_card_upload": rate_card_content,
    "project_budget": project_budget
}

# Save inputs to a JSON file
with open("input_payload.json", "w") as f:
    json.dump(input_payload, f, indent=4)  # Convert binary data to string for JSON compatibility

print("\n✅ Data saved in 'input_payload.json'. Ready for document processing!")
