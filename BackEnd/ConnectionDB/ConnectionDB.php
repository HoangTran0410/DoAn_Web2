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
		$this->DB = "web2";

		if (!$this->connect) {
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
		if ($this->connect) {
			$result = mysqli_query($this->connect, $qry);
			return $result;
		}
	}

	// Ghi data theo câu update
	function sqlUpdate($qry)
	{
		if ($this->connect) {
			mysqli_query($this->connect, $qry);
			if (mysqli_affected_rows($this->connect) > 0)
				return true;
		} else {
			return false;
		}
	}

	//Đóng kế nối
	function closeConnect()
	{
		if ($this->connect) {
			mysqli_close($this->connect);
		}
	}
}
