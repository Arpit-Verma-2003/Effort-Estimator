import pandas as pd
import json
import os
import shutil

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

# Track which files were loaded
output_json_loaded = False
cost_json_loaded = False

# ==== Load and display from output.json ====
if os.path.exists("output.json"):
    with open("output.json", "r") as f:
        data = json.load(f)

    technique = data.get("technique", "Estimation").strip()
    rows = data.get("rows", [])
    if rows:
        display_table(f"{technique} (from output.json)", rows)
        output_json_loaded = True
    else:
        print(f"❌ No rows found in output.json for {technique}.")
else:
    print("⚠️ output.json not found.")

# ==== Load and display from cost_output.json ====
if os.path.exists("cost_output.json"):
    with open("cost_output.json", "r") as f:
        cost_data = json.load(f)

    cost_rows = cost_data.get("rows", [])
    if cost_rows:
        display_table("Cost Estimation (from cost_output.json)", cost_rows)
        cost_json_loaded = True
    else:
        print("❌ No cost estimation data found in cost_output.json.")
else:
    print("⚠️ cost_output.json not found.")

# ==== Delete ChromaDB directory ====
chroma_path = "./chroma_db"
if os.path.exists(chroma_path):
    try:
        shutil.rmtree(chroma_path)
        print("\n🧹 Old ChromaDB directory deleted successfully.")
    except Exception as e:
        print(f"⚠️ Failed to delete ChromaDB directory: {e}")

# ==== Delete processed output files ====
if output_json_loaded and os.path.exists("output.json"):
    try:
        os.remove("output.json")
        print("🗑️ output.json deleted successfully.")
    except Exception as e:
        print(f"⚠️ Failed to delete output.json: {e}")

if cost_json_loaded and os.path.exists("cost_output.json"):
    try:
        os.remove("cost_output.json")
        print("🗑️ cost_output.json deleted successfully.")
    except Exception as e:
        print(f"⚠️ Failed to delete cost_output.json: {e}")
