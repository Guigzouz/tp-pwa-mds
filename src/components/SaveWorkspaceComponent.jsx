import { useState } from "react";

export default function SaveWorkspaceComponent({ saveContent }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");

  function handleSaveCta() {
    console.log("clicked");
    setIsModalVisible(true);
  }

  function handleSaveWorkspace() {
    if (workspaceName.trim() === "") {
      alert("Please enter a workspace name");
      return;
    }

    // Save content to local storage with workspace name
    saveContent(workspaceName);

    setIsModalVisible(false);
    setWorkspaceName("");
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSaveWorkspace();
    }
  }

  return (
    <>
      <button
        className="bg-yellow-200 p-5 absolute bottom-10 left-10"
        onClick={handleSaveCta}
      >
        Save
      </button>

      {isModalVisible && (
        <div className="modal-save-workspace absolute w-screen h-screen flex justify-center items-center">
          <div className="form">
            <h2 className="text-stone-950">Save your workspace :</h2>
            <input
              type="text"
              name="workspace-name"
              placeholder="Workspace name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              onKeyPress={handleKeyPress}
              required
            />

            <button type="button" onClick={handleSaveWorkspace}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
