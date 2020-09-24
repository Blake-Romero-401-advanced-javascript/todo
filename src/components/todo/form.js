import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function TodoForm(props) {

  const [item, setItem] = useState({});

  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    setItem({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Add Item</Card.Title>

          <Form.Group controlId="formToDoItem">
            <Form.Label>To Do Item</Form.Label>
            <Form.Control onChange={handleInputChange} type="text" placeholder="Add to do list item here" />
          </Form.Group>

          <Form.Group controlId="formAsignee">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control onChange={handleInputChange} type="text" placeholder="Assignee Name" />
          </Form.Group>

          <Form.Group controlId="formRange">
            <Form.Label>Difficulty Rating</Form.Label>
            <Form.Control onChange={handleInputChange} type="range" min="0" max="10"/>
          </Form.Group>
          <Button variant="primary" type="submit">Add Item</Button>
        </Card.Body>
      </Card>
    </Form>
  );
  
}

export default TodoForm;
