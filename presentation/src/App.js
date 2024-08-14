import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./components/ThemeProvider";
import LoginUI from "./pages/LoginUI";
import UpdateAccountDetailsUI from "./pages/UpdateAccountDetailsUI";
import ViewAccountDetailsUI from "./pages/ViewAccountDetailsUI";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<LoginUI />} /> 
            <Route path="/viewaccountdetails" element={<ViewAccountDetailsUI />} />
            <Route path="/updateaccountdetails" element={<UpdateAccountDetailsUI />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>  
  );
}
