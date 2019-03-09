import React, { Component } from "react";
import "./App.css";
import SongLoader from "./Components/GameLoader";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SongLoader />
      </div>
    );
  }
}

export default App;
