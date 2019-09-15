import React, {Component} from 'react';
import firebase from 'firebase';
import {Button, Input} from 'reactstrap';
import './General.css';

export default class RemoveInSessionUser extends Component {

  handleCleanUp() {
    firebase.database().ref('/PatientVisitsByDates/').once('value', function(snapshot) {
      snapshot.forEach(function (date) {
        date.forEach(function (obj){
          obj.forEach(function (timeSlot){
            if (timeSlot.val().inSession == true) {
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
        <p>Remove User in Session; Clean invalid data</p>
        <Button color="danger" onClick={(e) => this.handleCleanUp(e)}>Remove</Button>
      </div>
    );
  }
}