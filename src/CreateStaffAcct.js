import React, {Component} from 'react';
import firebase from 'firebase';
import {Button, Input} from 'reactstrap';

export default class CreateStaffAcct extends Component {

    state = {
        firstName: '', 
        lastName: '',
        phoneNum: '',
        pin: ''
    }

    createAcct() {
        const { firstName, lastName, phoneNum, pin } = this.state;
        let self = this;
        firebase.database().ref(`/staffs/`).push({
            firstName: firstName, 
            lastName: lastName,
            phoneNum: phoneNum,
            pin: pin
        }).then(()=> {
            let email = this.state.phoneNum + '@email.com';
            let password = this.state.pin + 'ABCDEFG';
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                alert("Account was successfully created");
                self.setState({firstName: '', lastName: '', phoneNum: '', pin: ''})
            });
        });
    }

    render() {
        return (
            <div className="task">
                <p>Create Accounts for Staff</p>
                <Input type="text" placeholder="Enter staff first name" 
                    value={this.state.firstName} onChange={e => this.setState({firstName: e.target.value})} />
                <Input type="text" placeholder="Enter staff last name" 
                    value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})} />
                <Input type="text" placeholder="Enter staff phone number" 
                    value={this.state.phoneNum} onChange={e => this.setState({phoneNum: e.target.value})} />
                <Input type="text" placeholder="Enter staff pin" 
                    value={this.state.pin} onChange={e => this.setState({pin: e.target.value})} />
                <Button color="info" onClick={(e) => this.createAcct(e)}>Create New Staff Account</Button>
            </div>
        );
    }
}