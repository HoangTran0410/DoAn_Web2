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
		echo $this->MaSP." ".$this->MaLSP." ".$this->TenSP." ".$this->DonGia." ".$this->SoLuong." ".$this->FileNameHinhAnh." ".$this->TrangThai."<br>";
	}
}
?>