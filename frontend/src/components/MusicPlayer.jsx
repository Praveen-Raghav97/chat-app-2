import { useRef, useEffect } from "react";
import io from "socket.io-client";
import music from '../../public/music.mp3'
const socket = io("http://localhost:5001");

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log("Audio Ref:", audioRef.current); // Debugging log

    if (!audioRef.current) {
      console.warn("Audio element is not assigned yet.");
      return;
    }

    const handlePlay = () => {
      if (audioRef.current) audioRef.current.play();
    };

    const handlePause = () => {
      if (audioRef.current) audioRef.current.pause();
    };

    const handleSeek = (time) => {
      if (audioRef.current) audioRef.current.currentTime = time;
    };

    socket.on("play-music", handlePlay);
    socket.on("pause-music", handlePause);
    socket.on("seek-music", handleSeek);

    return () => {
      socket.off("play-music", handlePlay);
      socket.off("pause-music", handlePause);
      socket.off("seek-music", handleSeek);
    };
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Play error:", err));
      socket.emit("play-music");
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      socket.emit("pause-music");
    }
  };

  return (
    <div className="flex w-[220px] items-center">
      <audio  controls>
        <source src={music} type="audio/mp3" />
      </audio>
     
    </div>
  );
}
