import React, { Component } from "react";
import "./Add.css";
import axios from 'axios'
import { Input, TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// import { DesktopDatePicker } from "@material-ui/pickers";
// import { EventNoteIcon } from "@material-ui/icons";

export default class Add extends Component {

  onClick = ()=>{
    const eventStartTime = new Date();
    eventStartTime.setDate(eventStartTime.getDay())
    eventStartTime.setMinutes(eventStartTime.getMinutes() + 30)
    const eventEndTime = new Date()
    eventEndTime.setDate(eventEndTime.getDay())
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 90)
    const event = {
        summary: 'Test Event',
        location: 'Home',
        description: 'This is an event to test universical api',
        colorId: 1,
        start: {
          dateTime: eventStartTime,
          timeZone: 'Asia/Kolkata'
        },
        end: {
          dateTime: eventEndTime,
          timeZone: 'Asia/Kolkata'
        },
        colorId: 1,
      }

      axios.post('/api/event/add',event)
      .then(response =>{
        console.log(response);
      }).catch((err)=>{
        console.log(err)
      })
      
  }

  render() {
    this.onClick = this.onClick.bind(this)
    return (
      <div>
        <h1> Add New Event</h1>
        <div className="form">
          <div className="foodCard">
            <form action="/api/event/add">
              <Input
                id="summary"
                aria-describedby="event-name"
                placeholder="Event Name"
              />
              <br />
              <br />
              <TextField
                id="start"
                label="Start Date"
                type="date"
                defaultValue="2017-05-24"
                // className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="end"
                label="End Date"
                type="date"
                defaultValue="2017-05-24"
                // className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <DesktopDatePicker
                autoOk
                variant="outlined"
                label="Advanced keyboard"
                placeholder="2018/01/01"
                inputFormat="yyyy/MM/dd"
                mask="____/__/__"
                keyboardIcon={<EventNoteIcon />}
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
              /> */}
              <br />
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Color
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  //   value={age}
                  //   onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
          <button className = "button" onClick = {this.onClick}>Submit</button>
        </div>
      </div>
    );
  }
}

// location: 'Home',
// description: 'This is an event to test universical api',
// colorId: 1,
// start: {
//   dateTime: eventStartTime,
//   timeZone: 'Asia/Kolkata'
// },
// end: {
//   dateTime: eventEndTime,
//   timeZone: 'Asia/Kolkata'
// },
// colorId: 1,
