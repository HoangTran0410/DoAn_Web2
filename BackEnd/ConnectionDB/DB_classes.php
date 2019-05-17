<?php
require_once("DB_business.php");

// hiển thị dạng <table> dữ liệu từ 1 bảng trong database 
function show_DataBUS_as_Table($bus)
{
    echo "<table cellspacing='15'>";
    foreach ($bus->select_all() as $rowname => $row) {
        echo "<tr>";
        foreach ($row as $colname => $col) {
            echo "<td>" . $col . "</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
}

// Lớp sản phẩm
class SanPhamBUS extends DB_business
{
    function __construct()
    {
        $this->setTable("SanPham", "MaSP");
    }

    function capNhapTrangThai($trangthai, $id) {
        $sanpham = $this->select_by_id("*", $id);
        $sanpham["TrangThai"] = $trangthai;

        return $this->update_by_id($sanpham, $id);
    }

    function themDanhGia($id) {
        // cập nhật số lượt đánh giá
        $sanpham = $this->select_by_id("*", $id);
        $sanpham["SoDanhGia"] = $sanpham["SoDanhGia"] + 1;

        // cập nhật số sao trung bình
        $dsbl = (new DB_driver())->get_list("SELECT * FROM danhgia WHERE MaSP=$id");
        $tongSoSao = 0;
        for($i = 0; $i < sizeof($dsbl); $i++) {
            $tongSoSao += $dsbl[$i]["SoSao"];
        }
        $sanpham["SoSao"] = $tongSoSao / sizeof($dsbl);

        return $this->update_by_id($sanpham, $id);
    }
}

// Lớp loại sản phẩm
class LoaiSanPhamBUS extends DB_business
{
    function __construct()
    {
        $this->setTable("LoaiSanPham", "MaLSP");
    }
}

// Lớp chi tiết sản phẩm
class ChiTietSanPhamBUS extends DB_business
{
    function __construct()
    {
        $this->setTable("ChiTietSanPham", "MaSP");
    }
}

// Lớp người dùng
class NguoiDungBUS extends DB_business
{
    function __construct()
    {
        $this->setTable("NguoiDung", "MaND");
    }

    function add_new($data)
    {
        // check
        // username trung, email trung
        
        // them
        parent::add_new($data);
    }
}

// Lớp hóa đơn
class HoaDonBUS extends DB_business
{
    function __construct()
    {
        $this->setTable("HoaDon", "MaHD");
    }

    function getHoaDonCuaNguoiDung($mand) {
        $sql = "SELECT * FROM hoadon WHERE MaND=$mand";
        $dsdh = (new HoaDonBUS())->get_list($sql);
    }
}

// Lớp tài khoản
class TaiKhoanBUS extends DB_business
{
    function __construct()
    {
        $this->setTable("TaiKhoan", "TenTaiKhoan");
    }
}

// Lớp phân quyền
class PhanQuyenBUS extends DB_business
{
    function __construct()
    {
        $this->setTable("PhanQuyen", "MaQuyen");
    }
}

// Lớp khuyến mãi
class KhuyenMaiBUS extends DB_business
{
    function __construct()
    {
        $this->setTable("KhuyenMai", "MaKM");
    }
}

// Lớp chi tiết hóa đơn , có 2 khóa chính
class ChiTietHoaDonBUS extends DB_business
{
    protected $key2;

    function __construct()
    {
        $this->setTable("ChiTietHoaDon", "MaHD");
        $this->_key2 = "MaSP";
    }

    // Hàm xóa theo id hóa đơn và id sản phẩm
    function delete_by_2id($id, $id2)
    {
        return $this->remove($this->_table_name, $this->_key . "='" . $id . "' AND " . $this->_key2 . "='" . $id2 . "'");
    }

    // Hàm cập nhật theo id hóa đơn + id sản phẩm
    function update_by_2id($data, $id, $id2)
    {
        return $this->update($this->_table_name, $data, $this->_key . "='" . $id . "' AND " . $this->_key2 . "='" . $id2 . "'");
    }

    // hàm select theo id hóa đơn + id sản phẩm
    function select_by_2id($select, $id, $id2)
    {
        $sql = "select $select from " . $this->_table_name . " where " . $this->_key . " = '" . $id . "' AND " . $this->_key2 . "='" . $id2 . "'";
        return $this->get_row($sql);
    }

    // hàm get all chi tiết có mã hóa đơn truyền vào
    function select_all_in_hoadon($id)
    {
        $sql = "select * from " . $this->_table_name . " where " . $this->_key . " ='" . $id . "'";
        return $this->get_list($sql);
    }
}
