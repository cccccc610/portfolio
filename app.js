/**
 * IRA'S ODYSSEY - MAIN APPLICATION
 * 商业化策略与运营作品集
 */

// ============================================
// DATA SCHEMA
// ============================================

const DATA = {
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
      number: "LEVEL 01",
      title: "商业化外观管线搭建",
      company: "腾讯 IEG 天美",
      metrics: ["300+ 资源交付", "0% 版权违规", "效能提升 30%"],
      description: "建立 RO 驱动的运营模型，主导皮肤从概念到上线的全流程。研发行业首个游戏外观商业化分析决策平台。",
      details: {
        background: "在腾讯天美工作室，我负责搭建游戏外观商业化的完整运营管线。这不仅仅是资源管理，而是从商业洞察到产品落地的全链路闭环。",
        strategy: "建立以 ROI 为核心的运营决策模型，整合市场数据分析、用户偏好洞察和竞品监测。主导开发行业首个游戏外观商业化分析决策平台，实现数据驱动的精准决策。",
        results: "累计完成 300+ 资源交付，保持 0% 版权违规率，整体交付效能提升 30%。平台成为团队核心决策工具，推动商业化收入显著增长。"
      },
      metricData: [
        { value: 300, suffix: "+", label: "资源交付" },
        { value: 0, suffix: "%", label: "版权违规率" },
        { value: 30, suffix: "%", label: "效能提升" }
      ]
    },
    {
      id: "level-2",
      number: "LEVEL 02",
      title: "跨界联动与大型节点",
      company: "腾讯 IEG 天美",
      metrics: ["高 ROI 产出", "全球化视野"],
      description: "整合外部资源，主导宝可梦、ITZY、Balmain 等高影响力跨界合作，保障大型商业化节点落地。",
      details: {
        background: "跨界联动是游戏商业化的重要增长引擎。我负责从0到1搭建跨界合作体系，对接全球顶级IP和品牌资源。",
        strategy: "建立跨界合作评估框架，从品牌调性、用户重叠度、商业潜力等维度筛选合作伙伴。主导谈判、监修、营销全流程，确保合作品质与ROI双优。",
        results: "成功落地宝可梦、ITZY、Balmain 等重量级合作，单次联动ROI超出预期200%。建立可复用的跨界合作SOP，为团队沉淀核心能力。"
      },
      metricData: [
        { value: 200, suffix: "%", label: "ROI超预期" },
        { value: 3, suffix: "+", label: "顶级IP合作" },
        { value: 1, suffix: "", label: "SOP沉淀" }
      ]
    },
    {
      id: "level-3",
      number: "LEVEL 03",
      title: "整合营销与破圈传播",
      company: "4A 广告代理",
      metrics: ["阅读量破亿", "好感度 +35%"],
      description: "负责《阴阳师》、《梦幻西游》等头部产品公关舆情与内容传播，建立舆情-美术联动机制。",
      details: {
        background: "在4A广告代理期间，我负责网易游戏头部产品的整合营销传播，涵盖公关舆情、内容营销和品牌建设。",
        strategy: "建立舆情监测-快速响应-内容联动机制，将负面舆情转化为品牌叙事机会。策划多起破圈传播事件，实现用户圈层突破。",
        results: "主导的传播项目累计阅读量破亿，品牌好感度提升35%。建立可复用的舆情管理体系，为美术团队提供精准的用户情绪洞察。"
      },
      metricData: [
        { value: 100000000, suffix: "+", label: "阅读量" },
        { value: 35, suffix: "%", label: "好感度提升" },
        { value: 2, suffix: "", label: "头部产品" }
      ]
    }
  ]
};

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
  introScreen: document.getElementById('intro-screen'),
  hubScreen: document.getElementById('hub-screen'),
  detailScreen: document.getElementById('detail-screen'),
  outroScreen: document.getElementById('outro-screen'),
  terminalOutput: document.getElementById('terminal-output'),
  startBtn: document.getElementById('start-btn'),
  levelGrid: document.getElementById('level-grid'),
  detailContent: document.getElementById('detail-content'),
  restartBtn: document.getElementById('restart-btn'),
  cursorFollower: document.querySelector('.cursor-follower')
};

// ============================================
// INTRO ANIMATION
// ============================================

const introLines = [
  "> SYSTEM BOOT...",
  "> PLAYER DETECTED: IRA",
  "> CLASS: COMMERCIAL STRATEGIST",
  "> EXPERIENCE: 7 YEARS",
  "> STATUS: READY FOR MISSION"
];

function playIntroAnimation() {
  const tl = gsap.timeline();
  
  // 打字机效果
  introLines.forEach((line, index) => {
    const lineEl = document.createElement('span');
    lineEl.className = 'line';
    lineEl.textContent = line;
    elements.terminalOutput.appendChild(lineEl);
    
    tl.to(lineEl, {
      opacity: 1,
      duration: 0.05,
      onStart: () => {
        // 打字音效感
        lineEl.style.textShadow = '0 0 10px var(--accent-color)';
      }
    }, index * 0.8);
  });
  
  // 显示开始按钮
  tl.to(elements.startBtn, {
    opacity: 1,
    duration: 0.5
  }, "-=0.3");
  
  return tl;
}

// ============================================
// START BUTTON HANDLER
// ============================================

function handleStart() {
  const tl = gsap.timeline();
  
  // 文字飞速向上淡出
  tl.to(elements.terminalOutput, {
    y: -100,
    opacity: 0,
    duration: 0.5,
    ease: "power2.in"
  })
  .to(elements.startBtn, {
    opacity: 0,
    scale: 0.8,
    duration: 0.3
  }, "-=0.3")
  // 背景缩放过渡
  .to(elements.introScreen, {
    scale: 1.1,
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut"
  })
  // 滚动到HUB
  .to(window, {
    scrollTo: "#hub-screen",
    duration: 0
  })
  .set(elements.introScreen, { display: 'none' })
  .fromTo("#hub-screen", 
    { opacity: 0 },
    { opacity: 1, duration: 0.5 }
  );
  
  return tl;
}

// ============================================
// RENDER LEVEL CARDS
// ============================================

function renderLevelCards() {
  elements.levelGrid.innerHTML = DATA.levels.map(level => `
    <div class="level-card" data-level-id="${level.id}">
      <div class="level-number">${level.number}</div>
      <h3 class="level-title">${level.title}</h3>
      <p class="level-company">${level.company}</p>
      <div class="level-metrics">
        ${level.metrics.map(m => `<span class="metric">${m}</span>`).join('')}
      </div>
    </div>
  `).join('');
  
  // 添加点击事件
  document.querySelectorAll('.level-card').forEach(card => {
    card.addEventListener('click', () => {
      const levelId = card.dataset.levelId;
      const level = DATA.levels.find(l => l.id === levelId);
      renderDetail(level);
      gsap.to(window, {
        scrollTo: "#detail-screen",
        duration: 0.8,
        ease: "power2.inOut"
      });
    });
  });
  
  // 卡片入场动画
  gsap.fromTo(".level-card", 
    { opacity: 0, y: 50 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.6, 
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#hub-screen",
        start: "top 60%"
      }
    }
  );
}

// ============================================
// RENDER DETAIL VIEW
// ============================================

function renderDetail(level) {
  elements.detailContent.innerHTML = `
    <div class="detail-header">
      <div class="level-number">${level.number}</div>
      <h2>${level.title}</h2>
      <p class="company">${level.company}</p>
    </div>
    
    <div class="detail-section" data-section="background">
      <h3>// BACKGROUND</h3>
      <p>${level.details.background}</p>
    </div>
    
    <div class="detail-section" data-section="strategy">
      <h3>// STRATEGY</h3>
      <p>${level.details.strategy}</p>
    </div>
    
    <div class="detail-section" data-section="results">
      <h3>// RESULTS</h3>
      <p>${level.details.results}</p>
      <div class="metrics-display">
        ${level.metricData.map(m => `
          <div class="metric-item">
            <div class="metric-number" data-target="${m.value}" data-suffix="${m.suffix}">0${m.suffix}</div>
            <div class="metric-label">${m.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // ScrollTrigger动画
  initDetailAnimations();
  
  // 章节导航
  initChapterNav();
}

// ============================================
// DETAIL ANIMATIONS
// ============================================

function initDetailAnimations() {
  // 段落淡入
  gsap.utils.toArray('.detail-section').forEach(section => {
    gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });
  });
  
  // 数字递增动画
  gsap.utils.toArray('.metric-number').forEach(num => {
    const target = parseInt(num.dataset.target);
    const suffix = num.dataset.suffix;
    
    ScrollTrigger.create({
      trigger: num,
      start: "top 80%",
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() {
            const current = Math.floor(this.targets()[0].val);
            if (target >= 1000000) {
              num.textContent = (current / 100000000).toFixed(0) + '亿' + suffix;
            } else {
              num.textContent = current + suffix;
            }
          }
        });
      }
    });
  });
}

// ============================================
// CHAPTER NAVIGATION
// ============================================

function initChapterNav() {
  const chapters = document.querySelectorAll('.chapter-item');
  const sections = document.querySelectorAll('.detail-section');
  
  chapters.forEach(chapter => {
    chapter.addEventListener('click', () => {
      const targetSection = document.querySelector(`[data-section="${chapter.dataset.chapter}"]`);
      if (targetSection) {
        gsap.to(window, {
          scrollTo: { y: targetSection, offsetY: 100 },
          duration: 0.6
        });
      }
    });
  });
  
  // 高亮当前章节
  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => updateActiveChapter(section.dataset.section),
      onEnterBack: () => updateActiveChapter(section.dataset.section)
    });
  });
}

function updateActiveChapter(sectionId) {
  document.querySelectorAll('.chapter-item').forEach(item => {
    item.classList.toggle('active', item.dataset.chapter === sectionId);
  });
}

// ============================================
// OUTRO ANIMATION
// ============================================

function initOutroAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#outro-screen",
      start: "top 60%",
      toggleActions: "play none none reverse"
    }
  });
  
  tl.to(".terminal-line", {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.2,
    ease: "power2.out"
  })
  .to(".restart-btn", {
    opacity: 1,
    duration: 0.5
  }, "-=0.2");
}

// ============================================
// RESTART BUTTON
// ============================================

function handleRestart() {
  gsap.to(window, {
    scrollTo: "#intro-screen",
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => {
      location.reload();
    }
  });
}

// ============================================
// CURSOR FOLLOWER
// ============================================

function initCursorFollower() {
  document.addEventListener('mousemove', (e) => {
    gsap.to(elements.cursorFollower, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.15
    });
  });
  
  // Hover效果
  document.querySelectorAll('.level-card, .start-btn, .restart-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(elements.cursorFollower, {
        scale: 2,
        borderColor: 'var(--accent-color)',
        opacity: 0.8
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(elements.cursorFollower, {
        scale: 1,
        opacity: 0.5
      });
    });
  });
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
  // 注册GSAP插件
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // 渲染卡片
  renderLevelCards();
  
  // 播放开场动画
  playIntroAnimation();
  
  // 绑定事件
  elements.startBtn.addEventListener('click', handleStart);
  elements.restartBtn.addEventListener('click', handleRestart);
  
  // 初始化Outro动画
  initOutroAnimation();
  
  // 初始化光标
  initCursorFollower();
  
  // 返回HUB链接
  document.querySelector('.back-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    gsap.to(window, {
      scrollTo: "#hub-screen",
      duration: 0.8,
      ease: "power2.inOut"
    });
  });
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
