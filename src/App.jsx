import { useState } from "react";
import "./App.css";
import NotesComponent from "./components/NotesComponent";
import HeaderComponent from "./components/HeaderComponent";
import ImportPdfComponent from "./components/ImportPdfComponent";
import ToolSelectorComponent from "./components/ToolSelectorComponent";
import SaveWorkspaceComponent from "./components/SaveWorkspaceComponent";
import TextareaComponent from "./components/TextareaComponent";

function App() {
  const [textareaContent, setTextareaContent] = useState("");

  const handleContentChange = (newContent) => {
    setTextareaContent(newContent);
  };

  const saveContent = (workspaceName) => {
    // Save the content to local storage with the workspace name as the key
    localStorage.setItem(workspaceName, textareaContent);
    console.log(
      `Workspace "${workspaceName}" saved with content:`,
      textareaContent
    );
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      new Notification("Come back!", {
        body: "Come back PLEASE!",
        tag: "Pls!",
      });
    }
  });

  return (
    <>
      <HeaderComponent />
      <div className="app-wrapper">
        <section className="main-section">
          <ImportPdfComponent />
        </section>
        <section className="main-section flex flex-col">
          <TextareaComponent onContentChange={handleContentChange} />
          <NotesComponent />
          <ToolSelectorComponent />
        </section>
        <SaveWorkspaceComponent saveContent={saveContent} />
      </div>
    </>
  );
}

export default App;
