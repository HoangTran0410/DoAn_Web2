<?php
interface DAOInteface
{
    function readDB();
    function query($qry);
    function add($obj);
    function delete($ma);
    function update($obj);
}

interface BUSInterface extends DAOInteface
{ 
    function get($ma);
}
