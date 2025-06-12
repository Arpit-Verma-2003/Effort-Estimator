import pandas as pd
import json
import os
import shutil

# Path to the JSON file
json_file = "output.json"

# Load the JSON file
with open(json_file, "r") as f:
    data = json.load(f)

# Extract rows dynamically
rows = data.get("rows", [])

# Check if rows exist
if not rows:
    print("No data found in 'rows'.")
else:
    # Convert to DataFrame
    df = pd.DataFrame(rows)

    # Detect integer columns
    int_cols = df.select_dtypes(include=['int64','float64']).columns

    # Create a totals row with sums for integer columns
    totals = {col: df[col].sum() for col in int_cols}
    totals_row = {col: "Total" if col == df.columns[0] else "" for col in df.columns}
    totals_row.update(totals)

    # Append totals row
    df = pd.concat([df, pd.DataFrame([totals_row])], ignore_index=True)

    # Print or use the DataFrame
    print("Generated Table:\n")
    print(df)


# Delete ChromaDB directory
chroma_path = "./chroma_db"
if os.path.exists(chroma_path):
    try:
        shutil.rmtree(chroma_path)
        print("\n🧹 Old ChromaDB directory deleted successfully.")
    except Exception as e:
        print(f"⚠️ Failed to delete ChromaDB directory: {e}")

# Delete the JSON file after processing
try:
    os.remove(json_file)
    print(f"\nFile '{json_file}' deleted successfully.")
except Exception as e:
    print(f"\nFailed to delete '{json_file}': {e}")
