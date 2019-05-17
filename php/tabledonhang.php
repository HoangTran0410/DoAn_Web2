<?php
	require_once ("../BackEnd/ConnectionDB/DB_classes.php");
	session_start();

	if (isset($_SESSION['currentUser'])) {
		$manguoidung = $_SESSION['currentUser']['MaND'];
	
		$sql="SELECT * FROM hoadon WHERE MaND=$manguoidung";
		$dsdh=(new DB_driver())->get_list($sql);

		echo '<table class="table table-striped" >
		<tr style="text-align:center;vertical-align:middle;font-size:20px;background-color:coral;color:black!important">
		<th scope="col" style="font-weight:600">Mã đơn hàng</th>
		<th scope="col" style="font-weight:600">Mã người dùng</th>
		<th scope="col" style="font-weight:600">Ngày lập</th>
		<th scope="col" style="font-weight:600">Người nhận</th>
		<th scope="col" style="font-weight:600">SDT</th>
		<th scope="col" style="font-weight:600">Địa chỉ</th>
		<th scope="col" style="font-weight:600">Phương thức TT</th>
		<th scope="col" style="font-weight:600">Tổng tiền</th>
		<th scope="col" style="font-weight:600">Trạng thái</th>
		<th scope="col" style="font-weight:600">Xem chi tiết</th></tr>';

		forEach($dsdh as $row) {
				echo '<tr>
				<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["MaHD"].'</td>
				<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["MaND"].'</td>
				<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["NgayLap"].'</td>
				<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["NguoiNhan"].'</td>
				<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["SDT"].'</td>
				<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["DiaChi"].'</td>
				<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["PhuongThucTT"].'</td>
				<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["TongTien"].'</td>
				<td scope="col" style="text-align:center;vertical-align:middle;">'.$row["TrangThai"].'</td>
				<td scope="col" style="text-align:center;vertical-align:middle;">
					<button data-toggle="modal" data-target="#exampleModal" onclick="xemChiTiet(\''.$row["MaHD"].'\')">Xem</button>
				</td>
				</tr>'	;	

		}
		echo   '</table>';
	}
?>