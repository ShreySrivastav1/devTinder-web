import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <div className="flex flex-col items-center my-10">
            <h1 className="font-bold text-3xl mb-6">Connections</h1>

            {connections.length === 0 ? (
                <p className="text-gray-500">No connections yet</p>
            ) : (
                <div className="flex flex-col gap-4 w-full max-w-2xl">
                    {connections.map((connection) => (
                        <div
                            key={connection._id}
                            className="flex items-center gap-4 p-4 bg-white shadow-md rounded-2xl"
                        >
                            {/* Profile Image */}
                            <img
                                src={connection.photoUrl || "https://via.placeholder.com/100"}
                                alt="profile"
                                className="w-16 h-16 rounded-full object-cover"
                            />

                            {/* User Info */}
                            <div>
                                <h2 className="font-bold text-lg text-black">
                                    {connection.firstName} {connection.lastName}
                                </h2>

                                <p className="text-sm text-gray-600">
                                    {connection.about || "No bio available"}
                                </p>

                                <p className="text-sm text-blue-500">
                                    {connection.skills?.join(", ")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Connections;