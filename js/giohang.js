var currentuser; // user hiện tại, biến toàn cục
window.onload = function () {
	khoiTao();

	// thêm tags (từ khóa) vào khung tìm kiếm
	var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
	for (var t of tags) addTags(t, "index.php?search=" + t)

	// currentuser = getCurrentUser();
	var listGioHang = getListGioHang();
	initTableSanPham(listGioHang);
}

function abc() {
	for(var p of list) {
		$.ajax({
			type: "POST",
	        url: "php/xulysanpham.php",
	        dataType: "json",
	        timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
	        data: {
	            request: "getbyid",
	            id: p.masp
	        },
	        success: function(data, status, xhr) {
	            addSanPhamToTable(data);
	        },
	        error: function(e) {
	            console.log('fail');
	        }
		})
	}

	var totalPrice = 0;
		// 	s += `
	// 		<tr>
	// 			<td>` + (i + 1) + `</td>
	// 			<td class="noPadding imgHide">
	// 				<a target="_blank" href="chitietsanpham.php?` + p.name.split(' ').join('-') + `" title="Xem chi tiết">
	// 					` + p.name + `
	// 					<img src="` + p.img + `">
	// 				</a>
	// 			</td>
	// 			<td class="alignRight">` + price + ` ₫</td>
	// 			<td class="soluong" >
	// 				<button onclick="giamSoLuong('` + masp + `')"><i class="fa fa-minus"></i></button>
	// 				<input size="1" onchange="capNhatSoLuongFromInput(this, '` + masp + `')" value=` + soluongSp + `>
	// 				<button onclick="tangSoLuong('` + masp + `')"><i class="fa fa-plus"></i></button>
	// 			</td>
	// 			<td class="alignRight">` + numToString(thanhtien) + ` ₫</td>
	// 			<td style="text-align: center" >` + thoigian + `</td>
	// 			<td class="noPadding"> <i class="fa fa-trash" onclick="xoaSanPhamTrongGioHang(` + i + `)"></i> </td>
	// 		</tr>
	// 	`;
	// 	// Chú ý nháy cho đúng ở giamsoluong, tangsoluong
	// 	totalPrice += thanhtien;
}

function addSanPhamToTable(sp) {
	
}

function initTableSanPham(list) {
	var table = document.getElementsByClassName('listSanPham')[0];

	var s = `
		<tbody>
			<tr>
				<th>Sản phẩm</th>
				<th>Giá</th>
				<th>Số lượng</th>
				<th>Thành tiền</th>
				<th>Xóa</th>
			</tr>`;

	if (!list || list.length == 0) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:green; background-color:white; font-weight:bold; text-align:center; padding: 15px 0;">
						Giỏ hàng trống !!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return;
	}

	s += `<tr>
			<td>
				<table id="tablesanpham" class="listSanPham">

				</table>
			</td>
		</tr>`

	s += `
			<tr style="font-weight:bold; text-align:center">
				<td colspan="3">TỔNG TIỀN: </td>
				<td class="alignRight">` + numToString(0) + ` ₫</td>
				<td class="thanhtoan" onclick="thanhToan()"><i class="fa fa-usd"></i> Thanh Toán </td>
				<td></td>
			</tr>
			<tr>
				<td colspan="4"></td>
				<td class="xoaHet" onclick="xoaHet()"><i class="fa fa-ban"></i> Xóa hết </td>
			</tr>
		</tbody>
	`;

	table.innerHTML = s;
}

function xoaSanPhamTrongGioHang(i) {

	Swal.fire({
		type: "question",
		title: "Xác nhận?",
		html: "Bạn có chắc muốn xóa sản phẩm này ?",
		grow: "row",
		cancelButtonText: 'Hủy',
		showCancelButton: true

	}).then((result) => {
		if (result.value) {
			currentuser.products.splice(i, 1);
			capNhatMoiThu();
		}
	});
}

function thanhToan() {
	var c_user = getCurrentUser();
	if (c_user.off) {
		// alert('Tài khoản của bạn hiện đang bị khóa nên không thể mua hàng!');
		// addAlertBox('Tài khoản của bạn đã bị khóa bởi Admin.', '#aa0000', '#fff', 10000);
		Swal.fire({
			title: 'Tài Khoản Bị Khóa!',
			text: 'Tài khoản của bạn hiện đang bị khóa nên không thể mua hàng!',
			type: 'error',
			grow: 'row',
			confirmButtonText: 'Trở về',
			footer: '<a href>Liên hệ với Admin</a>'
		});
		return;
	}

	if (!currentuser.products.length) {
		Swal.fire({
			type: 'info',
			title: "Rỗng",
			grow: 'row',
			text: 'Không có mặt hàng nào để thanh toán.'
		});
		// addAlertBox('Không có mặt hàng nào cần thanh toán !!', '#ffb400', '#fff', 2000);
		return;
	}

	Swal.fire({
		type: 'question',
		title: "Thanh toán giỏ hàng?",
		confirmButtonText: "Đồng ý",
		cancelButtonText: "Để sau",
		showCancelButton: true,
		grow: 'row',
	}).then((result) => {
		if (result.value) {
			currentuser.donhang.push({
				"sp": currentuser.products,
				"ngaymua": new Date(),
				"tinhTrang": 'Đang chờ xử lý'
			});

			currentuser.products = [];
			capNhatMoiThu();
			
			Swal.fire({
				type: 'success',
				title: "Xong",
				grow: 'row',
				text: 'Các sản phẩm đã được gửi vào đơn hàng và chờ xử lý.'
			});
		}
	});
}

function xoaHet() {
	if (currentuser.products.length) {
		Swal.fire({
			title: 'Xóa Hết?',
			text: 'Bạn có chắc muốn xóa hết sản phẩm trong giỏ! Việc này không thể được hoàn lại.',
			type: 'warning',
			grow: 'row',
			confirmButtonText: 'Tôi đồng ý',
			cancelButtonText: 'Hủy',
			showCancelButton: true

		}).then((result) => {
			if (result.value) {
				currentuser.products = [];
				capNhatMoiThu();
			}
		})
	}
}

// Cập nhật số lượng lúc nhập số lượng vào input
function capNhatSoLuongFromInput(inp, masp) {
	var soLuongMoi = Number(inp.value);
	if (!soLuongMoi || soLuongMoi <= 0) soLuongMoi = 1;

	for (var p of currentuser.products) {
		if (p.ma == masp) {
			p.soluong = soLuongMoi;
		}
	}

	capNhatMoiThu();
}

function tangSoLuong(masp) {
	for (var p of currentuser.products) {
		if (p.ma == masp) {
			p.soluong++;
		}
	}

	capNhatMoiThu();
}

function giamSoLuong(masp) {
	for (var p of currentuser.products) {
		if (p.ma == masp) {
			if (p.soluong > 1) {
				p.soluong--;
			} else {
				return;
			}
		}
	}

	capNhatMoiThu();
}

function capNhatMoiThu() { // Mọi thứ
	animateCartNumber();

	// cập nhật danh sách sản phẩm trong localstorage
	setCurrentUser(currentuser);
	updateListUser(currentuser);

	// cập nhật danh sách sản phẩm ở table
	addProductToTable(currentuser);

	// Cập nhật trên header
	capNhat_ThongTin_CurrentUser();
}