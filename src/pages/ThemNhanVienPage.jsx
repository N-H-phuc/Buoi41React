import { useNavigate } from "react-router-dom";
import NhanVienForm from "../components/NhanVienForm";
import { themNhanVien } from "../api/nhanVienApi";

export default function ThemNhanVienPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await themNhanVien(data);
      alert("Thêm nhân viên thành công!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2 className="mb-3">Thêm nhân viên mới</h2>
      <NhanVienForm onSubmit={handleSubmit} />
    </div>
  );
}
