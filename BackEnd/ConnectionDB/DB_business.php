<?php
require_once("DB_driver.php");

class DB_business extends DB_driver
{
    // Tên Table
    protected $_table_name = '';

    // Tên Khóa Chính
    protected $_key = '';

    // Hàm Khởi Tạo
    function __construct()
    {
        parent::connect();
    }

    // hàm set table_name và key
    function setTable($tenBang, $khoaChinh)
    {
        // Khai báo tên bảng
        $this->_table_name = $tenBang;

        // Khai báo tên field id
        $this->_key = $khoaChinh;
    }

    // Hàm ngắt kết nối
    function __destruct()
    {
        parent::dis_connect();
    }

    // Hàm thêm mới
    function add_new($data)
    {
        return parent::insert($this->_table_name, $data);
    }

    // Hàm xóa theo id
    function delete_by_id($id)
    {
        return $this->remove($this->_table_name, $this->_key . "='" . $id . "'");
    }

    // Hàm cập nhật theo id
    function update_by_id($data, $id)
    {
        return $this->update($this->_table_name, $data, $this->_key . "='" . $id . "'");
    }

    // hàm select theo id
    function select_by_id($select, $id)
    {
        $sql = "select $select from " . $this->_table_name . " where " . $this->_key . " = '" . $id . "'";
        return $this->get_row($sql);
    }

    // hàm get all
    function select_all()
    {
        $sql = "select * from " . $this->_table_name;
        return $this->get_list($sql);
    }
}
