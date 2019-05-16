var nameProduct, maProduct; // Tên sản phẩm trong trang này, 
// là biến toàn cục để có thể dùng ở bát cứ đâu trong trang
// không cần tính toán lấy tên từ url nhiều lần

window.onload = function() {
    khoiTao();

    // thêm tags (từ khóa) vào khung tìm kiếm
    var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
    for (var t of tags) addTags(t, "index.php?search=" + t, true);

    phanTichURL_Web2();

    // autocomplete cho khung tim kiem
    autocomplete(document.getElementById('search-box'), list_products);
}

// ======================= Web 2 =======================
function phanTichURL_Web2() {
    idProduct = window.location.href.split('?')[1]; // lấy tên
    if (!idProduct) return; // nếu không tìm thấy tên thì thoát hàm

    $.ajax({
        type: "POST",
        url: "php/xulysanpham.php",
        dataType: "json",
        timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "getbyid",
            id: idProduct
        },
        success: function(data, status, xhr) {
            console.log(data);
        },
        error: function(e) {
            Swal.fire({
                type: "error",
                title: "Lỗi lấy sản phẩm (chitietSanpham.js > phanTichURL_Web2)",
                html: e.responseText
            });
        }
    })
}

function addToWeb(p) {
    var divChiTiet = document.getElementsByClassName('chitietSanpham')[0];

    // Đổi title
    document.title = nameProduct + ' - Thế giới điện thoại';

    // Cập nhật tên h1
    var h1 = divChiTiet.getElementsByTagName('h1')[0];
    h1.innerHTML += nameProduct;

    // Cập nhật sao
    var rating = "";
    if (sanPham.rateCount > 0) {
        rating = getRateStar(sanPham.rateCount);
        rating += `<span> ` + sanPham.rateCount + ` đánh giá </span>`;
    }
    divChiTiet.getElementsByClassName('rating')[0].innerHTML += rating;

    // Cập nhật giá + label khuyến mãi
    var price = divChiTiet.getElementsByClassName('area_price')[0];
    if (sanPham.promo.name != 'giareonline') {
        price.innerHTML = `<strong>` + sanPham.price + `₫</strong>`;
        price.innerHTML += new Promo(sanPham.promo.name, sanPham.promo.value).toWeb();
    } else {
        document.getElementsByClassName('ship')[0].style.display = ''; // hiển thị 'giao hàng trong 1 giờ'
        price.innerHTML = `<strong>` + sanPham.promo.value + `&#8363;</strong>
                            <span>` + sanPham.price + `&#8363;</span>`;
    }

    // Cập nhật chi tiết khuyến mãi
    document.getElementById('detailPromo').innerHTML = getDetailPromo(sanPham);

    // Cập nhật thông số
    var info = document.getElementsByClassName('info')[0];
    var s = addThongSo('Màn hình', sanPham.detail.screen);
    s += addThongSo('Hệ điều hành', sanPham.detail.os);
    s += addThongSo('Camara sau', sanPham.detail.camara);
    s += addThongSo('Camara trước', sanPham.detail.camaraFront);
    s += addThongSo('CPU', sanPham.detail.cpu);
    s += addThongSo('RAM', sanPham.detail.ram);
    s += addThongSo('Bộ nhớ trong', sanPham.detail.rom);
    s += addThongSo('Thẻ nhớ', sanPham.detail.microUSB);
    s += addThongSo('Dung lượng pin', sanPham.detail.battery);
    info.innerHTML = s;

    // Cập nhật hình
    var hinh = divChiTiet.getElementsByClassName('picture')[0];
    hinh = hinh.getElementsByTagName('img')[0];
    hinh.src = sanPham.img;

    // Test bình luận
    var s = "";
    for(var i = 0; i < Math.min(sanPham.rateCount, 20); i++) {
        s += createComment("Hoàng Trần", `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit.`, 
                getRateStar(Math.random()*5),  
                new Date().toShortFormat()
            );
    }

    document.getElementsByClassName("comment-content")[0].innerHTML += s;
}

// =====================================================

function phanTich_URL_chiTietSanPham() {
    nameProduct = window.location.href.split('?')[1]; // lấy tên
    if (!nameProduct) return; // nếu không tìm thấy tên thì thoát hàm

    // tách theo dấu '-' vào gắn lại bằng dấu ' ', code này giúp bỏ hết dấu '-' thay vào bằng khoảng trắng.
    // code này làm ngược lại so với lúc tạo href cho sản phẩm trong file classes.js
    nameProduct = nameProduct.split('-').join(' ');

    for (var p of list_products) {
        if (nameProduct == p.name) {
            maProduct = p.masp;
            break;
        }
    }

    var sanPham = timKiemTheoTen(list_products, nameProduct)[0];
    var divChiTiet = document.getElementsByClassName('chitietSanpham')[0];

    // Đổi title
    document.title = nameProduct + ' - Thế giới điện thoại';

    // Cập nhật tên h1
    var h1 = divChiTiet.getElementsByTagName('h1')[0];
    h1.innerHTML += nameProduct;

    // Cập nhật sao
    var rating = "";
    if (sanPham.rateCount > 0) {
        rating = getRateStar(sanPham.rateCount);
        rating += `<span> ` + sanPham.rateCount + ` đánh giá </span>`;
    }
    divChiTiet.getElementsByClassName('rating')[0].innerHTML += rating;

    // Cập nhật giá + label khuyến mãi
    var price = divChiTiet.getElementsByClassName('area_price')[0];
    if (sanPham.promo.name != 'giareonline') {
        price.innerHTML = `<strong>` + sanPham.price + `₫</strong>`;
        price.innerHTML += new Promo(sanPham.promo.name, sanPham.promo.value).toWeb();
    } else {
        document.getElementsByClassName('ship')[0].style.display = ''; // hiển thị 'giao hàng trong 1 giờ'
        price.innerHTML = `<strong>` + sanPham.promo.value + `&#8363;</strong>
					        <span>` + sanPham.price + `&#8363;</span>`;
    }

    // Cập nhật chi tiết khuyến mãi
    document.getElementById('detailPromo').innerHTML = getDetailPromo(sanPham);

    // Cập nhật thông số
    var info = document.getElementsByClassName('info')[0];
    var s = addThongSo('Màn hình', sanPham.detail.screen);
    s += addThongSo('Hệ điều hành', sanPham.detail.os);
    s += addThongSo('Camara sau', sanPham.detail.camara);
    s += addThongSo('Camara trước', sanPham.detail.camaraFront);
    s += addThongSo('CPU', sanPham.detail.cpu);
    s += addThongSo('RAM', sanPham.detail.ram);
    s += addThongSo('Bộ nhớ trong', sanPham.detail.rom);
    s += addThongSo('Thẻ nhớ', sanPham.detail.microUSB);
    s += addThongSo('Dung lượng pin', sanPham.detail.battery);
    info.innerHTML = s;

    // Cập nhật hình
    var hinh = divChiTiet.getElementsByClassName('picture')[0];
    hinh = hinh.getElementsByTagName('img')[0];
    hinh.src = sanPham.img;

    // Test bình luận
    var s = "";
    for(var i = 0; i < Math.min(sanPham.rateCount, 20); i++) {
        s += createComment("Hoàng Trần", `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit.`, 
                getRateStar(Math.random()*5),  
                new Date().toShortFormat()
            );
    }

    document.getElementsByClassName("comment-content")[0].innerHTML += s;
}

function getRateStar(num) {
    var result = "";
    for (var i = 1; i <= 5; i++) {
        if (i <= num) {
            result += `<i class="fa fa-star"></i>`
        } else {
            result += `<i class="fa fa-star-o"></i>`
        }
    }
    return result;
}

// Chi tiết khuyến mãi
function getDetailPromo(sp) {
    switch (sp.promo.name) {
        case 'tragop':
            var span = `<span style="font-weight: bold"> lãi suất ` + sp.promo.value + `% </span>`;
            return `Khách hàng có thể mua trả góp sản phẩm với ` + span + `với thời hạn 6 tháng kể từ khi mua hàng.`;

        case 'giamgia':
            var span = `<span style="font-weight: bold">` + sp.promo.value + `</span>`;
            return `Khách hàng sẽ được giảm ` + span + `₫ khi tới mua trực tiếp tại cửa hàng`;

        case 'moiramat':
            return `Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể đổi trả lỗi trong vòng 2 tháng.`;

        case 'giareonline':
            var del = stringToNum(sp.price) - stringToNum(sp.promo.value);
            var span = `<span style="font-weight: bold">` + numToString(del) + `</span>`;
            return `Sản phẩm sẽ được giảm ` + span + `₫ khi mua hàng online bằng thẻ VPBank hoặc tin nhắn SMS`;

        default:
            var span = `<span style="font-weight: bold">61 xe Wave Alpha</span>`;
            return `Cơ hội trúng ` + span + ` khi trả góp Home Credit`;
    }
}

function addThongSo(ten, giatri) {
    return `<li>
                <p>` + ten + `</p>
                <div>` + giatri + `</div>
            </li>`;
}

function createComment(name, value, star, time) {
    return `<div class="comment">
                <i class="fa fa-user-circle"> </i>
                <h4>` + name + `<span> `+ star +`</span></h4>
                <p>` + value + `</p>
                <span class="time">` + time + `</span>
            </div>`;
}

Date.prototype.toShortFormat = function() {
    // var month_names = ["Jan", "Feb", "Mar",
    //     "Apr", "May", "Jun",
    //     "Jul", "Aug", "Sep",
    //     "Oct", "Nov", "Dec"
    // ];
    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();

    var second = this.getSeconds();
    var minute = this.getMinutes();
    var hour = this.getHours();

    return day + "/" + (month_index+1) + "/" + year + " " + hour + ":" + minute;
}

/*// add hình
function addSmallImg(img) {
    var newDiv = `<div class='item'>
                        <a>
                            <img src=` + img + ` onclick="changepic(this.src)">
                        </a>
                    </div>`;
    var banner = document.getElementsByClassName('owl-carousel')[0];
    banner.innerHTML += newDiv;
}

// đóng mở xem hình
function opencertain() {
    document.getElementById("overlaycertainimg").style.transform = "scale(1)";
}

function closecertain() {
    document.getElementById("overlaycertainimg").style.transform = "scale(0)";
}

// đổi hình trong chế độ xem hình
function changepic(src) {
    document.getElementById("bigimg").src = src;
}*/