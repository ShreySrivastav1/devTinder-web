import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch();

    const getFeed = async() => {

        try {
            const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true});
            console.log("FEED API:", res.data); 
            dispatch(addFeed(res.data.data));
        }catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getFeed();
    },[])
    if(feed.length <= 0) return <p className="flex justify-center font-bold text-3xl my-20">You are catched up!</p>



    return ( 
        feed && feed.length > 0 && 
        (<div className="flex justify-center my-5">
            <UserCard user={feed[0]} />
            </div>)
            );
}; 
export default Feed;