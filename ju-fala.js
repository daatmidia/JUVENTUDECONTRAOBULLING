// ================================================================
//  JU_FALA — Web Speech API calibrada para o tom da Ju
//
//  COMO USAR:
//    JU_FALA.selector()  → "Olá mentes brilhantes! Preparados para um desafio?"
//    JU_FALA.acertou()    → "Isso mesmo, você mandou super bem!"
//    JU_FALA.errou()      → "Quase! Não desiste, vamos aprender juntos!"
//    JU_FALA.parabens()   → "Parabéns! Saber pedir ajuda é um superpoder!..."
//    JU_FALA.parar()      → para imediatamente
// ================================================================

const JU_FALA = (() => {

  const FRASES = {
    saudacao: 'Oi, eu sou a Ju! Vamos jogar juntos?',
    selector: 'Olá mentes brilhantes! Preparados para um desafio?',
    acertou: 'Isso mesmo, você mandou super bem!',
    errou: 'Quase! Não desiste, vamos aprender juntos!',
    parabens: 'Parabéns! Saber pedir ajuda é um superpoder!! Use quando precisar.',
  };

  const CFG = { lang: 'pt-BR', pitch: 1.5, rate: 1.05, vol: 1 };

  let voz = null;
  let falando = false;
  let utterAtual = null;

  function carregarVoz() {
    if (!window.speechSynthesis) return;
    const todas = window.speechSynthesis.getVoices();
    voz =
      todas.find((v) => v.lang === 'pt-BR' && /luciana|vitoria|female|feminina/i.test(v.name)) ||
      todas.find((v) => v.lang === 'pt-BR') ||
      todas.find((v) => v.lang.startsWith('pt')) ||
      todas[0] || null;
  }
  carregarVoz();
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = carregarVoz;
  }

  function alvosJu() {
    return document.querySelectorAll(
      '.ju-arena, .ju-kids, .kids-ju, .ju-img, .game-start-mascot, .game-start-img, #selectorJu, #kidsJu, #fullJu, [data-ju-avatar]'
    );
  }

  function ondas(on) {
    document.querySelectorAll('#waves-m, #waves-t, .ju-waves, .voice-waves').forEach((el) => {
      el.style.display = on ? 'flex' : 'none';
    });
  }

  function efeito(tipo) {
    alvosJu().forEach((el) => {
      el.style.animation = 'none';
      void el.offsetWidth;
      if (tipo === 'acertou') {
        el.style.animation = 'jufloat 0.5s ease-in-out infinite';
        let t = 0;
        const fl = setInterval(() => {
          t += 1;
          el.style.filter = t % 2 === 0
            ? 'drop-shadow(0 0 22px #00ff88) brightness(1.3)'
            : 'drop-shadow(0 0 8px rgba(0,212,255,.5))';
          if (t > 6) { clearInterval(fl); el.style.filter = ''; }
        }, 110);
      } else if (tipo === 'errou') {
        el.style.animation = 'juShake 0.4s ease';
      } else if (tipo === 'parabens') {
        el.style.animation = 'jufloat 0.6s ease-in-out infinite';
        let t = 0;
        const fl = setInterval(() => {
          t += 1;
          el.style.filter = t % 2 === 0
            ? 'drop-shadow(0 0 22px #ffd700) brightness(1.4)'
            : 'drop-shadow(0 0 8px rgba(255,215,0,.4))';
          if (t > 10) { clearInterval(fl); el.style.filter = ''; }
        }, 140);
      }
    });
  }

  function pararEfeito() {
    alvosJu().forEach((el) => {
      el.style.animation = '';
      el.style.filter = '';
    });
  }

  function falar(texto, tipo) {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(texto);
    u.lang = CFG.lang;
    u.pitch = CFG.pitch;
    u.rate = CFG.rate;
    u.volume = CFG.vol;
    if (voz) u.voice = voz;

    utterAtual = u;
    falando = true;

    u.onstart = () => {
      ondas(true);
      if (tipo) efeito(tipo);
    };
    u.onend = u.onerror = () => {
      ondas(false);
      pararEfeito();
      falando = false;
      utterAtual = null;
    };

    window.speechSynthesis.speak(u);
  }

  return {
    FRASES,
    CFG,
    saudacao() { falar(FRASES.saudacao, null); },
    selector() { falar(FRASES.selector, null); },
    acertou() { falar(FRASES.acertou, 'acertou'); },
    errou() { falar(FRASES.errou, 'errou'); },
    parabens() { falar(FRASES.parabens, 'parabens'); },
    parar() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      ondas(false);
      pararEfeito();
      falando = false;
    },
  };
})();

window.JU_FALA = JU_FALA;
