import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <div className="App">
      {/* <HomePage /> */}
      <CategoriesPage />
    </div>
  );
}

export default App;
