
'use client'
import { Button } from "@/components/ui/button";
import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect, useRef } from "react";
import { EditorBubbleMenu } from "./bubble-menu";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Link from "@tiptap/extension-link"
import Underline from '@tiptap/extension-underline'
import { Markdown } from 'tiptap-markdown';
import HardBreak from '@tiptap/extension-hard-break'
import { Editor  } from "@tiptap/core";
import ListItem  from "@tiptap/extension-list-item";
import useLocalStorage from "use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import {useStreamedContent} from "@/app/context/StreamedContent" 
import Blockquote from "@tiptap/extension-blockquote";
// import { Converter } from 'showdown';
import {  CheckPortal } from "./bubble-menu/ai-commands";
import ReactMarkdown from 'react-markdown';
import { Plus, MessageSquare, User2, Bot, SendHorizontal } from "lucide-react";
import DashboardNavbar from "@/components/dashboard-nav"
import Drafts from "@/components/editor/drafts"
import {Icons } from "@/components/ui/circular-progress"
import LoadingEditor from "@/components/editor/loadingEditor"
import { ErrorDialogBox } from "../errorAlert";

interface IResponseObject {
  role: string;
  content: string;
}

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


const Tiptap = () => {

  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [tiptap, setTiptap] = useState();
  const [holdEditing, setHoldEditing] = useState(false);
  const [msg, setMsg] = useState<string>('')
  const [cursorIndex, setCursorIndex] = useState(0);

  const [data, setData] = useState(''); 
  const [eventSourceInitialized, setEventSourceInitialized] = useState(false);
  const [initialContent, setInitialContent] = useState('')
  const [streamedContent, setStreamedContent] = useState('');
  const [finalMessage, setFinalMessage] = useState('');
  const [localStorage, setLocalStorage] = useLocalStorage("Content", data);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const converter = new Converter({ metadata: true });


  // const {streamedContent, setStreamedContent}  = useStreamedContent()
  const [cursorPos, setCursorPos] = useState(0);

  const [previousContent, setPreviousContent] = useState('')
  const prev = useRef("");

  const [previousStreamedContent, setPreviousStreamedContent] = useState('');
  const [editorWidth, setEditorWidth] = useState('500px');


  const [userdata, setUserData] = useState<UserData | null>();
  const [accesstoken, setAccessToken] = useLocalStorage("access_token",'');
  const [activeDraft, setActiveDraft] = useState<number>();

  const [drafts, setDrafts] = useState<Draft[]>();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false)

  useEffect(() => {
    setPreviousStreamedContent(streamedContent);
  }, [streamedContent]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskItem,
      TaskList,
      Link,
      Underline,
      HardBreak,
      ListItem,
      Blockquote,
      // Markdown.configure({
      //   html: true,                  // Allow HTML input/output
      //   tightLists: true,            // No <p> inside <li> in markdown output
      //   tightListClass: 'tight',     // Add class to <ul> allowing you to remove <p> margins when tight
      //   bulletListMarker: '-',       // <li> prefix in markdown output
      //   linkify: false,              // Create links from "https://..." text
      //   breaks: false,               // New lines (\n) in markdown input are converted to <br>
      //   transformPastedText: true,  // Allow to paste markdown text in the editor
      //   transformCopiedText: true,  // Copied text is transformed to markdown
      // })
    ],
    content: data,
    editorProps: {
        attributes: {
          class: 'max-w-full prose dark:prose-invert prose-sm sm:prose-base lg:prose-base xl:prose-base m-5 focus:outline-none',
        },
      }
      ,
  onUpdate: (e) => {
    //set debounce function here. debounce meaning it should save the content every seconds. not on every change.  
    debouncedUpdates(e)
  }
  })
  const handleSendMessage = () => {
    sendMessage(); // Send message through the WebSocket connection
  };
  
  const handleContent = () => {
    setData('<h1> haha this is cool</h1> <p> yes this is fine</p>')
    console.log('yooo change content')
  }

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(data);
    }
  }, [data, editor]);

  // tiptap ProseMirror prose-invert prose-headings:font-title focus:outline-none [&:focus-visible]:outline-none max-w-full
  function truncateString(str: string, maxLength : number) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }


  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const html_text = editor.getHTML();
    const text_only = editor.getText()
    // const json_text = editor.getText();
    setLocalStorage(html_text)

    const token = accesstoken 
    const fetchData = async () => {

      // console.log(html_text)
    try {
      const editDraftResponse = await fetch(`http://127.0.0.1:8000/edit-draft/${activeDraft}/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Adjust the content type as needed
      },
      body: JSON.stringify({
        text: html_text,
        name : truncateString(text_only, 20)
      }), 
    })

      if (editDraftResponse.ok) {
        const editedDraftResult = await editDraftResponse.json()
        console.log('this is draftResult', editedDraftResult)
        //setData(draftResult['text'])
      }
      else {
        console.log('error occured')
      }
    }
    catch (error) {
      console.error(error)
    }
    }

    fetchData()

    //send the update update request to the backend.
  }, 1000);


  //openai streaming response
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');


    ws.onopen = () => {
      console.log('WebSocket connection opened.');
    };
  
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);

      if (editor) { 
        
        setStreamedContent(message['content'])
        console.log(message['content'])
        if (message['finish_reason'] == 'stop') {

          setHoldEditing(false);
        }
      }
      
    };
  
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  
    setSocket(ws);
  
    return () => {
      console.log('Component unmounted. Closing WebSocket connection.');
      ws.close();
    };
  }, [editor]);

  const sendMessage = () => {
    
    if(socket){
        if (editor) {
          const { from, to } = editor.view.state.selection
          setCursorPos(to)
          const text = editor?.view.state.doc.textBetween(from, to, '')
          socket.send(text);
          setHoldEditing(true);

        }

    }

  };

  useEffect(() => {
  
    const onKeyDown = (e: KeyboardEvent) => {
      alert('Key pressed!'); 
      e.preventDefault();
    }
    const mousedownHandler = (e: MouseEvent) => {
      alert('Key pressed! gg');
      e.preventDefault();
    }

    if(holdEditing){
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }; 
  

  }, [holdEditing])

  useEffect(() => {
    const token = accesstoken 
    const fetchData = async () => {
    try {
      setLoading(true)
      const draftResponse = await fetch(`http://127.0.0.1:8000/draft?id=${activeDraft}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Adjust the content type as needed
      }})

      if (draftResponse.ok) {
        const draftResult = await draftResponse.json()
        console.log('this is draftResult', draftResult)
        setData(draftResult['text'])
      }
      else {
        console.log('error occured')
      }
      setLoading(false)
    }
    catch (error) {

      setLoading(false)
      console.error(error)
    }
    }

    fetchData()


  }, [activeDraft])





  const createNewDraft = () => {
    const token = accesstoken 
    const fetchData = async () => {
    try {
      const draftResponse = await fetch(`http://127.0.0.1:8000/create-draft`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Adjust the content type as needed
      }})

      if (draftResponse.ok) {
        const draftResult = await draftResponse.json()
        console.log('this is a new draftResult', draftResult)
        // getAllDrafts();
        // setActiveDraft(draftResult['id'])
        userInfo();

      }
      else {
        console.log('error occured while creating draft')
      }
    }
    catch (error) {
      console.error(error)
    }
    }

    fetchData()  
  }
  
  

  const userInfo = () => {

    
    const apiUrl = `http://127.0.0.1:8000/userinfo`;

    const fetchData = async () => {
      try {
        setLoading(true) 
        const token = accesstoken; // Replace with your actual bearer token
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Adjust the content type as needed
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUserData(result);
          console.log('hehe', result)

          
          //sort the result
          const all_drafts = result['drafts']


          console.log('all draft',all_drafts)
          //console.log('heheall_drafts.length)
          if (all_drafts.length == 0) {
            createNewDraft()
          }
          else{

            const sortedDrafts = all_drafts.sort((a, b) => {
              // Convert the last_updated values to Date objects for comparison
              const dateA = new Date(a.last_updated);
              const dateB = new Date(b.last_updated);
            
              // Sort in descending order (latest first)
              return dateB - dateA;
            });

            console.log('sorted draft', sortedDrafts)

            setDrafts(all_drafts)
            const last_active_draft = all_drafts[0]['id']
            console.log(last_active_draft)
            setActiveDraft(last_active_draft)
          }


        } else {
          console.error('Error:', response);
          setError(true)
          //alert('Your session has seems to have expired, please login again.')
        }
        setLoading(false) 
      } catch (error) {
        alert('')
        setLoading(false) 
        console.error('Error:', error);
      }
    };


    
    fetchData();
    
  }
  //verify the access_token that is in the localStorage
  useEffect(() => {
    
    userInfo()
  }, []);



  

  const [toggleSidebar, setToggleSidebar] = useState(true);

  const handleSidebar = () => {
      setToggleSidebar(!toggleSidebar)
      
  }

  const handleActiveDraft = (newActiveDraft: number) => {
    
    setActiveDraft(newActiveDraft)
  }


  return (
    <div> 

    <DashboardNavbar draftsBar={handleSidebar} />
    {error && <ErrorDialogBox />}
    <div className="flex gap-x-4 py-4 ">

    {/* <Icons.spinner className="h-4 w-4 animate-spin" /> */}
    
        {toggleSidebar && drafts && <div className="sticky top-0 w-1/3 h-screen overflow-y-auto border-r border-solid border-gray-50000"> 
        <Drafts contentChange={handleContent} drafts={drafts} setActiveDraft={handleActiveDraft} createNewDraft = {createNewDraft} activeDraft={activeDraft}/>

        </div>
        }
      <div className="w-full overflow-y-auto mx-10 mt-10">
      {loading ? (
  <LoadingEditor />
) : (
  <EditorContent editor={editor}>
    {editor && <EditorBubbleMenu editor={editor} sendMessage={handleSendMessage} />}
  </EditorContent>
)}

        </div>

        <div className=" sticky top-0 w-1/2  h-screen overflow-y-auto border-l border-solid border-gray-300 p-4"> <div> <CheckPortal sendMessage={handleSendMessage}> </CheckPortal>

        {/* <div dangerouslySetInnerHTML={{ __html: streamedContent }}></div> */}
        <ReactMarkdown  
        


  className="prose"
  
  >{streamedContent}</ReactMarkdown>
        </div> 
        </div>
        
    </div>
    </div>
    
  )
}


export default Tiptap

