import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const messages = [
  "Sending your request...",
  "Extracting key insights...",
  "Analyzing your document...",
  "LLM processing data...",
  "Understanding project requirements...",
  "LLM computing effort...",
  "Estimating project cost...",
  "Finalizing your results...",
];

const LoadingScreen = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [fade, setFade] = useState(true);

  // Typing animation
  useEffect(() => {
    const currentMessage = messages[index];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= currentMessage.length) {
        setDisplayed(currentMessage.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 35);

    return () => clearInterval(typingInterval);
  }, [index]);

  // Rotate messages with fade transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true); // fade in
      }, 300);
    }, 2300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col">

      {/* Keep header visible */}
      <Header />

      {/* Subtle AI wave background */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-blue-300 animate-pulse-slow"></div>
      </div>

      {/* Main loading area */}
      <div className="flex flex-1 items-center justify-center relative">
        <div className="flex items-center gap-12">

          {/* Loader (WITHOUT orbiting dot) */}
          <div className="relative">
            <div className="h-20 w-20 border-8 border-gray-300 border-t-yellow-500 rounded-full animate-spin-slow"></div>

            {/* Soft glow */}
            <div className="absolute inset-0 rounded-full blur-2xl bg-yellow-400 opacity-30"></div>
          </div>

          {/* Text + progress shimmer */}
          <div className="flex flex-col gap-4">

            {/* Typing + fade + blinking cursor */}
            <div
              className={`text-xl font-semibold text-gray-700 min-h-[32px] w-[360px] transition-all duration-500 ${
                fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <span className="inline-block">
                {displayed}
                <span className="blinking-cursor">|</span>
              </span>
            </div>

            {/* Shimmer Progress Bar */}
            <div className="w-[360px] h-2 bg-gray-200 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 animate-shimmer"></div>
            </div>

          </div>

        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite linear;
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 0.12; }
            50% { opacity: 0.25; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }

          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 1.8s linear infinite;
          }

          @keyframes blink {
            0% { opacity: 1 }
            50% { opacity: 0 }
            100% { opacity: 1 }
          }
          .blinking-cursor {
            animation: blink 0.8s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
