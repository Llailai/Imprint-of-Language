// 文字输入并输出
const input = document.getElementById("input");
const output = document.getElementById("output");
var container = document.getElementById("container");

let currentChar = null;
let currentElement = null;
let startTime = null;
let timer = null;
var color = "black";

output.addEventListener("keydown", (event) => {
  // const randomIndex = Math.floor(Math.random() * colors.length);
  // const color = colors[randomIndex];
  const char = event.key;
  console.log(char);
  if (/^[a-zA-Z]$/.test(char)) {
    // 只有输入是小写字母时才执行以下代码

    if (currentChar === null || char !== currentChar) {
      currentChar = char;

      if (currentElement) {
        currentElement.classList.remove("pressed");
      }

      currentElement = document.createElement("span");
      currentElement.classList.add("char");
      currentElement.textContent = char;
      currentElement.style.color = color; // 设置字体颜色
      output.appendChild(currentElement);
      currentElement.classList.add("pressed");

      clearInterval(timer); // 清除之前的定时器
      startTime = performance.now();

      timer = setInterval(() => {
        const elapsedTime = performance.now() - startTime;
        currentElement.style.fontSize = `${Math.round(
          elapsedTime * 0.05 + 24
        )}px`;
      }, 100);
    }
  }
  // 监听键盘事件

  // 判断是否按下了删除键
  if (char === "Backspace") {
    // 获取最后一个子元素
    var lastChild = output.lastElementChild;
    if (lastChild) {
      // 判断最后一个元素是否是span标签
      if (lastChild.tagName === "SPAN") {
        // 移除最后一个元素
        output.removeChild(lastChild);
      }
    }
  }
});

output.addEventListener("keyup", (event) => {
  const char = event.key;
  if (/^[a-zA-Z]$/.test(char)) {
    // 只有释放的键是小写字母时才执行以下代码"

    if (char === currentChar) {
      clearInterval(timer); // 清除定时器
      currentElement.classList.remove("pressed");
      currentChar = null;
    }
  }
});
output.style.Width = input.clientWidth + "px";
function handleColor(params) {
  color = params;
  output.focus();
}

container.style.height = output.style.height;
