import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [lenght, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  //   useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.

  // Note that useRef() is useful for more than the ref attribute. It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.

  const passwordRef = useRef(null);

  // we used useCallback hook  for the better Optimization
  // useCallback(()=>{}(function),[dependenies])
  const passWordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (specialCharAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < lenght; i++) {
      let char = Math.floor(Math.random() * str.length);
      // charAt(pos: number): string --> The zero-based index of the desired character. // Returns the character at the specified index.
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [lenght, numberAllowed, specialCharAllowed, setPassword]);

  // useEffect(setup which is fn, dependencies?)
  // useEffect is a React Hook that lets you synchronize a component with an external system.
  useEffect(() => {
    passWordGenerator();
  }, [lenght, numberAllowed, specialCharAllowed, passWordGenerator]);

  const copyPasswordToClipBoard = useCallback(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 30);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="oulline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipBoard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={lenght}
              className="cursor-pointer"
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            />
            <label>Length: {lenght}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => {
                  return !prev;
                });
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={specialCharAllowed}
              id="specialChar"
              onChange={() => {
                setSpecialCharAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="specialChar">Special Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
