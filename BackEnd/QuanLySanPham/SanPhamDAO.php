<?php 
include_once "../ConnectionDB/ConnectionDB.php";
include_once "SanPham.php";
class SanPhamDAO {

	var $connection;

	function SanPhamDAO() {

	}

	function readDB() {
		$connection = new ConnectionDB();
		$s = $connection->sqlQuery("select * from sanpham");

		$dssp = array();

		while ($row = mysqli_fetch_array($s))
		{
			$dssp[] = new SanPham($row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6]);
		}

		$connection->closeConnect();

		return $dssp;
	}

	function add() {

	}
}
?>