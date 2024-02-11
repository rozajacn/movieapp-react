
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from './pages';
import AddActor from './pages/actors/AddActor';
import DetailsActor from './pages/actors/DetailsActor';
import EditActor from './pages/actors/EditActor';
import AddMovie from './pages/movies/AddMovie';
import DetailsMovie from './pages/movies/DetailsMovie';
import EditMovie from './pages/movies/EditMovie';

const App = () => {
  return (
    <div style={{ width: '980px', margin: '0 auto' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="details-movie" element={<DetailsMovie />} />
          <Route path="edit-movie" element={<EditMovie />} />

          <Route path="details-actor" element={<DetailsActor />} />
          <Route path="add-actor" element={<AddActor />} />
          <Route path="edit-actor" element={<EditActor />} />

        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={10000}
        theme="colored"
      />
    </div>
  );
};

export default App;