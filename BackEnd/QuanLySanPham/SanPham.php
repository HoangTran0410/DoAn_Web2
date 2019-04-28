<?php 
class SanPham {
	var $MaSP;
	var $TenSP;
	var $DonGia;
	var $SoLuong;
	var $FileNameHinhAnh;
	var $TrangThai;

	function SanPham($MaSP, $MaLSP, $TenSP, $DonGia, $SoLuong, $url, $TrangThai) {
		$this->MaSP = $MaSP;
		$this->MaLSP = $MaLSP;
		$this->TenSP = $TenSP;
		$this->DonGia = $DonGia;
		$this->SoLuong = $SoLuong;
		$this->FileNameHinhAnh = $url;
		$this->TrangThai = $TrangThai;
	}

	function show() {
		echo "<tr>
			<td>".$this->MaSP."</td>
			<td>".$this->MaLSP."</td>
			<td>".$this->TenSP."</td>
			<td>".$this->DonGia."</td>
			<td>".$this->SoLuong."</td>
			<td>".$this->FileNameHinhAnh."</td>
			<td>".$this->TrangThai."</td>
		</tr>";
	}
}
