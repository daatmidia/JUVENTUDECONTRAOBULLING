(function () {
  'use strict';

  /* ----- Quiz data ----- */
  const QUIZ_SCENARIOS = [
    {
      text: 'Veteranos obrigam calouros a carregar mochilas e fazer tarefas humilhantes todo dia no colégio.',
      contextTip: 'Contexto: há hierarquia entre calouros e veteranos — a humilhação se repete.',
      isBullying: true,
      feedback: 'Isso é bullying. Existe <strong>desequilíbrio de poder</strong> (veteranos × calouros) e a humilhação é <strong>repetida</strong>. Não é tradição — é violência.',
      legalNote: 'Lei nº 14.811/2024 — violência escolar. CP Art. 129 (lesão corporal). ECA Art. 53 — ambiente escolar seguro.',
    },
    {
      text: 'Uma conta anônima no TikTok publica vídeos editados para ridicularizar a mesma pessoa há semanas.',
      contextTip: 'Contexto: anonimato online dificulta identificar o agressor, mas não impede denúncia.',
      isBullying: true,
      feedback: 'Isso é cyberbullying. O anonimato não protege quem ataca — plataformas e escola podem agir com prints e denúncia formal.',
      legalNote: 'Marco Civil da Internet (Art. 21) — remoção de conteúdo ilícito. Lei nº 14.811/2024 — cyberbullying escolar.',
    },
    {
      text: 'Alunos humilham um calouro no refeitório toda semana. A coordenação foi avisada três vezes e não investigou.',
      contextTip: 'Contexto: a escola tem dever institucional de apurar — não minimizar denúncias.',
      isBullying: true,
      feedback: 'A humiliação repetida <strong>é bullying</strong>. A omissão da escola agrava o dano — você pode escalar para ouvidoria, Conselho Tutelar ou Disque 100.',
      legalNote: 'Lei nº 14.811/2024 + Lei 13.185/2015 Art. 5º — escola deve apurar, proteger e informar a família.',
    },
    {
      text: 'Dois colegas discutem uma vez porque um emprestou dinheiro e o outro ainda não devolveu.',
      contextTip: 'Contexto: conflito pontual entre pessoas com poder parecido.',
      isBullying: false,
      feedback: 'Isso <strong>não é bullying</strong>. Faltam repetição intencional e desequilíbrio estrutural de poder — é um conflito entre pares.',
      legalNote: 'Bullying exige repetição + intenção + desequilíbrio (Lei 13.185/2015). Conflito único entre iguais não se enquadra.',
    },
    {
      text: 'No WhatsApp da turma, printam conversas privadas de uma colega para humilhá-la na frente de todos.',
      contextTip: 'Contexto: violação de privacidade + humilhação pública repetida.',
      isBullying: true,
      feedback: 'Isso é cyberbullying social. Expor conversas privadas para humilhar combina violência digital e exclusão pública.',
      legalNote: 'Marco Civil Art. 21 + Lei nº 14.811/2024. CP Arts. 138–140 (calúnia, difamação, injúria).',
    },
    {
      text: 'A professora aplicou suspensão documentada porque o aluno quebrou regras claras do contrato escolar.',
      contextTip: 'Contexto: medida disciplinar prevista em regulamento, aplicada com registro.',
      isBullying: false,
      feedback: 'Isso <strong>não é bullying</strong>. Consequência disciplinar legítima, com regras claras e iguais para todos, não é violência entre pares.',
      legalNote: 'Poder disciplinar docente (ECA Art. 53, §3º) é diferente de bullying — exige legalidade, proporcionalidade e isonomia.',
    },
    {
      text: 'Depois que se assumiu LGBTQ+, Marina foi excluída de grupos de estudo e do refeitório por semanas.',
      contextTip: 'Contexto: exclusão intencional e repetida por identidade — violência social.',
      isBullying: true,
      feedback: 'Isso é bullying social com viés discriminatório. Exclusão repetida por quem a pessoa é machuca e pode configurar violência escolar grave.',
      legalNote: 'Lei nº 14.811/2024 + ECA Art. 53. Discriminação repetida na escola exige apuração e proteção imediata.',
    },
    {
      text: 'Dois amigos brincam de luta livre na educação física; os dois consentem e riem depois.',
      contextTip: 'Contexto: brincadeira mútua, sem alvo fixo nem intenção de machucar.',
      isBullying: false,
      feedback: 'Isso <strong>não é bullying</strong>. Ambos participam por vontade, ninguém é alvo sistemático e ninguém sai machucado de verdade.',
      legalNote: 'Brincadeira mútua consentida não preenche os critérios de repetição + desequilíbrio + intenção de humilhar.',
    },
  ];

  const FINISH_MESSAGES = [
    'Incrível! Vocês provaram que a justiça e o conhecimento andam juntos. Até a próxima investigação!',
    'Você terminou! Saber reconhecer bullying é um superpoder — use para se proteger e ajudar quem precisa.',
    'Mandou bem! Agora você entende melhor a diferença entre conflito e bullying. Isso te dá mais segurança para pedir ajuda.',
  ];

  const BUDDY_MSGS = {
    default: 'Olá mentes brilhantes! Preparados para um desafio?',
    mod1: 'Missão 1: vamos descobrir juntos o que é bullying!',
    quiz: 'Pensa comigo… o que você acha? Analise os fatos com calma!',
    quizAnswer: 'Na mosca! Equilíbrio perfeito na resposta!',
    quizAlmost: 'Hum, quase lá! O que acha de analisar os fatos por outro ângulo?',
    quizDone: 'Incrível! Vocês provaram que a justiça e o conhecimento andam juntos!',
    sticker: 'Mais um adesivo na coleção! A balança da justiça equilibra o conhecimento.',
    allStickers: 'INCRÍVEL! Você colecionou os 4 tipos! A Ju está orgulhosa! ⚖️',
    mod2: 'Missão 2: ser aliado é defender a justiça no dia a dia!',
    mod3: 'Missão 3: lembra — não é sua culpa. A Ju está aqui com você.',
    check: 'O que você sente é real. Pedir ajuda também é justiça!',
    locked: 'Complete a missão anterior para desbloquear esta!',
    locked2: '🔒 Termine a Missão 1 (Bullying) para desbloquear a Missão 2!',
    locked3: '🔒 Termine a Missão 2 (Testemunha) para desbloquear a Missão 3!',
  };

  const TOTAL_MISSIONS = 3;

  const JU_FRAMES = {
    intro: 'intro',
    think: 'think',
    learn: 'learn',
    correct: 'correct',
    happy: 'victory',
    victory: 'victory',
  };

  const JU_MOOD_LABELS = {
    intro: 'Olá!',
    think: 'Pensando…',
    learn: 'Quase lá!',
    correct: 'Acertou!',
    victory: 'Vitória!',
  };

  const JU_ARIA = {
    intro: 'Ju, ideal de justiça, saudação de início',
    think: 'Ju pensando sobre a pergunta',
    learn: 'Ju incentivando a revisar a resposta',
    correct: 'Ju comemorando resposta correta',
    victory: 'Ju celebrando vitória',
  };

  const JU_ASSET_VERSION = '9';

  const JU_ASSETS = {
    intro: { mode: 'portrait', src: 'assets/ju-express-intro.png?v=1' },
    think: { mode: 'portrait', src: 'assets/ju-pergunta.png' },
    learn: { mode: 'portrait', src: 'assets/ju-quase.png' },
    correct: { mode: 'portrait', src: 'assets/ju-acertou.png?v=12' },
    victory: { mode: 'portrait', src: 'assets/ju_fimdejogo.png' },
  };

  function setJuFrame(wrap, mood) {
    if (!wrap) return;
    const frame = JU_FRAMES[mood] || 'intro';
    const asset = JU_ASSETS[frame] || JU_ASSETS.intro;
    const img = wrap.querySelector('img');
    const chip = wrap.querySelector('.ju-mood-chip');

    wrap.setAttribute('data-frame', frame);
    wrap.classList.toggle('ju-avatar-wrap--portrait', asset.mode === 'portrait');
    wrap.classList.toggle('ju-avatar-wrap--sprite', asset.mode === 'sprite');

    if (img) {
      img.src = `${asset.src}?v=${JU_ASSET_VERSION}`;
      img.className = asset.mode === 'portrait' ? 'ju-portrait-img' : 'ju-sprite-sheet';
      img.setAttribute('alt', JU_ARIA[frame] || JU_ARIA.intro);
    }

    if (chip) chip.textContent = JU_MOOD_LABELS[frame] || '';

    wrap.classList.remove('ju-express-pop');
    void wrap.offsetWidth;
    wrap.classList.add('ju-express-pop');
  }

  function setQuizMood(mood) {
    const mascot = document.getElementById('quizMascot');
    if (mascot) mascot.setAttribute('data-mood', mood);
    setJuFrame(mascot?.querySelector('.ju-avatar-wrap'), mood);
    setJuFrame(document.getElementById('buddyAvatar'), mood);
  }

  function preloadJuExpressions() {
    Object.values(JU_ASSETS).forEach(({ src }) => {
      const preload = new Image();
      preload.src = `${src}?v=${JU_ASSET_VERSION}`;
    });
  }

  function sayBuddy(key) {
    const bubble = document.getElementById('toonBubble');
    const toggle = document.getElementById('toonBuddyToggle');
    if (!bubble || !BUDDY_MSGS[key]) return;
    bubble.textContent = BUDDY_MSGS[key];
    bubble.classList.remove('is-hidden');
    toggle?.classList.add('is-wiggle');
    setTimeout(() => toggle?.classList.remove('is-wiggle'), 400);
  }

  function burstConfetti(container) {
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#FFD93D', '#FF6B6B', '#6BCB77', '#C084FC', '#38BDF8'];
    for (let i = 0; i < 40; i += 1) {
      const piece = document.createElement('span');
      piece.className = 'toon-confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 0.6}s`;
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 3000);
    }
  }

  /* ----- Game XP / HUD ----- */
  const GAME_STORAGE_KEY = 'juventude-edu-game-v1';
  const GAME_XP = {
    quizAnswer: 2,
    quizDone: 25,
    sticker: 6,
    allStickers: 12,
    quest: 20,
    check: 4,
  };
  const XP_PER_LEVEL = 40;
  const STICKER_IDS = ['fisico', 'verbal', 'social', 'cyber'];

  let grantGameXp = () => {};
  let gameClaimedSet = new Set();

  function hasAllStickers(claimedSet = gameClaimedSet) {
    return STICKER_IDS.every((id) => claimedSet.has(`sticker-${id}`));
  }

  function canCompleteMission1(claimedSet = gameClaimedSet) {
    return claimedSet.has('quiz-done') && hasAllStickers(claimedSet);
  }

  function countChecksDone(claimedSet = gameClaimedSet) {
    let total = 0;
    claimedSet.forEach((id) => {
      if (id.startsWith('check-')) total += 1;
    });
    return total;
  }

  function canCompleteMission3(claimedSet = gameClaimedSet) {
    return countChecksDone(claimedSet) >= 3;
  }

  function sanitizeClaimed(claimed) {
    const set = new Set(Array.isArray(claimed) ? claimed : []);

    if (!canCompleteMission1(set)) {
      set.delete('quest-1');
      set.delete('quest-2');
      set.delete('quest-3');
      return [...set];
    }

    if (!set.has('quest-2')) {
      set.delete('quest-3');
    }

    if (set.has('quest-3') && !canCompleteMission3(set)) {
      set.delete('quest-3');
    }

    return [...set];
  }

  function isMissionDone(num, claimedSet = gameClaimedSet) {
    if (num === 1) {
      return canCompleteMission1(claimedSet);
    }
    if (num === 2) {
      return isMissionDone(1, claimedSet) && claimedSet.has('quest-2');
    }
    if (num === 3) {
      return isMissionDone(2, claimedSet)
        && claimedSet.has('quest-3')
        && canCompleteMission3(claimedSet);
    }
    return false;
  }

  function loadGameState() {
    try {
      const raw = localStorage.getItem(GAME_STORAGE_KEY);
      if (!raw) return { xp: 0, claimed: [] };
      const parsed = JSON.parse(raw);
      return {
        xp: Number(parsed.xp) || 0,
        claimed: Array.isArray(parsed.claimed) ? parsed.claimed : [],
      };
    } catch {
      return { xp: 0, claimed: [] };
    }
  }

  function saveGameState(state) {
    try {
      localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota / private mode */
    }
  }

  function getGameLevel(xp) {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
  }

  function getLevelProgress(xp) {
    const inLevel = xp % XP_PER_LEVEL;
    return Math.round((inLevel / XP_PER_LEVEL) * 100);
  }

  function updateGameHud(state, prevLevel) {
    updateMissionProgress();

    if (state && prevLevel !== undefined) {
      const level = getGameLevel(state.xp);
      if (level > prevLevel) burstLevelUpBadge();
    }
  }

  function countMissionsDone() {
    return [1, 2, 3].filter((num) => isMissionDone(num)).length;
  }

  function isMissionUnlocked(num) {
    if (num <= 1) return true;
    return isMissionDone(num - 1);
  }

  function updateMissionProgress() {
    const done = countMissionsDone();
    const pct = Math.round((done / TOTAL_MISSIONS) * 100);
    const fill = document.getElementById('gameXpFill');
    const bar = document.getElementById('gameXpBar');
    const levelEl = document.getElementById('gameLevel');
    const labelEl = document.getElementById('gameMissionLabel');
    const statusEl = document.getElementById('gameMissionStatus');

    if (fill) fill.style.width = `${pct}%`;
    if (bar) {
      bar.setAttribute('aria-valuenow', String(done));
      bar.setAttribute('aria-valuemax', String(TOTAL_MISSIONS));
      bar.setAttribute('aria-valuetext', `${done} de ${TOTAL_MISSIONS} missões concluídas`);
    }
    if (levelEl) levelEl.textContent = String(Math.min(done + 1, TOTAL_MISSIONS));
    if (labelEl) labelEl.textContent = `${done}/${TOTAL_MISSIONS} missões`;

    if (statusEl) {
      const showDone = done > 0;
      statusEl.hidden = !showDone;
      statusEl.classList.toggle('is-visible', showDone);
    }

    document.getElementById('gameRespeito')?.classList.toggle('is-active', done >= 1);
    document.getElementById('gameIgualdade')?.classList.toggle('is-active', done >= 2);
    document.getElementById('gameRespeito')?.classList.toggle('is-complete', done >= TOTAL_MISSIONS);
    document.getElementById('gameIgualdade')?.classList.toggle('is-complete', done >= TOTAL_MISSIONS);
  }

  function celebrateMissionComplete() {
    const fill = document.getElementById('gameXpFill');
    const statusEl = document.getElementById('gameMissionStatus');
    fill?.classList.add('is-burst');
    statusEl?.classList.add('is-burst');
    setTimeout(() => {
      fill?.classList.remove('is-burst');
      statusEl?.classList.remove('is-burst');
    }, 900);
  }

  function tryCompleteMission1() {
    if (isMissionDone(1) || !canCompleteMission1()) return;
    markQuest(1);
  }

  function highlightCurrentMission() {
    document.querySelectorAll('.toon-quest-item').forEach((q) => q.classList.remove('is-active'));
    const current = [1, 2, 3].find((num) => isMissionUnlocked(num) && !isMissionDone(num));
    if (current) {
      document.querySelector(`.toon-quest-item[data-quest="${current}"]`)?.classList.add('is-active');
    }
  }

  function resetMissionButtonVisuals() {
    document.querySelectorAll('.edu-module-mission-btn').forEach((el) => {
      el.classList.remove('is-done');
      el.querySelector('.game-mission-done-label')?.remove();
    });
  }

  function updateMissionLocks() {
    for (let num = 1; num <= TOTAL_MISSIONS; num += 1) {
      const unlocked = isMissionUnlocked(num);
      const done = isMissionDone(num);
      const locked = !unlocked && !done;

      document.querySelectorAll(`.toon-quest-item[data-quest="${num}"]`).forEach((el) => {
        el.classList.toggle('is-locked', locked);
        if (!done) {
          el.classList.remove('is-done');
          el.querySelector('.game-mission-done-label')?.remove();
        }
      });
      const moduleEl = document.getElementById(`modulo-${num}`);
      moduleEl?.classList.toggle('is-locked', locked);
      if (moduleEl) {
        if (locked) moduleEl.setAttribute('inert', '');
        else moduleEl.removeAttribute('inert');
      }

      document.querySelectorAll(`a[data-module="${num}"]`).forEach((el) => {
        el.classList.toggle('is-locked', locked);
        if (!done) {
          el.classList.remove('is-done');
          el.querySelector('.game-mission-done-label')?.remove();
        } else if (el.classList.contains('edu-module-mission-btn')) {
          addMissionDoneLabel(el);
          el.classList.add('is-done');
        }
        if (el.tagName === 'A') {
          if (locked) {
            el.setAttribute('aria-disabled', 'true');
            el.setAttribute('tabindex', '0');
          } else {
            el.removeAttribute('aria-disabled');
            el.removeAttribute('tabindex');
          }
        }
      });
    }

    highlightCurrentMission();
  }

  function getLockedBuddyKey(mod) {
    if (mod === 2 || (mod === 3 && !isMissionDone(1))) return 'locked2';
    if (mod === 3) return 'locked3';
    return 'locked';
  }

  function guardMissionHash() {
    const routes = {
      '#modulo-2': 2,
      '#modulo-3': 3,
      '#eduMa': 3,
      '#eduChecklist': 3,
    };
    const mod = routes[window.location.hash];
    if (!mod || isMissionUnlocked(mod)) return;
    history.replaceState(null, '', '#modulo-1');
    sayBuddy(getLockedBuddyKey(mod));
  }

  function initMissionLocks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-module].is-locked');
      if (!link) return;
      e.preventDefault();
      sayBuddy(getLockedBuddyKey(Number(link.dataset.module)));
    });

    window.addEventListener('hashchange', guardMissionHash);
    guardMissionHash();
  }

  function burstLevelUpBadge() {
    document.querySelector('.game-hero-level-up, .game-float--level')?.classList.add('is-burst');
    setTimeout(() => {
      document.querySelector('.game-hero-level-up, .game-float--level')?.classList.remove('is-burst');
    }, 1200);
  }

  function restoreGameVisuals() {
    gameClaimedSet.forEach((id) => {
      if (id.startsWith('sticker-')) {
        const stickerId = id.replace('sticker-', '');
        document.querySelector(`.toon-sticker[data-sticker="${stickerId}"]`)?.classList.add('is-unlocked');
      }
    });

    syncAllMissionVisuals();

    const stickerCount = document.querySelectorAll('.toon-sticker.is-unlocked').length;
    const countEl = document.getElementById('stickerCount');
    if (countEl) countEl.textContent = `${stickerCount}/4`;
  }

  function clearMissionVisuals(num) {
    document.querySelectorAll(`.toon-quest-item[data-quest="${num}"]`).forEach((el) => {
      el.classList.remove('is-done', 'is-active');
      el.querySelector('.game-mission-done-label')?.remove();
      el.removeAttribute('aria-label');
    });

    document.querySelectorAll(`.edu-module-mission-btn[data-module="${num}"]`).forEach((el) => {
      el.classList.remove('is-done');
      el.querySelector('.game-mission-done-label')?.remove();
    });

    const lines = document.querySelectorAll('.toon-quest-line');
    if (lines[num - 1]) lines[num - 1].classList.remove('is-done');
  }

  function syncAllMissionVisuals() {
    for (let num = 1; num <= TOTAL_MISSIONS; num += 1) {
      clearMissionVisuals(num);
    }

    for (let num = 1; num <= TOTAL_MISSIONS; num += 1) {
      if (isMissionDone(num)) {
        applyMissionDoneVisuals(num);
      }
    }

    const firstOpen = [1, 2, 3].find((num) => isMissionUnlocked(num) && !isMissionDone(num));
    if (firstOpen) {
      document.querySelector(`.toon-quest-item[data-quest="${firstOpen}"]`)?.classList.add('is-active');
    }

    updateMissionLocks();
    updateMissionProgress();
  }

  function initGameXp() {
    if (!document.body.classList.contains('page-educativo--game')) {
      grantGameXp = () => {};
      return;
    }

    const state = loadGameState();
    const originalClaimed = [...state.claimed];
    const sanitized = sanitizeClaimed(state.claimed);
    const sortIds = (ids) => [...ids].sort().join(',');
    const claimedChanged = sortIds(sanitized) !== sortIds(originalClaimed);
    state.claimed = sanitized;
    gameClaimedSet = new Set(state.claimed);
    if (claimedChanged) {
      saveGameState({ xp: state.xp, claimed: sanitized });
    }

    resetMissionButtonVisuals();
    restoreGameVisuals();
    tryCompleteMission1();
    updateGameHud({ xp: state.xp, claimed: gameClaimedSet });

    grantGameXp = (amount, id) => {
      if (!amount || amount <= 0) return;
      if (id && gameClaimedSet.has(id)) return;

      const prevLevel = getGameLevel(state.xp);
      if (id) gameClaimedSet.add(id);
      state.xp += amount;
      saveGameState({ xp: state.xp, claimed: [...gameClaimedSet] });
      updateGameHud(state, prevLevel);
    };
  }

  /* ----- Tabs ----- */
  function initTabs() {
    const tabs = document.querySelectorAll('.edu-tab');
    const panels = document.querySelectorAll('.edu-panel');
    const hero = document.querySelector('.game-hero--start');
    const tabsWrap = document.querySelector('.game-tabs-wrap, .edu-tabs-wrap');
    if (!tabs.length) return;

    function activateTab(tab) {
      const target = tab.dataset.panel;
      if (!target) return;

      tabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });

      panels.forEach((p) => {
        const active = p.id === target;
        p.classList.toggle('is-active', active);
        if (active) {
          p.removeAttribute('hidden');
          p.querySelectorAll('.edu-soon').forEach((el) => el.classList.add('is-visible'));
        } else {
          p.setAttribute('hidden', '');
        }
      });

      if (hero) {
        if (target === 'panel-alunos') hero.removeAttribute('hidden');
        else hero.setAttribute('hidden', '');
      }

      const scrollTarget = target === 'panel-alunos'
        ? (document.querySelector('#panel-alunos .screen.active') || tabsWrap)
        : document.getElementById(target);
      const skipAlunosScroll = target === 'panel-alunos'
        && (document.body.classList.contains('alunos-phase-selector')
          || document.body.classList.contains('alunos-phase-greeting'));
      if (!skipAlunosScroll) {
        scrollTarget?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activateTab(tab));

      tab.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const list = Array.from(tabs);
        const idx = list.indexOf(tab);
        const next = e.key === 'ArrowRight'
          ? list[(idx + 1) % list.length]
          : list[(idx - 1 + list.length) % list.length];
        next.focus();
        activateTab(next);
      });
    });
  }

  /* ----- Quiz ----- */
  function initQuiz() {
    const quiz = document.getElementById('eduQuiz');
    if (!quiz) return;

    const scenarioEl = document.getElementById('quizScenario');
    const contextEl = document.getElementById('quizContextTip');
    const legalEl = document.getElementById('quizLegalNote');
    const progressEl = document.getElementById('quizProgress');
    const feedbackEl = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('quizNext');
    const finishEl = document.getElementById('quizFinish');
    const finishMsgEl = document.getElementById('quizFinishMsg');
    const restartBtn = document.getElementById('quizRestart');
    const actionsEl = document.getElementById('quizActions');
    const btnYes = document.getElementById('quizYes');
    const btnNo = document.getElementById('quizNo');

    let current = 0;
    let answered = 0;

    function render() {
      const s = QUIZ_SCENARIOS[current];
      if (!s) return;

      if (scenarioEl) {
        scenarioEl.textContent = s.text;
        scenarioEl.style.display = 'block';
        scenarioEl.hidden = false;
      }
      if (contextEl) {
        if (s.contextTip) {
          contextEl.textContent = s.contextTip;
          contextEl.hidden = false;
          contextEl.removeAttribute('hidden');
        } else {
          contextEl.textContent = '';
          contextEl.hidden = true;
        }
      }
      if (legalEl) {
        if (s.legalNote) {
          legalEl.textContent = `⚖️ ${s.legalNote}`;
          legalEl.hidden = false;
          legalEl.removeAttribute('hidden');
        } else {
          legalEl.textContent = '';
          legalEl.hidden = true;
        }
      }
      if (progressEl) {
        progressEl.textContent = `${current + 1} de ${QUIZ_SCENARIOS.length}`;
      }
      const bar = document.getElementById('quizProgressBar');
      if (bar) bar.style.width = `${((current + 1) / QUIZ_SCENARIOS.length) * 100}%`;
      if (feedbackEl) {
        feedbackEl.classList.remove('is-visible');
        feedbackEl.innerHTML = '';
      }
      if (nextBtn) nextBtn.classList.remove('is-visible');
      if (actionsEl) actionsEl.style.display = 'grid';
      if (finishEl) finishEl.classList.remove('is-visible');
      const stage = quiz.querySelector('.toon-quiz-stage');
      if (stage) stage.style.display = 'flex';
      const header = quiz.querySelector('.edu-quiz-header');
      if (header) header.style.display = 'flex';
      const progressWrap = quiz.querySelector('.edu-quiz-progress-wrap');
      if (progressWrap) progressWrap.style.removeProperty('display');
      setQuizMood('think');
    }

    function answer(choice) {
      const s = QUIZ_SCENARIOS[current];
      const correct = choice === s.isBullying;
      answered += 1;

      feedbackEl.innerHTML = s.feedback;
      feedbackEl.classList.add('is-visible');
      feedbackEl.setAttribute('role', 'status');
      feedbackEl.setAttribute('aria-live', 'polite');

      if (!correct) {
        feedbackEl.style.borderLeftColor = '#7c3aed';
        feedbackEl.style.background = '#f3e8ff';
        feedbackEl.style.color = '#111827';
      } else {
        feedbackEl.style.borderLeftColor = '';
        feedbackEl.style.background = '';
        feedbackEl.style.color = '#111827';
      }

      nextBtn.classList.add('is-visible');
      actionsEl.style.display = 'none';
      setQuizMood(correct ? 'correct' : 'learn');
      if (globalThis.JU?.bind) {
        JU.bind({
          img: document.querySelector('#quizJuAvatar img'),
          bubble: document.querySelector('#quizJuAvatar .ju-mood-chip'),
        });
      }
      if (globalThis.JU?.unlock) JU.unlock();
      if (correct) {
        juAcertou();
      } else {
        juErrou();
      }
      sayBuddy(correct ? 'quizAnswer' : 'quizAlmost');
      grantGameXp(GAME_XP.quizAnswer, `quiz-answer-${current}`);

      if (current >= QUIZ_SCENARIOS.length - 1) {
        nextBtn.textContent = 'Finalizar quiz ✓';
      } else {
        nextBtn.textContent = 'Próximo! →';
      }
    }

    function next() {
      current += 1;
      if (current >= QUIZ_SCENARIOS.length) {
        showFinish();
      } else {
        render();
      }
    }

    function showFinish() {
      const stage = quiz.querySelector('.toon-quiz-stage');
      if (stage) stage.style.display = 'none';
      quiz.querySelector('.edu-quiz-header').style.display = 'none';
      quiz.querySelector('.edu-quiz-progress-wrap')?.style.setProperty('display', 'none');
      scenarioEl.style.display = 'none';
      if (contextEl) {
        contextEl.textContent = '';
        contextEl.hidden = true;
      }
      if (legalEl) {
        legalEl.textContent = '';
        legalEl.hidden = true;
      }
      feedbackEl.classList.remove('is-visible');
      nextBtn.classList.remove('is-visible');
      finishEl.classList.add('is-visible');
      setQuizMood('victory');
      const msg = FINISH_MESSAGES[Math.floor(Math.random() * FINISH_MESSAGES.length)];
      finishMsgEl.textContent = msg;
      burstConfetti(document.getElementById('toonConfetti'));
      if (globalThis.JU?.unlock) JU.unlock();
      if (typeof juParabens === 'function') juParabens();
      else if (globalThis.JU?.parabens) JU.parabens();
      sayBuddy('quizDone');
      grantGameXp(GAME_XP.quizDone, 'quiz-done');
      tryCompleteMission1();
    }

    function restart() {
      current = 0;
      answered = 0;
      render();
    }

    btnYes?.addEventListener('click', () => answer(true));
    btnNo?.addEventListener('click', () => answer(false));
    nextBtn?.addEventListener('click', next);
    restartBtn?.addEventListener('click', restart);

    render();
    sayBuddy('quiz');
  }

  /* ----- Stickers + Flip cards ----- */
  function getFlipCardImages() {
    return globalThis.FLIP_CARD_DETAIL_IMAGES || {
      fisico: 'assets/cards/5.webp',
      verbal: 'assets/cards/6.webp',
      social: 'assets/cards/7.webp',
      cyber: 'assets/cards/8.webp?v=3',
    };
  }

  function initFlipCards() {
    const FLIP_CARD_IMAGES = getFlipCardImages();
    const unlocked = new Set();
    document.querySelectorAll('.toon-sticker.is-unlocked').forEach((el) => {
      if (el.dataset.sticker) unlocked.add(el.dataset.sticker);
    });
    const countEl = document.getElementById('stickerCount');

    function unlockSticker(id) {
      if (!id || unlocked.has(id)) return;
      unlocked.add(id);
      document.querySelector(`.toon-sticker[data-sticker="${id}"]`)?.classList.add('is-unlocked');
      if (countEl) countEl.textContent = `${unlocked.size}/4`;
      grantGameXp(GAME_XP.sticker, `sticker-${id}`);
      if (unlocked.size >= 4) grantGameXp(GAME_XP.allStickers, 'stickers-all');
      sayBuddy(unlocked.size >= 4 ? 'allStickers' : 'sticker');
      tryCompleteMission1();
    }

    document.querySelectorAll('.edu-flip-card').forEach((card) => {
      const front = card.querySelector('.edu-flip-front');
      const close = card.querySelector('.edu-flip-close');

      function flipOpen() {
        const stickerId = card.dataset.sticker;
        const imageSrc = FLIP_CARD_IMAGES[stickerId];
        const cardTitle = front?.getAttribute('aria-label')?.split(' — ')[0]
          || front?.querySelector('.edu-flip-cover')?.alt?.replace(/^Capa — bullying /i, '').trim()
          || stickerId;

        if (imageSrc && typeof globalThis.openFlipCardImage === 'function') {
          unlockSticker(stickerId);
          globalThis.openFlipCardImage(imageSrc, cardTitle);
          return;
        }

        card.classList.add('is-flipped');
        front?.setAttribute('aria-expanded', 'true');
        unlockSticker(stickerId);
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      function flipClose(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        card.classList.remove('is-flipped');
        front?.setAttribute('aria-expanded', 'false');
        front?.focus();
      }

      front?.addEventListener('click', flipOpen);

      front?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flipOpen();
        }
      });

      close?.addEventListener('click', flipClose);

      close?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          flipClose(e);
        }
      });
    });

    globalThis.bindLazyFlipCovers?.(document.getElementById('eduFlipTypes') || document);
  }

  function addMissionDoneLabel(el) {
    if (el.querySelector('.game-mission-done-label')) return;
    const label = document.createElement('span');
    label.className = 'game-mission-done-label';
    label.textContent = '✓ Concluída';
    el.appendChild(label);
  }

  function applyMissionDoneVisuals(num) {
    if (!isMissionDone(num)) return;

    document.querySelectorAll(`.toon-quest-item[data-quest="${num}"]`).forEach((el) => {
      el.classList.add('is-done');
      el.classList.remove('is-active', 'is-locked');
      el.removeAttribute('aria-disabled');
      el.setAttribute('aria-label', `Missão ${num} concluída`);
      addMissionDoneLabel(el);
    });

    document.querySelectorAll(`.edu-module-mission-btn[data-module="${num}"]`).forEach((el) => {
      el.classList.add('is-done');
      el.classList.remove('is-locked');
      addMissionDoneLabel(el);
      if (el.tagName === 'A') {
        el.removeAttribute('aria-disabled');
        el.removeAttribute('tabindex');
      }
    });

    const lines = document.querySelectorAll('.toon-quest-line');
    if (lines[num - 1]) lines[num - 1].classList.add('is-done');
  }

  function markQuest(num, opts = {}) {
    if (num > 1 && !isMissionDone(num - 1)) return;
    if (isMissionDone(num)) return;

    if (num === 1 && !canCompleteMission1()) return;
    if (num === 3 && !canCompleteMission3()) return;

    const rewardId = `quest-${num}`;
    const xpAlready = gameClaimedSet.has(rewardId);

    if (!xpAlready && !opts.skipXp) {
      grantGameXp(GAME_XP.quest, rewardId);
    }

    if (!isMissionDone(num)) return;

    applyMissionDoneVisuals(num);
    celebrateMissionComplete();

    if (!xpAlready && !opts.skipXp) {
      burstLevelUpBadge();
    }

    updateMissionLocks();
  }

  function initQuestMap() {
    const modules = [
      { id: 'modulo-1', quest: 1, msg: 'mod1' },
      { id: 'modulo-2', quest: 2, msg: 'mod2' },
      { id: 'modulo-3', quest: 3, msg: 'mod3' },
    ];
    if (!('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const mod = modules.find((m) => m.id === e.target.id);
        if (!mod) return;
        if (!isMissionUnlocked(mod.quest)) return;
        const questEl = document.querySelector(`.toon-quest-item[data-quest="${mod.quest}"]`);
        if (isMissionDone(mod.quest)) return;
        document.querySelectorAll('.toon-quest-item').forEach((q) => q.classList.remove('is-active'));
        questEl?.classList.add('is-active');
        sayBuddy(mod.msg);
      });
    }, { threshold: 0.35 });

    modules.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) obs.observe(el);
    });

  }

  window.juEduOnMission2Complete = function juEduOnMission2Complete() {
    if (!isMissionDone(2)) markQuest(2);
  };

  window.juEduGrantCheck = function juEduGrantCheck(index) {
    grantGameXp(GAME_XP.check, `check-${index}`);
    if (index === 0) sayBuddy('check');
    if (countChecksDone() >= 3 && isMissionDone(2) && canCompleteMission3()) {
      markQuest(3);
    }
  };

  window.juEduGetCheckIndices = function juEduGetCheckIndices() {
    const indices = [];
    gameClaimedSet.forEach((id) => {
      const match = id.match(/^check-(\d+)$/);
      if (match) indices.push(Number(match[1]));
    });
    return indices;
  };

  /* ----- Buddy toggle ----- */
  function initBuddy() {
    const toggle = document.getElementById('toonBuddyToggle');
    const bubble = document.getElementById('toonBubble');
    toggle?.addEventListener('click', () => {
      const hidden = bubble?.classList.toggle('is-hidden');
      toggle.setAttribute('aria-expanded', hidden ? 'false' : 'true');
    });
  }

  /* ----- Checklist ----- */
  function initChecklist() {
    const checklist = document.getElementById('eduChecklist');
    const msgEl = document.getElementById('checkMsg');
    const textEl = document.getElementById('checkText');
    const starsEl = document.getElementById('checkStars');
    if (!checklist || !msgEl) return;

    const messages = [
      'Isso que você está sentindo é real. Você merece ajuda.',
      'Você não está exagerando. O que acontece com você importa.',
      'Pedir apoio não é fraqueza — é coragem. Tem gente pronta para te ouvir.',
      'Ninguém deveria passar por isso sozinho(a). Você tem direito a um ambiente seguro.',
    ];

    const items = checklist.querySelectorAll('.edu-check-item input');

    items.forEach((input, index) => {
      input.addEventListener('change', () => {
        const checked = checklist.querySelectorAll('.edu-check-item input:checked');
        if (input.checked) grantGameXp(GAME_XP.check, `check-${index}`);

        if (checked.length > 0) {
          const msg = messages[Math.min(checked.length - 1, messages.length - 1)];
          if (textEl) textEl.textContent = msg;
          if (starsEl) {
            const filled = '★'.repeat(Math.min(checked.length, 5));
            const empty = '☆'.repeat(Math.max(0, 5 - checked.length));
            starsEl.textContent = filled + empty;
          }
          msgEl.classList.add('is-visible');
          msgEl.setAttribute('aria-live', 'polite');
          if (checked.length === 1) sayBuddy('check');
          if (checked.length >= 3 && isMissionDone(2) && canCompleteMission3()) markQuest(3);
        } else {
          msgEl.classList.remove('is-visible');
        }
      });
    });
  }

  /* ----- Accordion ----- */
  function initAccordion() {
    document.querySelectorAll('.edu-acc-trigger').forEach((trigger) => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (!panel) return;

      trigger.addEventListener('click', () => {
        const open = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.classList.toggle('is-open', !open);
      });
    });
  }

  function initPageScrollReset() {
    if (!document.body.classList.contains('page-educativo--game')) return;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const resetScroll = () => {
      if (document.body.classList.contains('page-alunos-completo')
        && document.body.classList.contains('alunos-phase-selector')) {
        return;
      }
      if (window.location.hash) {
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    resetScroll();
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) resetScroll();
    });
  }

  /* ----- Scroll reveal ----- */
  function initReveal() {
    const els = document.querySelectorAll('.edu-module-shell, .edu-soon');
    if (!els.length) return;

    if (document.body.classList.contains('page-educativo--game')
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => obs.observe(el));
  }

  /* ----- Init ----- */
  document.addEventListener('DOMContentLoaded', () => {
    initPageScrollReset();
    preloadJuExpressions();
    initGameXp();
    initTabs();
    initQuiz();
    initFlipCards();
    initChecklist();
    initAccordion();
    initReveal();
    initQuestMap();
    initMissionLocks();
    initBuddy();
    sayBuddy('default');
    setJuFrame(document.getElementById('buddyAvatar'), 'intro');
  });
})();
