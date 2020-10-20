import React, { useContext, useState, useEffect } from "react";
import { TodoContext } from "../../context/settings/context";
import { Toast, Badge, Pagination } from "react-bootstrap";

const TodoList = (props) => {
  const context = useContext(TodoContext);
  const [active, setActive] = useState(1);
  let start = ((active - 1) * context.numItems);
  //start  1 => 0
  // end => 3
  // start 2 => 3
  // end 6
  // 3 => 6

  let end = context.numItems + ((active - 1) * context.numItems);
  // let list = props.list.splice(((active - 1) * context.numItems) ,context.numItems);
  let list = props.list.slice(start ,end)

  // let list = props.list;

  let pagItems = [];
  const handlePagination = (e) =>{
    console.log(e.target.text)
    setActive(Number(e.target.text));
  }
  for (
    let number = 1;
    number <= Math.ceil(props.list.length / context.numItems);
    number++
  ) {
    pagItems.push(
      <Pagination.Item key={number} active={number === active} disabled={number === active} onClick ={handlePagination} >
        {number}
      </Pagination.Item>
    );
  }

  

  return (
    <>
      {list.map((item) => (
        <Toast
          key={item._id}
          onClose={() => props.handleDelete(item._id)}
          animation={true}
        >
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
              <small>Difficulty: {item.difficulty} </small>
            </p>
          </Toast.Body>
        </Toast>
      ))}
      <Pagination>{pagItems}</Pagination>
    </>
  );
};

export default TodoList;
