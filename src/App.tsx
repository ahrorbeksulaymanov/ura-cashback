import "./App.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RoutesMiddleware from "./routes/routerMiddleware";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate('/login')
    }
  }, [])
  return (
    <div className="App">
        <RoutesMiddleware />
    </div>
  );
}

export default App;
