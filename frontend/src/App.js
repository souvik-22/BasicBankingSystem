import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Alluser from "./components/Alluser";
import AllTransaction from "./components/AllTransaction";
import UserById from "./components/UserById";
import Footer from "./components/Footer";

export const config = {
  endpoint: "http://localhost:8082/v1",
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/allusers" element={<Alluser />} />
        <Route path="/user/:id" element={<UserById />} />
        <Route path="/alltransaction" element={<AllTransaction />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
