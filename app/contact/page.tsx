"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    budget: "$1-5k",
    email: "",
    details: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (budget: string) => {
    setFormData((prev) => ({ ...prev, budget }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          access_key: "2b07d43f-7835-402f-9569-7397e85be4ff", // Your web3forms access key
        }),
      });
  
      const data = await response.json();
      
      if (data.success) {
        setFormSubmitted(true);
        setFormData({
          name: "",
          service: "",
          budget: "$1-5k",
          email: "",
          details: "",
        });
      } else {
        console.error("Error submitting form:", data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="relative font-sans">
      {/* Transparent Top Bar */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-transparent px-6 md:px-8 py-4">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/logo-black.png"
              alt="EngineeRD Logo"
              width={300}
              height={80}
              className="object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-16 py-2">
            <Link href="/about" className="text-black hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="/industries" className="text-black hover:text-gray-600 transition-colors">
              Industries
            </Link>
            <Link href="/products" className="text-black hover:text-gray-600 transition-colors">
              Products
            </Link>
            <Link href="/careers" className="text-black hover:text-gray-600 transition-colors">
              Careers
            </Link>
          </nav>
        </div>
      </header>

      {/* Contact Section */}
      <section className="pt-24 md:pt-32 bg-white px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="max-w-5xl mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6">
              Hi! We Are Ready
              <br />
              To <span className="text-engineerd-red">Consult You.</span>
            </h2>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="mt-8 md:mt-12 max-w-xl">
            {/* Name and Service Interest */}
            <div className="mb-6 md:mb-8">
              <p className="text-lg md:text-xl text-gray-800 mb-2 whitespace-nowrap">
                My name is{" "}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:border-engineerd-red outline-none px-2 w-full max-w-xs"
                  placeholder="first & last name"
                  required
                />{" "}
                and I'm interested in{" "}
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:border-engineerd-red outline-none px-2 w-full max-w-xs"
                  placeholder="service name"
                  required
                />
                .
              </p>
            </div>

            {/* Budget Selection */}
            <div className="mb-6 md:mb-8">
              <p className="text-lg md:text-xl text-gray-800 mb-4">My project budget</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {["$1-5k", "$5-10k", "$10-20k", "$20k+"].map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => handleBudgetChange(budget)}
                    className={`rounded-full px-4 py-2 border ${
                      formData.budget === budget
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="mb-6 md:mb-8">
              <p className="text-lg md:text-xl text-gray-800 mb-2">
                Please contact me at{" "}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:border-engineerd-red outline-none px-2 w-full max-w-md"
                  placeholder="name@example.com"
                  required
                />
                .
              </p>
            </div>

            {/* Project Details */}
            <div className="mb-8 md:mb-10">
              <p className="text-lg md:text-xl text-gray-800 mb-2">
                Optionally, I'm sharing more:{" "}
                <input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:border-engineerd-red outline-none px-2 w-full max-w-md"
                  placeholder="your project details"
                />
                .
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formSubmitting}
              className={`inline-flex items-center px-6 py-3 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300 ${
                formSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {formSubmitting ? "Sending..." : "Send request"} <span className="ml-2">→</span>
            </button>

            {formSubmitted && (
              <p className="mt-4 text-green-dark">Thank you! Your request has been submitted.</p>
            )}
          </form>
        </div>
      </section>

      <div className="h-16 md:h-20"></div>
      {/* Footer Section */}
            <footer className="relative w-full bg-black text-white z-[60]">
              <div className="relative">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image src="/images/footer-background.png" alt="Earth from space" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
      
                {/* Footer Content */}
                <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Logo and Company Info */}
                    <div>
                      <div className="mb-6">
                        <Image
                          src="/images/logo.png"
                          alt="EngineeRD Logo"
                          width={180}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>DUNS: 117111023</p>
                        <p>CAGE: 98WV0</p>
                        <p>UEI: JZQ8JPDCFCJ6</p>
                        <p>NAICS: 541330, 541512, 541511, 541618, 541715, 541990</p>
                      </div>
                    </div>
      
                    {/* Follow Us */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                      <div className="space-y-2">
                        <a
                          href="https://www.linkedin.com/company/engineerd/"
                          className="block text-gray-300 hover:text-white transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>
                        <a
                          href="https://www.instagram.com/getengineerd/"
                          className="block text-gray-300 hover:text-white transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Instagram
                        </a>
                        <a
                          href="https://x.com/getengineerd"
                          className="block text-gray-300 hover:text-white transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          X
                        </a>
                        <a
                          href="https://www.youtube.com/@getengineerd"
                          className="block text-gray-300 hover:text-white transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          YouTube
                        </a>
                        <a
                          href="https://www.facebook.com/engineerd/"
                          className="block text-gray-300 hover:text-white transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Facebook
                        </a>
                      </div>
                    </div>
      
                    {/* Reach Us */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Reach Us</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-white font-medium">Location</p>
                          <p className="text-gray-300">3060 Williams Drive, STE 300, Fairfax, VA 22031</p>
                        </div>
                        <div>
                          <p className="text-white font-medium">Hours</p>
                          <p className="text-gray-300">Monday - Friday 8am to 5pm</p>
                        </div>
                        <div>
                          <p className="text-white font-medium">Contact</p>
                          <p className="text-gray-300">+1 540-566-5669</p>
                          <p className="text-gray-300">solutions@engineerd.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
    </div>
  );
}
