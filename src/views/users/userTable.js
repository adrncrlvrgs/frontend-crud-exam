import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'context/userContext';
import { getAllUsers } from '_actions/users.action';
import { Table, Button, Pagination, PaginationItem, PaginationLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SearchBar from 'components/ui/searchbar/searchBar';
import { EditUserModal, DeleteUserModal, CreateUserModal } from 'components/ui/modals/index';
import useDelete from './useDeleteUser';

const UserTable = () => {
  const { state, dispatch } = useContext(UserContext);
  const { users, loading, error } = state;

  const {userDelete , handleDelete, setUserDelete} = useDelete()
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [editingUserId, setEditingUserId] = useState(null);
  const [creatingUser, setCreatingUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortBy, setSortBy] = useState('name'); 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getAllUsers()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleCreate = () => setCreatingUser(true);
  const handleEdit = (userId) => setEditingUserId(userId);

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
    setCurrentPage(1); 
  };

  const sortUsers = (users, sortBy, sortOrder) => {
    return [...users].sort((a, b) => {
      let valueA, valueB;
      if (sortBy === 'id') {
        valueA = a.id;
        valueB = b.id;
      } else {
        valueA = `${a.first_name} ${a.last_name}`.toLowerCase();
        valueB = `${b.first_name} ${b.last_name}`.toLowerCase();
      }
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const sortedUsers = sortUsers(filteredUsers, sortBy, sortOrder);
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {setCurrentPage(pageNumber);};

  const toggleSortOrder = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleSortByChange = (sortBy) => {
    setSortBy(sortBy);
    toggleDropdown(); 
  };

  const closeModal = (setModalState) => () => setModalState(null);

  return (
    <div>
      <div className='user-action'>
        <SearchBar placeholder="Search users..." onSearch={handleSearch} />
        <div className='d-flex'>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle color="secondary" className="mb-3" style={{ marginRight: '4px' }}>
              Sort by: {sortBy === 'name' ? 'Name' : 'ID'}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleSortByChange('name')}>Name</DropdownItem>
              <DropdownItem onClick={() => handleSortByChange('id')}>ID</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button color="secondary" onClick={toggleSortOrder} className="mb-3" style={{ marginRight: '4px' }}>
            Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
          </Button>
          <Button color="primary" onClick={handleCreate} className="mb-3">+ Add User</Button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {currentUsers.length > 0 ? (
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
              {currentUsers.map(user => (
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
                    <Button onClick={() => handleEdit(user.id)} className="mr-2 btn-edit">Edit</Button>
                    <Button onClick={() => handleDelete(user.id)} className='btn-danger'>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink first onClick={() => handlePageChange(1)} />
            </PaginationItem>
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
            {pageNumbers.map(number => (
              <PaginationItem key={number} active={number === currentPage}>
                <PaginationLink onClick={() => handlePageChange(number)}>
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage === pageNumbers.length}>
              <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
            <PaginationItem disabled={currentPage === pageNumbers.length}>
              <PaginationLink last onClick={() => handlePageChange(pageNumbers.length)} />
            </PaginationItem>
          </Pagination>
        </div>
      ) : (
        <div className="user-table-wrapper">
          <Table striped responsive className="custom-table">
            <tbody>
              <tr>
                <td colSpan="6" className="text-center">No results found</td>
              </tr>
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
      {userDelete && (
        <DeleteUserModal 
          isOpen={!!userDelete} 
          toggle={closeModal(setUserDelete)} 
          userId={userDelete} 
        />
      )}
    </div>
  );
};

export default UserTable;
