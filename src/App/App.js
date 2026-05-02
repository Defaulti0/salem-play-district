import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Camera from "../Pages/Camera/Camera";
import NotFound from "../NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Camera" element={<Camera />} />
      <Route path="/Progress" element={<Progress />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
