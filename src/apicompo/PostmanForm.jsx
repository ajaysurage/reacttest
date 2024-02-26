// PostmanForm.js
import React, { useState } from 'react';
import axios from 'axios';
import UserInfoForm from './UserInfoForm';

const expectedAPIKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDYwNTM4NjMsImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTcwNjA1MzkyMywiZGF0SI6eyJpZCI6IjUyMSIsIm5hbWUiOiJibWMyIiwibW9iaWxlIjoiOTE5MTExNzIwNTAwIiwiZW1haWwiOiJibWMyQGdtYWlsLmNvbSJ9fQ.dbOkmWbG_ufWGRKCN28x2xlAuPBtCVTFA5kW2LEOLiA";

const PostmanForm = ({ onNext }) => {
  const [authKey, setAuthKey] = useState('');
  const [response, setResponse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  const handlePostmanRequest = async () => {
    try {
      if (authKey.trim() === expectedAPIKey.trim()) { // Check if entered API key matches the expected API key
        const curlRequest = {
          method: 'GET',
          url: 'https://wa20.nuke.co.in/v5/api/session.php',
          headers: {
            Authorization: authKey,
            'Content-Type': 'application/json',
          },
          data: {
            // Your data...
          },
        };
  
        const postmanResponse = await axios(curlRequest);
  
        setResponse(JSON.stringify(postmanResponse.data));
  
        if (postmanResponse.status === 200 && postmanResponse.data.authenticated) {
          alert('Success'); // Show success alert
          onNext();
        } else {
          setErrorMessage('Authentication failed or response code is not 200. Please try again.');
        }
      } else {
        setErrorMessage('Invalid API key. Please enter the correct API key.');
      }
    } catch (error) {
      setResponse(JSON.stringify(error.response?.data || error.message));
    }
  };
  

  return (
    <div>
      <h2>Postman Form</h2>
      <label>
        Authorization Key:
        <input
          type="text"
          value={authKey}
          onChange={(e) => setAuthKey(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handlePostmanRequest}>Send Request</button>
      <div>
        <h3>Response:</h3>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <pre>{response}</pre>
        )}
      </div>
    </div>
  );
};

export default PostmanForm;
