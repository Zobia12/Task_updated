import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [country, setCountry] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [profile_id, setProfileID] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    //heelo
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/search', {
        country: country,
        job_title: jobTitle,
        //sds
        profile_id: profile_id
      });

      if (response.data.users) {
        setResponseMessage('Search successful');
        setUsers(response.data.users); 
      } else {
        setResponseMessage('No users found.');
      }
    } catch (error) {
      setResponseMessage('An error occurred while searching.');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Job Search</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="profile_id">Profile ID:</label>
          <input
            type="text"
            id="profile_id"
            value={profile_id}
            onChange={(e) => setProfileID(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {console.log("zobiaaa",users)}
      {responseMessage && <p>{responseMessage}</p>}

      <div>
        {users.length > 0 && (
          <div>
            <h2>Users Found:</h2>
            <ul>
              {users.map((user, index) => (
                <li key={index}>
                  <h3>{user.name.first} {user.name.last}</h3>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <p>Job Title: {user.job_title}</p>
                  <p>Location: {user.location.city}, {user.location.country}</p>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default App;
