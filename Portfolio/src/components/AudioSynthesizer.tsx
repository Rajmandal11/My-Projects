import React, { useState, useEffect, useRef } from 'react';
import { Music, Pause, Play } from 'lucide-react';

export const AudioSynthesizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMusic = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    } else {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Relaxing pentatonic synth frequencies (F# minor pentatonic: F#3, A3, B3, C#4, E4)
      const freqs = [185.00, 220.00, 246.94, 277.18, 329.63, 369.99, 440.00];

      const playChord = () => {
        if (!ctx || ctx.state === 'closed') return;
        const note = freqs[Math.floor(Math.random() * freqs.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.0);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 4.2);
      };

      playChord();
      intervalRef.current = setInterval(playChord, 2200);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <button
      id="ambient-music-btn"
      onClick={toggleMusic}
      className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-full border transition-all duration-300 shadow-2xl flex items-center justify-center ${
        isPlaying
          ? 'bg-emerald-500 text-black border-emerald-400 animate-spin-slow ring-4 ring-emerald-500/30'
          : 'bg-[#ffffff]/90 border border-emerald-500/30 text-emerald-600 hover:text-slate-900 hover:border-emerald-400'
      }`}
      title={isPlaying ? 'Pause Ambient Sound Synthesizer' : 'Play Relaxing Ambient Synth'}
    >
      {isPlaying ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5" />}
    </button>
  );
};
