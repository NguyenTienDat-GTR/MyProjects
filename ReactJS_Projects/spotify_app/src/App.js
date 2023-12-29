import "./App.css";
import Navbar from "./components/Navbar";
import DetailSong from "./components/DetailSong";
import ListSongs from "./components/ListSongs";
import Playing from "./components/Playing";
import { Provider } from "react-redux";
import Store from "./redux/Store";

function App() {

  return (
    <div className="App">
      <Provider store={Store}>
        <Navbar />
        <div className="grid grid-cols-3 bg-slate-700 h-screen-navbar-player overflow-hidden">
          <DetailSong />
          <ListSongs />
        </div>
        <div>
          <Playing />
        </div>
      </Provider>
    </div>
  );
}

export default App;
