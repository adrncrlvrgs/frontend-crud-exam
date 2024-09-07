
const API_URL = 'https://reqres.in/api/users';

const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}?page=1`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    console.log('Fetched data:', data); 
    return data.data; 
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const updatedUser = await response.json();
    console.log('Updated user:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create error:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return userId; // Return the deleted user's ID
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

export default { getUsers, updateUser, createUser, deleteUser };