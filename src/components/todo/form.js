import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useForm from '../../hooks/use-form.js'

export default function TodoForm(props) {

  // const [item, setItem] = useState({});
  const [handleSubmit, handleInputChange] = useForm(submitForm);

  // const handleInputChange = e => {
  //   setItem({ ...item, [e.target.name]: e.target.value});
  // };

  function submitForm(item) {
    // e.preventDefault();
    // e.target.reset();
    props.handleSubmit(item);
    // setItem({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Add Item</Card.Title>

          <Form.Group controlId="formToDoItem">
            <Form.Label>To Do Item</Form.Label>
            <Form.Control onChange={handleInputChange} name="text" type="text" placeholder="Add to do list item here" />
          </Form.Group>

          <Form.Group controlId="formAsignee">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control onChange={handleInputChange} name="assignee" type="text" placeholder="Assignee Name" />
          </Form.Group>

          <Form.Group controlId="formDifficulty">
            <Form.Label>Difficulty Rating</Form.Label>
            <Form.Control onChange={handleInputChange} name="difficulty" type="range" defaultValue="5" min="1" max="10"/>
          </Form.Group>
          <Button variant="primary" type="submit">Add Item</Button>
        </Card.Body>
      </Card>
    </Form>
  );
  
}
