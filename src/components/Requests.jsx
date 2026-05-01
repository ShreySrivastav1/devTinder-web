import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequests = async(status,_id) => {
        const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {},{
            withCredentials: true
        });
        // remove from UI
        dispatch(addRequests(requests.filter(req => req._id !== _id)));


    }
    const fetchRequests = async() => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true
            })
            dispatch(addRequests(res.data.data));
        }catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    },[]);
    
    
    return  (
       <div className="flex flex-col items-center my-10">
  <h1 className="font-bold text-3xl mb-6">Requests</h1>

  {requests.length === 0 ? (
    <p className="text-gray-500">No requests</p>
  ) : (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {requests.map((req) => {
        const user = req.fromUserId;

        return (
          <div
            key={req._id}
            className="flex items-center justify-between p-4 bg-white shadow-md rounded-2xl"
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
              <img
                src={user.photoUrl || "https://i.pravatar.cc/100"}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h2 className="font-bold text-lg text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-sm text-gray-600">
                  {user.about || "No bio available"}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE (buttons) */}
            <div className="flex gap-2">
                <button
                className="btn btn-primary"
                onClick={() => reviewRequests("accepted", req._id)}>
                    Accept
                    </button>
                    <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequests("ignored", req._id)}>
                        Reject
                        </button>
                        </div>
                        </div>
                        );
      })}
    </div>
  )}
</div>
    );
}
export default Requests;