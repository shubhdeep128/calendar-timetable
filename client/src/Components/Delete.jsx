import React, { Component } from 'react'
import axios from 'axios'
export default class Delete extends Component {
    
    render() {
        const onClick = ()=>{
            const { id } = this.props.match.params;
            console.log("Deleting Event!!  "+id)

            axios.delete(`/api/event/${id}`)
            .then((response)=>{
                console.log(response);
            })
        }
        return (
            <div>
                <button className = "button" onClick = {onClick}>Delete</button>
            </div>
        )
    }
}
