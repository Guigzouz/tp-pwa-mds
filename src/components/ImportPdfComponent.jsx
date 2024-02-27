import { useState } from "react";

export default function ImportPdfComponent() {
  const [file, setFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  function handleUpload() {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const fileData = event.target.result;
      setPdfData(fileData);
      storeFileInIndexedDB(fileData);
    };
    reader.onerror = function (event) {
      console.error("Error reading file:", event.target.error);
    };
    reader.readAsDataURL(file);

    setIsFileSelected(true); // Disable file input after file is selected
  }

  function storeFileInIndexedDB(data) {
    const request = window.indexedDB.open("FilesDatabase", 2);

    request.onerror = function (event) {
      console.log("IndexedDB error:", event.target.error);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Create or modify object stores within a version change transaction
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files", { autoIncrement: true });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;

      // Start a transaction after the database is opened or upgraded
      const transaction = db.transaction(["files"], "readwrite");
      transaction.onerror = function (event) {
        console.error("IndexedDB transaction error:", event.target.error);
      };
      const objectStore = transaction.objectStore("files");
      const addRequest = objectStore.add({ data });

      addRequest.onsuccess = function () {
        console.log("File stored in IndexedDB");
      };

      addRequest.onerror = function (event) {
        console.error("Error storing file in IndexedDB:", event.target.error);
      };
    };
  }

  function getAllPdf() {
    console.log("Fetching all PDFs from IndexedDB");
  }

  return (
    <div className="ImportPdfComponent">
      <div className="import-section">
        <h1>Upload or choose file to read</h1>
        <input
          disabled={isFileSelected}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          accept="application/pdf"
        />
        <button onClick={handleUpload} disabled={isFileSelected}>
          Upload
        </button>
        {pdfData && (
          <div>
            <h2>Uploaded PDF</h2>
            <embed
              src={pdfData}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          </div>
        )}
      </div>

      <div className="choice-section">{getAllPdf()}</div>
    </div>
  );
}
