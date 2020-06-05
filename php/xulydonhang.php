<?php
		require_once('../BackEnd/ConnectionDB/DB_classes.php');
		
		session_start();

    if(!isset($_POST['request']) && !isset($_GET['request'])) die(null);

    switch ($_POST['request']) {
    	case 'getall':
				$donhang = (new HoaDonBUS())->select_all();
                $ctdonhang = (new ChiTietHoaDonBUS())->select_all();
		    	die (json_encode($donhang));
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

		default:
	    		# code...
	    		break;
    }
?>