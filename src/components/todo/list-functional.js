import React from "react";
import { ListGroup } from "react-bootstrap";

const TodoList = (props) => {
  return (
    <>
      <ListGroup >
      {props.list.map((item) => (
        <ListGroup.Item style={{cursor:'pointer'}} variant={(item.complete ? 'success' : 'danger')} key={item._id} onClick={() => props.handleComplete(item._id)} >{item.text}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default TodoList;
