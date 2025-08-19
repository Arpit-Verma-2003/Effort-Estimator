from pydantic import BaseModel, Field
from typing import Literal, List

class StoryPointRow(BaseModel):
    epic: str
    userStory: str
    storyPoints: int = Field(ge=0)
    complexity: Literal["Low", "Medium", "High"]
    classification: str
    riskLevel: Literal["Low", "Medium", "High"]
    effortType: Literal["Low", "Medium", "High"]

class StoryPointSummary(BaseModel):
    totalStoryPoints: int = Field(ge=0)

class StoryPointEstimationOutput(BaseModel):
    technique: Literal["Story Point Estimation"]
    rows: List[StoryPointRow]
    summary: StoryPointSummary
