import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

function Data(props) {
    if (props.status === undefined) {
        return null;
    }
    return (
        <ListGroup>
            <ListGroupItem>Email: {props.status.email}</ListGroupItem>
            <ListGroupItem>Username: {props.status.username}</ListGroupItem>
        </ListGroup>
    )
}

export default Data;