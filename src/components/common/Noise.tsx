import React, { useEffect, useState } from 'react';

/**
 * Noise Component
 * High-performance analog film grain overlay:
 * Generates an ultra-lightweight 128x128 static noise tile once in memory on mount
 * rather than running heavy runtime SVG turbulence filter calculations.
 * Completely eliminates layout repaints and GPU composite stalls during scroll.
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} High-performance grain overlay.
 */
export const Noise: React.FC = () => {
  const [noiseDataUrl, setNoiseDataUrl] = useState<string>('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const imgData = ctx.createImageData(128, 128);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.floor(Math.random() * 255);
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 18; // Subtle grain opacity
      }
      ctx.putImageData(imgData, 0, 0);
      setNoiseDataUrl(canvas.toDataURL('image/png'));
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 select-none opacity-50 transform-gpu"
      style={{
        backgroundImage: noiseDataUrl ? `url("${noiseDataUrl}")` : undefined,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

export default Noise;
