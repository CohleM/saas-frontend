//./components/EditorTools.js
import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
export const EDITOR_TOOLS = {
  code: Code,
  header: {
    class: Header,
    inlineToolbar : true
  }, 
  paragraph: Paragraph,
};
