<?php
    require_once('../BackEnd/ConnectionDB/DB_classes.php');

    session_start();

    if(!isset($_POST['request']) && !isset($_GET['request'])) die(null);

    switch ($_POST['request']) {
      case 'getbyid':
        if (isset($_SESSION['currentUser'])) {
          $mahd = $_POST['mahd'];
        
          $sql="SELECT * FROM chitiethoadon WHERE MaHD=$mahd";
          $dscthd=(new DB_driver())->get_list($sql);
      
          for($i = 0; $i < sizeof($dscthd); $i++) {
              $dscthd[$i]["SP"] = (new SanPhamBUS())->select_by_id('*', $dscthd[$i]['MaSP']);
          }
      
          die(json_encode($dscthd));
        }

		default:
	    		# code...
	    		break;
    }
?>