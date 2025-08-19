# app/core/step5.py

import os
import shutil
import pandas as pd
from typing import Dict, Tuple

def generate_table_summary(title: str, rows: list) -> str:
    """
    Creates a string summary of a table (with totals) using pandas.
    """
    if not rows:
        return f"\n❌ No rows found for {title}.\n"

    df = pd.DataFrame(rows)
    numeric_cols = df.select_dtypes(include=["number"]).columns

    totals = {col: df[col].sum() for col in numeric_cols}
    totals_row = {col: "Total" if col == df.columns[0] else "" for col in df.columns}
    totals_row.update(totals)

    df = pd.concat([df, pd.DataFrame([totals_row])], ignore_index=True)

    output = f"\n📊 {title}:\n"
    output += df.to_string(index=False)
    output += "\n" + "-" * 60 + "\n"
    return output

def run(data: Dict) -> Dict:
    """
    Step 5: Finalizes processing, deletes temp folders,
    generates readable table summaries for console/log,
    and returns output tables.
    """

    # Prepare summaries
    estimation_output = data.get("estimation_table", {}).get("estimation_output", {})
    
    estimation_rows = estimation_output.get("rows", [])
    cost_rows = data.get("cost_estimation_output", {}).get("rows", [])

    estimation_title = estimation_output.get("technique", "Estimation Table")
    estimation_summary = generate_table_summary(estimation_title, estimation_rows)
    cost_summary = generate_table_summary("Cost Estimation Table", cost_rows)

    # Delete per-request ChromaDB folder
    session_path = data.get("chroma_session_path")
    if session_path and os.path.exists(session_path):
        try:
            shutil.rmtree(session_path)
            print(f"🧹 Deleted ChromaDB folder: {session_path}")
        except Exception as e:
            print(f"⚠️ Could not delete {session_path}: {e}")

    # Optional cleanup: input/output files (in local-only mode)

    # Return final output
    data["final_summary"] = {
        "estimation_table": estimation_summary,
        "cost_estimation_table": cost_summary
    }

    return data
