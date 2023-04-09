import FilmLibrary from "./components/FilmLibrary";
import Home from "./components/Home"
import NotFound from "./components/NotFound"
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import FilmDetail from "./components/FilmDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<FilmLibrary />} />
        <Route path="/films/:id" element={<FilmLibrary />} />
        {/* <Route path="/films/:id" element={<FilmDetail/>} />  will open another page*/}  
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
