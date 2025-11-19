import React, { useState, useRef } from "react";
import Header from "../components/Header";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const inputFileRef = useRef(null);
  const [formData, setFormData] = useState({
    estimation_technique: "",
    project_type: "",
    project_scale: "",
    time_constraint: "",
    project_budget: "",
  });
  const [isSubmitting,setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name] : value}));
  }

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // remove "data:...base64,"
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!file){
      alert("File isn't available");
      return;
    }

    try{
      setIsSubmitting(true);
      const base64File = await convertFileToBase64(file);
      const payload = {
        ...formData,
        document_file: base64File,
        rate_card_file : "", //empty for now 
      }
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/estimate`,payload);
      console.log(result);
      alert("Result in console ready");
    }catch(error){
      console.error(error);
      alert("error");
    }finally{
      setIsSubmitting(false);
    }
  };

  // -------------------- File Handlers --------------------
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
  };

  const handleProceed = () => setShowForm(true);

  const handleCancel = () => {
    setFile(null);
    setErrorMessage("");
  };
  
  const handleContainerClick = () => {
    if (!file) inputFileRef.current.click();
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Header />

      {/* ===================== Page Transition Wrapper ===================== */}
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.section
            key="upload"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="min-h-screen flex items-center bg-blue-900 text-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pl-10 py-16 mt-20">
              {/* Left Side */}
              <div className="ml-20 mt-2">
                <p className="text-sm uppercase tracking-widest text-gray-300">
                  Calculate effort and cost breakdowns for FREE
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight mt-2">
                  Docs In, Estimates <br /> OUT!
                </h2>
                <p className="text-lg mb-2 text-gray-200 leading-relaxed mt-2">
                  Upload your BRD or RFQ, choose an estimation technique, and
                  instantly get effort and cost breakdowns — helping you plan
                  smarter, save time, and make confident decisions.
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
                  {!file ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancel();
                          }}
                          className="flex items-center gap-1 text-red-200 rounded-lg py-1 px-2 hover:text-red-500 font-semibold text-sm cursor-pointer"
                        >
                          <X className="h-5 w-5" /> Cancel
                        </button>
                      </div>
                      <div className="flex flex-col items-center justify-center mt-4">
                        <p className="text-lg font-semibold text-gray-100 mb-4 break-all">
                          Selected file:{" "}
                          <span className="font-semibold">{file.name}</span>
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProceed();
                          }}
                          className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition cursor-pointer"
                        >
                          Proceed →
                        </button>
                      </div>
                    </>
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
          </motion.section>
        ) : (
          <motion.section
            key="form"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="min-h-screen flex px-10 py-20 text-gray-800"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 left-6 hover:text-yellow-400 transition mt-20 cursor-pointer"
            >
              ← Back
            </button>

            <div className="w-[60%] pr-10 flex flex-col justify-center mt-15">
              <h2 className="text-4xl font-bold mb-10">
                Provide Project Details
              </h2>

              <form className="p-10 rounded-2xl shadow-xl w-full space-y-6 bg-cyan-100"
              onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Estimation Technique
                  </label>
                  <select
                    name="estimation_technique"
                    value={formData.estimation_technique}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg text-black focus:outline-none"
                    required
                  >
                    <option value="">Select a technique</option>
                    <option value="used-case based">Use Case Based</option>
                    <option value="cocomo">COCOMO</option>
                    <option value="function point estimation">Function Point</option>
                    <option value="story point estimation">Story Point</option>
                    <option value="t-shirt sizing based">T-Shirt Sizing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Project Type
                  </label>
                  <input
                    type="text"
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleInputChange}
                    placeholder="e.g. Web App"
                    className="w-full p-3 rounded-lg text-black focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Project Scale
                  </label>
                  <div className="flex gap-6">
                    {["Small", "Medium", "Large", "Mega"].map((scale) => (
                      <label key={scale} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="project_scale"
                          value={scale}
                          checked={formData.project_scale === scale}
                          onChange={handleInputChange}
                          className="accent-yellow-400"
                          required
                        />
                        {scale}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Time Constraint (months)
                  </label>
                  <input
                    type="number"
                    name="time_constraint"
                    value={formData.time_constraint}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="e.g. 3"
                    className="w-full p-3 rounded-lg text-black focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Project Budget (INR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="project_budget"
                    value={formData.project_budget}
                    onChange={handleInputChange}
                    placeholder="e.g. 50000"
                    className="w-full p-3 rounded-lg text-black focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled = {isSubmitting}
                  className={`w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition cursor-pointer ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300"
                  }`}
                >
                  Generate Estimation
                </button>
              </form>
            </div>
            <div className="w-[40%] pl-10 border-l border-black/20 flex flex-col mt-15">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Here's what to expect from your <br/>free effort estimation
              </h2>

              <ul className="text-gray-700 space-y-4 text-lg leading-relaxed grid grid-cols-2">
                <div className="mt-3">
                  <img src="./tech.svg" alt="img" className="w-50"/>
                  <li className="text-center mt-3 text-base font-semibold">✓ Technical complexity analysis</li>
                </div>
                <div className="ml-5 mt-3">
                  <img src="./time.svg" alt="img" className="w-50"/>
                  <li className="text-center mt-3 text-base font-semibold">✓ Timeline & resource breakdown</li>
                </div>
                <div className="mt-8">
                  <img src="./money.svg" alt="img" className="w-50" />
                  <li className="text-center mt-4 text-base font-semibold">✓ Cost estimation using your project budget</li>
                </div>
                <div className="ml-5 mt-8">
                  <img src="./output.svg" alt="img" className="w-50" />
                  <li className="text-center mt-4 text-base font-semibold">✓ Use Case / COCOMO / Function Point outputs</li>
                </div>
                {/* <li className="text-center">✓ A detailed effort table customized to your BRD</li> */}
              </ul>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
