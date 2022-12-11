var TONGTIEN = 0;
var TATCA_DONHANG = [];

window.onload = function () {
  document.getElementById("btnDangXuat").onclick = function () {
    checkDangXuat(() => {
      window.location.href = "login.php";
    });
  };

  function tuChoiTruyCap() {
    document.body.innerHTML = `
        <h1 class="tuchoitruycap"> 
            <p>Truy cập bị từ chối..</p> <br/>
            <a href="login.php" class="tuchoitruycap">
              Đăng nhập Admin
            </a>
        </h1>`;
  }

  getCurrentUser(
    (user) => {
      if (user != null && user.MaQuyen != 1) {
        addEventChangeTab();
      } else {
        tuChoiTruyCap();
      }
    },
    (e) => {
      tuChoiTruyCap();
    }
  );
};

function refreshTableSanPham() {
  $.ajax({
    type: "POST",
    url: "php/xulysanpham.php",
    dataType: "json",
    // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
    data: {
      request: "getall",
    },
    success: function (data, status, xhr) {
      list_products = data; // biến toàn cục lưu trữ mảng sản phẩm hiện có

      addTableProducts(data);
    },
    error: function (e) {
      Swal.fire({
        type: "error",
        title: "Lỗi lấy dữ liệu sản phẩm (admin.js > refreshTableSanPham)",
        html: e.responseText,
      });
      console.log(e.responseText);
    },
  });
}

function addChart(id, chartOption) {
  var ctx = document.getElementById(id).getContext("2d");
  var chart = new Chart(ctx, chartOption);
}

// https://stackoverflow.com/a/1484514
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

async function refreshTableThongKe() {
  layTatCaDonHang((tatCaDonHang) => {
    console.log(tatCaDonHang);

    let sanPhamBanRaTheoMaSP = {};
    for (let donHang of tatCaDonHang) {
      for (let chiTietDonHang of donHang.CTDH) {
        let masp = chiTietDonHang.MaSP;
        let soluong = Number(chiTietDonHang.SoLuong);
        let dongia = chiTietDonHang.DonGia;

        if (!(masp in sanPhamBanRaTheoMaSP)) {
          sanPhamBanRaTheoMaSP[masp] = {
            maSP: masp,
            ten: chiTietDonHang.SP.TenSP,
            soLuong: 0,
            tongTien: 0,
          };
        }

        sanPhamBanRaTheoMaSP[masp].soLuong += soluong;
        sanPhamBanRaTheoMaSP[masp].tongTien += soluong * dongia;
      }
    }

    console.log(sanPhamBanRaTheoMaSP);

    let danhSachSanPhamBanRa = Object.values(sanPhamBanRaTheoMaSP);
    let bgColor = danhSachSanPhamBanRa.map(getRandomColor);
    let soLuongBanRa = {
      type: "bar",
      data: {
        labels: danhSachSanPhamBanRa.map((_) => _.ten),
        datasets: [
          {
            label: "Số lượng bán ra",
            data: danhSachSanPhamBanRa.map((_) => _.soLuong),
            backgroundColor: bgColor,
            borderWidth: 2,
          },
        ],
      },
      options: {
        // legend: { display: false },
        title: {
          fontColor: "#fff",
          fontSize: 25,
          display: true,
          text: "Số lượng bán ra",
        },
      },
    };
    let doanhThu = {
      type: "bar",
      data: {
        labels: danhSachSanPhamBanRa.map((_) => _.ten),
        datasets: [
          {
            label: "Số lượng bán ra",
            data: danhSachSanPhamBanRa.map((_) => _.tongTien),
            backgroundColor: bgColor,
            borderWidth: 2,
          },
        ],
      },
      options: {
        title: {
          fontColor: "#fff",
          fontSize: 25,
          display: true,
          text: "Doanh thu",
        },
      },
    };

    // Thêm thống kê
    var chart = copyObject(soLuongBanRa);
    chart.type = "bar";
    addChart("myChart1", chart);

    chart = copyObject(doanhThu);
    chart.type = "doughnut";
    addChart("myChart2", chart);

    // var pieChart = copyObject(dataChart);
    // pieChart.type = "pie";
    // addChart("myChart3", pieChart);

    // var lineChart = copyObject(dataChart);
    // lineChart.type = "line";
    // addChart("myChart4", lineChart);
  });
}

function ajaxLoaiSanPham() {
  $.ajax({
    type: "POST",
    url: "php/xulyloaisanpham.php",
    dataType: "json",
    // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
    data: {
      request: "getall",
    },
    success: function (data, status, xhr) {
      showLoaiSanPham(data);
    },
    error: function (e) {},
  });
}

function showLoaiSanPham(data) {
  var s = "";
  for (var i = 0; i < data.length; i++) {
    var p = data[i];
    s += `<option value="` + p.MaLSP + `">` + p.TenLSP + `</option>`;
  }
  document.getElementsByName("chonCompany")[0].innerHTML = s;
}

function ajaxKhuyenMai() {
  $.ajax({
    type: "POST",
    url: "php/xulykhuyenmai.php",
    dataType: "json",
    // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
    data: {
      request: "getall",
    },
    success: function (data, status, xhr) {
      showKhuyenMai(data);
      showGTKM(data);
    },
    error: function (e) {},
  });
}

function showKhuyenMai(data) {
  var s =
    `
        <option selected="selected" value="` +
    data[0].MaKM +
    `">Không</option>
        <option value="` +
    data[1].MaKM +
    `">Trả góp</option>
        <option value="` +
    data[2].MaKM +
    `">Giảm giá</option>
        <option value="` +
    data[3].MaKM +
    `">Giá rẻ online</option>
        <option value="` +
    data[4].MaKM +
    `">Mởi ra mắt</option>`;
  document.getElementsByName("chonKhuyenMai")[0].innerHTML = s;
}

function showGTKM() {
  var giaTri = document.getElementsByName("chonKhuyenMai")[0].value;
  switch (giaTri) {
    // lấy tất cả khuyến mãi
    case "1":
      document.getElementById("giatrikm").value = 0;
      break;

    case "2":
      document.getElementById("giatrikm").value = 500000;
      break;

    case "3":
      document.getElementById("giatrikm").value = 650000;
      break;

    case "4":
      document.getElementById("giatrikm").value = 0;
      break;

    case "5":
      document.getElementById("giatrikm").value = 0;
      break;

    default:
      break;
  }
}

function previewImage(input, imgid) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(`#${imgid}`).attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}

// ======================= Các Tab =========================
function addEventChangeTab() {
  var sidebar = document.getElementsByClassName("sidebar")[0];
  var list_a = sidebar.getElementsByTagName("a");

  for (var a of list_a) {
    if (!a.onclick) {
      a.addEventListener("click", function () {
        turnOff_Active();
        this.classList.add("active");
        var tab = this.getElementsByTagName("span")[0].innerHTML.trim();
        console.log(tab);
        openTab(tab);
      });
    }
  }
}

function turnOff_Active() {
  var sidebar = document.getElementsByClassName("sidebar")[0];
  var list_a = sidebar.getElementsByTagName("a");
  for (var a of list_a) {
    a.classList.remove("active");
  }
}

function openTab(nameTab) {
  // ẩn hết
  var main = document.getElementsByClassName("main")[0].children;
  for (var e of main) {
    e.style.display = "none";
  }

  // mở tab
  switch (nameTab) {
    case "Home":
      document.getElementsByClassName("home")[0].style.display = "block";
      break;
    case "Sản Phẩm":
      document.getElementsByClassName("sanpham")[0].style.display = "block";
      break;
    case "Đơn Hàng":
      document.getElementsByClassName("donhang")[0].style.display = "block";
      break;
    case "Khách Hàng":
      document.getElementsByClassName("khachhang")[0].style.display = "block";
      break;
    case "Thống Kê":
      document.getElementsByClassName("thongke")[0].style.display = "block";
      break;
  }
}

// ========================== Sản Phẩm ========================
// Vẽ bảng danh sách sản phẩm
function addTableProducts(list_products) {
  var tc = document
    .getElementsByClassName("sanpham")[0]
    .getElementsByClassName("table-content")[0];
  var s = `<table class="table-outline hideImg">`;

  for (var i = 0; i < list_products.length; i++) {
    var p = list_products[i];

    let masp = p.MaSP;
    let tensp = p.TenSP.split(" ").join("-");
    let tenkm = /*promoToStringValue(*/ p.KM.TenKM; /*)*/
    let dongia = parseInt(p.DonGia).toLocaleString();
    let trangthai = p.TrangThai == 1 ? "Hiện" : "Ẩn";

    let hamXoaSP = `xoaSanPham('${p.TrangThai}', '${p.MaSP}', '${p.TenSP}')`;

    s += `<tr>
            <td style="width: 5%">${i + 1}</td>
            <td style="width: 10%">${p.MaSP}</td>
            <td style="width: 40%">
                <a title="Xem chi tiết" target="_blank" href="chitietsanpham.php?${masp}">
                  ${p.TenSP}
                </a>
                <img src="${p.HinhAnh}"></img>
            </td>
            <td style="width: 15%">${dongia}</td>
            <td style="width: 10%">${tenkm}</td>
            <td style="width: 10%">${trangthai}</td>
            <td style="width: 10%">
                <div class="tooltip">
                    <i 
                      class="fa fa-wrench" 
                      onclick="addKhungSuaSanPham('${p.MaSP}')"
                    ></i>
                    <span class="tooltiptext">Sửa</span>
                </div>
                <div class="tooltip">
                    <i 
                      class="fa fa-trash" 
                      onclick="${hamXoaSP}"
                    ></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
  }

  s += `</table>`;

  tc.innerHTML = s;
}

// Tìm kiếm
function timKiemSanPham(inp) {
  var kieuTim = document.getElementsByName("kieuTimSanPham")[0].value;
  var text = inp.value;

  // Lọc
  var vitriKieuTim = {
    ma: 1,
    ten: 2,
  }; // mảng lưu vị trí cột

  var listTr_table = document
    .getElementsByClassName("sanpham")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr
      .getElementsByTagName("td")
      [vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

    if (td.indexOf(text.toLowerCase()) < 0) {
      tr.style.display = "none";
    } else {
      tr.style.display = "";
    }
  }
}

// Thêm
function layThongTinSanPhamTuTable(id) {
  var khung = document.getElementById(id);
  var tr = khung.getElementsByTagName("tr");

  console.log(tr);

  var masp = tr[1]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var name = tr[2]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var company = tr[3]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("select")[0].value;
  var img = document.getElementById("hinhanh").value;
  var price = tr[5]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var amount = tr[6]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var star = tr[7]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var rateCount = tr[8]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var promoName = tr[9]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("select")[0].value;
  var promoValue = tr[10]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;

  var screen = tr[12]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var os = tr[13]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var camara = tr[14]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var camaraFront = tr[15]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var cpu = tr[16]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var ram = tr[17]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var rom = tr[18]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var microUSB = tr[19]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var battery = tr[20]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;

  return {
    name: name,
    img: img,
    price: price,
    company: company,
    amount: amount,
    star: star,
    rateCount: rateCount,
    promo: {
      name: promoName,
      value: promoValue,
    },
    detail: {
      screen: screen,
      os: os,
      camara: camara,
      camaraFront: camaraFront,
      cpu: cpu,
      ram: ram,
      rom: rom,
      microUSB: microUSB,
      battery: battery,
    },
    masp: masp,
    TrangThai: 1,
  };
}

function themSanPham() {
  var newSp = layThongTinSanPhamTuTable("khungThemSanPham");

  //kt tên sp
  var pattCheckTenSP = /([a-z A-Z0-9&():.'_-]{2,})$/;
  if (pattCheckTenSP.test(newSp.name) == false) {
    alert("Tên sản phẩm không hợp lệ");
    return false;
  }

  //kt hình
  /*var pattCheckHinh= /^([0-9]{1,})[.](png|jpeg|jpg)$/;
    if (pattCheckHinh.test(newSp.img) == false)
    {
        alert ("Ảnh không hợp lệ");
        return false;
    }*/

  //kt giá tiền
  var pattCheckGia = /^([0-9]){1,}(000)$/;
  if (pattCheckGia.test(newSp.price) == false) {
    alert("Đơn giá sản phẩm không hợp lệ");
    return false;
  }

  //kt số lượng
  var pattCheckSL = /[0-9]{1,}$/;
  if (pattCheckSL.test(newSp.amount) == false) {
    alert("Số lượng sản phẩm không hợp lệ");
    return false;
  }

  $.ajax({
    type: "POST",
    url: "php/xulysanpham.php",
    dataType: "json",
    // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
    data: {
      request: "add",
      dataAdd: newSp,
    },
    success: function (data, status, xhr) {
      Swal.fire({
        type: "success",
        title: "Thêm sản phẩm " + newSp.name + " thành công",
      });
      resetForm("khungThemSanPham");
      document.getElementById("khungThemSanPham").style.transform = "scale(0)";
      refreshTableSanPham();
    },
    error: function (e) {
      Swal.fire({
        type: "error",
        title: "Lỗi add",
        html: e.responseText,
      });
    },
  });
}
function resetForm(khungId) {
  var khung = document.getElementById(khungId);
  var tr = khung.getElementsByTagName("tr");

  tr[2].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
  tr[4].getElementsByTagName("td")[1].getElementsByTagName("img")[0].src = "";
  tr[5].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
  tr[6].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "0";

  tr[12].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
  tr[13].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
  tr[14].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
  tr[15].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
  tr[16].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
  tr[17].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
  tr[18].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
  tr[19].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
  tr[20].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value =
    "";
}

function autoMaSanPham(company) {
  // hàm tự tạo mã cho sản phẩm mới
  var autoMaSP = list_products[list_products.length - 1].MaSP;
  document.getElementById("maspThem").value = parseInt(autoMaSP) + 1;
}

// Xóa
function xoaSanPham(trangthai, masp, tensp) {
  if (trangthai == 1) {
    // alert ("Sản phẩm còn đang bán");
    Swal.fire({
      type: "warning",
      title: "Bạn có muốn ẨN " + tensp + " không!",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "php/xulysanpham.php",
          dataType: "json",
          // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
          data: {
            request: "hide",
            id: masp,
            trangthai: 0,
          },
          success: function (data, status, xhr) {
            Swal.fire({
              type: "success",
              title: "Ẩn thành công",
            });
            refreshTableSanPham();
          },
          error: function (e) {
            Swal.fire({
              type: "error",
              title: "Lỗi xóa",
              html: e.responseText,
            });
          },
        });
      }
    });
  } else {
    if (window.confirm("Bạn có chắc muốn xóa " + tensp)) {
      // Xóa
      $.ajax({
        type: "POST",
        url: "php/xulysanpham.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
          request: "delete",
          maspdelete: masp,
        },
        success: function (data, status, xhr) {},
        error: function () {
          Swal.fire({
            type: "error",
            title: "Lỗi xóa",
          });
        },
      });

      // Vẽ lại table
      refreshTableSanPham();
    }
  }
}

// Sửa
function suaSanPham(masp) {
  var ttsp = layThongTinSanPhamTuTable("khungSuaSanPham");

  $.ajax({
    type: "POST",
    url: "php/xulysanpham.php",
    dataType: "json",
    // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
    data: {
      request: "change",
      dataChange: ttsp,
    },
    success: function (data, status, xhr) {
      Swal.fire({
        type: "success",
        title: "Sửa sản phẩm " + ttsp.name + " thành công",
      });

      console.log(data);

      resetForm("khungSuaSanPham");
      document.getElementById("khungSuaSanPham").style.transform = "scale(0)";
      refreshTableSanPham();
    },
    error: function (e) {
      Swal.fire({
        type: "error",
        title: "Lỗi add",
        html: e.responseText,
      });
    },
  });

  return false;
}

function addKhungSuaSanPham(masp) {
  var sp;
  for (var p of list_products) {
    if (p.MaSP == masp) {
      sp = p;
    }
  }

  // danh sach hang dien thoai
  var company = [
    "Apple",
    "Coolpad",
    "HTC",
    "Itel",
    "Mobell",
    "Vivo",
    "Oppo",
    "SamSung",
    "Phillips",
    "Nokia",
    "Motorola",
    "Motorola",
    "Xiaomi",
  ];

  let selectCompany = "";
  var i = 1;
  for (var c of company) {
    var masp = i++;
    if (sp.MaLSP == masp)
      selectCompany += `<option value="${sp.MaLSP}" selected="selected">${c}</option>`;
    else selectCompany += `<option value="${masp}">${c}</option>`;
  }

  let selectIndex = 1;

  let s = `<span class="close" onclick="this.parentElement.style.transform = 'scale(0)';">&times;</span>
    <form 
      method="post" 
      action="" 
      enctype="multipart/form-data" 
      onsubmit="return suaSanPham('${sp.MaSP}')"
    >
        <table class="overlayTable table-outline table-content table-header">
            <tr>
                <th colspan="2">${sp.TenSP}</th>
            </tr>
            <tr>
                <td>Mã sản phẩm:</td>
                <td>
                  <input 
                    disabled 
                    type="text" 
                    id="maspSua" 
                    name="maspSua" 
                    value="${sp.MaSP}"
                  >
                </td>
            </tr>
            <tr>
                <td>Tên sẩn phẩm:</td>
                <td><input type="text" value="${sp.TenSP}"></td>
            </tr>
            <tr>
                <td>Hãng:</td>
                <td>
                    <select name="chonCompany" onchange="autoMaSanPham(this.value)">
                      ${selectCompany}
                    </select>
                </td>
            </tr>
            
            <tr>
                <td>Hình:</td>
                <td>
                    <img class="hinhDaiDien" id="anhDaiDienSanPhamSua" src="">
                    <input type="file" name="hinhanh" onchange="previewImage(this, 'anhDaiDienSanPhamSua')">
                    <input 
                      style="display: none;" 
                      type="text" 
                      id="hinhanh" 
                      value="${sp.HinhAnh}">
                </td>
            </tr>
            <tr>
                <td>Giá tiền:</td>
                <td><input type="number" value="${sp.DonGia}"></td>
            </tr>
            <tr>
                <td>Số lượng:</td>
                <td><input type="number" value="${sp.SoLuong}"></td>
            </tr>
            <tr>
                <td>Số sao:</td>
                <td><input type="number" value="${sp.SoSao}"></td>
            </tr>
            <tr>
                <td>Đánh giá:</td>
                <td><input type="number" value="${sp.SoDanhGia}"></td>
            </tr>
            <tr>
                <td>Khuyến mãi:</td>
                <td>
                    <select name="chonKhuyenMai" onchange="showGTKM()">
                      <option value="${selectIndex++}">Không</option>
                      <option value="${selectIndex++}">Giảm giá</option>
                      <option value="${selectIndex++}">Giá rẻ online</option>
                      <option value="${selectIndex++}">Trả góp</option>
                      <option value="${selectIndex}">Mới ra mắt</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Giá trị khuyến mãi:</td>
                <td><input id="giatrikm" type="number" value="0"></td>
            </tr>
            <tr>
                <th colspan="2">Thông số kĩ thuật</th>
            </tr>
            <tr>
                <td>Màn hình:</td>
                <td><input type="text" value="${sp.ManHinh}"></td>
            </tr>
            <tr>
                <td>Hệ điều hành:</td>
                <td><input type="text" value="${sp.HDH}"></td>
            </tr>
            <tr>
                <td>Camara sau:</td>
                <td><input type="text" value="${sp.CamSau}"></td>
            </tr>
            <tr>
                <td>Camara trước:</td>
                <td><input type="text" value="${sp.CamTruoc}"></td>
            </tr>
            <tr>
                <td>CPU:</td>
                <td><input type="text" value="${sp.CPU}"></td>
            </tr>
            <tr>
                <td>RAM:</td>
                <td><input type="text" value="${sp.Ram}"></td>
            </tr>
            <tr>
                <td>Bộ nhớ trong:</td>
                <td><input type="text" value="${sp.Rom}"></td>
            </tr>
            <tr>
                <td>Thẻ nhớ:</td>
                <td><input type="text" value="${sp.SDCard}"></td>
            </tr>
            <tr>
                <td>Dung lượng Pin:</td>
                <td><input type="text" value="${sp.Pin}"></td>
            </tr>
            <tr>
                <td colspan="2"  class="table-footer"> <button name="submit">SỬA</button> </td>
            </tr>
        </table>`;

  var khung = document.getElementById("khungSuaSanPham");
  khung.innerHTML = s;
  khung.style.transform = "scale(1)";
}

// Cập nhật ảnh sản phẩm
function capNhatAnhSanPham(files, id, anh) {
  var url = "";
  if (files.length) url = window.URL.createObjectURL(files[0]);

  document.getElementById(id).src = url;
  document.getElementById("hinhanh").value = anh;
}

// Sắp Xếp sản phẩm
function sortProductsTable(loai) {
  var list = document
    .getElementsByClassName("sanpham")[0]
    .getElementsByClassName("table-content")[0];
  var tr = list.getElementsByTagName("tr");

  quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_SanPham); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ...
  decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_SanPham(tr, loai) {
  var td = tr.getElementsByTagName("td");
  switch (loai) {
    case "stt":
      return Number(td[0].innerHTML);
    case "masp":
      return Number(td[1].innerHTML);
    case "ten":
      return td[2].innerHTML.toLowerCase();
    case "gia":
      return stringToNum(td[3].innerHTML);
    case "khuyenmai":
      return td[4].innerHTML.toLowerCase();
  }
  return false;
}

// ========================= Đơn Hàng ===========================

function layTatCaDonHang(callback) {
  $.ajax({
    type: "POST",
    url: "php/xulydonhang.php",
    dataType: "json",
    // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
    data: {
      request: "getall",
    },
    success: function (data, status, xhr) {
      callback(data);
    },
    error: function (e) {
      Swal.fire({
        type: "error",
        title: "Lỗi lấy dữ liệu đơn Hàng (admin.js > refreshTableDonHang)",
        html: e.responseText,
      });
      callback([]);
    },
  });
}

// Vẽ bảng
function refreshTableDonHang() {
  layTatCaDonHang((data) => {
    addTableDonHang(data);
    TATCA_DONHANG = data;
    console.log(data);
  });
}
function addTableDonHang(data) {
  var tc = document
    .getElementsByClassName("donhang")[0]
    .getElementsByClassName("table-content")[0];
  var s = `<table class="table-outline hideImg">`;

  TONGTIEN = 0;
  for (var i = 0; i < data.length; i++) {
    var d = data[i];

    // Ngày giờ
    var date = new Date(d.NgayLap).toLocaleString();

    //  danh sach san pham
    var dssp = ``;
    for (var ct of d.CTDH) {
      dssp += `<a target="blank" href="chitietsanpham.php?${ct.SP.MaSP}">
        <p>${ct.SP.TenSP} [<span style="color:yellow">${ct.SoLuong}</span>]</p>
      </a>`;
    }

    // Nút bấm Hành động
    let action =
      d.TrangThai == "-1" // Đã hủy
        ? "_"
        : d.TrangThai == "1" // Chờ duyệt
        ? `<div class="tooltip">
              <i class="fa fa-check" onclick="capNhatDonHang('${d.MaHD}', '2')"></i>
              <span class="tooltiptext">Duyệt</span>
          </div>
          <div class="tooltip">
              <i class="fa fa-remove" onclick="capNhatDonHang('${d.MaHD}', '-1')"></i>
              <span class="tooltiptext">Hủy</span>
          </div>`
        : d.TrangThai == "2" // Đã duyệt
        ? `<div class="tooltip">
                <i class="fa fa-check" onclick="capNhatDonHang('${d.MaHD}', '3')"></i>
                <span class="tooltiptext">Giao hàng</span>
            </div>
            <div class="tooltip">
                <i class="fa fa-remove" onclick="capNhatDonHang('${d.MaHD}', '-1')"></i>
                <span class="tooltiptext">Hủy</span>
            </div>`
        : d.TrangThai == "3" // Đang giao
        ? `<div class="tooltip">
              <i class="fa fa-check" onclick="capNhatDonHang('${d.MaHD}', '4')"></i>
              <span class="tooltiptext">Giao xong</span>
          </div>
          <div class="tooltip">
              <i class="fa fa-remove" onclick="capNhatDonHang('${d.MaHD}', '-1')"></i>
              <span class="tooltiptext">Hủy</span>
          </div>`
        : d.TrangThai == "4" // Giao xong
        ? `_`
        : "";

    // Người dùng
    let nguoiDung =
      `${d.ND.TaiKhoan}<br/>` +
      `(${d.ND.Ho} ${d.ND.Ten})<br/>` +
      `Mã: ${d.MaND}`;

    s += `<tr>
          <td style="width: 5%">${i + 1}</td>
          <td style="width: 7%">${d.MaHD}</td>
          <td style="width: 13%">${nguoiDung}</td>
          <td style="width: 20%; text-align:right;">${dssp}</td>
          <td style="width: 15%">${numToString(Number(d.TongTien))}</td>
          <td style="width: 10%">${date}</td>
          <td style="width: 10%">${getTenTrangThaiDonHang(d.TrangThai)}</td>
          <td style="width: 10%">${action}</td>
      </tr>`;
    TONGTIEN += Number(d.tongtien);
  }

  s += `</table>`;
  tc.innerHTML = s;
}

// Duyệt
function capNhatDonHang(maDonHang, trangThai) {
  let donhang = TATCA_DONHANG.find((_) => _.MaHD === maDonHang);
  if (!donhang) {
    Swal.fire({
      type: "error",
      title:
        "Không tìm thấy đơn hàng #" + maDonHang + ". Vui lòng tải lại trang.",
      html: e.responseText,
    });
    return;
  }
  if (trangThai == "-1") {
    Swal.fire({
      type: "warning",
      title: "Bạn có chắc muốn Hủy đơn hàng #" + maDonHang + "?",
      text: "Việc này không thể hoàn tác!",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Hủy đơn",
      cancelButtonText: "Giữ lại",
    }).then((result) => {
      if (result.value) {
        capNhatDonHangAjax(maDonHang, trangThai);
      }
    });
  } else {
    Swal.fire({
      type: "info",
      title:
        "Cập nhật đơn hàng #" +
        maDonHang +
        " thành " +
        getTenTrangThaiDonHang(trangThai) +
        "?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.value) {
        capNhatDonHangAjax(maDonHang, trangThai);
      }
    });
  }
}

function capNhatDonHangAjax(maDonHang, trangThai) {
  $.ajax({
    type: "POST",
    url: "php/xulydonhang.php",
    dataType: "json",
    data: {
      request: "capNhatTrangThai",
      maDonHang: maDonHang,
      trangThai: trangThai,
    },
    beforeSend: function () {
      Swal.showLoading();
    },
    success: function (data, status, xhr) {
      console.log(data);
      Swal.fire({
        type: "success",
        title: "Cập nhật trạng thái đơn hàng #" + maDonHang + " thành công",
      });
      refreshTableDonHang();
    },
    error: function (e) {
      console.log(e);
      Swal.fire({
        type: "error",
        title:
          "Lỗi cập nhật trạng thái đơn hàng (admin.js > capNhatDonHangAjax)",
        html: e.responseText,
      });
    },
  });
}

function locDonHangTheoKhoangNgay() {
  var from = document.getElementById("fromDate").valueAsDate;
  var to = document.getElementById("toDate").valueAsDate;

  var listTr_table = document
    .getElementsByClassName("donhang")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr.getElementsByTagName("td")[5].innerHTML;
    var d = new Date(td);

    if (d >= from && d <= to) {
      tr.style.display = "";
    } else {
      tr.style.display = "none";
    }
  }
}

function timKiemDonHang(inp) {
  var kieuTim = document.getElementsByName("kieuTimDonHang")[0].value;
  var text = inp.value;

  // Lọc
  var vitriKieuTim = {
    ma: 1,
    khachhang: 2,
    trangThai: 6,
  };

  var listTr_table = document
    .getElementsByClassName("donhang")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr
      .getElementsByTagName("td")
      [vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

    if (td.indexOf(text.toLowerCase()) < 0) {
      tr.style.display = "none";
    } else {
      tr.style.display = "";
    }
  }
}

// Sắp xếp
function sortDonHangTable(loai) {
  var list = document
    .getElementsByClassName("donhang")[0]
    .getElementsByClassName("table-content")[0];
  var tr = list.getElementsByTagName("tr");

  quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_DonHang);
  decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_DonHang(tr, loai) {
  var td = tr.getElementsByTagName("td");
  switch (loai) {
    case "stt":
      return Number(td[0].innerHTML);
    case "ma":
      return new Date(td[1].innerHTML); // chuyển về dạng ngày để so sánh ngày
    case "khach":
      return td[2].innerHTML.toLowerCase(); // lấy tên khách
    case "sanpham":
      return td[3].children.length; // lấy số lượng hàng trong đơn này, length ở đây là số lượng <p>
    case "tongtien":
      return stringToNum(td[4].innerHTML); // trả về dạng giá tiền
    case "ngaygio":
      return new Date(td[5].innerHTML); // chuyển về ngày
    case "trangthai":
      return td[6].innerHTML.toLowerCase(); //
  }
  return false;
}

// ====================== Khách Hàng =============================
// Vẽ bảng
function refreshTableKhachHang() {
  $.ajax({
    type: "POST",
    url: "php/xulykhachhang.php",
    dataType: "json",
    // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
    data: {
      request: "getall",
    },
    success: function (data, status, xhr) {
      addTableKhachHang(data);
      console.log(data);
    },
    error: function (e) {
      Swal.fire({
        type: "error",
        title: "Lỗi lấy dữ liệu khách Hàng (admin.js > refreshTableKhachHang)",
        html: e.responseText,
      });
    },
  });
}

function thayDoiTrangThaiND(inp, mand) {
  var trangthai = inp.checked ? 1 : 0;
  $.ajax({
    type: "POST",
    url: "php/xulykhachhang.php",
    dataType: "json",
    // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
    data: {
      request: "changeTT",
      key: mand,
      trangThai: trangthai,
    },
    success: function (data, status, xhr) {
      //list_products = data; // biến toàn cục lưu trữ mảng sản phẩm hiện có
      // refreshTableKhachHang();
      //console.log(data);
    },
    error: function (e) {
      // Swal.fire({
      //     type: "error",
      //     title: "Lỗi lấy dữ liệu khách Hàng (admin.js > refreshTableKhachHang)",
      //     html: e.responseText
      // });
      console.log(e.responseText);
    },
  });
}

function addTableKhachHang(data) {
  var tc = document
    .getElementsByClassName("khachhang")[0]
    .getElementsByClassName("table-content")[0];
  var s = `<table class="table-outline hideImg">`;

  for (var i = 0; i < data.length; i++) {
    var u = data[i];

    s += `<tr>
            <td >${i + 1}</td>
            <td >${u.Ho} ${u.Ten}</td>
            <td >${u.Email}</td>
            <td >${u.TaiKhoan}</td>           
            <td >
                <div class="tooltip">
                    <label class="switch">
                        <input type="checkbox" ${
                          u.TrangThai == 1 ? "checked" : ""
                        } onclick="thayDoiTrangThaiND(this, '${u.MaND}')">
                        <span class="slider round"></span>
                    </label>
                    <span class="tooltiptext">${
                      u.TrangThai ? "Mở" : "Khóa"
                    }</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-remove" onclick="xoaNguoiDung('${
                      u.MaND
                    }')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
  }

  s += `</table>`;
  tc.innerHTML = s;
}

// Tìm kiếm
function timKiemNguoiDung(inp) {
  var kieuTim = document.getElementsByName("kieuTimKhachHang")[0].value;
  var text = inp.value;

  // Lọc
  var vitriKieuTim = {
    ten: 1,
    email: 2,
    taikhoan: 3,
  };

  var listTr_table = document
    .getElementsByClassName("khachhang")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr
      .getElementsByTagName("td")
      [vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

    if (td.indexOf(text.toLowerCase()) < 0) {
      tr.style.display = "none";
    } else {
      tr.style.display = "";
    }
  }
}

function openThemNguoiDung() {
  window.alert("Not Available!");
}

// vô hiệu hóa người dùng (tạm dừng, không cho đăng nhập vào)
function voHieuHoaNguoiDung(TrangThai) {
  if (TrangThai == 1) {
  }
  var span = inp.parentElement.nextElementSibling;
  span.innerHTML = inp.checked ? "Khóa" : "Mở";
}

// Xóa người dùng
function xoaNguoiDung(mand) {
  Swal.fire({
    title: "Bạn có chắc muốn xóa?",
    type: "question",
    showCancelButton: true,
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type: "POST",
        url: "php/xulykhachhang.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
          request: "delete",
          mand: mand,
        },
        success: function (data, status, xhr) {
          refreshTableKhachHang();
          //console.log(data);
        },
        error: function (e) {
          // Swal.fire({
          //     type: "error",
          //     title: "Lỗi lấy dữ liệu khách Hàng (admin.js > refreshTableKhachHang)",
          //     html: e.responseText
          // });
          console.log(e.responseText);
        },
      });
    }
  });
}

// Sắp xếp
function sortKhachHangTable(loai) {
  var list = document
    .getElementsByClassName("khachhang")[0]
    .getElementsByClassName("table-content")[0];
  var tr = list.getElementsByTagName("tr");

  quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_KhachHang);
  decrease = !decrease;
}

function getValueOfTypeInTable_KhachHang(tr, loai) {
  var td = tr.getElementsByTagName("td");
  switch (loai) {
    case "stt":
      return Number(td[0].innerHTML);
    case "hoten":
      return td[1].innerHTML.toLowerCase();
    case "email":
      return td[2].innerHTML.toLowerCase();
    case "taikhoan":
      return td[3].innerHTML.toLowerCase();
    case "matkhau":
      return td[4].innerHTML.toLowerCase();
  }
  return false;
}

// ================== Sort ====================
// https://github.com/HoangTran0410/First_html_css_js/blob/master/sketch.js
var decrease = true; // Sắp xếp giảm dần

// loại là tên cột, func là hàm giúp lấy giá trị từ cột loai
function quickSort(arr, left, right, loai, func) {
  var pivot, partitionIndex;

  if (left < right) {
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right, loai, func);

    //sort left and right
    quickSort(arr, left, partitionIndex - 1, loai, func);
    quickSort(arr, partitionIndex + 1, right, loai, func);
  }
  return arr;
}

function partition(arr, pivot, left, right, loai, func) {
  var pivotValue = func(arr[pivot], loai),
    partitionIndex = left;

  for (var i = left; i < right; i++) {
    if (
      (decrease && func(arr[i], loai) > pivotValue) ||
      (!decrease && func(arr[i], loai) < pivotValue)
    ) {
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(arr, right, partitionIndex);
  return partitionIndex;
}

function swap(arr, i, j) {
  var tempi = arr[i].cloneNode(true);
  var tempj = arr[j].cloneNode(true);
  arr[i].parentNode.replaceChild(tempj, arr[i]);
  arr[j].parentNode.replaceChild(tempi, arr[j]);
}

// ================= các hàm thêm ====================
// Chuyển khuyến mãi vễ dạng chuỗi tiếng việt
function promoToStringValue(pr) {
  switch (pr.name) {
    case "tragop":
      return "Góp " + pr.value + "%";
    case "giamgia":
      return "Giảm " + pr.value;
    case "giareonline":
      return "Online (" + pr.value + ")";
    case "moiramat":
      return "Mới";
  }
  return "";
}

function progress(percent, bg, width, height) {
  return (
    `<div class="progress" style="width: ` +
    width +
    `; height:` +
    height +
    `">
                <div class="progress-bar bg-info" style="width: ` +
    percent +
    `%; background-color:` +
    bg +
    `"></div>
            </div>`
  );
}

// for(var i = 0; i < list_products.length; i++) {
//     list_products[i].masp = list_products[i].company.substring(0, 3) + vitriCompany(list_products[i], i);
// }

// console.log(JSON.stringify(list_products));
