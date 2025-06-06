from pydantic import BaseModel, Field
from typing import Literal, List

class UseCaseRow(BaseModel):
    useCaseName: str
    complexity: Literal["S", "M", "L"]
    weight: int = Field(ge=0)
    effortEstimateHours: int = Field(ge=0)
    riskLevel: Literal["Low", "Medium", "High"]
    classification: str
    effortType: Literal["Low", "Medium", "High"]
    personDays: int = Field(ge=0)

class Summary(BaseModel):
    totalWeight: int = Field(ge=0)
    totalPersonDays: int = Field(ge=0)

class UseCaseEstimationOutput(BaseModel):
    technique: Literal["Use Case Estimation"]
    rows: List[UseCaseRow]
    summary: Summary
