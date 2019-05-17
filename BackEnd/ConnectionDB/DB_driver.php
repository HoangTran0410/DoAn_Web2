<?php
// Thư Viện Xử Lý Database
class DB_driver
{
    // Biến lưu trữ kết nối
    public $__conn,
        $localhost = "localhost",
        $user = "root",
        $pass = "",
        $DbName = "web2";

    // Hàm Kết Nối
    function connect()
    {
        // Nếu chưa kết nối thì thực hiện kết nối
        if (!$this->__conn) {
            // Kết nối
            $this->__conn = mysqli_connect($this->localhost, $this->user, $this->pass, $this->DbName) or die('Lỗi kết nối');

            // Xử lý truy vấn UTF8 để tránh lỗi font
            mysqli_query($this->__conn, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

            mysqli_query($this->__conn, "set names 'utf8'");
            mysqli_set_charset($this->__conn, "utf8");
        }
    }

    // Hàm Ngắt Kết Nối
    function dis_connect()
    {
        // Nếu đang kết nối thì ngắt
        if ($this->__conn) {
            mysqli_close($this->__conn);
        }
    }

    // Hàm Insert
    function insert($table, $data)
    {
        // Kết nối
        $this->connect();

        // Lưu trữ danh sách field, (tạm thời chưa cần)
        // $field_list = '';
        // Lưu trữ danh sách giá trị tương ứng với field
        $value_list = '';

        // Lặp qua data
        foreach ($data as $key => $value) {
            // $field_list .= ",$key";
            $value_list .= ",'" . mysqli_escape_string($this->__conn, $value) . "'";
        }

        // Vì sau vòng lặp các biến $field_list và $value_list sẽ thừa một dấu , nên ta sẽ dùng hàm trim để xóa đi
        // $sql = 'INSERT INTO ' . $table . '(' . trim($field_list, ',') . ') VALUES (' . trim($value_list, ',') . ')';
        $sql = 'INSERT INTO ' . $table . ' VALUES (' . trim($value_list, ',') . ')';

        return mysqli_query($this->__conn, $sql);
        //return $sql;
    }

    // Hàm Update
    function update($table, $data, $where)
    {
        // Kết nối
        $this->connect();
        $sql = '';
        // Lặp qua data
        foreach ($data as $key => $value) {
            $sql .= "$key = '" . mysqli_escape_string($this->__conn, $value) . "',";
        }

        // Vì sau vòng lặp biến $sql sẽ thừa một dấu , nên ta sẽ dùng hàm trim để xóa đi
        $sql = 'UPDATE ' . $table . ' SET ' . trim($sql, ',') . ' WHERE ' . $where;

        return mysqli_query($this->__conn, $sql);
    }

    // Hàm delete
    function remove($table, $where)
    {
        // Kết nối
        $this->connect();

        // Delete
        $sql = "DELETE FROM $table WHERE $where";
        return mysqli_query($this->__conn, $sql);
    }

    // Hàm lấy danh sách
    function get_list($sql)
    {
        // Kết nối
        $this->connect();

        $result = mysqli_query($this->__conn, $sql);

        if (!$result) {
            die('Câu truy vấn bị sai ' . $sql);
        }

        $return = array();

        // Lặp qua kết quả để đưa vào mảng
        while ($row = mysqli_fetch_assoc($result)) {
            $return[] = $row;
        }

        // Xóa kết quả khỏi bộ nhớ
        mysqli_free_result($result);

        return $return;
    }

    // Hàm lấy 1 record dùng trong trường hợp lấy chi tiết tin
    function get_row($sql)
    {
        // Kết nối
        $this->connect();

        $result = mysqli_query($this->__conn, $sql);

        if (!$result) {
            die('Câu truy vấn bị sai ' . $sql);
        }

        $row = mysqli_fetch_assoc($result);

        // Xóa kết quả khỏi bộ nhớ
        mysqli_free_result($result);

        if ($row) {
            return $row;
        }

        return false;
    }
}
