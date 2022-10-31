import "./App.css";
import { useState } from "react";
import {upperCaseLetters, lowerCaseLetters, numbers, special} from './data';
import Modal from "./Modal";

function App() {
      const [password, setPassword] = useState("");
      const [counter, setCounter] = useState(6);
      const [isUppercase, setIsUppercase] = useState(false);
      const [isLowercase, setIsLowercase] = useState(false);
      const [isNumber, setIsNumber] = useState(false);
      const [isSymbol, setIsSymbol] = useState(false);
      const [modal, setModal] = useState({
        title: "",
        show: false,
        message: "",
      })

      const increaseCounter = (e) => {
        e.preventDefault();
        if(counter < 20) {
            setCounter((prevCounter) => prevCounter + 1);
        }
      };

      const decreaseCounter = (e) => {
        e.preventDefault();
        if(counter > 6) {
            setCounter((prevCounter) => prevCounter - 1);
        }
      }

    const generatePassword = (e) => {
        e.preventDefault();

        let _password = "";

        for (let i = 0; i < counter; i++) {
            _password += getRandom();
        }

        setPassword(_password);
    }

    const getRandom = () => {
        const chars = [];

        if (isUppercase) {
            chars.push(
                upperCaseLetters[
                    Math.floor(Math.random() * upperCaseLetters.length)
                ]
            );
        }

        if (isLowercase) {
            chars.push(
                lowerCaseLetters[
                    Math.floor(Math.random() * lowerCaseLetters.length)
                ]
            );
        }

        if (isNumber) {
            chars.push(numbers[Math.floor(Math.random() * numbers.length)]);
        }

        if (isSymbol) {
            chars.push(special[Math.floor(Math.random() * special.length)]);
        }

        if (chars.length === 0) return "";

        return chars[Math.floor(Math.random() * chars.length)];
    };

    const createCopy = () => {
        const textAreaEl = document.createElement("textarea");

        textAreaEl.innerText = password;
        document.body.appendChild(textAreaEl);
        textAreaEl.select();
         document.execCommand("copy");
         textAreaEl.remove();
    };

    const copyPasswordHandler = (e) => {
        e.preventDefault();

        if(password.trim().length === 0) {
            setModal({
                title: "Error",
                message: "There is nothing",
                show: true,
            });
        } else {
            setModal({
                title: "Succes", 
                message: "Password successfully copied ot clipboard",
                show: true,
            });
        }
        createCopy();
    }; 

    const closeMOdalHandler = () => {
        setModal({...modal, show: false })
    }

    return (
        <div className="App">
            {modal.show && (
                <Modal
                    onClose={closeMOdalHandler}
                    title={modal.title}
                    message={modal.message}
                />
            )}
            <div className="generator">
                <h2 className="generator__title"> Password Generator</h2>
                <h4 className="password">{password}</h4>

                {/* The heading tex   </div>t is large */}

                <form className="generator__form">
                    <div className="generator__form-controls">
                        <div className="generator__form-control">
                            <label htmlFor="uppercase">Uppercase</label>
                            <input
                                checked={isUppercase}
                                onChange={(e) =>
                                    setIsUppercase(e.target.checked)
                                }
                                type="checkbox"
                                id="uppercase"
                                name="uppercase"
                            />
                        </div>

                        <div className="generator__form-control">
                            <label htmlFor="lowercase">Lowercase</label>
                            <input
                                checked={isLowercase}
                                onChange={(e) =>
                                    setIsLowercase(e.target.checked)
                                }
                                type="checkbox"
                                id="Lowercase"
                                name="Lowercase"
                            />
                        </div>
                        <div className="generator__form-control">
                            <label htmlFor="numbers">Numbers</label>
                            <input
                                checked={isNumber}
                                onChange={(e) => setIsNumber(e.target.checked)}
                                type="checkbox"
                                id="Numbers"
                                name="Numbers"
                            />
                        </div>
                        <div className="generator__form-control">
                            <label htmlFor="symobols">Symbols</label>
                            <input
                                checked={isSymbol}
                                onChange={(e) => setIsSymbol(e.target.checked)}
                                type="checkbox"
                                id="symbols"
                                name="symbols"
                            />
                        </div>

                        <div className="generator__length">
                            <h4 className="generator__length-title">
                                Password Length
                            </h4>
                            <div className="generator__length-counter">
                                <button conClick={decreaseCounter}>-</button>
                                <span>{counter}</span>
                                <button onClick={increaseCounter}>+</button>
                            </div>
                        </div>

                        <div className="generator__form-actions">
                            <button
                                onClick={generatePassword}
                                className="btn generate-btn"
                            >
                                Generate Password
                            </button>
                            <button
                                onClick={copyPasswordHandler}
                                className="btn copy-btn"
                            >
                                Copy Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
