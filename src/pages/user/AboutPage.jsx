import React from "react";
import logo from "../../assets/tokologo.png";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white text-gray-800 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Logo & Intro */}
        <div className="text-center mb-16">
          <img src={logo} alt="Toko Logo" className="mx-auto w-28 hover:scale-105 transition-transform duration-300" />
          <h1 className="text-5xl font-extrabold mt-6 bg-gradient-to-r from-green-600 to-teal-500 text-transparent bg-clip-text hover:brightness-110 transition">
            About Toko
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Toko is your go-to travel companion — from premium imported chocolates to souvenirs, snacks, and thoughtful gifts, all under one roof.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4 hover:text-teal-600 transition duration-200">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            We aim to redefine convenience shopping by offering a curated mix of high-quality travel products,
            delivered with care, efficiency, and a smile.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-10 hover:text-teal-600 transition">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 md:px-0">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900">Team Member {i}</h4>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Passionate about quality and service. Making every shopping experience delightful.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Google Map Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6 hover:text-teal-600 transition">
            Find Us Here
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px] w-full group">
            <iframe
              title="Toko Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7125595090115!2d77.61692889999999!3d12.9261869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158c03896ec9%3A0xcf0f6a2d9fab1e74!2sToko!5e0!3m2!1sen!2sin!4v1746515629188!5m2!1sen!2si"
              className="w-full h-full border-0 group-hover:scale-105 transition-transform duration-500"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-full text-lg font-medium shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
