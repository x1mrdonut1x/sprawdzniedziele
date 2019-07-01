import "./App.css";

import React, { Component } from "react";

import moment from "moment";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTodayTheLastSunday: this.isSunday(),
      nextSunday: this.nextSunday(),
      isSunday: moment().day() === 0
    };
  }
  
  componentWillMount() {
    document.title = `Handlowa? ${this.renderText()}`
  }
  
  nextSunday(){
    return this.isSunday() ? moment().add(1, "months").endOf("month").day(0) : moment().endOf("month").day(0)
  }

  isSunday() {
    let lastSunday = moment()
      .endOf("month")
      .day(0);
      
    let today = moment();
    return today.isSame(lastSunday);
  }

  renderText(){
    let { isTodayTheLastSunday } = this.state;
    return isTodayTheLastSunday ? "TAK" : "NIE";
  }

  render() {
    let { nextSunday, isSunday } = this.state;
    return (
      <div className="App">
        <div className="Header">Czy dzisiaj jest niedziela handlowa?</div>
        <div className="Text">{this.renderText()}</div>
        {isSunday ? null : <div className="Subheader">ale dzisiaj zrobisz zakupy!</div>}
        <div className="NextSundayWrapper">
          Następna niedziela handlowa:{" "}
          <div className="NextSunday">{nextSunday.format("DD-MM-YYYY")} </div>
        </div>
      </div>
    );
  }
}
