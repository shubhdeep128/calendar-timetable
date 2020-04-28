import React, { Component } from "react";
import axios from "axios";
import "./Schedule.css";

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
        <h1>Upcoming Events</h1>
        {this.loading()}
        <div className="upComing">
          {this.state.data.map((data) => (
            <div className="upComingChild">
              <h1>{data.summary}</h1>
              <div className="details">
                <div className="startDate">
                  From:
                  {data.start.dateTime
                    ? data.start.dateTime.substring(0, 10).slice(-4)
                    : data.start.date}
                </div>
                <div className="endDate">
                  To:
                  {data.end.dateTime
                    ? data.end.dateTime.substring(0, 10).slice(-4)
                    : data.start.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
