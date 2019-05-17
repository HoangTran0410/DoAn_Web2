<?php
    require_once('../BackEnd/ConnectionDB/DB_classes.php');

    if(!isset($_POST['request']) && !isset($_GET['request'])) die(null);

    switch ($_POST['request']) {
    	case 'getall':
				$donhang = (new HoaDonBUS())->select_all();
                $ctdonhang = (new ChiTietHoaDonBUS())->select_all();
		    	die (json_encode($donhang));
    		break;

		default:
	    		# code...
	    		break;
    }
?>