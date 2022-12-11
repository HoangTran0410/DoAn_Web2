<?php
		require_once('../BackEnd/ConnectionDB/DB_classes.php');
		
		session_start();

    if(!isset($_POST['request']) && !isset($_GET['request'])) die(null);

    switch ($_POST['request']) {
    	case 'getall':
			$dsdh = (new HoaDonBUS())->select_all();
			$spBUS = new SanPhamBUS();
			$cthdBUS = new ChiTietHoaDonBUS();
			$ndBUS = new NguoiDungBUS();

			for($i = 0; $i < sizeof($dsdh); $i++) {
				// Thêm thông tin người dùng
				$dsdh[$i]["ND"] = $ndBUS->select_by_id("*", $dsdh[$i]["MaND"]);

				// Thêm thông tin chi tiết sản phẩm
				$dsdh[$i]["CTDH"] = $cthdBUS->select_all_in_hoadon($dsdh[$i]["MaHD"]);

				for($j = 0; $j < sizeof($dsdh[$i]["CTDH"]); $j++) {
					$dsdh[$i]["CTDH"][$j]["SP"] = $spBUS->select_by_id("*", $dsdh[$i]["CTDH"][$j]["MaSP"]);
				}

			}
			
			die (json_encode($dsdh));
			break;
				
		case 'getCurrentUser':
			if (isset($_SESSION['currentUser'])) {
				$manguoidung = $_SESSION['currentUser']['MaND'];
			
				$sql="SELECT * FROM hoadon WHERE MaND=$manguoidung";
				$dsdh=(new DB_driver())->get_list($sql);
		
				die(json_encode($dsdh));

			} else {
				die(null);
			}
			break;

		case 'capNhatTrangThai':
			$madonhang = $_POST['maDonHang'];
			$trangThai = $_POST['trangThai'];
			$ketqua = (new HoaDonBUS())->capNhapTrangThai($trangThai, $madonhang);

			die(json_encode($ketqua));
			break;

		default:
			die('Request không đúng định dạng');
	    	break;
    }
?>