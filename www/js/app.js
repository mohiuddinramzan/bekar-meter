/**
 * বেকার মিটার - Version 1.0
 * Pure HTML/CSS/JS - LocalStorage based
 */

(function () {
  'use strict';

  // ==================== DATA & CONSTANTS ====================
  const STORAGE_KEY = 'bekarMeter_v1';

  const LEVELS = [
    { min: 0, name: 'নতুন বেকার', emoji: '🌱' },
    { min: 50, name: 'শিক্ষানবিশ বেকার', emoji: '🐣' },
    { min: 150, name: 'মধ্যম বেকার', emoji: '😎' },
    { min: 300, name: 'প্রো বেকার', emoji: '🔥' },
    { min: 500, name: 'লেজেন্ডারি বেকার', emoji: '👑' },
    { min: 800, name: 'মাস্টার বেকার', emoji: '🧠' },
    { min: 1200, name: 'গ্র্যান্ডমাস্টার বেকার', emoji: '🌌' },
  ];

  const CHALLENGES = [
    { text: 'আজ ১ ঘন্টা কোনো সোশ্যাল মিডিয়া ছাড়া কাটাও', points: 15 },
    { text: 'একটা নতুন রেসিপি ট্রাই করো (বা বাসায় রান্না করো)', points: 20 },
    { text: '৩০ মিনিট হাঁটো বা ব্যায়াম করো', points: 15 },
    { text: 'একটা বইয়ের ২০ পৃষ্ঠা পড়ো', points: 20 },
    { text: 'একজন বন্ধুকে ফোন করে কথা বলো (৫ মিনিট+)', points: 10 },
    { text: 'তোমার রুম পরিষ্কার করো', points: 15 },
    { text: 'একটা নতুন স্কিল শেখার ভিডিও দেখো (ইউটিউব)', points: 15 },
    { text: 'আজ কোনো জাঙ্ক ফুড খাবে না', points: 10 },
    { text: 'একটা ডায়েরি লিখো — আজ কেমন কেটেছে', points: 10 },
    { text: 'সকাল ৯টার আগে উঠো', points: 20 },
    { text: 'একটা ফ্রি কোর্সের ১টি লেসন শেষ করো', points: 25 },
    { text: 'আজ ৫টা জলের গ্লাস খাও', points: 10 },
    { text: 'মোবাইল ছাড়া ১ ঘন্টা কাটাও', points: 20 },
    { text: 'একটা ছোট প্রজেক্ট শুরু করো (কোড/ড্রয়িং/লেখা)', points: 25 },
    { text: 'পরিবারের সাথে ৩০ মিনিট সময় কাটাও', points: 15 },
    { text: 'আজ কোনো নেগেটিভ খবর পড়বে না', points: 10 },
    { text: 'একটা গান শিখো বা গাও', points: 15 },
    { text: 'তোমার CV/Resume আপডেট করো', points: 20 },
    { text: 'একটা জব পোর্টালে ২টা অ্যাপ্লাই করো', points: 25 },
    { text: 'মেডিটেশন করো ১০ মিনিট', points: 15 },
  ];

  const EXCUSES = {
    work: [
      'স্যার, ইন্টারনেট চলে গেছে, এখনো আসেনি!',
      'আজ সকালে পেট খারাপ, ডাক্তার দেখাতে যাচ্ছি।',
      'বাস ভাঙা পড়েছে রাস্তায়, আটকে আছি।',
      'বাসায় বিদ্যুৎ নেই, ল্যাপটপ চার্জ নেই।',
      'মা অসুস্থ, হাসপাতালে যেতে হচ্ছে।',
      'গুরুত্বপূর্ণ পরিবারের কাজ আছে আজ।',
      'কম্পিউটার হ্যাং হয়ে গেছে, টেকনিশিয়ান আসছে।',
      'আজ ট্রাফিক জ্যাম অসহ্য, আটকে আছি।',
    ],
    study: [
      'কাল পরীক্ষা, পুরো রাত জেগে পড়েছি, এখন ঘুম পাচ্ছে।',
      'অ্যাসাইনমেন্ট সাবমিট করতে হবে আজ রাতে।',
      'লাইব্রেরিতে বই খুঁজতে গিয়েছিলাম, আটকে আছি।',
      'গ্রুপ স্টাডি চলছে, এখনো শেষ হয়নি।',
      'প্রজেক্ট ডেডলাইন আজ, কাজ করছি।',
      'অনলাইন ক্লাস চলছে, ক্যামেরা অফ রাখতে বলেছে।',
    ],
    family: [
      'আজ বাসায় অতিথি এসেছে, সাহায্য করতে হচ্ছে।',
      'ভাইয়ের স্কুলের অনুষ্ঠান আছে, যেতেই হবে।',
      'মায়ের সাথে বাজারে যেতে হবে।',
      'বাবার গাড়ি সার্ভিসে দিতে হচ্ছে।',
      'পরিবারের জরুরি মিটিং চলছে।',
      'দাদার ওষুধ কিনতে যেতে হবে।',
    ],
    random: [
      'আজ গ্রহের অবস্থান ভালো না, কিছু করা যাবে না।',
      'স্বপ্নে দেখেছি আজ বাইরে গেলে বিপদ হবে।',
      'মোবাইলের ব্যাটারি ১%, চার্জ দিচ্ছি।',
      'বিড়ালটা অসুস্থ, দেখভাল করতে হচ্ছে।',
      'আজ জন্মদিন, কেক কাটতে হবে।',
      'বৃষ্টি হচ্ছে, ভিজে যেতে চাই না।',
      'পাশের বাড়িতে বিয়ে, সাহায্য করতে বলছে।',
      'নেটফ্লিক্সের নতুন সিজন এসেছে, দেখতে হবে।',
    ],
  };

  const TIPS = [
    'বেকার থাকলেও স্কিল বাড়াও — কোডিং, ডিজাইন বা ইংরেজি প্র্যাকটিস করো!',
    'প্রতিদিন ছোট ছোট লক্ষ্য সেট করো। বড় সাফল্য ছোট পদক্ষেপ থেকেই আসে।',
    'নেটওয়ার্কিং করো। পুরনো বন্ধুদের সাথে যোগাযোগ রাখো।',
    'ফ্রিল্যান্সিং ট্রাই করো — Upwork, Fiverr এ প্রোফাইল বানাও।',
    'সকালে উঠে একটা রুটিন ফলো করো। বেকারত্ব মানেই অলসতা নয়।',
    'তোমার শখকে ক্যারিয়ারে রূপান্তর করার কথা ভাবো।',
    'একটা পোর্টফোলিও ওয়েবসাইট বানাও।',
    'প্রতিদিন ১টা করে জব অ্যাপ্লাই করো — ধীরে ধীরে ফল পাবে।',
  ];

  const ACHIEVEMENTS = [
    { id: 'first_timer', title: 'প্রথম টাইমার', desc: 'প্রথমবার টাইমার চালু করো', emoji: '⏱️', condition: (d) => d.totalSeconds > 0 },
    { id: 'hour_1', title: '১ ঘন্টা ক্লাব', desc: 'মোট ১ ঘন্টা বেকার সময়', emoji: '🕐', condition: (d) => d.totalSeconds >= 3600 },
    { id: 'hour_10', title: '১০ ঘন্টা মাস্টার', desc: 'মোট ১০ ঘন্টা বেকার', emoji: '🕙', condition: (d) => d.totalSeconds >= 36000 },
    { id: 'challenge_1', title: 'চ্যালেঞ্জার', desc: 'প্রথম চ্যালেঞ্জ সম্পন্ন', emoji: '🎯', condition: (d) => d.completedChallenges.length >= 1 },
    { id: 'challenge_5', title: 'চ্যালেঞ্জ কিং', desc: '৫টা চ্যালেঞ্জ সম্পন্ন', emoji: '🏅', condition: (d) => d.completedChallenges.length >= 5 },
    { id: 'challenge_10', title: 'চ্যালেঞ্জ লিজেন্ড', desc: '১০টা চ্যালেঞ্জ সম্পন্ন', emoji: '👑', condition: (d) => d.completedChallenges.length >= 10 },
    { id: 'excuse_5', title: 'এক্সকিউজ এক্সপার্ট', desc: '৫টা এক্সকিউজ জেনারেট', emoji: '🤥', condition: (d) => d.excuseCount >= 5 },
    { id: 'streak_3', title: '৩ দিনের স্ট্রিক', desc: '৩ দিন টানা অ্যাকটিভ', emoji: '🔥', condition: (d) => d.streak >= 3 },
    { id: 'streak_7', title: 'সপ্তাহের চ্যাম্প', desc: '৭ দিনের স্ট্রিক', emoji: '🌟', condition: (d) => d.streak >= 7 },
    { id: 'score_100', title: 'সেঞ্চুরিয়ান', desc: 'Beker Score ১০০+', emoji: '💯', condition: (d) => d.score >= 100 },
    { id: 'score_500', title: 'হাফ থাউজেন্ড', desc: 'Beker Score ৫০০+', emoji: '🚀', condition: (d) => d.score >= 500 },
    { id: 'level_pro', title: 'প্রো বেকার', desc: 'প্রো বেকার লেভেলে পৌঁছাও', emoji: '🔥', condition: (d) => d.score >= 300 },
  ];

  // ==================== STATE ====================
  let state = {
    name: '',
    score: 0,
    totalSeconds: 0,
    todaySeconds: 0,
    todayDate: '',
    timerRunning: false,
    timerStartTs: null,
    completedChallenges: [],
    todayChallengeDone: false,
    todayChallengeId: null,
    excuseCount: 0,
    streak: 0,
    lastActiveDate: '',
    unlockedAchievements: [],
    weeklyHours: [0, 0, 0, 0, 0, 0, 0], // Sun-Sat
  };

  let timerInterval = null;
  let currentExcuseCat = 'work';

  // ==================== STORAGE ====================
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = { ...state, ...parsed };
      }
    } catch (e) {
      console.warn('Load failed', e);
    }
    checkNewDay();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Save failed', e);
    }
  }

  function checkNewDay() {
    const today = getTodayStr();
    if (state.todayDate !== today) {
      // New day
      if (state.lastActiveDate) {
        const last = new Date(state.lastActiveDate);
        const now = new Date(today);
        const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
        if (diff === 1) {
          state.streak += 1;
        } else if (diff > 1) {
          state.streak = 1;
        }
      } else {
        state.streak = 1;
      }
      state.todayDate = today;
      state.todaySeconds = 0;
      state.todayChallengeDone = false;
      state.todayChallengeId = null;
      state.lastActiveDate = today;
      // Reset weekly if needed (simple: keep rolling)
      saveState();
    }
  }

  function getTodayStr() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function getDayIndex() {
    return new Date().getDay(); // 0=Sun
  }

  // ==================== LEVEL & SCORE ====================
  function getLevel(score) {
    let lvl = LEVELS[0];
    for (const l of LEVELS) {
      if (score >= l.min) lvl = l;
    }
    return lvl;
  }

  function addScore(points) {
    state.score += points;
    checkAchievements();
    updateUI();
    saveState();
  }

  // ==================== TIMER ====================
  function startTimer() {
    if (state.timerRunning) return;
    state.timerRunning = true;
    state._elapsedBase = state.todaySeconds;
    state._startWall = Date.now();

    document.getElementById('btn-timer-start').classList.add('hidden');
    document.getElementById('btn-timer-pause').classList.remove('hidden');

    timerInterval = setInterval(tickTimer, 1000);
    tickTimer();
    checkAchievements();
    saveState();
  }

  function pauseTimer() {
    if (!state.timerRunning) return;
    const elapsed = Math.floor((Date.now() - state._startWall) / 1000);
    state.todaySeconds = state._elapsedBase + elapsed;
    state.totalSeconds += elapsed; // add only this session delta
    state.timerRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    state._startWall = null;

    // Update weekly
    const day = getDayIndex();
    state.weeklyHours[day] = Math.round((state.todaySeconds / 3600) * 10) / 10;

    document.getElementById('btn-timer-start').classList.remove('hidden');
    document.getElementById('btn-timer-pause').classList.add('hidden');
    updateTimerDisplay();
    updateUI();
    saveState();
  }

  function resetTimer() {
    pauseTimer();
    // Don't remove from total, just today
    state.todaySeconds = 0;
    state._elapsedBase = 0;
    updateTimerDisplay();
    updateUI();
    saveState();
    showToast('টাইমার রিসেট হয়েছে');
  }

  function tickTimer() {
    if (!state.timerRunning) return;
    const elapsed = Math.floor((Date.now() - state._startWall) / 1000);
    const current = state._elapsedBase + elapsed;
    // Display
    const h = Math.floor(current / 3600);
    const m = Math.floor((current % 3600) / 60);
    const s = current % 60;
    document.getElementById('timer-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('timer-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('timer-secs').textContent = String(s).padStart(2, '0');
  }

  function updateTimerDisplay() {
    const current = state.todaySeconds;
    const h = Math.floor(current / 3600);
    const m = Math.floor((current % 3600) / 60);
    const s = current % 60;
    document.getElementById('timer-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('timer-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('timer-secs').textContent = String(s).padStart(2, '0');
  }

  // Better total tracking on pause
  function commitTimerDelta() {
    if (!state.timerRunning || !state._startWall) return 0;
    const elapsed = Math.floor((Date.now() - state._startWall) / 1000);
    return elapsed;
  }

  // ==================== CHALLENGE ====================
  function getTodayChallenge() {
    if (state.todayChallengeId !== null && CHALLENGES[state.todayChallengeId]) {
      return { ...CHALLENGES[state.todayChallengeId], id: state.todayChallengeId };
    }
    // Deterministic by date
    const dayNum = parseInt(getTodayStr().replace(/-/g, ''), 10);
    const id = dayNum % CHALLENGES.length;
    state.todayChallengeId = id;
    saveState();
    return { ...CHALLENGES[id], id };
  }

  function completeChallenge() {
    if (state.todayChallengeDone) {
      showToast('আজকের চ্যালেঞ্জ ইতিমধ্যে সম্পন্ন!', true);
      return;
    }
    const ch = getTodayChallenge();
    state.todayChallengeDone = true;
    state.completedChallenges.push({
      text: ch.text,
      points: ch.points,
      date: getTodayStr(),
    });
    addScore(ch.points);
    showToast(`+${ch.points} পয়েন্ট! চ্যালেঞ্জ সম্পন্ন 🎉`);
    updateChallengeUI();
    checkAchievements();
    saveState();
  }

  function skipChallenge() {
    state.todayChallengeDone = true; // count as done for the day (no points)
    showToast('চ্যালেঞ্জ স্কিপ করা হয়েছে');
    updateChallengeUI();
    saveState();
  }

  function newChallenge() {
    // Pick random different
    let id;
    do {
      id = Math.floor(Math.random() * CHALLENGES.length);
    } while (id === state.todayChallengeId && CHALLENGES.length > 1);
    state.todayChallengeId = id;
    state.todayChallengeDone = false;
    updateChallengeUI();
    saveState();
    showToast('নতুন চ্যালেঞ্জ লোড হয়েছে!');
  }

  function updateChallengeUI() {
    const ch = getTodayChallenge();
    document.getElementById('challenge-text').textContent = ch.text;
    document.getElementById('challenge-points').textContent = `+${ch.points} পয়েন্ট`;

    const btnDone = document.getElementById('btn-challenge-done');
    const btnSkip = document.getElementById('btn-challenge-skip');
    if (state.todayChallengeDone) {
      btnDone.disabled = true;
      btnDone.textContent = '✅ সম্পন্ন';
      btnSkip.disabled = true;
    } else {
      btnDone.disabled = false;
      btnDone.textContent = '✅ সম্পন্ন করেছি';
      btnSkip.disabled = false;
    }

    // List
    const list = document.getElementById('completed-challenges');
    if (state.completedChallenges.length === 0) {
      list.innerHTML = '<li class="empty">এখনো কোনো চ্যালেঞ্জ সম্পন্ন হয়নি</li>';
    } else {
      list.innerHTML = state.completedChallenges
        .slice()
        .reverse()
        .slice(0, 10)
        .map((c) => `<li>${c.text} <small style="color:var(--accent)">(+${c.points})</small></li>`)
        .join('');
    }
  }

  // ==================== EXCUSE ====================
  function generateExcuse() {
    const list = EXCUSES[currentExcuseCat] || EXCUSES.random;
    const text = list[Math.floor(Math.random() * list.length)];
    document.getElementById('excuse-text').textContent = text;
    state.excuseCount += 1;
    checkAchievements();
    saveState();
    updateUI();
  }

  function copyExcuse() {
    const text = document.getElementById('excuse-text').textContent;
    if (!text || text.includes('বাটনে চাপ')) {
      showToast('আগে এক্সকিউজ জেনারেট করো', true);
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      showToast('কপি হয়েছে! 📋');
    }).catch(() => {
      showToast('কপি করা যায়নি', true);
    });
  }

  // ==================== ACHIEVEMENTS ====================
  function checkAchievements() {
    let newUnlock = false;
    ACHIEVEMENTS.forEach((ach) => {
      if (!state.unlockedAchievements.includes(ach.id) && ach.condition(state)) {
        state.unlockedAchievements.push(ach.id);
        newUnlock = true;
        showToast(`🏆 অ্যাচিভমেন্ট আনলক: ${ach.title}`);
      }
    });
    if (newUnlock) saveState();
    renderAchievements();
  }

  function renderAchievements() {
    const grid = document.getElementById('achievements-grid');
    grid.innerHTML = ACHIEVEMENTS.map((ach) => {
      const unlocked = state.unlockedAchievements.includes(ach.id);
      return `
        <div class="ach-item ${unlocked ? 'unlocked' : ''}">
          <span class="ach-emoji">${ach.emoji}</span>
          <div class="ach-title">${ach.title}</div>
          <div class="ach-desc-text">${ach.desc}</div>
        </div>
      `;
    }).join('');
  }

  // ==================== SHARE CARD ====================
  function updateShareCard() {
    const level = getLevel(state.score);
    document.getElementById('card-score-value').textContent = state.score;
    document.getElementById('card-level-emoji').textContent = level.emoji;
    document.getElementById('card-level-name').textContent = level.name;
    document.getElementById('card-hours').textContent = (state.totalSeconds / 3600).toFixed(1);
    document.getElementById('card-streak').textContent = state.streak;
    document.getElementById('card-challenges').textContent = state.completedChallenges.length;
    document.getElementById('card-date').textContent = new Date().toLocaleDateString('bn-BD');
  }

  function downloadCard() {
    // Simple approach: use canvas to capture the card
    const card = document.getElementById('bekar-card');
    // For pure JS without html2canvas dependency, we create a simple text-based share
    // or instruct user. For v1 we use Web Share API or copy text.
    const level = getLevel(state.score);
    const text = `😴 বেকার মিটার
Beker Score: ${state.score}
লেভেল: ${level.emoji} ${level.name}
মোট ঘন্টা: ${(state.totalSeconds / 3600).toFixed(1)}
স্ট্রিক: ${state.streak} দিন
চ্যালেঞ্জ: ${state.completedChallenges.length}

#BekarMeter #বেকারমিটার`;
    navigator.clipboard.writeText(text).then(() => {
      showToast('কার্ড টেক্সট কপি হয়েছে! সোশ্যালে পেস্ট করো');
    });
  }

  function shareCard() {
    const level = getLevel(state.score);
    const text = `😴 আমি বেকার মিটার ব্যবহার করছি!
Beker Score: ${state.score} | লেভেল: ${level.name}
স্ট্রিক: ${state.streak} দিন

#BekarMeter`;
    if (navigator.share) {
      navigator.share({ title: 'বেকার মিটার', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => showToast('শেয়ার টেক্সট কপি হয়েছে'));
    }
  }

  // ==================== UI UPDATE ====================
  function updateUI() {
    // Score
    document.getElementById('beker-score').textContent = state.score;
    const level = getLevel(state.score);
    document.getElementById('beker-level').textContent = level.name;
    document.getElementById('beker-level-emoji').textContent = level.emoji;

    // Ring progress (max visual at 1000)
    const maxVisual = 1000;
    const progress = Math.min(state.score / maxVisual, 1);
    const circumference = 2 * Math.PI * 54;
    const offset = circumference * (1 - progress);
    document.getElementById('score-progress').style.strokeDashoffset = offset;

    // Today's report
    const todayH = (state.todaySeconds / 3600).toFixed(1);
    document.getElementById('today-hours').textContent = todayH;
    document.getElementById('today-challenges').textContent = state.todayChallengeDone ? 1 : 0;
    document.getElementById('today-excuses').textContent = state.excuseCount; // total for simplicity, or track daily
    document.getElementById('streak-days').textContent = state.streak;

    // Total time
    const totalH = (state.totalSeconds / 3600).toFixed(1);
    document.getElementById('total-bekar-time').textContent = `${totalH} ঘন্টা`;

    // Tip
    const tipIdx = parseInt(getTodayStr().replace(/-/g, ''), 10) % TIPS.length;
    document.getElementById('daily-tip').textContent = TIPS[tipIdx];

    // Weekly chart
    renderWeekly();

    // Share card
    updateShareCard();

    // Name
    if (state.name) {
      document.querySelector('.app-subtitle').textContent = state.name + ' • v1.0';
    }
  }

  function renderWeekly() {
    const days = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];
    const maxH = Math.max(...state.weeklyHours, 1);
    const container = document.getElementById('weekly-chart');
    container.innerHTML = days
      .map((d, i) => {
        const h = state.weeklyHours[i] || 0;
        const pct = Math.max((h / maxH) * 100, 4);
        return `
          <div class="bar-item">
            <div class="bar" style="height:${pct}%"></div>
            <span class="bar-label">${d}</span>
          </div>
        `;
      })
      .join('');
  }

  // ==================== NAVIGATION ====================
  function showPage(pageId) {
    document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach((n) => {
      n.classList.toggle('active', n.dataset.page === pageId);
    });
  }

  // ==================== TOAST ====================
  function showToast(msg, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.toggle('error', isError);
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2500);
  }

  // ==================== PROFILE ====================
  function openProfile() {
    document.getElementById('user-name').value = state.name || '';
    document.getElementById('profile-modal').classList.remove('hidden');
  }

  function closeProfile() {
    document.getElementById('profile-modal').classList.add('hidden');
  }

  function saveProfile() {
    state.name = document.getElementById('user-name').value.trim().slice(0, 20);
    saveState();
    updateUI();
    closeProfile();
    showToast('প্রোফাইল সেভ হয়েছে');
  }

  function resetData() {
    if (confirm('সব ডাটা মুছে যাবে। নিশ্চিত?')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  }

  // ==================== INIT ====================
  function init() {
    loadState();

    // Fix totalSeconds if timer was running (page refresh)
    if (state.timerRunning && state._startWall) {
      // Recover roughly
      state.timerRunning = false;
    }

    // Event listeners
    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.addEventListener('click', () => showPage(btn.dataset.page));
    });

    document.getElementById('btn-timer-start').addEventListener('click', startTimer);
    document.getElementById('btn-timer-pause').addEventListener('click', pauseTimer);
    document.getElementById('btn-timer-reset').addEventListener('click', resetTimer);

    document.getElementById('btn-challenge-done').addEventListener('click', completeChallenge);
    document.getElementById('btn-challenge-skip').addEventListener('click', skipChallenge);
    document.getElementById('btn-challenge-new').addEventListener('click', newChallenge);

    document.getElementById('btn-generate-excuse').addEventListener('click', generateExcuse);
    document.getElementById('btn-copy-excuse').addEventListener('click', copyExcuse);

    document.querySelectorAll('.cat-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentExcuseCat = btn.dataset.cat;
      });
    });

    document.getElementById('btn-download-card').addEventListener('click', downloadCard);
    document.getElementById('btn-share-card').addEventListener('click', shareCard);

    document.getElementById('btn-profile').addEventListener('click', openProfile);
    document.getElementById('close-profile').addEventListener('click', closeProfile);
    document.getElementById('btn-save-profile').addEventListener('click', saveProfile);
    document.getElementById('btn-reset-data').addEventListener('click', resetData);

    // Initial UI
    updateTimerDisplay();
    updateChallengeUI();
    renderAchievements();
    updateUI();
    checkAchievements();

    // Hide splash
    setTimeout(() => {
      document.getElementById('splash').classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');
    }, 1200);
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
