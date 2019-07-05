<?php
	require_once ("../BackEnd/ConnectionDB/DB_classes.php");
	session_start();

	if (isset($_SESSION['currentUser'])) {
		$manguoidung = $_SESSION['currentUser']['MaND'];
	
		$sql="SELECT * FROM hoadon WHERE MaND=$manguoidung";
		$dsdh=(new DB_driver())->get_list($sql);

		if(sizeof($dsdh) > 0) {
			echo '<table class="table table-striped" >
				<tr style="text-align:center;vertical-align:middle;font-size:20px;background-color:coral;color:black!important">
				<th  style="font-weight:600">Mã đơn hàng</th>
				<th  style="font-weight:600">Mã người dùng</th>
				<th  style="font-weight:600">Ngày lập</th>
				<th  style="font-weight:600">Người nhận</th>
				<th  style="font-weight:600">SDT</th>
				<th  style="font-weight:600">Địa chỉ</th>
				<th  style="font-weight:600">Phương thức TT</th>
				<th  style="font-weight:600">Tổng tiền</th>
				<th  style="font-weight:600">Trạng thái</th>
				<th  style="font-weight:600">Xem chi tiết</th>
			</tr>';

			forEach($dsdh as $row) {
					echo '<tr>
						<td  style="text-align:center;vertical-align:middle;">'.$row["MaHD"].'</td>
						<td  style="text-align:center;vertical-align:middle;">'.$row["MaND"].'</td>
						<td  style="text-align:center;vertical-align:middle;">'.$row["NgayLap"].'</td>
						<td  style="text-align:center;vertical-align:middle;">'.$row["NguoiNhan"].'</td>
						<td  style="text-align:center;vertical-align:middle;">'.$row["SDT"].'</td>
						<td  style="text-align:center;vertical-align:middle;">'.$row["DiaChi"].'</td>
						<td  style="text-align:center;vertical-align:middle;">'.$row["PhuongThucTT"].'</td>
						<td  style="text-align:center;vertical-align:middle;">'.$row["TongTien"].'</td>
						<td  style="text-align:center;vertical-align:middle;">'.$row["TrangThai"].'</td>
						<td  style="text-align:center;vertical-align:middle;">
							<button data-toggle="modal" data-target="#exampleModal" onclick="xemChiTiet(\''.$row["MaHD"].'\')">Xem</button>
						</td>
					</tr>'	;	
			}
			echo '</table>';

		} else {
			echo '<h2 style="color:green; text-align:center;">
						Hiện chưa có đơn hàng nào, 
						<a href="index.php" style="color:blue">Mua ngay</a>
					</h2>';
		}
	}
?>