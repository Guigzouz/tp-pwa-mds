import "./App.css";
import NotesComponent from "./components/NotesComponent";
import HeaderComponent from "./components/HeaderComponent";
import ImportPdfComponent from "./components/ImportPdfComponent";

function App() {
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
          {/* <iframe className="pdf-display" src="default.pdf#toolbar=0"></iframe> */}
          <ImportPdfComponent />
        </section>
        <section className="main-section">
          <textarea name="main" className="main-textarea"></textarea>
          <NotesComponent />
        </section>
      </div>
    </>
  );
}

export default App;
