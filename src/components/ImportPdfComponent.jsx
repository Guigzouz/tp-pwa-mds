import { useState } from "react";

export default function ImportPdfComponent() {
  const [file, setFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

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

    setIsFileUploaded(true);
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
        {!isFileUploaded && (
          <>
            <h1>Upload or choose file to read</h1>
            <input
              disabled={isFileSelected}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setIsFileSelected(true);
              }}
              type="file"
              accept="application/pdf"
            />
            <button onClick={handleUpload}>Upload</button>
          </>
        )}

        {pdfData && (
          <div>
            <embed
              src={pdfData}
              type="application/pdf"
              width="100%"
              height="1000px"
            />
          </div>
        )}
      </div>

      <div className="choice-section">{getAllPdf()}</div>
    </div>
  );
}
