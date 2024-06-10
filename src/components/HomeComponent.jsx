import { useState } from "react";
import HeaderComponent from "./HeaderComponent";
import ImportPdfComponent from "./ImportPdfComponent";
import NotesComponent from "./NotesComponent";
import SaveWorkspaceComponent from "./SaveWorkspaceComponent";
import TextareaComponent from "./TextareaComponent";
import ToolSelectorComponent from "./ToolSelectorComponent";

export default function HomeComponent() {
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
