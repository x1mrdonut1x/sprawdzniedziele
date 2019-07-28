import "./App.css";

import React, { Component } from "react";

import moment from "moment";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTodayTheLastSunday: this.isShopSunday(),
      nextSunday: this.nextSunday(),
      isSunday: moment().day() === 0
    };
  }
  
  componentWillMount() {
    const { isSunday, isTodayTheLastSunday } = this.state;
    moment.locale('pl', {
      weekdays : 'Niedziela_Poniedziałek_Wtorek_Środa_Czwartek_Piątek_Sobota'.split('_'),
    });
    document.title = isSunday ? `Handlowa? ${isTodayTheLastSunday ? "TAK" : "NIE"}` : `${moment().format("dddd")}!`
  }
  
  nextSunday(){
    return this.isShopSunday() ? moment().add(1, "months").endOf("month").day(0) : moment().endOf("month").day(0)
  }

  isShopSunday() {
    let lastSunday = moment()
      .endOf("month")
      .day(0);
      
    let today = moment();
    return today.isSame(lastSunday, 'day');
  }

  renderText(){
    const { isSunday, isTodayTheLastSunday } = this.state;
    if (isSunday) {
      return isTodayTheLastSunday ? <div className="Text Green">TAK!</div> : <div className="Text Red">NIE</div>
    }else{
      return (
        <div>
            <div className="NotASunday Green">Jest {moment().format("dddd")}!</div>
            <div className="Subheader Green">Leć na zakupy!</div>
        </div>
      )
    }
  }

  render() {
    const { nextSunday } = this.state;
    return (
      <div className="App">
        <div className="Header">Czy dzisiaj jest niedziela handlowa?</div>
        {this.renderText()}
        <div className="NextSundayWrapper">
          Następna niedziela handlowa:{" "}
          <div className="NextSunday">{nextSunday.format("DD-MM-YYYY")} </div>
        </div>
      </div>
    );
  }
}
