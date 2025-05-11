import React, { useState } from 'react';
import axios from 'axios';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/contact", formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setError('');
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setError('There was an error submitting the form. Please try again later.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Your Name"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Your Email"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        type="text"
                        placeholder="Subject"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="5"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                    >
                        Send Message
                    </button>
                    {submitted && (
                        <p className="text-green-600 mt-2">Thank you! We'll get back to you soon.</p>
                    )}
                    {error && (
                        <p className="text-red-600 mt-2">{error}</p>
                    )}
                </form>

                {/* Contact Details */}
                <div className="bg-gray-50 rounded-lg shadow-md p-6 space-y-4">
                    <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
                    <p>📧 <strong>Email:</strong> support@tokogo.com</p>
                    <p>📞 <strong>Phone:</strong> +971-123-456789</p>
                    <p>📍 <strong>Address:</strong> TokoGo Madiwala, Zuzuvadi, BTM Layout, Bengaluru</p>
                    <p>🕐 <strong>Hours:</strong> Mon–Sun: 10am – 1am</p>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Find Us on the Map</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7125595090115!2d77.61692889999999!3d12.9261869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158c03896ec9%3A0xcf0f6a2d9fab1e74!2sToko!5e0!3m2!1sen!2sin!4v1746515629188!5m2!1sen!2si"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-md"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage;
