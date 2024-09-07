import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/userContext';
import { getAllUsers } from '../../../_actions/users.action';
import { Table, Button } from 'reactstrap';
import {
  EditUserModal,
  DeleteUserModal,
  CreateUserModal
} from 'components/ui/modals/index'

import SearchBar from 'components/ui/searchbar/searchBar';


const UserTable = () => {
  const { state, dispatch } = useContext(UserContext);
  const { users, loading, error } = state;
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [editingUserId, setEditingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    getAllUsers()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleEdit = (userId) => setEditingUserId(userId);
  const handleDelete = (userId) => setDeletingUserId(userId);
  const handleCreate = () => setCreatingUser(true);

  const handleSearch = (term) => {
    if (term === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => 
        user.first_name.toLowerCase().includes(term.toLowerCase()) ||
        user.last_name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
      ));
    }
  };
  
  const closeModal = (setModalState) => () => setModalState(null);

  return (
    <div>
      <div className='user-action'>
        <SearchBar placeholder="Search users..." onSearch={handleSearch} />
        <Button color="primary" onClick={handleCreate} className="mb-3">+ Add User</Button>
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {filteredUsers && (
        <div className="user-table-wrapper">
          <Table striped responsive className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <img 
                        src={user.avatar} 
                        alt={`${user.first_name}'s avatar`} 
                        className="avatar-img" 
                      />
                    </td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      <Button onClick={() => handleEdit(user.id)} className="mr-2 edit-button">Edit</Button>
                      <Button onClick={() => handleDelete(user.id)} className='delete-button'>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No results found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      {creatingUser && (
        <CreateUserModal 
          isOpen={creatingUser} 
          toggle={closeModal(setCreatingUser)} 
        />
      )}
      {editingUserId && (
        <EditUserModal 
          isOpen={!!editingUserId} 
          toggle={closeModal(setEditingUserId)} 
          user={users.find(user => user.id === editingUserId)} 
        />
      )}
      {deletingUserId && (
        <DeleteUserModal 
          isOpen={!!deletingUserId} 
          toggle={closeModal(setDeletingUserId)} 
          userId={deletingUserId} 
        />
      )}
    </div>
  );
};

export default UserTable;
