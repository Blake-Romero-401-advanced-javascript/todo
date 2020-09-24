import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import axios from 'axios';

import './todo.scss';

export default function ToDo() {

  const [list, setList] = useState([]);
  // const [item, setItem] = useState({});

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
    addNewTask(item);
  };

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      // setItem(item);
      let newString = item.complete.toString();
      dbToggleStatus(newString);
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }

  };

  function removeTask(id) {
    let reducedList = list.filter(i => i._id !== id) || {};
    console.log('ID?', id);
    console.log('List Shape:', list);
    console.log('List After Delete:', reducedList);
  }

  async function getStoredTasks() {
    const response = await axios.get('http://localhost:3001/api/v1/todos');
    setList(response.data);
  }

  async function addNewTask(item) {
    await axios.post('http://localhost:3001/api/v1/todos', {
      text: item.txt,
      asignee: item.assignee,
      complete: item.complete,
      difficulty: item.difficulty,
    });
  }

  async function dbToggleStatus(id, status) {
    await axios.put(`http://localhost:3001/api/v1/todos/${id}`, {complete: status});
  }

  // useEffect(() => {
  //   let newList = [
  //     { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
  //     { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
  //     { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
  //     { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
  //     { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
  //   ];

  //   setList(newList);
  // }, []);

  useEffect(() => {
    getStoredTasks();
  }, []);

  useEffect(() => {
    document.title = `To Do List: ${list.length}`
  }, [list]);

  return (
    <>
      <Container>
        <Row>
          <Col>

            <header>
              <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                  <Navbar.Brand>
                    ToDo List Manager ({list.filter(item => !item.complete).length})
                    {/* list.length */}
                  </Navbar.Brand>
                </Nav>
              </Navbar>
            </header>

          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <div>
              <TodoForm handleSubmit={addItem} />
            </div>
          </Col>

          <Col md={8}>
            <div>
              <TodoList
                list={list}
                handleComplete={toggleComplete}
                handleDelete={removeTask}
              />
            </div>
          </Col>
        </Row>
          
      </Container>
    </>
  );
}
