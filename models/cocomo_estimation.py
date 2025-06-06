from pydantic import BaseModel, Field
from typing import Literal, List

class COCOMORow(BaseModel):
    moduleName: str
    complexity: Literal["S", "M", "L"]
    kLoc: float = Field(ge=0)
    effortEstimatePM: float = Field(ge=0)
    riskLevel: Literal["Low", "Medium", "High"]
    classification: str
    effortType: Literal["Low", "Medium", "High"]
    personDays: float = Field(ge=0)

class COCOMOSummary(BaseModel):
    totalKLoc: float = Field(ge=0)
    totalEffortPM: float = Field(ge=0)
    totalPersonDays: float = Field(ge=0)

class COCOMOEstimationOutput(BaseModel):
    technique: Literal["COCOMO"]
    rows: List[COCOMORow]
    summary: COCOMOSummary
