import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import MoonDetails from "./components/MoonDetails";
import MoonInfo from "./components/MoonInfo";
import SearchBar from "./components/SearchBar";
import MoonPhases from "./components/MoonPhases";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moon: [],
      phase: [],
      place: [],
      date: [],
      PhaseOne: [],
      PhaseTwo: [],
      PhaseThree: [],
      PhaseFour: []
    };
    this.zipcodeSearch("92532");
    this.moonPhaseSearch("92532");
  }

  zipcodeSearch(zipcode) {
    axios
      .get(
        `https://api.aerisapi.com/sunmoon/${zipcode}?&client_id=QaRtBZ7n0JfmLAQVluuZU&client_secret=BNKhYUkGgYS8oKx53vUH9xmba3LupYXyXvRpIoGm`
      )
      .then(response => {
        this.setState({
          moon: response.data.response[0].moon,
          phase: response.data.response[0].moon.phase,
          place: response.data.response[0].place,
          date: response.data.response[0]
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  moonPhaseSearch(zipcode) {
    axios
      .get(
        `https://api.aerisapi.com/sunmoon/moonphases?&limit=4/90001?&client_id=QaRtBZ7n0JfmLAQVluuZU&client_secret=BNKhYUkGgYS8oKx53vUH9xmba3LupYXyXvRpIoGm`
      )
      .then(response => {
        this.setState({
          PhaseOne: response.data.response[0],
          PhaseTwo: response.data.response[1],
          PhaseThree: response.data.response[2],
          PhaseFour: response.data.response[3]
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const zipcodeSearch = _.debounce(zipcode => {
      this.zipcodeSearch(zipcode);
    }, 300);

    return (
      <div>
        <div className="res">
          <img id="moonLogo" src="./style/moonLogo.png" alt="" />
          <span className="title">The Mysterious Moon</span>
        </div>
        <SearchBar
          onSearchTermChange={zipcodeSearch}
          place={this.state.place}
          date={this.state.date}
        />
        <MoonDetails
          moon={this.state.moon}
          phase={this.state.phase}
          place={this.state.place}
          date={this.state.date}
        />
        <div>
          <MoonInfo phase={this.state.phase} />
        </div>
        <div>
          <MoonPhases
            PhaseOne={this.state.PhaseOne}
            PhaseTwo={this.state.PhaseTwo}
            PhaseThree={this.state.PhaseThree}
            PhaseFour={this.state.PhaseFour}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
