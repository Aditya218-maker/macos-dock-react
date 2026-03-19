import { useState, useEffect } from "react";

const DateTime = () => {
  //ye date time baar baar rendder krta rehta hai use rokene k liye we use useffect
  //now mein current date aur time store hoti hai. Jaise abhi now = Mon 17 Mar 6:05PM hai.
  const [now, setNow] = useState(new Date());

  //useeffect aapko kisi b funct ko call krne me help krta hai agar aap chahte ho ki koi effect apne aap chale
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []); //empty dependency array menas Runs fn once after component first renders ye sirf useeefct ko control krega setinterval ko nhi yaani sirf useeffct ek bar chalao yaani timer chalu karo 1 baar aur setinterval timer update krega
  // Component pehli baar load hote hi useEffect ek baar chalta hai aur setInterval shuru ho jaata hai. Ab ye timer independently har 1 second mein now ko update karta rehta hai.
  //depenedency matlab wo cheez jiske change hone pe useeffect wla func chalega aur jab jab ye depenedecy change hogi andr wle func k elements change honge
  //react ka main kaam hai ui banana aur usme data insert krna is a side stack like tv on hua is a main process aur usme news chalna is a side stack
  //side stack jaise koi async process krna hai, api call krna, set timeout, setinterval banana
  //hame cahiye u\ye side wle kaam side by side acche se chalte rahe
  // So flow kuch aisa hai:
  // ```
  // DateTime screen pe aaya
  //         ↓
  // useEffect ek baar chala
  //         ↓
  // setInterval shuru hua  ← ye ab independently kaam karta hai
  //         ↓
  // har 1 second mein setNow(new Date()) chalta hai
  //         ↓
  // "now" badalta hai → screen update hoti hai
  //         ↓
  // har 1 second mein yahi hota rehta hai...

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // now ek variable hai jo poori current date aur time apne andar rakhta hai.
  //Aur us ek now object se alag alag cheezein nikaal sakte ho:
  // now.getDay()    →  current day deta hai    (number mein)
  // now.getDate()   →  current date deta hai   (jaise 17)
  // now.getMonth()  →  current month deta hai  (number mein)
  // now.getHours()  →  current hours deta hai  (jaise 14)
  // now.getMinutes() → current minutes deta hai (jaise 30)
  //`now` ek **diary** ki tarah hai jisme sab likha hua hai. Aur ye saari methods jaise `getDay()`, `getMonth()` us diary ke **alag alag pages** hain.

  const day = days[now.getDay()]; //JavaScript numbers deta hai, hume naam chahiye=>  now.getDay() : 0, 1, 2, 3, 4, 5, 6  deta hai. Toh agar aaj Monday hai toh getDay() 1 dega, "Mon" nahi.
  const date = now.getDate(); //Date ke liye array ki zarurat nahi kyunki hume `16` hi display karna hai
  const month = months[now.getMonth()];

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  // now.getMinutes()   →  minutes ka number deta hai, jaise 5
  // .toString()        →  number ko text bana deta hai, "5"
  // .padStart(2, "0")  →  agar 1 digit hai toh aage "0" lagao, "05"
  // Kyun `padStart`? Kyunki bina iske aisa dikhega:
  // 6:5 PM   ❌
  // 6:05 PM  ✅

  const ampm = hours >= 12 ? "PM" : "AM";
  // Ye ek simple condition hai:
  // agar hours 12 ya usse zyada hai  →  "PM"
  // agar hours 12 se kam hai         →  "AM"
  // Jaise:
  // hours = 14  →  14 >= 12  →  "PM"  ✅
  // hours = 9   →  9 >= 12   →  "AM"  ✅

  hours = hours % 12 || 12;
  //% 12 ka matlab hai — 12 se divide karo aur **bacha hua** (remainder) lo:
  // 13 % 12 = 1   →  1 PM  ✅
  // 14 % 12 = 2   →  2 PM  ✅
  // 0  % 12 = 0   →  yahan bhi problem! 0 AM? ❌
  // Isliye `|| 12` lagaya — matlab agar result `0` aaye toh `12` use karo:
  // 12 % 12 = 0  →  0 || 12  =  12 PM  ✅

  const formatted = `${day}  ${date} ${month} ${hours}:${minutes}${ampm}`;

  return <div>{formatted}</div>; //Jo string bani formatted mein, usse screen pe dikhao.
};

export default DateTime;
