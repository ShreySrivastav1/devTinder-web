import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm , setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() => {
        
        try{
            const res = await axios.post(
                BASE_URL + "/login", {
                emailId,
                password
            },
            {withCredentials: true});
            dispatch(addUser(res.data));
            return navigate("/");
        }catch(err){
            setError(err?.response?.data || "something went wrong");
        }
    }

    const handleSignup = async() => {
        try{
            const res = await axios.post(BASE_URL + "/signUp",
                {
                    firstName,
                    lastName,
                    emailId,
                    password
    },
    {
        withCredentials :true
    });

    dispatch(addUser(res.data.data));
    return navigate("/profile");
    

        }catch(err){
           setError(err?.response?.data || "something went wrong");
        }
    }

    return ( 
    <div className="flex justify-center my-10">
        <div className="card w-96 bg-base-300 card-md shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center">
                    {isLoginForm ? "Login" : "SignUp"}
                    </h2>
                <div>
                    {!isLoginForm && (
                        <>
                        <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input 
                        type="text" 
                        className="input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input 
                        type="text" 
                        className="input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                        </fieldset> 
                        </>
                    )}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email ID</legend>
                        <input 
                        type="text" 
                        className="input"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input 
                            type="password" 
                            className="input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                            </fieldset>
                            </div>
                            <p className="text-red-500">{error}</p>
                            <div className="justify-center card-actions">
                                <button className="btn btn-primary my-4" onClick={isLoginForm ? handleLogin : handleSignup}>
                                    {isLoginForm ? "Login" : "SignUp"}
                                    </button>
                                </div>
                                <p className="" onClick={() => setIsLoginForm((value) => !value)}>
                                    {isLoginForm ? "New User? Sign Up Now!" : "Existing User? Log in Now!"}
                                    </p>
                                </div>
                                </div>
                                </div>
);
};

export default Login;