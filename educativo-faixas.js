(function () {
  'use strict';

  const root = document.getElementById('eduFaixas');
  if (!root) return;

  const kidsQ = [
    {
      emoji: '😢',
      text: 'João empurra Pedro todo dia na escola. Isso é bullying?',
      visualTip: '💡 Pensa: acontece sempre ou só uma vez?',
      isBullying: true,
      feedbackRight: 'Sim! Machucar alguém de propósito, várias vezes, é bullying! Você acertou! 💪',
      feedbackTry: 'Na verdade é sim bullying! Quando alguém machuca de propósito todo dia, é errado. 🤍',
    },
    {
      emoji: '🤔',
      text: 'Ana ficou brava com Maria por um dia. É bullying?',
      visualTip: '💡 Dica: todo mundo briga às vezes!',
      isBullying: false,
      feedbackRight: 'Isso mesmo! Brigar uma vez é normal. Bullying é quando acontece sempre! ⭐',
      feedbackTry: 'Não é bullying! Ficar brava um dia é normal entre amigas. Bullying repete sempre! 🤍',
    },
    {
      emoji: '📱',
      text: 'Alguém postou fotos feias de Lucas na internet para humilhá-lo. É bullying?',
      visualTip: '💡 Na internet também pode acontecer bullying!',
      isBullying: true,
      feedbackRight: 'Sim! Bullying na internet chama cyberbullying e é muito sério! 🚀',
      feedbackTry: 'É sim! Usar a internet para machucar alguém também é bullying! 🤍',
    },
    {
      emoji: '😞',
      text: 'Sofia não foi convidada para a festa de propósito toda semana. É bullying?',
      visualTip: '💡 Pensa: é de propósito e acontece sempre?',
      isBullying: true,
      feedbackRight: 'Sim! Excluir alguém de propósito toda semana é bullying social! 💜',
      feedbackTry: 'É sim! Deixar alguém de fora de propósito, toda semana, é bullying! 🤍',
    },
  ];

  const fullQ = [
    {
      text: 'Na fila do refeitório, Gustavo empurra Mateus toda semana e faz ele cair de propósito na frente dos colegas.',
      contextTip: '💡 Repara: acontece toda semana e é de propósito.',
      isBullying: true,
      feedbackRight: 'Certíssimo! Violência física repetida é bullying. O Mateus merece um ambiente seguro! 💪',
      feedbackTry: 'É sim bullying! Ações repetidas e de propósito sempre caracterizam bullying.',
      explanation: 'Isso é bullying físico. Quando alguém machuca de propósito e fica repetindo, é bullying — mesmo que pareça "brincadeira".',
    },
    {
      text: 'Lara e Beatriz brigaram porque a Lara contou um segredo. Elas ficaram sem falar por três dias.',
      contextTip: '💡 Repara: foi uma briga pontual entre amigas.',
      isBullying: false,
      feedbackRight: 'Exato! Brigas pontuais fazem parte das relações. Não é bullying.',
      feedbackTry: 'Não é bullying! Conflitos acontecem. Bullying precisa ser repetido e com intenção de machucar.',
      explanation: 'Isso é um conflito normal entre colegas. Bullying precisa ser intencional, repetido e com desequilíbrio de poder.',
    },
    {
      text: 'Um grupo do 7º ano criou uma conta falsa no Instagram com fotos da Camila com legendas ofensivas.',
      contextTip: '💡 Isso acontece nas redes sociais — bullying digital.',
      isBullying: true,
      feedbackRight: 'Correto! Criar perfis falsos para humilhar é cyberbullying e é crime! 🔍',
      feedbackTry: 'É sim! Na internet também existe bullying — e a lei brasileira pune quem pratica!',
      explanation: 'Isso é cyberbullying — bullying que acontece pela internet. É crime previsto na Lei nº 14.811/2024 e pode ter punição legal.',
    },
    {
      text: 'A turma do 6º ano combinou de ignorar Felipe em todas as aulas e nunca chamar ele nos trabalhos em grupo.',
      contextTip: '💡 Repara: é combinado, intencional e repetido.',
      isBullying: true,
      feedbackRight: 'Muito bem! Excluir alguém de propósito é violência — mesmo sem toque físico. 💜',
      feedbackTry: 'É sim bullying! A exclusão intencional e repetida é uma forma grave de violência social.',
      explanation: 'Isso é bullying social ou relacional. Exclusão intencional deixa marcas emocionais profundas — mesmo sem toque físico.',
    },
    {
      text: 'Rafael chamou Daniela de apelido feio uma vez no recreio. Ela pediu pra parar, ele pediu desculpa e não repetiu.',
      contextTip: '💡 Repara: aconteceu uma só vez e foi resolvido.',
      isBullying: false,
      feedbackRight: 'Certo! Respeito e reconhecimento do erro não configuram bullying.',
      feedbackTry: 'Não é bullying aqui! Ele respeitou o pedido e não repetiu — isso é diferente de bullying.',
      explanation: 'Não é bullying neste caso. Quando alguém respeita o pedido para parar, não caracteriza bullying. A resolução importa!',
    },
    {
      text: 'Toda semana na educação física, um grupo imita o jeito de correr de Rodrigo e todos riem. Ele chega em casa chorando.',
      contextTip: '💡 Repara: toda semana, em grupo, com intenção de humilhar.',
      isBullying: true,
      feedbackRight: 'Na mosca! Humilhação pública repetida é bullying verbal. O Rodrigo precisa de apoio! ⚖️',
      feedbackTry: 'É sim! Imitar para humilhar, toda semana, em grupo, é bullying verbal.',
      explanation: 'Bullying verbal em grupo. A humilhação pública repetida causa danos emocionais sérios e precisa ser reportada a um adulto.',
    },
    {
      text: 'A professora tirou 5 pontos do trabalho de Ana porque ela entregou um dia atrasado.',
      contextTip: '💡 Repara: a professora tem autoridade para avaliar alunos.',
      isBullying: false,
      feedbackRight: 'Correto! Consequências pedagógicas são diferentes de bullying.',
      feedbackTry: 'Não é bullying! Professores têm o papel de avaliar alunos — isso é diferente de perseguição.',
      explanation: 'Não é bullying! Professores têm autoridade pedagógica. Bullying acontece entre pessoas na mesma posição de poder — entre colegas.',
    },
    {
      text: 'Pedro e Kaio barram a saída do banheiro para Carlos toda semana e pedem o lanche dele ameaçando bater.',
      contextTip: '💡 Repara: toda semana, com ameaça física e intimidação.',
      isBullying: true,
      feedbackRight: 'Correto! Ameaça e extorsão são formas gravíssimas de bullying. Peça ajuda agora! 🚨',
      feedbackTry: 'É gravíssimo! Ameaça física + extorsão = bullying grave. Isso precisa ser reportado urgentemente!',
      explanation: 'Isso é bullying grave com intimidação e extorsão. Carlos precisa contar para um adulto de confiança imediatamente.',
    },
  ];

  const flipD = [
    {
      key: 'fisico',
      icon: '👊',
      title: 'Físico',
      className: 'fx-flip-card--fisico',
      coverImage: 'assets/CAPAFISICO.png',
      faixaImage: 'assets/5.png',
      exemplo: 'Empurrões, socos, chutes, roubo de objetos, danos a pertences.',
      sinais: ['Marcas no corpo, roupas rasgadas, medo do intervalo ou da escola.'],
      fazer: 'Afaste-se da situação. Conte para um professor, orientador ou familiar imediatamente.',
      legal: 'Lei nº 14.811/2024 prevê responsabilização',
    },
    {
      key: 'verbal',
      icon: '🗣️',
      title: 'Verbal',
      className: 'fx-flip-card--verbal',
      coverImage: 'assets/CAPAVERBAL.png',
      faixaImage: 'assets/6.png',
      exemplo: 'Apelidos ofensivos, xingamentos, ameaças, humilhação pública em sala.',
      sinais: ['Tristeza após intervalos, não quer ir à escola, isolamento, baixa autoestima.'],
      fazer: 'Não responda às provocações. Guarde registros (anotações de data/hora) e conte para um adulto.',
      legal: 'Pode gerar processo por injúria e calúnia',
    },
    {
      key: 'social',
      icon: '👥',
      title: 'Social',
      className: 'fx-flip-card--social',
      coverImage: 'assets/CAPASOCIAL.png',
      faixaImage: 'assets/7.png',
      exemplo: 'Exclusão proposital de grupos, espalhar mentiras para isolar, impedir amizades.',
      sinais: ['Sempre sozinho(a), sem amigos na escola, parece triste sem motivo aparente.'],
      fazer: 'Seja aliado(a): inclua, converse, chame para participar. Avise um adulto discretamente.',
      legal: 'Dano moral reconhecido pela justiça',
    },
    {
      key: 'cyber',
      icon: '📱',
      title: 'Cyberbullying',
      className: 'fx-flip-card--cyber',
      coverImage: 'assets/CAPACYBER.png',
      faixaImage: 'assets/6.png',
      exemplo: 'Posts humilhantes, perfil falso, mensagens de ódio, exposição de fotos sem permissão.',
      sinais: ['Ansiedade ao usar celular, evita redes sociais, chora após usar o celular.'],
      fazer: 'Não responda. Salve prints. Bloqueie. Conte para um adulto. Denuncie na plataforma.',
      legal: 'Crime previsto na Lei nº 14.811/2024 e Lei Carolina Dieckmann',
    },
  ];

  const kidsFinishMsgs = [
    'Mandou bem! Agora você sabe reconhecer quando algo machuca de verdade.',
    'Parabéns! Saber pedir ajuda é um superpoder — use quando precisar.',
  ];

  const fullFinishMsgs = [
    'Incrível! Vocês provaram que a justiça e o conhecimento andam juntos. Até a próxima investigação!',
    'Você terminou! Saber reconhecer bullying é um superpoder — use para se proteger e ajudar quem precisa.',
    'Mandou bem! Agora você entende melhor a diferença entre conflito e bullying. Isso te dá mais segurança para pedir ajuda.',
  ];

  const JU_ASSETS = {
    intro: 'assets/VIDEOSAUDACAOINICIAL.mp4?v=5',
    think: 'assets/ju-pergunta.png',
    learn: 'assets/ju-quase.png',
    correct: 'assets/ju-acertou.png?v=12',
    victory: 'assets/ju_fimdejogo.png',
  };

  const JU_LABELS = {
    intro: 'Olá!',
    think: 'Pensando…',
    learn: 'Quase lá!',
    correct: 'Acertou!',
    victory: 'Vitória!',
  };

  const JU_FRASES_RESPOSTA = {
    acertou: 'Isso mesmo, você mandou super bem!',
    errou: 'Quase! Não desiste, vamos aprender juntos!',
  };

  function bindActiveJu() {
    if (!globalThis.JU?.bind) return;
    const kidsActive = root.querySelector('[data-screen="kids"]')?.classList.contains('active');
    const medioActive = root.querySelector('[data-screen="medio"]')?.classList.contains('active');
    if (kidsActive) {
      JU.bind({
        img: $('kidsJu') || root.querySelector('.kids-ju'),
        bubble: $('kidsBubble'),
      });
    } else if (medioActive) {
      JU.bind({
        img: $('fullJu') || root.querySelector('#fxMedio .ju-img'),
        bubble: $('fullBubble'),
      });
    }
  }

  function falarRespostaJu(correct) {
    bindActiveJu();
    if (globalThis.JU?.unlock) JU.unlock();
    if (correct) {
      if (typeof juAcertou === 'function') juAcertou();
      else globalThis.JU?.acertou?.();
    } else {
      if (typeof juErrou === 'function') juErrou();
      else globalThis.JU?.errou?.();
    }
  }

  const SELECTOR_GREETING = 'Olá mentes brilhantes! Preparados para um desafio?';
  const screens = root.querySelectorAll('.fx-screen');
  const faixaBack = document.getElementById('fxFaixaBack');
  let flipBuiltGrids = new Set();
  let kidsInitialized = false;
  let fullInitialized = false;
  let kidsState = { current: 0, score: 0 };
  let fullState = { current: 0 };
  let kidsRender = () => {};
  let fullRender = () => {};

  function $(id) {
    return root.querySelector(`#${id}`) || document.getElementById(id);
  }

  function setFaixaBackVisible(visible) {
    if (faixaBack) faixaBack.hidden = !visible;
  }

  function showScreen(name) {
    screens.forEach((screen) => {
      const match = screen.dataset.screen === name
        || screen.id === `fx${name.charAt(0).toUpperCase()}${name.slice(1)}`
        || screen.id === `screen${name.charAt(0).toUpperCase()}${name.slice(1)}`
        || screen.classList.contains(`fx-screen--${name}`);
      screen.classList.toggle('active', match);
    });

    setFaixaBackVisible(name === 'kids' || name === 'medio');
    document.body.classList.toggle('edu-faixa-in-quiz', name === 'kids' || name === 'medio');
  }

  function setJuImg(imgEl, bubbleEl, mood) {
    if (!imgEl) return;
    const frame = JU_ASSETS[mood] ? mood : 'think';
    imgEl.src = JU_ASSETS[frame];
    imgEl.alt = `Ju — ${JU_LABELS[frame] || 'expressão'}`;
    if (bubbleEl) bubbleEl.textContent = JU_LABELS[frame] || '';
  }

  function fireConfetti() {
    const container = document.getElementById('fx-confetti') || root.querySelector('#fx-confetti');
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#00d4ff', '#ff2d9b', '#b45aff', '#ffd700', '#00ff88'];
    for (let i = 0; i < 55; i += 1) {
      const piece = document.createElement('span');
      piece.className = 'fx-confetti-piece';
      const size = 6 + Math.random() * 8;
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.width = `${size}px`;
      piece.style.height = `${size * 1.4}px`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = `${1.4 + Math.random() * 2}s`;
      piece.style.animationDelay = `${Math.random() * 0.6}s`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 3500);
    }
  }

  function enterTeenGame() {
    root.setAttribute('hidden', '');
    root.hidden = true;
    const teen = document.getElementById('eduTeenGame');
    if (teen) {
      teen.hidden = false;
      teen.removeAttribute('hidden');
      teen.classList.remove('hidden');
    }
    document.body.classList.remove('edu-faixa-active');
    document.body.classList.add('edu-faixa-teen');
    setFaixaBackVisible(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function enterFaixaMode() {
    if (document.body.classList.contains('edu-faixa-teen')) return;
    document.body.classList.add('edu-faixa-active');
    document.body.classList.remove('edu-faixa-in-quiz');
    showScreen('selector');
    initSelectorJu({ speak: false });
    bindSelectorAutoGreeting();
    window.requestAnimationFrame(() => {
      globalThis.JU?.saudacaoAbertura?.();
    });
  }

  function initSelectorJu(options = {}) {
    const speakNow = options.speak === true;
    const selectorJu = document.getElementById('selectorJu');
    const selectorBubble = document.getElementById('selectorBubble');
    const selectorGreeting = SELECTOR_GREETING;
    if (!globalThis.JU || !selectorJu) return;

    JU.bind({ img: selectorJu, bubble: selectorBubble });

    if (selectorBubble) {
      selectorBubble.textContent = selectorGreeting;
    }

    const ouvirJu = () => {
      if (!globalThis.JU) return;
      JU.unlock();
      if (JU.olaSelector) {
        JU.olaSelector();
      } else {
        JU.ola();
      }
    };

    if (speakNow) {
      ouvirJu();
    }

    if (selectorJu.dataset.juVoiceBound === '1') return;
    selectorJu.dataset.juVoiceBound = '1';

    const ouvirJuKey = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      ouvirJu();
    };

    selectorJu.addEventListener('click', ouvirJu);
    selectorJu.addEventListener('keydown', ouvirJuKey);
    selectorBubble?.addEventListener('click', ouvirJu);
    selectorBubble?.addEventListener('keydown', ouvirJuKey);
  }

  function bindSelectorAutoGreeting() {
    if (window.__juSelectorAutoBound) return;
    window.__juSelectorAutoBound = true;
    /* Desbloqueio de áudio: ju-voice.js (unlockOnInteract) — sem listener duplicado aqui. */
  }

  function goBack() {
    showScreen('selector');
    root.hidden = false;
    root.removeAttribute('hidden');
    const teen = document.getElementById('eduTeenGame');
    if (teen) {
      teen.hidden = true;
      teen.setAttribute('hidden', '');
    }
    document.body.classList.add('edu-faixa-active');
    document.body.classList.remove('edu-faixa-teen');
    initSelectorJu({ speak: false });
    globalThis.JU?.saudacaoAbertura?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goMode(mode) {
    if (mode === 'teen') {
      if (globalThis.JU_VOZ) JU_VOZ.setFaixa('teen');
      else if (globalThis.JU?.setFaixa) JU.setFaixa('teen');
      enterTeenGame();
      return;
    }
    document.body.classList.add('edu-faixa-active');
    document.body.classList.remove('edu-faixa-teen');
    root.hidden = false;
    root.removeAttribute('hidden');

    if (mode === 'kids') {
      if (globalThis.JU_VOZ) JU_VOZ.setFaixa('kids');
      else if (globalThis.JU?.setFaixa) JU.setFaixa('kids');
      showScreen('kids');
      initKidsQuiz();
      buildFlipCards({ gridId: 'kidsFlipGrid', countId: 'kidsStickerCount' });
      return;
    }
    if (mode === 'medio') {
      if (globalThis.JU_VOZ) JU_VOZ.setFaixa('medio');
      else if (globalThis.JU?.setFaixa) JU.setFaixa('medio');
      showScreen('medio');
      initFullQuiz();
      buildFlipCards({ gridId: 'fxFlipGrid', countId: 'fxStickerCount' });
      globalThis.mountMedioAcolhimento?.();
      globalThis.initJuSintoVideos?.();
      return;
    }
  }

  function initKidsQuiz() {
    const juImg = $('kidsJu') || root.querySelector('.kids-ju');
    const juBubble = $('kidsBubble');

    if (kidsInitialized) {
      kidsState.current = 0;
      kidsState.score = 0;
      kidsRender();
      if (globalThis.JU) {
        JU.bind({ img: juImg, bubble: juBubble });
      }
      return;
    }
    kidsInitialized = true;

    const scenarioEl = $('kidsScenario');
    const tipEl = $('kidsVisualTip');
    const progEl = $('kidsProg');
    const progFill = $('kidsProgFill');
    const feedbackEl = $('kidsFeedback');
    const nextBtn = $('kidsNext');
    const finishEl = $('kidsFinish');
    const finishMsgEl = $('kidsFinishMsg');
    const starsEl = $('kidsStars');
    const restartBtn = $('kidsRestart');
    const actionsEl = $('kidsActions');
    const stageEl = $('kidsQuizStage') || root.querySelector('.fx-screen--kids .fx-quiz-stage');
    const headEl = root.querySelector('.fx-screen--kids .fx-quiz-head') || root.querySelector('#fxKids .fx-quiz-head');
    const progWrap = root.querySelector('.fx-screen--kids .fx-prog') || root.querySelector('#fxKids .fx-prog');
    const yesBtn = $('kidsYes');
    const noBtn = $('kidsNo');

    if (globalThis.JU) {
      JU.bind({ img: juImg, bubble: juBubble });
    }

    kidsRender = function kidsRender() {
      const item = kidsQ[kidsState.current];
      if (!item) return;

      if (scenarioEl) {
        scenarioEl.classList.toggle('fx-scenario--with-emoji', !!item.emoji);
        scenarioEl.innerHTML = item.emoji
          ? `<span class="fx-scenario-emoji" aria-hidden="true">${item.emoji}</span><span class="fx-scenario-text">${item.text}</span>`
          : item.text;
      }
      if (tipEl) {
        tipEl.textContent = item.visualTip || '';
        tipEl.classList.toggle('hidden', !item.visualTip);
      }
      if (progEl) progEl.textContent = `${kidsState.current + 1} de ${kidsQ.length}`;
      if (progFill) progFill.style.width = `${((kidsState.current + 1) / kidsQ.length) * 100}%`;
      if (feedbackEl) {
        feedbackEl.innerHTML = '';
        feedbackEl.classList.add('hidden');
        feedbackEl.classList.remove('is-wrong');
      }
      if (nextBtn) nextBtn.classList.add('hidden');
      if (actionsEl) actionsEl.classList.remove('hidden');
      if (finishEl) finishEl.classList.add('hidden');
      if (stageEl) stageEl.classList.remove('hidden');
      if (headEl) headEl.classList.remove('hidden');
      if (progWrap) progWrap.classList.remove('hidden');
      setJuImg(juImg, juBubble, 'think');
    };

    function kidsAnswer(choice) {
      const item = kidsQ[kidsState.current];
      const correct = choice === item.isBullying;
      if (correct) kidsState.score += 1;

      if (feedbackEl) {
        feedbackEl.innerHTML = correct ? item.feedbackRight : item.feedbackTry;
        feedbackEl.classList.remove('hidden');
        feedbackEl.classList.toggle('is-wrong', !correct);
      }
      if (actionsEl) actionsEl.classList.add('hidden');
      if (nextBtn) {
        nextBtn.classList.remove('hidden');
        nextBtn.textContent = kidsState.current >= kidsQ.length - 1 ? 'Finalizar ✓' : 'Próximo! →';
      }

      falarRespostaJu(correct);
    }

    function kidsNext() {
      kidsState.current += 1;
      if (kidsState.current >= kidsQ.length) {
        kidsShowFinish();
      } else {
        kidsRender();
      }
    }

    function kidsShowFinish() {
      if (stageEl) stageEl.classList.add('hidden');
      if (headEl) headEl.classList.add('hidden');
      if (progWrap) progWrap.classList.add('hidden');
      if (scenarioEl) scenarioEl.textContent = '';
      if (tipEl) {
        tipEl.textContent = '';
        tipEl.classList.add('hidden');
      }
      if (feedbackEl) feedbackEl.classList.add('hidden');
      if (nextBtn) nextBtn.classList.add('hidden');
      if (finishEl) finishEl.classList.remove('hidden');
      const finishMsg = kidsFinishMsgs[Math.floor(Math.random() * kidsFinishMsgs.length)];
      if (finishMsgEl) finishMsgEl.textContent = finishMsg;
      if (starsEl) {
        const stars = kidsQ.map((_, i) => (i < kidsState.score ? '⭐' : '☆')).join('');
        starsEl.textContent = stars;
        starsEl.setAttribute('aria-label', `${kidsState.score} de ${kidsQ.length} estrelas`);
      }
      if (globalThis.JU) {
        JU.unlock();
        if (juImg) juImg.src = JU_ASSETS.victory;
        if (typeof juParabens === 'function') juParabens();
        else if (globalThis.JU?.parabens) JU.parabens();
        else JU.falar(finishMsg);
      } else {
        setJuImg(juImg, juBubble, 'victory');
      }
      fireConfetti();
    }

    function kidsRestart() {
      kidsState.current = 0;
      kidsState.score = 0;
      kidsRender();
    }

    yesBtn?.addEventListener('click', () => kidsAnswer(true));
    noBtn?.addEventListener('click', () => kidsAnswer(false));
    nextBtn?.addEventListener('click', kidsNext);
    restartBtn?.addEventListener('click', kidsRestart);

    kidsRender();
    if (globalThis.JU) {
      JU.bind({ img: juImg, bubble: juBubble });
    }
  }

  function initFullQuiz() {
    if (fullInitialized) {
      fullState.current = 0;
      fullRender();
      bindActiveJu();
      return;
    }
    fullInitialized = true;

    const scenarioEl = $('fullScenario');
    const contextEl = $('fullContextTip');
    const progEl = $('fullProg');
    const progFill = $('fullProgFill');
    const feedbackEl = $('fullFeedback');
    const nextBtn = $('fullNext');
    const finishEl = $('fullFinish');
    const finishMsgEl = $('fullFinishMsg');
    const restartBtn = $('fullRestart');
    const actionsEl = $('fullActions');
    const stageEl = $('fullQuizStage') || root.querySelector('.fx-screen--medio .fx-quiz-stage');
    const headEl = root.querySelector('.fx-screen--medio .fx-quiz-head') || root.querySelector('#fxMedio .fx-quiz-head');
    const progWrap = root.querySelector('.fx-screen--medio .fx-prog') || root.querySelector('#fxMedio .fx-prog');
    const yesBtn = $('fullYes');
    const noBtn = $('fullNo');
    const juImg = $('fullJu') || root.querySelector('#fxMedio .ju-img');
    const juBubble = $('fullBubble');

    if (globalThis.JU) {
      JU.bind({ img: juImg, bubble: juBubble });
    }

    fullState.current = 0;

    fullRender = function fullRender() {
      const item = fullQ[fullState.current];
      if (!item) return;

      if (scenarioEl) scenarioEl.textContent = item.text;
      if (contextEl) {
        contextEl.textContent = item.contextTip || '';
        contextEl.classList.toggle('hidden', !item.contextTip);
      }
      if (progEl) progEl.textContent = `${fullState.current + 1} de ${fullQ.length}`;
      if (progFill) progFill.style.width = `${((fullState.current + 1) / fullQ.length) * 100}%`;
      if (feedbackEl) {
        feedbackEl.innerHTML = '';
        feedbackEl.classList.add('hidden');
        feedbackEl.classList.remove('is-wrong');
      }
      if (nextBtn) nextBtn.classList.add('hidden');
      if (actionsEl) actionsEl.classList.remove('hidden');
      if (finishEl) finishEl.classList.add('hidden');
      if (stageEl) stageEl.classList.remove('hidden');
      if (headEl) headEl.classList.remove('hidden');
      if (progWrap) progWrap.classList.remove('hidden');
      setJuImg(juImg, juBubble, 'think');
    };

    function fullAnswer(choice) {
      const item = fullQ[fullState.current];
      const correct = choice === item.isBullying;

      if (feedbackEl) {
        const headline = correct ? '✅ Correto!' : '🤔 Não exatamente!';
        const short = correct ? item.feedbackRight : item.feedbackTry;
        const detail = item.explanation || item.feedback || '';
        feedbackEl.innerHTML = [
          `<p><strong>${headline}</strong> ${short || ''}</p>`,
          detail ? `<p>${detail}</p>` : '',
        ].join('');
        feedbackEl.classList.remove('hidden');
        feedbackEl.classList.toggle('is-wrong', !correct);
      }
      if (actionsEl) actionsEl.classList.add('hidden');
      if (nextBtn) {
        nextBtn.classList.remove('hidden');
        nextBtn.textContent = fullState.current >= fullQ.length - 1 ? 'Finalizar quiz ✓' : 'Próximo! →';
      }

      falarRespostaJu(correct);
    }

    function fullNext() {
      fullState.current += 1;
      if (fullState.current >= fullQ.length) {
        fullShowFinish();
      } else {
        fullRender();
      }
    }

    function fullShowFinish() {
      if (stageEl) stageEl.classList.add('hidden');
      if (headEl) headEl.classList.add('hidden');
      if (progWrap) progWrap.classList.add('hidden');
      if (scenarioEl) scenarioEl.textContent = '';
      if (contextEl) {
        contextEl.textContent = '';
        contextEl.classList.add('hidden');
      }
      if (feedbackEl) feedbackEl.classList.add('hidden');
      if (nextBtn) nextBtn.classList.add('hidden');
      if (finishEl) finishEl.classList.remove('hidden');
      if (finishMsgEl) {
        finishMsgEl.textContent = fullFinishMsgs[Math.floor(Math.random() * fullFinishMsgs.length)];
      }
      setJuImg(juImg, juBubble, 'victory');
      if (globalThis.JU?.unlock) JU.unlock();
      if (typeof juParabens === 'function') juParabens();
      else if (globalThis.JU?.parabens) JU.parabens();
      fireConfetti();
    }

    function fullRestart() {
      fullState.current = 0;
      fullRender();
    }

    yesBtn?.addEventListener('click', () => fullAnswer(true));
    noBtn?.addEventListener('click', () => fullAnswer(false));
    nextBtn?.addEventListener('click', fullNext);
    restartBtn?.addEventListener('click', fullRestart);

    fullRender();
  }

  function unlockSticker(key, sectionEl, countId) {
    const sticker = sectionEl.querySelector(`.fx-sticker[data-sticker="${key}"]`);
    if (sticker) sticker.classList.add('is-unlocked');
    const unlocked = sectionEl.querySelectorAll('.fx-sticker.is-unlocked').length;
    const countEl = $(countId);
    if (countEl) countEl.textContent = `${unlocked}/4`;
    if (unlocked >= 4) fireConfetti();
  }

  let kidsFlipImageModalBound = false;

  function closeKidsFlipImage() {
    const modal = document.getElementById('fxKidsImageModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('hidden', '');
    document.body.classList.remove('fx-kids-image-open');
  }

  function ensureKidsFlipImageModal() {
    if (document.getElementById('fxKidsImageModal')) return;

    const modal = document.createElement('div');
    modal.id = 'fxKidsImageModal';
    modal.className = 'fx-kids-image-modal hidden';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="fx-kids-image-backdrop" data-close-modal tabindex="-1"></div>
      <div class="fx-kids-image-dialog" role="dialog" aria-modal="true" aria-label="Bullying físico">
        <button type="button" class="fx-kids-image-close" aria-label="Fechar">✕</button>
        <div class="fx-kids-image-scroll">
          <img class="fx-kids-image-view" src="" alt="">
        </div>
      </div>`;
    document.body.appendChild(modal);

    if (kidsFlipImageModalBound) return;
    kidsFlipImageModalBound = true;

    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-close-modal]') || e.target.closest('.fx-kids-image-close')) {
        closeKidsFlipImage();
      }
    });

    document.addEventListener('keydown', (e) => {
      const openModal = document.getElementById('fxKidsImageModal');
      if (e.key === 'Escape' && openModal && !openModal.classList.contains('hidden')) {
        closeKidsFlipImage();
      }
    });
  }

  function openKidsFlipImage(src, title) {
    ensureKidsFlipImageModal();
    const modal = document.getElementById('fxKidsImageModal');
    if (!modal) return;

    const img = modal.querySelector('.fx-kids-image-view');
    const dialog = modal.querySelector('.fx-kids-image-dialog');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    modal.classList.toggle('fx-kids-image-modal--mobile', isMobile);

    if (img) {
      img.src = src;
      img.alt = title
        ? `Ilustração educativa sobre bullying ${title.toLowerCase()}`
        : 'Ilustração educativa sobre tipos de bullying';
    }
    if (dialog) {
      dialog.setAttribute('aria-label', title
        ? `Detalhes sobre bullying ${title.toLowerCase()}`
        : 'Ilustração educativa');
    }

    modal.classList.remove('hidden');
    modal.removeAttribute('hidden');
    document.body.classList.add('fx-kids-image-open');
    modal.querySelector('.fx-kids-image-close')?.focus();

    requestAnimationFrame(() => {
      modal.querySelector('.fx-kids-image-scroll')?.scrollTo(0, 0);
    });
  }

  function buildFlipCards(options = {}) {
    const gridId = options.gridId || 'fxFlipGrid';
    const countId = options.countId || 'fxStickerCount';
    if (flipBuiltGrids.has(gridId)) return;
    const grid = $(gridId);
    if (!grid) return;
    flipBuiltGrids.add(gridId);

    const section = grid.closest('.fx-screen') || root;

    flipD.forEach((d) => {
      const card = document.createElement('div');
      card.className = `fx-flip-card ${d.className}`;
      card.dataset.sticker = d.key;
      card.innerHTML = `
        <div class="fx-flip-inner">
          <div class="fx-flip-front fx-flip-front--cover" tabindex="0" role="button" aria-expanded="false" aria-label="${d.title} — toque para ver detalhes">
            <img class="fx-flip-cover" src="${d.coverImage}" alt="Capa — bullying ${d.title}" loading="lazy" decoding="async">
            <p class="fx-flip-hint fx-flip-hint--cover">Toque para saber mais</p>
          </div>
          <div class="fx-flip-back">
            <h4>Exemplo</h4>
            <p>${d.exemplo}</p>
            <h4>Sinais de alerta</h4>
            <ul>${d.sinais.map((s) => `<li>${s}</li>`).join('')}</ul>
            <h4>O que fazer</h4>
            <p>${d.fazer}</p>
            <h4>Referência legal</h4>
            <p>${d.legal}</p>
            <div class="fx-flip-close" role="button" tabindex="0">← Voltar</div>
          </div>
        </div>`;

      const front = card.querySelector('.fx-flip-front');
      const close = card.querySelector('.fx-flip-close');

      function openCard() {
        unlockSticker(d.key, section, countId);
        if (d.faixaImage) {
          openKidsFlipImage(d.faixaImage, d.title);
          return;
        }
        card.classList.add('is-flipped');
        front?.setAttribute('aria-expanded', 'true');
      }

      function closeCard() {
        card.classList.remove('is-flipped');
        front?.setAttribute('aria-expanded', 'false');
        front?.focus();
      }

      front?.addEventListener('click', openCard);
      front?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCard();
        }
      });
      close?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCard();
      });
      close?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          closeCard();
        }
      });

      grid.appendChild(card);
    });
  }

  const SINTO_VIDEO_SRC = 'assets/SINTOMUITO.mp4?v=2';

  function isSintoVideo(video) {
    return Boolean(video && video.classList.contains('ju-sinto-video'));
  }

  function pauseSintoVideo(video) {
    if (!isSintoVideo(video)) return;
    try { video.pause(); } catch (_) { /* ignore */ }
    video.autoplay = false;
    video.removeAttribute('autoplay');
  }

  function playSintoVideoOnClick(video) {
    if (!isSintoVideo(video)) return;
    if (globalThis.JU?.unlock) globalThis.JU.unlock();

    video.autoplay = false;
    video.loop = false;
    video.muted = false;
    video.controls = false;

    if (video.ended) {
      try { video.currentTime = 0; } catch (_) { /* ignore */ }
    }

    const wrap = video.closest('.fx-kids-sinto-block, .missao-hero-figure');

    if (!video.paused && !video.ended) {
      video.pause();
      video.classList.remove('is-playing');
      wrap?.classList.remove('is-playing');
      return;
    }

    video.classList.add('is-playing');
    wrap?.classList.add('is-playing');
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {
        video.classList.remove('is-playing');
        wrap?.classList.remove('is-playing');
      });
    });

    video.addEventListener('ended', () => {
      video.classList.remove('is-playing');
      wrap?.classList.remove('is-playing');
    }, { once: true });
  }

  function initSintoVideosClickToPlay() {
    document.querySelectorAll('video.ju-sinto-video').forEach((video) => {
      if (video.dataset.sintoClickBound === '1') return;
      video.dataset.sintoClickBound = '1';

      if (!video.getAttribute('src')) {
        video.src = SINTO_VIDEO_SRC;
      }

      pauseSintoVideo(video);
      video.controls = false;
      video.removeAttribute('controls');
      video.preload = 'metadata';
      video.setAttribute('role', 'button');
      video.tabIndex = 0;
      video.title = '▶ Toque para assistir o vídeo';

      const onActivate = (event) => {
        event.preventDefault();
        event.stopPropagation();
        playSintoVideoOnClick(video);
      };

      video.addEventListener('click', onActivate);
      video.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        onActivate(event);
      });
    });
  }

  globalThis.initJuSintoVideos = initSintoVideosClickToPlay;

  function irParaModo(modo) {
    if (globalThis.JU?.unlock) JU.unlock();
    globalThis.JU?.stopSelectorIntro?.();
    goMode(modo);
    if (modo === 'kids' || modo === 'medio' || modo === 'teen') {
      const playFaixaEntrada = globalThis.JU?.faixaEntrada || globalThis.JU_VOZ?.faixaEntrada;
      if (playFaixaEntrada) playFaixaEntrada();
    }
    if (modo === 'kids' || modo === 'medio') {
      if (!globalThis.JU) return;
      JU.bind({
        img: modo === 'kids'
          ? ($('kidsJu') || root.querySelector('.kids-ju'))
          : ($('fullJu') || root.querySelector('#fxMedio .ju-img')),
        bubble: modo === 'kids' ? $('kidsBubble') : $('fullBubble'),
      });
    }
  }

  globalThis.irParaModo = irParaModo;

  root.addEventListener('click', (e) => {
    const modeBtn = e.target.closest('[data-fx-mode]');
    if (modeBtn) {
      irParaModo(modeBtn.dataset.fxMode);
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-fx-back]')) {
      if (globalThis.JU?.unlock) JU.unlock();
      goBack();
    }
  });

  globalThis.openFlipCardImage = openKidsFlipImage;

  initSintoVideosClickToPlay();
  initSelectorJu({ speak: false });
  bindSelectorAutoGreeting();

  /* Modo compacto só quando hero e faixas aparecem juntos na tela (evita Ju duplicada). */
  function syncFaixaCompactMode() {
    if (document.body.classList.contains('edu-faixa-in-quiz')
      || document.body.classList.contains('edu-faixa-teen')) {
      return;
    }
    const hero = document.getElementById('heroIntroVideo');
    const faixas = document.getElementById('eduFaixas');
    if (!hero || !faixas) return;

    const heroRect = hero.getBoundingClientRect();
    const faixasRect = faixas.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;
    const heroOnScreen = heroRect.bottom > 0 && heroRect.top < vh * 0.85;
    const faixasOnScreen = faixasRect.top < vh * 0.92;

    if (heroOnScreen && faixasOnScreen) {
      if (!document.body.classList.contains('edu-faixa-active')) {
        document.body.classList.add('edu-faixa-active');
      }
    } else {
      document.body.classList.remove('edu-faixa-active');
    }
  }

  window.addEventListener('scroll', syncFaixaCompactMode, { passive: true });
  window.addEventListener('resize', syncFaixaCompactMode, { passive: true });
  window.requestAnimationFrame(syncFaixaCompactMode);
})();
