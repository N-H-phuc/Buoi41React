import { useState, useEffect } from "react";

const initialForm = {
  maNhanVien: 0,
  tenNhanVien: "string",
  chucVu: "string",
  heSoChucVu: 0,
  luongCoBan: 0,
  soGioLamTrongThang: 0,
};

export default function NhanVienForm({
  initialData,
  onSubmit,
  isEdit = false,
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "tenNhanVien" || name === "chucVu" ? value : Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      {!isEdit && (
        <div className="mb-3">
          <label className="form-label">Mã nhân viên</label>
          <input
            type="number"
            className="form-control"
            name="maNhanVien"
            value={form.maNhanVien}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Tên nhân viên</label>
        <input
          type="text"
          className="form-control"
          name="tenNhanVien"
          value={form.tenNhanVien}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Chức vụ</label>
        <input
          type="text"
          className="form-control"
          name="chucVu"
          value={form.chucVu}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Hệ số chức vụ</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            name="heSoChucVu"
            value={form.heSoChucVu}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Lương cơ bản</label>
          <input
            type="number"
            className="form-control"
            name="luongCoBan"
            value={form.luongCoBan}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Số giờ làm trong tháng</label>
          <input
            type="number"
            className="form-control"
            name="soGioLamTrongThang"
            value={form.soGioLamTrongThang}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {isEdit ? "Cập nhật" : "Thêm mới"}
      </button>
    </form>
  );
}
