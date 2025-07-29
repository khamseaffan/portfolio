import React, { useState, useEffect } from 'react'

const Typewriter = ({ texts, typingSpeed = 100, pauseTime = 1000 }) => {
  const [textIndex, setTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (isTyping && displayText.length < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + texts[textIndex][prev.length])
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else if (displayText.length === texts[textIndex].length) {
      setIsTyping(false)

      const pauseTimeout = setTimeout(() => {
        setIsTyping(false)
        setTimeout(() => {
          setIsTyping(true)
          setDisplayText('')
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }, 600)
      }, pauseTime)

      return () => clearTimeout(pauseTimeout)
    }
  }, [displayText, isTyping, texts, textIndex, typingSpeed, pauseTime])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <h2 className="text-2xl md:text-3xl font-header font-semibold text-accent min-h-[3rem] flex items-center">
      <span className="inline-block">
        {displayText}
        <span 
          className={`inline-block w-0.5 h-8 bg-accent ml-1 transition-opacity duration-150 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </span>
    </h2>
  )
}

export default Typewriter