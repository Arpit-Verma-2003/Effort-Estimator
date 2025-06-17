import pandas as pd
import json
import os
import shutil

# Path to the JSON file
json_file = "output.json"

# Load the JSON file
with open(json_file, "r") as f:
    data = json.load(f)

# Function to process and display a table
def display_table(title, rows):
    df = pd.DataFrame(rows)

    # Detect numeric columns
    numeric_cols = df.select_dtypes(include=["number"]).columns

    # Create totals row
    totals = {col: df[col].sum() for col in numeric_cols}
    totals_row = {col: "Total" if col == df.columns[0] else "" for col in df.columns}
    totals_row.update(totals)

    # Append and print
    df = pd.concat([df, pd.DataFrame([totals_row])], ignore_index=True)
    print(f"\n📊 {title}:\n")
    print(df)
    print("-" * 60)

# Extract and display Use Case Estimation Table
use_case_rows = data.get("useCaseEstimation", {}).get("rows", [])
if use_case_rows:
    display_table("Use Case Estimation", use_case_rows)
else:
    print("❌ No use case data found.")

# Extract and display Cost Estimation Table
cost_rows = data.get("costEstimation", {}).get("rows", [])
if cost_rows:
    display_table("Cost Estimation", cost_rows)
else:
    print("❌ No cost estimation data found.")



# Delete ChromaDB directory
# chroma_path = "./chroma_db"
# if os.path.exists(chroma_path):
#     try:
#         shutil.rmtree(chroma_path)
#         print("\n🧹 Old ChromaDB directory deleted successfully.")
#     except Exception as e:
#         print(f"⚠️ Failed to delete ChromaDB directory: {e}")

# # Delete the JSON file after processing
# try:
#     os.remove(json_file)
#     print(f"\nFile '{json_file}' deleted successfully.")
# except Exception as e:
#     print(f"\nFailed to delete '{json_file}': {e}")
