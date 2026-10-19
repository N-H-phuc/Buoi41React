const BASE_URL = "https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi";

export const layDanhSachNhanVien = async () => {
  const res = await fetch(`${BASE_URL}/LayDanhSachNhanVien`);
  if (!res.ok) throw new Error("Không lấy được danh sách");
  return res.json();
};

export const layThongTinNhanVien = async (maNhanVien) => {
  const res = await fetch(
    `${BASE_URL}/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
  );
  if (!res.ok) throw new Error("Không tìm thấy nhân viên");
  return res.json();
};

export const themNhanVien = async (nhanVien) => {
  const res = await fetch(`${BASE_URL}/ThemNhanVien`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nhanVien),
  });
  if (!res.ok) throw new Error("Thêm thất bại");
  return res.json();
};

export const capNhatNhanVien = async (maNhanVien, nhanVien) => {
  const res = await fetch(
    `${BASE_URL}/CapNhatThongTinNhanVien?maNhanVien=${maNhanVien}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nhanVien),
    },
  );
  if (!res.ok) throw new Error("Cập nhật thất bại");
  // API trả 204 No Content
  return true;
};

export const xoaNhanVien = async (maNhanVien) => {
  // Lưu ý: API dùng query param tên maSinhVien
  const res = await fetch(`${BASE_URL}/XoaNhanVien?maSinhVien=${maNhanVien}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Xóa thất bại");
  return true;
};
