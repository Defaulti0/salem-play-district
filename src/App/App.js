import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Camera from "../Components/Camera/Camera";
import SignIn from "../Pages/SignIn/SignIn";
import Progress from "../Pages/Progress/Progress";
import SignUp from "../Pages/SignUp/SignUp";
import NotFound from "../NotFound";
import AuthCheck from '../Components/AuthCheck/AuthCheck';

export default function App() {
  return (
      <Routes>
          <Route path="/" element={
            <AuthCheck>
                <Home />
            </AuthCheck>
          } />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="/Camera" element={
            <AuthCheck>
                <Camera />
            </AuthCheck>} />
          <Route path="/Progress" element={
            <AuthCheck>
                <Progress />
            </AuthCheck>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
  );
}
