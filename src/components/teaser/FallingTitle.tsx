import React, { useState, useEffect, useRef } from 'react';

export interface FallingTitleProps {
  text: string;
  durationMs?: number;
  className?: string;
}

const CYBER_GLYPHS = ['Ø', 'X', 'Z', '0', '1', 'V', 'O', 'I', 'D', 'R', 'A', 'W', 'S', 'L', 'T', 'U', '§', '‡', 'Ψ', 'Ω'];

interface CharacterState {
  char: string;
  isLocked: boolean;
  offsetY: number;
  justLocked: boolean;
}

/**
 * FallingTitle Component
 * Renders an underground techno slot-cascade / decoder drop sequence:
 * Over exactly 1.5 seconds, letters tumble downward from above while cycling
 * through glyphs, sequentially locking one after another into the final letters
 * to spell out the title.
 * Zero hardcoded color literals.
 *
 * @param {FallingTitleProps} props - Component properties.
 * @returns {JSX.Element} Interactive animated typography element.
 */
export const FallingTitle: React.FC<FallingTitleProps> = ({
  text,
  durationMs = 1500,
  className = '',
}) => {
  const chars = Array.from(text);
  const totalChars = chars.length;

  // Calculate lock-in timestamps for each character index
  const lockTimes = useRef<number[]>(
    chars.map((char, index) => {
      if (char === ' ') return 0;
      // Stagger lock times from 250ms up to durationMs (1500ms)
      const minLock = 250;
      const progress = totalChars <= 1 ? 1 : index / (totalChars - 1);
      return minLock + progress * (durationMs - minLock);
    })
  ).current;

  const [charStates, setCharStates] = useState<CharacterState[]>(() =>
    chars.map((char) => ({
      char: char === ' ' ? ' ' : CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)],
      isLocked: char === ' ',
      offsetY: char === ' ' ? 0 : -32,
      justLocked: false,
    }))
  );

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    let lastGlyphSwap = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const shouldSwapGlyph = now - lastGlyphSwap > 42; // ~24fps glyph cycle rate
      if (shouldSwapGlyph) {
        lastGlyphSwap = now;
      }

      const updated = chars.map((targetChar, i) => {
        if (targetChar === ' ') {
          return {
            char: ' ',
            isLocked: true,
            offsetY: 0,
            justLocked: false,
          };
        }

        const lockTime = lockTimes[i];
        const isLocked = elapsed >= lockTime;

        if (isLocked) {
          const timeSinceLock = elapsed - lockTime;
          return {
            char: targetChar,
            isLocked: true,
            offsetY: 0,
            justLocked: timeSinceLock < 160,
          };
        }

        // Still falling and cycling
        const progress = Math.min(1, Math.max(0, elapsed / lockTime));
        // Falling down: begins at -32px and decelerates to 0px
        const currentOffset = -32 * (1 - progress);
        const randomChar = shouldSwapGlyph
          ? CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)]
          : charStates[i]?.char || CYBER_GLYPHS[0];

        return {
          char: randomChar,
          isLocked: false,
          offsetY: currentOffset,
          justLocked: false,
        };
      });

      setCharStates(updated);

      if (elapsed < durationMs + 200) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        // Final lock-in guarantee
        setCharStates(
          chars.map((targetChar) => ({
            char: targetChar,
            isLocked: true,
            offsetY: 0,
            justLocked: false,
          }))
        );
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, durationMs]);

  return (
    <span className={`inline-flex items-center justify-center select-none ${className}`}>
      {charStates.map((state, index) => {
        const isSpace = chars[index] === ' ';

        if (isSpace) {
          return (
            <span key={index} className="inline-block w-[0.25em]">
              &nbsp;
            </span>
          );
        }

        return (
          <span
            key={index}
            className={`inline-block transition-colors duration-150 ${
              state.justLocked
                ? 'text-ls-blue-laserCyan scale-105 drop-shadow-[0_0_16px_var(--ls-color-blue-laserCyan)]'
                : state.isLocked
                ? 'text-ls-mono-pureWhite laser-glow-text'
                : 'text-ls-mono-silver opacity-80'
            }`}
            style={{
              transform: `translateY(${state.offsetY.toFixed(1)}px)`,
            }}
          >
            {state.char}
          </span>
        );
      })}
    </span>
  );
};

export default FallingTitle;
