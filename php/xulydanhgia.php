<?php
	require_once ("../BackEnd/ConnectionDB/DB_classes.php");
	if(!isset($_POST['request']) && !isset($_GET['request'])) die();

	switch ($_POST['request']) {
		case 'thembinhluan':
			$masp = $_POST['masp'];
			$mand = $_POST['mand'];
			$sosao = $_POST['sosao'];
			$binhluan = $_POST['binhluan'];
			$thoigian = $_POST['thoigian'];

			$status = (new DB_driver())->insert("danhgia", array(
				"MASP" => $masp,
				"MaND" => $mand,
				"SoSao" => $sosao,
				"BinhLuan" => $binhluan,
				"NgayLap" => $thoigian
			));

			$spBUS = new SanPhamBUS();

			die (json_encode($spBUS->themDanhGia($masp)));
			break;

		case 'getbinhluan':
			$masp = $_POST['masp'];
			$dsbl = (new DB_driver())->get_list("SELECT * FROM danhgia WHERE MaSP=$masp");

			for($i = 0; $i < sizeof($dsbl); $i++) {
				$dsbl[$i]["ND"] = (new NguoiDungBUS())->select_by_id('*', $dsbl[$i]['MaND']);
			}

			die (json_encode($dsbl));
			break;
	}

?>