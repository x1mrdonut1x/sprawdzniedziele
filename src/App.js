import "./App.css";

import React, { Component } from "react";

import moment from "moment";

export const OPEN_DAYS = [
  "2021/01/31",
  "2021/03/28",
  "2021/04/25",
  "2021/06/27",
  "2021/08/29",
  "2021/12/12",
  "2021/12/19",
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTodayOpen: this.isShopSunday(moment()),
      nextSunday: this.nextSunday(),
      isSunday: moment().day() === 0,
    };
  }

  componentWillMount() {
    const { isSunday, isTodayOpen } = this.state;
    moment.locale("pl", {
      weekdays: "Niedziela_Poniedziałek_Wtorek_Środa_Czwartek_Piątek_Sobota".split("_"),
    });
    document.title = isSunday
      ? `Handlowa? ${isTodayOpen ? "TAK" : "NIE"}`
      : `${moment().format("dddd")}!`;
  }

  nextSunday() {
    for (let i = 0; i < OPEN_DAYS.length; ++i) {
      if (moment().isBefore(OPEN_DAYS[i])) {
        return moment(OPEN_DAYS[i]);
      }
    }
  }

  isShopSunday(date) {
    for (let i = 0; i < OPEN_DAYS.length; ++i) {
      if (date.isSame(OPEN_DAYS[i], "date")) {
        return true;
      }
    }
    return false;
  }

  renderText() {
    const { isSunday, isTodayOpen } = this.state;
    if (isSunday) {
      return isTodayOpen ? (
        <div className="Text Green">TAK!</div>
      ) : (
        <div className="Text Red">NIE</div>
      );
    } else {
      return (
        <div>
          <div className="NotASunday Green">Jest {moment().format("dddd")}!</div>
          <div className="Subheader Green">Leć na zakupy!</div>
        </div>
      );
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
          <div className="NextSunday">
            {nextSunday ? nextSunday.format("DD-MM-YYYY") : "Coś poszło nie tak!!"}{" "}
          </div>
        </div>
      </div>
    );
  }
}
