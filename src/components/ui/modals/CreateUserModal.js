// components/CreateUser.js
import React, { useState, useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { UserContext } from '../../../context/userContext';
import { createUser } from '_actions/users.action';
import './modal.scss';

const CreateUser = ({isOpen, toggle }) => {
  const { dispatch } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      avatar: 'https://via.placeholder.com/150' 
    };

    createUser(newUser)(dispatch);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom-modal create-modal">
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
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Create</Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateUser;
