import { useState } from "react";
import MetronomeComponent from "./MetronomeComponent";

export default function ToolSelectorComponent() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
    console.log("hello", index);
  };

  return (
    <div className="tool-selector-component">
      <div className="bloc-tabs flex justify-between cursor-pointer">
        <div
          className={
            toggleState === 1
              ? "tab active-tab w-full bg-yellow-300 hover:bg-yellow-400"
              : "tab w-full bg-gray-200 hover:bg-yellow-400"
          }
          onClick={() => toggleTab(1)}
        >
          <h2>Metronome</h2>
        </div>
        <div
          className={
            toggleState === 2
              ? "tab active-tab w-full bg-yellow-300 hover:bg-yellow-400"
              : "tab w-full bg-gray-200 hover:bg-yellow-400"
          }
          onClick={() => toggleTab(2)}
        >
          Tuner
        </div>
        <div
          className={
            toggleState === 3
              ? "tab active-tab w-full bg-yellow-300 hover:bg-yellow-400"
              : "tab w-full bg-gray-200 hover:bg-yellow-400"
          }
          onClick={() => toggleTab(3)}
        >
          Play along
        </div>
      </div>

      <div className="content-tabs flex">
        <div
          className={
            toggleState === 1
              ? "content active-content w-full"
              : "content hidden"
          }
        >
          <MetronomeComponent />
        </div>

        <div
          className={
            toggleState === 2
              ? "content active-content w-full"
              : "content hidden"
          }
        >
          Tuner component
        </div>
        <div
          className={
            toggleState === 3
              ? "content active-content w-full"
              : "content hidden"
          }
        >
          Play along component
        </div>
      </div>
    </div>
  );
}
