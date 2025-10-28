import React, { useState, useRef } from "react";
import Header from "../components/Header";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // 🔹 controls transition to second UI
  const inputFileRef = useRef(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    if (!validateFileType(uploadedFile)) {
      setErrorMessage("Uploaded file type isn't supported");
      setFile(null);
      return;
    }

    if (!validateFileSize(uploadedFile)) {
      setErrorMessage("Uploaded file exceeds the file size limit");
      setFile(null);
      return;
    }

    setErrorMessage("");
    setFile(uploadedFile);

    // 🔹 Delay slightly to show animation
    setTimeout(() => {
      setShowForm(true);
    }, 500);
  };

  const validateFileType = (file) => {
    const fileTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    return fileTypes.includes(file.type);
  };

  const validateFileSize = (file) => {
    const sizeLimit = 200 * 1024 * 1024; // 200MB
    return file.size <= sizeLimit;
  };

  const onDraggingHandler = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onLeaveHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const uploadedFile = e.dataTransfer.files[0];
    if (!uploadedFile) return;

    if (!validateFileType(uploadedFile)) {
      setErrorMessage("Uploaded file type isn't supported");
      setFile(null);
      return;
    }

    if (!validateFileSize(uploadedFile)) {
      setErrorMessage("Uploaded file exceeds the file size limit");
      setFile(null);
      return;
    }

    setErrorMessage("");
    setFile(uploadedFile);
    e.dataTransfer.clearData();

    setTimeout(() => {
      setShowForm(true);
    }, 500);
  };

  const handleContainerClick = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white overflow-hidden relative">
      <Header />

      {/* ===================== Upload Section ===================== */}
      <section
        className={`transition-all duration-700 ease-in-out transform ${
          showForm ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pl-10 py-16 mt-20">
          {/* Left Side */}
          <div className="ml-20 mt-10">
            <p className="text-sm uppercase tracking-widest mb-4 text-gray-300">
              Calculate effort and cost breakdowns for FREE
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight mt-10">
              Docs In, Estimates <br /> OUT!
            </h2>
            <p className="text-lg mb-8 text-gray-200 leading-relaxed mt-10">
              Upload your BRD or RFQ, choose an estimation technique, and
              instantly get effort and cost breakdowns — helping you plan smarter,
              save time, and make confident decisions.
            </p>

            {/* Upload Box */}
            <div
              onDrop={onDropHandler}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={onDraggingHandler}
              onDragLeave={onLeaveHandler}
              onClick={handleContainerClick}
              className={`relative cursor-pointer z-30 border-2 border-dashed rounded-xl p-10 text-center mt-12 shadow-lg mr-9 transition 
              ${
                isDragging
                  ? "border-yellow-400 bg-blue-600"
                  : "border-white/70 bg-blue-700"
              }`}
            >
              <div className="absolute top-3 right-3 bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
                🔒 100% privacy
              </div>

              <div className="flex justify-center mb-6">
                <div className="bg-white/20 p-6 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-xl font-bold mb-2">
                Drop your file here or{" "}
                <label
                  htmlFor="file-upload"
                  className="text-yellow-300 cursor-pointer hover:underline"
                >
                  choose a file
                </label>
                .
              </p>

              <p className="text-sm text-gray-200">
                Supported: BRD, RFQ (PDF/DOCX). Max 200MB.
              </p>

              {errorMessage && (
                <p className="mt-4 bg-red-500/20 text-red-300 text-sm px-4 py-2 rounded-lg animate-fadeIn">
                  {errorMessage}
                </p>
              )}

              <input
                ref={inputFileRef}
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={handleFileUpload}
                className="hidden"
              />

              {file && (
                <p className="mt-4 text-sm text-gray-200">
                  Selected file:{" "}
                  <span className="font-semibold">{file.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* Right Side (Image) */}
          <div className="absolute flex justify-end overflow-visible right-0">
            <img
              src="/laptop.png"
              alt="Laptop Preview"
              className="w-[60vw] md:w-[72vw] object-cover translate-x-[30%]"
            />
          </div>
        </div>
      </section>

      {/* ===================== Form Section ===================== */}
      <section
        className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
          showForm ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="min-h-screen flex flex-col justify-center items-center px-10">
          <h2 className="text-4xl font-bold mb-10 text-center">
            Provide Project Details
          </h2>

          <form
            className="bg-blue-800 p-10 rounded-2xl shadow-xl w-full max-w-lg space-y-6"
          >
            {/* Estimation Technique */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Estimation Technique
              </label>
              <select
                className="w-full p-3 rounded-lg text-black focus:outline-none"
                required
              >
                <option value="">Select a technique</option>
                <option value="use-case based">Use Case Based</option>
                <option value="cocomo">COCOMO</option>
                <option value="function point">Function Point</option>
                <option value="t-shirt sizing">T-Shirt Sizing</option>
              </select>
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Project Type
              </label>
              <input
                type="text"
                placeholder="e.g. Web App"
                className="w-full p-3 rounded-lg text-black focus:outline-none"
                required
              />
            </div>

            {/* Project Scale */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Project Scale
              </label>
              <div className="flex gap-6">
                {["Small", "Medium", "Large", "Mega"].map((scale) => (
                  <label key={scale} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="scale"
                      value={scale}
                      className="accent-yellow-400"
                      required
                    />
                    {scale}
                  </label>
                ))}
              </div>
            </div>

            {/* Time Constraint */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Time Constraint (months)
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 3"
                className="w-full p-3 rounded-lg text-black focus:outline-none"
                required
              />
            </div>

            {/* Project Budget */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Project Budget (INR)
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 50000"
                className="w-full p-3 rounded-lg text-black focus:outline-none"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition"
            >
              Generate Estimation
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
