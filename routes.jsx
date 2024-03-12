import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./src/pages/Home";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
