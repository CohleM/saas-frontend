"use client";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import * as React from "react";
//import { Shell } from "@acme/components/shells/shell"
import { Tree, TreeDataItem } from "@/components/treeview";
import { Workflow, Folder, Layout } from "lucide-react";

const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages1",
    children: [
      {
        id: "d1",
        name: "Alice",
        children: [
          { id: "d11", name: "Alice2", icon: Layout },
          { id: "d12", name: "Bob2" },
          { id: "d13", name: "Charlie2" },
        ],
      },
      { id: "d2", name: "Bob", icon: Layout },
      { id: "d3", name: "Charlie" },
    ],
  },
  {
    id: "5",
    name: "Direct Messages2",
    children: [
      {
        id: "e1",
        name: "Alice",
        children: [
          { id: "e11", name: "Alice2", path: "./Campbell_2021.pdf" },
          { id: "e12", name: "Bob2" },
          { id: "e13", name: "Charlie2" },
        ],
      },
      { id: "e2", name: "Bob" },
      { id: "e3", name: "Charlie" },
    ],
  },
  {
    id: "6",
    name: "Direct Messages3",
    children: [
      {
        id: "f1",
        name: "Alice",
        children: [
          { id: "f11", name: "Alice2" },
          { id: "f12", name: "Bob2" },
          { id: "f13", name: "Charlie2", path: "./Calusic_2022.pdf" },
        ],
      },
      { id: "f2", name: "Bob" },
      { id: "f3", name: "Charlie" },
    ],
  },
];

interface DocsType {
  uri: string;
  fileType: string;
}

export default function IndexPage() {
  const [content, setContent] = React.useState("./Calusic_2022.pdf");

  const [activeDocument, setActiveDocument] = React.useState();

  const docs = [
    {
      uri: "./Calusic_2022.pdf",
      fileType: "pdf",
    },
    {
      uri: "./Campbell_2021.pdf",
      fileType: "pdf",
    },
  ];

  const handleTreeViewSelect = (item: TreeDataItem | undefined) => {
    if (item && item.path) {
      docs.forEach((element) => {
        if (element.uri == item.path) {
          setActiveDocument(element); // Set the content to the path
        }
      });
      // Check if the selected item has a path property
    }
  };

  // const docs = content
  //   ? [
  //       {
  //         uri: content,
  //         fileType: "pdf",
  //       },
  //     ]
  //   : []; // Load the content dynamically

  // const handleDocumentChange = (document) => {
  //   setActiveDocument(document);
  // };

  return (
    <div>
      <div className="fixed left-0 bottom-0 top-28 w-1/2 h-screen">
        <Tree
          data={data}
          className=" w-1/3 h-full border-[1px]"
          initialSlelectedItemId="f13"
          onSelectChange={handleTreeViewSelect}
          folderIcon={Folder}
          itemIcon={Workflow}
        />
      </div>
      <div className="flex items-center justify-center space-x-16 mt-20  ">
        <div className="w-1/2 h-full">
          <DocViewer
            documents={docs}
            activeDocument={activeDocument}
            // onDocumentChange={handleDocumentChange}
          />
        </div>
      </div>
    </div>
  );
}
