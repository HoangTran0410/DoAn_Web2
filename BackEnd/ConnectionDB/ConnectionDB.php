<?php
	class ConnectionDB
	{
		var $connect;

		var $localhost = "";
		var $user = "";
		var $pass = "";
		var $DB = "";

		//Kết nối DB
		function ConnectionDB()
		{
			$this->localhost = "localhost";
			$this->user = "root";
			$this->pass = "";
			$this->DB = "quanlysieuthidienthoai";

			if (!$this->connect)
			{
				$this->setupConnect();
			}

		}

		function setupConnect()
		{
			$this->connect = mysqli_connect($this->localhost, $this->user, $this->pass, $this->DB);
		}

		//Lấy data theo câu query
		function sqlQuery($qry)
		{
			if ($this->connect)
			{
				$result = mysqli_query($this->connect, $qry);
				// while ($row = mysqli_fetch_array($result))
				// {
				// 	for ($i = 0; $i < mysqli_num_fields($result); $i++)
				// 	{
				// 		echo $row[$i];
				// 	}
				// }
				return $result;
			}
		}

		// Ghi data theo câu update
		function sqlUpdate($qry)
		{
			if ($this->connect)
			{
				mysqli_query($this->connect, $qry);
				if (mysqli_affected_rows($this->connect) > 0)
					return true;
			}
			else
			{
				return false;
			}
		}

		//Đóng kế nối
		function closeConnect()
		{
			if ($this->connect)
			{
				mysqli_close($this->connect);
			}
		}
}
?>
<!-- ko hiểu sao githubdesktop nó ko nhân cái folđer mới thêm vào :v nên tui làm trên web luôn, chắc do mới tạo branch nó thế, :v giờ chắc bth rồi -->