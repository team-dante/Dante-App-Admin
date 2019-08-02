import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Col} from 'reactstrap';

import CleanDatabase from './CleanDatabase';
import SetPrivateState from './SetPrivateState';
import CreateStaffAcct from './CreateStaffAcct';
import DeleteAcct from './DeleteAcct';
import AddTimeSlots from './AddTimeSlots';

class App extends Component {
    componentDidMount() {
        let config = {
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_DATABASE_URL,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER
          };
          firebase.initializeApp(config);
    }
    render() {
        return (
            <Container>
                <h3>Database Maintenance</h3>
                    <Row>
                        <Col xs="6">
                            <CleanDatabase />
                        </Col>
                        <Col xs="6">
                            <SetPrivateState />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <CreateStaffAcct />
                        </Col>
                        <Col xs="6">
                            <DeleteAcct />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <AddTimeSlots />
                        </Col>
                    </Row>
            </Container>
        );
    }
}
ReactDOM.render(<App />, document.querySelector('#root'))