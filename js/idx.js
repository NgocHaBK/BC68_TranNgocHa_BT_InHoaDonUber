const UBER_CAR = "uberCar";
const UBER_SUV = "uberSUV";
const UBER_BLACK = "uberBlack";
const KiemTraGiaKmDauTien = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 8000;
    case UBER_BLACK:
      return 10000;

    case UBER_SUV:
      return 90000;
  }
};
const KiemTraGiaKm_1_19 = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 7500;
    case UBER_BLACK:
      return 9500;

    case UBER_SUV:
      return 8500;
  }
};
const KiemTraGiaKm_19_UP = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 7000;
    case UBER_BLACK:
      return 9000;

    case UBER_SUV:
      return 8000;
  }
};
const KiemTraGia_waiting_time = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 2000;
    case UBER_BLACK:
      return 3500;

    case UBER_SUV:
      return 3000;
  }
};
const show_KmLine = (km, giaTienKm, total, id_1, id_2, id_3) => {
  document.getElementById(id_1).innerHTML = `${km}`;
  document.getElementById(id_2).innerHTML = `${giaTienKm}`;
  document.getElementById(id_3).innerHTML = `${total}`;
};
document.querySelector("#btnTinhTien").onclick = () => {
  console.log("nut tinh tien");
  let typeOfCar = document.querySelector("input[type='radio']:checked").value;
  console.log(typeOfCar);
  let sokm = document.getElementById("txt-km").value * 1;
  console.log(sokm);
  let time = document.getElementById("txt-thoiGianCho").value * 1;
  console.log(time);

  let giaTienKmDauTien = KiemTraGiaKmDauTien(typeOfCar);
  let giaKm_1_19 = KiemTraGiaKm_1_19(typeOfCar);
  let GiaKm_19_UP = KiemTraGiaKm_19_UP(typeOfCar);
  let Gia_waiting_time = KiemTraGia_waiting_time(typeOfCar);
  let fir_km = 1;

  let total = 0;
  // debugger;//được dùng để debug bên console.
  if (sokm <= 1 && sokm > 0) {
    total += giaTienKmDauTien * 1;
    fir_km = 1 - sokm;
    show_KmLine(
      fir_km,
      giaTienKmDauTien,
      total,
      "firstKm",
      "firstKmPrice",
      "total_Price_1"
    );
  } else if (sokm > 1 && sokm <= 19) {
    total += (sokm - 1) * giaKm_1_19 + giaTienKmDauTien;
    show_KmLine(
      fir_km,
      giaTienKmDauTien,
      giaTienKmDauTien,
      "firstKm",
      "firstKmPrice",
      "total_Price_1"
    );
    let seKm = sokm - 1;
    show_KmLine(
      seKm,
      giaKm_1_19,
      total,
      "secondKm",
      "secondKmPrice",
      "total_Price_2"
    );
  } else {
    total += giaTienKmDauTien + (sokm - 19) * GiaKm_19_UP + 18 * giaKm_1_19;
    show_KmLine(
      fir_km,
      giaTienKmDauTien,
      giaTienKmDauTien,
      "firstKm",
      "firstKmPrice",
      "total_Price_1"
    );
    let max_seKmPrice = giaTienKmDauTien + 18 * giaKm_1_19;
    show_KmLine(
      18,
      giaKm_1_19,
      max_seKmPrice,
      "secondKm",
      "secondKmPrice",
      "total_Price_2"
    );
    let thKm = sokm - 19;
    show_KmLine(
      thKm,
      GiaKm_19_UP,
      total,
      "ThirdKm",
      "ThirdKmPrice",
      "total_Price_3"
    );
  }
  let waitingPrice = Gia_waiting_time * (time / 3);
  total += waitingPrice;
  show_KmLine(
    time,
    Gia_waiting_time,
    waitingPrice,
    "activeWaitingTime",
    "WTPrice",
    "totalWaitingPrice"
  );
  document.getElementById("total_Price").innerHTML = ` Tổng tiền: ${total}.`;
  document.getElementById("divThanhTien").style.display = "block";
  document.getElementById("xuatTien").innerHTML = total.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
};

document.getElementById("btnHoaDon").onclick = () => {
  $("#myModal").modal("show");
};

//BC68_HOVATEN_BaiTap
