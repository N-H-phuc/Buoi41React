import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ThemNhanVienPage from "./pages/ThemNhanVienPage";
import CapNhatNhanVienPage from "./pages/CapNhatNhanVienPage";
import ChiTietNhanVienPage from "./pages/ChiTietNhanVienPage";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Quản lý Nhân viên
          </NavLink>
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">
              Danh sách
            </NavLink>
            <NavLink className="nav-link" to="/them">
              Thêm nhân viên
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/them" element={<ThemNhanVienPage />} />
          <Route
            path="/cap-nhat/:maNhanVien"
            element={<CapNhatNhanVienPage />}
          />
          <Route
            path="/chi-tiet/:maNhanVien"
            element={<ChiTietNhanVienPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
