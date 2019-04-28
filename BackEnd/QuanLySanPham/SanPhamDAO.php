<?php
include_once "../ConnectionDB/ConnectionDB.php";
include_once "SanPham.php";
class SanPhamDAO
{

	var $connection;
	var $MaSP_I = 0,
		$MaLSP_I = 1,
		$TenSP_I = 2,
		$DonGia_I = 3,
		$SoLuong_I = 4,
		$FileNameHinhAnh_I = 5,
		$TrangThai_I = 6;

	function SanPhamDAO()
	{ }

	// Đọc Database, trả về mảng dữ liệu
	function readDB()
	{ 
		return $this->query("select * from sanpham");
	}

	// thực hiện câu truy vấn và trả về mảng sản phẩm lấy được
	function query($qry)
	{
		$connection = new ConnectionDB();
		$s = $connection->sqlQuery($qry);
		$dssp = array();
		while ($row = mysqli_fetch_array($s)) {
			$dssp[] = new SanPham(
				$row[$this->MaSP_I],
				$row[$this->MaLSP_I],
				$row[$this->TenSP_I],
				$row[$this->DonGia_I],
				$row[$this->SoLuong_I],
				$row[$this->FileNameHinhAnh_I],
				$row[$this->TrangThai_I]
			);
		}
		$connection->closeConnect();
		return $dssp;
	}

	// Thêm một sản phẩm
	function add($sanpham)
	{
		$connection = new ConnectionDB();
		$status = $connection->sqlUpdate("INSERT INTO `sanpham` VALUES ('"
			. $sanpham->MaSP . "', '"
			. $sanpham->MaLSP . "', '"
			. $sanpham->TenSP . "', '"
			. $sanpham->DonGia . "', '"
			. $sanpham->SoLuong . "', '"
			. $sanpham->FileNameHinhAnh . "', '"
			. $sanpham->TrangThai . "');");

		$connection->closeConnect();
		return $status;
	}

	// Xóa một sản phẩm theo mã truyền vào
	function delete($masp)
	{
		$connection = new ConnectionDB();
		$status = $connection->sqlUpdate("DELETE FROM `sanpham` WHERE `sanpham`.`MaSP` = '" . $masp . "'");
		$connection->closeConnect();
		return $status;
	}

	// Cập nhật 1 sản phẩm với mã = mã của biến sản phẩm truyền vào
	function update($sanpham)
	{
		$connection = new ConnectionDB();
		$status = $connection->sqlUpdate("UPDATE SanPham Set "
			. "MaLSP='" . $sanpham->MaLSP
			. "',TenSP='" . $sanpham->TenSP
			. "',DonGia='" . $sanpham->DonGia
			. "',SoLuong='" . $sanpham->SoLuong
			. "',HinhAnh='" . $sanpham->filename
			. "',TrangThai='" . $sanpham->trangthai
			. "' where MaSP='" . $sanpham->MaSP . "'");
		$connection->closeConnect();
		return $status;
	}
}
