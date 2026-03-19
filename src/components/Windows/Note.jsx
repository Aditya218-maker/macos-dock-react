import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import MacWindow from "./MacWindow";
import { atelierDuneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./note.scss";
//react-syntax-highlighter
import SyntaxHighlighter from "react-syntax-highlighter";
//this code in note.txt is in markdown format to render in react install package npm i react-markdown

const Note = ({windowName, setWindowsState}) => {
  const [markdown, setmarkdown] = useState(null);

  useEffect(() => {
    fetch("/note.txt")
      .then((res) => res.text())
      .then((text) => setmarkdown(text));
  }, []);

  return (
    <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
      <div className="note-window">
        {markdown ? <SyntaxHighlighter language='typescript' style={atelierDuneDark}>{markdown}</SyntaxHighlighter> : <p>Loading...</p>}
      </div>
    </MacWindow>
  );
};

export default Note;
