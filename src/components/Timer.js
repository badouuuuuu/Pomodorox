import React, { Component } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#app')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'red',
    border                : '2px solid rgb(59, 98, 5)',
    width                 : '640px',
    height                : '200px',
    borderRadius          : '10px'

  },
};

class Timer extends Component {

   constructor(props) {
     super(props);
     this.state = { 
       timerStart: false,
       timerStop: true,
       hours: 0,
       minutes:25,
       time:0,
       secondes:0,
       zero_secondes:0,
       zero_minutes:0,
       button:"START",
       disabled: false,
       showModal: true,

     }
     this.openModal = this.openModal.bind(this);
     this.afterOpenModal = this.afterOpenModal.bind(this);
     this.closeModal = this.closeModal.bind(this);
   }

   openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
    this.subtitle.style.fontWeight = 'bold';
  
  }

  closeModal() {
    this.setState({modalIsOpen: false, disabled:false});
    this.state.minutes = 25;
    this.state.secondes = 0;    
   
  }
 


   StartTimer(e) {
    this.state.disabled = true;
    this.state.minutes = this.state.minutes;
    this.state.secondes = this.state.secondes;
    this.closeModal();

     if (this.state.timerStop) {
       this.setState((prevState) => ({ button: prevState.button = "RESET" }))

        this.timer = setInterval(() => {
  
         this.setState({timerStart: true, timerStop: false});

         if(this.state.secondes <= 10) {
            this.state.zero_secondes = 0;
          } else {
            this.state.zero_secondes = ''
          }
 
 
         if (this.state.secondes >= 0 && this.state.minutes >= 0) {
            this.setState((prevState) => ({ secondes: prevState.secondes  - 1 }));

            if(this.state.secondes <=0 && this.state.minutes >= 1) {
                this.setState((prevState) => ({ minutes: prevState.minutes  - 1, secondes: 59}));
            }
         }

         if (this.state.secondes <= 0 && this.state.minutes <= 0) {
      
            this.setState({timerStart:false, timerStop:true, button:"START", disabled: false});
             clearInterval(this.timer);
             this.openModal()
           
         }
 
       }, 1000)
 
   }
 }
 
 ToggleButton(e) {

  if(this.state.button == "START") {

    this.StartTimer();
    

  } else {
    this.setState({timerStart:false, timerStop:true, button:"START"});
    clearInterval(this.timer);
    this.setState((prevState) => ({ minutes: prevState.minutes = 25, secondes:0 + "0"}));
    this.state.disabled = false;
  }
 

 }
 
 addOne(){

    this.setState((prevState) => ({ minutes: prevState.minutes + 1 }));

 
   if (this.state.secondes >= 60) {
    this.setState((prevState) => ({ minutes: prevState.minutes + 1, secondes: 0 }));
 
   }

   if (this.state.minutes >= 60) {
    this.setState((prevState) => ({ minutes: prevState.minutes = 60, secondes: 0 }));
 
   }
 
 
 }
 
 deleteOne() {

    this.setState((prevState) => ({ minutes: prevState.minutes - 1 }));

    if (this.state.minutes <= 0) {
        this.setState((prevState) => ({ minutes: prevState.minutes = 0 }));
     
       }
     
  
 }
 
   render() {
     return (
       <div className="Timer">
  
           <div id="box-pomodo">
            <p id="timer"> { this.state.minutes } :  { this.state.zero_secondes }  { this.state.secondes } </p> 
           
            <div id="right-pannel">
               <button disabled={this.state.disabled} id="plus" onClick={ this.addOne.bind(this) } >+</button>
               
               <button id="start" onClick={ this.ToggleButton.bind(this) } >{ this.state.button }</button>
               <button disabled={this.state.disabled} id="moins" onClick={ this.deleteOne.bind(this)}>-</button>
            </div>
           </div>
           <div>
           <button onClick={this.openModal}>Open Modal</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Pomodorox"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Time over</h2>
          <button className="modal-button" onClick={this.closeModal}>Discard</button> 
          <button className="modal-button" onClick={this.ToggleButton.bind(this)}>Restart</button>
   
          <form>
        
          </form>
        </Modal>
      </div>
       </div>
     );
   }
 }

 export default Timer