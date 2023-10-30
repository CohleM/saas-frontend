"use client"
import { useState } from "react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

import Cookies from 'js-cookie';




export default function Signup() {

  const [token, setToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  
  const handleGoogleLoginSuccess = async (response) => {
    console.log(response.credential);
    const access_token = response.credential; // Assuming response.credential holds the access token.
  
    try {
      const loginResponse = await fetch('http://localhost:8000/api/auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token }),
      });
  
      if (loginResponse.ok) {
        // Handle a successful response, e.g., set your application state.
        const data = await loginResponse.json();
       
      try {
        Cookies.set('access_token', data.access );
        Cookies.set('refresh_token', data.refresh   );
       } 
       catch (error) {
        console.error('Error setting the cookie', error )
       }
        
      

        console.log(data.access);
        //console.log(data.refresh);

        makeAuthenticatedRequest();

      } else {
        // Handle an error response.
        console.error('Error:', loginResponse.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const makeAuthenticatedRequest = async () => {
    const access_token = Cookies.get('access_token');
    if (access_token) {
      setAccessToken(access_token);
    }

    if (access_token) {
      console.log('This is getting the cookie token', access_token)
      const headers = {
        Authorization: `Bearer ${access_token}`,
        // Other headers...
      };

      try {
        const response = await fetch('http://localhost:8000/api/auth/user/', {
          method: 'GET', // or 'POST', 'PUT', 'DELETE', etc. as needed
          headers: headers,
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          console.log('I guess its logged in see the data here: ', data);
        } else {
          console.error('API Request Failed:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Access token is missing. Please log in or obtain a token.');
    }
  };
  

  return (

    // <div className="flex justify-center items-center mt-24">
    // <Card className="w-96">
    //   <CardHeader className="space-y-1">
    //     <CardTitle className="text-2xl">Create an account</CardTitle>
    //     <CardDescription>
    //       Enter your email below to create your account
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className="grid gap-4">
    //     <div className="">
          
    //       <Button variant="outline" className="w-full">
    //         <Icons.google className="mr-2 h-4 w-4" />
    //         Continue with Google
    //       </Button>
    //     </div>
    //     <div className="relative">
    //       <div className="absolute inset-0 flex items-center">
    //         <span className="w-full border-t" />
    //       </div>
    //       <div className="relative flex justify-center text-xs uppercase">
    //         <span className="bg-background px-2 text-muted-foreground">
    //           Or continue with
    //         </span>
    //       </div>
    //     </div>
    //     <div className="grid gap-2">
    //       <Label htmlFor="email">Email</Label>
    //       <Input id="email" type="email" placeholder="m@example.com" />
    //     </div>
    //     <div className="grid gap-2">
    //       <Label htmlFor="password">Password</Label>
    //       <Input id="password" type="password" />
    //     </div>
    //   </CardContent>
    //   <CardFooter>
    //     <Button className="w-full">Create account</Button>
    //   </CardFooter>
    // </Card>
    // </div>


    <div className="flex justify-center items-center mt-24">
    <Card className="w-96">
      <CardHeader className="flex flex-col space-y-1 justify-center items-center">
        <CardTitle className="text-2xl">Get Started</CardTitle>
        <CardDescription>
        Create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="">
          
          {/* <Button variant="default" className="w-full">
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button> */}
          <GoogleOAuthProvider clientId="1095769737829-ifqelahubl9tck1n3bhaosq55b1fd2ok.apps.googleusercontent.com">
          <GoogleLogin 
              onSuccess= {handleGoogleLoginSuccess}
              onError={() => {
                console.log('Login Failed');
              }}

              width= "400px"
              text="continue_with"
              logo_alignment = "center"
              type="standard"
          /> 
</GoogleOAuthProvider>
          <div className="flex space-x-3 mt-4 justify-evenly">
            <p>
              <span className="text-sm text-muted-foreground" >Already have an account?</span> 
              <span> <a href="/login" className="text-sm font-medium">Login </a> </span> </p>
           
          </div>
        </div>

      </CardContent>

    </Card>
    </div>
  )
}