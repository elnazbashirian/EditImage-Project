let myImage = document.querySelector("img");
let slider = document.getElementById("range");
let brightness = document.querySelector(".brightness");
let saturation = document.querySelector(".saturation");
let Inversion = document.querySelector(".inversion");
let grayscale = document.querySelector(".grayscale");
let imageInput = document.querySelector(".image-input");
let number = document.querySelector(".number");
let name = document.querySelector(".name");
rotates = document.querySelectorAll(".rotate button");

let brightnessNum = "100",
  saturationNum = "100",
  inversionNum = "0",
  grayscaleNum = "0";
let rotation = 0,
  vertical = 1,
  horizontal = 1,
  uploadedImage = "";

slider.addEventListener("change", () => {
  number.innerText = `${slider.value}%`;
  const select = document.querySelector(".filter .select");
  if (select.innerText === "Brightness") {
    brightnessNum = slider.value;
  } else if (select.innerText === "Saturation") {
    saturationNum = slider.value;
  } else if (select.innerText === "Inversion") {
    inversionNum = slider.value;
  } else if (select.innerText === "Grayscale") {
    grayscaleNum = slider.value;
  }
  myImage.style.filter = `brightness(${brightnessNum}%)saturate(${saturationNum}%)invert(${inversionNum}%)grayscale(${grayscaleNum}%)`;
});

brightness.addEventListener("click", () => {
  document.querySelector(".select").classList.remove("select");
  brightness.classList.add("select");
  document.querySelector(".name").innerHTML = "brightness";
  slider.value = brightnessNum;
  slider.max = 200;
  number.innerText = brightnessNum + "%";
});

saturation.addEventListener("click", () => {
  document.querySelector(".select").classList.remove("select");
  saturation.classList.add("select");
  document.querySelector(".name").innerHTML = "saturation";
  slider.value = saturationNum;
  slider.max = 200;
  number.innerText = saturationNum + "%";
});

Inversion.addEventListener("click", () => {
  document.querySelector(".select").classList.remove("select");
  Inversion.classList.add("select");
  document.querySelector(".name").innerHTML = "inversion";
  slider.value = inversionNum;
  slider.max = 100;
  number.innerText = inversionNum + "%";
});

grayscale.addEventListener("click", () => {
  document.querySelector(".select").classList.remove("select");
  grayscale.classList.add("select");
  document.querySelector(".name").innerHTML = "grayscale";
  slider.value = grayscaleNum;
  slider.max = 100;
  number.innerText = grayscaleNum + "%";
});

document.querySelector(".rotate-left").addEventListener("click", () => {
  rotation -= 90;
  myImage.style.transform = `rotate(${rotation}deg) scale(${vertical}, ${horizontal})`;
});
document.querySelector(".rotate-right").addEventListener("click", () => {
  rotation += 90;
  myImage.style.transform = `rotate(${rotation}deg) scale(${vertical}, ${horizontal})`;
});
document.querySelector(".vertically").addEventListener("click", () => {
  vertical = vertical === 1 ? -1 : 1;
  if(rotation==0)
  myImage.style.transform = `rotate(${rotation}deg) scale(${vertical}, ${horizontal})`;
  else
  myImage.style.transform = `rotate(${rotation}deg) scale(${horizontal}, ${vertical})`;
});
document.querySelector(".horizontaly").addEventListener("click", () => {
  horizontal = horizontal === 1 ? -1 : 1;
  if(rotation==0)
  myImage.style.transform = `rotate(${rotation}deg) scale(${vertical}, ${horizontal})`;
  else
  myImage.style.transform = `rotate(${rotation}deg) scale(${horizontal}, ${vertical})`;
});

document.querySelector(".reset").addEventListener("click", () => {
  brightnessNum = "100";
  saturationNum = "100";
  inversionNum = "0";
  grayscaleNum = "0";
  rotation = 0;
  horizontal = 1;
  vertical = 1;
  brightness.click();
  myImage.style.filter = `brightness(${brightnessNum}%)saturate(${saturationNum}%)invert(${inversionNum}%)grayscale(${grayscaleNum}%)`;
  myImage.style.transform = `rotate(${rotation}deg) scale(${horizontal}, ${vertical})`;
});

document.querySelector(".choose").addEventListener("click", () => {
  var clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  imageInput.dispatchEvent(clickEvent);
  imageInput.addEventListener("change", (e) => {
    myImage.src = URL.createObjectURL(e.target.files[0]);
  });
});
document.querySelector(".save").addEventListener("click", () => {
  var canvas = document.createElement("canvas");
  canvas.width = myImage.naturalWidth;
  canvas.height = myImage.naturalHeight;
  ctx = canvas.getContext("2d");
  ctx.filter = `brightness(${brightnessNum}%)saturate(${saturationNum}%)invert(${inversionNum}%)grayscale(${grayscaleNum}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotation !== 0) {
    ctx.rotate((rotation * Math.PI) / 180);
  }
  ctx.scale(horizontal, vertical);
  ctx.drawImage(
    myImage,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  console.log(ctx.filter);
  const imageLink = document.createElement("a");
  imageLink.href = canvas.toDataURL();
  imageLink.download = "Myimage.jpg";
  imageLink.click();
});
