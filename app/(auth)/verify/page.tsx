'use client'
import { useEffect, useState } from 'react';
import useLocalStorage from "use-local-storage";

const YourComponent = () => {
  const [data, setData] = useState(null);
  const [localStorage, setLocalStorage] = useLocalStorage("access_token",'');

  useEffect(() => {
    // Replace 'your-backend-endpoint' with the actual backend API endpoint
    // const apiUrl = `http://127.0.0.1:8000/private-data`;
     
    const apiUrl = `http://127.0.0.1:8000/create-draft`;

    const fetchData = async () => {
      try {
        const token = localStorage; // Replace with your actual bearer token

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Adjust the content type as needed
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log('this is result', result)
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

        fetchData();



  }, []);

  return (
    <div className='mt-20'>
      <h1>Your Component</h1>
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default YourComponent;
