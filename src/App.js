import AuthContextProvider from "./context/AuthContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutingComponent from "./RoutingComponent";

function App() {
  return (
    <AuthContextProvider>
      <RoutingComponent />
      <ToastContainer />
    </AuthContextProvider>
  );
}

export default App;
