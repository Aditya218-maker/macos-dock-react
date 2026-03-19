import React, { useState, useRef } from "react";
import MacWindow from "./MacWindow";

const COMMANDS = {
  help: "Available commands: help, about, skills, clear",
  about: "Hi! I am Aditya Anand, a Full-Stack Engineer.",
  skills: "React, Node.js, PostgreSQL, Docker, AWS",
  clear: null,
};

const Cli = () => {
  const [history, setHistory] = useState([
    { type: "output", text: 'Welcome! Type "help" to see available commands.' },
  ]);

  const inputRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;

    const input = e.target.value.trim().toLowerCase();
    e.target.value = "";

    if (!input) return;

    if (input === "clear") {
      setHistory([]);
      return;
    }

    const output = COMMANDS[input] ?? `Command not found: ${input}`;

    setHistory((prev) => [
      ...prev,
      { type: "input", text: input },
      { type: "output", text: output },
    ]);
  };

  return (
    <MacWindow>
      <div
        className="cli-window"
        onClick={() => inputRef.current?.focus()}
        style={{ fontFamily: "monospace", padding: "10px", cursor: "text" }}
      >
        {history.map((line, i) => (
          <div
            key={i}
            style={{ color: line.type === "input" ? "#00ff00" : "#ffffff" }}
          >
            {line.type === "input" ? `adityaanand:~$ ${line.text}` : line.text}
          </div>
        ))}

        <div style={{ display: "flex" }}>
          <span style={{ color: "#00ff00" }}>adityaanand:~$&nbsp;</span>
          <input
            ref={inputRef}
            onKeyDown={handleCommand}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#00ff00",
              fontFamily: "monospace",
              flex: 1,
            }}
            autoFocus
          />
        </div>
      </div>
    </MacWindow>
  );
};
export default Cli;
