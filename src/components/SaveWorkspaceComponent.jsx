import { useState } from "react";

export default function SaveWorkspaceComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const workspace = {};

  function handleSaveCta() {
    console.log("clickeed");
    setIsModalVisible(true);
  }

  function handleSaveWorkspace() {
    setIsModalVisible(false);

    // window.location.reload();
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
              required
            />

            <button type="submit" onClick={handleSaveWorkspace}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
