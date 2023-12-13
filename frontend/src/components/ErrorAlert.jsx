import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ErrorAlert = () => {
  const [error, setError] = useState(null);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    iconColor: 'red',
    showConfirmButton: false,
    timer: 2000,
  })

  useEffect(() => {
    
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        setError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(axiosInterceptor);
    };
  }, []);

    useEffect(() => {
      if (error) {
        // Display error as a toast notification
        Toast.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
        });
        setError(null); // Reset error state
      }
    }, [error]);

  return null; // The ErrorAlert component doesn't render anything, it just handles errors
};

export default ErrorAlert;