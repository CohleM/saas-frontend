"use client"
import { useState, ChangeEvent} from 'react'
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
import { CheckCircle } from 'lucide-react';
interface SubmitEmailRequest {
  email: string;
}

interface SubmitEmailResponse {
  message: string;
}

export default function Login() {

  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleEmailChange = (e:  ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
  } 
  
  const handleLogin = async () => {
      const requestBody: SubmitEmailRequest = { 'email' : email }

      try {
        const response = await fetch('http://127.0.0.1:8000/magic-link/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data: SubmitEmailResponse = await response.json();
          setResponseMessage(data.message); // Update the response message state
          setEmail('');
          // Handle successful response
          console.log(data.message);
          alert(data.message);

        } else {
          // Handle errors
          console.error('Request failed');
        }

      }
      catch(error) {
          console.error('An error occurred:', error);
      }
  }
  return (
    <div className="flex justify-center items-center mt-24">
    <Card className="w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login 
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="">
          
          <Button variant="outline" className="w-full">
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" onChange={handleEmailChange}/>
        </div>
        {/* <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div> */}
      </CardContent>
      <CardFooter>
        <div className='flex flex-col space-y-4 w-full'> 
        <Button className="w-full" onClick={handleLogin}>Login</Button>
        {responseMessage && <div className='w-full bg-green-200 p-4 rounded flex space-x-2'><CheckCircle className='w-4 h-4 text-green-600'/> <div className='flex space-x-2'> </div><p className="text-green-500 text-sm">{responseMessage}</p></div>}
        </div>
        {/* {responseMessage && <p className="text-green-500">{responseMessage}</p>} */}
      </CardFooter>
    </Card>
    </div>



  )
}