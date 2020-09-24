import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

function TodoList(props) {

  return (
    <ListGroup>
      {props.list.map(item => (
        <ListGroup.Item action variant={item.complete === false ? "success" : "danger"}
          className={`complete-${item.complete.toString()}`}
          key={item._id}
        >
          <span onClick={() => props.handleComplete(item._id)}>
            {item.text}
            <br></br>
            {item.assignee}
          </span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TodoList;
