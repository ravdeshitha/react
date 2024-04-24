import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Main/Home";
import Gallery from "./Main/Gallery";
import SignIn from "./UserLogin/SignIn";
import SignUp from "./UserLogin/SignUp";
import AdminDashboard from "./Admin/AdminDashboard";
// import GalleryAlbum from "./Main/Gallery/GalleryAlbum";
// import Slideshow from "./Main/HomePage/OurServices/SlideShow";
import GalleryAlbum from "./Main/Gallery/GalleryAlbum";

//companies
import BakeryHome from "./Main/Baker/BakeryHome";
import GimanhalaHome from "./Main/Gimanhala/GimanhalaHome";
import ReceptionhallHome from "./Main/ReceptionHall/ReceptionhallHome";
import ProtectedRoutes from "./Protected/ProtectedRoutes";

function App() {
  

  return (
    <>
      {/* <div className="text-red-500 bg-black text-center">
        Wasana Bakers Group Of Company
      </div> */}
      <BrowserRouter>
        <Routes>
          
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          
          <Route exact path="/" element={<Home />} />
          <Route path="/gallery/*" element={<Gallery />} />

          <Route path="/protect/*" element={<ProtectedRoutes />} />

          <Route path="/wasna-bakers" element={<BakeryHome />} />{/* Wasana Bakery route path */}

          <Route path="/wasana-gimanhala" element={<GimanhalaHome />} />{/* Wasana Gimanhala route path */}

          <Route path="/wasna-reception-hall" element={<ReceptionhallHome />} />{/* Wasana ReceptionHall route path */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
