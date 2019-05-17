<?php
	require_once ("../BackEnd/ConnectionDB/DB_driver.php");

	session_start();

	if (isset($_SESSION['currentUser'])) {
		$mahd = $_GET['mahd'];
	
		$sql="SELECT * FROM chitiethoadon WHERE MaHD=$mahd";
		$dscthd=(new DB_driver())->get_list($sql);

		for($i = 0; $i < sizeof($dscthd); $i++) {
            $dscthd[$i]["SP"] = (new SanPhamBUS())->select_by_id('*', $dscthd[$i]['MaSP']);
        }

		echo '<table class="table table-striped" >
		<tr style="text-align:center;vertical-align:middle;font-size:20px;background-color:coral;color:black!important">
			<th scope="col" style="font-weight:600">STT</th>
			<th scope="col" style="font-weight:600">Sản phẩm</th>
			<th scope="col" style="font-weight:600">Số lượng</th>
			<th scope="col" style="font-weight:600">Đơn giá</th>
		</tr>';

		$stt = 0;
		forEach($dscthd as $row) {
				$stt++;

				echo '<tr>
					<td scope="col" style="text-align:center;vertical-align:middle;">'.$stt.'</td>
					<td scope="col" style="text-align:center;vertical-align:middle;">
						<img src="'.$row["SP"]["HinhAnh"].'">
						'.$row["SP"]["TenSP"].'
					</td>
					<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["SoLuong"].'</td>
					<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["DonGia"].'</td>
				</tr>'	;	
		}
		echo   '</table>';
	}
?>		

<!--  -->