import React, { useState, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { UserContext } from "../../../context/userContext";
import { createUser } from "_actions/users.action";
import "./modal.scss";

const CreateUser = ({ isOpen, toggle }) => {
  const { dispatch } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!firstName.trim()) errors.firstName = "First name is required";
    if (!lastName.trim()) errors.lastName = "Last name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      avatar: "https://via.placeholder.com/150",
    };

    createUser(newUser)(dispatch)
      .then(() => {
        toggle();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="custom-modal create-modal"
    >
      <ModalHeader toggle={toggle}>Create User</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              invalid={!!errors.firstName}
            />
            <FormFeedback>{errors.firstName}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              invalid={!!errors.lastName}
            />
            <FormFeedback>{errors.lastName}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              invalid={!!errors.email}
            />
            <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateUser;
