import json

# Load the LLM output JSON
with open('output.json', 'r') as f:
    data = json.load(f)

# Initialize totals
total_weight = 0
total_person_days = 0

# Recalculate totals from the 'rows' array
for row in data.get('rows', []):
    total_weight += row.get('weight', 0)
    total_person_days += row.get('personDays', 0)

# Update the summary section
data['summary'] = {
    'totalWeight': total_weight,
    'totalPersonDays': total_person_days
}

# Optional: Save corrected JSON back to file
with open('output_payload_corrected.json', 'w') as f:
    json.dump(data, f, indent=2)

print("✅ Summary corrected:")
print(f"Total Weight: {total_weight}")
print(f"Total Person Days: {total_person_days}")
