import React, { useEffect } from "react";
import Header from "../components/Header";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
      useEffect(()=>{
        window.scrollTo(0,0);
      },[])
  return (
    <div className="min-h-screen bg-blue-900 text-white relative">
      <Header />

      {/* Main Section */}
      <section className="flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
          Get in Touch
        </h1>
        <p className="text-gray-300 text-lg text-center max-w-2xl">
          Have questions about effort estimation, partnerships, or want to
          collaborate? We’d love to hear from you!
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 w-full max-w-5xl">
          {/* Email */}
          <div className="bg-blue-800 p-8 rounded-2xl shadow-xl text-center border border-white/10 hover:bg-blue-700 transition">
            <Mail className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-300">effortestimatorsupport@gmail.com</p>
          </div>

          {/* Phone */}
          <div className="bg-blue-800 p-8 rounded-2xl shadow-xl text-center border border-white/10 hover:bg-blue-700 transition">
            <Phone className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-300">+91 9205228998</p>
          </div>

          {/* Location */}
          <div className="bg-blue-800 p-8 rounded-2xl shadow-xl text-center border border-white/10 hover:bg-blue-700 transition">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-300">Delhi NCR, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-blue-800 mt-16 p-10 rounded-2xl shadow-xl w-full max-w-xl space-y-6 border border-white/10">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg text-black focus:outline-none"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg text-black focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              className="w-full p-3 rounded-lg text-black focus:outline-none"
              rows="2"
              placeholder="How can we help?"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
