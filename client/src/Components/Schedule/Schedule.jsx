import React, { Component } from "react";
import axios from "axios";
import "./Schedule.css";
import * as moment from "moment";
export default class Schedule extends Component {
  state = {
    data: [],
    loaded: false,
  };
  componentDidMount() {
    axios
      .get("/api/event/")
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data.event, loaded: true });
      })
      .catch((error) => {
        console.log("ERROR LOADING DATA");
        console.log(error);
      });
  }
  loading = () => (
    <div className={this.state.loaded ? "ajax-loaded" : "ajax-loading"}>
      LOADING...
    </div>
    /* The class ajax-loaded -- you guessed it, hides the div */
    /* The thing to always keep in mind -- when state changes, things happen! */
  );
  render() {
    return (
      <div>
        <h1 className="titleHead">Upcoming Events</h1>
        {this.loading()}
        <div className="upComing">
          {this.state.data.map((data) => (
            <div className={`upComingChild color${data.colorId}`}>
              <h1>{data.summary}</h1>
              <div className={`details`}>
                <div className="startDate">
                  {data.start.dateTime
                    ? moment(data.start.dateTime).calendar()
                    : moment(data.start.date).format("ll")}
                </div>
                <div className="endDate">
                  {data.end.dateTime
                    ? moment(data.end.dateTime).format("Do MMM")
                    : moment(data.end.date).format("Do MMM")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
