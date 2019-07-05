var TotalPrice = 0;
window.onload = function() {
    khoiTao();

    // thêm tags (từ khóa) vào khung tìm kiếm
    var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
    for (var t of tags) addTags(t, "index.php?search=" + t)

    var listGioHang = getListGioHang();
    getListFromDB(listGioHang);
}

function getListFromDB(list) {
    if (!list || !list.length) {
        addProductToTable(list);
        return;
    };

    var listID = [];
    for (var p of list) {
        listID.push(p.masp);
    }

    $.ajax({
        type: "POST",
        url: "php/xulysanpham.php",
        dataType: "json",
        timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "getlistbyids",
            listID: listID
        },
        success: function(data, status, xhr) {
            // addSanPhamToTable(data);
            for (var p of data) {
                for (var g of list) {
                    if (p.MaSP == g.masp) {
                    	if(p.SoLuong >= g.soLuong) { // check đủ hàng
                        	p.SoLuongTrongGio = g.soLuong;
                    	} else {
                    		p.SoLuongTrongGio = p.SoLuong;

                    		g.soLuong = Number(p.SoLuong); // thay dổi trong localstorage luôn 
                    		setListGioHang(list); // cập nhật localstorage
            				animateCartNumber();

                    		Swal.fire({
                    			title: "Không đủ sản phẩm",
                    			type: "error",
                    			text: "Số lượng sản phẩm " + p.TenSP + " trong kho không đủ(" + p.SoLuong + ")"
                    		})
                    	}
                    }
                }
            }
            addProductToTable(data);
        },
        error: function(e) {
            console.log(e.responseText);
        }
    })
}

function addProductToTable(listProduct) {
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

    if (!listProduct || listProduct.length == 0) {
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

    var totalPrice = 0;
    for (var i = 0; i < listProduct.length; i++) {
        var p = listProduct[i];
        var masp = p.MaSP;
        var soluongSp = p.SoLuongTrongGio;
        var price = Number(p.DonGia) - Number(p.KM.GiaTriKM);
        var thanhtien = price * soluongSp;

        s += `
			<tr>
				<td class="noPadding">
					<a target="_blank" href="chitietsanpham.html?` + p.MaSP + `" title="Xem chi tiết">
						<img class="smallImg" src="` + p.HinhAnh + `">
						<br>
						` + p.TenSP + `
					</a>
				</td>
				<td class="alignRight">` + numToString(price) + ` ₫</td>
				<td class="soluong" >
					<button onclick="giamSoLuong('` + masp + `')"><i class="fa fa-minus"></i></button>
					<input size="1" onchange="capNhatSoLuongFromInput(this, '` + masp + `')" value=` + soluongSp + `>
					<button onclick="tangSoLuong('` + masp + `')"><i class="fa fa-plus"></i></button>
				</td>
				<td class="alignRight">` + numToString(thanhtien) + ` ₫</td>
				<td class="noPadding"> 
					<i class="fa fa-trash" onclick="xoaSanPhamTrongGioHang(` + masp + ",'" + p.TenSP + `')"></i> 
				</td>
			</tr>
		`;
        // Chú ý nháy cho đúng ở giamsoluong, tangsoluong
        totalPrice += thanhtien;
    }

    TotalPrice = totalPrice;

    s += `
			<tr style="font-weight:bold; text-align:center">
				<td colspan="3">TỔNG TIỀN: </td>
				<td class="alignRight" style="color:red">` + numToString(totalPrice) + ` ₫</td>
				<td></td>
			</tr>
			<tr>
				<td colspan="5">
					<button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="thanhToan()">
						<i class="fa fa-usd"></i> Thanh Toán 
					</button> 
					<button class="btn btn-danger" onclick="xoaHet()">
						<i class="fa fa-trash-o"></i> Xóa hết 
					</button>
				</td>
			</tr>
		</tbody>
	`;

    table.innerHTML = s;
}

function xoaSanPhamTrongGioHang(masp, tensp) {

    Swal.fire({
        type: "question",
        title: "Xác nhận?",
        html: "Bạn có chắc muốn xóa sản phẩm <b style='color:red'>" + tensp + "</b> ?",
        grow: "row",
        cancelButtonText: 'Hủy',
        showCancelButton: true

    }).then((result) => {
        if (result.value) {
            var listProduct = getListGioHang();

            for (var i = 0; i < listProduct.length; i++) {
                if (listProduct[i].masp == masp) {
                    listProduct.splice(i, 1);
                    break;
                }
            }

            capNhatMoiThu(listProduct);
        }
    });
}

function thanhToan() {
    var listProduct = getListGioHang();
    if (!listProduct.length) {
        Swal.fire({
            type: 'info',
            title: "Rỗng",
            grow: 'row',
            text: 'Không có mặt hàng nào để thanh toán.'
        });
        return;
    }

    getCurrentUser((user) => {
        if (user == null) {
            Swal.fire({
                title: 'Xin chào!',
                text: 'Bạn cần đăng nhập để mua hàng',
                type: 'info',
                grow: 'row',
                confirmButtonText: 'Đăng nhập',
                cancelButtonText: 'Trở về',
                showCancelButton: true
            }).then((result) => {
                if (result.value) {
                    showTaiKhoan(true);
                }
            })

        } else if (user.TrangThai == 0) {
            Swal.fire({
                title: 'Tài Khoản Bị Khóa!',
                text: 'Tài khoản của bạn hiện đang bị khóa nên không thể mua hàng!',
                type: 'error',
                grow: 'row',
                confirmButtonText: 'Trở về',
                footer: '<a href>Liên hệ với Admin</a>'
            });
        } else {
        	UserHienTai = user;  // biến toàn cục
        	htmlThanhToan(user);
        }

    }, (error) => {
        console.log(error.responseText);
    });
}

function htmlThanhToan(userHienTai) {
	console.log('abc')

	$("#thongtinthanhtoan").html(`
		<form>
		  	<div class="form-group">
		    <p>Tổng tiền : <h2>` + TotalPrice.toLocaleString() + `đ </h2></p>
		  </div>
		  <div class="form-group">
		    <label for="inputTen">Tên người nhận</label>
		    <input class="form-control input-sm" id="inputTen" required type="text" value="` + (userHienTai.Ho + " " + userHienTai.Ten) + `">
		  </div>
		   <div class="form-group">
		    <label for="inputSDT">SDT người nhận</label>
		    <input class="form-control input-sm" id="inputSDT" required type="text" pattern="\\d*" minlength="10" maxlength="12" value="` + userHienTai.SDT + `">
		  </div>
		  <div class="form-group">
		    <label for="inputDiaChi">Địa chỉ giao hàng</label>
		    <input class="form-control input-sm" id="inputDiaChi" required type="text" value="` + userHienTai.DiaChi + `">
		  </div>
		  <div class="form-group">
		    <select class="browser-default custom-select" id="selectHinhThucTT">
		      <option value="" disabled selected>Hình thức thanh toán</option>
			  <option value="Trực tiếp khi nhận hàng">Trực tiếp khi nhận hàng</option>
			  <option value="Qua thẻ ngân hàng">Qua thẻ ngân hàng</option>
			</select>
		  </div>
		</form>
	 `);
}

function xacNhanThanhToan() {
	var dulieu = {
		maNguoiDung: UserHienTai.MaND,
		tenNguoiNhan: $("#inputTen").val(),
		sdtNguoiNhan: $("#inputSDT").val(),
		diaChiNguoiNhan: $("#inputDiaChi").val(),
		phuongThucTT: $("#selectHinhThucTT").val(),
		dssp: getListGioHang(),
		tongTien: TotalPrice,
		ngayLap: new Date().toMysqlFormat()
	}

	$.ajax({
		type: "POST",
		url: "php/xulythanhtoan.php",
		dataType: "json",
		data: {
			request: "themdonhang",
			dulieu: dulieu
		},
		success: function(data) {
			capNhatMoiThu([]);
		},
		error: function(e) {
			console.log(e.responseText)
		}

	})

	return false;
}

function xoaHet() {
    var listProduct = getListGioHang();

    if (listProduct.length) {
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
                listProduct = [];
                capNhatMoiThu(listProduct);
            }
        })
    }
}

// Cập nhật số lượng lúc nhập số lượng vào input
function capNhatSoLuongFromInput(inp, masp) {
    var soLuongMoi = Number(inp.value);
    if (!soLuongMoi || soLuongMoi <= 0) soLuongMoi = 1;

    var listProduct = getListGioHang();

    for (var p of listProduct) {
        if (p.masp == masp && p.soLuong > 0) {
            p.soLuong = soLuongMoi;
        }
    }

    capNhatMoiThu(listProduct);
}

function tangSoLuong(masp) {
    var listProduct = getListGioHang();

    for (var p of listProduct) {
        if (p.masp == masp) {
            p.soLuong++;
        }
    }

    capNhatMoiThu(listProduct);
}

function giamSoLuong(masp) {
    var listProduct = getListGioHang();

    for (var p of listProduct) {
        if (p.masp == masp && p.soLuong > 1) {
            p.soLuong--;
        }
    }

    capNhatMoiThu(listProduct);
}

function capNhatMoiThu(list) { // Mọi thứ
    animateCartNumber();

    setListGioHang(list);

    // cập nhật danh sách sản phẩm ở table
    getListFromDB(list);
}