import React from 'react'
import axios from 'axios'

  const FetchData = () => {
    return axios('http://127.0.0.1:8000/std/')
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching data:", error);
        throw error; // This ensures that the error can be caught in the calling component
      });
  };

export default FetchData