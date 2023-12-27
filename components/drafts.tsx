import React from 'react'
import { Button } from "@/components/ui/button";
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
        "Runtober",
        "Mellow Days",
        "Eminem Essentials",
        "Logic Discography",
        "Bedtime Beats",
        "Feeling Happy",
        "I miss Y2K Pop",
        "Runtober",
        "Mellow Days",
        "Eminem Essentials",
      ]

  return (
    <div className='mt-10'>
        <div className=''>
            {/* <p className='text-base font-bold mt-5'> Drafts</p>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button> */}

<ScrollArea className="h-[calc(100vh-theme(space.40))] px-1">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M21 15V6" />
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M12 12H3" />
                    <path d="M16 6H3" />
                    <path d="M12 18H3" />
                  </svg>
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