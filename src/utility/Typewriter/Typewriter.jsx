import React, { useState, useEffect } from 'react';
import styles from './Typewriter.module.css'; // Assuming you have CSS for styling the typewriter text

const Typewriter = ({ texts, typingSpeed = 100, pauseTime = 1000 }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping && displayText.length < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + texts[textIndex][prev.length]);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else if (displayText.length === texts[textIndex].length) {
      setIsTyping(false);

      const pauseTimeout = setTimeout(() => {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setDisplayText('\u00A0');
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 600); 
      }, pauseTime);

      return () => clearTimeout(pauseTimeout);
    }
  }, [displayText, isTyping, texts, textIndex, typingSpeed, pauseTime]);

  return <h2 className={styles.typewriterText}>{displayText}</h2>;
};

export default Typewriter;
