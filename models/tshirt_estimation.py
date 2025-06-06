from pydantic import BaseModel, Field
from typing import Literal, List

class TShirtRow(BaseModel):
    epic: str
    userStory: str
    complexity: Literal["L", "M", "H"]
    tshirtSize: Literal["XS", "S", "M", "L", "XL", "XXL"]
    classification: str
    effortEstimateHours: float = Field(ge=0)
    riskLevel: Literal["Low", "Medium", "High"]
    effortType: Literal["Low", "Medium", "High"]
    personDays: float = Field(ge=0)

class TShirtSummary(BaseModel):
    totalPersonDays: float = Field(ge=0)

class TShirtEstimationOutput(BaseModel):
    technique: Literal["T-Shirt Size Estimation"]
    rows: List[TShirtRow]
    summary: TShirtSummary
