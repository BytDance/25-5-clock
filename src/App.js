import React, { useRef, useState, useEffect } from 'react';
import './App.css';


function App() {

    const defaultTimer = 1500;
    const defaultSessionLength = 25;
    const defaultBreakLength = 5;
    const breakLable = "BREAK";
    const sessionLable = "SESSION";
    const t = 1000;

    const [seconds, setSeconds] = useState(defaultTimer);
    const [breakLength, setBreakLength] = useState(defaultBreakLength);
    const [sessionLength, setSessionLength] = useState(defaultSessionLength);
    const [currentLable, setCurrentLable] = useState(sessionLable);
    const [play, setPlay] = useState(false);
    var timeoutId = null;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const mm = minutes.toString().padStart(2, '0');
    const ss = remainingSeconds.toString().padStart(2, '0');
    const audioURL = useRef(null);

        
    useEffect(() => {
        timeoutId = setTimeout(() => {
            const audio = audioURL.current;
            audio.currentTime = 0;
            if (play) {

                if (seconds == 0) {
                    audio.currentTime = 0;
                    audio.play();
                    if (currentLable == breakLable) {
                        setSeconds(sessionLength * 60);
                        setCurrentLable(sessionLable);
                    }
                    else if (currentLable == sessionLable) {
                        setSeconds(breakLength * 60);
                        setCurrentLable(breakLable);
                    }
                }
                else
                {
                    setSeconds(seconds - 1);
                }
            }
            else {
                clearTimeout(timeoutId);
            }
        }, t);
        
    }, [play, seconds]);
    



    function onReset() {
     
        const audio = audioURL.current;
        audio.pause();
        audio.currentTime = 0;

        clearTimeout(timeoutId);
        setBreakLength(defaultBreakLength);
        setSeconds(defaultTimer);
        setSessionLength(defaultSessionLength);
        setCurrentLable(sessionLable);
        setPlay(false);
    }

    function onBreakDec() { if (breakLength > 1) { setBreakLength(breakLength - 1); } }
    function onBreakInc() { if (breakLength < 60) { setBreakLength(breakLength + 1); } }

    function onSessionDec() { if (sessionLength > 1) { setSessionLength(sessionLength - 1); setSeconds(seconds - 60);} }
    function onSessionInc() { if (sessionLength < 60) { setSessionLength(sessionLength + 1); setSeconds(seconds + 60); } }

    
    function switchPlay() {
        if (play) { clearTimeout(timeoutId);} setPlay(!play);
    }
   


  return (
    <div className="App">
          <div className="App-container">
              <div className="col1">

                  <div id="break-label">Break length</div>
                  <div className="break">
                        <button id="break-decrement" onClick={ onBreakDec }>decrement</button>
                        <div id="break-length">{breakLength}</div>
                        <button id="break-increment" onClick={onBreakInc}>increment</button>
                  </div>
              </div>
              <div className="col2">
                  <div id="session-label">Session length</div>
                  <div className="session">
                      <button id="session-decrement" onClick={onSessionDec}>decrement</button>
                      <div id="session-length">{sessionLength}</div>
                      <button id="session-increment" onClick={onSessionInc}>increment</button>
                  </div>
              </div>
              
          </div>
          <div className="display">
              <div id="timer-label" >{currentLable}</div>
              <audio ref={audioURL} id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
              <div id="time-left" ><h3>{mm}:{ss}</h3></div>
              <button id="start_stop" onClick={switchPlay}> start-stop</button>
              <button id="reset" onClick={onReset}> reset</button>
          </div>
    </div>
  );
}

export default App;
