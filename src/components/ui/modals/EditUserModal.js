import React, { useState, useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { UserContext } from '../../../context/userContext';
import { updateUser } from '../../../_actions/users.action';
import './modal.scss';

const EditUserModal = ({ isOpen, toggle, user }) => {
  const { dispatch } = useContext(UserContext);
  const [userData, setUserData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = () => {
    updateUser(user.id, userData)(dispatch);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom-modal edit-modal">
      <ModalHeader toggle={toggle}>Edit User</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input type="text" name="first_name" value={userData.first_name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="last_name" value={userData.last_name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" value={userData.email} onChange={handleChange} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
        <Button color="primary" onClick={handleUpdate}>Update</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditUserModal;
