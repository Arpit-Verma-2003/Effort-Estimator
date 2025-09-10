import React, { useState, useRef } from "react";
import Header from "../components/Header";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputFileRef = useRef(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const onDraggingHandler = (e) => {
    e.preventDefault();
    setIsDragging(true);
  }

  const onLeaveHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }

  const handleContainerClick = () => {
    inputFileRef.current.click();
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pl-10 py-16 mt-20">
        {/* Left Side */}
        <div className="ml-20 mt-10">
          <p className="text-sm uppercase tracking-widest mb-4 text-gray-300">
            Calculate effort and cost breakdowns for FREE
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight mt-10">
            Docs In, Estimates <br></br> OUT!
          </h2>
          <p className="text-lg mb-8 text-gray-200 leading-relaxed mt-10">
            Upload your BRD or RFQ, choose an estimation technique, and
            instantly get effort and cost breakdowns — helping you plan smarter,
            save time, and make confident decisions.
          </p>

          {/* Upload Section */}
          <div onDrop={onDropHandler} onDragOver={(e) => e.preventDefault()} onDragEnter={onDraggingHandler} onDragLeave={onLeaveHandler} onClick={handleContainerClick}
            className={`relative cursor-pointer border-2 border-dashed rounded-xl p-10 text-center mt-12 shadow-lg mr-9 transition 
            ${isDragging ? "border-yellow-400 bg-blue-600" : "border-white/70 bg-blue-700"}`}
          >
            {/* Privacy Badge */}
            <div className="absolute top-3 right-3 bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
              🔒 100% privacy
            </div>

            {/* Upload Icon */}
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

            {/* Heading */}
            <p className="text-xl font-bold mb-2">
              Drop your file here or{" "}
              <label
                htmlFor="file-upload"
                className="text-yellow-300 cursor-pointer hover:underline"
              >
                choose a file
              </label>.
            </p>

            {/* Subtext */}
            <p className="text-sm text-gray-200">
              Supported: BRD, RFQ (PDF/DOCX). Max 200MB.
            </p>

            {/* Hidden Input */}
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* File Selected */}
            {file && (
              <p className="mt-4 text-sm text-gray-200">
                Selected file: <span className="font-semibold">{file.name}</span>
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
      </section>
    </div>
  );
};

export default HomePage;
