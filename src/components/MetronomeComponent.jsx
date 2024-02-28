import { useState, useRef } from "react";
import "./MetronomeComponent.css"; // Import CSS file for styling

export default function MetronomeComponent() {
  const [bpm, setBpm] = useState(60); // Default BPM is 60
  const intervalRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playClick = () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.start();

    // Stop the oscillator after a short duration
    setTimeout(() => oscillator.stop(), 100);
  };

  const startMetronome = () => {
    // interval in ms
    const interval = (60 / bpm) * 1000;
    intervalRef.current = setInterval(() => {
      playClick();
      setIsPlaying((prevIsPlaying) => !prevIsPlaying); // Toggle the state to trigger animation
    }, interval);
    setIsPlaying(true);
  };

  const stopMetronome = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const handleBpmChange = (e) => {
    const newBpm = parseInt(e.target.value);
    setBpm(newBpm);
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  };

  return (
    <>
      <div className="metronome-container">
        <div>Metronome</div>
        <input
          type="range"
          min="40"
          max="218"
          value={bpm}
          onChange={handleBpmChange}
        />
        <h1>{bpm} BPM</h1>
        <button onClick={isPlaying ? stopMetronome : startMetronome}>
          {isPlaying ? "Stop" : "Start"}
        </button>
        <div className={isPlaying ? "dot playing" : "dot"}></div>
      </div>
    </>
  );
}
