'use client'
// MagicLinkPage.tsx

import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';

const MagicLinkPage: React.FC = () => {
  const searchParams = useSearchParams()

  const token = searchParams.get('token') 
  console.log(token)

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
            if (output['isValid'] == 'true') {
                console.log(output['message'])
                redirect('http://localhost:3000/editor')
            } 
            else{
              console.log(output['message'])
            }
          }
        }

        catch (error) {
          console.error(error)
        }
      }

      veryToken()
    }


  }, []);

  return <div>Verifying magic link...</div>;
};

export default MagicLinkPage;


