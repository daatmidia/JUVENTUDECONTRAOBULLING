(function () {
  'use strict';

  const timelineData = [
    {
      icon: '🗣️',
      num: 'ETAPA 01',
      title: 'Você conta para um adulto de confiança',
      text: '<strong>O que esperar:</strong> O adulto vai te ouvir (ou deveria). Você pode ser um adulto da escola, um familiar ou ligar para o CVV (188). Não precisa ter todas as informações — só o que você sabe já ajuda.<br><br><strong>Sigilo:</strong> Você pode pedir que ele(a) não revele que foi você quem contou. Professores e orientadores têm obrigação de agir discretamente para te proteger.',
    },
    {
      icon: '🏫',
      num: 'ETAPA 02',
      title: 'A escola é comunicada e investiga',
      text: 'A direção ou orientação abre uma <strong>apuração discreta</strong>. Eles podem conversar com testemunhas, verificar câmeras ou chamar os envolvidos separadamente.<br><br><strong>Você não vai ser confrontado(a) com o agressor</strong> sem estar preparado(a) e sem apoio. A escola tem o dever de te proteger durante todo o processo.',
    },
    {
      icon: '👪',
      num: 'ETAPA 03',
      title: 'Sua família é informada',
      text: 'Em casos de bullying, <strong>a escola tem obrigação de avisar os responsáveis</strong>. Eles vão ser chamados para conversar e entender o que está acontecendo.<br><br>Se você tiver medo da reação em casa, fale isso para o orientador antes. Ele pode estar presente na conversa para te apoiar.',
    },
    {
      icon: '🛡️',
      num: 'ETAPA 04',
      title: 'Medidas de proteção são tomadas',
      text: 'A escola deve adotar <strong>ações concretas</strong>: mudança de turma, supervisão nos intervalos, acompanhamento pedagógico. O agressor também passa por processo educativo — e pode ter consequências disciplinares.<br><br>A <strong>Lei nº 14.811/2024</strong> e a Lei 13.185/2015 obrigam as escolas a ter plano de ação contra bullying.',
    },
    {
      icon: '🧠',
      num: 'ETAPA 05',
      title: 'Você recebe acompanhamento',
      text: 'Você tem direito a <strong>apoio psicológico</strong> — seja pela escola, pela rede de saúde do município ou pelo Conselho Tutelar (136).<br><br>O processo não termina na punição do agressor. O foco é <em>restaurar sua segurança e bem-estar.</em>',
    },
  ];

  const direitosData = [
    {
      icon: '🔒',
      title: 'Sigilo da denúncia',
      hint: 'toque para saber mais',
      back: 'Você tem o direito de fazer uma denúncia sem que seu nome seja revelado para o agressor ou para a turma. Peça isso explicitamente ao adulto.',
      lei: 'Lei 14.811/2024 / Lei 13.185/2015 — Art. 5º',
    },
    {
      icon: '🏫',
      title: 'Ambiente escolar seguro',
      hint: 'toque para saber mais',
      back: 'Toda escola tem a obrigação legal de garantir um ambiente livre de violência para todos os alunos. Isso inclui intervalos, corredores e ambientes digitais.',
      lei: 'ECA — Art. 53 / Lei 14.811/2024',
    },
    {
      icon: '🧠',
      title: 'Acompanhamento psicológico',
      hint: 'toque para saber mais',
      back: 'Você tem direito a atendimento psicológico — pela escola, pelo CAPS da sua cidade ou pelo Conselho Tutelar. Não precisa pagar.',
      lei: 'Lei 14.811/2024 / Lei 13.185/2015 — Art. 5º',
    },
    {
      icon: '⚖️',
      title: 'Proteção legal',
      hint: 'toque para saber mais',
      back: 'O bullying é reconhecido como crime no Brasil. O agressor pode responder legalmente — especialmente se for adulto ou reincidente. A lei está do seu lado.',
      lei: 'Lei 14.811/2024 / CP — Arts. 129, 140, 147',
    },
    {
      icon: '🗣️',
      title: 'Ser ouvido(a) sem julgamento',
      hint: 'toque para saber mais',
      back: 'Você tem o direito de contar o que está acontecendo sem ser culpabilizado(a), sem ter a gravidade minimizada e sem ser pressionado(a) a \'resolver entre vocês\'.',
      lei: 'ECA — Art. 17 / Art. 18',
    },
    {
      icon: '🔄',
      title: 'Acompanhamento do processo',
      hint: 'toque para saber mais',
      back: 'Você e sua família têm o direito de ser informados sobre o andamento do caso — o que foi feito, que medidas foram tomadas e o que ainda vai acontecer.',
      lei: 'Lei 14.811/2024 / Lei 13.185/2015 — Art. 5º',
    },
  ];

  function initEduMa(root) {
    if (!root || root.dataset.maInit === '1') return;
    root.dataset.maInit = '1';

    const resultadoEl = root.querySelector('.ma-chk-resultado');
    const resIcon = root.querySelector('.ma-resultado-icon');
    const resTitle = root.querySelector('.ma-resultado-title');
    const resText = root.querySelector('.ma-resultado-text');
    const ajudaSection = root.querySelector('.ma-sec-ajuda');

    function updateResultado() {
      const total = root.querySelectorAll('.ma-chk-item.checked').length;
      if (!resultadoEl) return;

      if (total === 0) {
        resultadoEl.classList.remove('show', 'poucos', 'alguns', 'muitos');
        return;
      }

      resultadoEl.classList.add('show');
      resultadoEl.classList.remove('poucos', 'alguns', 'muitos');

      if (total <= 2) {
        resultadoEl.classList.add('poucos');
        if (resIcon) resIcon.textContent = '💙';
        if (resTitle) resTitle.textContent = 'Você está prestando atenção no que sente.';
        if (resText) resText.textContent = 'Mesmo que pareça pequeno, o que você está sentindo importa. Se está te incomodando, merece ser levado a sério. Você pode conversar com alguém de confiança sobre isso.';
      } else if (total <= 5) {
        resultadoEl.classList.add('alguns');
        if (resIcon) resIcon.textContent = '💜';
        if (resTitle) resTitle.textContent = 'Isso que você está vivendo é sério — e não é culpa sua.';
        if (resText) resText.textContent = 'As situações que você marcou podem caracterizar bullying. Você merece ajuda e tem direito a um ambiente seguro. Não precisa carregar isso sozinho(a).';
      } else {
        resultadoEl.classList.add('muitos');
        if (resIcon) resIcon.textContent = '❤️';
        if (resTitle) resTitle.textContent = 'Você está sendo muito corajoso(a) de reconhecer isso.';
        if (resText) resText.textContent = 'O que você está vivendo é grave e você merece ajuda agora. Por favor, fale com um adulto de confiança hoje. Se não tiver ninguém, ligue para o CVV: 188 — é gratuito, 24 horas e sigiloso.';
      }
    }

    function toggleChk(el, index) {
      el.classList.toggle('checked');
      const box = el.querySelector('.ma-chk-box');
      const checked = el.classList.contains('checked');
      if (box) box.textContent = checked ? '✓' : '';
      el.setAttribute('aria-checked', checked ? 'true' : 'false');
      if (checked && typeof window.juEduGrantCheck === 'function') {
        window.juEduGrantCheck(index);
      }
      updateResultado();
    }

    function scrollToAjuda() {
      ajudaSection?.scrollIntoView({ behavior: 'smooth' });
    }

    function toggleAcc(item) {
      const isOpen = item.classList.contains('open-item');
      root.querySelectorAll('.ma-acc-item').forEach((a) => a.classList.remove('open-item'));
      if (!isOpen) item.classList.add('open-item');
    }

    function buildTimeline() {
      const wrap = root.querySelector('.ma-timeline');
      if (!wrap || wrap.dataset.built === '1') return;
      wrap.dataset.built = '1';

      const cards = [];
      const dots = [];
      const lines = [];

      timelineData.forEach((t, i) => {
        const isLast = i === timelineData.length - 1;
        const div = document.createElement('div');
        div.className = 'ma-tl-item';
        div.innerHTML = `
          <div class="ma-tl-left">
            <button type="button" class="ma-tl-dot" aria-label="Ativar etapa ${i + 1}">${t.icon}</button>
            ${!isLast ? '<div class="ma-tl-line"></div>' : ''}
          </div>
          <div class="ma-tl-right">
            <div class="ma-tl-card">
              <button type="button" class="ma-tl-card-head" aria-expanded="false">
                <div>
                  <div class="ma-tl-step-num">${t.num}</div>
                  <div class="ma-tl-step-title">${t.title}</div>
                </div>
                <div class="ma-tl-step-check" aria-hidden="true">✅</div>
              </button>
              <div class="ma-tl-body">
                <div class="ma-tl-body-text">${t.text}</div>
                ${!isLast
                  ? `<button type="button" class="ma-tl-btn">ENTENDIDO — PRÓXIMA ETAPA ▶</button>`
                  : `<button type="button" class="ma-tl-btn ma-tl-btn--done">ENTENDIDO — VER MEUS DIREITOS ✓</button>`
                }
              </div>
            </div>
          </div>`;
        wrap.appendChild(div);

        const dot = div.querySelector('.ma-tl-dot');
        const line = div.querySelector('.ma-tl-line');
        const card = div.querySelector('.ma-tl-card');
        cards.push(card);
        dots.push(dot);
        lines.push(line);

        dot?.addEventListener('click', () => activateTL(i));
        div.querySelector('.ma-tl-card-head')?.addEventListener('click', () => toggleTL(card));
        div.querySelector('.ma-tl-btn')?.addEventListener('click', () => activateTL(i));
      });

      function toggleTL(card) {
        card?.classList.toggle('tl-open');
      }

      function activateTL(i) {
        dots[i]?.classList.add('activated');
        cards[i]?.classList.add('activated');
        cards[i]?.classList.remove('tl-open');
        lines[i]?.classList.add('lit');

        const next = cards[i + 1];
        if (next) {
          next.classList.add('tl-open');
          next.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          setTimeout(() => {
            root.querySelector('.ma-direitos-grid')?.scrollIntoView({ behavior: 'smooth' });
          }, 400);
        }
      }

      cards[0]?.classList.add('tl-open');
    }

    function buildDireitos() {
      const grid = root.querySelector('.ma-direitos-grid');
      if (!grid || grid.dataset.built === '1') return;
      grid.dataset.built = '1';

      direitosData.forEach((d) => {
        const card = document.createElement('div');
        card.className = 'ma-direito-card';
        card.innerHTML = `
          <div class="ma-direito-inner">
            <div class="ma-direito-front">
              <div class="ma-direito-icon">${d.icon}</div>
              <div class="ma-direito-title">${d.title}</div>
              <div class="ma-direito-hint">▸ ${d.hint}</div>
            </div>
            <div class="ma-direito-back">
              <div class="ma-direito-back-title">${d.icon} ${d.title.toUpperCase()}</div>
              <div class="ma-direito-back-text">${d.back}</div>
              <div class="ma-direito-lei">${d.lei}</div>
            </div>
          </div>`;
        card.addEventListener('click', () => card.classList.toggle('flipped'));
        grid.appendChild(card);
      });
    }

    function restoreChecklist() {
      if (typeof window.juEduGetCheckIndices !== 'function') return;
      window.juEduGetCheckIndices().forEach((index) => {
        const item = root.querySelector(`.ma-chk-item[data-check-index="${index}"]`);
        if (!item) return;
        item.classList.add('checked');
        item.setAttribute('aria-checked', 'true');
        const box = item.querySelector('.ma-chk-box');
        if (box) box.textContent = '✓';
      });
      updateResultado();
    }

    root.querySelectorAll('.ma-chk-item').forEach((item) => {
      const index = Number(item.dataset.checkIndex);
      item.addEventListener('click', () => toggleChk(item, index));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleChk(item, index);
        }
      });
    });

    root.querySelector('.ma-resultado-cta')?.addEventListener('click', scrollToAjuda);

    root.querySelectorAll('.ma-acc-item').forEach((item) => {
      item.querySelector('.ma-acc-head')?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAcc(item);
      });
    });

    buildTimeline();
    buildDireitos();
    restoreChecklist();
  }

  function stripInnerIds(node) {
    node.querySelectorAll('[id]').forEach((el) => {
      el.removeAttribute('id');
    });
  }

  function mountMedioAcolhimento() {
    const mount = document.getElementById('fxMedioMa');
    const source = document.getElementById('eduMa');
    if (!mount || !source || mount.dataset.mounted === '1') return;

    const clone = source.cloneNode(true);
    clone.id = 'eduMaMedio';
    stripInnerIds(clone);
    mount.appendChild(clone);
    mount.dataset.mounted = '1';
    initEduMa(clone);
  }

  function initAll() {
    const teenRoot = document.getElementById('eduMa');
    if (teenRoot) initEduMa(teenRoot);
    mountMedioAcolhimento();
  }

  globalThis.initEduMa = initEduMa;
  globalThis.mountMedioAcolhimento = mountMedioAcolhimento;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
}());
