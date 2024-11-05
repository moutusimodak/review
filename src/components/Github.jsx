import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Github = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSelected, setIsSelected] = useState(false); 

  const url = import.meta.env.VITE_GITHUB_TOKEN;
  useEffect(() => {
    if (query.length < 3 || isSelected) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(() => {
      searchUsers(query);
    }, 300);


  }, [query]);

  const searchUsers = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery}`,
        {
          headers: {
            Authorization: `token ${url}`
          }
        }
      );
      setUsers(response.data.items);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
    setIsSelected(false); 
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex < users.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : users.length - 1
      );
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      
      setQuery(users[selectedIndex].login);
      setUsers([]) 
      setIsSelected(true);
     
    }
  };
  const handleUserClick = (user) => {
    setQuery(user.login);
    setUsers([]);
    setIsSelected(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <h1>Typehead</h1>
      <input
        type="text"
        placeholder="Search GitHub users"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{ padding: '8px', width: '50%' }}
      />
      {loading && <div>Loading...</div>}
      <ul style={{ listStyleType: 'none', paddingLeft: 0, width: '50%', textAlign: 'left', margin: '0' }}>
        {users.map((user, index) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user)}
            style={{
              padding: '5px 0',
              backgroundColor: index === selectedIndex ? 'red' : 'transparent',
            }}
          >
            <a
              target="_blank"
              style={{
                textDecoration: 'none',
                color: index === selectedIndex ? '#000' : 'black',
              }}
            >
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Github;
