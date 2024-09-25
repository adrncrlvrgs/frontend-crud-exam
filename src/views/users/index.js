import React from 'react';
import { UserProvider } from 'context/userContext';
import UserTable from './userTable';
import './index.scss'; 

const Index = () => {
  return (
    <UserProvider>
      <div className="index-container">
        <h1>User Management</h1>
      
          <UserTable />

      </div>
    </UserProvider>
  );
};

export default Index;
