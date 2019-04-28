<?php
include_once "../ConnectionDB/ConnectionDB.php";
include_once "../DAOBUSInterface.php";
include_once "../DTO/LoaiSanPham.php";

class LoaiSanPhamDAO implements DAOBUSInteface
{
	var $connection;
	var $MaLSP_I = 0,
		$TenLSP_I = 1,
		$MoTa_I = 2;

	function LoaiSanPhamDAO()
	{ }

	// Đọc Database, trả về mảng dữ liệu
	function readDB()
	{
		return $this->query("select * from loaisanpham");
	}

	// thực hiện câu truy vấn và trả về mảng Loại sản phẩm lấy được
	function query($qry)
	{
		$connection = new ConnectionDB();
		$s = $connection->sqlQuery($qry);
		$dslsp = array();
		while ($row = mysqli_fetch_array($s)) {
			$dslsp[] = new LoaiSanPham(
				$row[$this->MaLSP_I],
				$row[$this->TenLSP_I],
				$row[$this->MoTa_I]
			);
		}
		$connection->closeConnect();
		return $dslsp;
	}

	// Thêm một loại sản phẩm
	function add($loaisanpham)
	{
		$connection = new ConnectionDB();
		$status = $connection->sqlUpdate("INSERT INTO `loaisanpham` VALUES ('"
			. $loaisanpham->Ma . "', '"
			. $loaisanpham->TenLSP . "', '"
			. $loaisanpham->MoTa . "');");

		$connection->closeConnect();
		return $status;
	}

	// Xóa một loại sản phẩm theo mã truyền vào
	function delete($malsp)
	{
		$connection = new ConnectionDB();
		$status = $connection->sqlUpdate("DELETE FROM `loaisanpham` WHERE `loaisanpham`.`MaLSP` = '" . $malsp . "'");
		$connection->closeConnect();
		return $status;
	}

	// Cập nhật 1 loại sản phẩm với mã = mã của biến loại sản phẩm truyền vào
	function update($loaisanpham)
	{
		$connection = new ConnectionDB();
		$status = $connection->sqlUpdate("UPDATE loaisanpham Set "
			. "TenLSP='" . $loaisanpham->TenLSP
			. "',MoTa='" . $loaisanpham->MoTa
			. "' where MaSP='" . $loaisanpham->Ma . "'");
		$connection->closeConnect();
		return $status;
	}
}