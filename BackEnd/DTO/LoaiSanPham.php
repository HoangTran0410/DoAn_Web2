<?php
class LoaiSanPham
{
    var $Ma;
    var $TenLSP;
    var $MoTa;

    function LoaiSanPham($MaLSP,  $TenLSP, $MoTa)
    {
        $this->Ma = $MaLSP;
        $this->TenLSP = $TenLSP;
        $this->MoTa = $MoTa;
    }

    function show()
    {
        echo "<tr>
			<td>" . $this->Ma . "</td>
			<td>" . $this->TenLSP . "</td>
			<td>" . $this->MoTa . "</td>
		</tr>";
    }
}
