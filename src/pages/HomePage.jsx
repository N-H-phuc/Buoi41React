import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { layDanhSachNhanVien, xoaNhanVien } from "../api/nhanVienApi";

export default function HomePage() {
  const [danhSach, setDanhSach] = useState([]);
  const [tuKhoa, setTuKhoa] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Tải dữ liệu ban đầu
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const data = await layDanhSachNhanVien();

        if (!cancelled) {
          setDanhSach(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Không thể tải danh sách nhân viên.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  // Tải lại danh sách sau khi xóa
  const loadData = async () => {
    try {
      const data = await layDanhSachNhanVien();
      setDanhSach(data);
      setError("");
    } catch (err) {
      setError(err.message || "Không thể tải danh sách nhân viên.");
    }
  };

  // Lọc danh sách theo từ khóa
  const danhSachLoc = danhSach.filter((nv) => {
    const key = tuKhoa.trim().toLowerCase();

    if (!key) return true;

    return (
      String(nv.maNhanVien).toLowerCase().includes(key) ||
      (nv.tenNhanVien || "").toLowerCase().includes(key) ||
      (nv.chucVu || "").toLowerCase().includes(key)
    );
  });

  // Xóa nhân viên
  const handleXoa = async (ma) => {
    if (!window.confirm(`Bạn có chắc muốn xóa nhân viên mã ${ma}?`)) {
      return;
    }

    try {
      await xoaNhanVien(ma);
      alert("Xóa thành công!");
      await loadData();
    } catch (err) {
      alert(err.message || "Không thể xóa nhân viên.");
    }
  };

  if (loading) {
    return <div className="text-center py-5">Đang tải...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="mb-0">Danh sách nhân viên</h2>

        {/* Ô tìm kiếm */}
        <div className="input-group" style={{ maxWidth: 360 }}>
          <span className="input-group-text">🔍</span>

          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo mã, tên, chức vụ..."
            value={tuKhoa}
            onChange={(e) => setTuKhoa(e.target.value)}
          />

          {tuKhoa && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setTuKhoa("")}
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Thông báo số kết quả */}
      {tuKhoa && (
        <p className="text-muted">
          Tìm thấy <strong>{danhSachLoc.length}</strong> kết quả cho "{tuKhoa}"
        </p>
      )}

      {/* Bảng danh sách nhân viên */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Mã NV</th>
              <th>Tên nhân viên</th>
              <th>Chức vụ</th>
              <th>Hệ số CV</th>
              <th>Lương cơ bản</th>
              <th>Số giờ làm</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {danhSachLoc.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  {tuKhoa
                    ? "Không tìm thấy nhân viên phù hợp"
                    : "Chưa có dữ liệu"}
                </td>
              </tr>
            ) : (
              danhSachLoc.map((nv) => (
                <tr key={nv.maNhanVien}>
                  <td>{nv.maNhanVien}</td>
                  <td>{nv.tenNhanVien}</td>
                  <td>{nv.chucVu}</td>
                  <td>{nv.heSoChucVu}</td>
                  <td>{nv.luongCoBan?.toLocaleString("vi-VN")}</td>
                  <td>{nv.soGioLamTrongThang}</td>

                  <td>
                    <Link
                      to={`/chi-tiet/${nv.maNhanVien}`}
                      className="btn btn-sm btn-info me-1"
                    >
                      Xem
                    </Link>

                    <Link
                      to={`/cap-nhat/${nv.maNhanVien}`}
                      className="btn btn-sm btn-warning me-1"
                    >
                      Sửa
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleXoa(nv.maNhanVien)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
