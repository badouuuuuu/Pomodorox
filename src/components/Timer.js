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
      showModal: true,
      hidden:"",
      Hello:"",
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  
  }


  componentDidMount(){
    setTimeout(() => this.setState({hello:
      'Choose your worktime...' 

    }), 0);
  }

  componentDidUpdate(){
    setTimeout(() => this.setState({hello:''}), 20000);
  }

  openModal() {
    this.setState({ modalIsOpen: true, hidden:"" });
  }

  afterOpenModal() {
    // Not Actually Used -> SCSS


  }

  closeModal() {
    this.setState({ modalIsOpen: false,  });
  }

  StartTimer(e) {
    this.state.disabled = true;
    this.state.hidden = "hidden-button";
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
      this.state.hidden = "";
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
         
            {this.state.minutes < 10
              ? "0" + this.state.minutes
              : this.state.minutes}
            :
            {this.state.secondes < 10
              ? "0" + this.state.secondes
              : this.state.secondes}
          </p>

          <div id="right-pannel">
          
            <button className={this.state.hidden}
              disabled={this.state.disabled}
              id="plus"
              onClick={this.addOne.bind(this)}
            >
              <i className="fas fa-plus" />
            </button>

            <button id="start" onClick={this.ToggleButton.bind(this)}>
              <i className={this.state.button} />
            </button>
            <button className={this.state.hidden}
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
            overlayClassName="Overlay"
            className="Modal"
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            shouldCloseOnOverlayClick={false}

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
        <p className="hello-message">{this.state.hello}</p>
      </div>
    );
  }
}

export default Timer;
