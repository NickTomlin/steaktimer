import React, {useEffect, useState} from 'react';

import animatedLogo from "./outbackanimated.gif"
import getShockwave from "./getShockwave.gif"
import steak from "./steak.jpeg"
import beer from "./beer.jpg"
import bloominOnion from "./bloomin-onion.jpg"

import './App.css';

const SECONDS_IN_DAY = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60
const steakTime = new Date(2019, 4, 21, 19, 0, 0).getTime()

function getDifference () {
  let now = new Date().getTime();
  let timeRemaining = Math.floor((steakTime - now) / 1000);

  if (timeRemaining < 0) {
    return {days: 0, hours: 0, minutes: 0 , seconds: 0}
  }

  let days = Math.floor(timeRemaining / SECONDS_IN_DAY);
  timeRemaining = (timeRemaining % SECONDS_IN_DAY);

  let hours = Math.floor(timeRemaining / SECONDS_IN_HOUR);
  timeRemaining = (timeRemaining % SECONDS_IN_HOUR);

  let minutes = Math.floor(timeRemaining / SECONDS_IN_MINUTE);
  timeRemaining = (timeRemaining % SECONDS_IN_MINUTE);

  let seconds = Math.floor(timeRemaining);
  return {days, hours, minutes, seconds}
}

function useInterval (fn, timeout = 1000) {
  useEffect(() => {
    const counterInterval = setInterval(fn,  timeout)
    return () => clearInterval(counterInterval)
  })
}

function Counter () {
  const [{ days, hours, minutes, seconds}, setCounter] = useState(getDifference())

  useInterval(() => {
    document.title = `OUTBACK DAY IN ${days} days ${hours} hours ${minutes} ${seconds} seconds`
    setCounter(getDifference())
  })

  return (
    <>
      <div className="counter">
        <span className="segment days">{days} DAYS</span>
        <span className="segment hours">{hours} HOURS</span>
        <span className="segment minutes">{minutes} MINUTES</span>
        <span className="segment seconds">{seconds} SECONDS</span>
      </div>
    </>
  )
}

const greetings = ["NEW! BLOOMIN' FRIED CHICKEN; your little joeys will love it", "Our bloomin' onion lite now only has 3000 calories", "Try our TOOWOOMBA FILET seasoned and seared to perfection. No, I don't actually know how to pronounce that; I'm from boise.", "Roister up some Roasted Garlic Butter Topped Ribeye", "Absolutely No Dollaritas here blokes ", "Help, i'm trapped in a while loop"]
function Marquee () {
  const [idx, setIdx] = useState(0)

  useInterval(() => {
    let newIdx = (idx + 1) % greetings.length
    setIdx(newIdx)
  }, 5000)

  return (
    /* eslint-disable-next-line */
    <marquee className={"marquee"} scrollamount={12}>
      {greetings[idx]}
    </marquee>
  )
}

function Menu () {
  return <div>
    <img src={bloominOnion} alt="Bloomin' Onion"/>
    <img src={beer} alt="Beer MATE"/>
    <img src={steak} alt="DELICIOUS STEAK"/>

    <div>
      <a href="http://web.archive.org/web/19990423035631/http://www.outback.com/menu/index.htm" target="_blank" rel="noopener noreferrer">See the menu</a>
    </div>
  </div>
}

function App() {
  return (
    <>
      <Marquee />
      <div className="wrapper">
        <header className="header">
          <img src={animatedLogo} className={"logo"} alt="OUTBACK STEAKHOUSE"/>
        </header>
        <h1 className={"title"}>Outback Day</h1>

        <main className="section content">
          <Counter />
        </main>

        <div className="section menu">
          <Menu />
        </div>

        <footer className="footer">
          <img src={getShockwave} alt="Get Shockwave"/>
        </footer>
      </div>
    </>
  );
}

export default App;
