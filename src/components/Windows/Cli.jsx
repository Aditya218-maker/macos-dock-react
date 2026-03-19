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

{
  /*
1. const [history, setHistory] = useState([
  { type: 'output', text: 'Welcome! Type "help" to see available commands.' }
])

Toh history ek list hai jisme objects hain — aur har object mein type aur text hai.

Jab terminal **pehli baar khulega**, screen pe ye dikhega: Welcome! Type "help" to see available commands.

Aur ye white color mein hoga kyunki type: 'output' hai.

Agar type: 'input' hota toh? js{ type: 'input', text: 'Welcome! Type "help"...' }
Tab ye green hota aur aage adityaanand:~$ bhi lag jaata — jo bilkul galat lagta kyunki ye toh terminal ka apna welcome message hai, user ne nahi likha!

Agar starting mein koi text nahi dikhana toh: const [history, setHistory] = useState([])
 
2.Terminal mein ek kaam karna hai —
Kaheen bhi click karo terminal window mein, cursor automatically input box mein aa jaaye

Toh hume input box ko directly control karna padega — useRef isi kaam aata hai.

useRef kya hota hai?  => const inputRef = useRef(null)

Ye ek remote control banata hai — jis cheez pe lagao, usse directly control kar sako.
Abhi null hai kyunki abhi koi cheez se connected nahi hai — baad mein input box se connect hoga:

eg: <div onClick={() => inputRef.current?.focus()}>
Jab bhi terminal pe click karo: inputRef.current → wo actual input box hai
.focus() → us box pe cursor le aao


3. const handleCommand = (e) => {

    if (e.key !== 'Enter') return

    const input = e.target.value.trim().toLowerCase()
    e.target.value = '' 

    if (!input) return

    if (input === 'clear') {
      setHistory([])
      return
    }

(e) kya hai?:  e matlab event — jab bhi user koi key dabata hai, React automatically ye e object bhejta hai jisme info hoti hai:
-> Kaunsi key dabayi?
-> Input box mein kya likha tha?

#Line 1 — Sirf Enter pe kaam karo: if (e.key !== 'Enter') return

Har key press pe ye function chalta hai — a dabao, b dabao, sab pe.

Toh ye line bolti hai:
Agar Enter nahi dabaya — wapas jaao, kuch mat karo
Sirf Enter dabane pe aage ka code chalega.

#Line 2 — Input saaf karo: const input = e.target.value.trim().toLowerCase()

e.target → wo input box hai
.value → usme jo likha hai wo text

Phir usse clean karte hain:
.trim()   ->   Aage peeche ke spaces hatao — "  help  " → "help"
.toLowerCase()  ->  Sab small karo — "HELP" → "help"

Kyunki HELP, Help, help — teeno same command hain!

# Line 3 — Box khali karo : e.target.value = ''
Enter dabate hi input box saaf ho jaata hai — next command ke liye ready.

Box = Input Field — wo jagah jahan user type karta hai terminal mein
Ye wala element:
jsx<input  // ← YAHI HAI "BOX"
  ref={inputRef}
  onKeyDown={handleCommand}
  style={{ background: 'transparent', border: 'none', color: '#00ff00' }}
/>

e.target kya hai?
Jab user box mein type karke Enter dabata hai — e.target us box ko hi point karta hai
jse.target       // = wo input box element
e.target.value // = us box mein jo TEXT likha hai



So:-
const input = e.target.value.trim().toLowerCase()

Simple bhasha mein:

e.target.value        →  box mein jo likha hai wo nikalo  →  "  HELP  "
.trim()               →  spaces hatao                     →  "HELP"
.toLowerCase()        →  small karo                       →  "help"
input                 →  is clean text ko yahan store karo

Phir : e.target.value = ''
box mein jo likha tha  →  saaf kardo  →  ""
  
Line 4 — Kuch likha hi nahi? : if (!input) return
Agar user ne sirf Enter dabaya — kuch likha nahi — toh ignore karo.
!input matlab — input empty hai ""

Line 5 — Clear command  :  if (input === 'clear') {
  setHistory([])
  return
}

Agar user ne `clear` likha toh:
- `setHistory([])` → history ko **empty array** bana do
- Screen saaf! Sab lines chali gayi
- `return` → aage ka code mat chalao


4.const output = COMMANDS[input] ?? `Command not found: ${input}`

Yaad hai ye wala object?

const COMMANDS = {
  help:   'Available commands: help, about, skills, clear',
  about:  'Hi! I am Aditya Anand...',
  skills: 'React, Node.js...',
  clear:  null,
}

Toh `COMMANDS[input]` matlab — input ko key ki tarah use karo aur value nikalo

input = "help"
COMMANDS["help"]  →  'Available commands: help, about, skills, clear

input = "help" — mila!'Available commands...'
input = "xyz" — nahi mila!'Command not found: xyz'


5.setHistory(prev => [...prev,
      { type: 'input',  text: input  },
      { type: 'output', text: output },
  ])

prev = pehle se jo history thi — purani saari lines

...prev = wo saari lines waise rakho — kuch mat hatao


Phir 2 nayi lines add karo:

{ type: 'input',  text: "help" }              ← user ne jo likha
{ type: 'output', text: "Available commands..." } ← terminal ka jawab

### Real example dekho

User ne `help` likha — Enter dabaya:

Pehle history thi:
[ Welcome! Type "help"... ]

Ab history ban gayi:
[ Welcome! Type "help"...     ]   ← prev (purani)
[ adityaanand:~$ help         ]   ← naya input  🟢
[ Available commands: help... ]   ← naya output ⚪


setHistory(prev => [...prev]:-

setHistory(prev => [...prev])        // ye bhi chalega
setHistory(purani => [...purani])    // ye bhi chalega
setHistory(abc => [...abc])          // ye bhi chalega

React bas itna jaanta hai ki — jo bhi naam rakho, usme current history de dunga
prev = pehle se jo history thi — matlab jo screen pe already dikh raha tha
Jab `setHistory` call karte hain — React automatically **current history** `prev` mein de deta hai


Cli Function — Nutshell 🥜
Kya kiya humne?
1. history banaya      → screen pe dikhne wali saari lines ka record

2. inputRef banaya     → input box ka remote control

3. handleCommand banaya → jab user Enter dabaaye tab:
                          - input clean karo
                          - dictionary mein dhundho
                          - history update karo

Kyun kiya?
Ek working terminal banana tha jisme:
User type kare   →   Enter dabaaye   →   Jawab mile
Bas yahi tha poora kaam —

Data manage karo useState se, box control karo useRef se, logic likho handleCommand mein

const Cli = () => {

  // ← YAHAN logic hota hai (dimag)
  const [history, setHistory] = useState([...])
  const inputRef = useRef(null)
  const handleCommand = (e) => { ... }

  return (
    // ← YAHAN screen dikhti hai (chehra)
    <MacWindow>
      ...
    </MacWindow>
  )
}

Isliye React mein rule hai
Har component mein ek return hoga — jo bhi screen pe dikhana hai wo wahan likhो



##Ab JSX mein in sab ko screen pe dikhayenge 🖥️


Part 1 — Main Wrapper Div

<div
  className="cli-window"
  onClick={() => inputRef.current?.focus()}
  style={{ fontFamily: 'monospace', padding: '10px', cursor: 'text' }}
>
className="cli-window" -> CSS ke liye naam
onClick={() => inputRef.current?.focus()}Kaheen bhi click karo — cursor input box mein aa jaaye


Part 2 — History ki Lines

{history.map((line, i) => (
  <div key={i} style={{ color: line.type === 'input' ? '#00ff00' : '#ffffff' }}>
    {line.type === 'input' ? `adityaanand:~$ ${line.text}` : line.text}
  </div>
))}


history.map(...)
Yaad hai ye wala? : const [history, setHistory] = useState([...])
Humne khud banaya tha — screen ki saari lines ka record — bas wahi use ho raha hai yahan!

history.map((line, i) => (...)) ->  .map ek JavaScript ka built-in function hai — list ki har item pe kaam karo

eg: history = [
  { type: 'output', text: 'Welcome!' },
  { type: 'input',  text: 'help'     },
  { type: 'output', text: 'Available commands...' },
]
har item ke liye ek div banao → 3 divs ban gaye screen pe!

line: history.map((line, i) => (...))

line — humne khud rakha naam — matlab ek baar mein ek item

pehli baar  →  line = { type: 'output', text: 'Welcome!' }
doosri baar →  line = { type: 'input',  text: 'help'     }
teesri baar →  line = { type: 'output', text: 'Available...' }

i : history.map((line, i) => (...))
i = index — automatically milta hai .map se — 0, 1, 2, 3...

key={i} : <div key={i}>

React ko har div ka ek unique pehchaan chahiye — isliye number de diya
Bina key ke React confuse ho jaata hai ki kaunsa div kaunsa hai

Color wala part:
style={{ color: line.type === 'input' ? '#00ff00' : '#ffffff' }}

line.type === 'input'  →  green  🟢  #00ff00
line.type === 'output' →  white  ⚪  #ffffff


{line.type === 'input' ? `adityaanand:~$ ${line.text}` : line.text}

input  →  "adityaanand:~$ help"      ← $ prefix lagao
output →  "Available commands..."    ← seedha text dikhao

Part 3 — Input Row

<div style={{ display: 'flex' }}>
  <span style={{ color: '#00ff00' }}>adityaanand:~$&nbsp;</span>
  <input
    ref={inputRef}
    onKeyDown={handleCommand}
    style={{
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#00ff00',
      fontFamily: 'monospace',
      flex: 1
    }}
    autoFocus
  />
</div>


Line 1: <div style={{ display: 'flex' }}

Yaad hai history wali lines? Wo sab upar upar dikh rahi thi — ek ke neeche ek
Ye div sabse neeche hai — jahan user type karta hai
display: flex — iske andar jo bhi hai wo side by side rakho:
[adityaanand:~$]  [input box]
     ↑                 ↑
   span            input element
  side by side dono!

Line 2: <span style={{ color: '#00ff00' }}>adityaanand:~$&nbsp;</span>
Yaad hai history mein ye karte the?
jsx`adityaanand:~$ ${line.text}`
```

Wahan **purani lines** ke liye `$` prefix lagate the

Yahan **neeche wali input row** ke liye same `$` ek `span` mein likha hai — taaki user ko pata chale ki yahan type karna hai

`&nbsp;` — `$` ke baad ek space — warna `$` aur jo user type kare wo chipak jaayega:
```
adityaanand:~$help   ← bina space ke (bura lagta)
adityaanand:~$ help  ← space ke saath (acha lagta)



*/
}
