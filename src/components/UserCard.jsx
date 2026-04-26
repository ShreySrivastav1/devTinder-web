import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender, about, photoUrl} = user;
    const dispatch = useDispatch();

    const handleSendRequest = async(status,_id) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {},{
                withCredentials: true
            });

            dispatch(removeUserFromFeed(_id))



        }catch(err){
            console.error(err);
        }

    } 

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            
            <figure className="h-64 overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={user.photoUrl || "https://via.placeholder.com/300"}
                    alt="photo"
                />
            </figure>

            <div className="card-body">
                <h2 className="card-title">
                    {user.firstName} {user.lastName}
                </h2>
                {user.age && user.gender && <p>{user.age +", "+ user.gender}</p>}
                <p>{user.about}</p>

                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => handleSendRequest("interested",user._id)}>Connect</button>
                    <button className="btn btn-secondary" onClick={() => handleSendRequest("ignored",user._id)}>Ignore</button>
                </div>
            </div>
        </div>
    );
};
export default UserCard;