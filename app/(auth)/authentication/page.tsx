'use client'
// MagicLinkPage.tsx

import { useEffect } from 'react';
import { useRouter, redirect, useSearchParams } from 'next/navigation';
import useLocalStorage from "use-local-storage";

const MagicLinkPage: React.FC = () => {

  const [localStorage, setLocalStorage] = useLocalStorage("access_token", '');


  const searchParams = useSearchParams()

  const token = searchParams.get('token') 
  
  const { push } = useRouter();

  useEffect(() => {

    // Check if the token is present in the URL
    if (token) {
      // Make a request to the backend to verify the token
      // fetch(`http://127.0.0.1:8000/token/${token}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     // Handle the verification response
      //     console.log(data.message);
      //     // Redirect the user or show an error message
      //   })
      //   .catch((error) => {
      //     console.error('Error verifying magic link:', error);
      //     // Show an error message to the user
      //   });

      const veryToken = async () => {

        try {
          const response = await fetch(`http://127.0.0.1:8000/token/${token}`)
          
          if (response.ok) {
            const output = await response.json()
            // console.log(output)
            if (output) {
                console.log('gggggg')
                setLocalStorage(output['access_token'])
                // console.log(output)
                push('http://localhost:3000/editor')
            } 
            else{
              // console.log(output)
              console.log('yolo')
            }
          }
        }
        catch(error) {
          // if (error.response && error.response.status === 401) {
          //   console.log('401 Unauthorized');
          //   // Handle the 401 Unauthorized error here
          //   // For example, redirect the user to a login page
          //   // or display an error message
          //   console.log('there was gg errror')
          // } else {
          //   console.error('Error verifying magic link:', error);
          // }
          console.error('error')
        }
      }

      veryToken()
    }


  }, []);

  return <div>Verifying...</div>;
};

export default MagicLinkPage;


