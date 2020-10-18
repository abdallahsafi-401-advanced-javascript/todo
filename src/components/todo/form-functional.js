// import React from 'react';
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const TodoForm = (props) => {
  const [item, setItem] = useState({});

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    setItem(item, {});
  };
  return (
    <>
      <Card bg="light" text="dark" style={{ width: "18rem" }} className="mb-2 w-75">
        <Card.Header>Add Item</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicText1">
              <Form.Label>To Do Item</Form.Label>
              <Form.Control
                type="text"
                name="text"
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />
            </Form.Group>

          

            <Form.Group controlId="formBasicText2">
              <Form.Label>Assigned to</Form.Label>
              <Form.Control
                type="text"
                placeholder="Assigned to"
                name="assignee"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicRange">
              <Form.Label>Difficulty Rating</Form.Label>
              <Form.Control
                type="range"
                defaultValue="1"
                min="1"
                max="5"
                name="difficulty"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add item
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default TodoForm;
