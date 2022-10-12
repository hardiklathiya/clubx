import "./App.css";
import BottomTop from "./component/bottom_top/BottomTop";
import Footer from "./component/footer/Footer";
import Navbar from "./component/header/Navbar";
import Home from "./component/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/ProductState";
import Demo from "./component/home/Demo";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <BottomTop />
          {/* <Demo /> */}
          <Footer />
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
