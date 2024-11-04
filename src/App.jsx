import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import { useContext } from "react";
import { tokenAuthContext } from "./contexts/TokenAuth";
import { Toaster } from "react-hot-toast";
function App() {
  const {isAuthorized, setIsAuthorized} = useContext(tokenAuthContext)
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister />} />
        <Route path="/dashboard" element={isAuthorized ? <Dashboard/> : <Navigate to={'/login'} />} />
        <Route path="/projects" element={isAuthorized ? <Projects />: <Navigate to={'/login'} />} />
        <Route path="/*" element={<Navigator to={"/"} />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
