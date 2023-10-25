// 随机切换图片
var all = document.getElementById("container");
var imageContainers = document.getElementsByClassName("small");
var crs = document.getElementById("crs");
var isMouseOver = false;
var timer1;
const colors = [
  "#204cdf",
  "#eb6d44",
  "#e8f476",
  "#f4bdf7",
  "#84dbc7",
  "#eeede9",
]; // 定义颜色数组

all.style.height = imageContainers[0].offsetHeight + "px";

crs.addEventListener("mouseover", function () {
  console.log("123");
  isMouseOver = true;
  startOutput();
});

crs.addEventListener("mouseout", function () {
  isMouseOver = false;
  stopOutput();
});

function startOutput() {
  timer1 = setInterval(function () {
    if (isMouseOver) {
      for (var i = 0; i < imageContainers.length; i++) {
        var randomIndex = Math.floor(Math.random() * imageContainers.length); // 随机生成数组索引
        var randomImage = imageContainers[randomIndex];
        randomImage.style.zIndex = "1"; // 将随机选中的图片的层级设置为较高的值
        for (var i = 0; i < imageContainers.length; i++) {
          if (i !== randomIndex) {
            imageContainers[i].style.zIndex = "0"; // 将其他图片的层级恢复为默认值
          }
        }
      }
    }
  }, 1000);
}

function stopOutput() {
  clearInterval(timer1);
}

// 眼球移动
var eyeballContainer = document.getElementById("eye");
var eyebg = document.getElementById("eyebg");
var eyeball = document.getElementById("eyeball");

eyeballContainer.addEventListener("mousemove", function (event) {
  var containerRect = eyeballContainer.getBoundingClientRect();
  var mouseX = event.clientX - containerRect.left;
  var mouseY = event.clientY - containerRect.top;

  var centerX = containerRect.width / 2;
  var centerY = containerRect.height / 2;

  var moveX = ((mouseX - centerX) / centerX) * 60;
  var moveY = ((mouseY - centerY) / centerY) * 60;

  var moveX1 = ((mouseX - centerX) / centerX) * 10;
  var moveY1 = ((mouseY - centerY) / centerY) * 10;
  eyeball.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
  eyebg.style.transform = "translate(" + moveX1 + "px, " + moveY1 + "px)";
});

// 监听浏览器滑动
let scale = 1;
var scaEye = document.getElementById("scaEye");

var lastScrollTop = 0;

window.addEventListener("scroll", function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 600) {
    // 向下滚动
    scale += 0.1;
  } else {
    // 向上滚动
    scale -= 0.05;
    console.log("向上滚动");
  }

  if (scrollTop == eyeballContainer.clientHeight) {
    window.location.href = "./About.html";
  }

  lastScrollTop = scrollTop;
  // 限制图片缩放最大最小值 Match.max 1-3
  scale = Math.max(1, Math.min(scale, 6));
  scaEye.style.transform = `scale(${scale})`;
});
