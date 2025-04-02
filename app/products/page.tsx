"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Define product data
const products = [
  {
    id: "consulting",
    name: "Consulting",
    description:
      "As Microsoft Partners specializing in Power Platform and Dynamics 365, we help organizations optimize their digital transformation through strategic consulting, system integration, and automation solutions to improve efficiency and drive growth.",
    image: "/images/gear-shape.png",
  },
  {
    id: "transformai",
    name: "TransformAI",
    description:
      "TransformAI enables businesses to leverage advanced AI without in-house expertise or infrastructure. Partnering with EngineeRD, we deliver custom Copilot agents and AI readiness reviews, driving innovation, efficiency, and customer satisfaction through tailored automation and insights.",
    image: "/images/gear-shape.png",
  },
  {
    id: "redboard",
    name: "RedBoard",
    description:
      "REDBoard streamlines event management with automated attendee tracking and check-ins. Built on Microsoft's Power Platform, it eliminates event-day chaos, ensuring a seamless and memorable experience.",
    image: "/images/redboard-logo.png",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description:
      "Protect your business from evolving threats with our comprehensive cybersecurity solutions. We offer tailored services that safeguard your data, networks, and systems, ensuring peace of mind so you can focus on growth and success.",
    image: "/images/cybersecurity-background.png",
  },
  {
    id: "design",
    name: "Design",
    description:
      "Our team creates intuitive, engaging experiences with a strong visual identity that resonates with your audience. Whether refining your online presence or simplifying complex ideas, we ensure every design element strengthens your brand across all platforms.",
    image: "/images/design-background.png",
  },
]

export default function ProductsPage() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [activeProduct, setActiveProduct] = useState("consulting")
  const [manualNavigation, setManualNavigation] = useState(false)

  // Create refs for navigation elements
  const navContainerRef = useRef(null)

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
  }, [])

  // More granular screen size detection
  const isVerySmallScreen = windowHeight < 600
  const isSmallScreen = windowHeight < 800 && !isVerySmallScreen
  const isMediumScreen = windowHeight >= 800 && windowHeight < 1000
  const isLargeScreen = windowHeight >= 1000

  // Width detection
  const isWideScreen = windowWidth >= 1440
  const isNarrowScreen = windowWidth < 768

  // Calculate logo size based on screen dimensions - same as home page
  const logoSize = isVerySmallScreen ? 180 : isSmallScreen ? 240 : 320

  // Calculate gear image size - larger and more consistent
  const gearSize = isNarrowScreen
    ? Math.min(windowWidth * 0.85, 450)
    : isWideScreen
      ? Math.min(windowWidth * 0.35, 650)
      : Math.min(windowWidth * 0.45, 550)

  // Calculate RedBoard logo size
  const redboardLogoSize = 350

  // Calculate header height to position gear just below it
  const headerHeight = isVerySmallScreen ? 70 : isSmallScreen ? 90 : 120

  // Adjust the section detection thresholds to further delay the transition from Cybersecurity to Design

  // Change these lines to make the section transitions happen later in the scroll
  // Determine if we're in different sections
  const isInHeroSection = scrollPosition < windowHeight * 0.7 // Keep as is
  const isInConsultingSection = scrollPosition >= windowHeight * 0.7 && scrollPosition < windowHeight * 1.7 // Keep as is
  const isInTransformAISection = scrollPosition >= windowHeight * 1.65 && scrollPosition < windowHeight * 2.7 // Keep as is
  const isInRedBoardSection = scrollPosition >= windowHeight * 2.7 && scrollPosition < windowHeight * 3.7 // Keep as is
  // Extend the Cybersecurity section range to delay the transition to Design
  const isInCybersecuritySection = scrollPosition >= windowHeight * 3.7 && scrollPosition < windowHeight * 5.2 // Changed from 4.7 to 5.2
  const isInDesignSection = scrollPosition >= windowHeight * 5.2 // Changed from 4.7 to 5.2

  // Determine logo and text color based on section
  const showWhiteLogo = isInHeroSection || isInTransformAISection || isInCybersecuritySection || isInDesignSection
  const showBlackLogo = isInConsultingSection || isInRedBoardSection
  const textColor = isInConsultingSection || isInRedBoardSection ? "black" : "white"

  // Also update the activeProduct setting based on scroll position to match these new thresholds
  // Update active product based on scroll position
  useEffect(() => {
    // Only update if not in manual navigation mode
    if (!manualNavigation) {
      if (scrollPosition < windowHeight * 0.7) {
        // In hero section - no active product
        setActiveProduct("none")
      } else if (scrollPosition < windowHeight * 1.7) {
        // In consulting section
        setActiveProduct("consulting")
      } else if (scrollPosition < windowHeight * 2.7) {
        // In transformai section
        setActiveProduct("transformai")
      } else if (scrollPosition < windowHeight * 3.7) {
        // In redboard section
        setActiveProduct("redboard")
      } else if (scrollPosition < windowHeight * 5.2) {
        // In cybersecurity section - extended range
        setActiveProduct("cybersecurity")
      } else {
        // In design section - starts later
        setActiveProduct("design")
      }
    }
  }, [scrollPosition, windowHeight, manualNavigation])

  useEffect(() => {
    // Force the correct logo and text color based on scroll position
    const header = document.querySelector("header")
    if (!header) return

    if (isInTransformAISection || isInCybersecuritySection || isInDesignSection) {
      // Ensure white text and logo in TransformAI, Cybersecurity, and Design sections
      const navLinks = header.querySelectorAll("nav a, nav button")
      navLinks.forEach((link) => {
        link.style.color = "white"
      })

      // Force contact button styling
      const contactButton = header.querySelector('nav a[href="#contact"]')
      if (contactButton) {
        contactButton.style.color = "white"
        contactButton.style.borderColor = "white"
      }
    }
  }, [scrollPosition, isInTransformAISection, isInCybersecuritySection, isInDesignSection])

  // Handle products button in top nav
  const handleProductsClick = () => {
    setManualNavigation(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setTimeout(() => {
      setManualNavigation(false)
    }, 1000)
  }

  // Calculate the scale for the background image zoom effect - more gradual
  const backgroundImageScale = 1 + scrollPosition / 2000

  // Set up direct DOM event listeners for product navigation
  useEffect(() => {
    // Skip if navContainerRef is not available yet
    if (!navContainerRef.current) return

    // Determine if we're in the hero section to hide/show the navigation
    const isInHeroSection = scrollPosition < windowHeight * 0.7

    // Hide the navigation bar in the hero section
    if (isInHeroSection) {
      navContainerRef.current.style.opacity = "0"
      navContainerRef.current.style.pointerEvents = "none"
    } else {
      navContainerRef.current.style.opacity = "1"
      navContainerRef.current.style.pointerEvents = "auto"
    }

    // Create direct event handlers for each product
    const handleConsultingClick = () => {
      console.log("Consulting clicked via direct DOM")
      setManualNavigation(true)
      setActiveProduct("consulting")

      // Scroll to the consulting section
      window.scrollTo({
        top: windowHeight * 1.2, // Adjusted to match new section threshold
        behavior: "smooth",
      })

      setTimeout(() => {
        setManualNavigation(false)
      }, 1000)
    }

    const handleTransformAIClick = () => {
      console.log("TransformAI clicked via direct DOM")
      setManualNavigation(true)
      setActiveProduct("transformai")

      // Scroll to the TransformAI section - adjusted to ensure it's fully visible
      window.scrollTo({
        top: windowHeight * 2.7, // Adjusted to match new section threshold
        behavior: "smooth",
      })

      setTimeout(() => {
        setManualNavigation(false)
      }, 1000)
    }

    const handleRedBoardClick = () => {
      console.log("RedBoard clicked via direct DOM")
      setManualNavigation(true)
      setActiveProduct("redboard")

      // Scroll to the RedBoard section - use a fixed large value to ensure it's fully visible
      window.scrollTo({
        top: windowHeight * 3.7, // Adjusted to match new section threshold
        behavior: "smooth",
      })

      setTimeout(() => {
        setManualNavigation(false)
      }, 1000)
    }

    const handleCybersecurityClick = () => {
      console.log("Cybersecurity clicked via direct DOM")
      setManualNavigation(true)
      setActiveProduct("cybersecurity")

      // Scroll to the Cybersecurity section
      window.scrollTo({
        top: windowHeight * 4.7, // Adjusted to match new section threshold
        behavior: "smooth",
      })

      setTimeout(() => {
        setManualNavigation(false)
      }, 1000)
    }

    const handleDesignClick = () => {
      console.log("Design clicked via direct DOM")
      setManualNavigation(true)
      setActiveProduct("design")

      // Scroll to the Design section - increased to ensure it's fully visible
      window.scrollTo({
        top: windowHeight * 6.5, // Increased from 5.7 to 6.5 to fully show the Design section
        behavior: "smooth",
      })

      setTimeout(() => {
        setManualNavigation(false)
      }, 1000)
    }

    const handleOtherProductClick = (productId) => {
      console.log(`${productId} clicked via direct DOM`)
      setManualNavigation(true)
      setActiveProduct(productId)
      window.scrollTo({
        top: windowHeight,
        behavior: "smooth",
      })
      alert(`${productId.charAt(0).toUpperCase() + productId.slice(1)} section coming soon!`)
      setTimeout(() => {
        setManualNavigation(false)
      }, 1000)
    }

    // Set text color based on section
    let textColor = "white"
    if (isInConsultingSection || isInRedBoardSection) {
      textColor = "black"
    } else if (isInTransformAISection || isInCybersecuritySection || isInDesignSection) {
      // Force white for TransformAI, Cybersecurity, and Design sections
      textColor = "white"
    }

    const borderColor = isInConsultingSection || isInRedBoardSection ? "border-gray-300" : "border-white/30"
    const activeTextColor = isInConsultingSection || isInRedBoardSection ? "text-black" : "text-white"
    const inactiveTextColor = isInConsultingSection || isInRedBoardSection ? "text-gray-600" : "text-gray-300"
    const hoverTextColor = isInConsultingSection || isInRedBoardSection ? "hover:text-black" : "hover:text-white"
    const activeBorderColor = isInConsultingSection || isInRedBoardSection ? "border-black" : "border-white"

    // Create navigation buttons
    const navContainer = navContainerRef.current
    navContainer.innerHTML = "" // Clear existing content

    // Add label
    const label = document.createElement("div")
    label.className = "text-engineerd-red text-sm mb-2"
    label.textContent = "View our services"
    navContainer.appendChild(label)

    // Create button container
    const buttonContainer = document.createElement("div")
    buttonContainer.className = `flex flex-wrap border-b ${borderColor} relative`
    navContainer.appendChild(buttonContainer)

    // Determine which product should be active based on current section
    let currentActiveProduct = activeProduct

    // Force the correct active product based on the current section
    if (isInCybersecuritySection) {
      currentActiveProduct = "cybersecurity"
    } else if (isInDesignSection) {
      currentActiveProduct = "design"
    } else if (isInRedBoardSection) {
      currentActiveProduct = "redboard"
    } else if (isInTransformAISection) {
      currentActiveProduct = "transformai"
    } else if (isInConsultingSection) {
      currentActiveProduct = "consulting"
    }

    // Add buttons for each product
    products.forEach((product) => {
      const button = document.createElement("button")
      button.textContent = product.name
      button.className = `text-xl md:text-2xl font-medium mr-8 md:mr-12 lg:mr-16 pb-2 transition-all cursor-pointer ${
        currentActiveProduct === product.id
          ? `${activeTextColor} border-b-2 ${activeBorderColor} -mb-[1px]`
          : `${inactiveTextColor} ${hoverTextColor}`
      }`
      button.style.position = "relative"
      button.style.zIndex = "999"

      // Add event listeners based on product ID
      if (product.id === "consulting") {
        button.addEventListener("click", handleConsultingClick)
      } else if (product.id === "transformai") {
        button.addEventListener("click", handleTransformAIClick)
      } else if (product.id === "redboard") {
        button.addEventListener("click", handleRedBoardClick)
      } else if (product.id === "cybersecurity") {
        button.addEventListener("click", handleCybersecurityClick)
      } else if (product.id === "design") {
        button.addEventListener("click", handleDesignClick)
      } else {
        button.addEventListener("click", () => handleOtherProductClick(product.id))
      }

      buttonContainer.appendChild(button)
    })
  }, [
    activeProduct,
    windowHeight,
    scrollPosition,
    isInConsultingSection,
    isInRedBoardSection,
    isInTransformAISection,
    isInCybersecuritySection,
    isInDesignSection,
  ])

  return (
    <div className="relative font-sans">
      {/* Fixed Header with dynamic logo and text color based on scroll position */}
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
            {/* White logo (visible in hero, transformai, cybersecurity, and design sections) */}
            <div
              className="absolute top-0 left-0 transition-opacity duration-300"
              style={{ opacity: showWhiteLogo ? 1 : 0 }}
            >
              <Image
                src="/images/logo.png"
                alt="EngineeRD Logo"
                width={logoSize}
                height={logoSize}
                className="object-contain"
              />
            </div>

            {/* Black logo (visible in consulting and redboard sections) */}
            <div
              className="absolute top-0 left-0 transition-opacity duration-300"
              style={{ opacity: showBlackLogo ? 1 : 0 }}
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
              href="/"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              About
            </Link>
            <Link
              href="#prep"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              PREP
            </Link>
            <Link
              href="/industries"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              Industries
            </Link>
            <button
              onClick={handleProductsClick}
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base bg-transparent border-none cursor-pointer"
              style={{ color: textColor }}
            >
              Products
            </button>
            <Link
              href="#careers"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              Careers
            </Link>
            <Link
              href="#contact"
              className="ml-2 lg:ml-4 inline-flex items-center px-4 py-1.5 lg:px-6 lg:py-2 border rounded-full transition-all duration-300 text-sm lg:text-base"
              style={{
                color: textColor,
                borderColor: textColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = textColor
                e.currentTarget.style.color = isInConsultingSection || isInRedBoardSection ? "white" : "black"
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

      {/* DIRECT DOM MANIPULATION PRODUCT NAVIGATION - Now with transparent background and hidden in hero section */}
      <div
        ref={navContainerRef}
        className="fixed top-[120px] md:top-[140px] lg:top-[160px] left-0 w-full z-[999] px-6 md:px-8 lg:px-12 xl:px-16"
        style={{
          padding: "20px",
          background: "transparent",
          transition: "opacity 0.3s ease",
          opacity: isInHeroSection ? 0 : 1,
          pointerEvents: isInHeroSection ? "none" : "auto",
        }}
      >
        {/* Content will be populated via direct DOM manipulation */}
      </div>

      {/* Hero Section - Fixed in place */}
      <section className="fixed top-0 left-0 w-full h-screen z-10">
        {/* Background Image with zoom effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `scale(${backgroundImageScale})` }}
          >
            <Image
              src="/images/products-background.png"
              alt="Circuit board background"
              fill
              priority
              className="object-cover"
            />
            {/* Gray overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col px-6 md:px-8">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col">
            {/* Main Content - centered in the viewport */}
            <div className="flex-grow flex flex-col justify-center pt-24">
              <div className="max-w-2xl">
                <h1 className="text-7xl md:text-8xl font-bold text-white mb-6">Products</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Section with Parallax Effect */}
      <section
        className="fixed top-0 left-0 w-full h-screen bg-gray-100 overflow-hidden"
        style={{
          transform: `translateY(${Math.max(0, 100 - scrollPosition / 7)}vh)`,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 20,
        }}
      >
        <div className="h-full flex flex-col">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16 relative">
            {/* Gear Image - Positioned just below the header */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: `${gearSize}px`,
                height: `${gearSize}px`,
                right: isNarrowScreen ? "-10%" : "0",
                top: `${headerHeight}px`, // Position just below the header
                opacity: 0.95,
                zIndex: 5,
              }}
            >
              <Image src="/images/gear-shape.png" alt="Gear illustration" fill className="object-contain" />
            </div>

            {/* Products Content - Adjusted to take up more screen space */}
            <div
              className="h-full flex flex-col"
              style={{ paddingTop: isVerySmallScreen ? "220px" : isSmallScreen ? "240px" : "260px" }}
            >
              {/* Product Content - Text only, image is positioned separately */}
              <div className="mt-6 md:mt-8 relative z-20">
                {/* Text Content - Moderately wider container with slightly larger text */}
                <div className="md:w-2/3 lg:w-3/5 pr-0 md:pr-8 lg:pr-16 z-10 relative">
                  <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 md:mb-6">Consulting</h2>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-800 mb-6 md:mb-8 leading-relaxed">
                    As Microsoft Partners specializing in Power Platform and Dynamics 365, we help organizations
                    optimize their digital transformation through strategic consulting, system integration, and
                    automation solutions to improve efficiency and drive growth.
                  </p>

                  {/* Schedule A Call Button - Positioned closer to the text */}
                  <button className="bg-engineerd-red text-white rounded-full px-6 py-3 flex items-center hover:bg-red-700 transition-colors">
                    Schedule A Call <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TransformAI Section with Parallax Effect */}
      <section
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{
          transform: `translateY(${Math.max(0, 200 - (scrollPosition - windowHeight) / 5)}vh)`,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 30,
        }}
      >
        {/* Background Image with enhanced overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/transformai-background.png"
            alt="TransformAI background"
            fill
            priority
            className="object-cover"
          />

          {/* Enhanced gray overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/60"></div>

          {/* Additional darker overlay where text appears */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent"></div>
        </div>

        {/* TransformAI Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16">
            {/* TransformAI Content */}
            <div className="mt-[260px] md:mt-[280px] lg:mt-[300px] max-w-2xl relative z-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8">TransformAI</h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10 leading-relaxed">
                TransformAI enables businesses to leverage advanced AI without in-house expertise or infrastructure.
                Partnering with EngineeRD, we deliver custom Copilot agents and AI readiness reviews, driving
                innovation, efficiency, and customer satisfaction through tailored automation and insights.
              </p>

              {/* Let's Connect Button */}
              <button className="bg-engineerd-red text-white rounded-full px-8 py-4 flex items-center hover:bg-red-700 transition-colors">
                Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RedBoard Section with Parallax Effect - FIXED TRANSFORM CALCULATION */}
      <section
        className="fixed top-0 left-0 w-full h-screen bg-gray-100 overflow-hidden"
        style={{
          // Reduced divisor to make the section move more quickly into view
          transform: `translateY(${Math.max(0, 300 - (scrollPosition - windowHeight * 2) / 3)}vh)`,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 40,
        }}
      >
        <div className="h-full flex flex-col">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16">
            {/* RedBoard Content */}
            <div
              className="h-full flex flex-col md:flex-row items-center"
              style={{ paddingTop: isVerySmallScreen ? "180px" : isSmallScreen ? "200px" : "220px" }}
            >
              {/* Left side - Text Content */}
              <div className="md:w-1/2 z-10 relative">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 md:mb-8">RedBoard</h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-800 mb-8 md:mb-10 leading-relaxed max-w-xl">
                  REDBoard streamlines event management with automated attendee tracking and check-ins. Built on
                  Microsoft's Power Platform, it eliminates event-day chaos, ensuring a seamless and memorable
                  experience.
                </p>

                {/* Buttons - Matching the design in the image */}
                <div className="flex flex-wrap gap-4">
                  <button className="bg-engineerd-red text-white rounded-full px-8 py-4 flex items-center hover:bg-red-700 transition-colors">
                    Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <button className="bg-engineerd-red text-white rounded-full px-8 py-4 flex items-center hover:bg-red-700 transition-colors">
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Right side - RedBoard Logo */}
              <div className="md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
                <div className="relative" style={{ width: `${redboardLogoSize}px`, height: `${redboardLogoSize}px` }}>
                  <Image src="/images/redboard-logo.png" alt="RedBoard Logo" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cybersecurity Section with Parallax Effect */}
      <section
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{
          transform: `translateY(${Math.max(0, 400 - (scrollPosition - windowHeight * 3) / 3)}vh)`,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 50,
        }}
      >
        {/* Background Image with enhanced overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/cybersecurity-background.png"
            alt="Cybersecurity background"
            fill
            priority
            className="object-cover"
          />

          {/* Gray overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Cybersecurity Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16">
            {/* Cybersecurity Content */}
            <div className="mt-[260px] md:mt-[280px] lg:mt-[300px] max-w-2xl relative z-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8">Cybersecurity</h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10 leading-relaxed">
                Protect your business from evolving threats with our comprehensive cybersecurity solutions. We offer
                tailored services that safeguard your data, networks, and systems, ensuring peace of mind so you can
                focus on growth and success.
              </p>

              {/* Let's Connect Button */}
              <button className="bg-engineerd-red text-white rounded-full px-8 py-4 flex items-center hover:bg-red-700 transition-colors">
                Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Section with Parallax Effect */}
      <section
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{
          transform: `translateY(${Math.max(0, 500 - (scrollPosition - windowHeight * 4) / 3)}vh)`,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 60,
        }}
      >
        {/* Background Image with enhanced overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/images/design-background.png" alt="Design background" fill priority className="object-cover" />

          {/* Gray overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Design Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16">
            {/* Design Content */}
            <div className="mt-[260px] md:mt-[280px] lg:mt-[300px] max-w-2xl relative z-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8">Design</h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10 leading-relaxed">
                Our team creates intuitive, engaging experiences with a strong visual identity that resonates with your
                audience. Whether refining your online presence or simplifying complex ideas, we ensure every design
                element strengthens your brand across all platforms.
              </p>

              {/* Let's Connect Button */}
              <button className="bg-engineerd-red text-white rounded-full px-8 py-4 flex items-center hover:bg-red-700 transition-colors">
                Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to allow scrolling for future sections - INCREASED HEIGHT */}
      <div style={{ height: "800vh" }}></div>
    </div>
  )
}

