import React, { useState, useEffect } from 'react';

const TypewriterTwoLines = ({ fullText }) => {
  const [text, setText] = useState('');
  const [maxCharsPerLine] = useState(16);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const words = fullText.split(' ');
    let currentLine = '';
    let formattedText = '';

    words.forEach((word) => {
      if ((currentLine + word).length <= maxCharsPerLine) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        formattedText += currentLine + '\n';
        currentLine = word;
      }
    });

    if (currentLine) {
      formattedText += currentLine;
    }

    if (!isDeleting && text === formattedText) {
      setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(50);
      }, 2000);
      return;
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setTypingSpeed(150);
      return;
    }

    setDisplayText(formattedText);
  }, [fullText, isDeleting, maxCharsPerLine, text]);

  useEffect(() => {
    const delta = isDeleting ? -1 : 1;
    const nextText = displayText.substring(0, text.length + delta);

    const timer = setTimeout(() => {
      setText(nextText);
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, displayText, typingSpeed]);

  return (
    <div className="whitespace-pre-line text-center">
      {text}
      <span className="animate-blink">|</span>
    </div>
  );
};

export default TypewriterTwoLines;