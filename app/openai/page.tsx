"use client"


import React, { FC, useEffect, useState } from "react";

interface IResponseObject {
    role: string;
    content: string;
}

const ChatGPT: FC = () => {
    const [response, setResponse] = useState<IResponseObject>({ role: "", content: "" });

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:8000/file/chatgpt/");

        eventSource.onmessage = (event) => {
            const responseObject = JSON.parse(event.data);

            setResponse((prev: IResponseObject) => {
                const responseObjectRole = responseObject["role"] || "";
                const responseObjectContent = responseObject["content"] || "";
                const combinedObject = {
                    role: prev.role + responseObjectRole,
                    content: prev.content + responseObjectContent,
                };
                return combinedObject;
            });
        };

        eventSource.onerror = (error) => {
            console.log("Error with SSE connection:", error);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            {response ? (
                <div><pre>{response.content}</pre></div>
            ) : (
                <p>Loading chatGPT response...</p>
            )}
        </div>
    );
};

export default ChatGPT;