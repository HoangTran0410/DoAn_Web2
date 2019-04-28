<?php
include_once "../DAOBUSInterface.php";

abstract class BUS implements DAOBUSInteface
{
    var $DAO;
    var $ds;

    // khởi tạo và đọc DB ngay từ constructor
    function BUS()
    {
        $this->ds = array();
        $this->readDB();
    }

    // đọc dữ liệu từ DB đổ vào array
    function readDB()
    {
        $this->ds = $this->DAO->readDB();
    }

    // thực hiện câu truy vấn và trả về mảng lấy được
    function query($qry)
    {
        return $this->DAO->query($qry);
    }

    function add($obj)
    {
        $status = $this->DAO->add($obj);
        if ($status == true) {
            $this->ds[] = $obj;
        }
        return $status;
    }

    function delete($ma)
    {
        $status = $this->DAO->delete($ma);
        if ($status == true) {
            for ($i = 0; $i < count($this->ds); $i++) {
                if ($this->ds[$i]->Ma == $ma) {
                    \array_splice($this->ds, $i, 1);
                    return $status;
                }
            }
        }
        return $status;
    }

    function update($obj)
    {
        $status = $this->DAO->update($obj);
        if ($status == true) {
            for ($i = 0; $i < count($this->ds); $i++) {
                if ($this->ds[$i]->Ma == $obj) {
                    $this->ds[$i] = $obj;
                    return $status;
                }
            }
        }
        return $status;
    }
}

include_once "../DAO/SanPhamDAO.php";
class SanPhamBUS extends BUS
{
    function SanPhamBUS()
    {
        $this->DAO = new SanPhamDAO();
        parent::BUS();
    }
}

include_once "../DAO/LoaiSanPhamDAO.php";
class LoaiSanPhamBUS extends BUS
{
    function LoaiSanPhamBUS()
    {
        $this->DAO = new LoaiSanPhamDAO();
        parent::BUS();
    }
}
