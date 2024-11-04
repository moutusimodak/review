import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Github = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const url = import.meta.env.VITE_GITHUB_TOKEN;
  useEffect(() => {
    if (query.length < 3) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(() => {
      searchUsers(query);
    }, 300);

    return () => clearTimeout(timer);
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
    
      setUsers([]) 
      // setQuery("")
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search GitHub users"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
      />
      {loading && <div>Loading...</div>}
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {users.map((user, index) => (
          <li
            key={user.id}
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
