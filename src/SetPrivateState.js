import React, {Component} from 'react';
import firebase from 'firebase';
import {Button, Input} from 'reactstrap';
import './General.css';

export default class SetPrivateState extends Component {

    state = {patient: ''}

    handlePrivate() {
        firebase.database().ref(`/PatientLocation/${this.state.patient}`).update({
            room: "Private"
        }).then(() => {
            alert("Successfully set patient location to Private");
        });
    }

    render() {
        return (
            <div className="task">
                <p>Set Patient Location to Private</p>
                <Input type="text" placeholder="Enter patient phone number" 
                    value={this.state.patient} onChange={e => this.setState({patient: e.target.value})} />
                <Button onClick={e => this.handlePrivate(e)}>Set Private</Button>
            </div>
        );
    }
}
