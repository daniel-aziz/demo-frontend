import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// define patient type for react useForm hook
type Patient = {
    gender: String;
    age: Number;
    language: String;
    surgery: String;
};


function Main(): JSX.Element {

    // API PORT
    const API_PORT = 5000;

    // max number of pages (inputs)
    const MAX_PAGE = 4;

    // State for inputs
    const [genders, setGenders] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [surgeries, setSurgeries] = useState([]);

    // page stage state
    const [page, setPage] = useState(1);

    // show info state 
    const [showInfo, setShowInfo] = useState(false);

    // patient info submited state
    const [patientInfo, setPatientInfo] = useState({ gender: "", age: 0, language: "", surgery: "" })

    // uuid for keys
    const { v4: uuidv4 } = require('uuid');

    // component initilazing
    useEffect(() => {
        axios.get("http://localhost:" + API_PORT + "/api/datas")
            .then((response) => {
                setGenders(response.data[0]["genders"])
                setLanguages(response.data[0]['languages'])
                setSurgeries(response.data[0]['surgeries'])
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    // register form
    const { register, handleSubmit, reset } = useForm<Patient>();

    // submit form
    const onSubmit: SubmitHandler<Patient> = (data) => {
        axios.post("http://localhost:" + API_PORT + "/api/patient", data)
            .then((response) => {
                setPatientInfo(response.data)
                setShowInfo(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // handle forward button
    const goForward = () => {
        if (page < MAX_PAGE) setPage(prevPage => prevPage + 1);
    }

    // reset form
    const restPage = () => {
        setPage(1)
        reset({})
        setShowInfo(false)
    }

    // return input element to the compenent based on the pageState
    function returnInput(): JSX.Element {
        switch (page) {
            case 1:
                return (
                    <div>
                        <label htmlFor="gender">Gender:</label>
                        <br /><br />
                        <select
                            id="gender" name="gender"
                            {...register("gender")}>
                            <option value="" disabled selected hidden>Please Choose...</option>
                            {genders.map(item =>
                                <option key={uuidv4()} value={item}>{item}</option>
                            )}
                        </select>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <label htmlFor="age">Age:</label>
                        <br /><br />
                        <input
                            id="age" name="age"
                            type="number" placeholder="Age"
                            {...register("age")} />
                    </div>
                )
            case 3:
                return (
                    <div>
                        <label htmlFor="language">Language:</label>
                        <br /><br />
                        <select
                            id="language" name="language"
                            {...register("language")}>
                            <option value="" disabled selected hidden>Please Choose...</option>
                            {languages.map(item =>
                                <option key={uuidv4()} value={item}>{item}</option>
                            )}
                        </select>
                    </div>
                )
            case 4:
                return (
                    <div>
                        <label htmlFor="surgery">Surgery:</label>
                        <br /><br />
                        <select
                            id="surgery" name="surgery"
                            {...register("surgery")}>
                            <option value="" disabled selected hidden>Please Choose...</option>
                            {surgeries.map(item =>
                                <option key={uuidv4()} value={item}>{item}</option>
                            )}
                        </select>
                    </div>
                )
            default:
                break;
        }
    }

    // retunt patient info to view
    function returnPatientInfo(): JSX.Element {
        if (showInfo) return (
            <div style={{ marginLeft: "20px" }}>
                <h1>Your Infomation: </h1>
                <span> Gender: {patientInfo.gender}</span>  <br />
                <span> Age: {patientInfo.age}</span>  <br />
                <span> Language: {patientInfo.language}</span>  <br />
                <span> Surgery: {patientInfo.surgery}</span>  <br />
                <br />
                <br />
            </div>
        )
    }

    // component
    return (
        <div className="main">
            <div className="formHolder">
                <div style={{ marginLeft: "20px" }} >

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Personal Infomation: </h1>
                        <br />
                        {returnInput()}
                        <br />
                        <div>
                            {page < MAX_PAGE && <button type="button" onClick={goForward}>Forward</button>}
                            {page === MAX_PAGE && <button style={{ background: "green" }} type="submit" >Submit</button>}
                            <button style={{ marginTop: '10px', background: "red" }} onClick={restPage} type="reset">Reset</button>
                        </div>
                        <br />
                        <br />
                    </form>
                    <br />
                    {returnPatientInfo()}
                </div>
            </div>
        </div>
    )
}


export default Main;