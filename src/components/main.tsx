import { useState } from "react";
import './main.css';


function Main(): JSX.Element {
    const [step, setStep] = useState(0);

    const goForward = () => {
        setStep(step < 3 ? step + 1 : step)
    }

    const goBack = () => {
        setStep(step > 0 ? step - 1 : step)
    }


    return (
        <div className="main">
            <div>
            {step === 0 ? <h1>Step 0</h1> : ""}
            {step === 1 ? <h1>Step 1</h1> : ""}
            {step === 2 ? <h1>Step 2</h1> : ""}
            {step === 3 ? <h1>Step 3</h1> : ""}
            <hr />
            <br />
            <button onClick={goBack}>Back</button>
            <button onClick={goForward}>Forward</button>
            </div>
        </div>
    )
}

export default Main;