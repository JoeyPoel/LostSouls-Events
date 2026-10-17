import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseTechnoAudioReturn {
  isPlaying: boolean;
  toggleAudio: () => void;
  beatCount: number;
}

/**
 * Custom hook synthesizing an authentic underground 150 BPM techno kick and sub-bass rumble
 * using the Web Audio API. Provides rhythmic clock synchronization for UI visual pulses.
 */
export const useTechnoAudio = (): UseTechnoAudioReturn => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beatCount, setBeatCount] = useState<number>(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const beatIndexRef = useRef<number>(0);

  // 154 BPM Hard Techno Timing: 60 / 154 = 0.3896s per beat
  const secondsPerBeat = 60 / 154;

  /**
   * Synthesizes a punchy 909-style industrial kick drum with sub-bass distortion.
   */
  const playKick = useCallback((ctx: AudioContext, time: number) => {
    // Pitch Oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Frequency drop: 155Hz punch down to 42Hz sub rumble
    osc.frequency.setValueAtTime(155, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.12);

    // Amplitude envelope
    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.32);

    // Low-pass drive filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, time);
    filter.Q.setValueAtTime(3, time);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.35);

    // Industrial metallic noise hiss on off-beats
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(3200, time);
    noiseFilter.Q.setValueAtTime(6, time);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(time);
  }, []);

  /**
   * Scheduler loop to queue beats accurately ahead of time.
   */
  const scheduler = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    while (nextNoteTimeRef.current < ctx.currentTime + 0.1) {
      playKick(ctx, nextNoteTimeRef.current);
      setBeatCount((prev) => (prev + 1) % 16);
      beatIndexRef.current = (beatIndexRef.current + 1) % 16;
      nextNoteTimeRef.current += secondsPerBeat;
    }

    timerRef.current = window.setTimeout(scheduler, 25);
  }, [playKick, secondsPerBeat]);

  /**
   * Toggles the audio engine.
   */
  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        nextNoteTimeRef.current = ctx.currentTime + 0.05;
        setIsPlaying(true);
        scheduler();
      } catch (err) {
        console.error('Web Audio initiation blocked:', err);
      }
    }
  }, [isPlaying, scheduler]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { isPlaying, toggleAudio, beatCount };
};

export default useTechnoAudio;
