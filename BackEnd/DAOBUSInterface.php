<?php
interface DAOBUSInteface
{
    function readDB();
    function query($qry);
    function add($obj);
    function delete($ma);
    function update($obj);
}
