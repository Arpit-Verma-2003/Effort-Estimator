import React, { useEffect } from "react";
import Header from "../components/Header";

const FAQPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <Header />

      <section className="px-6 md:px-24 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10">
          Frequently Asked Questions
        </h1>

        <div className="max-w-6xl mx-auto space-y-10">

          {/* Question 1 */}
          <div className="bg-blue-800 p-10 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-2xl font-semibold mb-3">How accurate are the estimates?</h2>
            <p className="text-gray-300 leading-relaxed">
              The estimates are generated using industry-standard estimation techniques 
              like Use Case, COCOMO, Function Point, Story Point, and T-Shirt Sizing. 
              Accuracy depends on the clarity of your BRD/RFQ and the selected technique. 
              While the tool provides a realistic estimate, we recommend reviewing them
              based on project constraints and team capacity.
            </p>
          </div>

          {/* Question 2 */}
          <div className="bg-blue-800 p-10 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-2xl font-semibold mb-3">What file formats can I upload?</h2>
            <p className="text-gray-300">
              You can upload <span className="text-yellow-300 font-semibold">PDF, DOC, and DOCX </span> 
              files up to 200MB. BRDs, RFQs, and requirement documents are supported.
            </p>
          </div>

          {/* Question 3 */}
          <div className="bg-blue-800 p-10 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-2xl font-semibold mb-3">Is my data safe?</h2>
            <p className="text-gray-300 leading-relaxed">
              Yes. Your files are processed securely and never stored permanently.  
              No files or outputs are shared with any external party. All processing 
              happens within controlled execution environments.
            </p>
          </div>

          {/* Question 4 */}
          <div className="bg-blue-800 p-10 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-2xl font-semibold mb-3">Which estimation technique should I choose?</h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              Below are the exact output structures so you know what fields each technique generates.
            </p>

            <div className="space-y-8">

              {/* COCOMO */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-300">COCOMO</h3>
                <pre className="bg-blue-950 text-gray-300 p-5 rounded-xl mt-2 overflow-x-auto text-sm leading-relaxed">
{`COCOMOEstimationOutput:
  technique: "COCOMO"
  rows: [
    {
      moduleName: str,
      complexity: "S" | "M" | "L",
      kLoc: float,
      effortEstimatePM: float,
      riskLevel: "Low" | "Medium" | "High",
      classification: str,
      effortType: "Low" | "Medium" | "High",
      personDays: float
    }
  ]
  summary: {
    totalKLoc: float,
    totalEffortPM: float,
    totalPersonDays: float
  }`}
                </pre>
              </div>

              {/* Function Point */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-300">Function Point Estimation</h3>
                <pre className="bg-blue-950 text-gray-300 p-5 rounded-xl mt-2 overflow-x-auto text-sm leading-relaxed">
{`FunctionPointEstimationOutput:
  technique: "Function Point Estimation"
  rows: [
    {
      epic: str,
      function: str,
      functionType: "EI" | "EO" | "EQ" | "ILF" | "EIF",
      complexity: "Low" | "Average" | "High",
      unadjustedFunctionPoints: float,
      adjustedFunctionPoints: float,
      classification: str,
      riskLevel: "Low" | "Medium" | "High",
      effortType: "Low" | "Medium" | "High",
      effortEstimatePersonDays: float
    }
  ]
  summary: {
    totalUnadjustedFP: float,
    totalAdjustedFP: float,
    totalEffortPersonDays: float
  }`}
                </pre>
              </div>

              {/* Story Point */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-300">Story Point Estimation</h3>
                <pre className="bg-blue-950 text-gray-300 p-5 rounded-xl mt-2 overflow-x-auto text-sm leading-relaxed">
{`StoryPointEstimationOutput:
  technique: "Story Point Estimation"
  rows: [
    {
      epic: str,
      userStory: str,
      storyPoints: int,
      complexity: "Low" | "Medium" | "High",
      classification: str,
      riskLevel: "Low" | "Medium" | "High",
      effortType: "Low" | "Medium" | "High"
    }
  ]
  summary: {
    totalStoryPoints: int
  }`}
                </pre>
              </div>

              {/* T-Shirt */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-300">T-Shirt Size Estimation</h3>
                <pre className="bg-blue-950 text-gray-300 p-5 rounded-xl mt-2 overflow-x-auto text-sm leading-relaxed">
{`TShirtEstimationOutput:
  technique: "T-Shirt Size Estimation"
  rows: [
    {
      epic: str,
      userStory: str,
      complexity: "L" | "M" | "H",
      tshirtSize: "XS" | "S" | "M" | "L" | "XL" | "XXL",
      classification: str,
      effortEstimateHours: float,
      riskLevel: "Low" | "Medium" | "High",
      effortType: "Low" | "Medium" | "High",
      personDays: float
    }
  ]
  summary: {
    totalPersonDays: float
  }`}
                </pre>
              </div>

              {/* Use Case */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-300">Use Case Estimation</h3>
                <pre className="bg-blue-950 text-gray-300 p-5 rounded-xl mt-2 overflow-x-auto text-sm leading-relaxed">
{`UseCaseEstimationOutput:
  technique: "Use Case Estimation"
  rows: [
    {
      useCaseName: str,
      complexity: "S" | "M" | "L",
      weight: int,
      effortEstimateHours: int,
      riskLevel: "Low" | "Medium" | "High",
      classification: str,
      effortType: "Low" | "Medium" | "High",
      personDays: int
    }
  ]
  summary: {
    totalWeight: int,
    totalPersonDays: int
  }`}
                </pre>
              </div>

            </div>

            <p className="text-gray-300 leading-relaxed mt-5">
              Choose the technique that best matches the structure of your BRD/RFQ.  
              If unsure, Use Case or COCOMO works well for most documents.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default FAQPage;
