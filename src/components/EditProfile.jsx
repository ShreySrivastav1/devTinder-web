import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [about, setAbout] = useState(user?.about || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const saveProfile = async() => {
        setError("")
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit",

                { firstName, lastName, age, gender, about, photoUrl },
                { withCredentials: true });

            dispatch(addUser(res.data.data));    
            
        }catch (err) {
            setError(err.response.data);
        }
    };

    return (
    <div className="flex justify-center items-start gap-10 my-10 mb-32">

        {/* Edit Form */}
        <div className="card w-96 bg-base-300 shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center">Edit profile</h2>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input 
                        type="text"
                        className="input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input 
                        type="text"
                        className="input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender</legend>
                    <input 
                        type="text"
                        className="input"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Age</legend>
                    <input 
                        type="text"
                        className="input"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">About</legend>
                    <input 
                        type="text"
                        className="input"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Photo URL</legend>
                    <input 
                        type="text"
                        className="input"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                </fieldset>

                <p className="text-red-500">{error}</p>

                <div className="card-actions justify-center">
                    <button className="btn btn-primary my-4" onClick={saveProfile}>
                        Save Profile
                    </button>
                </div>
            </div>
        </div>

        {/* Live Preview Card */}
        <div className="w-96">
            <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
        </div>

    </div>
);


}

export default EditProfile;