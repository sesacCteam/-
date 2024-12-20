const paths = document.querySelectorAll("path.symbol");
const infoBox = document.getElementById("infoBox");

paths.forEach((path) => {
  path.addEventListener("click", (event) => {
    const regionName = document.querySelector("path.symbol");
    const dataValue = path.getAttribute("href");
    infoBox.textContent = `${dataValue}의 정보를 여기에 표시`;
    infoBox.style.display = "block";
  });
});

// Scroll to top
// scrollToTop = function() {
//   $('html, body').animate({scrollTop:0}, '300');
// }

document.querySelectorAll(".photo").forEach((photo) => {
  photo.addEventListener("click", () => {
    document
      .querySelectorAll(".photo")
      .forEach((p) => p.classList.remove("active"));

    photo.classList.add("active");
  });
});
