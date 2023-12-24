"use client"

import React, { createContext, useContext, useState } from 'react';

export const StreamedContentContext = createContext<{
  streamedContent: string;
  setStreamedContent: React.Dispatch<React.SetStateAction<string>>;
}>({
  streamedContent: '',
  setStreamedContent: () => {},
});

export const useStreamedContent = () => {
  return useContext(StreamedContentContext);
};

export const StreamedContentProvider: React.FC = ({ children }) => {
  const [streamedContent, setStreamedContent] = useState('');

  return (
    <StreamedContentContext.Provider value={{ streamedContent, setStreamedContent }}>
      {children}
    </StreamedContentContext.Provider>
  );
};