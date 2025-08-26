import React, { useState } from "react";

const HomePage = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 bg-blue-950 shadow-lg">
        <h1 className="text-2xl font-bold">Effort Estimator</h1>
        <nav>
          <ul className="flex space-x-8 text-white text-lg font-medium">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">About</li>
            <li className="cursor-pointer hover:text-gray-300">Products</li>
            <li className="cursor-pointer hover:text-gray-300">Contact</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-10 py-16">
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
          <div className="relative bg-blue-700 border-2 border-dashed border-white/70 rounded-xl p-10 text-center mt-12 shadow-lg">
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
              Supported: BRD, RFQ (PDF/DOCX). Max 2MB.
            </p>

            {/* Hidden Input */}
            <input
              id="file-upload"
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
        <div className="flex justify-center items-center">
          <img
            src="/laptop.png" // place your image in public folder as laptop.png
            alt="Laptop Preview"
            className="w-[90%] rounded-lg shadow-2xl"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
