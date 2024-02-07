import "./App.css";
import NotesComponent from "./components/NotesComponent";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  const handleNotification = () => {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        const notification = new Notification("Hello, World!", {
          body: Math.random(),
          data: { hello: "world" },
          icon: "144.png",
          tag: "Welcome Message",
        });

        notification.onclose = () => {
          console.log("The notification was closed.");
        };
      }
    });
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
          <iframe className="pdf-display" src="default.pdf#toolbar=0"></iframe>
        </section>
        <section>
          <textarea name="main" className="main-textarea"></textarea>
          <button onClick={handleNotification}>Click</button>
          <NotesComponent />
        </section>
      </div>
    </>
  );
}

export default App;
