import React, { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
    useEffect(()=>{
            window.scrollTo(0,0);
          },[])
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <Header />

      <section className="px-6 md:px-20 pt-32 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Pricing</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Transparent. Simple. Fair. Choose the plan that fits your estimation needs.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20 pb-20">

        {/* Free Plan */}
        <div className="bg-blue-800 p-10 rounded-2xl border border-yellow-400 shadow-xl transform hover:scale-[1.02] transition">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Free</h2>
          <p className="text-gray-300 mb-6">Perfect for testing and small teams</p>

          <ul className="text-gray-200 space-y-3 mb-8">
            <li>✓ 10 Estimations per day</li>
            <li>✓ All estimation techniques</li>
            <li>✓ File uploads up to 200MB</li>
            <li>✓ Downloadable tables</li>
          </ul>

          <p className="text-4xl font-bold mb-4">₹0</p>
          <button onClick={() => navigate("/")} className="bg-yellow-400 text-black font-bold w-full py-3 rounded-lg cursor-pointer hover:bg-yellow-300 transition">
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-blue-800 p-10 rounded-2xl border border-white/20 shadow-xl transform hover:scale-[1.02] transition relative">
          <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
            Coming Soon
          </div>
          <h2 className="text-3xl font-bold mb-4">Pro</h2>
          <p className="text-gray-300 mb-6">For professionals & teams</p>

          <ul className="text-gray-200 space-y-3 mb-8">
            <li>✓ Unlimited Estimations</li>
            <li>✓ Team collaboration</li>
            <li>✓ Priority processing</li>
            <li>✓ Extended file support</li>
          </ul>

          <p className="text-4xl font-bold mb-4">₹499/mo</p>
          <button className="bg-white text-black font-bold w-full py-3 rounded-lg opacity-50 cursor-not-allowed">
            Coming Soon
          </button>
        </div>

        {/* Enterprise */}
        <div className="bg-blue-800 p-10 rounded-2xl border border-white/20 shadow-xl transform hover:scale-[1.02] transition relative">
          <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
            Coming Soon
          </div>
          <h2 className="text-3xl font-bold mb-4">Enterprise</h2>
          <p className="text-gray-300 mb-6">For large organizations</p>

          <ul className="text-gray-200 space-y-3 mb-8">
            <li>✓ Custom SLAs</li>
            <li>✓ On-prem support</li>
            <li>✓ Custom limits</li>
            <li>✓ Dedicated success manager</li>
          </ul>

          <p className="text-4xl font-bold mb-4">Contact</p>
          <button className="bg-white text-black font-bold w-full py-3 rounded-lg opacity-50 cursor-not-allowed">
            Coming Soon
          </button>
        </div>

      </section>
    </div>
  );
};

export default PricingPage;
