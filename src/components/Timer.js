import React, { Component } from "react";
import Modal from "react-modal";

Modal.setAppElement("#app");

const customStyles = {
  content: {
    margin: "0 auto",
    marginTop: "10%",
    backgroundColor: "rgba(185, 91, 4, 0)",
    border: "2px solid white",
    width: "540px",
    height: "200px",
    borderRadius: "10px"
  }
};

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      timerStop: true,
      minutes: 0,
      time: 0,
      secondes: 0,
      button: "fas fa-clock",
      disabled: false,
      showModal: true
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.fontWeight = "bold";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  StartTimer(e) {
    this.state.disabled = true;
    this.state.minutes = this.state.minutes;
    this.state.secondes = this.state.secondes;

    this.closeModal();

    if (this.state.timerStop) {
      this.setState({ button: "fas fa-hourglass-end" });

      this.timer = setInterval(() => {
        this.setState({ timerStart: true, timerStop: false });

        if (this.state.secondes >= 0 && this.state.minutes >= 0) {
          this.setState(prevState => ({ secondes: prevState.secondes - 1 }));

          if (this.state.secondes <= 0 && this.state.minutes >= 1) {
            this.setState(prevState => ({
              minutes: prevState.minutes - 1,
              secondes: 59
            }));
          }
        }

        if (this.state.secondes <= 0 && this.state.minutes == 0) {
          this.setState({
            timerStart: false,
            timerStop: true,
            button: "fas fa-clock",
            disabled: false,
            minutes: 25,
            secondes: 0
          });
          clearInterval(this.timer);
          this.openModal();
        }
      }, 1000);
    }
  }

  ToggleButton(e) {
    if (this.state.button == "fas fa-clock") {
      this.StartTimer();
    } else {
      this.setState({
        timerStart: false,
        timerStop: true,
        button: "fas fa-clock"
      });
      clearInterval(this.timer);
      this.setState(prevState => ({
        minutes: (prevState.minutes = 25),
        secondes: 0
      }));
      this.state.disabled = false;
    }
  }

  addOne() {
    this.setState(prevState => ({ minutes: prevState.minutes + 1 }));

    if (this.state.secondes >= 60) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        secondes: 0
      }));
    }

    if (this.state.minutes >= 60) {
      this.setState(prevState => ({
        minutes: (prevState.minutes = 60),
        secondes: 0
      }));
    }
  }

  deleteOne() {
    this.setState(prevState => ({ minutes: prevState.minutes - 1 }));

    if (this.state.minutes <= 1) {
      this.setState(prevState => ({ minutes: (prevState.minutes = 1) }));
    }
  }

  render() {
    return (
      <div className="Timer" className="container is-fullhd">
        <div id="box-pomodo">
          <p id="timer">
            {" "}
            {this.state.minutes < 10
              ? "0" + this.state.minutes
              : this.state.minutes}{" "}
            :{" "}
            {this.state.secondes < 10
              ? "0" + this.state.secondes
              : this.state.secondes}
          </p>

          <div id="right-pannel">
            <button
              disabled={this.state.disabled}
              id="plus"
              onClick={this.addOne.bind(this)}
            >
              <i className="fas fa-plus" />
            </button>

            <button id="start" onClick={this.ToggleButton.bind(this)}>
              <i className={this.state.button} />
            </button>
            <button
              disabled={this.state.disabled}
              id="moins"
              onClick={this.deleteOne.bind(this)}
            >
              <i className="fas fa-minus" />
            </button>
          </div>
        </div>
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Pomodorox"
          >
            <h2
              className="modal-info"
              ref={subtitle => (this.subtitle = subtitle)}
            >
              Finished... What do you want ?
            </h2>
            <button className="modal-button" onClick={this.closeModal}>
              Discard
            </button>
            <button
              className="modal-button"
              onClick={this.ToggleButton.bind(this)}
            >
              Restart
            </button>

            <form />
          </Modal>
        </div>
      </div>
    );
  }
}

export default Timer;
