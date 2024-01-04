import React from 'react'
import { Button } from "@/components/ui/button";
import {File, Plus, LogOut, Sparkles} from "lucide-react";
import { ScrollArea
 } from '../ui/scroll-area';
 import { useEffect } from 'react';
 import { useRouter} from 'next/navigation';
 type Draft = {
  id: number;
  name: string;
  owner_id: number;
  last_updated: string; // You might want to use a Date type if applicable
};

type UserData = {
  email: string;
  id: number;
  drafts: Draft[];
};

type DraftsProps = {
  contentChange: () => void;
  drafts: Draft[];
  setActiveDraft: (newActiveDraft: number) => void;
  createNewDraft: () => void;
  activeDraft : number | undefined;
};

const drafts = ({contentChange, drafts, setActiveDraft, createNewDraft, activeDraft} : DraftsProps) => {

  const { push } = useRouter();
      // console.log(drafts)
  
     
      // console.log(Object.entries(userdata['drafts']));
      

      const handleLogout = () => {
        console.log('yoooo')
        window.localStorage.clear()
        push('/login')

      }

  return (
    <div className='mt-14'>
        <div className='flex flex-col items-center '>
            {/* <p className='text-base font-bold mt-5'> Drafts</p>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button>
            <Button className='w-full' >AI is fascinating</Button> */}

<ScrollArea className="h-[calc(100vh-10rem)] px-1 ">
            <div className="space-y-1 p-2">
            <Button className="space-x-4 w-full justify-start text-indigo-500 font-semibold" variant="link" onClick={() => createNewDraft()}>
            <Plus className="mx-2 w-4 h-4" />
            New document
          </Button>
              {drafts?.map((item, i) => (
                <Button
                  key={`${item}-${i}`}
                  variant="ghost"
                  className={`w-full justify-start font-normal  ${ activeDraft === item.id ? 'bg-indigo-500 text-white hover:bg-indigo-500 hover:text-white' : ''}`}
                  onClick={() => setActiveDraft(item.id)}
                >
                    <File className='h-4 w-4 mx-2'/>
                  {item.name == '' ? 'Untitled' : item.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <div className='flex flex-col w-full bg-white px-2 space-y-2 my-4'>
          <Button variant="outline" className='w-full justify-center' size="sm" onClick={handleLogout}><LogOut className="w-4 h-4 mx-2"/> Log out</Button>
          <Button variant="outline" className='w-full bg-purple-500 text-white' size="sm"><Sparkles className="w-4 h-4 mx-2" />Upgrade</Button>
          </div>
                   </div>
    </div>
  )
}

export default drafts