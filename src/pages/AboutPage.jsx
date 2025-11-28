import React, { useEffect } from "react";
import Header from "../components/Header";

const AboutPage = () => {

    useEffect(()=>{
      window.scrollTo(0,0);
    },[])  
  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 pt-32 pb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
          About Effort Estimator
        </h1>
        <p className="text-gray-300 text-lg text-center max-w-2xl leading-relaxed">
          A smarter, faster way to predict project effort and cost. Built for
          businesses, engineers, and decision-makers who want clarity — not
          guesswork.
        </p>
      </section>

      {/* Vision & Mission Section */}
      <section className="px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Vision */}
        <div className="bg-blue-800 p-10 rounded-2xl border border-white/10 shadow-xl hover:bg-blue-700 transition">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            To empower teams with intelligent estimation tools that reduce
            uncertainty, accelerate planning, and improve project outcomes —
            powered by AI, data, and practical engineering principles.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-blue-800 p-10 rounded-2xl border border-white/10 shadow-xl hover:bg-blue-700 transition">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            We aim to simplify and streamline the estimation process by
            automating document analysis, applying reliable estimation
            techniques, and presenting insights in a clear, actionable format.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="px-6 md:px-24 py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">What We Do</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-blue-800 p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-blue-700 transition">
            <h3 className="text-xl font-semibold mb-3">Document Parsing</h3>
            <p className="text-gray-300 leading-relaxed">
              We extract and process BRDs, RFQs, and product documents using AI,
              ensuring every detail contributes to accurate estimation.
            </p>
          </div>

          <div className="bg-blue-800 p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-blue-700 transition">
            <h3 className="text-xl font-semibold mb-3">Effort Estimation</h3>
            <p className="text-gray-300 leading-relaxed">
              Using industry-standard methods like Use-Case, COCOMO, Function
              Point & more, we generate dependable effort breakdowns.
            </p>
          </div>

          <div className="bg-blue-800 p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-blue-700 transition">
            <h3 className="text-xl font-semibold mb-3">Cost Prediction</h3>
            <p className="text-gray-300 leading-relaxed">
              Combine your project budget and rate cards with effort estimates to
              get a clear, transparent cost structure for project delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="px-6 md:px-20 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Why We Built This</h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          After years of seeing businesses struggle with unclear timelines, 
          misaligned budgets, and slow manual estimation processes, we created 
          Effort Estimator to bring speed, accuracy, and predictability to 
          project planning.  
          <br /><br />
          Our goal is simple — help teams make confident decisions with 
          AI-driven insights.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
