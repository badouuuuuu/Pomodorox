import React, { Component } from 'react';


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

     }
   }
 
   StartTimer(e) {
 
     if (this.state.timerStop) {
       this.setState((prevState) => ({ button: prevState.button = "STOP" }))

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
      
            this.setState({timerStart:false, timerStop:true, button:"START"});
             clearInterval(this.timer);
           
       
         }
 
       }, 1000)
 
   }
 }
 
 StopTimer(e) {
 
   this.setState({timerStart:false, timerStop:true});
   clearInterval(this.timer);
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
               <button id="plus" onClick={ this.addOne.bind(this) } >+</button>
               
               <button id="start" onClick={ this.StartTimer.bind(this) } >{ this.state.button }</button>
               <button id="moins" onClick={ this.deleteOne.bind(this)}>-</button>
            </div>
           </div>
      
       </div>
     );
   }
 }

export default Timer;