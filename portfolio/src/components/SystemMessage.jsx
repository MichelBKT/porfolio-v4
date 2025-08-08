import React, { useEffect, useState } from 'react';

const SystemMessage = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const lines = [
        '>> INITIALIZING DEVELOPER PROFILE...',
        '>> LOADING PORTFOLIO DATA...',
        '>> SYSTEM READY FOR INTERACTION',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleLines, setVisibleLines] = useState([]);

    useEffect(() => {
        if (currentIndex < lines.length) {
            const timeout = setTimeout(() => {
                setVisibleLines((prev) => [...prev, lines[currentIndex]]);
                setCurrentIndex((prev) => prev + 1);
            }, 2300); // délai entre chaque ligne
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, lines]);

    return (
        <div className="text-sm sm:text-lg lg:text-xl max-w-3xl text-center my-4 sm:my-6 lg:my-8 font-rajdhani leading-relaxed space-y-3">
            {visibleLines.map((line, index) => (
                <div key={index} className="animate-slide-in-right text-white">
                    {line}
                </div>
            ))}
        </div>
    );
};

export default SystemMessage;
