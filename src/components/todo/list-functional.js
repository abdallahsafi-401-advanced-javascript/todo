import React from "react";
import { Toast, Badge } from "react-bootstrap";

const TodoList = (props) => {
  return (
    <>
      {props.list.map((item) => (
        <Toast  key={item._id} onClose={() => props.handleDelete(item._id)} animation={true} >
          <Toast.Header>
            <Badge
              pill
              variant={item.complete ? "success" : "danger"}
              className="mr-2"
              onClick={() => props.handleComplete(item._id)}
              style={{ cursor: "pointer" }}
            >
              {item.complete ? "complete" : "pending"}
            </Badge>
            <strong className="mr-auto">{item.assignee}</strong>
          </Toast.Header>
          <Toast.Body>
            <p>{item.text}</p>
            <p className="d-flex justify-content-end">
              <small>Difficulty: {item.difficulty}</small>
            </p>
          </Toast.Body>
        </Toast>
      ))}
    </>
  );
};

export default TodoList;
