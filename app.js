/* ============================================
   IRA'S ODYSSEY - 复古手账风格主程序
   ============================================ */

// Data
const portfolioData = {
  profile: {
    name: "杨程",
    nameEn: "IRA",
    title: "游戏商业化美术资源运营 / 营销策略专家",
    yearsOfExperience: 7,
    contact: { 
      email: "1070133802@qq.com", 
      phone: "137-6334-3826" 
    }
  },
  levels: [
    {
      id: "level-1",
      title: "商业化外观管线搭建",
      company: "腾讯 IEG 天美",
      metrics: ["300+ 资源交付", "0% 版权违规", "效能提升 30%"],
      description: "建立 RO 驱动的运营模型，主导皮肤从概念到上线的全流程。研发行业首个游戏外观商业化分析决策平台。",
      detailScreen: "detail-screen-1"
    },
    {
      id: "level-2",
      title: "跨界联动与大型节点",
      company: "腾讯 IEG 天美",
      metrics: ["高 ROI 产出", "全球化视野", "好感度 +30%"],
      description: "整合外部资源，主导宝可梦、ITZY、Balmain 等高影响力跨界合作，保障大型商业化节点落地。",
      detailScreen: "detail-screen-2"
    },
    {
      id: "level-3",
      title: "整合营销与破圈传播",
      company: "4A 广告代理",
      metrics: ["阅读量破亿", "好感度 +35%"],
      description: "负责《阴阳师》、《梦幻西游》等头部产品公关舆情与内容传播，建立舆情-美术联动机制。",
      detailScreen: "detail-screen-3"
    }
  ]
};

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const hubScreen = document.getElementById('hub-screen');
const outroScreen = document.getElementById('outro-screen');
const startBtn = document.getElementById('start-btn');
const foldersArea = document.getElementById('folders-area');
const restartBtn = document.getElementById('restart-btn');

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // Start intro animation
  startIntroAnimation();
  
  // Setup event listeners
  setupEventListeners();
  
  // Initialize folder click handlers
  initFolderCards();
}

// Intro Animation - 票券入场效果
function startIntroAnimation() {
  // 初始状态：票券卡片隐藏
  gsap.set('.ticket-card', {
    opacity: 0,
    scale: 0.9,
    y: 30
  });
  
  // 票券卡片入场动画
  gsap.to('.ticket-card', {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.3,
    onComplete: showStartButton
  });
  
  // 装饰元素动画
  gsap.from('.intro-decor', {
    opacity: 0,
    scale: 0,
    duration: 0.5,
    stagger: 0.2,
    delay: 0.6
  });
}

function showStartButton() {
  gsap.to(startBtn, {
    opacity: 1,
    duration: 0.5,
    onStart: () => startBtn.classList.add('visible')
  });
}

// Event Listeners
function setupEventListeners() {
  // Start button - 进入副本大厅
  startBtn.addEventListener('click', transitionToHub);
  
  // Restart button
  restartBtn.addEventListener('click', restartJourney);
  
  // Back links
  document.querySelectorAll('.back-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToHub();
    });
  });
  
  // Chapter navigation
  document.querySelectorAll('.chapter-item').forEach(item => {
    item.addEventListener('click', () => {
      const chapter = item.dataset.chapter;
      scrollToChapter(item, chapter);
    });
  });
}

// Initialize Folder Cards
function initFolderCards() {
  const folderCards = document.querySelectorAll('.folder-card');
  
  folderCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetScreen = card.dataset.target;
      navigateToDetail(targetScreen);
    });
  });
}

// Transition to Hub - 文件夹滑落动画
function transitionToHub() {
  // 隐藏开机屏
  gsap.to(introScreen, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      introScreen.style.display = 'none';
      hubScreen.classList.add('active');
      
      // 触发文件夹滑落动画
      animateFoldersDrop();
    }
  });
}

// 文件夹滑落动画
function animateFoldersDrop() {
  const folders = document.querySelectorAll('.folder-card');
  
  folders.forEach((folder, index) => {
    // 设置初始状态
    gsap.set(folder, {
      opacity: 0,
      y: -100,
      rotateX: 30
    });
    
    // 延迟滑落
    setTimeout(() => {
      folder.classList.add('animate-in');
    }, index * 200);
  });
  
  // 标题动画
  gsap.from('.hub-header', {
    y: -30,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  });
}

// Navigate to Detail Screen - 文件散开动画
function navigateToDetail(screenId) {
  const detailScreen = document.getElementById(screenId);
  if (!detailScreen) return;
  
  // 隐藏hub
  hubScreen.classList.remove('active');
  
  // 显示详情页
  detailScreen.classList.add('active');
  
  // 滚动到顶部
  window.scrollTo(0, 0);
  
  // 初始化文件散开动画
  animatePaperScatter(detailScreen);
  
  // 初始化详情页其他动画
  initDetailAnimations(detailScreen);
}

// 文件散开动画
function animatePaperScatter(screen) {
  const papers = screen.querySelectorAll('.module-section');
  
  papers.forEach((paper, index) => {
    // 初始状态
    gsap.set(paper, {
      opacity: 0,
      x: -50,
      rotate: -2
    });
    
    // 散开动画
    setTimeout(() => {
      paper.classList.add('animate-in');
      gsap.to(paper, {
        opacity: 1,
        x: 0,
        rotate: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }, index * 150);
  });
}

// Navigate to Hub
function navigateToHub() {
  // 隐藏所有详情页
  document.querySelectorAll('.detail-screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // 隐藏终章
  outroScreen.classList.remove('active');
  
  // 显示hub
  hubScreen.classList.add('active');
  
  // 滚动到顶部
  window.scrollTo(0, 0);
  
  // 重新播放文件夹动画
  animateFoldersDrop();
}

// Initialize Detail Screen Animations
function initDetailAnimations(screen) {
  // 数据计数动画
  const countElements = screen.querySelectorAll('.count-up');
  
  countElements.forEach(el => {
    const target = parseInt(el.dataset.target);
    
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(el, {
          textContent: target,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].textContent);
          }
        });
      }
    });
  });
  
  // 章节导航滚动追踪
  const sections = screen.querySelectorAll('.module-section[id]');
  
  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => updateChapterNav(screen, section.id),
      onEnterBack: () => updateChapterNav(screen, section.id)
    });
  });
}

// 更新章节导航高亮
function updateChapterNav(screen, chapterId) {
  const navItems = screen.querySelectorAll('.chapter-item');
  navItems.forEach(item => {
    if (item.dataset.chapter === chapterId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Scroll to Chapter
function scrollToChapter(item, chapterId) {
  const screen = item.closest('.detail-screen');
  const chapter = screen.querySelector(`#${chapterId}`);
  
  if (chapter) {
    // 更新高亮状态
    screen.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    
    // 滚动到章节
    gsap.to(window, {
      scrollTo: { y: chapter, offsetY: 80 },
      duration: 0.8
    });
  }
}

// Navigate to Outro - 胶卷滚动动画
function navigateToOutro() {
  // 隐藏所有详情页
  document.querySelectorAll('.detail-screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // 显示终章
  outroScreen.classList.add('active');
  
  // 滚动到顶部
  window.scrollTo(0, 0);
  
  // 触发胶卷动画
  animateFilmRoll();
}

// 胶卷滚动动画
function animateFilmRoll() {
  const frames = document.querySelectorAll('.film-frame');
  
  // 胶卷轴旋转动画
  gsap.to('.film-reel', {
    rotation: 360,
    duration: 20,
    ease: "none",
    repeat: -1
  });
  
  // 帧内容依次显示
  frames.forEach((frame, index) => {
    setTimeout(() => {
      frame.classList.add('visible');
    }, 500 + index * 300);
  });
  
  // 显示重启按钮
  setTimeout(() => {
    restartBtn.classList.add('visible');
  }, 500 + frames.length * 300 + 500);
}

// Restart Journey
function restartJourney() {
  // 重置所有页面
  document.querySelectorAll('.detail-screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  hubScreen.classList.remove('active');
  outroScreen.classList.remove('active');
  
  // 重置胶卷帧
  document.querySelectorAll('.film-frame').forEach(frame => {
    frame.classList.remove('visible');
  });
  
  restartBtn.classList.remove('visible');
  
  // 重置开机屏
  introScreen.style.display = 'flex';
  gsap.to(introScreen, {
    opacity: 1,
    scale: 1,
    duration: 0.5
  });
  
  // 滚动到顶部
  window.scrollTo(0, 0);
  
  // 重新开始开场动画
  startIntroAnimation();
}

// 滚动到页面底部时显示终章
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const st = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  
  // 检测是否到达详情页底部
  if (st + winHeight >= docHeight - 100) {
    // 如果在详情页中，可以触发终章
    const activeDetail = document.querySelector('.detail-screen.active');
    if (activeDetail && st > lastScrollTop) {
      // 向下滚动到底部时显示终章
      // navigateToOutro(); // 可选：自动跳转到终章
    }
  }
  
  lastScrollTop = st <= 0 ? 0 : st;
});

// 联动预览卡片点击滚动
document.addEventListener('click', (e) => {
  const card = e.target.closest('.collab-preview-card');
  if (card) {
    const targetId = card.dataset.target;
    const target = document.querySelector(`#${targetId}`);
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 100 },
        duration: 0.8
      });
    }
  }
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Observe fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// 初始化时检查URL hash，如果有则直接跳转到对应详情页
function checkHashNavigation() {
  const hash = window.location.hash;
  if (hash) {
    const targetId = hash.substring(1);
    const detailScreen = document.getElementById(targetId);
    if (detailScreen && detailScreen.classList.contains('detail-screen')) {
      // 跳过开机屏，直接显示详情页
      introScreen.style.display = 'none';
      navigateToDetail(targetId);
    }
  }
}

// 页面加载完成后检查hash
setTimeout(checkHashNavigation, 100);
