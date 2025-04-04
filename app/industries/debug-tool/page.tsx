"use client"

import { useEffect } from "react"

const DebugToolPage = () => {
  useEffect(() => {
    const jumpButton = document.getElementById("jump-button")

    if (jumpButton) {
      jumpButton.onclick = () => {
        window.scrollTo({
          top: window.innerHeight * 3.2,
          behavior: "smooth",
        })
      }
    }
  }, [])

  return (
    <div>
      <h1>Debug Tool Page</h1>
      <p>This page is for debugging purposes.</p>
      <button id="jump-button">Jump to Section</button>
    </div>
  )
}

export default DebugToolPage

