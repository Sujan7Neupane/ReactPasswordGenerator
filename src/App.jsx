import { useEffect, useState } from "react";
import "./App.css";
import { useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(7);
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [finalPass, setFinalPass] = useState("");

  const copyBtn = useRef(null);

  const PasswordGenerator = useCallback(() => {
    if (!isNumAllowed && !isCharAllowed) {
      alert("Please select at least one option (Numbers or Characters).");
      return;
    }

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let characters = "~!#$%^&*()+_`?@";

    if (isNumAllowed) str += numbers;
    if (isCharAllowed) str += characters;

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }

    setFinalPass(pass);
    console.log(pass);
  }, [length, isNumAllowed, isCharAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(finalPass);
    copyBtn.current?.select();
    // alert("The password has been generated successfully!");
  };

  useEffect(() => {
    PasswordGenerator();
  }, [length, isNumAllowed, isCharAllowed]);

  return (
    <>
      <div className="main-section">
        <div className="wrapper">
          <h2>Password Generator</h2>
          <div className="input-wrapper">
            <input type="text" ref={copyBtn} value={finalPass} readOnly />
            <button className="copyBtn" onClick={copyPasswordToClipboard}>
              Copy
            </button>
          </div>

          <div className="input-wrapper-range">
            <input
              type="range"
              min={5}
              max={20}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: ({length})</label>
          </div>

          <div className="input-wrapper">
            <input
              type="checkbox"
              name="num"
              id="num"
              onChange={() => setIsNumAllowed((prevVal) => !prevVal)}
            />
            <label htmlFor="num">Number</label>
          </div>

          <div className="input-wrapper">
            <input
              type="checkbox"
              name="char"
              id="char"
              onChange={() => setIsCharAllowed((prevVal) => !prevVal)}
            />
            <label htmlFor="char">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
