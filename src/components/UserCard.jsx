const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender, about, photoUrl} = user;
    if (!user) return null;

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
                    <button className="btn btn-primary">Connect</button>
                    <button className="btn btn-secondary">Ignore</button>
                </div>
            </div>
        </div>
    );
};
export default UserCard;