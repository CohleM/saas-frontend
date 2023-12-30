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

interface SubmitEmailRequest {
  email: string;
}

interface SubmitEmailResponse {
  message: string;
}

export default function Login() {

  const [email, setEmail] = useState('');
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
        <Button className="w-full" onClick={handleLogin}>Login</Button>
      </CardFooter>
    </Card>
    </div>



    //only the social login

    // <div className="flex justify-center items-center mt-24">
    // <Card className="w-96">
    //   <CardHeader className="flex flex-col space-y-1 justify-center items-center">
    //     <CardTitle className="text-2xl">Log in to OkProfessor</CardTitle>
    //     <CardDescription>
    //     Login to continue
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className="grid gap-4">
    //     <div className="">
          
    //       <Button variant="default" className="w-full">
    //         <Icons.google className="mr-2 h-4 w-4" />
    //         Continue with Google
    //       </Button>
          

    //       <div className="flex space-x-3 mt-4 justify-evenly">
    //         <p>
    //           <span className="text-sm text-muted-foreground" >Don't have an account?</span> 
    //           <span> <a href="/signup" className="text-sm font-medium">Create Account </a> </span> </p>
           
    //       </div>
    //     </div>

    //   </CardContent>

    // </Card>
    // </div>
  )
}