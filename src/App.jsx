import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUP";
import Home from "./components/Home";
import Chat from "./components/Chat";
import ChatLogin from "./components/ChatLogin";
import PasswordReset from "./components/PasswordReset";
import CommunityPage from "./components/CommunityPage";
import CommunityLogin from "./components/CommunityLogin";
import Articles from "./components/Articles";
import History from "./components/History";
import NotFound from "./components/NotFound";
import CommunitySignUp from "./components/CommunitySignUp";
import ForgetPassword from "./components/ForgetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/chatsignup" element={<SignUp />} />
        <Route path="/chatlogin" element={<ChatLogin />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/reset-password/:token" element={<ForgetPassword />} />

        <Route path="/community/articles" element={<Articles />} />
        <Route path="/communitylogin" element={<CommunityLogin />} />
        <Route path="/communitysignup" element={<CommunitySignUp />} />
        <Route path="/community/articles/:id" element={<CommunityPage />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
