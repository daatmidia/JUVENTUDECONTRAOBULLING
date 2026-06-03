(function (global) {
  'use strict';

  const ASSETS = {
    ola: 'assets/VIDEOSAUDACAOINICIAL.mp4?v=5',
    think: 'assets/ju-pergunta.png',
    acertou: 'assets/ju-acertou.png?v=12',
    errou: 'assets/ju-quase.png',
    victory: 'assets/ju_fimdejogo.png',
  };

  const INTRO_VIDEO = {
    mp4: 'assets/VIDEOSAUDACAOINICIAL.mp4?v=5',
  };

  let selectorIntroLoopActive = false;

  function isJuVideo(el) {
    return Boolean(el && String(el.tagName).toUpperCase() === 'VIDEO');
  }

  function isElementVisible(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
    return el.getClientRects().length > 0;
  }

  function shouldPlaySaudacaoVideo() {
    return !document.body.classList.contains('edu-faixa-in-quiz')
      && !document.body.classList.contains('edu-faixa-teen');
  }

  function isFaixaSelectionEvent(event) {
    if (!event?.target) return false;
    return Boolean(event.target.closest('[data-fx-mode], [data-fx-back], .faixa-card'));
  }

  /** Vídeo visível na tela (o #selectorJu fica oculto com .edu-faixa-active). */
  function getActiveIntroVideo() {
    const hero = document.getElementById('heroIntroVideo');
    const selector = document.getElementById('selectorJu');
    if (isJuVideo(selector)) {
      const arena = selector.closest('.ju-arena--selector');
      if (isElementVisible(selector) && (!arena || isElementVisible(arena))) {
        return selector;
      }
    }
    if (isJuVideo(hero) && isElementVisible(hero)) return hero;
    return isJuVideo(selector) ? selector : hero;
  }

  function allIntroVideos() {
    return document.querySelectorAll('.ju-intro-video, #selectorJu, #heroIntroVideo');
  }

  function pauseOtherIntroVideos(active) {
    allIntroVideos().forEach((video) => {
      if (!isJuVideo(video) || video === active) return;
      try { video.pause(); } catch (_) { /* ignore */ }
      video.muted = true;
      video.loop = false;
    });
  }

  function pauseAllIntroVideos() {
    selectorIntroLoopActive = false;
    allIntroVideos().forEach((video) => {
      if (!isJuVideo(video)) return;
      try { video.pause(); } catch (_) { /* ignore */ }
      try { video.currentTime = 0; } catch (_) { /* ignore */ }
      video.loop = false;
      video.muted = true;
    });
  }

  function waitVideoEnd(video, timeoutMs = 90000) {
    return new Promise((resolve) => {
      if (!isJuVideo(video)) {
        resolve(false);
        return;
      }
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        video.removeEventListener('ended', onEnd);
        video.removeEventListener('error', onErr);
        resolve(ok);
      };
      const onEnd = () => finish(true);
      const onErr = () => finish(false);
      video.addEventListener('ended', onEnd);
      video.addEventListener('error', onErr);
      if (video.ended) {
        finish(true);
        return;
      }
      window.setTimeout(() => finish(false), timeoutMs);
    });
  }

  async function playIntroVideo(el, options = {}) {
    const { withSound = true, loop = false, resetTime = true } = options;
    if (!isJuVideo(el)) return false;
    if (withSound && muted) return false;

    unlock();
    pauseAllClips();

    el.loop = loop;
    if (resetTime) {
      try { el.currentTime = 0; } catch (_) { /* ignore */ }
    }

    if (withSound) {
      el.muted = false;
      try {
        await el.play();
        return true;
      } catch (_) {
        try { el.pause(); } catch (_) { /* ignore */ }
        return false;
      }
    }

    el.muted = true;
    try {
      await el.play();
      return true;
    } catch (_) {
      return false;
    }
  }

  function initIntroVideoLoops() {
    if (selectorIntroLoopActive || !shouldPlaySaudacaoVideo()) return;
    const active = getActiveIntroVideo();
    if (!isJuVideo(active)) return;
    pauseOtherIntroVideos(active);
    playIntroVideo(active, { withSound: false, loop: true, resetTime: false }).catch(() => {});
  }

  /** Autoplay ao abrir alunos.html — apenas áudio do vídeo (sem MP3 separado). */
  async function autoplaySaudacaoOnOpen() {
    if (muted || !shouldPlaySaudacaoVideo()) return false;
    const active = getActiveIntroVideo();
    if (!isJuVideo(active)) return false;

    unlock();
    pauseAllClips();
    global.JU_FALA?.parar?.();
    if (hasSpeech()) window.speechSynthesis.cancel();
    pauseOtherIntroVideos(active);

    active.loop = true;
    active.playsInline = true;

    const tryPlayWithSound = async () => {
      active.muted = false;
      try {
        await active.play();
        return true;
      } catch (_) {
        try { active.pause(); } catch (_) { /* ignore */ }
        return false;
      }
    };

    if (!active.paused && !active.ended && !active.muted) {
      selectorIntroLoopActive = true;
      saudacaoAberturaPlayed = true;
      return true;
    }

    for (let attempt = 0; attempt < 5; attempt += 1) {
      if (attempt > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, 120 * attempt));
      }
      if (await tryPlayWithSound()) {
        selectorIntroLoopActive = true;
        saudacaoAberturaPlayed = true;
        return true;
      }
    }

    active.muted = true;
    try {
      await active.play();
      selectorIntroLoopActive = true;
      return true;
    } catch (_) {
      return false;
    }
  }

  async function startSelectorIntroLoop() {
    if (!shouldPlaySaudacaoVideo()) return false;
    const active = getActiveIntroVideo();
    if (!isJuVideo(active)) return false;
    if (muted) return false;
    if (selectorIntroLoopActive && !active.paused && !active.ended) return true;

    unlock();
    pauseAllClips();
    global.JU_FALA?.parar?.();
    pauseOtherIntroVideos(active);

    const played = await playIntroVideo(active, { withSound: true, loop: true });
    if (played) {
      selectorIntroLoopActive = true;
      saudacaoAberturaPlayed = true;
    }
    return played;
  }

  function stopSelectorIntro() {
    selectorIntroLoopActive = false;
    pauseAllIntroVideos();
  }

  const FAIXA_ENTRADA_SRC = 'assets/teste_ate_5_6.mp3';

  const CLIPS = {
    acertou: 'assets/ju-acertou.mp3',
    errou: 'assets/ju-errou.mp3',
  };

  const blobUrlCache = new Map();

  function dataUriToBlobUrl(dataUri) {
    if (blobUrlCache.has(dataUri)) return blobUrlCache.get(dataUri);
    const [header, b64] = String(dataUri).split(',');
    const mimeMatch = header.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'audio/mpeg';
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    const url = URL.createObjectURL(new Blob([bytes], { type: mime }));
    blobUrlCache.set(dataUri, url);
    return url;
  }

  function makeClipPlayer(src) {
    if (!src) return null;
    const url = String(src).startsWith('data:') ? dataUriToBlobUrl(src) : assetUrl(src);
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.volume = 1;
    try { audio.load(); } catch (_) { /* ignore */ }
    return audio;
  }

  const PHRASES = {
    ola: 'Oi, eu sou a Ju! Vamos jogar juntos?',
    selector: 'Olá mentes brilhantes! Preparados para um desafio?',
    acertou: 'Isso mesmo, você mandou super bem!',
    errou: 'Quase! Não desiste, vamos aprender juntos!',
  };

  const TTS_CFG = global.JU_FALA?.CFG || { lang: 'pt-BR', pitch: 1.5, rate: 1.05, vol: 1 };

  let imgEl = null;
  let bubbleEl = null;
  let arenaEl = null;
  let speechUnlocked = false;
  let audioUnlocked = false;
  let voicesPromise = null;
  let activeUtterance = null;
  let activeClip = null;
  let muted = false;
  let faixaAtual = 'medio';

  function assetUrl(path) {
    try {
      return new URL(path, document.baseURI).href;
    } catch (_) {
      return path;
    }
  }

  const clipPlayers = {
    acertou: makeClipPlayer(CLIPS.acertou),
    errou: makeClipPlayer(CLIPS.errou),
  };

  const faixaEntradaPlayer = makeClipPlayer(FAIXA_ENTRADA_SRC);
  let saudacaoAberturaPlayed = false;

  function allClipPlayers() {
    return [faixaEntradaPlayer, ...Object.values(clipPlayers)].filter(Boolean);
  }

  function juTargets() {
    return document.querySelectorAll(
      '.ju-arena, .ju-kids, .ju-sel, #selectorJu, [data-ju-avatar], .game-start-mascot, .game-start-img, #kidsJu'
    );
  }

  function clipFxStart(fxType) {
    document.querySelectorAll('#waves-m, #waves-t, .ju-waves, .voice-waves').forEach((el) => {
      el.style.display = 'flex';
    });

    if (prefersReducedMotion()) return;

    juTargets().forEach((el) => {
      el.style.animation = 'none';
      void el.offsetWidth;
      if (fxType === 'acertou') {
        el.style.animation = 'jufloat 0.5s ease-in-out infinite';
        let t = 0;
        const fl = setInterval(() => {
          t += 1;
          el.style.filter = t % 2 === 0
            ? 'drop-shadow(0 0 22px #00ff88) brightness(1.3)'
            : 'drop-shadow(0 0 8px rgba(0,212,255,.5))';
          if (t > 6) { clearInterval(fl); el.style.filter = ''; }
        }, 110);
      } else if (fxType === 'errou') {
        el.style.animation = 'juShake 0.4s ease';
      } else {
        el.style.animation = 'jufloat 0.6s ease-in-out infinite';
      }
    });
  }

  function clipFxStop() {
    document.querySelectorAll('#waves-m, #waves-t, .ju-waves, .voice-waves').forEach((el) => {
      el.style.display = 'none';
    });
    juTargets().forEach((el) => {
      el.style.animation = '';
      el.style.filter = '';
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function bind(options = {}) {
    imgEl = options.img || document.getElementById('kidsJu');
    bubbleEl = options.bubble || document.getElementById('kidsBubble');
    arenaEl = options.arena || imgEl?.closest('.ju-arena') || null;
  }

  function hasSpeech() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  }

  function waitForVoices() {
    if (!hasSpeech()) return Promise.resolve([]);
    if (voicesPromise) return voicesPromise;

    voicesPromise = new Promise((resolve) => {
      const finish = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length) {
          resolve(voices);
          return true;
        }
        return false;
      };

      if (finish()) return;

      const onChange = () => {
        if (finish()) {
          window.speechSynthesis.removeEventListener('voiceschanged', onChange);
        }
      };

      window.speechSynthesis.addEventListener('voiceschanged', onChange);
      window.speechSynthesis.getVoices();

      setTimeout(() => {
        window.speechSynthesis.removeEventListener('voiceschanged', onChange);
        resolve(window.speechSynthesis.getVoices());
      }, 800);
    });

    return voicesPromise;
  }

  function pickPtVoice(voices) {
    return voices.find((v) => v.lang === 'pt-BR')
      || voices.find((v) => v.lang.startsWith('pt-BR'))
      || voices.find((v) => v.lang.startsWith('pt'))
      || null;
  }

  function clearClipListeners(audio) {
    if (!audio) return;
    audio.onplay = null;
    audio.onended = null;
    audio.onerror = null;
  }

  function pauseAllClips() {
    allClipPlayers().forEach((audio) => {
      if (!audio) return;
      clearClipListeners(audio);
      audio.pause();
      try { audio.currentTime = 0; } catch (_) { /* ignore */ }
    });
    activeClip = null;
    clipFxStop();
  }

  function stopClip() {
    if (!activeClip) return;
    activeClip.pause();
    try { activeClip.currentTime = 0; } catch (_) { /* ignore */ }
    clearClipListeners(activeClip);
    activeClip = null;
    clipFxStop();
  }

  function unlock() {
    speechUnlocked = true;
    audioUnlocked = true;

    if (hasSpeech()) {
      try {
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      } catch (_) {
        /* ignore */
      }
    }
  }

  function waitClipReady(audio, timeoutMs = 4000) {
    if (audio.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      return Promise.resolve(true);
    }

    return new Promise((resolve) => {
      const timer = window.setTimeout(() => resolve(false), timeoutMs);
      const done = (ok) => {
        window.clearTimeout(timer);
        audio.removeEventListener('canplaythrough', onReady);
        audio.removeEventListener('error', onError);
        resolve(ok);
      };
      const onReady = () => done(true);
      const onError = () => done(false);
      audio.addEventListener('canplaythrough', onReady, { once: true });
      audio.addEventListener('error', onError, { once: true });
      try { audio.load(); } catch (_) { /* ignore */ }
    });
  }

  function stop() {
    pauseAllClips();
    if (!hasSpeech()) return;
    activeUtterance = null;
    window.speechSynthesis.cancel();
  }

  async function speak(text) {
    const message = String(text || '').trim();
    if (muted || !message || !hasSpeech()) return Promise.resolve(false);
    if (!speechUnlocked) return Promise.resolve(false);

    pauseAllClips();

    const voices = await waitForVoices();
    const voice = pickPtVoice(voices);

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = TTS_CFG.lang || 'pt-BR';
      utterance.rate = TTS_CFG.rate ?? 1.05;
      utterance.pitch = TTS_CFG.pitch ?? 1.5;
      utterance.volume = TTS_CFG.vol ?? 1;
      if (voice) utterance.voice = voice;

      let settled = false;
      const done = (ok) => {
        if (settled) return;
        settled = true;
        if (activeUtterance === utterance) activeUtterance = null;
        resolve(ok);
      };

      utterance.onstart = () => {
        if (window.speechSynthesis.paused) {
          try { window.speechSynthesis.resume(); } catch (_) { /* ignore */ }
        }
      };

      utterance.onend = () => done(true);
      utterance.onerror = (event) => {
        if (event?.error === 'interrupted' || event?.error === 'canceled') {
          done(false);
          return;
        }
        done(false);
      };

      activeUtterance = utterance;

      try {
        window.speechSynthesis.resume();
      } catch (_) {
        /* ignore */
      }

      window.setTimeout(() => {
        try {
          window.speechSynthesis.speak(utterance);
        } catch (_) {
          done(false);
          return;
        }

        window.setTimeout(() => {
          if (settled) return;
          if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            try { window.speechSynthesis.resume(); } catch (_) { /* ignore */ }
            return;
          }
          done(false);
        }, 120);
      }, 40);
    });
  }

  async function playClip(typeOrAudio, fxType) {
    if (muted) return false;

    const audio = typeof typeOrAudio === 'string' ? clipPlayers[typeOrAudio] : typeOrAudio;
    const fx = fxType || (typeof typeOrAudio === 'string' ? typeOrAudio : 'ola');
    if (!audio) return false;

    allClipPlayers().forEach((clip) => {
      if (!clip || clip === audio) return;
      clip.pause();
      clearClipListeners(clip);
      try { clip.currentTime = 0; } catch (_) { /* ignore */ }
    });

    if (hasSpeech()) {
      activeUtterance = null;
      try { window.speechSynthesis.cancel(); } catch (_) { /* ignore */ }
    }

    clearClipListeners(audio);
    audio.pause();
    try { audio.currentTime = 0; } catch (_) { /* ignore */ }
    audio.muted = false;
    audio.volume = 1;
    activeClip = audio;

    await waitClipReady(audio);

    return new Promise((resolve) => {
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        clearClipListeners(audio);
        clipFxStop();
        if (activeClip === audio) activeClip = null;
        resolve(ok);
      };

      const isPlaying = () => !audio.paused && !audio.ended && audio.currentTime > 0;

      audio.onplay = () => {
        audioUnlocked = true;
        clipFxStart(fx);
      };
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false);

      const attemptPlay = () => audio.play().then(() => { audioUnlocked = true; });

      attemptPlay().catch(() => {
        attemptPlay().catch(() => {
          const retry = () => {
            attemptPlay().catch(() => finish(false));
          };
          document.addEventListener('pointerdown', retry, { once: true });
          document.addEventListener('keydown', retry, { once: true });

          window.setTimeout(() => {
            if (settled) return;
            if (isPlaying()) return;
            finish(false);
          }, 3000);
        });
      });
    });
  }

  function playAnim(type) {
    if (!imgEl || prefersReducedMotion()) return;

    imgEl.classList.remove('ju-anim-pop', 'ju-anim-shake', 'ju-anim-celebrate');
    arenaEl?.classList.remove('ju-arena--celebrate', 'ju-arena--shake');

    void imgEl.offsetWidth;

    if (type === 'acertou') {
      imgEl.classList.add('ju-anim-celebrate');
      arenaEl?.classList.add('ju-arena--celebrate');
    } else if (type === 'errou') {
      imgEl.classList.add('ju-anim-shake');
      arenaEl?.classList.add('ju-arena--shake');
    } else {
      imgEl.classList.add('ju-anim-pop');
    }

    if (bubbleEl) {
      bubbleEl.classList.remove('ju-bubble-pop');
      void bubbleEl.offsetWidth;
      bubbleEl.classList.add('ju-bubble-pop');
    }
  }

  function setVisual(assetKey, bubbleText, animType) {
    if (imgEl && ASSETS[assetKey]) {
      if (assetKey === 'ola' && isJuVideo(imgEl)) {
        imgEl.setAttribute('aria-label', `Ju — ${bubbleText || assetKey}`);
        if (imgEl === getActiveIntroVideo() || imgEl.id === 'selectorJu' || imgEl.id === 'heroIntroVideo') {
          startSelectorIntroLoop().catch(() => {});
        } else {
          playIntroVideo(imgEl, { withSound: !muted, loop: false }).catch(() => {});
        }
      } else if (!isJuVideo(imgEl)) {
        imgEl.src = ASSETS[assetKey];
        imgEl.alt = `Ju — ${bubbleText || assetKey}`;
      }
    }
    if (bubbleEl && bubbleText) bubbleEl.textContent = bubbleText;
    playAnim(animType || assetKey);
  }

  async function saudacaoAbertura() {
    if (muted || !shouldPlaySaudacaoVideo()) return false;

    unlock();

    const selectorJu = document.getElementById('selectorJu');
    const selectorBubble = document.getElementById('selectorBubble');
    if (selectorJu) {
      bind({ img: selectorJu, bubble: selectorBubble });
    }

    const frase = PHRASES.selector || PHRASES.ola;
    updateSelectorBubble(frase);
    if (bubbleEl) bubbleEl.textContent = frase;

    global.JU_FALA?.parar?.();

    return autoplaySaudacaoOnOpen();
  }

  async function faixaEntrada() {
    if (muted) return false;

    unlock();
    global.JU_FALA?.parar?.();
    pauseAllIntroVideos();
    selectorIntroLoopActive = false;
    pauseAllClips();

    return playClip(faixaEntradaPlayer, 'ola');
  }

  async function ola() {
    unlock();
    global.JU_FALA?.parar?.();
    pauseAllClips();
    const frase = PHRASES.selector || PHRASES.ola;
    updateSelectorBubble(frase);
    if (bubbleEl) bubbleEl.textContent = frase;
    return autoplaySaudacaoOnOpen();
  }

  function updateSelectorBubble(text) {
    const message = String(text || '').trim();
    if (!message) return;
    const selectorBubble = document.getElementById('selectorBubble');
    if (!selectorBubble) return;
    if (!document.getElementById('screen-selector')?.classList.contains('active')
      && !document.querySelector('[data-screen="selector"]')?.classList.contains('active')
      && !document.querySelector('.fx-screen--selector')?.classList.contains('active')) {
      return;
    }
    selectorBubble.textContent = message;
    selectorBubble.style.animation = 'none';
    void selectorBubble.offsetWidth;
    selectorBubble.style.animation = 'bpop .35s cubic-bezier(.2,1.4,.4,1)';
  }

  async function olaSelector() {
    unlock();
    const frase = PHRASES.selector;
    updateSelectorBubble(frase);
    if (bubbleEl) bubbleEl.textContent = frase;
    global.JU_FALA?.parar?.();
    pauseAllClips();
    return autoplaySaudacaoOnOpen();
  }

  async function olaFaixa(faixa) {
    const f = faixa || faixaAtual || 'medio';
    if (f === 'selector') return olaSelector();
    return ola();
  }

  async function falarSom(tipo) {
    if (tipo === 'saudacao' || tipo === 'ola') return saudacaoAbertura();
    unlock();
    const fx = tipo;
    const frase = PHRASES[tipo] || PHRASES.ola;
    if (tipo === 'acertou' || tipo === 'errou') setVisual(tipo, frase, tipo);

    const played = await playClip(tipo, fx);
    if (played) return true;

    global.JU_FALA?.parar?.();
    if (global.JU_FALA?.[tipo]) {
      global.JU_FALA[tipo]();
      return true;
    }
    return speak(frase);
  }

  function parar() {
    stop();
    pauseAllIntroVideos();
    clipFxStop();
    global.JU_FALA?.parar?.();
  }

  function setFaixa(faixa) {
    faixaAtual = faixa || 'medio';
  }

  function alternarMudo() {
    muted = !muted;
    if (muted) {
      parar();
    } else if (document.querySelector('[data-screen="selector"]')?.classList.contains('active')) {
      startSelectorIntroLoop().catch(() => {});
    }
    ['ju-mudo-btn', 'ju-voz-btn', 'ju-voz-float', 'voz-btn'].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.textContent = muted ? '🔇' : '🔊';
    });
    const label = document.getElementById('ju-voz-label');
    if (label) label.textContent = muted ? 'Voz da Ju desligada' : 'Voz da Ju ligada';
  }

  async function acertou() {
    unlock();
    const frase = PHRASES.acertou;
    setVisual('acertou', frase, 'acertou');
    const played = await playClip('acertou');
    if (played) return true;
    global.JU_FALA?.parar?.();
    if (global.JU_FALA) {
      global.JU_FALA.acertou();
      return true;
    }
    return speak(frase);
  }

  async function errou() {
    unlock();
    const frase = PHRASES.errou;
    setVisual('errou', frase, 'errou');
    const played = await playClip('errou');
    if (played) return true;
    global.JU_FALA?.parar?.();
    if (global.JU_FALA) {
      global.JU_FALA.errou();
      return true;
    }
    return speak(frase);
  }

  function parabens() {
    unlock();
    setVisual('victory', global.JU_FALA?.FRASES?.parabens || 'Parabéns! Saber pedir ajuda é um superpoder!', 'acertou');
    if (global.JU_FALA) {
      global.JU_FALA.parabens();
      return Promise.resolve(true);
    }
    return speak(global.JU_FALA?.FRASES?.parabens || 'Parabéns! Saber pedir ajuda é um superpoder!');
  }

  function falar(text) {
    unlock();
    const message = String(text || '').trim();
    if (!message) return Promise.resolve(false);
    if (bubbleEl) bubbleEl.textContent = message;
    playAnim('think');
    return speak(message);
  }

  function initVoice() {
    waitForVoices();
    waitClipReady(faixaEntradaPlayer).catch(() => {});
    waitClipReady(clipPlayers.acertou).catch(() => {});
    waitClipReady(clipPlayers.errou).catch(() => {});
    allIntroVideos().forEach((video) => {
      if (isJuVideo(video)) {
        try { video.load(); } catch (_) { /* ignore */ }
        video.addEventListener('loadeddata', () => {
          if (!selectorIntroLoopActive && shouldPlaySaudacaoVideo() && document.getElementById('heroIntroVideo')) {
            autoplaySaudacaoOnOpen().catch(() => {});
          }
        }, { once: true });
      }
    });
    window.requestAnimationFrame(() => {
      if (document.getElementById('heroIntroVideo') || document.getElementById('selectorJu')) {
        saudacaoAbertura().catch(() => initIntroVideoLoops());
      } else {
        initIntroVideoLoops();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVoice, { once: true });
  } else {
    initVoice();
  }

  global.JU = {
    bind,
    unlock,
    stop,
    ola,
    olaSelector,
    olaFaixa,
    saudacaoAbertura,
    autoplaySaudacaoOnOpen,
    startSelectorIntroLoop,
    stopSelectorIntro,
    faixaEntrada,
    acertou,
    errou,
    parabens,
    falar,
    falarSom,
    parar,
    setFaixa,
    alternarMudo,
    init: initVoice,
  };

  global.JU_VOZ = {
    setFaixa,
    unlock,
    ola: olaFaixa,
    saudacaoAbertura,
    faixaEntrada,
    acertou: () => acertou(),
    errou: () => errou(),
    falar,
    falarSom,
    parar,
    alternarMudo,
    toggle: alternarMudo,
    init: initVoice,
  };

  global.juSaudacao = () => falarSom('saudacao');
  global.juAcertou = acertou;
  global.juErrou = errou;
  global.juParabens = parabens;

  function unlockOnInteract(event) {
    if (isFaixaSelectionEvent(event)) return;
    if (!shouldPlaySaudacaoVideo()) return;

    unlock();
    const active = getActiveIntroVideo();
    if (isJuVideo(active) && selectorIntroLoopActive && active.muted) {
      active.muted = false;
      active.play().then(() => {
        saudacaoAberturaPlayed = true;
      }).catch(() => {});
      return;
    }
    if (!selectorIntroLoopActive) {
      autoplaySaudacaoOnOpen().catch(() => startSelectorIntroLoop());
    }
  }

  document.addEventListener('pointerdown', unlockOnInteract, { passive: true });
  document.addEventListener('keydown', unlockOnInteract);
}(window));
