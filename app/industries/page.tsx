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
  // Force initial state to be hero section with no active industry
  const [scrollPosition, setScrollPosition] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [activeIndustry, setActiveIndustry] = useState("none")
  const [manualNavigation, setManualNavigation] = useState(false)
  const [showingSecondaryIndustries, setShowingSecondaryIndustries] = useState(false)
  const [currentSection, setCurrentSection] = useState("hero")
  const [lastSectionChangeTime, setLastSectionChangeTime] = useState(0)
  const [manuallySelectedSection, setManuallySelectedSection] = useState(null) // Track manually selected section
  const [scrollDirection, setScrollDirection] = useState("down") // Track scroll direction
  const [isInitialized, setIsInitialized] = useState(false) // Track if the page has been initialized
  // Add a new state variable to track transition state
  const [isTransitioning, setIsTransitioning] = useState(false)
  // Add a state to control navbar visibility
  const [navbarVisible, setNavbarVisible] = useState(false)
  // Add a state to track the transition zone
  const [inTransitionZone, setInTransitionZone] = useState(false)
  // Add a state to track the next section
  const [nextSection, setNextSection] = useState(null)

  // COMPLETELY NEW APPROACH: Use refs for each section to detect visibility
  const heroRef = useRef(null)
  const consumerRef = useRef(null)
  const realEstateRef = useRef(null)
  const professionalServicesRef = useRef(null)
  const professionalServicesMarkerRef = useRef(null) // Special marker for Professional Services
  const governmentRef = useRef(null)
  const governmentMarkerRef = useRef(null) // Special marker for Government
  const navContainerRef = useRef(null)
  const lastScrollPositionRef = useRef(0)

  // Update scroll position with smoother tracking and get window dimensions
  useEffect(() => {
    let ticking = false

    // Set initial window dimensions
    setWindowHeight(window.innerHeight)
    setWindowWidth(window.innerWidth)

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Determine scroll direction
          const currentScrollPosition = window.scrollY
          if (currentScrollPosition > lastScrollPositionRef.current) {
            setScrollDirection("down")
          } else if (currentScrollPosition < lastScrollPositionRef.current) {
            setScrollDirection("up")
          }
          lastScrollPositionRef.current = currentScrollPosition

          setScrollPosition(currentScrollPosition)
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
  // useEffect(() => {
  //   if (!debugRef.current) {
  //     const debugElement = document.createElement("div")
  //     debugElement.style.position = "fixed"
  //     debugElement.style.bottom = "10px"
  //     debugElement.style.right = "10px"
  //     debugElement.style.backgroundColor = "rgba(0,0,0,0.8)"
  //     debugElement.style.color = "white"
  //     debugElement.style.padding = "10px"
  //     debugElement.style.fontSize = "12px"
  //     debugElement.style.zIndex = "9999"
  //     debugElement.style.maxWidth = "400px"
  //     debugElement.style.maxHeight = "200px"
  //     debugElement.style.overflow = "auto"
  //     document.body.appendChild(debugElement)
  //     debugRef.current = debugElement
  //   }
  // }, [])

  // // Update debug info
  // useEffect(() => {
  //   if (debugRef.current) {
  //     debugRef.current.innerHTML = `
  //       <div>Scroll: ${scrollPosition}</div>
  //       <div>Window Height: ${windowHeight}</div>
  //       <div>Current Section: ${currentSection}</div>
  //       <div>Next Section: ${nextSection}</div>
  //       <div>Active Industry: ${activeIndustry}</div>
  //       <div>Manual Navigation: ${manualNavigation}</div>
  //       <div>Manually Selected: ${manuallySelectedSection}</div>
  //       <div>Scroll Direction: ${scrollDirection}</div>
  //       <div>Initialized: ${isInitialized}</div>
  //       <div>Navbar Visible: ${navbarVisible}</div>
  //       <div>In Transition Zone: ${inTransitionZone}</div>
  //     `
  //   }
  // }, [
  //   scrollPosition,
  //   windowHeight,
  //   currentSection,
  //   nextSection,
  //   activeIndustry,
  //   manualNavigation,
  //   manuallySelectedSection,
  //   scrollDirection,
  //   isInitialized,
  //   navbarVisible,
  //   inTransitionZone,
  // ])

  // NEW APPROACH: Detect transition zones between sections
  useEffect(() => {
    // Skip if in manual navigation mode
    if (manualNavigation) return

    // Define section boundaries based on window height
    const heroThreshold = 500 // Consumer starts at scroll: 500
    const consumerThreshold = 1600 // Real Estate starts at scroll: 1600
    const realEstateThreshold = 2700 // Professional Services starts at scroll: 2700
    const professionalServicesThreshold = 3232 // Government starts at scroll: 3232
    const governmentThreshold = 4000 // End of Government section

    // Update the transition zone thresholds to be slightly before each section change
    const heroToConsumerTransition = 400 // Just before Consumer section
    const consumerToRealEstateTransition = 1500 // Just before Real Estate section
    const realEstateToProServicesTransition = 2600 // Just before Professional Services section
    const proServicesToGovernmentTransition = 3100 // Lower this threshold to start Government transition earlier

    // SPECIAL CASE: When scrolling upward to hero section, use a much smaller threshold
    // This will delay the transition when scrolling back up to the hero section
    const upwardToHeroTransition = windowHeight * 0.05 // Reduced from 0.15 to 0.05 - only 5% of window height

    // Determine current section and transition zones
    let newSection = currentSection
    let isInTransition = false
    let nextSectionValue = null

    // Check if we're in a transition zone
    if (scrollDirection === "up" && scrollPosition < upwardToHeroTransition && currentSection !== "hero") {
      // Special case: Transitioning upward to hero section
      isInTransition = true
      nextSectionValue = "hero"
    } else if (scrollPosition >= heroToConsumerTransition && scrollPosition < heroThreshold) {
      // Transitioning from hero to consumer
      isInTransition = true
      nextSectionValue = "consumer"
    } else if (scrollPosition >= consumerToRealEstateTransition && scrollPosition < consumerThreshold) {
      // Transitioning from consumer to real estate
      isInTransition = true
      nextSectionValue = "real-estate"
    } else if (scrollPosition >= realEstateToProServicesTransition && scrollPosition < realEstateThreshold) {
      // Transitioning from real estate to professional services
      isInTransition = true
      nextSectionValue = "professional-services"
    } else if (scrollPosition >= proServicesToGovernmentTransition && scrollPosition < professionalServicesThreshold) {
      // Transitioning from professional services to government
      isInTransition = true
      nextSectionValue = "government"

      // Add debug info
      // if (debugRef.current) {
      //   debugRef.current.innerHTML += `<div>In PS to Gov transition zone: ${scrollPosition}</div>`
      // }
    } else {
      // Determine current section based on scroll position (not in transition)
      if (scrollPosition < heroThreshold) {
        newSection = "hero"
      } else if (scrollPosition < consumerThreshold) {
        newSection = "consumer"
      } else if (scrollPosition < realEstateThreshold) {
        newSection = "real-estate"
      } else if (scrollPosition < professionalServicesThreshold) {
        newSection = "professional-services"
      } else if (scrollPosition < governmentThreshold) {
        newSection = "government"
      } else {
        newSection = "government" // Default to government for very high scroll positions
      }
    }

    // Update transition zone state
    if (isInTransition !== inTransitionZone) {
      setInTransitionZone(isInTransition)

      if (isInTransition) {
        // Start transition UI updates
        setNextSection(nextSectionValue)
        startTransition(currentSection, nextSectionValue)
      }
    }

    // Only update if the section is different from the current one and we're not in a transition
    if (newSection !== currentSection && !isInTransition) {
      // Add a time-based throttle to prevent rapid section changes
      const now = Date.now()
      const timeSinceLastChange = now - lastSectionChangeTime
      const canChangeSection = timeSinceLastChange > 100 // Reduced to 100ms for more responsive updates

      if (canChangeSection) {
        // if (debugRef.current) {
        //   debugRef.current.innerHTML += `<div>Changing section from ${currentSection} to ${newSection}</div>`
        // }

        // Update the section and set the last change time
        setCurrentSection(newSection)
        setLastSectionChangeTime(now)

        // Update the active industry
        if (newSection === "hero") {
          setActiveIndustry("none")
          // Explicitly hide navbar when entering hero section
          setNavbarVisible(false)
        } else {
          setActiveIndustry(newSection)
          // Show navbar for non-hero sections
          setNavbarVisible(true)
        }

        // Complete any transitions
        completeTransition(newSection)
      }
    }
  }, [
    scrollPosition,
    windowHeight,
    manualNavigation,
    currentSection,
    lastSectionChangeTime,
    inTransitionZone,
    scrollDirection,
  ])

  // Now modify the startTransition function to handle upward scrolling to hero section better
  // Find this function around line 300-400:

  // Start transition between sections
  const startTransition = (fromSection, toSection) => {
    // if (debugRef.current) {
    //   debugRef.current.innerHTML += `<div>Starting transition from ${fromSection} to ${toSection}</div>`
    // }

    // Set transition state
    setIsTransitioning(true)

    // Add this special case for Professional Services to Government transition
    const isProfessionalToGovernment = fromSection === "professional-services" && toSection === "government"
    // Add special case for Consumer to Real Estate transition
    const isConsumerToRealEstate = fromSection === "consumer" && toSection === "real-estate"
    // Add special case for transitions to hero section
    const isTransitionToHero = toSection === "hero"
    // Add special case for scrolling up to hero section
    const isScrollingUpToHero = toSection === "hero" && scrollDirection === "up"

    // Get elements
    const header = document.querySelector("header")
    const whiteLogo = document.querySelector("header .absolute:first-child") as HTMLElement
    const blackLogo = document.querySelector("header .absolute:nth-child(2)") as HTMLElement
    const navLinks = document.querySelectorAll("header nav a, header nav button")
    const contactButton = document.querySelector('header nav a[href="#contact"]') as HTMLElement

    if (!header || !whiteLogo || !blackLogo) return

    // Fade out the navbar first - make it completely invisible
    if (header) {
      header.classList.add("transitioning")

      // When scrolling up to hero, use much longer transition times
      // Add special case for Consumer to Real Estate transition
      const transitionTime = isScrollingUpToHero
        ? "1.2s"
        : isProfessionalToGovernment
          ? "1.5s"
          : isConsumerToRealEstate
            ? "0.8s"
            : "0.5s"

      navLinks.forEach((link) => {
        const linkElement = link as HTMLElement
        linkElement.style.transition = `opacity ${transitionTime} ease, color ${transitionTime} ease`
        linkElement.style.opacity = "0"
      })

      if (contactButton) {
        contactButton.style.transition = `opacity ${transitionTime} ease, color ${transitionTime} ease, border-color ${transitionTime} ease, background-color ${transitionTime} ease`
        contactButton.style.opacity = "0"
      }
    }

    // Handle navbar visibility
    if (navContainerRef.current) {
      if (fromSection === "hero" || toSection === "hero") {
        // If transitioning to or from hero, handle navbar visibility
        if (toSection === "hero") {
          // Transitioning to hero - hide navbar with longer transition when scrolling up
          const transitionTime = scrollDirection === "up" ? "0.8s" : "0.5s"
          navContainerRef.current.style.transition = `opacity ${transitionTime} ease`
          navContainerRef.current.style.opacity = "0"
          navContainerRef.current.style.pointerEvents = "none"
          navContainerRef.current.style.visibility = "hidden"
          setNavbarVisible(false)
        } else {
          // Transitioning from hero - prepare navbar but keep it hidden
          navContainerRef.current.style.transition = "opacity 0.5s ease"
          navContainerRef.current.style.opacity = "0"
          navContainerRef.current.style.pointerEvents = "none"
          navContainerRef.current.style.visibility = "visible"

          // Rebuild navigation for the next section
          rebuildNavigation(toSection)
        }
      } else {
        // Transitioning between non-hero sections - fade out navbar
        navContainerRef.current.style.transition = "opacity 0.5s ease"
        navContainerRef.current.style.opacity = "0"
        navContainerRef.current.style.pointerEvents = "none"
      }
    }

    // When transitioning to hero, ensure the white logo is visible
    if (isTransitionToHero) {
      // Skip the transition completely and force hero state immediately
      forceHeaderToHeroState()

      // Add delayed calls to ensure the state persists
      setTimeout(forceHeaderToHeroState, 200)
      setTimeout(forceHeaderToHeroState, 500)
      setTimeout(forceHeaderToHeroState, 800)
    }

    // Special handling for Professional Services to Government transition
    if (isProfessionalToGovernment) {
      // Keep the transition zone active for longer
      setTimeout(() => {
        // Do nothing, just keep the transition zone active
      }, 1000)
    }
  }

  // Complete transition to the new section
  const completeTransition = (section) => {
    // Special handling for Professional Services to Government transition
    if (section === "government" && currentSection === "professional-services") {
      // Add a much longer delay before completing the transition
      setTimeout(() => {
        // Now proceed with the normal transition completion
        // if (debugRef.current) {
        //   debugRef.current.innerHTML += `<div>Completing delayed transition to Government</div>`
        // }

        // Get elements
        const header = document.querySelector("header")
        const whiteLogo = document.querySelector("header .absolute:first-child") as HTMLElement
        const blackLogo = document.querySelector("header .absolute:nth-child(2)") as HTMLElement
        const navLinks = document.querySelectorAll("header nav a, header nav button")
        const contactButton = document.querySelector('header nav a[href="#contact"]') as HTMLElement

        if (!header || !whiteLogo || !blackLogo) return

        // Update the UI based on the section
        whiteLogo.style.opacity = "1"
        blackLogo.style.opacity = "0"
        navLinks.forEach((link) => ((link as HTMLElement).style.color = "white"))
        if (contactButton) {
          contactButton.style.color = "white"
          contactButton.style.borderColor = "white"
        }

        // Fade the navbar back in
        setTimeout(() => {
          // Always ensure header elements are visible
          navLinks.forEach((link) => {
            ;(link as HTMLElement).style.opacity = "1"
          })

          if (contactButton) {
            contactButton.style.opacity = "1"
          }

          if (header) {
            header.classList.remove("transitioning")
          }

          // Handle navbar visibility
          if (navContainerRef.current) {
            // Show navbar for government section
            rebuildNavigation("government")
            navContainerRef.current.style.opacity = "1"
            navContainerRef.current.style.pointerEvents = "auto"
            navContainerRef.current.style.visibility = "visible"
            setNavbarVisible(true)
          }

          // Reset transition states
          setIsTransitioning(false)
          setInTransitionZone(false)
          setNextSection(null)
        }, 300)
      }, 1200) // Increased from 800ms to 1200ms for a longer transition

      // Return early to prevent the rest of the function from executing
      return
    }

    if (section === "real-estate" && currentSection === "consumer") {
      // Immediately update the UI for real estate section
      const header = document.querySelector("header")
      const whiteLogo = document.querySelector("header .absolute:first-child") as HTMLElement
      const blackLogo = document.querySelector("header .absolute:nth-child(2)") as HTMLElement
      const navLinks = document.querySelectorAll("header nav a, header nav button")
      const contactButton = document.querySelector('header nav a[href="#contact"]') as HTMLElement

      if (!header || !whiteLogo || !blackLogo) return

      // Update the UI based on the section
      whiteLogo.style.opacity = "1"
      blackLogo.style.opacity = "0"
      navLinks.forEach((link) => ((link as HTMLElement).style.color = "white"))
      if (contactButton) {
        contactButton.style.color = "white"
        contactButton.style.borderColor = "white"
      }

      // Immediately show the navbar for real-estate section
      if (navContainerRef.current) {
        rebuildNavigation("real-estate")
        navContainerRef.current.style.opacity = "1"
        navContainerRef.current.style.pointerEvents = "auto"
        navContainerRef.current.style.visibility = "visible"
        setNavbarVisible(true)
      }

      // Reset transition states
      setIsTransitioning(false)
      setInTransitionZone(false)
      setNextSection(null)

      return
    }

    // if (debugRef.current) {
    //   debugRef.current.innerHTML += `<div>Completing transition to ${section}</div>`
    // }

    // Get elements
    const header = document.querySelector("header")
    const whiteLogo = document.querySelector("header .absolute:first-child") as HTMLElement
    const blackLogo = document.querySelector("header .absolute:nth-child(2)") as HTMLElement
    const navLinks = document.querySelectorAll("header nav a, header nav button")
    const contactButton = document.querySelector('header nav a[href="#contact"]') as HTMLElement

    if (!header || !whiteLogo || !blackLogo) return

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

    // Fade the navbar back in
    setTimeout(
      () => {
        // Always ensure header elements are visible, even for hero section
        navLinks.forEach((link) => {
          ;(link as HTMLElement).style.opacity = "1"
        })

        if (contactButton) {
          contactButton.style.opacity = "1"
        }

        if (header) {
          header.classList.remove("transitioning")
        }

        // Handle navbar visibility
        if (navContainerRef.current) {
          if (section === "hero") {
            // Keep navbar hidden for hero section
            navContainerRef.current.style.opacity = "0"
            navContainerRef.current.style.pointerEvents = "none"
            navContainerRef.current.style.visibility = "hidden"
            setNavbarVisible(false)
          } else {
            // Show navbar for non-hero sections
            rebuildNavigation(section)
            navContainerRef.current.style.opacity = "1"
            navContainerRef.current.style.pointerEvents = "auto"
            navContainerRef.current.style.visibility = "visible"
            setNavbarVisible(true)
          }
        }

        // Reset transition states
        setIsTransitioning(false)
        setInTransitionZone(false)
        setNextSection(null)
      },
      section === "government" ? 350 : 200,
    ) // Longer delay for government section
  }

  // Modify the updateUI function to include fade transitions
  const updateUI = (section) => {
    // Get elements
    const header = document.querySelector("header")
    const whiteLogo = document.querySelector("header .absolute:first-child") as HTMLElement
    const blackLogo = document.querySelector("header .absolute:nth-child(2)") as HTMLElement
    const navLinks = document.querySelectorAll("header nav a, header nav button")
    const contactButton = document.querySelector('header nav a[href="#contact"]') as HTMLElement

    if (!header || !whiteLogo || !blackLogo) return

    // Start transition - fade out completely
    setIsTransitioning(true)

    // Fade out the navbar first - make it completely invisible
    if (header) {
      header.classList.add("transitioning")
      navLinks.forEach((link) => {
        const linkElement = link as HTMLElement
        linkElement.style.transition = "opacity 0.5s ease, color 0.5s ease"
        linkElement.style.opacity = "0"
      })

      if (contactButton) {
        contactButton.style.transition =
          "opacity 0.5s ease, color 0.5s ease, border-color 0.5s ease, background-color 0.5s ease"
        contactButton.style.opacity = "0"
      }
    }

    // After a longer delay, update the colors and fade back in
    setTimeout(() => {
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

      // Fade the navbar back in after another delay
      setTimeout(() => {
        navLinks.forEach((link) => {
          ;(link as HTMLElement).style.opacity = "1"
        })

        if (contactButton) {
          contactButton.style.opacity = "1"
        }

        header.classList.remove("transitioning")
        setIsTransitioning(false)
      }, 300) // Increased delay for more visible transition
    }, 300) // Increased delay for more visible transition

    // Update navbar visibility with more aggressive approach
    if (navContainerRef.current) {
      if (section === "hero") {
        // Ensure navbar is completely hidden in hero section
        navContainerRef.current.style.transition = "opacity 0.5s ease"
        navContainerRef.current.style.opacity = "0"
        navContainerRef.current.style.pointerEvents = "none"
        navContainerRef.current.style.visibility = "hidden" // Add visibility:hidden for complete hiding
        setNavbarVisible(false)
      } else {
        // If coming from hero section, fade in the navbar
        if (currentSection === "hero") {
          // Start with opacity 0 and hidden
          navContainerRef.current.style.transition = "opacity 0.5s ease"
          navContainerRef.current.style.opacity = "0"
          navContainerRef.current.style.pointerEvents = "none"
          navContainerRef.current.style.visibility = "visible" // Make it visible first but transparent

          // After a delay, fade in
          setTimeout(() => {
            rebuildNavigation(section) // Rebuild navigation before fading in
            navContainerRef.current.style.opacity = "1"
            navContainerRef.current.style.pointerEvents = "auto"
            setNavbarVisible(true)
          }, 500) // Longer delay for more visible transition
        } else {
          // If already visible, fade out then update and fade back in
          navContainerRef.current.style.opacity = "0"
          navContainerRef.current.style.pointerEvents = "none"

          // After a delay, rebuild and fade in with updated content
          setTimeout(() => {
            rebuildNavigation(section)
            navContainerRef.current.style.opacity = "1"
            navContainerRef.current.style.pointerEvents = "auto"
            setNavbarVisible(true)
          }, 500) // Longer delay for more visible transition
        }
      }
    }
  }

  // Function to update navigation highlighting
  const updateNavHighlighting = (section) => {
    if (navContainerRef.current) {
      // First fade out the navigation completely
      const buttons = navContainerRef.current.querySelectorAll("button")
      buttons.forEach((button) => {
        button.style.transition = "opacity 0.5s ease, color 0.5s ease, border-color 0.5s ease"
        button.style.opacity = "0"
      })

      // After a longer delay, update the styles and fade back in
      setTimeout(() => {
        // Clear existing content and rebuild
        rebuildNavigation(section)

        // Get the new buttons
        const newButtons = navContainerRef.current.querySelectorAll("button")

        // Fade them in
        newButtons.forEach((button) => {
          button.style.opacity = "1"
        })
      }, 300) // Longer delay for more visible transition
    }
  }

  // Function to rebuild the navigation
  const rebuildNavigation = (section) => {
    if (!navContainerRef.current) return

    // Set text color based on section - FORCE BLACK for Professional Services
    const isLightSection = section === "consumer" || section === "professional-services"
    const borderColor = isLightSection ? "border-gray-300" : "border-white/30"
    const activeTextColor =
      section === "professional-services" ? "text-black" : isLightSection ? "text-black" : "text-white"
    const inactiveTextColor =
      section === "professional-services" ? "text-gray-600" : isLightSection ? "text-gray-600" : "text-gray-300"
    const hoverTextColor =
      section === "professional-services"
        ? "hover:text-black"
        : isLightSection
          ? "hover:text-black"
          : "hover:text-white"
    const activeBorderColor =
      section === "professional-services" ? "border-black" : isLightSection ? "border-black" : "border-white"

    // Create navigation buttons
    const navContainer = navContainerRef.current
    navContainer.innerHTML = "" // Clear existing content

    // Add label
    const label = document.createElement("div")
    label.className = isVerySmallScreen
      ? "text-engineerd-red text-xs mb-1"
      : isSmallScreen
        ? "text-engineerd-red text-sm mb-1"
        : "text-engineerd-red text-sm mb-2"
    label.textContent = "View our industries"
    navContainer.appendChild(label)

    // Create button container
    const buttonContainer = document.createElement("div")
    buttonContainer.className = `flex flex-wrap border-b ${borderColor} relative`
    buttonContainer.style.paddingBottom = isVerySmallScreen ? "4px" : "8px"
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
      button.id = `nav-button-${industry.id}`

      // Force the correct active industry based on current section
      let isActive = false
      if (section === "consumer" && industry.id === "consumer") isActive = true
      else if (section === "real-estate" && industry.id === "real-estate") isActive = true
      else if (section === "professional-services" && industry.id === "professional-services") isActive = true
      else if (section === "government" && industry.id === "government") isActive = true

      // SPECIAL CASE for Professional Services
      if (industry.id === "professional-services" && section === "professional-services") {
        button.className = `text-xl md:text-2xl font-medium mr-8 md:mr-12 lg:mr-16 pb-2 transition-all cursor-pointer text-black border-b-2 border-black -mb-[1px]`
      } else {
        const buttonFontSize = isVerySmallScreen
          ? "text-lg"
          : isSmallScreen
            ? "text-lg md:text-xl"
            : "text-xl md:text-2xl"

        const buttonMargin = isVerySmallScreen ? "mr-4" : isSmallScreen ? "mr-6 md:mr-8" : "mr-8 md:mr-12 lg:mr-16"

        const buttonPadding = isVerySmallScreen ? "pb-1" : "pb-2"

        button.className = `${buttonFontSize} font-medium ${buttonMargin} ${buttonPadding} transition-all cursor-pointer ${
          isActive
            ? `${activeTextColor} border-b-2 ${activeBorderColor} -mb-[1px]`
            : `${inactiveTextColor} ${hoverTextColor}`
        }`
      }

      button.style.position = "relative"
      button.style.zIndex = "999"

      // Add event listener with a more direct approach
      const industryId = industry.id
      button.onclick = () => {
        // if (debugRef.current) {
        //   debugRef.current.innerHTML += `<div>Button clicked: ${industryId}</div>`
        // }
        handleIndustryClick(industryId)
      }

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
  }

  // Add this new function right after the rebuildNavigation function (around line 500-600)

  // Force navbar to match current scroll position
  const forceNavbarToMatchScroll = () => {
    const scrollY = window.scrollY

    // Determine which section we're in based on exact scroll positions
    let currentSection
    if (scrollY < 500) {
      currentSection = "hero"
    } else if (scrollY < 1600) {
      currentSection = "consumer"
    } else if (scrollY < 2700) {
      currentSection = "real-estate"
    } else if (scrollY < 3232) {
      currentSection = "professional-services"
    } else {
      currentSection = "government"
    }

    // Only update if navbar is visible and we're not in hero section
    if (currentSection !== "hero" && navContainerRef.current) {
      // Special case for Government section - force it to show earlier
      if (scrollY >= 3100) {
        currentSection = "government"
      }

      rebuildNavigation(currentSection)
      navContainerRef.current.style.opacity = "1"
      navContainerRef.current.style.pointerEvents = "auto"
      navContainerRef.current.style.visibility = "visible"
      setNavbarVisible(true)
      setActiveIndustry(currentSection)
    }
  }

  // Force header to hero state - completely bypass React state management
  const forceHeaderToHeroState = () => {
    // Get all header elements
    const header = document.querySelector("header")
    const whiteLogo = document.querySelector("header .absolute:first-child") as HTMLElement
    const blackLogo = document.querySelector("header .absolute:nth-child(2)") as HTMLElement
    const navLinks = document.querySelectorAll("header nav a, header nav button")
    const contactButton = document.querySelector('header nav a[href="#contact"]') as HTMLElement

    if (!header || !whiteLogo || !blackLogo) return

    // Force immediate transitions by removing all transition properties
    whiteLogo.style.transition = "none"
    blackLogo.style.transition = "none"

    // Force white logo to be visible and black logo to be hidden
    whiteLogo.style.opacity = "1"
    blackLogo.style.opacity = "0"

    // Force all nav links to be white and fully visible
    navLinks.forEach((link) => {
      const linkElement = link as HTMLElement
      linkElement.style.transition = "none"
      linkElement.style.color = "white"
      linkElement.style.opacity = "1"
    })

    // Force contact button to be white with white border
    if (contactButton) {
      contactButton.style.transition = "none"
      contactButton.style.color = "white"
      contactButton.style.borderColor = "white"
      contactButton.style.opacity = "1"
    }

    // Remove any transitioning classes
    header.classList.remove("transitioning")

    // Force industry navigation to be completely hidden
    if (navContainerRef.current) {
      navContainerRef.current.style.transition = "none"
      navContainerRef.current.style.opacity = "0"
      navContainerRef.current.style.pointerEvents = "none"
      navContainerRef.current.style.visibility = "hidden"
      navContainerRef.current.style.display = "none"
      // Reset top position to default
      navContainerRef.current.style.top = isVerySmallScreen
        ? "80px"
        : isSmallScreen
          ? "100px"
          : isMediumScreen
            ? "120px"
            : "140px"
    }

    // Force React state to match DOM state
    setCurrentSection("hero")
    setActiveIndustry("none")
    setNavbarVisible(false)
    setIsTransitioning(false)
    setInTransitionZone(false)
    setNextSection(null)
  }

  // Now add a new useEffect with a direct scroll event listener specifically for handling upward scrolling

  // Add this new useEffect right after the existing useEffect hooks (around line 650-700)

  // Direct scroll event listener for handling upward scrolling to hero section
  useEffect(() => {
    // This function will be called on every scroll event
    const handleDirectScroll = () => {
      const currentScrollY = window.scrollY

      // Check if we're scrolling up and very close to the top (within 15% of window height)
      if (currentScrollY < lastScrollPositionRef.current && currentScrollY < windowHeight * 0.15) {
        // Force header to hero state immediately
        forceHeaderToHeroState()

        // If we're at the absolute top, ensure everything is in the correct state
        if (currentScrollY < 10) {
          setTimeout(forceHeaderToHeroState, 100)
          setTimeout(forceHeaderToHeroState, 300)
          setTimeout(forceHeaderToHeroState, 500)
        }
      }

      // Update last scroll position
      lastScrollPositionRef.current = currentScrollY
    }

    // Add the direct scroll event listener
    window.addEventListener("scroll", handleDirectScroll, { passive: true })

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleDirectScroll)
    }
  }, [windowHeight])

  // Replace the existing "Add an additional safety mechanism" useEffect with this more aggressive version:

  // Add an additional safety mechanism to ensure header is visible when scrolling up to hero
  useEffect(() => {
    // This specifically handles the case of scrolling up to the hero section
    // Apply for ANY upward scrolling when in the top 20% of the page
    if (scrollDirection === "up" && scrollPosition < windowHeight * 0.2) {
      // Force header to hero state
      forceHeaderToHeroState()

      // Add additional delayed calls to ensure the state persists
      setTimeout(forceHeaderToHeroState, 100)
      setTimeout(forceHeaderToHeroState, 300)
    }

    // Additional check for being at the absolute top of the page
    if (scrollPosition < 20) {
      forceHeaderToHeroState()
    }
  }, [scrollDirection, scrollPosition, windowHeight])

  // Replace the existing "Completely prevent transitions" useEffect with this more aggressive version:

  // Completely prevent transitions when near the top
  useEffect(() => {
    if (scrollPosition < windowHeight * 0.2) {
      // Force header to hero state
      forceHeaderToHeroState()
    }
  }, [scrollPosition, windowHeight])

  // Now modify the startTransition function to completely skip transitions when going to hero section
  // Find the startTransition function and replace the "When transitioning to hero" block with this:

  // Start transition between sections

  // Calculate the scale for the background image zoom effect - more gradual
  const backgroundImageScale = 1 + scrollPosition / 2000

  // Improved handleIndustryClick function with better scroll positions and UI updates
  const handleIndustryClick = (industryId) => {
    console.log(`Industry ${industryId} clicked`)

    // Set manual navigation mode to prevent intersection observer from changing sections
    setManualNavigation(true)

    // Start transition - fade out the navbar
    if (navContainerRef.current) {
      const buttons = navContainerRef.current.querySelectorAll("button")
      buttons.forEach((button) => {
        button.style.transition = "opacity 0.3s ease"
        button.style.opacity = "0"
      })
    }

    // Fade out the header navigation
    const navLinks = document.querySelectorAll("header nav a, header nav button")
    navLinks.forEach((link) => {
      const linkElement = link as HTMLElement
      linkElement.style.transition = "opacity 0.3s ease"

      linkElement.style.opacity = "0"
    })

    // After a short delay, update the state and UI
    setTimeout(() => {
      // Immediately update the active industry for better UI feedback
      setActiveIndustry(industryId)
      setCurrentSection(industryId)

      // Set the manually selected section to ensure it stays active
      setManuallySelectedSection(industryId)

      // Calculate scroll positions based on window height
      let scrollPosition = 0

      if (industryId === "consumer") {
        scrollPosition = 600 // Slightly past the consumer threshold
      } else if (industryId === "real-estate") {
        scrollPosition = 1700 // Slightly past the real estate threshold
      } else if (industryId === "professional-services") {
        scrollPosition = 2800 // Slightly past the professional services threshold
      } else if (industryId === "government") {
        scrollPosition = 3300 // Slightly past the government threshold
      } else {
        alert(
          `${industryId.charAt(0).toUpperCase() + industryId.slice(1).replace("-", " ")} industry section coming soon!`,
        )
        setManualNavigation(false)
        setManuallySelectedSection(null)
        return
      }

      // Add debug info
      // if (debugRef.current) {
      //   debugRef.current.innerHTML += `<div>Scrolling to ${industryId} at position ${scrollPosition}</div>`
      // }

      // Scroll to the calculated position
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      })

      // Force the active industry to update immediately
      updateUI(industryId)

      // Keep manual navigation mode active for a longer time to ensure the scroll completes
      setTimeout(() => {
        setManualNavigation(false)

        // Add debug info
        // if (debugRef.current) {
        //   debugRef.current.innerHTML += `<div>Manual navigation disabled</div>`
        // }

        // Keep the manually selected section active for a bit longer
        setTimeout(() => {
          setManuallySelectedSection(null)
        }, 2000)
      }, 3000) // Increased to 3000ms to ensure the scroll completes
    }, 150)
  }

  // Toggle between primary and secondary industries
  const toggleIndustriesView = () => {
    setShowingSecondaryIndustries((prev) => !prev)
  }

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

  // COMPLETELY NEW APPROACH: Initialize UI state on first load with a delay
  useEffect(() => {
    // This function will be called after the component mounts
    const initializeUI = () => {
      // Force the navbar to be hidden initially with multiple properties
      if (navContainerRef.current) {
        navContainerRef.current.style.opacity = "0"
        navContainerRef.current.style.pointerEvents = "none"
        navContainerRef.current.style.visibility = "hidden" // Add visibility:hidden for complete hiding
        setNavbarVisible(false)
      }

      // Force the correct logo and text color for hero section
      const header = document.querySelector("header")
      const whiteLogo = document.querySelector("header .absolute:first-child") as HTMLElement
      const blackLogo = document.querySelector("header .absolute:nth-child(2)") as HTMLElement
      const navLinks = document.querySelectorAll("header nav a, header nav button")
      const contactButton = document.querySelector('header nav a[href="#contact"]') as HTMLElement

      if (header && whiteLogo && blackLogo) {
        whiteLogo.style.opacity = "1"
        blackLogo.style.opacity = "0"
        navLinks.forEach((link) => ((link as HTMLElement).style.color = "white"))
        if (contactButton) {
          contactButton.style.color = "white"
          contactButton.style.borderColor = "white"
        }
      }

      // Explicitly set the current section and active industry
      setCurrentSection("hero")
      setActiveIndustry("none")

      // Set initialization flag
      setIsInitialized(true)
    }

    // Call initialization with a delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeUI()
    }, 100)

    // Cleanup function
    return () => clearTimeout(timer)
  }, []) // Empty dependency array ensures this runs only once on mount

  // ADDITIONAL SAFETY: Force navbar to be hidden when in hero section
  useEffect(() => {
    // This runs on every render to ensure navbar is hidden in hero section
    if (currentSection === "hero" && navContainerRef.current) {
      navContainerRef.current.style.opacity = "0"
      navContainerRef.current.style.pointerEvents = "none"
      navContainerRef.current.style.visibility = "hidden" // Add visibility:hidden for complete hiding
      setNavbarVisible(false)
    }
  }, [currentSection, scrollPosition])

  // ADDITIONAL SAFETY: Force active industry to be none when in hero section
  useEffect(() => {
    if (currentSection === "hero" && activeIndustry !== "none") {
      setActiveIndustry("none")

      // Add debug info
      // if (debugRef.current) {
      //   debugRef.current.innerHTML += `<div>Active industry reset to none because section is hero</div>`
      // }
    }
  }, [currentSection, activeIndustry])

  // Add a scroll position check on initial load to ensure correct section
  useEffect(() => {
    // This runs once after component mounts
    if (isInitialized && scrollPosition < windowHeight * 0.5) {
      setCurrentSection("hero")
      setActiveIndustry("none")
      setNavbarVisible(false)

      if (navContainerRef.current) {
        navContainerRef.current.style.opacity = "0"
        navContainerRef.current.style.pointerEvents = "none"
      }
    }
  }, [isInitialized, scrollPosition, windowHeight])

  // Determine logo and text color based on current section
  const showWhiteLogo = currentSection === "hero" || currentSection === "real-estate" || currentSection === "government"
  const showBlackLogo = currentSection === "consumer" || currentSection === "professional-services"
  const textColor = currentSection === "consumer" || currentSection === "professional-services" ? "black" : "white"

  // Ensure header is always visible in hero section
  useEffect(() => {
    if (currentSection === "hero" && !isTransitioning) {
      const header = document.querySelector("header")
      const whiteLogo = document.querySelector("header .absolute:first-child") as HTMLElement
      const blackLogo = document.querySelector("header .absolute:nth-child(2)") as HTMLElement
      const navLinks = document.querySelectorAll("header nav a, header nav button")
      const contactButton = document.querySelector('header nav a[href="#contact"]') as HTMLElement

      if (header && whiteLogo && blackLogo) {
        // Ensure white logo is visible in hero section
        whiteLogo.style.opacity = "1"
        blackLogo.style.opacity = "0"

        // Ensure nav links are visible with white color
        navLinks.forEach((link) => {
          const linkElement = link as HTMLElement
          linkElement.style.color = "white"
          linkElement.style.opacity = "1"
        })

        if (contactButton) {
          contactButton.style.color = "white"
          contactButton.style.borderColor = "white"
          contactButton.style.opacity = "1"
        }

        header.classList.remove("transitioning")
      }
    }
  }, [currentSection, isTransitioning])

  // Add an additional safety mechanism to ensure header is visible when scrolling up to hero
  useEffect(() => {
    // This specifically handles the case of scrolling up to the hero section
    // Apply for ANY upward scrolling when in the top 20% of the page
    if (scrollDirection === "up" && scrollPosition < windowHeight * 0.2) {
      // Force header to hero state
      forceHeaderToHeroState()

      // Add additional delayed calls to ensure the state persists
      setTimeout(forceHeaderToHeroState, 100)
      setTimeout(forceHeaderToHeroState, 300)
    }

    // Additional check for being at the absolute top of the page
    if (scrollPosition < 20) {
      forceHeaderToHeroState()
    }
  }, [scrollDirection, scrollPosition, windowHeight])

  // Add a new useEffect hook to completely prevent transitions when very close to the top
  // Add this right after the previous useEffect:

  // Completely prevent transitions when near the top
  useEffect(() => {
    if (scrollPosition < windowHeight * 0.2) {
      // Force header to hero state
      forceHeaderToHeroState()
    }
  }, [scrollPosition, windowHeight])

  // Special handling for Professional Services to Government transition
  useEffect(() => {
    // Check if we're in the extended transition zone between Professional Services and Government
    // Lower the threshold to start showing Government earlier
    if (scrollPosition >= 3100 && scrollPosition < 3400) {
      // We're in the transition zone to Government

      // Force the navigation to Government when we're getting close
      if (scrollPosition >= 3100 && navContainerRef.current) {
        // Rebuild navigation for Government
        rebuildNavigation("government")

        // Force the header to Government state
        const header = document.querySelector("header")
        const whiteLogo = document.querySelector("header .absolute:first-child") as HTMLElement
        const blackLogo = document.querySelector("header .absolute:nth-child(2)") as HTMLElement
        const navLinks = document.querySelectorAll("header nav a, header nav button")
        const contactButton = document.querySelector('header nav a[href="#contact"]') as HTMLElement

        if (header && whiteLogo && blackLogo) {
          whiteLogo.style.opacity = "1"
          blackLogo.style.opacity = "0"
          navLinks.forEach((link) => ((link as HTMLElement).style.color = "white"))
          if (contactButton) {
            contactButton.style.color = "white"
            contactButton.style.borderColor = "white"
          }
        }
      }
    }
  }, [scrollPosition])

  // Add a new useEffect to dynamically adjust navbar position on resize
  // Add this after the other useEffect hooks:

  // Periodically check and force navbar to match scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning && !manualNavigation) {
        forceNavbarToMatchScroll()
      }
    }, 500) // Check every 500ms

    return () => clearInterval(interval)
  }, [isTransitioning, manualNavigation])

  // Add a direct scroll event listener to immediately update navbar on scroll
  // Add this after the other useEffect hooks

  // Direct scroll event listener to immediately update navbar
  useEffect(() => {
    const handleDirectScroll = () => {
      // Only update if not in transition or manual navigation
      if (!isTransitioning && !manualNavigation) {
        forceNavbarToMatchScroll()
      }
    }

    window.addEventListener("scroll", handleDirectScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleDirectScroll)
    }
  }, [isTransitioning, manualNavigation])

  // Dynamically adjust navbar position on resize
  useEffect(() => {
    if (navContainerRef.current) {
      const topPosition = isVerySmallScreen ? "80px" : isSmallScreen ? "100px" : isMediumScreen ? "120px" : "140px"
      navContainerRef.current.style.top = topPosition
    }
  }, [windowHeight, windowWidth, isVerySmallScreen, isSmallScreen, isMediumScreen])

  return (
    <div className="relative font-sans">
      {/* Fixed Header with dynamic logo and text color based on scroll position */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 md:px-8 pt-3 md:pt-6 transition-colors duration-300">
        <div className="max-w-[1800px] mx-auto flex justify-between items-start">
          {/* Logo with color transition */}
          <Link href="/">
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
          </Link>

          {/* Navigation Links with dynamic color */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-16 py-2">
            <Link
              href="/about"
              className="transition-all duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              About
            </Link>
            <Link
              href="/industries"
              className="transition-all duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              Industries
            </Link>
            <Link
              href="/products"
              className="transition-all duration-300 hover:opacity-80 text-sm lg:text-base"
              style={{ color: textColor }}
            >
              Products
            </Link>
            <Link
              href="/careers"
              className="transition-all duration-300 hover:opacity-80 text-sm lg:text-base"
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
          <button className="md:hidden py-2 transition-all duration-300" style={{ color: textColor }}>
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
        className="fixed left-0 w-full z-[999] px-6 md:px-8 lg:px-12 xl:px-16"
        style={{
          top: isVerySmallScreen ? "80px" : isSmallScreen ? "100px" : isMediumScreen ? "120px" : "140px",
          padding: isVerySmallScreen ? "12px 20px" : "20px",
          background: "transparent",
          transition: "opacity 0.5s ease, top 0.3s ease", // Added transition for top position
          opacity: navbarVisible ? "1" : "0",
          pointerEvents: navbarVisible ? "auto" : "none",
          visibility: currentSection === "hero" ? "hidden" : "visible",
          display: currentSection === "hero" ? "none" : "block",
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
          transform: `translateY(${Math.max(0, 100 - scrollPosition / 3)}vh)`,
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
                    href
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
          transform: `translateY(${Math.max(0, 200 - (scrollPosition - windowHeight * 0.8) / 4.5)}vh)`,
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

      {/* Professional Services Section - FIXED TRANSFORM CALCULATION */}
      <section
        ref={professionalServicesRef}
        id="professional-services-section"
        className="fixed top-0 left-0 w-full h-screen bg-gray-100 overflow-hidden"
        style={{
          // Modified transform calculation to make it stay on screen much longer
          transform: `translateY(${Math.max(0, 300 - (scrollPosition - windowHeight * 1.6) / 4.5)}vh)`,
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

      {/* Government Section - FIXED TRANSFORM CALCULATION */}
      <section
        ref={governmentRef}
        id="government-section"
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{
          // Modified transform calculation to match new professional services timing
          transform: `translateY(${Math.max(0, 400 - (scrollPosition - windowHeight * 2.4) / 3.0)}vh)`,
          transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          zIndex: 50,
        }}
      >
        {/* Special marker for Government section detection */}
        <div ref={governmentMarkerRef} className="absolute inset-0 pointer-events-none"></div>

        {/* Background Image with gray overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/government-background.png"
            alt="Government parliament chamber"
            fill
            priority
            className="object-cover"
          />

          {/* Gray overlay for better text visibility */}
          <div className="absolute inset-0 bg-gray-800/70"></div>
        </div>

        {/* Government Content - Updated to match the provided layout */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col px-6 md:px-8 lg:px-12 xl:px-16">
            {/* Government Content */}
            <div className="mt-[200px] md:mt-[220px] lg:mt-[240px] max-w-2xl relative z-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8">
                Transform Government &<br />
                Public Sector
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10 leading-relaxed">
                By optimizing workflows, automating routine tasks, and reducing administrative burdens, we help
                alleviate burnout for government workers. This enables professionals to focus on strategic efforts,
                boosting efficiency and improving client satisfaction.
              </p>

              {/* Let's Connect Button - Styled to match the image */}
              <button className="bg-red-600 text-white rounded-full px-8 py-4 flex items-center hover:bg-red-700 transition-colors">
                Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to allow scrolling for future sections */}
      <div style={{ height: "500vh" }}></div>
    </div>
  )
}

