import React, { useEffect, useState} from "react";
import TodoForm from "./form-functional.js";
import TodoList from "./list-functional.js";
import { Container , Row, Col} from "react-bootstrap";


import "./todo.scss";

const ToDo = () => {
  const [list, setList] = useState([]);


  const _addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const _toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      setList(
        list.map((listItem) => (listItem._id === item._id ? item : listItem))
      );
    }
  };

  const _getTodoItems = () => {
    let list = [
      {
        _id: 1,
        complete: false,
        text: "Clean the Kitchen",
        difficulty: 3,
        assignee: "Person A",
      },
      {
        _id: 2,
        complete: false,
        text: "Do the Laundry",
        difficulty: 2,
        assignee: "Person A",
      },
      {
        _id: 3,
        complete: false,
        text: "Walk the Dog",
        difficulty: 4,
        assignee: "Person B",
      },
      {
        _id: 4,
        complete: true,
        text: "Do Homework",
        difficulty: 3,
        assignee: "Person C",
      },
      {
        _id: 5,
        complete: false,
        text: "Take a Nap",
        difficulty: 1,
        assignee: "Person B",
      },
    ];
    setList(list);
  };

  useEffect(_getTodoItems, []);

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
          <TodoList list={list} handleComplete={_toggleComplete} />
        </Col>
        </Row>
      </Container>
    </>
  );
};

export default ToDo;
