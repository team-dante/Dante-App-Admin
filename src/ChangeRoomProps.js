import React, {Component} from 'react';
import firebase from 'firebase';
import {Button, Input} from 'reactstrap';
import './General.css';

export default class ChangeRoomProps extends Component {

    state = {currRoom: '', futureRoom: ''};

    handleChange() {
        const {currRoom, futureRoom} = this.state;
        firebase.database().ref('/PatientVisitsByDates/').once('value', function(snapshot) {
            snapshot.forEach(function (date) {
                date.forEach(function (obj){
                    obj.forEach(function (timeSlot){
                        if (timeSlot.val().room === currRoom) {
                           timeSlot.ref.update({room: futureRoom});
                        }
                    })
                })
            });
        });
    }

    render() {
        return (
            <div className="task">
                <p>Clean Room Names for Time Tracking Objects</p>
                <Input type="text" placeholder="Enter Curr Room Name" 
                    value={this.state.currRoom} onChange={e => this.setState({currRoom: e.target.value})} />
                <Input type="text" placeholder="Enter Future Room Name" 
                    value={this.state.futureRoom} onChange={e => this.setState({futureRoom: e.target.value})} />
                <Button color="danger" onClick={(e) => this.handleChange(e)}>Change</Button>
            </div>
        );
    }
}