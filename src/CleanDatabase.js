import React, {Component} from 'react';
import firebase from 'firebase';
import {Button, Input} from 'reactstrap';
import './General.css';

export default class CleanDatabase extends Component {

    state = {secs: ''};

    handleCleanUp() {
        let secs = this.state.secs;
        firebase.database().ref('/PatientVisitsByDates/').once('value', function(snapshot) {
            snapshot.forEach(function (date) {
                date.forEach(function (obj){
                    obj.forEach(function (timeSlot){
                        if (timeSlot.val().timeElapsed <= parseInt(secs)) {
                           timeSlot.ref.remove();
                        }
                    })
                })
            });
        });
    }

    render() {
        return (
            <div className="task">
                <p>Clean all time tracking objects that are under _ secs</p>
                <Input type="text" placeholder="Enter the second boundary" 
                    value={this.state.secs} onChange={e => this.setState({secs: e.target.value})} />
                <Button color="danger" onClick={(e) => this.handleCleanUp(e)}>Clean Up</Button>
            </div>
        );
    }
}