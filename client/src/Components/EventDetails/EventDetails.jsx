import React, { Component } from "react";
import axios from "axios";
import "./EventDetails.css";
import * as moment from "moment";
import { useParams } from "react-router";

export default class EventDetails extends Component {
  state = {
    data: [],
    loaded: false,
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/event/${id}`)
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data.resource.data, loaded: true });
        console.log(this.state);
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
  );
  render() {
    return (
      <div>
        {this.loading()}
        <div className="upComing">
          <h1 className={`titleHeadEvent color${this.state.data.colorId}`}>
            {this.state.data.summary}
          </h1>
          <div className="info">
            <p>
              Created: <i class="far fa-clock"></i>
              {moment(this.state.data.created).calendar()}
            </p>
            <p>Updated: {moment(this.state.data.updated).calendar()}</p>
            <p>Link: {this.state.data.htmlLink}</p>
          </div>
          {/* <div>
            <i class="far fa-clock"></i>
            {moment(this.state.data.start.dateTime).calendar()}
          </div> */}

          {/* {Object.keys(this.state.data).map((obj) => (
            <p>{obj}</p>
          ))} */}
        </div>
      </div>
    );
  }
}
