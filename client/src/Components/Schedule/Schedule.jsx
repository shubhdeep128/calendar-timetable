import React, { Component } from "react";
import axios from "axios";
import "./Schedule.css";

export default class Schedule extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    axios
      .get("/api/event/")
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data.event });
      })
      .catch((error) => {
        console.log("ERROR LOADING DATA");
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <h1>Upcoming Events</h1>
        <div className="upComing">
          {this.state.data.map((data) => (
            <div className="upComingChild">
              <h1>{data.summary}</h1>
              <div className="details">
                <div className="startDate">
                  From: {data.start.dateTime.substring(0, 10)}
                </div>
                <div className="endDate">
                  To: {data.end.dateTime.substring(0, 10)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
