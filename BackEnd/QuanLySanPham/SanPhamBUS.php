<?php
include_once "SanPhamDAO.php";
class SanPhamBUS
{
    var $sanphamDAO;
    var $dssp;

    // khởi tạo và đọc DB ngay từ constructor
    function SanPhamBUS()
    {
        $this->sanphamDAO = new SanPhamDAO();
        $this->dssp = array();
        $this->readDB();
    }

    // đọc dữ liệu từ DB đổ vào array
    function readDB()
    {
        $this->dssp = $this->sanphamDAO->readDB();
    }

    // thực hiện câu truy vấn và trả về mảng sản phẩm lấy được
    function query($qry) {
        return $this->sanphamDAO->query($qry);
    }

    // thêm 1 sản phẩm
    function add($sanpham)
    {
        $status = $this->sanphamDAO->add($sanpham);
        if ($status == true) {
            $this->dssp[] = $sanpham;
        }
        return $status;
    }

    // xóa 1 sản phẩm theo mã truyền vào
    function delete($masp)
    {
        $status = $this->sanphamDAO->delete($masp);
        if ($status == true) {
            for ($i = 0; $i < count($this->dssp); $i++) {
                if ($this->dssp[$i]->MaSP == $masp) {
                    \array_splice($this->dssp, $i, 1);
                    return $status;
                }
            }
        }
        return $status;
    }

    // cập nhật 1 sản phẩm
    function update($sanpham)
    {
        $status = $this->sanphamDAO->update($sanpham);
        if ($status == true) {
            for ($i = 0; $i < count($this->dssp); $i++) {
                if ($this->dssp[$i]->MaSP == $sanpham) {
                    $this->dssp[$i] = $sanpham;
                    return $status;
                }
            }
        }
        return $status;
    }
}
