<?php
	include "ConnectionDB.php";
	$a = new ConnectionDB();
	$s = $a->sqlQuery("select * from hoadon");
	while ($row = mysqli_fetch_array($s))
	{
		echo "<br>";
		for ($i = 0; $i < mysqli_num_fields($s); $i++)
		{
			echo $row[$i]." ";
		}
	}
	// $m = $a->sqlUpdate("delete from hoadon where mahd = 'sdgsdgsgs'");
	// if ($m == false)
	// {
	// 	echo "sdfgssg";
	// } để tui tạo nhánh cho ông, ông sẽ code và lưu code trong nhánh, tui là master (gốc)
	// sau khi ông code, ông sẽ push lên nhánh của ông
	// khi nào code đã đúng hết, chắc chắn rồi thì tui sẽ kết hợp (merge) code từ nhánh của ông vào gốc
	// => đồ án chính của mình sẽ ở gốc, cái này ông nói hôm  qua
	// oke, đã ở trong nhánh của ông
?>