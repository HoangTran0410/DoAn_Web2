<?php
require_once("DB_business.php");

// Lớp sản phẩm
class SanPham extends DB_business
{ 
    function __construct()
    {
        $this->setTable("SanPham", "MaSP");
    }
}

// Lớp loại sản phẩm
class LoaiSanPham extends DB_business
{ 
    function __construct()
    {
        $this->setTable("LoaiSanPham", "MaLSP");
    }
}

// Lớp chi tiết sản phẩm
class ChiTietSanPham extends DB_business
{ 
    function __construct()
    {
        $this->setTable("ChiTietSanPham", "MaSP");
    }
}

// Lớp người dùng
class NguoiDung extends DB_business
{ 
    function __construct()
    {
        $this->setTable("NguoiDung", "MaND");
    }
}

// Lớp hóa đơn
class HoaDon extends DB_business
{ 
    function __construct()
    {
        $this->setTable("HoaDon", "MaHD");
    }
}

// Lớp tài khoản
class TaiKhoan extends DB_business
{ 
    function __construct()
    {
        $this->setTable("TaiKhoan", "TenTaiKhoan");
    }
}

// Lớp phân quyền
class PhanQuyen extends DB_business
{ 
    function __construct()
    {
        $this->setTable("PhanQuyen", "MaQuyen");
    }
}

// Lớp khuyến mãi
class KhuyenMai extends DB_business
{ 
    function __construct()
    {
        $this->setTable("KhuyenMai", "MaKM");
    }
}
