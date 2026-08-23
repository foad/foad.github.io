import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Gallery } from "./pages/gallery";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photography" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
};
