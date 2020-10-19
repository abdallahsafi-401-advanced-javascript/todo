import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './form-functional.js';
import TodoList from './list-functional.js';
import { Container , Row, Col} from "react-bootstrap";


import './todo.scss';

const todoAPI = 'https://as-app-server.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };


  const _deleteItem = (id) => {
    
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'delete',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.json())
      .then(data => setList(data.results))
      .catch(console.error);
  };

  useEffect(_getTodoItems, [list]);

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col >
            {" "}
            <header className="bg-dark my-2 p-3 text-light">
              <h2>
                There are {list.filter((item) => !item.complete).length} Items
                To Complete
              </h2>
            </header>
          </Col>
        </Row>

      <Row className="mt-3">
        <Col >
          <TodoForm handleSubmit={_addItem} />
        </Col>

        <Col>
          <TodoList list={list} handleComplete={_toggleComplete} handleDelete={_deleteItem } />
        </Col>
        </Row>
      </Container>
    </>
  );
};

export default ToDo;
