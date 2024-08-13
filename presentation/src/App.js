// import logo from './logo.svg';
import "./App.css";
import UpdateAccountDetailsUI from "./pages/UpdateAccountDetailsUI";
import ViewAccountDetailsUI from "./pages/ViewAccountDetailsUI";

export default function App() {
  return (
    <div>
      {/* uncomment accordingly depends on which page you want to access */}

      {/* <UpdateAccountDetailsUI /> */}
      <ViewAccountDetailsUI />
    </div>
  );
}
