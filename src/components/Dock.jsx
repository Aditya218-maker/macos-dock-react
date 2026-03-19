import React from "react";
import "./dock.scss";
const Dock = ({ WindowsState, setWindowsState }) => {
  return (
    <footer className="dock">
      <div
        onClick={() => {
          setWindowsState((state) => ({ ...state, github: true }));
        }}
        className="icon github"
      >
        <img src="/doc-icons/github.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowsState((state) => ({ ...state, note: true }));
        }}
        className="icon note"
      >
        <img src="/doc-icons/note.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowsState((state) => ({ ...state, resume: true }));
        }}
        className="icon pdf"
      >
        <img src="/doc-icons/pdf.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowsState((state) => ({ ...state, calender: true }));
        }}
        className="icon calender"
      >
        <img src="/doc-icons/calender.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowsState((state) => ({ ...state, cli: true }));
        }}
        className="icon cli"
      >
        <img src="/doc-icons/cli.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowsState((state) => ({ ...state, link: true }));
        }}
        className="icon link"
      >
        <img src="/doc-icons/link.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowsState((state) => ({ ...state, mail: true }));
        }}
        className="icon mail"
      >
        <img src="/doc-icons/mail.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowsState((state) => ({ ...state, spotify: true }));
        }}
        className="icon spotify"
      >
        <img src="/doc-icons/spotify.svg" alt="" />
      </div>
    </footer>
  );
};

export default Dock;
