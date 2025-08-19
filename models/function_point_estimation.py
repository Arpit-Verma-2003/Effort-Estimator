from pydantic import BaseModel, Field
from typing import Literal, List

class FunctionPointRow(BaseModel):
    epic: str
    function: str
    functionType: Literal["EI", "EO", "EQ", "ILF", "EIF"]
    complexity: Literal["Low", "Average", "High"]
    unadjustedFunctionPoints: float = Field(ge=0)
    adjustedFunctionPoints: float = Field(ge=0)
    classification: str
    riskLevel: Literal["Low", "Medium", "High"]
    effortType: Literal["Low", "Medium", "High"]
    effortEstimatePersonDays: float = Field(ge=0)

class FunctionPointSummary(BaseModel):
    totalUnadjustedFP: float = Field(ge=0)
    totalAdjustedFP: float = Field(ge=0)
    totalEffortPersonDays: float = Field(ge=0)

class FunctionPointEstimationOutput(BaseModel):
    technique: Literal["Function Point Estimation"]
    rows: List[FunctionPointRow]
    summary: FunctionPointSummary
