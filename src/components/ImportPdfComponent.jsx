import { useState, useEffect } from "react";

export default function ImportPdfComponent() {
  const [file, setFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [pdfList, setPdfList] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    getAllPdf();
  }, []);

  useEffect(() => {
    if (file) {
      console.log("file log after setting", file);
      handleUpload(); // Automatically handle the file upload after setting the file
    }
  }, [file]);

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

    setIsFileSelected(true);
  }

  function storeFileInIndexedDB(data) {
    const request = window.indexedDB.open("FilesDatabase", 3); // Incremented version number

    request.onerror = function (event) {
      console.log("IndexedDB error:", event.target.error);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Create or modify object stores within a version change transaction
      db.createObjectStore("files", { autoIncrement: true });
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
        getAllPdf(); // Update the list after storing a new file
      };

      addRequest.onerror = function (event) {
        console.error("Error storing file in IndexedDB:", event.target.error);
      };
    };
  }

  function getAllPdf() {
    console.log("Fetching all PDFs from IndexedDB");
    const request = window.indexedDB.open("FilesDatabase", 3); // Incremented version number

    request.onerror = function (event) {
      console.log("IndexedDB error:", event.target.error);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["files"], "readonly");
      const objectStore = transaction.objectStore("files");
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function () {
        console.log("Successfully retrieved PDFs from IndexedDB");
        setPdfList(getAllRequest.result);
      };

      getAllRequest.onerror = function (event) {
        console.error(
          "Error retrieving PDFs from IndexedDB:",
          event.target.error
        );
      };
    };
  }

  function handlePdfSelection(pdfData) {
    setPdfData(pdfData);
    setSelectedPdf(pdfData);
    setIsFileSelected(true);
  }

  return (
    <div className="ImportPdfComponent">
      <div className="import-section">
        {!isFileSelected && (
          <>
            <h1>Upload or choose file to read</h1>
            <input
              disabled={isFileSelected}
              onChange={(e) => {
                console.log("entering the change call", e.target.files[0]);
                setFile(e.target.files[0]);
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

      <div className="choice-section">
        {!isFileSelected && (
          <>
            <h2>All PDFs</h2>
            <ul>
              {pdfList.map((pdf, index) => (
                <li key={index}>
                  <button onClick={() => handlePdfSelection(pdf.data)}>
                    PDF {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
