# app/core/step5.py

import os
import shutil
import pandas as pd
from typing import Dict, Tuple

def generate_table_summary(title: str, rows: list) -> str:
    print("entered step 5 to create table")
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
    print(output)
    print("step 5 in progress, generated above output")
    return output

def run(data: Dict) -> Dict:
    print("step 5 initiate")
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

    # Return final output
    data["final_summary"] = {
        "estimation_table": estimation_summary,
        "cost_estimation_table": cost_summary
    }
    print(data)
    print("step 5 end, generated above data")
    return data
