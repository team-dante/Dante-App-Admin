import React, {Component} from 'react';
import firebase from 'firebase';
import {Button, Input} from 'reactstrap';

export default class DeleteAcct extends Component {

    state = {staffPhoneNum: '', patientPhoneNum: ''};

    deleteStaffAcct() {
        var self = this;
        firebase.database().ref(`/staffs/`)
            .orderByChild("phoneNum").equalTo(this.state.staffPhoneNum)
            .once('value', function(snapshot) {
                snapshot.forEach(function(data) {
                    data.ref.remove();
                    self.setState({staffPhoneNum: ''});
                });
        });
    }

    deletePatientAcct() {
        var self = this;
        firebase.database().ref(`/Patients/`)
            .orderByChild("patientPhoneNumber").equalTo(this.state.patientPhoneNum)
            .once('value', function(snapshot) {
                snapshot.forEach(function(data) {
                    data.ref.remove();
                    self.setState({patientPhoneNum: ''});
                });
        });
    }

    render() {
        return (
            <div className="task">
                <p>Delete Account for Staff or Patient</p>
                <p>Note: Need to manually remove users from Authentication section</p>
                <Input type="text" placeholder="Enter staff phoneNum" 
                    value={this.state.staffPhoneNum} onChange={e => this.setState({staffPhoneNum: e.target.value})} />
                <Button color="danger" onClick={(e) => this.deleteStaffAcct(e)}>Delete Staff</Button>
                <Input type="text" placeholder="Enter patient phoneNum" 
                    value={this.state.patientPhoneNum} onChange={e => this.setState({patientPhoneNum: e.target.value})} />
                <Button color="danger" onClick={(e) => this.deletePatientAcct(e)}>Delete Patient</Button>
            </div>
        );
    }
}