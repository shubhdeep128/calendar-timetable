import React, { Component } from 'react'
import axios from 'axios'
export default class Update extends Component {
    render() {const onClick = ()=>{
        const { id } = this.props.match.params;
        console.log("Updating Event!!  "+id)

        axios.patch(`/api/event/${id}`)
        .then((response)=>{
            console.log(response);
        })
    }
    return (
        <div>
            <button className = "button" onClick = {onClick}>Update</button>
        </div>
    )
    }
}
