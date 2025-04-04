"use client"

import type React from "react"

import { useEffect, useState, useRef, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"

// Define partners data
const partners = [
  {
    name: "Microsoft",
    logo: "/images/partners/microsoft-logo.png",
  },
  {
    name: "George Mason University",
    logo: "/images/partners/gmu-logo.png",
  },
  {
    name: "Adobe",
    logo: "/images/partners/adobe-logo.png",
  },
  {
    name: "Atlassian",
    logo: "/images/partners/atlassian-logo.png",
  },
  {
    name: "AWS",
    logo: "/images/partners/aws-logo.png",
  },
  {
    name: "Virginia APEX Accelerator",
    logo: "/images/partners/virginia-apex-logo.png",
  },
  {
    name: "DISA",
    logo: "/images/partners/disa-logo.png",
  },
]

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    budget: "$1-5k",
    email: "",
    details: "",
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const statsRef = useRef<HTMLDivElement>(null)
  const partnersRef = useRef<HTMLDivElement>(null)

  // Update scroll position with smoother tracking and get window dimensions
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
  }, [windowHeight])

  // Calculate the transform for the about section with smoother transition
  const aboutSectionTransform = `translateY(${Math.max(0, 100 - scrollPosition / 7)}vh)`

  // Calculate the transform for the services section with more gradual transition
  const servicesSectionTransform = `translateY(${Math.max(0, 200 - (scrollPosition - windowHeight) / 5)}vh)`

  // Calculate the transform for the contact section with similar transition to about
  const contactSectionTransform = `translateY(${Math.max(0, 300 - (scrollPosition - windowHeight * 2) / 5)}vh)`

  // Calculate the transform for the consult section - adjusted to appear later
  const consultSectionTransform = `translateY(${Math.max(0, 400 - (scrollPosition - windowHeight * 3.5) / 5)}vh)`

  // Calculate the scale for the background image zoom effect - more gradual
  const backgroundScale = 1 + scrollPosition / 2000

  // COMPLETELY REVISED COLOR TRANSITION APPROACH

  // First transition: white to black (for first to second section)
  const firstColorTransitionPoint = 500
  const firstColorTransitionDuration = 200

  // Second transition: black to white (for second to third section)
  // This should happen exactly when the contact section starts to appear
  const secondColorTransitionPoint = windowHeight * 2 + 100 // Just as contact section starts to appear
  const secondColorTransitionDuration = 100 // Quick transition

  // Third transition: white to black (for third to fourth section)
  const thirdColorTransitionPoint = windowHeight * 3 - 100
  const thirdColorTransitionDuration = 100 // Quicker transition

  // Fourth transition: black to white (for fourth to footer)
  const fourthColorTransitionPoint = windowHeight * 4 + 200
  const fourthColorTransitionDuration = 200

  // Calculate progress of transitions (0 to 1)
  const firstColorTransitionProgress = Math.min(
    1,
    Math.max(0, (scrollPosition - firstColorTransitionPoint) / firstColorTransitionDuration),
  )

  const secondColorTransitionProgress = Math.min(
    1,
    Math.max(0, (scrollPosition - secondColorTransitionPoint) / secondColorTransitionDuration),
  )

  const thirdColorTransitionProgress = Math.min(
    1,
    Math.max(0, (scrollPosition - thirdColorTransitionPoint) / thirdColorTransitionDuration),
  )

  const fourthColorTransitionProgress = Math.min(
    1,
    Math.max(0, (scrollPosition - fourthColorTransitionPoint) / fourthColorTransitionDuration),
  )

  // Determine if we're in the consulting section - make this more aggressive
  const isInConsultingSection = scrollPosition >= windowHeight * 3 - 200

  // Calculate final color value (255 -> 0 -> 255 -> 0 -> 255)
  // Force black (0) when in consulting section
  const textColorValue = isInConsultingSection
    ? 0
    : Math.round(
        255 *
          (1 -
            firstColorTransitionProgress +
            secondColorTransitionProgress -
            thirdColorTransitionProgress +
            fourthColorTransitionProgress),
      )
  const textColor = `rgb(${textColorValue}, ${textColorValue}, ${textColorValue})`

  // Calculate opacity for logo transition
  // Force white logo to be invisible and black logo to be fully visible in consulting section
  const whiteLogoOpacity = isInConsultingSection
    ? 0
    : 1 -
      firstColorTransitionProgress +
      secondColorTransitionProgress -
      thirdColorTransitionProgress +
      fourthColorTransitionProgress

  const blackLogoOpacity = isInConsultingSection
    ? 1
    : firstColorTransitionProgress -
      secondColorTransitionProgress +
      thirdColorTransitionProgress -
      fourthColorTransitionProgress

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

  // Update the partner logo height calculation to be slightly smaller
  const partnerLogoHeight = isNarrowScreen ? 70 : isWideScreen ? 100 : 85

  // Calculate the white section height - reduced to give more space to the dark section
  const whiteBackgroundHeight = isVerySmallScreen ? "50%" : isSmallScreen ? "55%" : "60%"

  // Calculate the dark section height - increased to have more space
  const darkBackgroundHeight = isVerySmallScreen ? "50%" : isSmallScreen ? "45%" : "40%"

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle budget selection
  const handleBudgetChange = (budget: string) => {
    setFormData((prev) => ({ ...prev, budget }))
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          access_key: "2b07d43f-7835-402f-9569-7397e85be4ff", // Replace with your actual access key
        }),
      })

      if (response.ok) {
        setFormSubmitted(true)
        setFormData({
          name: "",
          service: "",
          budget: "$1-5k",
          email: "",
          details: "",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setFormSubmitting(false)
    }
  }

  // Debug info - will be hidden in production
  // useEffect(() => {
  //   if (debugRef.current) {
  //     debugRef.current.textContent = `
  //       Scroll: ${scrollPosition}
  //       Window Height: ${windowHeight}
  //       First Transition: ${firstColorTransitionPoint} (Progress: ${firstColorTransitionProgress.toFixed(2)})
  //       Second Transition: ${secondColorTransitionPoint} (Progress: ${secondColorTransitionProgress.toFixed(2)})
  //       Third Transition: ${thirdColorTransitionPoint} (Progress: ${thirdColorTransitionProgress.toFixed(2)})
  //       Fourth Transition: ${fourthColorTransitionPoint} (Progress: ${fourthColorTransitionProgress.toFixed(2)})
  //       Text Color Value: ${textColorValue}
  //       In Consulting Section: ${isInConsultingSection}
  //       White Logo Opacity: ${whiteLogoOpacity}
  //       Black Logo Opacity: ${blackLogoOpacity}
  //     `

  //     // Make debug visible during development
  //     debugRef.current.style.display = "block"
  //   }
  // }, [
  //   scrollPosition,
  //   windowHeight,
  //   firstColorTransitionProgress,
  //   secondColorTransitionProgress,
  //   thirdColorTransitionProgress,
  //   fourthColorTransitionProgress,
  //   textColorValue,
  //   isInConsultingSection,
  //   whiteLogoOpacity,
  //   blackLogoOpacity,
  // ])

  // Function to render partner logo with proper rounded corners
  const renderPartnerLogo = (partner, key) => {
    // Special handling for Adobe logo with a much more aggressive approach
    const isAdobe = partner.name === "Adobe"

    if (isAdobe) {
      return (
        <div
          key={key}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: `${partnerLogoHeight}px`,
            margin: "0 40px",
          }}
        >
          <div
            style={{
              height: `${partnerLogoHeight}px`,
              width: "auto",
              maxWidth: "280px",
              borderRadius: "8px", // Same as other logos
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.01)",
              padding: "2px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={280}
                  height={partnerLogoHeight}
                  style={{
                    height: `${partnerLogoHeight - 4}px`,
                    width: "auto",
                    maxWidth: "280px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Regular handling for other logos
    return (
      <div
        key={key}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: `${partnerLogoHeight}px`,
          margin: "0 40px",
        }}
      >
        <div
          style={{
            height: `${partnerLogoHeight}px`,
            width: "auto",
            maxWidth: "280px",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Image
              src={partner.logo || "/placeholder.svg"}
              alt={partner.name}
              width={280}
              height={partnerLogoHeight}
              style={{
                height: `${partnerLogoHeight}px`,
                width: "auto",
                maxWidth: "280px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative font-sans">
      {/* Debug info - hidden in production */}
      {/* <div
        ref={debugRef}
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          background: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "10px",
          fontSize: "12px",
          zIndex: 9999,
          display: "none", // Set to 'block' for debugging
        }}
      ></div> */}

      {/* Fixed Header with color transitions */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 md:px-8 pt-3 md:pt-6">
        <div className="max-w-[1800px] mx-auto flex justify-between items-start">
          {/* Logo with color transition */}
          <div
            className="relative mt-2 md:mt-4"
            style={{
              height: `${logoSize}px`,
              width: `${logoSize}px`,
              transition: "height 0.3s, width 0.3s",
            }}
          >
            {/* White logo (visible in first and third sections) */}
            <div
              className="absolute top-0 left-0 transition-opacity duration-300"
              style={{ opacity: whiteLogoOpacity }}
            >
              <Image
                src="/images/logo.png"
                alt="EngineeRD Logo"
                width={logoSize}
                height={logoSize}
                className="object-contain"
              />
            </div>

            {/* Black logo (visible in second and fourth sections) */}
            <div
              className="absolute top-0 left-0 transition-opacity duration-300"
              style={{ opacity: blackLogoOpacity }}
            >
              <Image
                src="/images/logo-black.png"
                alt="EngineeRD Logo"
                width={logoSize}
                height={logoSize}
                className="object-contain"
              />
            </div>
          </div>

          {/* Navigation Links with dynamic color */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-16 py-2">
            <Link
              href="/about"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              About
            </Link>
            <Link
              href="/industries"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              Industries
            </Link>
            <Link
              href="/products"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              Products
            </Link>
            <Link
              href="/careers"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="ml-2 lg:ml-4 inline-flex items-center px-4 py-1.5 lg:px-6 lg:py-2 border rounded-full transition-all duration-300 text-sm lg:text-base"
              style={{
                color: textColor,
                borderColor: textColor,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = textColor
                e.currentTarget.style.color =
                  (firstColorTransitionProgress > secondColorTransitionProgress &&
                    secondColorTransitionProgress > thirdColorTransitionProgress) ||
                  thirdColorTransitionProgress > secondColorTransitionProgress
                    ? "white"
                    : "black"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = textColor
              }}
            >
              Contact Us <span className="ml-1 lg:ml-2">→</span>
            </Link>
          </nav>

          {/* Mobile Menu Button with dynamic color */}
          <button className="md:hidden py-2 transition-colors duration-300" style={{ color: textColor }}>
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

      {/* Hero Section - Fixed in place */}
      <section className="fixed top-0 left-0 w-full h-screen z-10">
        {/* Background Image with Gradient Overlay - with more gradual zoom effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `scale(${backgroundScale})` }}
          >
            <Image src="/images/background.png" alt="Earth from space" fill priority className="object-cover" />
            <Image src="/images/gray-gradient.png" alt="Gray gradient" fill className="object-cover" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col px-6 md:px-8">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col">
            {/* Main Content - centered in the viewport */}
            <div className="flex-grow flex flex-col justify-center pt-24">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Eliminating Burnout</h1>
                <p className="text-xl md:text-2xl text-white mb-12 max-w-xl">
                  We build digital products that liberate people to do what they love in work and home.
                </p>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="mb-16">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-white rounded-full text-white text-lg hover:bg-white hover:text-black transition"
              >
                Let's Connect <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with smoother Parallax Effect - No overflow */}
      <section
        className="fixed top-0 left-0 w-full h-screen bg-white overflow-hidden"
        style={{
          transform: aboutSectionTransform,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 20,
        }}
      >
        <div className={`h-full px-0 flex flex-col`}>
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col">
            {/* About Us Header - Adjusted to prevent header overlap and align with logo */}
            <div style={{ paddingTop: `${headerHeight}px` }} className="px-6 md:px-8 lg:px-12 xl:px-16">
              <h2
                className={`text-engineerd-red ${isVerySmallScreen ? "text-lg" : "text-xl md:text-2xl"} font-bold ${isVerySmallScreen ? "mb-1" : isSmallScreen ? "mb-2" : "mb-2 md:mb-4 lg:mb-6"}`}
              >
                About Us
              </h2>
            </div>

            {/* Main Description - Responsive font size and spacing, aligned with logo */}
            <div className="px-6 md:px-8 lg:px-12 xl:px-16">
              <p
                className={`${
                  isVerySmallScreen ? "text-base" : isSmallScreen ? "text-lg" : "text-xl md:text-2xl lg:text-3xl"
                } text-gray-800 font-normal ${
                  isVerySmallScreen
                    ? "mb-6"
                    : isSmallScreen
                      ? "mb-8"
                      : isMediumScreen
                        ? "mb-12 md:mb-16"
                        : "mb-16 md:mb-20 lg:mb-24 xl:mb-28"
                } w-full`}
              >
                EngineeRD is a Fairfax-based consulting firm leveraging engineering, science, and technology to solve
                complex challenges through digital transformation, AI/ML, and process improvement.
              </p>
            </div>

            {/* Why Choose Us Section - Adaptive layout with increased spacing */}
            <div className="flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16">
              <div
                className={`flex flex-col md:flex-row ${
                  isVerySmallScreen
                    ? "gap-x-4 gap-y-2"
                    : isSmallScreen
                      ? "gap-x-6 gap-y-3"
                      : isMediumScreen
                        ? "gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6"
                        : "gap-x-8 md:gap-x-16 lg:gap-x-20 xl:gap-x-24 gap-y-4 md:gap-y-8 lg:gap-y-10 xl:gap-y-12"
                }`}
              >
                {/* Left side - Why Choose Us heading with line break */}
                <div
                  className={`md:w-1/3 ${isVerySmallScreen ? "md:pr-2" : isSmallScreen ? "md:pr-3" : "md:pr-4 md:pr-8 lg:pr-12"}`}
                >
                  <h3
                    className={`${
                      isVerySmallScreen ? "text-base" : isSmallScreen ? "text-lg" : "text-xl md:text-2xl"
                    } font-bold text-gray-800 ${isVerySmallScreen ? "mb-2" : isSmallScreen ? "mb-3" : "mb-4"} md:mb-0`}
                  >
                    Why
                    <br />
                    Choose Us
                  </h3>
                </div>

                {/* Right side - Grid of reasons with adaptive sizing and increased spacing */}
                <div
                  className={`md:w-2/3 ${isVerySmallScreen ? "md:pl-2" : isSmallScreen ? "md:pl-3" : "md:pl-4 md:pl-8 lg:pl-12"} flex justify-end items-start`}
                >
                  {/* Added top padding to align with "Why Choose Us" text */}
                  <div className="w-full md:w-5/6 md:pt-8 lg:pt-10 xl:pt-12">
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 ${
                        isVerySmallScreen
                          ? "gap-x-4 gap-y-6"
                          : isSmallScreen
                            ? "gap-x-6 gap-y-8"
                            : isMediumScreen
                              ? "gap-x-8 md:gap-x-12 gap-y-10 md:gap-y-12"
                              : "gap-x-10 md:gap-x-16 lg:gap-x-20 xl:gap-x-24 gap-y-12 md:gap-y-16 lg:gap-y-20 xl:gap-y-24"
                      }`}
                    >
                      {/* Public Sector Experience */}
                      <div>
                        <div
                          className={`border-t border-gray-300 ${isVerySmallScreen ? "pt-3" : isSmallScreen ? "pt-4" : "pt-5 md:pt-6 lg:pt-7"}`}
                        >
                          <h4
                            className={`${
                              isVerySmallScreen ? "text-sm" : isSmallScreen ? "text-base" : "text-lg md:text-xl"
                            } font-bold text-gray-800 ${isVerySmallScreen ? "mb-3" : isSmallScreen ? "mb-4" : "mb-5 md:mb-6 lg:mb-7"}`}
                          >
                            Public Sector Experience
                          </h4>
                          <p
                            className={`${
                              isVerySmallScreen
                                ? "text-xs leading-tight"
                                : isSmallScreen
                                  ? "text-xs"
                                  : "text-sm md:text-base"
                            } text-gray-900 ${isVerySmallScreen ? "leading-tight" : "leading-snug md:leading-relaxed"}`}
                          >
                            Through two decades of government experience, we have developed comprehensive knowledge of
                            the Department of Defense ecosystem and operations.
                          </p>
                        </div>
                      </div>

                      {/* Re-Imagining Healthcare */}
                      <div>
                        <div
                          className={`border-t border-gray-300 ${isVerySmallScreen ? "pt-3" : isSmallScreen ? "pt-4" : "pt-5 md:pt-6 lg:pt-7"}`}
                        >
                          <h4
                            className={`${
                              isVerySmallScreen ? "text-sm" : isSmallScreen ? "text-base" : "text-lg md:text-xl"
                            } font-bold text-gray-800 ${isVerySmallScreen ? "mb-3" : isSmallScreen ? "mb-4" : "mb-5 md:mb-6 lg:mb-7"}`}
                          >
                            Re-Imagining Healthcare
                          </h4>
                          <p
                            className={`${
                              isVerySmallScreen
                                ? "text-xs leading-tight"
                                : isSmallScreen
                                  ? "text-xs"
                                  : "text-sm md:text-base"
                            } text-gray-900 ${isVerySmallScreen ? "leading-tight" : "leading-snug md:leading-relaxed"}`}
                          >
                            We use data analytics, AI, and secure systems to improve care delivery with a focus on
                            reliable solutions that drive efficiency and support public health.
                          </p>
                        </div>
                      </div>

                      {/* Forensic Methodology */}
                      <div>
                        <div
                          className={`border-t border-gray-300 ${isVerySmallScreen ? "pt-3" : isSmallScreen ? "pt-4" : "pt-5 md:pt-6 lg:pt-7"}`}
                        >
                          <h4
                            className={`${
                              isVerySmallScreen ? "text-sm" : isSmallScreen ? "text-base" : "text-lg md:text-xl"
                            } font-bold text-gray-800 ${isVerySmallScreen ? "mb-3" : isSmallScreen ? "mb-4" : "mb-5 md:mb-6 lg:mb-7"}`}
                          >
                            Forensic Methodology
                          </h4>
                          <p
                            className={`${
                              isVerySmallScreen
                                ? "text-xs leading-tight"
                                : isSmallScreen
                                  ? "text-xs"
                                  : "text-sm md:text-base"
                            } text-gray-900 ${isVerySmallScreen ? "leading-tight" : "leading-snug md:leading-relaxed"}`}
                          >
                            We apply systematic, evidence-based analysis to reveal hidden patterns and opportunities
                            that transform how organizations operate.
                          </p>
                        </div>
                      </div>

                      {/* Modernizing Work */}
                      <div>
                        <div
                          className={`border-t border-gray-300 ${isVerySmallScreen ? "pt-3" : isSmallScreen ? "pt-4" : "pt-5 md:pt-6 lg:pt-7"}`}
                        >
                          <h4
                            className={`${
                              isVerySmallScreen ? "text-sm" : isSmallScreen ? "text-base" : "text-lg md:text-xl"
                            } font-bold text-gray-800 ${isVerySmallScreen ? "mb-3" : isSmallScreen ? "mb-4" : "mb-5 md:mb-6 lg:mb-7"}`}
                          >
                            Modernizing Work
                          </h4>
                          <p
                            className={`${
                              isVerySmallScreen
                                ? "text-xs leading-tight"
                                : isSmallScreen
                                  ? "text-xs"
                                  : "text-sm md:text-base"
                            } text-gray-900 ${isVerySmallScreen ? "leading-tight" : "leading-snug md:leading-relaxed"}`}
                          >
                            From optimizing legacy systems to implementing AI-driven solutions, we empower organizations
                            to enhance efficiency and reduce costs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed position button container that's always visible - adjusted for very small screens */}
              <div
                className={`absolute ${isVerySmallScreen ? "bottom-4" : "bottom-8"} left-6 md:left-8 lg:left-12 xl:left-16`}
              >
                <Link
                  href="/contact"
                  className={`inline-flex items-center ${
                    isVerySmallScreen
                      ? "px-4 py-1.5 text-xs"
                      : isSmallScreen
                        ? "px-5 py-2 text-sm"
                        : "px-6 py-3 md:px-8 md:py-4 text-base md:text-lg"
                  } border border-gray-400 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition`}
                >
                  Let's Connect <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Parallax Effect */}
      <section
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{
          transform: servicesSectionTransform,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 30,
        }}
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/services-background.png"
            alt="Digital background"
            fill
            priority
            className="object-cover"
          />
          {/* Dark overlay for better text visibility */}
          <Image
            src="/images/dark-overlay.png"
            alt="Dark overlay"
            fill
            className="object-cover"
            style={{ opacity: 1 }}
          />
        </div>

        {/* Services Content */}
        <div className="relative z-10 h-full flex flex-col px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col">
            {/* Services Header - with adjusted padding */}
            <div
              style={{
                paddingTop: `${isVerySmallScreen ? headerHeight * 0.6 : isSmallScreen ? headerHeight * 0.7 : headerHeight * 0.8}px`,
              }}
            >
              <h2 className="text-engineerd-red text-sm md:text-base font-medium mb-2 md:mb-3">Services</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-3">
                Our Expertise,
                <br />
                Your <span className="text-engineerd-red">Advantage</span>
              </h3>
            </div>

            {/* Services Grid - with adjusted spacing */}
            <div className="mt-10 md:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
              {/* Consulting */}
              <div>
                <h4 className="text-xl md:text-2xl text-white font-normal border-b border-white pb-2 mb-4 inline-block">
                  Consulting
                </h4>
                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                  As Microsoft Partners specializing in Power Platform and Dynamics 365, we help organizations optimize
                  their digital transformation through strategic consulting, system integration, and automation
                  solutions to improve efficiency and drive growth.
                </p>
              </div>

              {/* TransformAI */}
              <div>
                <h4 className="text-xl md:text-2xl text-white font-normal border-b border-white pb-2 mb-4 inline-block">
                  TransformAI
                </h4>
                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                  TransformAI enables businesses to adopt AI without in-house expertise or infrastructure. We deliver
                  custom Copilot agents and AI readiness reviews, driving innovation, efficiency, and automation to meet
                  both immediate and long-term goals.
                </p>
              </div>

              {/* REDBoard */}
              <div>
                <h4 className="text-xl md:text-2xl text-white font-normal border-b border-white pb-2 mb-4 inline-block">
                  REDBoard
                </h4>
                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                  REDBoard (Real-Time Engagement Dashboard) revolutionizes event management by providing a modern,
                  efficient, and automated solution for attendee tracking and check-ins. Built on Microsoft's Power
                  Platform, this all-in-one tool eliminates event Built on Microsoft's Power Platform, this all-in-one
                  tool eliminates event-day chaos, streamlining processes.
                </p>
              </div>

              {/* Cybersecurity */}
              <div>
                <h4 className="text-xl md:text-2xl text-white font-normal border-b border-white pb-2 mb-4 inline-block">
                  Cybersecurity
                </h4>
                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                  Protect your business from evolving threats with our comprehensive cybersecurity solutions. We offer
                  tailored services that safeguard your data, networks, and systems, ensuring peace of mind so you can
                  focus on growth and success.
                </p>
              </div>
            </div>

            {/* All Services Button - Updated to match the provided image */}
            <div className="mt-12 md:mt-16 lg:mt-20">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-transparent border border-white rounded-full px-8 py-4 w-48 md:w-56 text-white hover:bg-white/20 transition-colors duration-300"
              >
                All Services <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Parallax Effect */}
      <section
        className="fixed top-0 left-0 w-full h-screen bg-white overflow-hidden"
        style={{
          transform: contactSectionTransform,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 40,
        }}
      >
        {/* White background for top section - reduced height to give more space to dark section */}
        <div className="absolute inset-0 bg-white" style={{ height: whiteBackgroundHeight }}></div>

        {/* Contact Content - Moved to the top of the section with more compact layout */}
        <div className="relative z-20 flex flex-col px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-[1800px] mx-auto w-full">
            {/* Contact Header - adjusted positioning to keep content visible and more compact */}
            <div
              style={{
                paddingTop: `${
                  isVerySmallScreen
                    ? headerHeight * 0.5
                    : isSmallScreen
                      ? headerHeight * 0.6
                      : isMediumScreen
                        ? headerHeight * 0.65
                        : headerHeight * 0.7
                }px`,
              }}
              className="flex flex-col md:flex-row mb-4 md:mb-6"
            >
              <div className="md:w-2/3 pr-0 md:pr-4 lg:pr-8">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-1 md:mb-1">
                  Not Sure Where
                  <br />
                  To Begin?
                </h3>
                <h2 className="text-engineerd-red text-xs md:text-sm font-medium mb-4 md:mb-6">
                  Let's make it simple.
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-800 mb-4 max-w-none w-full md:w-11/12">
                  EngineeRD simplifies digital transformation with clear, actionable strategies. Whether you're
                  exploring new possibilities or ready to implement AI-driven solutions, we're here to guide you.
                </p>

                {/* Schedule A Call Button - Using the provided image */}
                <div className="mt-2 mb-6">
                  <Link href="/contact" className="inline-block">
                    <Image
                      src="/images/schedule-call-button.png"
                      alt="Schedule A Call"
                      width={180}
                      height={60}
                      className="hover:opacity-90 transition-opacity"
                    />
                  </Link>
                </div>
              </div>

              {/* Gear image section - properly scaled and positioned */}
              <div className="md:w-1/3 flex justify-center md:justify-end items-start relative">
                <div
                  className="relative w-64 h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px]"
                  style={{
                    marginTop: isVerySmallScreen ? "-1rem" : isSmallScreen ? "-1.5rem" : "-2rem",
                    marginRight: isVerySmallScreen ? "0" : isSmallScreen ? "0" : "-1rem",
                  }}
                >
                  <Image src="/images/gear-image.png" alt="Digital transformation" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Image for bottom section - increased height */}
        <div
          className="absolute left-0 w-full overflow-hidden"
          style={{
            bottom: "0",
            height: darkBackgroundHeight,
          }}
        >
          <Image
            src="/images/stats-background.png"
            alt="Technology background"
            fill
            priority
            className="object-cover"
          />
          {/* Added gray overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Stats Section - moved higher up in the dark section */}
          <div
            ref={statsRef}
            className="absolute top-2 md:top-4 lg:top-6 left-0 w-full px-6 md:px-8 lg:px-12 xl:px-16 z-10"
          >
            <div className="max-w-[1800px] mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                {/* EngineeRD by the numbers text - adjusted to be closer to stats on larger screens */}
                <div className="md:w-1/5 lg:w-1/6 mb-3 md:mb-0 -mt-1 md:-mt-2">
                  <span className="inline-block text-white mb-1">→</span>
                  <h4 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-white">
                    EngineeRD by
                    <br />
                    the numbers
                  </h4>
                </div>

                {/* Stats container - with increased spacing between items */}
                <div className="md:w-4/5 lg:w-5/6">
                  <div className="flex flex-wrap md:flex-nowrap justify-between items-center w-full">
                    {/* First stat - Years of Experience */}
                    <div className="w-1/2 md:w-auto text-left md:pr-3 lg:pr-6 xl:pr-8">
                      <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white mb-1">4+</p>
                      <p className="text-sm md:text-base lg:text-lg text-white">Years of Experience</p>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block">
                      <div className="h-24 md:h-28 lg:h-32 w-[1px] bg-white/90"></div>
                    </div>

                    {/* Second stat - Successful Projects */}
                    <div className="w-1/2 md:w-auto text-left md:px-3 lg:px-6 xl:px-8">
                      <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white mb-1">50+</p>
                      <p className="text-sm md:text-base lg:text-lg text-white">Successful Projects</p>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block">
                      <div className="h-24 md:h-28 lg:h-32 w-[1px] bg-white/90"></div>
                    </div>

                    {/* Third stat - Satisfied Clients */}
                    <div className="w-1/2 md:w-auto text-left md:px-3 lg:px-6 xl:px-8 mt-6 md:mt-0">
                      <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white mb-1">30+</p>
                      <p className="text-sm md:text-base lg:text-lg text-white">Satisfied Clients</p>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block">
                      <div className="h-24 md:h-28 lg:h-32 w-[1px] bg-white/90"></div>
                    </div>

                    {/* Fourth stat - Industry Partners */}
                    <div className="w-1/2 md:w-auto text-left md:pl-3 lg:pl-6 xl:pl-8 mt-6 md:mt-0">
                      <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white mb-1">10+</p>
                      <p className="text-sm md:text-base lg:text-lg text-white">Industry Partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partners Section with Infinite Scroll - moved lower down */}
          <div
            className="absolute left-0 w-full z-10"
            style={{
              bottom: isVerySmallScreen ? "6px" : isSmallScreen ? "8px" : "10px",
            }}
          >
            <div className="max-w-[1800px] mx-auto px-6 md:px-8 lg:px-12 xl:px-16">
              <h4 className="text-xs md:text-sm font-normal text-white mb-1">OUR PARTNERS</h4>
            </div>

            {/* Partners scrolling container - using inline styles to guarantee horizontal layout */}
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                position: "relative",
                height: `${partnerLogoHeight + 20}px`, // Add some padding
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  whiteSpace: "nowrap",
                  animation: "marquee 100s linear infinite", // Slightly slower animation
                  position: "absolute",
                  left: "0",
                  top: "0",
                }}
              >
                {/* First set of partners */}
                {partners.map((partner, index) => renderPartnerLogo(partner, `first-${index}`))}

                {/* Second set of partners for seamless looping */}
                {partners.map((partner, index) => renderPartnerLogo(partner, `second-${index}`))}

                {/* Third set of partners for extra coverage */}
                {partners.map((partner, index) => renderPartnerLogo(partner, `third-${index}`))}
              </div>
            </div>

            <style jsx>{`
              @keyframes marquee {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-100%);
                }
              }

              .scrolling-container {
                display: flex;
                white-space: nowrap;
                overflow: hidden;
                animation: marquee 30s linear infinite;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Consult Section with Parallax Effect */}
      <section
      id="contact"
        className="fixed top-0 left-0 w-full h-screen bg-white overflow-hidden"
        style={{
          transform: consultSectionTransform,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 50,
        }}
      >
        <div className="h-full flex flex-col">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16">
            {/* Consult Header */}
            <div
              style={{
                paddingTop: `${
                  isVerySmallScreen
                    ? headerHeight * 0.5
                    : isSmallScreen
                      ? headerHeight * 0.6
                      : isMediumScreen
                        ? headerHeight * 0.65
                        : headerHeight * 0.7
                }px`,
              }}
            >
              <div className="max-w-5xl w-full">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6">
                  Hi! We Are Ready
                  <br />
                  To <span className="text-engineerd-red">Consult You.</span>
                </h2>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="mt-8 md:mt-12">
                  {/* Name and Service Interest */}
                  <div className="mb-6 md:mb-8">
                    <p className="text-lg md:text-xl text-gray-800 mb-2 whitespace-nowrap">
                      My name is{" "}
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border-b border-gray-300 focus:border-engineerd-red outline-none px-2 w-40 md:w-56"
                        placeholder="first & last name"
                        required
                      />{" "}
                      and I'm interested in{" "}
                      <input
                        type="text"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="border-b border-gray-300 focus:border-engineerd-red outline-none px-2 w-40 md:w-56"
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
                      <button
                        type="button"
                        onClick={() => handleBudgetChange("$1-5k")}
                        className={`rounded-full px-4 py-2 border ${
                          formData.budget === "$1-5k"
                            ? "bg-gray-800 text-white border-gray-800"
                            : "bg-white text-gray-800 border-gray-300"
                        }`}
                      >
                        $1-5k
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBudgetChange("$5-10k")}
                        className={`rounded-full px-4 py-2 border ${
                          formData.budget === "$5-10k"
                            ? "bg-gray-800 text-white border-gray-800"
                            : "bg-white text-gray-800 border-gray-300"
                        }`}
                      >
                        $5-10k
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBudgetChange("$10-20k")}
                        className={`rounded-full px-4 py-2 border ${
                          formData.budget === "$10-20k"
                            ? "bg-gray-800 text-white border-gray-800"
                            : "bg-white text-gray-800 border-gray-300"
                        }`}
                      >
                        $10-20k
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBudgetChange("$20k+")}
                        className={`rounded-full px-4 py-2 border ${
                          formData.budget === "$20k+"
                            ? "bg-gray-800 text-white border-gray-800"
                            : "bg-white text-gray-800 border-gray-300"
                        }`}
                      >
                        $20k+
                      </button>
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
                        className="border-b border-gray-300 focus:border-engineerd-red outline-none px-2 w-64 md:w-80"
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
                        className="border-b border-gray-300 focus:border-engineerd-red outline-none px-2 w-64 md:w-80"
                        placeholder="your project details"
                      />
                      .
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="inline-flex items-center px-6 py-3 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
                    >
                      {formSubmitting ? "Sending..." : "Send request"} <span className="ml-2">→</span>
                    </button>

                    {formSubmitted && (
                      <p className="mt-4 text-green-600">Thank you! Your request has been submitted.</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to allow scrolling through all sections */}
      <div style={{ height: "800vh" }}></div>

      {/* Footer Section - Static position at the end of the page */}
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

