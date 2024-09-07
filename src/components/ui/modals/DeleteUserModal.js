// components/DeleteUserModal.js
import React, { useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { UserContext } from '../../../context/userContext';
import { deleteUser } from '../../../_actions/users.action';
import './modal.scss';

const DeleteUserModal = ({ isOpen, toggle, userId }) => {
  const { dispatch } = useContext(UserContext);

  const handleDelete = () => {
    deleteUser(userId)(dispatch);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom-modal delete-modal">
      <ModalHeader toggle={toggle}>Delete User</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this user?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
        <Button color="danger" onClick={handleDelete}>Delete</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteUserModal;
