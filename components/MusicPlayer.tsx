
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer: React.FC<{ isStarted: boolean }> = ({ isStarted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isStarted && audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction");
      });
      setIsPlaying(true);
    }
  }, [isStarted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Romantic melody placeholder
        loop
      />
      <button
        onClick={togglePlay}
        className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center justify-center"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
};

export default MusicPlayer;
