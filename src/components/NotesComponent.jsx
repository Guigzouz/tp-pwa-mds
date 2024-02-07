function NotesComponent() {
  const notes = [
    { note: "C", frequency: 261.63 },
    { note: "D", frequency: 293.66 },
    { note: "E", frequency: 329.63 },
    { note: "F", frequency: 349.23 },
    { note: "G", frequency: 392.0 },
    { note: "A", frequency: 440.0 },
    { note: "B", frequency: 493.88 },
    // { note: "C", frequency: 523.25 },
  ];

  const audioContext = new AudioContext();
  const primaryGainControl = audioContext.createGain();
  primaryGainControl.gain.setValueAtTime(0.05, 0);
  primaryGainControl.connect(audioContext.destination);

  const playNote = (frequency) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(primaryGainControl);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  };

  // const handleKeyPress = (event) => {
  //   const keyPressed = event.key.toUpperCase();
  //   const note = notes.find((n) => n.note === keyPressed);
  //   if (note) {
  //     playNote(note.frequency);
  //     // Add visual feedback by changing the style of the button
  //     const button = document.getElementById(keyPressed);
  //     if (button) {
  //       button.classList.add("key-pressed", "text-white");
  //       setTimeout(() => {
  //         button.classList.remove("key-pressed", "text-white");
  //       }, 200);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("keypress", handleKeyPress);
  //   return () => {
  //     document.removeEventListener("keypress", handleKeyPress);
  //   };
  // }, []);

  return (
    <>
      <div className="btn-container">
        {notes.map((note, index) => (
          <button
            id={note.note}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex"
            key={index}
            onClick={() => playNote(note.frequency)}
          >
            {note.note}
          </button>
        ))}
      </div>
    </>
  );
}

export default NotesComponent;
