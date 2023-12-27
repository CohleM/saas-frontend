import React from 'react'
import { Button } from "@/components/ui/button";
import {File, Plus} from "lucide-react";
import { ScrollArea
 } from './ui/scroll-area';
const drafts = () => {


 const playlists = [
        "Recently Added",
        "Recently Played",
        "Top Songs",
        "Top Albums",
        "Top Artists",
        "Logic Discography",
        "Bedtime Beats",
        "Feeling Happy",
        "I miss Y2K Pop",

      ]

  return (
    <div className=''>
        <div className='pt-10'>
            {/* <p className='text-base font-bold mt-5'> Drafts</p>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button> */}

<ScrollArea className="h-[calc(100vh-theme(space.40))] px-1">
        
        <Button className="mx-4 space-x-4 " variant="outline">
            <Plus className="mx-2 w-4 h-4" />
            New Chat
          </Button>
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                    <File className='h-4 w-4 mx-2'/>
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>


                   </div>
    </div>
  )
}

export default drafts