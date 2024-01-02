'use client'
// MagicLinkPage.tsx

import { useEffect, useState } from 'react';
import { useRouter, redirect, useSearchParams } from 'next/navigation';
import useLocalStorage from "use-local-storage";

import { ErrorDialogBox } from "@/components/errorAlert";

const MagicLinkPage: React.FC = () => {

  const [localStorage, setLocalStorage] = useLocalStorage("access_token", '');
  const [error, setError] = useState(false);

  const searchParams = useSearchParams()

  const token = searchParams.get('token') 
  
  const { push } = useRouter();

  useEffect(() => {

    
    if (token) {
      const veryToken = async () => {

        try {
          const response = await fetch(`http://127.0.0.1:8000/token/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // Adjust the content type as needed
          }} )
          
          if (response.ok) {
            console.log(response)
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
              setError(true);
            }
          }
          else{
            // console.log(output)
            setError(true);
            
          }
        }
        catch(error) {
          console.error('error')
        }
      }

      veryToken()
    }


  }, []);

  return <div>Verifying...
    {error && <ErrorDialogBox 
        title="Login Link Expired" 
        description="Your Login Link has expired. Please try logging in again"
        onAction={ () => {push('/login')}}
        actionLabel="Login"
    />}

  </div>;
};

export default MagicLinkPage;


