"use client"

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

export default function Login() {
  return (
    // <div className="flex justify-center items-center mt-24">
    // <Card className="w-96">
    //   <CardHeader className="space-y-1">
    //     <CardTitle className="text-2xl">Login</CardTitle>
    //     <CardDescription>
    //       Enter your email below to login 
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
    //     <Button className="w-full">Login</Button>
    //   </CardFooter>
    // </Card>
    // </div>





    <div className="flex justify-center items-center mt-24">
    <Card className="w-96">
      <CardHeader className="flex flex-col space-y-1 justify-center items-center">
        <CardTitle className="text-2xl">Log in to OkProfessor</CardTitle>
        <CardDescription>
        Login to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="">
          
          <Button variant="default" className="w-full">
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          

          <div className="flex space-x-3 mt-4 justify-evenly">
            <p>
              <span className="text-sm text-muted-foreground" >Don't have an account?</span> 
              <span> <a href="/signup" className="text-sm font-medium">Create Account </a> </span> </p>
           
          </div>
        </div>

      </CardContent>

    </Card>
    </div>
  )
}