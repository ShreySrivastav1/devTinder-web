import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/navbar"
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";


function App() {
  return (
    <>
    <Provider store={appStore}>

    <BrowserRouter basename ="/">
    <Routes>
      <Route path="/" element={<Body />}>
      <Route path="/" element={<Feed />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/Profile" element={<Profile />}/>
      <Route path="/Connections" element={<Connections />}/>
      <Route path="/Requests" element={<Requests />}/>
      <Route path="/Chat/:targetUserId" element={<Chat />}/>
      
      
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>

    </>
  );
}

export default App;