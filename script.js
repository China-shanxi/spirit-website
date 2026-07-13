// 轮播逻辑
const bannerItems = document.querySelectorAll('.banner-item');
const dots = document.querySelectorAll('.dot');
let bannerIndex = 0;
function switchBanner(i) {
    bannerItems.forEach(v=>v.classList.remove('active'));
    dots.forEach(v=>v.classList.remove('active'));
    bannerItems[i].classList.add('active');
    dots[i].classList.add('active');
}
function autoBanner() {
    bannerIndex++;
    if(bannerIndex >= bannerItems.length) bannerIndex = 0;
    switchBanner(bannerIndex);
}
setInterval(autoBanner,4000);
dots.forEach((dot,i)=>{
    dot.onclick = ()=>{
        bannerIndex = i;
        switchBanner(i);
    }
})

// 导航平滑滚动
document.querySelectorAll('.nav a').forEach(link=>{
    link.onclick = e=>{
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({behavior:'smooth'});
    }
})

// BGM音乐开关
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let musicPlay = false;
musicBtn.onclick = ()=>{
    if(!musicPlay){
        bgMusic.play();
        musicBtn.innerText = "暂停BGM";
        musicPlay = true;
    }else{
        bgMusic.pause();
        musicBtn.innerText = "播放BGM";
        musicPlay = false;
    }
}

// 留言板本地存储
const userName = document.getElementById('userName');
const userMsg = document.getElementById('userMsg');
const sendMsg = document.getElementById('sendMsg');
const msgBox = document.getElementById('msgBox');

function renderMsg() {
    const list = JSON.parse(localStorage.getItem('spiritMsg')) || [];
    msgBox.innerHTML = "";
    if(list.length === 0){
        msgBox.innerHTML = "<p style='text-align:center;color:#aaa;'>暂无家族留言，快来第一条！</p>";
        return;
    }
    list.forEach(item=>{
        const div = document.createElement('div');
        div.className = "msg-item";
        div.innerHTML = `
            <div class="msg-name">${item.name}</div>
            <div class="msg-text">${item.content}</div>
            <div style="margin-top:6px;font-size:12px;color:#666;">${item.time}</div>
        `;
        msgBox.appendChild(div);
    })
}
renderMsg();

sendMsg.onclick = ()=>{
    const name = userName.value.trim();
    const text = userMsg.value.trim();
    if(!name) return alert("填写你的称呼");
    if(!text) return alert("输入你的精神文案");
    const data = {
        name,
        content:text,
        time:new Date().toLocaleString()
    }
    let arr = JSON.parse(localStorage.getItem('spiritMsg')) || [];
    arr.unshift(data);
    localStorage.setItem('spiritMsg',JSON.stringify(arr));
    renderMsg();
    userName.value = "";
    userMsg.value = "";
    alert("留言发布成功！");
}
