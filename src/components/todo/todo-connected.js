import React, { useEffect, useState, useContext} from "react";
import { TodoContext } from "../../context/settings/context";
import axios from "axios";
import TodoForm from "./form-functional.js";
import TodoList from "./list-functional.js";
import { Container, Row, Col } from "react-bootstrap";

import "./todo.scss";

const todoAPI = "https://as-app-server.herokuapp.com/api/v1/todo";

const ToDo = () => {
  const [list, setList] = useState([]);

  const context = useContext(TodoContext);

  const _addItem = async (item) => {
    item.due = new Date();
    axios({
      method: "post",
      url: todoAPI,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(item),
    })
      .then((response) => response.data)
      .then((savedItem) => {
        setList([...list, savedItem]);
      })
      .catch(console.error);
  };

  const _deleteItem = async (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      let url = `${todoAPI}/${id}`;
        axios({
          method: "delete",
          url: url,
          mode: "cors",
          cache: "no-cache",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.data)
          .then((savedItem) => {
            setList(
              list.map((listItem) =>
                listItem._id === item._id ? savedItem : listItem
              )
            );
          })
          .catch(console.error);
    }
  };

  const _toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      axios({
        method: "put",
        url: url,
        mode: "cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(item),
      })
        .then((response) => response.data)
        .then((savedItem) => {
          setList(
            list.map((listItem) =>
              listItem._id === item._id ? savedItem : listItem
            )
          );
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    axios({
      method: "get",
      url: todoAPI,
      params : {
        _limit: 10,
      }})
      .then((res) => res.data)
      .then((data) => {
        let newList = data.results.filter( i => {
          return context.showCompleted ? i : i.complete === context.showCompleted
        })
        // newList = newList.slice(0, context.numItems);
        newList = newList.sort((a, b) => (a[context.sortType] > b[context.sortType]) ? 1 : -1)
        setList(newList)
         
      }
     )
      .catch(console.error);
  };

  useEffect(_getTodoItems, [list]);

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col>
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
          <Col>
            <TodoForm handleSubmit={_addItem} />
          </Col>

          <Col>
            <TodoList
              list={list}
              handleComplete={_toggleComplete}
              handleDelete={_deleteItem}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ToDo;
