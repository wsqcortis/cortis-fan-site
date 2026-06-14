// 轮播图功能
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentSlide = 0;

function showSlide(index) {
    carouselItems.forEach(item => item.classList.remove('active'));
    carouselItems[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselItems.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// 自动轮播
setInterval(nextSlide, 5000);

// 粉丝留言功能
const submitBtn = document.getElementById('submit-btn');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const messagesList = document.getElementById('messagesList');

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('cortisMessages')) || [];
    messagesList.innerHTML = '';
    messages.forEach(msg => {
        addMessageToDOM(msg.username, msg.content);
    });
}

function addMessageToDOM(username, content) {
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.innerHTML = `
        <div class="username">${username}</div>
        <div class="content">${content}</div>
    `;
    messagesList.prepend(messageItem);
}

submitBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const content = messageInput.value.trim();
    
    if (!username || !content) {
        alert('请填写昵称和留言内容！');
        return;
    }

    addMessageToDOM(username, content);
    const messages = JSON.parse(localStorage.getItem('cortisMessages')) || [];
    messages.push({ username, content });
    localStorage.setItem('cortisMessages', JSON.stringify(messages));

    usernameInput.value = '';
    messageInput.value = '';
});

loadMessages();