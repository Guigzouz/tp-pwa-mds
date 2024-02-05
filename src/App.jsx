import { useState } from "react";
import { Worker } from "@react-pdf-viewer/core";

<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"></Worker>;

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Hello world</div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

export default App;
