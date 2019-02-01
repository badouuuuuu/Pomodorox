import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

import "./scss/app.scss";

class Pomodorox extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container" />
        <Timer />
        <Footer />
      </div>
    );
  }
}

let App = document.getElementById("app");

ReactDOM.render(<Pomodorox />, App);
