"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const teamMembers = [
    { name: "Alex Wasielewski", role: "Solutions Architect", image: "/images/team/AlexHeadshot.png" },
    { name: "Allen Salazar", role: "SVP & Operations", image: "/images/team/AllenHeadshot.png" },
    { name: "Asaad Shaikh", role: "Software Engineer", image: "/images/team/AsaadHeadshot.png" },
    { name: "Coleman Early", role: "Project Manager", image: "/images/team/ColemanHeadshot.png" },
    { name: "Hala Nakhlawi", role: "UI/Graphic Designer", image: "/images/team/HalaHeadshot.png" },
    { name: "Josh Almonte", role: "Software Engineer", image: "/images/team/JoshHeadshot.png" },
    { name: "Rehan Mahmood", role: "CEO/Chief Dreamer", image: "/images/team/RehanHeadshot.png" },
    { name: "Sayeed Aktar", role: "Business Manager", image: "/images/team/SayeedHeadshot.png" },
    { name: "Theo Axelson", role: "Data Solutions Engineer", image: "/images/team/TheoHeadshot.png" },
    { name: "Venice Chan", role: "UX Researcher", image: "/images/team/VeniceHeadshot.png" },
  ];

export default function AboutPage() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  // Update scroll position and get window dimensions
  useEffect(() => {
    let ticking = false

    // Set initial window dimensions
    setWindowHeight(window.innerHeight)
    setWindowWidth(window.innerWidth)

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPosition(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // More granular screen size detection
  const isVerySmallScreen = windowHeight < 600
  const isSmallScreen = windowHeight < 800 && !isVerySmallScreen
  const isMediumScreen = windowHeight >= 800 && windowHeight < 1000
  const isLargeScreen = windowHeight >= 1000

  // Width detection
  const isWideScreen = windowWidth >= 1440
  const isNarrowScreen = windowWidth < 768

  // Calculate logo size based on screen dimensions
  const logoSize = isVerySmallScreen ? 180 : isSmallScreen ? 240 : 320

  // Calculate the background scale for the zoom effect
  const backgroundScale = 1 + scrollPosition / 2000

  return (
    <div className="relative font-sans">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 md:px-8 pt-3 md:pt-6">
        <div className="max-w-[1800px] mx-auto flex justify-between items-start">
          {/* Logo */}
          <div
            className="relative mt-2 md:mt-4"
            style={{
              height: `${logoSize}px`,
              width: `${logoSize}px`,
              transition: "height 0.3s, width 0.3s",
            }}
          >
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="EngineeRD Logo"
                width={logoSize}
                height={logoSize}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-16 py-2">
            <Link
              href="/about"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base text-white"
            >
              About
            </Link>
            <Link
              href="/industries"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base text-white"
            >
              Industries
            </Link>
            <Link
              href="/products"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base text-white"
            >
              Products
            </Link>
            <Link
              href="/careers"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base text-white"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="ml-2 lg:ml-4 inline-flex items-center px-4 py-1.5 lg:px-6 lg:py-2 border border-white rounded-full transition-all duration-300 text-sm lg:text-base text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "white"
                e.currentTarget.style.color = "black"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "white"
              }}
            >
              Contact Us <span className="ml-1 lg:ml-2">→</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden py-2 transition-colors duration-300 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `scale(${backgroundScale})` }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rS2PTLtTQMiDaetrcZb8UVsEVP1cgV.png"
              alt="EngineeRD Team at George Mason University"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col px-6 md:px-8">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col">
            {/* Main Content - centered in the viewport */}
            <div className="flex-grow flex flex-col justify-center">
              <div className="max-w-2xl">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">About Us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="max-w-[1800px] mx-auto px-6 md:px-8">
          <div className="mb-8">
            <h2 className="text-engineerd-red text-lg font-medium mb-4">About Us</h2>
            <p className="text-lg md:text-xl text-gray-800 max-w-4xl">
              EngineeRD is a technology consulting firm operating out of the National Capital Region (NCR) leveraging
              over 30 years of experience in computer engineering, human factors design, scientific research, and IT
              service management to eliminate burnout in the workplace. With our diverse solutions team, we use
              strategies in digital transformation, AI/ML, and process improvement. Our services help organizations
              become data-driven and future-ready.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="max-w-[1800px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            {/* Left Column */}
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                Our
                <br />
                Approach
              </h2>
              <div className="mt-8">
                <button className="bg-red-600 text-white rounded-full px-8 py-4 flex items-center hover:bg-red-700 transition-colors">
                  Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:w-2/3">
              {/* RISK Framework */}
              <div className="mb-12">
                <h3 className="text-engineerd-red text-xl font-medium mb-2">RISK Framework</h3>
                <p className="text-gray-600 text-sm mb-4">Renewable Ideas, Sustainable Knowledge</p>
                <p className="text-gray-800">
                  Our RISK methodology centers on continuously generating fresh ideas while preserving and scaling the
                  knowledge that drives digital transformation in our industry. This means staying adaptable:
                  identifying emerging technologies, learning from past implementations, and translating these lessons
                  into sustainable solutions. By emphasizing renewable thinking and sustainable knowledge capture, RISK
                  ensures our clients benefit from solutions that evolve alongside their business.
                </p>
              </div>

              {/* R.A.P.I.D Methodology */}
              <div>
                <h3 className="text-engineerd-red text-xl font-medium mb-2">R.A.P.I.D Methodology</h3>
                <p className="text-gray-600 text-sm mb-4">Research, Architect, Prototype, Integrate, Deliver</p>
                <p className="text-gray-800">
                  EngineeRD's RAPID methodology enables us to move quickly without compromising depth or quality. We
                  start with focused research to understand client needs, then architect scalable solutions tailored to
                  their environment. Rapid prototyping allows us to test ideas early, gather feedback, and reduce risk.
                  Integration ensures smooth adoption, and delivery means real results that are aligned with business
                  goals. RAPID is especially effective in our agents-as-a-service model, where flexibility and speed are
                  critical to meeting the constantly changing demands of modern enterprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="max-w-[1800px] mx-auto px-6 md:px-8">
          <h2 className="text-black text-4xl md:text-5xl font-bold mb-10">Meet The Team</h2>

          {/* Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className="relative w-full h-[200px] md:h-[270px] mb-4">
                    <Image
                        src={member.image || "/images/team/placeholder.png"}
                        alt={member.name}
                        fill
                        className="object-contain object-center"
                    />
                    </div>
                <h3 className="font-bold text-lg text-center">{member.name}</h3>
                <p className="text-sm text-gray-600 text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREP Students Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="max-w-[1800px] mx-auto px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-10">PREP Students</h2>

          {/* Students Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {/* Student - Vritika Narra */}
            <div className="flex flex-col">
              <div className="aspect-square relative mb-3 bg-gray-200"></div>
              <h3 className="font-bold text-lg">Vritika Narra</h3>
              <p className="text-sm text-gray-600">GMU Extern</p>
            </div>

            {/* Student - Ted Rangel */}
            <div className="flex flex-col">
              <div className="aspect-square relative mb-3 bg-gray-200"></div>
              <h3 className="font-bold text-lg">Ted Rangel</h3>
              <p className="text-sm text-gray-600">GMU Extern</p>
            </div>

            {/* Student - Javier Arana */}
            <div className="flex flex-col">
              <div className="aspect-square relative mb-3 bg-gray-200"></div>
              <h3 className="font-bold text-lg">Javier Arana</h3>
              <p className="text-sm text-gray-600">GMU Extern</p>
            </div>

            {/* Student - Nikita Chandrasini */}
            <div className="flex flex-col">
              <div className="aspect-square relative mb-3 bg-gray-200"></div>
              <h3 className="font-bold text-lg">Nikita Chandrasini</h3>
              <p className="text-sm text-gray-600">GMU Extern</p>
            </div>

            {/* Student - Huzaifah Shafique */}
            <div className="flex flex-col">
              <div className="aspect-square relative mb-3 bg-gray-200"></div>
              <h3 className="font-bold text-lg">Huzaifah Shafique</h3>
              <p className="text-sm text-gray-600">GMU Extern</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Section */}
        <section className="bg-gray-100 py-12 md:py-16">
        <div className="max-w-[1800px] mx-auto px-6 md:px-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-10">Advisory</h2>

            {/* Advisory Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 max-w-3xl">
            {/* Advisor - M. Ansar Shah */}
            <div className="flex flex-col items-center">
                <div className="relative w-full h-[270px] overflow-hidden bg-gray-200 mb-4">
                {/* Placeholder or image for M. Ansar Shah */}
                </div>
                <h3 className="font-bold text-lg">M. Ansar Shah</h3>
                <p className="text-sm text-gray-600">Advisor</p>
            </div>

            {/* Advisor - Sharon Jones */}
            <div className="flex flex-col items-center">
                <div className="relative w-full h-[270px] overflow-hidden bg-gray-200 mb-4">
                <Image
                    src="/images/team/SharonHeadshot.png"
                    alt="Sharon Jones"
                    fill
                    className="object-cover object-center"
                />
                </div>
                <h3 className="font-bold text-lg">Sharon Jones</h3>
                <p className="text-sm text-gray-600">Advisor</p>
            </div>

            {/* Advisor - Dr. Brian Ngac */}
            <div className="flex flex-col items-center">
                <div className="relative w-full h-[270px] overflow-hidden bg-gray-200 mb-4">
                <Image
                    src="/images/team/BrianHeadshot.png"
                    alt="Dr. Brian Ngac"
                    fill
                    className="object-cover object-center"
                />
                </div>
                <h3 className="font-bold text-lg">Dr. Brian Ngac</h3>
                <p className="text-sm text-gray-600">Advisor</p>
            </div>
            </div>
        </div>
        </section>

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

            {/* Copyright */}
            <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} EngineeRD. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

