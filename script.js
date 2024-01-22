let navbar = document.querySelector("[data-navbar]");
let navToggler = document.querySelectorAll("[data-toggler]");
let cards = document.querySelector("[data-cards]");
let container = document.querySelector("[data-container]");
let scrollBtns = document.querySelectorAll("[data-side-scroll]");
let darkBtn = document.querySelector("[data-dark-mode]");
let lightBtn = document.querySelector("[data-light-mode]");
navToggler.forEach((toggler) => {
  let overllay = document.querySelector("[data-overllay]");

  toggler.addEventListener("click", () => {
    if (window.innerWidth > 750) {
      container.classList.toggle("active");
    } else {
      navbar.classList.toggle("active");
      overllay.classList.toggle("active");
    }
  });
});

let right = document.querySelector("[data-scroll-right]");
let left = document.querySelector("[data-scroll-left]");

[cards, ...scrollBtns].forEach((area) => {
  area.addEventListener("mouseenter", () => {
    if (cards.scrollLeft == 0) {
      right.classList.add("active");
      left.classList.remove("active");
    } else {
      left.classList.add("active");
      right.classList.remove("active");
    }
  });
});

cards.addEventListener("mouseleave", () => {
  right.classList.remove("active");
  left.classList.remove("active");
});
scrollBtns.forEach((btn) => [
  btn.addEventListener("click", () => {
    let cardWidth = cards.querySelector(".card").offsetWidth;
    cards.scrollLeft +=
      btn.getAttribute("name") == "right" ? cardWidth + 15 : -(cardWidth + 15);
  }),
]);

// Dark Light Toggle
let isDark = true;
lightBtn.addEventListener("click", () => {
  darkBtn.classList.add("active");
  lightBtn.classList.remove("active");
  document.body.classList.add("light");
});

darkBtn.addEventListener("click", () => {
  darkBtn.classList.remove("active");
  lightBtn.classList.add("active");
  document.body.classList.remove("light");
});

// Search Functionalty
let pillDatas = document.querySelectorAll("[data-key-pill]");
let input = document.querySelector("[data-chat-input]");

pillDatas.forEach((data) => {
  data.addEventListener("click", () => {
    setDataInInput(data.innerText);
  });
});

function setDataInInput(value) {
  input.value = value;
}

// const chatBox = [];
let sendBtn = document.querySelector("[data-chat-send-btn]");
let chatContainer = document.querySelector("[data-chat-container]");

function action() {
  let userImg =
    "https://lh3.googleusercontent.com/-wy8JEnAmpDQ/AAAAAAAAAAI/AAAAAAAAAAA/AFNEGgJmmZw6i7uEcKBu1fg6ezSdDH87SA/photo.jpg?sz=46";
  let botImg =
    "https://www.gstatic.com/lamda/images/sparkle_resting_v2_darkmode_2bdb7df2724e450073ede.gif";
  let value = input.value.toLowerCase();
  if (value == "") return;
  chatContainer.append(createElement(value, userImg));
  createBotReply(value, botImg);
  scrollToEnd(chatContainer.offsetHeight);
}

sendBtn.addEventListener("click", action);
document.body.addEventListener("keypress", (key) => {
  if (key.code == "Enter") {
    action();
  }
});
function createElement(value, img) {
  let li = document.createElement("li");
  li.innerHTML = `
    <div class="chat-profile">
       <img
         src="${img}"
         alt="User"
       />
    </div>
    <p class='chat-text sm-text'>${value}</p>`;
  li.className = "data flex";
  return li;
}

function createBotReply(value, img) {
  let div = document.createElement("div");
  div.className = "dot-container";
  div.innerHTML = `       
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>`;

  let botReplyEle = createElement(null, img);
  let old = botReplyEle.querySelector(".chat-text");
  botReplyEle.replaceChild(div, old);
  chatContainer.append(botReplyEle);

  setTimeout(() => {
    if (value == "hello" || value == "hi" || value == "hey" || value == "hlw") {
      value = "Hello! I am Chat Bot Form Bard. How Can I Assist You Today?";
      let newText = document.createElement("p");
      newText.innerHTML = value;
      newText.className = "chat-text sm-text";
      botReplyEle.replaceChild(newText, div);
    } else {
      value =
        "This Bot Is Not Real. This Is Just Demo Bot Of Bard AI. Do You Want Use The Original Bard AI. So That You Can Go To This Site <a href='https://bard.google.com/chat' class='message-link'>Bard AI</a>";
      let newText = document.createElement("p");
      newText.innerHTML = value;
      newText.className = "chat-text sm-text";
      botReplyEle.replaceChild(newText, div);
    }
    scrollToEnd(chatContainer.offsetHeight);
  }, 2000);
}

function scrollToEnd(scroll) {
  let messageArea = document.querySelector("[data-message-container]");
  messageArea.scrollTop = `${scroll}`;
}
