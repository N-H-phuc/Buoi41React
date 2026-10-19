import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NhanVienForm from "../components/NhanVienForm";
import { layThongTinNhanVien, capNhatNhanVien } from "../api/nhanVienApi";

export default function CapNhatNhanVienPage() {
  const { maNhanVien } = useParams();
  const navigate = useNavigate();
  const [nhanVien, setNhanVien] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    layThongTinNhanVien(maNhanVien)
      .then(setNhanVien)
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, [maNhanVien]);

  const handleSubmit = async (data) => {
    try {
      await capNhatNhanVien(maNhanVien, data);
      alert("Cập nhật thành công!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (!nhanVien)
    return <div className="alert alert-warning">Không tìm thấy nhân viên</div>;

  return (
    <div>
      <h2 className="mb-3">Cập nhật nhân viên #{maNhanVien}</h2>
      <NhanVienForm
        initialData={nhanVien}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
}
