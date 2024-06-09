'use client'
import { useEffect } from 'react';

const TypebotInitializer = () => {
  useEffect(() => {
    const typebotInitScript = document.createElement('script');
    typebotInitScript.type = 'module';
    typebotInitScript.innerHTML = `
      import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.2/dist/web.js';

      Typebot.initBubble({
        typebot: "lead-generation-6s7zg1r",
        theme: { button: { backgroundColor: "#0042DA" } },
      });
    `;

    const targetDiv = document.getElementById('typebot-container');
    if (targetDiv) {
      targetDiv.appendChild(typebotInitScript);
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (targetDiv) {
        targetDiv.removeChild(typebotInitScript);
      }
    };
  }, []);

  return null; // This component doesn't render anything to the DOM
};

export default TypebotInitializer;
