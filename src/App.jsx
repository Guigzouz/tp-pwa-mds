import "./App.css";
import NotesComponent from "./components/NotesComponent";
import HeaderComponent from "./components/HeaderComponent";
import ImportPdfComponent from "./components/ImportPdfComponent";
import ToolSelectorComponent from "./components/ToolSelectorComponent";

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
          <ImportPdfComponent />
        </section>
        <section
          className="main-section flex flex-col
        	"
        >
          <textarea name="main" className="main-textarea"></textarea>
          <NotesComponent />
          <ToolSelectorComponent />
        </section>
      </div>
    </>
  );
}

export default App;
