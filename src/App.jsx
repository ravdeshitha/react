import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Main/Home";
import Gallery from "./Main/Gallery";
import SignIn from "./UserLogin/SignIn";
import SignUp from "./UserLogin/SignUp";
import AdminDashboard from "./Admin/AdminDashboard";
import GalleryAlbum from "./Main/Gallery/GalleryAlbum";


//companies
import BakeryHome from "./Main/Baker/BakeryHome";
import GimanhalaHome from "./Main/Gimanhala/GimanhalaHome";
import ReceptionhallHome from "./Main/ReceptionHall/ReceptionhallHome";
import { useContext , useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { AdminVerify } from "./UserLogin/AdminVerify";


function App() {
  const {currentUser} = useContext(AuthContext);
  // const [verified, setVerified] = useState(false);

  // useEffect(() => {
  //   const checkAdmin = async () => {
  //     const isAdmin = await AdminVerify();
  //     setVerified(isAdmin);
  //   };

  //   checkAdmin();
  // }, []);

  const AdminProtectedRoute = ({ children }) => {
    
    if (!currentUser || currentUser.userType !== "admin") {
      return <Navigate to='/sign-in' replace />;
    } else {
      return children;
    }
  };


  return (
    <>
      {/* <div className="text-red-500 bg-black text-center">
        Wasana Bakers Group Of Company
      </div> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/album" element={<GalleryAlbum />} />
          
          
          <Route path="/admin/*" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />

          {/* Wasana Bakery route path */}
          <Route path="/wasna-bakers" element={<BakeryHome />} />

          {/* Wasana Gimanhala route path */}
          <Route path="/wasana-gimanhala" element={<GimanhalaHome />} />

          {/* Wasana ReceptionHall route path */}
          <Route path="/wasna-reception-hall" element={<ReceptionhallHome />} />

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
