import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { layThongTinNhanVien } from "../api/nhanVienApi";

export default function ChiTietNhanVienPage() {
  const { maNhanVien } = useParams();
  const [nv, setNv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    layThongTinNhanVien(maNhanVien)
      .then(setNv)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [maNhanVien]);

  if (loading) return <div className="text-center py-5">Đang tải...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!nv)
    return <div className="alert alert-warning">Không tìm thấy nhân viên</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Chi tiết nhân viên #{nv.maNhanVien}</h4>
      </div>
      <div className="card-body">
        <table className="table table-bordered mb-0">
          <tbody>
            <tr>
              <th style={{ width: "30%" }}>Mã nhân viên</th>
              <td>{nv.maNhanVien}</td>
            </tr>
            <tr>
              <th>Tên nhân viên</th>
              <td>{nv.tenNhanVien}</td>
            </tr>
            <tr>
              <th>Chức vụ</th>
              <td>{nv.chucVu}</td>
            </tr>
            <tr>
              <th>Hệ số chức vụ</th>
              <td>{nv.heSoChucVu}</td>
            </tr>
            <tr>
              <th>Lương cơ bản</th>
              <td>{nv.luongCoBan?.toLocaleString("vi-VN")} đ</td>
            </tr>
            <tr>
              <th>Số giờ làm trong tháng</th>
              <td>{nv.soGioLamTrongThang}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <Link to="/" className="btn btn-secondary me-2">
          Quay lại
        </Link>
        <Link to={`/cap-nhat/${nv.maNhanVien}`} className="btn btn-warning">
          Sửa
        </Link>
      </div>
    </div>
  );
}
