"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Define the first set of industries (shown by default)
const primaryIndustries = [
  {
    id: "consumer",
    name: "Consumer",
    description:
      "Our IT solutions use AI and automation to simplify daily tasks, giving you more time to focus on what truly matters—your happiness and well-being. Personalized experiences and smart apps help you manage your life more efficiently, so you can enjoy life to the fullest and prioritize personal growth.",
    image: "/images/gear-handshake.png",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description:
      "We help real estate firms embrace digital transformation with AI-powered property management, automated customer service, and business intelligence, streamlining property searches, lead management, and decision-making for improved efficiency and client value.",
    image: "/images/real-estate-background.png",
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description:
      "We help businesses streamline project tracking, invoicing, and client management with advanced automation, enabling them to focus on strategy, boost efficiency, and enhance client satisfaction.",
    image: "/images/gear-gavel.png",
  },
  {
    id: "government",
    name: "Government & Public Sector",
    description:
      "By optimizing workflows, automating routine tasks, and reducing administrative burdens, we help alleviate burnout for government workers. This enables professionals to focus on strategic efforts, boosting efficiency and improving client satisfaction.",
    image: "/images/government-background.png",
  },
]

// Define the second set of industries (shown when clicking "More")
const secondaryIndustries = [
  {
    id: "healthcare",
    name: "Healthcare",
    description:
      "Our healthcare solutions streamline operations, improve patient care, and ensure regulatory compliance. We help healthcare providers leverage technology to enhance service delivery while reducing administrative burden.",
    image: "/images/design-background.png",
  },
  {
    id: "telecommunication",
    name: "Telecommunication",
    description:
      "We provide cutting-edge solutions for telecom companies, enabling them to optimize network performance, enhance customer experiences, and drive digital innovation in a rapidly evolving industry.",
    image: "/images/gear-shape.png",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description:
      "Our hospitality solutions help businesses deliver exceptional guest experiences through digital transformation, operational efficiency, and data-driven insights that drive loyalty and revenue growth.",
    image: "/images/transformai-background.png",
  },
  {
    id: "education",
    name: "Education",
    description:
      "Our education solutions empower institutions to deliver better learning experiences through technology. From administrative systems to classroom tools, we help educational organizations thrive in the digital age.",
    image: "/images/cybersecurity-background.png",
  },
]

export default function IndustriesPage() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [activeIndustry, setActiveIndustry] = useState("consumer")
  const [manualNavigation, setManualNavigation] = useState(false)
  const [showingSecondaryIndustries, setShowingSecondaryIndustries] = useState(false)
  const [currentSection, setCurrentSection] = useState("hero")
  const [lastSectionChangeTime, setLastSectionChangeTime] = useState(0)

  // COMPLETELY NEW APPROACH: Use refs for each section to detect visibility
  const heroRef = useRef(null)
  const consumerRef = useRef(null)
  const realEstateRef = useRef(null)
  const professionalServicesRef = useRef(null)
  const professionalServicesMarkerRef = useRef(null) // Special marker for Professional Services
  const governmentRef = useRef(null)
  const navContainerRef = useRef(null)
  const debugRef = useRef(null)

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

  // Add a debug element to the page
  useEffect(() => {
    if (!debugRef.current) {
      const debugElement = document.createElement("div")
      debugElement.style.position = "fixed"
      debugElement.style.bottom = "10px"
      debugElement.style.right = "10px"
      debugElement.style.backgroundColor = "rgba(0,0,0,0.8)"
      debugElement.style.color = "white"
      debugElement.style.padding = "10px"
      debugElement.style.fontSize = "12px"
      debugElement.style.zIndex = "9999"
      debugElement.style.maxWidth = "400px"
      debugElement.style.maxHeight = "200px"
      debugElement.style.overflow = "auto"
      document.body.appendChild(debugElement)
      debugRef.current = debugElement
    }
  }, [])

  // Update debug info
  useEffect(() => {
    if (debugRef.current) {
      debugRef.current.innerHTML = `
        <div>Scroll: ${scrollPosition}</div>
        <div>Window Height: ${windowHeight}</div>
        <div>Current Section: ${currentSection}</div>
        <div>Active Industry: ${activeIndustry}</div>
      `
    }
  }, [scrollPosition, windowHeight, currentSection, activeIndustry])

  // NEW APPROACH: Use Intersection Observer to detect which section is visible
  useEffect(() => {
    if (
      !heroRef.current ||
      !consumerRef.current ||
      !realEstateRef.current ||
      !professionalServicesRef.current ||
      !professionalServicesMarkerRef.current ||
      !governmentRef.current
    )
      return

    // Create a special marker for Professional Services that must be fully visible
    const professionalServicesMarker = document.createElement("div")
    professionalServicesMarker.style.position = "absolute"
    professionalServicesMarker.style.top = "50%" // Position it in the middle of the section
    professionalServicesMarker.style.left = "0"
    professionalServicesMarker.style.width = "100%"
    professionalServicesMarker.style.height = "10px"
    professionalServicesMarker.style.backgroundColor = "transparent"
    professionalServicesMarker.style.zIndex = "999"
    professionalServicesMarkerRef.current.appendChild(professionalServicesMarker)

    // Function to update the UI based on the current section
    const updateUI = (section) => {
      // Get elements
      const header = document.querySelector("header")
      const whiteLogo = document.querySelector("header .absolute:first-child") as HTMLElement
      const blackLogo = document.querySelector("header .absolute:nth-child(2)") as HTMLElement
      const navLinks = document.querySelectorAll("header nav a, header nav button")
      const contactButton = document.querySelector('header nav a[href="#contact"]') as HTMLElement

      if (!header || !whiteLogo || !blackLogo) return

      // Add a time-based throttle to prevent rapid section changes
      const now = Date.now()
      const timeSinceLastChange = now - lastSectionChangeTime
      const canChangeSection = timeSinceLastChange > 1000 // 1000ms minimum between section changes

      if (!canChangeSection) return

      // Only update if the section is different from the current one
      if (section !== currentSection) {
        if (debugRef.current) {
          debugRef.current.innerHTML += `<div>Changing section from ${currentSection} to ${section}</div>`
        }

        // Update the section and set the last change time
        setCurrentSection(section)
        setLastSectionChangeTime(now)

        // Update the active industry
        if (section === "hero") {
          setActiveIndustry("none")
        } else {
          setActiveIndustry(section)
        }

        // Update the UI based on the section
        if (section === "hero" || section === "real-estate" || section === "government") {
          whiteLogo.style.opacity = "1"
          blackLogo.style.opacity = "0"
          navLinks.forEach((link) => ((link as HTMLElement).style.color = "white"))
          if (contactButton) {
            contactButton.style.color = "white"
            contactButton.style.borderColor = "white"
          }
        } else {
          whiteLogo.style.opacity = "0"
          blackLogo.style.opacity = "1"
          navLinks.forEach((link) => ((link as HTMLElement).style.color = "black"))
          if (contactButton) {
            contactButton.style.color = "black"
            contactButton.style.borderColor = "black"
          }
        }

        // Force the correct navigation highlighting for Professional Services
        if (section === "professional-services" && navContainerRef.current) {
          const buttons = navContainerRef.current.querySelectorAll("button")
          buttons.forEach((button) => {
            if (button.textContent === "Professional Services") {
              button.className = button.className.replace(/text-gray-\d+/, "text-black")
              button.className = button.className.replace(/text-white/, "text-black")
              if (!button.className.includes("border-b-2")) {
                button.className += " border-b-2 border-black -mb-[1px]"
              }
            } else {
              button.className = button.className.replace(
                /text-black border-b-2 border-black -mb-\[1px\]/,
                "text-gray-600",
              )
              button.className = button.className.replace(/border-b-2 border-white -mb-\[1px\]/, "")
            }
          })
        }
      }
    }

    // Create the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if in manual navigation mode
        if (manualNavigation) return

        // Find the entry with the highest intersection ratio
        let highestEntry = null
        let highestRatio = 0

        entries.forEach((entry) => {
          if (entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio
            highestEntry = entry
          }

          // Debug info
          if (debugRef.current) {
            const target = entry.target as HTMLElement
            const id = target.id || "unknown"
            debugRef.current.innerHTML += `<div>${id}: ${entry.intersectionRatio.toFixed(2)}</div>`
          }
        })

        // Special case for Professional Services - must be fully visible
        const professionalServicesEntry = entries.find(
          (entry) => entry.target === professionalServicesMarkerRef.current,
        )

        if (professionalServicesEntry && professionalServicesEntry.intersectionRatio > 0.9) {
          // Professional Services marker is fully visible, switch to Professional Services
          updateUI("professional-services")
          return
        }

        // If we have a highest entry and it's visible enough, update the UI
        if (highestEntry && highestRatio > 0.3) {
          const target = highestEntry.target as HTMLElement
          const section = target.id.replace("-section", "")

          // Special case: if we're in the Professional Services section but the marker isn't fully visible,
          // stay in the Real Estate section
          if (
            section === "professional-services" &&
            (!professionalServicesEntry || professionalServicesEntry.intersectionRatio < 0.9)
          ) {
            updateUI("real-estate")
          } else {
            updateUI(section)
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "0px",
      },
    )

    // Observe all sections
    observer.observe(heroRef.current)
    observer.observe(consumerRef.current)
    observer.observe(realEstateRef.current)
    observer.observe(professionalServicesRef.current)
    observer.observe(professionalServicesMarkerRef.current)
    observer.observe(governmentRef.current)

    return () => {
      observer.disconnect()
    }
  }, [manualNavigation, currentSection, lastSectionChangeTime])

  // Calculate the scale for the background image zoom effect - more gradual
  const backgroundImageScale = 1 + scrollPosition / 2000

  const handleIndustryClick = (industryId) => {
    console.log(`Industry ${industryId} clicked`)

    setManualNavigation(true)
    setActiveIndustry(industryId)

    if (industryId === "consumer") {
      window.scrollTo({
        top: windowHeight * 1.2,
        behavior: "smooth",
      })
    } else if (industryId === "real-estate") {
      window.scrollTo({
        top: windowHeight * 2.2,
        behavior: "smooth",
      })
    } else if (industryId === "professional-services") {
      // Scroll MUCH further down to ensure we're well into the Professional Services section
      window.scrollTo({
        top: windowHeight * 3.5, // Increased to ensure we're deep into the section
        behavior: "smooth",
      })
    } else if (industryId === "government") {
      window.scrollTo({
        top: windowHeight * 4.2,
        behavior: "smooth",
      })
    } else {
      alert(
        `${industryId.charAt(0).toUpperCase() + industryId.slice(1).replace("-", " ")} industry section coming soon!`,
      )
    }

    setTimeout(() => {
      setManualNavigation(false)
    }, 1000)
  }

  // Toggle between primary and secondary industries
  const toggleIndustriesView = () => {
    setShowingSecondaryIndustries((prev) => !prev)
  }

  // Update the navigation bar
  useEffect(() => {
    // Skip if navContainerRef is not available yet
    if (!navContainerRef.current) return

    // Hide the navigation bar in the hero section
    if (currentSection === "hero") {
      navContainerRef.current.style.opacity = "0"
      navContainerRef.current.style.pointerEvents = "none"
    } else {
      navContainerRef.current.style.opacity = "1"
      navContainerRef.current.style.pointerEvents = "auto"
    }

    // Set text color based on section - FORCE BLACK for Professional Services
    const isLightSection = currentSection === "consumer" || currentSection === "professional-services"
    const borderColor = isLightSection ? "border-gray-300" : "border-white/30"
    const activeTextColor =
      currentSection === "professional-services" ? "text-black" : isLightSection ? "text-black" : "text-white"
    const inactiveTextColor =
      currentSection === "professional-services" ? "text-gray-600" : isLightSection ? "text-gray-600" : "text-gray-300"
    const hoverTextColor =
      currentSection === "professional-services"
        ? "hover:text-black"
        : isLightSection
          ? "hover:text-black"
          : "hover:text-white"
    const activeBorderColor =
      currentSection === "professional-services" ? "border-black" : isLightSection ? "border-black" : "border-white"

    // Create navigation buttons
    const navContainer = navContainerRef.current
    navContainer.innerHTML = "" // Clear existing content

    // Add label
    const label = document.createElement("div")
    label.className = "text-engineerd-red text-sm mb-2"
    label.textContent = "View our industries"
    navContainer.appendChild(label)

    // Create button container
    const buttonContainer = document.createElement("div")
    buttonContainer.className = `flex flex-wrap border-b ${borderColor} relative`
    navContainer.appendChild(buttonContainer)

    // Determine which industries to show
    const currentIndustries = showingSecondaryIndustries ? secondaryIndustries : primaryIndustries

    // If showing secondary industries, add a back button
    if (showingSecondaryIndustries) {
      // Add back button with left arrow
      const backButton = document.createElement("button")
      backButton.className = `flex items-center text-xl md:text-2xl font-medium mr-8 md:mr-12 lg:mr-16 pb-2 transition-all cursor-pointer ${inactiveTextColor} ${hoverTextColor}`
      backButton.style.position = "relative"
      backButton.style.zIndex = "999"

      // Create arrow icon (left-pointing)
      const arrowIcon = document.createElement("span")
      arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mr-1"><polyline points="15 18 9 12 15 6"></polyline></svg>`
      arrowIcon.className = "mr-1 inline-block"
      backButton.appendChild(arrowIcon)

      // Add click event to toggle back to primary industries
      backButton.addEventListener("click", () => {
        setShowingSecondaryIndustries(false)
      })

      buttonContainer.appendChild(backButton)
    }

    // Add buttons for current industries
    currentIndustries.forEach((industry) => {
      const button = document.createElement("button")
      button.textContent = industry.name

      // Force the correct active industry based on current section
      let isActive = false
      if (currentSection === "consumer" && industry.id === "consumer") isActive = true
      else if (currentSection === "real-estate" && industry.id === "real-estate") isActive = true
      else if (currentSection === "professional-services" && industry.id === "professional-services") isActive = true
      else if (currentSection === "government" && industry.id === "government") isActive = true

      // SPECIAL CASE for Professional Services
      if (industry.id === "professional-services" && currentSection === "professional-services") {
        button.className = `text-xl md:text-2xl font-medium mr-8 md:mr-12 lg:mr-16 pb-2 transition-all cursor-pointer text-black border-b-2 border-black -mb-[1px]`
      } else {
        button.className = `text-xl md:text-2xl font-medium mr-8 md:mr-12 lg:mr-16 pb-2 transition-all cursor-pointer ${
          isActive
            ? `${activeTextColor} border-b-2 ${activeBorderColor} -mb-[1px]`
            : `${inactiveTextColor} ${hoverTextColor}`
        }`
      }

      button.style.position = "relative"
      button.style.zIndex = "999"

      // Add event listener
      button.addEventListener("click", () => handleIndustryClick(industry.id))

      buttonContainer.appendChild(button)
    })

    // If showing primary industries, add the "More" button with right arrow
    if (!showingSecondaryIndustries) {
      // Add the "More" button with right arrow
      const moreButton = document.createElement("button")
      moreButton.className = `flex items-center text-xl md:text-2xl font-medium pb-2 transition-all cursor-pointer ${inactiveTextColor} ${hoverTextColor}`
      moreButton.style.position = "relative"
      moreButton.style.zIndex = "999"

      // Create text span
      const moreText = document.createElement("span")
      moreText.textContent = "More"
      moreButton.appendChild(moreText)

      // Create arrow icon (right-pointing)
      const arrowIcon = document.createElement("span")
      arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="ml-1"><polyline points="9 18 15 12 9 6"></polyline></svg>`
      arrowIcon.className = "ml-1 inline-block"
      moreButton.appendChild(arrowIcon)

      // Add click event to toggle to secondary industries
      moreButton.addEventListener("click", () => {
        setShowingSecondaryIndustries(true)
      })

      buttonContainer.appendChild(moreButton)
    }

    if (debugRef.current) {
      debugRef.current.innerHTML += `<div>Navigation updated for: ${currentSection}</div>`
    }
  }, [currentSection, activeIndustry, showingSecondaryIndustries, windowHeight])

  // Determine logo and text color based on current section
  const showWhiteLogo = currentSection === "hero" || currentSection === "real-estate" || currentSection === "government"
  const showBlackLogo = currentSection === "consumer" || currentSection === "professional-services"
  const textColor = currentSection === "consumer" || currentSection === "professional-services" ? "black" : "white"

  // Handle industries button in top nav
  const handleIndustriesClick = () => {
    setManualNavigation(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setTimeout(() => {
      setManualNavigation(false)
    }, 1000)
  }

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
            {/* White logo (visible in hero section and real estate section) */}
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

            {/* Black logo (visible in consumer section and professional services section) */}
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
            <Link
              href="/products"
              className="transition-colors duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              Products
            </Link>
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
                e.currentTarget.style.color =
                  currentSection === "consumer" || currentSection === "professional-services" ? "white" : "black"
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

      {/* DIRECT DOM MANIPULATION INDUSTRY NAVIGATION - Now with transparent background and hidden in hero section */}
      <div
        ref={navContainerRef}
        className="fixed top-[120px] md:top-[140px] lg:top-[160px] left-0 w-full z-[999] px-6 md:px-8 lg:px-12 xl:px-16"
        style={{
          padding: "20px",
          background: "transparent",
          transition: "opacity 0.3s ease",
          opacity: currentSection === "hero" ? 0 : 1,
          pointerEvents: currentSection === "hero" ? "none" : "auto",
        }}
      >
        {/* Content will be populated via direct DOM manipulation */}
      </div>

      {/* Hero Section - Fixed in place */}
      <section ref={heroRef} id="hero-section" className="fixed top-0 left-0 w-full h-screen z-10">
        {/* Background Image with zoom effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `scale(${backgroundImageScale})` }}
          >
            <Image
              src="/images/industries-background.png"
              alt="Digital globe network"
              fill
              priority
              className="object-cover"
            />
            {/* Gray overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-800/60"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col px-6 md:px-8">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col">
            {/* Main Content - centered in the viewport */}
            <div className="flex-grow flex flex-col justify-center pt-24">
              <div className="max-w-2xl">
                <h1 className="text-7xl md:text-8xl font-bold text-white mb-6">Industries</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consumer Section */}
      <section
        ref={consumerRef}
        id="consumer-section"
        className="fixed top-0 left-0 w-full h-screen bg-gray-100 overflow-hidden"
        style={{
          transform: `translateY(${Math.max(0, 100 - scrollPosition / 7)}vh)`,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 20,
        }}
      >
        <div className="h-full flex flex-col">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16 relative">
            {/* Industries Content - Updated to match the layout in the image */}
            <div
              className="h-full flex flex-col"
              style={{ paddingTop: isVerySmallScreen ? "220px" : isSmallScreen ? "240px" : "280px" }}
            >
              {/* Industry Content - Using the layout from the image */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                {/* Left side - Text Content */}
                <div className="md:w-1/2 lg:w-3/5 pr-0 md:pr-8 lg:pr-16 z-10 relative">
                  <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 md:mb-8">Consumer</h2>
                  <p className="text-lg md:text-xl text-gray-800 mb-8 md:mb-10 leading-relaxed max-w-xl">
                    Our IT solutions use AI and automation to simplify daily tasks, giving you more time to focus on
                    what truly matters—your happiness and well-being. Personalized experiences and smart apps help you
                    manage your life more efficiently, so you can enjoy life to the fullest and prioritize personal
                    growth.
                  </p>

                  {/* Let's Connect Button - Styled to match the image */}
                  <button className="bg-red-600 text-white rounded-full px-8 py-4 flex items-center hover:bg-red-700 transition-colors">
                    Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>

                {/* Right side - Gear Handshake Image */}
                <div className="md:w-1/2 lg:w-2/5 flex justify-center md:justify-end items-center mt-10 md:mt-0">
                  <div className="relative" style={{ width: "400px", height: "400px" }}>
                    <Image
                      src="/images/gear-handshake.png"
                      alt="Handshake in gear shape"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Estate Section with Parallax Effect */}
      <section
        ref={realEstateRef}
        id="real-estate-section"
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{
          transform: `translateY(${Math.max(0, 200 - (scrollPosition - windowHeight) / 5)}vh)`,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 30,
        }}
      >
        {/* Background Image with dark overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/real-estate-background.png"
            alt="City skyline with office buildings"
            fill
            priority
            className="object-cover"
          />

          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Real Estate Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16">
            {/* Real Estate Content - Using the layout from the image */}
            <div className="mt-[260px] md:mt-[280px] lg:mt-[300px] max-w-2xl relative z-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8">Real Estate</h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10 leading-relaxed">
                We help real estate firms embrace digital transformation with AI-powered property management, automated
                customer service, and business intelligence, streamlining property searches, lead management, and
                decision-making for improved efficiency and client value.
              </p>

              {/* Let's Connect Button */}
              <button className="bg-red-600 text-white rounded-full px-8 py-4 flex items-center hover:bg-red-700 transition-colors">
                Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Services Section */}
      <section
        ref={professionalServicesRef}
        id="professional-services-section"
        className="fixed top-0 left-0 w-full h-screen bg-gray-100 overflow-hidden"
        style={{
          transform: `translateY(${Math.max(0, 300 - (scrollPosition - windowHeight * 2) / 5)}vh)`,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 40,
        }}
      >
        {/* Special marker for Professional Services section detection */}
        <div ref={professionalServicesMarkerRef} className="absolute inset-0 pointer-events-none"></div>

        <div className="h-full flex flex-col">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16 relative">
            {/* Industries Content - Updated to match the layout in the image */}
            <div
              className="h-full flex flex-col"
              style={{ paddingTop: isVerySmallScreen ? "220px" : isSmallScreen ? "240px" : "280px" }}
            >
              {/* Industry Content - Using the layout from the image */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                {/* Left side - Text Content */}
                <div className="md:w-1/2 lg:w-3/5 pr-0 md:pr-8 lg:pr-16 z-10 relative">
                  <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 md:mb-8">Professional Services</h2>
                  <p className="text-lg md:text-xl text-gray-800 mb-8 md:mb-10 leading-relaxed max-w-xl">
                    We help businesses streamline project tracking, invoicing, and client management with advanced
                    automation, enabling them to focus on strategy, boost efficiency, and enhance client satisfaction.
                  </p>

                  {/* Let's Connect Button - Styled to match the image */}
                  <button className="bg-red-600 text-white rounded-full px-8 py-4 flex items-center hover:bg-red-700 transition-colors">
                    Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>

                {/* Right side - Gear Gavel Image */}
                <div className="md:w-1/2 lg:w-2/5 flex justify-center md:justify-end items-center mt-10 md:mt-0">
                  <div className="relative" style={{ width: "400px", height: "400px" }}>
                    <Image src="/images/gear-gavel.png" alt="Gavel in gear shape" fill className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Government Section - Updated with new layout and background */}
      <section
        ref={governmentRef}
        id="government-section"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url("/images/government-background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Government & Public Sector</h2>
          <p className="text-lg md:text-xl mb-8">
            By optimizing workflows, automating routine tasks, and reducing administrative burdens, we help alleviate burnout for government workers. This enables professionals to focus on strategic efforts, boosting efficiency and improving client satisfaction.
          </p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-engineerd-red text-white rounded-full hover:bg-red-700 transition-colors duration-300">
            Learn More <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Spacer to allow scrolling for future sections */}
      <div style={{ height: "500vh" }}></div>
    </div>
  )
}

