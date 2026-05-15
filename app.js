/* ============================================
   IRA'S ODYSSEY - Main Application
   ============================================ */

// Data
const portfolioData = {
  profile: {
    name: "Ira",
    title: "商业化美术资源运营 / 营销策略专家",
    yearsOfExperience: 7,
    contact: { 
      email: "1070133802@qq.com", 
      phone: "13763343826" 
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
const terminalOutput = document.getElementById('terminal-output');
const startBtn = document.getElementById('start-btn');
const levelGrid = document.getElementById('level-grid');
const restartBtn = document.getElementById('restart-btn');
const cursorFollower = document.querySelector('.cursor-follower');

// Terminal lines for intro - Synthwave/Cyber style
const terminalLines = [
  '> SYSTEM BOOT...',
  '> PLAYER DETECTED: IRA',
  '> CLASS: COMMERCIAL STRATEGIST',
  '> RANK: ELITE OPERATOR',
  '> STATUS: READY'
];

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // Setup custom cursor
  setupCursor();
  
  // Start intro sequence
  startIntroSequence();
  
  // Render level cards
  renderLevelCards();
  
  // Setup event listeners
  setupEventListeners();
}

// Custom Cursor
function setupCursor() {
  if (!cursorFollower) return;
  
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursorFollower, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.15
    });
  });
  
  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('button, a, .level-card, .chapter-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
  });
}

// Intro Sequence with Typewriter Effect
function startIntroSequence() {
  let lineIndex = 0;
  
  function typeLine() {
    if (lineIndex < terminalLines.length) {
      const line = document.createElement('span');
      line.className = 'line';
      line.textContent = terminalLines[lineIndex];
      terminalOutput.appendChild(line);
      
      // Animate line appearance
      gsap.to(line, {
        opacity: 1,
        duration: 0.1,
        onComplete: () => {
          lineIndex++;
          setTimeout(typeLine, 300);
        }
      });
    } else {
      // Show start button
      gsap.to(startBtn, {
        opacity: 1,
        duration: 0.5,
        onStart: () => startBtn.classList.add('visible')
      });
    }
  }
  
  typeLine();
}

// Render Level Cards
function renderLevelCards() {
  levelGrid.innerHTML = portfolioData.levels.map((level, index) => `
    <div class="level-card" data-level="${index}" data-target="${level.detailScreen}">
      <div class="level-number">0${index + 1}</div>
      <h3 class="level-title">${level.title}</h3>
      <p class="level-company">${level.company}</p>
      <div class="level-metrics">
        ${level.metrics.map(m => `<span class="metric-tag">${m}</span>`).join('')}
      </div>
    </div>
  `).join('');
  
  // Add click handlers to level cards
  document.querySelectorAll('.level-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetScreen = card.dataset.target;
      navigateToDetail(targetScreen);
    });
  });
}

// Event Listeners
function setupEventListeners() {
  // Start button
  startBtn.addEventListener('click', transitionToHub);
  
  // Restart button
  restartBtn.addEventListener('click', restartJourney);
  
  // Scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      gsap.to(window, {
        scrollTo: { y: '#outro-screen', offsetY: 0 },
        duration: 1
      });
    });
  }
  
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

// Transition to Hub
function transitionToHub() {
  // Animate intro screen out
  gsap.to(introScreen, {
    opacity: 0,
    scale: 1.1,
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
      introScreen.style.display = 'none';
      hubScreen.classList.add('active');
      
      // Animate hub elements in
      gsap.from('.hub-header', {
        y: -50,
        opacity: 0,
        duration: 0.8
      });
      
      gsap.from('.level-card', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15
      });
    }
  });
}

// Navigate to Detail Screen
function navigateToDetail(screenId) {
  const detailScreen = document.getElementById(screenId);
  if (!detailScreen) return;
  
  // Hide hub
  hubScreen.classList.remove('active');
  
  // Show detail screen
  detailScreen.classList.add('active');
  
  // Scroll to top
  window.scrollTo(0, 0);
  
  // Initialize animations for this screen
  initDetailAnimations(detailScreen);
}

// Navigate to Hub
function navigateToHub() {
  // Hide all detail screens
  document.querySelectorAll('.detail-screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Hide outro
  outroScreen.classList.remove('active');
  
  // Show hub
  hubScreen.classList.add('active');
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Initialize Detail Screen Animations
function initDetailAnimations(screen) {
  // Animate sections on scroll
  const sections = screen.querySelectorAll('.module-section');
  
  sections.forEach((section, index) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1
    });
  });
  
  // Count up animations
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
}

// Scroll to Chapter
function scrollToChapter(item, chapterId) {
  const screen = item.closest('.detail-screen');
  const chapter = screen.querySelector(`#${chapterId}`);
  
  if (chapter) {
    // Update active state
    screen.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    
    // Scroll to chapter
    gsap.to(window, {
      scrollTo: { y: chapter, offsetY: 80 },
      duration: 0.8
    });
  }
}

// Restart Journey
function restartJourney() {
  // Reset all screens
  document.querySelectorAll('.detail-screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  hubScreen.classList.remove('active');
  outroScreen.classList.remove('active');
  
  // Reset intro screen
  introScreen.style.display = 'flex';
  gsap.to(introScreen, {
    opacity: 1,
    scale: 1,
    duration: 0.5
  });
  
  // Reset terminal
  terminalOutput.innerHTML = '';
  startBtn.classList.remove('visible');
  
  // Scroll to top
  window.scrollTo(0, 0);
  
  // Restart intro sequence
  startIntroSequence();
}

// Update cursor hover effect after dynamic content
function updateCursorHovers() {
  const interactiveElements = document.querySelectorAll('button, a, .level-card, .chapter-item, .method-card, .framework-card, .quality-card, .collab-item, .asset-tag, .result-box, .collab-preview-card, .flow-box, .network-node, .pay-level, .quality-step, .pyramid-content');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
  });
}

// Call after initial render
setTimeout(updateCursorHovers, 100);

// Add smooth scroll for collab preview cards
document.addEventListener('click', (e) => {
  const card = e.target.closest('.collab-preview-card');
  if (card) {
    const targetId = card.dataset.target;
    const target = document.querySelector(targetId);
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 100 },
        duration: 0.8
      });
    }
  }
});

// Intersection Observer for terminal lines animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Observe all terminal lines and fade-in elements
document.querySelectorAll('.terminal-line, .fade-in').forEach(el => {
  observer.observe(el);
});

// Initialize Outro Screen Animations (Player Profile Window)
function initOutroAnimations() {
  const profileWindow = document.querySelector('.profile-window');
  if (!profileWindow) return;
  
  // Set initial state for the window
  gsap.set(profileWindow, { opacity: 0, scale: 0.95 });
  
  // Window entrance animation - fade in + scale
  gsap.to(profileWindow, {
    scrollTrigger: {
      trigger: '#outro-screen',
      start: "top 70%",
      toggleActions: "play none none reverse"
    },
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "power2.out",
    onComplete: () => {
      // Add active class for border glow effect
      profileWindow.classList.add('active');
    }
  });
  
  // Stats bar animations - stagger fill from left to right
  const statFills = document.querySelectorAll('.stat-bar-fill');
  statFills.forEach(fill => {
    const targetWidth = fill.dataset.width || 0;
    gsap.to(fill, {
      scrollTrigger: {
        trigger: '#outro-screen',
        start: "top 60%"
      },
      width: `${targetWidth}%`,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.3
    });
  });
  
  // Skill capsules stagger animation
  gsap.from('.skill-capsule', {
    scrollTrigger: {
      trigger: '#outro-screen',
      start: "top 60%"
    },
    y: 15,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.7)",
    delay: 0.5
  });
  
  // Experience items fade in
  gsap.from('.exp-item', {
    scrollTrigger: {
      trigger: '#outro-screen',
      start: "top 60%"
    },
    x: -20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out",
    delay: 0.6
  });
  
  // Avatar porthole animation
  gsap.from('.avatar-porthole', {
    scrollTrigger: {
      trigger: '#outro-screen',
      start: "top 60%"
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)",
    delay: 0.4
  });
  
  // Player name glow effect
  gsap.from('.player-name', {
    scrollTrigger: {
      trigger: '#outro-screen',
      start: "top 60%"
    },
    y: 10,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    delay: 0.7
  });
  
  // Barcode animation
  gsap.from('.barcode-display', {
    scrollTrigger: {
      trigger: '#outro-screen',
      start: "top 60%"
    },
    scaleX: 0,
    transformOrigin: "center center",
    duration: 0.6,
    ease: "power2.out",
    delay: 0.8
  });
}

// Avatar hover effects
document.addEventListener('DOMContentLoaded', () => {
  const avatarPorthole = document.querySelector('.avatar-porthole');
  if (avatarPorthole) {
    avatarPorthole.addEventListener('mouseenter', () => {
      avatarPorthole.classList.add('hover-active');
    });
    avatarPorthole.addEventListener('mouseleave', () => {
      avatarPorthole.classList.remove('hover-active');
    });
  }
  
  // Initialize outro animations
  initOutroAnimations();
});
