import React, {Component} from 'react';
import firebase from 'firebase';
import {Button, Input} from 'reactstrap';
import moment from 'moment';

export default class AddTimeSlots extends Component {

    state = {patientPhoneNum: '', room: '', date: '', startTime: '', endTime: ''};

    addTimeObj() {
        var self = this;
        let momentStrStartTime = this.state.date + ' ' + this.state.startTime;
        let tsStart = moment(momentStrStartTime, "YYYY-MM-DD hh:mm").unix();

        let momentStrEndTime = this.state.date + ' ' + this.state.endTime;
        let tsEnd = moment(momentStrEndTime, "YYYY-MM-DD hh:mm").unix();

        let diff = tsEnd - tsStart;

        firebase.database().ref(`/PatientVisitsByDates/${this.state.patientPhoneNum}/${this.state.date}`).push({
            endTime: tsEnd,
            room: self.state.room,
            startTime: tsStart,
            timeElapsed: diff
        }).then(() => {
            alert("Push data successfully");
            self.setState({patientPhoneNum: '', room: '', date: '', startTime: '', endTime: ''});
        })
    }

    render() {
        return (
            <div className="task">
                <p><strong>Add Time Tracking Slots</strong></p>
                <Input type="text" placeholder="Patient phoneNum" 
                    value={this.state.patientPhoneNum} onChange={e => this.setState({patientPhoneNum: e.target.value})} />
                <Input type="text" placeholder="Room: exam1, CTRoom, femaleWaitingRoom" 
                    value={this.state.room} onChange={e => this.setState({room: e.target.value})} />
                <Input type="text" placeholder="Date: e.g. 2019-07-18" 
                    value={this.state.date} onChange={e => this.setState({date: e.target.value})} />
                <Input type="text" placeholder="StartTime: e.g. 15:00" 
                    value={this.state.startTime} onChange={e => this.setState({startTime: e.target.value})} />
                <Input type="text" placeholder="EndTime: e.g. 15:30" 
                    value={this.state.endTime} onChange={e => this.setState({endTime: e.target.value})} />
                <Button color="danger" onClick={(e) => this.addTimeObj(e)}>Add Time Tracking Data</Button>
            </div>
        );
    }
}