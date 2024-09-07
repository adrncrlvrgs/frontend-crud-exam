import React, { useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { UserContext } from '../../../context/userContext';
import { deleteUser } from '../../../_actions/users.action';
import './modal.scss';

const DeleteUserModal = ({ isOpen, toggle, userId }) => {
  const { state, dispatch } = useContext(UserContext);
  const { users } = state;

  const user = users.find(user => user.id === userId);

  const handleDelete = () => {
    deleteUser(userId)(dispatch);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom-modal delete-modal">
      <ModalHeader toggle={toggle}>Delete User</ModalHeader>
      <ModalBody>
        {user ? (
          <Card>
            <CardBody>
              <CardTitle tag="h5">{`${user.first_name} ${user.last_name}`}</CardTitle>
              <CardText>Email: {user.email}</CardText>
              <CardText>Avatar:</CardText>
              <img 
                src={user.avatar} 
                alt={`${user.first_name}'s avatar`} 
                width="100" 
                height="100" 
                className="img-thumbnail"
              />
            </CardBody>
          </Card>
        ) : (
          <p>Loading user details...</p>
        )}
        <p className="mt-3">Are you sure you want to delete this user?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
        <Button color="danger" onClick={handleDelete}>Delete</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteUserModal;
