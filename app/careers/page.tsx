"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

// Define job data with URLs
const jobListings = [
  {
    id: 1,
    title: "Power Platform Solution Architect, Associate",
    description: "Innovate, build, and power the future with cutting-edge solutions.",
    field: "Business Administration",
    type: "Internship",
    url: "https://jobs.gusto.com/postings/engineerd-solutions-llc-internship-business-administration-0ebdf7b6-ba72-4ab6-ae1d-978afff2d105",
  },
  {
    id: 2,
    title: "Power Platform Functional Consultant, Associate",
    description: "Innovate, build, and power the future with cutting-edge solutions.",
    field: "Management Information Systems",
    type: "Internship",
    url: "https://jobs.gusto.com/postings/engineerd-solutions-llc-internship-management-information-systems-f7540a3b-cb95-4535-8f80-70271c88bbf0",
  },
  {
    id: 3,
    title: "System Administrator Associate",
    description: "Innovate, build, and power the future with cutting-edge solutions.",
    field: "Technology",
    type: "Internship",
    url: "https://jobs.gusto.com/postings/engineerd-solutions-llc-system-administrator-associate-790da5dc-fedc-408b-a18f-9f4ac5532663",
  },
  {
    id: 4,
    title: "Cybersecurity and AI R&D",
    description: "Innovate, build, and power the future with cutting-edge solutions.",
    field: "Technology",
    type: "Internship",
    url: "https://jobs.gusto.com/postings/engineerd-solutions-llc-internship-cybersecurity-and-ai-r-d-c1647acf-b9ac-443d-8cba-3d397b99a01a",
  },
]

export default function CareersPage() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [positionTypeOpen, setPositionTypeOpen] = useState(false)
  const [fieldOpen, setFieldOpen] = useState(false)
  const [selectedPositionType, setSelectedPositionType] = useState("All")
  const [selectedField, setSelectedField] = useState("All")
  const [filteredJobs, setFilteredJobs] = useState(jobListings)

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

  // Filter jobs when filters change
  useEffect(() => {
    let result = jobListings

    if (selectedPositionType !== "All") {
      result = result.filter((job) => job.type === selectedPositionType)
    }

    if (selectedField !== "All") {
      result = result.filter((job) => job.field === selectedField)
    }

    setFilteredJobs(result)
  }, [selectedPositionType, selectedField])

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

  // Calculate header height to use for content padding
  const headerHeight = isVerySmallScreen ? 120 : isSmallScreen ? 160 : 200

  // Calculate the background scale for the zoom effect
  const backgroundScale = 1 + scrollPosition / 2000

  // Toggle dropdown states
  const togglePositionType = () => setPositionTypeOpen(!positionTypeOpen)
  const toggleField = () => setFieldOpen(!fieldOpen)

  // Handle filter selections
  const handlePositionTypeSelect = (type) => {
    setSelectedPositionType(type)
    setPositionTypeOpen(false)
  }

  const handleFieldSelect = (field) => {
    setSelectedField(field)
    setFieldOpen(false)
  }

  // Get unique position types and fields for filters
  const positionTypes = ["All", ...new Set(jobListings.map((job) => job.type))]
  const fields = ["All", ...new Set(jobListings.map((job) => job.field))]

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
      <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `scale(${backgroundScale})` }}
          >
            <Image
              src="/images/careers-background.png"
              alt="Team collaboration"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col px-6 md:px-8">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col">
            {/* Main Content - centered in the viewport */}
            <div className="flex-grow flex flex-col justify-center pt-24">
              <div className="max-w-2xl">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">Careers</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-100 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-8">
          <h2 className="text-engineerd-red text-lg font-medium mb-4">About Us</h2>
          <p className="text-xl md:text-2xl text-gray-800 max-w-4xl">
            EngineeRD is industry&apos;s melting pot for problem solvers who love chasing challenges and finding
            underserved issues. We have the joy of joining together diverse experts across all cultures, sciences,
            humanities and arts to research, design and engineer tailored solutions for the most complex problems. Come
            join us as a Solutioneer!
          </p>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="bg-gray-100 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 md:mb-0">Open Positions</h2>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Position Type Dropdown */}
              <div className="relative">
                <button
                  onClick={togglePositionType}
                  className="flex items-center justify-between w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <span>{selectedPositionType}</span>
                  <ChevronDown
                    className={`ml-2 h-5 w-5 transition-transform ${positionTypeOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {positionTypeOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {positionTypes.map((type) => (
                        <button
                          key={type}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handlePositionTypeSelect(type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Field Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleField}
                  className="flex items-center justify-between w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <span>{selectedField}</span>
                  <ChevronDown className={`ml-2 h-5 w-5 transition-transform ${fieldOpen ? "rotate-180" : ""}`} />
                </button>
                {fieldOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {fields.map((field) => (
                        <button
                          key={field}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleFieldSelect(field)}
                        >
                          {field}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="border-t border-gray-300">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <a
                  key={job.id}
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-b border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <div className="py-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div className="md:w-2/3">
                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                        <p className="text-gray-600 mb-4">{job.description}</p>
                      </div>
                      <div className="md:w-1/3 md:text-right">
                        <p className="text-gray-800 font-medium">{job.field}</p>
                        <p className="text-gray-600">{job.type}</p>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-600 text-lg">No positions match your current filters.</p>
                <button
                  onClick={() => {
                    setSelectedPositionType("All")
                    setSelectedField("All")
                  }}
                  className="mt-4 text-engineerd-red hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
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

