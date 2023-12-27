import React from 'react'
import { Button } from "@/components/ui/button";
import {File, Plus, LogOut, Sparkles} from "lucide-react";
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


      ]

  return (
    <div className='mt-10 '>
        <div className='flex flex-col items-center '>
            {/* <p className='text-base font-bold mt-5'> Drafts</p>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button> */}

<ScrollArea className="h-[calc(100vh-theme(space.40))] px-1 ">
            <div className="space-y-1 p-2">
            <Button className="space-x-4 w-full justify-start" variant="ghost">
            <Plus className="mx-2 w-4 h-4" />
            New document
          </Button>
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
          <div className='flex flex-col w-full bg-white px-2 space-y-2'>
          <Button variant="outline" className='w-full justify-center' size="sm"><LogOut className="w-4 h-4 mx-2"/> Log out</Button>
          <Button variant="outline" className='w-full bg-purple-500 text-white' size="sm"><Sparkles className="w-4 h-4 mx-2" />Upgrade</Button>
          </div>
                   </div>
    </div>
  )
}

export default drafts