import React, {Component} from 'react';
import firebase from 'firebase';
import {Button, Input} from 'reactstrap';
import './General.css';

export default class SetPrivateState extends Component {

    state = {staff: '', location: ''}

    handleChange() {
      const { staff, location } = this.state;
      let self = this;
        firebase.database().ref(`/StaffLocation/${staff}`).update({
            room: location
        }).then(() => {
            self.setState({staff: '', location: ''})
        });
    }

    render() {
        return (
            <div className="task">
                <p>Change Staff Location</p>
                <Input type="text" placeholder="Enter staff phone num: 111, 222" 
                    value={this.state.staff} onChange={e => this.setState({staff: e.target.value})} />
                <Input type="text" placeholder="Location will be changed to: CT, LA1, or TLA"
                    value={this.state.location} onChange={e => this.setState({location: e.target.value})} />
                <Button onClick={e => this.handleChange(e)}>Change Location</Button>
            </div>
        );
    }
}
