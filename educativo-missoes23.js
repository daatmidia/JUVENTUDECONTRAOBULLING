(function () {
  'use strict';

  const root = document.getElementById('eduM23');
  if (!root) return;

  const m2Cenarios = [
    {
      situacao: 'Você vê um colega sendo chamado de apelido ofensivo na frente de todo mundo no corredor. O grupo ri e o colega parece envergonhado.',
      pergunta: 'O que você faz?',
      opcoes: [
        { letra: 'A', texto: 'Ri junto com o grupo para não chamar atenção para você.', certa: false, feedback: 'Quando você ri junto, passa a mensagem de que o bullying é aceitável. Isso é ser parte do problema, não da solução. 💔' },
        { letra: 'B', texto: 'Fica parado(a) sem fazer nada, esperando passar.', certa: false, feedback: "Ficar parado também é uma escolha — e o silêncio diz 'está tudo bem'. Você pode fazer a diferença sem se colocar em risco!" },
        { letra: 'C', texto: "Vai até o colega depois e diz: 'Oi, você está bem? O que aconteceu não foi certo.'", certa: true, feedback: 'Perfeito! Apoiar depois é seguro e poderoso. Mostrar que alguém se importa pode mudar tudo para quem está sofrendo. 💪' },
        { letra: 'D', texto: 'Enfrenta o agressor na hora, na frente de todos.', certa: false, feedback: 'Confrontar na hora pode escalar a situação e te colocar em risco. A melhor estratégia é apoiar a vítima depois e avisar um adulto.' },
      ],
    },
    {
      situacao: 'Sua amiga recebe mensagens ofensivas em um grupo de WhatsApp. Ela está chorando e não sabe o que fazer.',
      pergunta: 'O que você faz?',
      opcoes: [
        { letra: 'A', texto: "Fala para ela ignorar — 'é só internet, passa logo'.", certa: false, feedback: 'Minimizar a dor online não ajuda. Cyberbullying machuca de verdade e pode ser crime. Ela precisa de apoio real!' },
        { letra: 'B', texto: 'Ajuda ela a fazer prints das mensagens antes de apagar e diz que vão contar para um adulto juntos.', certa: true, feedback: 'Exatamente! Salvar provas é essencial. Ir junto buscar ajuda mostra que ela não está sozinha. Isso é ser aliado(a)! ⭐' },
        { letra: 'C', texto: 'Manda uma resposta agressiva para os agressores em nome dela.', certa: false, feedback: 'Responder agressivamente piora a situação e pode te colocar em problema também. Salvar provas e buscar ajuda é mais eficaz!' },
        { letra: 'D', texto: "Compartilha as mensagens com mais amigos 'para eles saberem o que está acontecendo'.", certa: false, feedback: 'Espalhar as mensagens sem consentimento dela pode ser mais uma violação. Proteja ela — não divulgue sem permissão.' },
      ],
    },
    {
      situacao: 'Um colega mais novo está sendo isolado pela turma. Ninguém senta com ele no refeitório e as pessoas desviam quando ele se aproxima.',
      pergunta: 'O que você faz?',
      opcoes: [
        { letra: 'A', texto: 'Chama ele para sentar com você.', certa: true, feedback: 'Simples e poderoso! Uma atitude de inclusão pode transformar o dia — e a vida — de uma pessoa. Você é um herói(ína) sem capa! 🦸' },
        { letra: 'B', texto: "Pensa 'não é problema meu' e continua com os seus amigos.", certa: false, feedback: 'Exclusão social é bullying. Você tem o poder de quebrar esse ciclo com um gesto simples. Não precisamos ser indiferentes!' },
        { letra: 'C', texto: 'Fala para os outros que o isolamento é errado, mas não faz nada sozinho(a).', certa: false, feedback: 'Falar é um começo, mas ação vale mais. Que tal convidar ele você mesmo(a) e mostrar o caminho para os outros?' },
        { letra: 'D', texto: 'Avisa um professor discretamente que o colega está sendo excluído.', certa: true, feedback: 'Também certo! Avisar um adulto de confiança é uma forma válida e segura de ser aliado(a). Você não precisa resolver tudo sozinho(a).' },
      ],
    },
    {
      situacao: 'Você descobre que um grupo fez um perfil falso no Instagram usando fotos de uma colega para ridicularizá-la. Ela ainda não sabe.',
      pergunta: 'O que você faz?',
      opcoes: [
        { letra: 'A', texto: 'Não faz nada para não se envolver.', certa: false, feedback: 'Ignorar cyberbullying permite que ele continue e piore. Uma atitude pode proteger alguém de um dano enorme!' },
        { letra: 'B', texto: "Conta para seus amigos o que está acontecendo para 'alertar todo mundo'.", certa: false, feedback: 'Espalhar pode aumentar o alcance do perfil falso e machucar mais a colega. A solução é denunciar e avisar um adulto!' },
        { letra: 'C', texto: 'Denuncia o perfil falso na plataforma e avisa um adulto de confiança sobre o que está acontecendo.', certa: true, feedback: 'Perfeito! Denunciar remove o conteúdo mais rápido. Avisar um adulto garante que a situação seja tratada com seriedade. 🏅' },
        { letra: 'D', texto: 'Conta para a colega e vai com ela avisar um professor ou responsável.', certa: true, feedback: 'Também ótimo! Ela precisa saber e ter apoio. Ir junto mostra que ela não está sozinha. Você foi um aliado(a) de verdade!' },
      ],
    },
    {
      situacao: 'Você viu bullying se repetir por semanas. Um adulto da escola já foi avisado, mas nada mudou. Você quer registrar formalmente.',
      pergunta: 'Qual é o próximo passo de aliado(a)?',
      opcoes: [
        { letra: 'A', texto: 'Desiste porque já avisou uma vez.', certa: false, feedback: 'Desistir deixa quem sofre ainda mais isolado(a). Persistir com registro formal é proteger alguém — não é exagero.' },
        { letra: 'B', texto: 'Registra na Ouvidoria REACT com data, fatos, testemunhas e prints.', certa: true, feedback: 'Exatamente! Denúncia formal cria registro oficial. Com provas e detalhes, a escola é obrigada a apurar (Lei nº 14.811/2024). 🏅' },
        { letra: 'C', texto: 'Expõe o agressor publicamente nas redes sem provas.', certa: false, feedback: 'Expor sem provas pode piorar o conflito e até te colocar em risco legal. O caminho seguro é ouvidoria + adultos de confiança.' },
        { letra: 'D', texto: 'Confronta o agressor sozinho(a) para "resolver de uma vez".', certa: false, feedback: 'Confrontar sozinho(a) pode escalar a violência. Aliado(a) de verdade registra, apoia a vítima e aciona canais formais.' },
      ],
    },
  ];

  const stepperData = [
    {
      icon: '🧑‍🤝‍🧑',
      title: 'Com quem falo?',
      text: '<strong>Professora, coordenação, orientação, pais, tios, adultos da família</strong> — alguém em quem você confia. Se um não ouvir, tente outro. Você merece ser ouvido(a).',
      qa: [
        { q: 'E se eu não confiar em nenhum adulto da escola?', a: 'Tente um familiar de confiança, um irmão(ã) mais velho(a), um vizinho adulto. Se não houver ninguém, ligue para o CVV: 188 (gratuito, 24h).' },
        { q: 'Posso falar por mensagem em vez de pessoalmente?', a: 'Sim! Você pode mandar uma mensagem de texto ou WhatsApp para um adulto de confiança. Qualquer forma de comunicar já é um passo enorme.' },
      ],
    },
    {
      icon: '💬',
      title: 'O que digo?',
      text: 'Você não precisa ter todas as palavras. <strong>Começar já ajuda.</strong>',
      script: '"Algo está acontecendo comigo (ou com um colega) e eu preciso de ajuda. Aconteceu [quando] e me deixou [como você se sente]."',
      qa: [
        { q: 'E se eu não lembrar de todos os detalhes?', a: 'Não precisa ser perfeito. Fale o que sabe. Se tiver prints ou anotações, mostre — mas não é obrigatório. O adulto vai te ajudar a organizar.' },
        { q: 'E se eu chorar na hora?', a: 'Tudo bem! Chorar não é fraqueza. Você está passando por algo difícil. O adulto de confiança vai entender — é para isso que ele existe.' },
      ],
    },
    {
      icon: '🤔',
      title: 'E se ninguém acreditar em mim?',
      text: '<strong>Insista. Conte para outra pessoa.</strong> Use a ouvidoria da escola. Você merece ser ouvido(a) — não desista no primeiro "não".',
      qa: [
        { q: 'Tenho medo de piorar a situação se contar.', a: 'É uma preocupação real, mas guardar segredo quase sempre piora. Adultos de confiança têm ferramentas para agir discretamente e te proteger.' },
        { q: 'E se o agressor descobrir que fui eu que contei?', a: 'Peça sigilo ao adulto. Ele tem obrigação de te proteger. A escola tem protocolos para lidar com isso sem te expor mais.' },
        { q: 'Onde fica a ouvidoria da escola?', a: 'Geralmente na secretaria ou coordenação. Você também pode perguntar para qualquer funcionário. Se houver caixa de sugestões anônima, use também!' },
      ],
    },
  ];

  const cyberSteps = [
    { n: 'PASSO 01', title: 'Não responda', desc: 'Responder no calor do momento pode piorar tudo. O agressor quer te provocar — não dê o que ele quer. Respire fundo, feche o aplicativo.', icon: '🛑' },
    { n: 'PASSO 02', title: 'Salve as provas', desc: 'Faça prints de TUDO antes de apagar: mensagens, comentários, fotos, perfis. Você vai precisar dessas provas para denunciar.', icon: '📸' },
    { n: 'PASSO 03', title: 'Bloqueie quem está te atacando', desc: 'Bloquear impede que a pessoa te veja ou te contate. Não é desistir — é se proteger enquanto resolve a situação com adultos.', icon: '🚫' },
    { n: 'PASSO 04', title: 'Conte para um adulto de confiança', desc: 'Mostre os prints para um adulto. Ele pode acionar a escola, a plataforma ou até a polícia. Você não precisa resolver sozinho(a).', icon: '🧑‍💼' },
  ];

  const simCenas = [
    {
      mensagem: "😡 'Você é um lixo. Todo mundo odeia você. Vai desaparecer!'",
      pergunta: 'Como você reage a esta mensagem?',
      acoes: [
        { icon: '😤', texto: "Responde: 'Você também é horrível, sai da minha vida!'", certa: false, fb: 'Reagir com raiva escala o conflito e pode ser usado contra você. Melhor: salva o print e não responde.' },
        { icon: '📱', texto: 'Faz print da mensagem, bloqueia o perfil e mostra para um adulto.', certa: true, fb: 'Perfeito! Guardar prova, bloquear e pedir ajuda é exatamente o caminho certo. 👏' },
        { icon: '🗑️', texto: 'Apaga a mensagem e tenta esquecer.', certa: false, fb: 'Apagar sem guardar prova dificulta a denúncia depois. Sempre salve antes!' },
        { icon: '📢', texto: 'Publica em seus stories dizendo quem mandou a mensagem.', certa: false, fb: 'Expor publicamente pode criar mais conflito e até te colocar em posição difícil. Busque ajuda de adultos!' },
      ],
    },
  ];

  const platData = {
    instagram: {
      icon: '📸',
      steps: [
        'Vá até o <strong>perfil ou publicação</strong> ofensiva.',
        'Toque nos <strong>três pontos (⋯)</strong> no canto.',
        'Selecione <strong>Denunciar</strong>.',
        'Escolha <strong>Bullying ou assédio</strong>.',
        'Confirme e <strong>bloqueie o perfil</strong>.',
      ],
    },
    tiktok: {
      icon: '🎵',
      steps: [
        'No vídeo ofensivo, toque em <strong>Compartilhar</strong> (seta).',
        'Role até <strong>Denunciar</strong>.',
        'Selecione <strong>Bullying e assédio</strong>.',
        'Descreva o problema e confirme.',
        'Volte ao perfil e <strong>bloqueie o usuário</strong>.',
      ],
    },
    whatsapp: {
      icon: '💬',
      steps: [
        'Segure a <strong>mensagem ofensiva</strong> por 2 segundos.',
        'Toque no ícone de <strong>três pontos (⋮)</strong>.',
        'Selecione <strong>Denunciar</strong>.',
        'Na conversa, toque no nome do contato.',
        'Role até <strong>Bloquear contato</strong> e confirme.',
      ],
    },
  };

  let m2Acertos = 0;
  let m2Done = 0;
  const m2Respondido = [];
  let cyberRevealed = 0;
  let simRespondido = false;

  function notifyMission2Complete() {
    if (typeof window.juEduOnMission2Complete === 'function') {
      window.juEduOnMission2Complete();
    }
  }

  function switchMissao(n) {
    root.querySelectorAll('.missao-panel').forEach((p) => p.classList.remove('active'));
    root.querySelectorAll('.mtab').forEach((t) => t.classList.remove('active'));
    const map = { 2: 'panel-m2', 3: 'panel-m3a', 4: 'panel-m3b' };
    const tabMap = { 2: 'tab-m2', 3: 'tab-m3a', 4: 'tab-m3b' };
    root.querySelector(`#${map[n]}`)?.classList.add('active');
    root.querySelector(`#${tabMap[n]}`)?.classList.add('active');
  }

  window.eduM23SwitchMissao = switchMissao;

  function buildM2() {
    const wrap = root.querySelector('#m2-cenarios');
    if (!wrap) return;
    m2Cenarios.forEach((c, ci) => {
      const div = document.createElement('div');
      div.className = 'cenario-card';
      div.id = `cenario-${ci}`;
      div.innerHTML = `
        <div class="cenario-header">
          <span class="cenario-badge ally">ALIADO</span>
          <span class="cenario-num">CENÁRIO ${ci + 1} DE ${m2Cenarios.length}</span>
        </div>
        <div class="cenario-body">
          <div class="cenario-situacao">${c.situacao}</div>
          <div class="cenario-pergunta">▸ ${c.pergunta}</div>
          <div class="opcoes-grid" id="opcoes-${ci}">
            ${c.opcoes.map((o, oi) => `
              <button type="button" class="opcao" data-m2-ci="${ci}" data-m2-oi="${oi}" id="opcao-${ci}-${oi}">
                <div class="opcao-letter">${o.letra}</div>
                <div class="opcao-text">${o.texto}</div>
              </button>
            `).join('')}
          </div>
          <div id="fb-${ci}"></div>
        </div>`;
      wrap.appendChild(div);
    });

    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-m2-ci]');
      if (!btn) return;
      responderM2(Number(btn.dataset.m2Ci), Number(btn.dataset.m2Oi));
    });
  }

  function responderM2(ci, oi) {
    if (m2Respondido.includes(ci)) return;
    m2Respondido.push(ci);
    const c = m2Cenarios[ci];
    const o = c.opcoes[oi];

    c.opcoes.forEach((_, i) => {
      const btn = root.querySelector(`#opcao-${ci}-${i}`);
      if (!btn) return;
      btn.disabled = true;
      if (c.opcoes[i].certa) btn.classList.add('certa');
      else if (i === oi && !o.certa) btn.classList.add('errada');
      else btn.classList.add('neutra');
    });

    const fbEl = root.querySelector(`#fb-${ci}`);
    const ok = o.certa;
    if (ok) m2Acertos += 1;

    if (fbEl) {
      fbEl.innerHTML = `
        <div class="cenario-feedback ${ok ? 'ok' : 'no'}">
          <span class="feedback-icon">${ok ? '✅' : '🤔'}</span>
          ${o.feedback}
        </div>
        ${m2Done + 1 < m2Cenarios.length ? `<button type="button" class="btn-proximo" data-next-cenario="${ci + 1}">PRÓXIMO CENÁRIO ▶</button>` : ''}`;
    }

    m2Done += 1;
    const pct = `${(m2Done / m2Cenarios.length) * 100}%`;
    const bar = root.querySelector('#m2-prog-bar');
    const label = root.querySelector('#m2-prog-label');
    if (bar) bar.style.width = pct;
    if (label) label.textContent = `${m2Done} / ${m2Cenarios.length}`;

    if (m2Done === m2Cenarios.length) {
      setTimeout(showConclM2, 800);
    }
  }

  function proximoCenario(next) {
    root.querySelector(`#cenario-${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function showConclM2() {
    const el = root.querySelector('#conclusao-m2');
    if (!el) return;
    el.classList.add('show');
    const score = root.querySelector('#m2-score');
    const msg = root.querySelector('#m2-msg');
    if (score) score.textContent = `${m2Acertos}/${m2Cenarios.length}`;
    const pct = Math.round((m2Acertos / m2Cenarios.length) * 100);
    let text = 'Continue praticando! Ser aliado é uma habilidade que se aprende. O importante é querer fazer a diferença.';
    if (pct >= 75) text = 'Você mostrou que sabe ser um aliado de verdade. Isso faz diferença na vida de quem sofre bullying!';
    else if (pct >= 50) text = 'Bom esforço! Você está aprendendo. Cada cenário ensina algo novo sobre como apoiar quem precisa.';
    if (msg) msg.textContent = text;
    el.scrollIntoView({ behavior: 'smooth' });
    fireConfetti();
    notifyMission2Complete();
  }

  function copyScript() {
    const text = root.querySelector('#script-text')?.textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      const btn = root.querySelector('#copy-btn');
      if (!btn) return;
      btn.textContent = '✅ COPIADO!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 COPIAR FRASE';
        btn.classList.remove('copied');
      }, 2500);
    });
  }

  function buildStepper() {
    const wrap = root.querySelector('#stepper-ajuda');
    if (!wrap) return;

    stepperData.forEach((s, i) => {
      const isLast = i === stepperData.length - 1;
      const div = document.createElement('div');
      div.className = 'step-wrap';
      div.innerHTML = `
        <div class="step-line-col">
          <div class="step-circle ${i === 0 ? 'active' : ''}" data-step-toggle="${i}">${i + 1}</div>
          ${!isLast ? `<div class="step-connector" id="conn-${i}"></div>` : ''}
        </div>
        <div class="step-content-col">
          <div class="step-content ${i === 0 ? '' : 'collapsed'}" id="step-${i}">
            <div class="step-head" data-step-toggle="${i}">
              <span class="step-head-icon">${s.icon}</span>
              <span class="step-head-title">${s.title}</span>
              <span class="step-head-arrow">▾</span>
            </div>
            <div class="step-body-inner">
              <div class="step-body-text">${s.text}</div>
              ${s.script ? `<div class="step-script">${s.script}</div>` : ''}
              ${s.qa ? `<div class="step-qa">${s.qa.map((q, qi) => `
                <div class="qa-item" data-qa-step="${i}" data-qa-index="${qi}">
                  <div class="qa-q">❓ ${q.q}</div>
                  <div class="qa-a">${q.a}</div>
                </div>`).join('')}</div>` : ''}
              ${!isLast
                ? `<button type="button" class="btn-proximo" style="margin-top:12px" data-advance-step="${i}">PRÓXIMA ETAPA ▶</button>`
                : `<button type="button" class="btn-proximo" style="margin-top:12px;border-color:var(--m23-green);color:var(--m23-green)" data-complete-stepper="1">MISSÃO CONCLUÍDA ✓</button>`}
            </div>
          </div>
        </div>`;
      wrap.appendChild(div);
    });
  }

  function toggleStep(i) {
    root.querySelector(`#step-${i}`)?.classList.toggle('collapsed');
  }

  function toggleQA(si, qi) {
    root.querySelector(`#qa-${si}-${qi}`)?.classList.toggle('open');
  }

  function advanceStep(i) {
    const cur = root.querySelector(`#sc-${i}`) || root.querySelector(`[data-step-toggle="${i}"]`);
    if (cur) {
      cur.className = 'step-circle done';
      cur.textContent = '✓';
    }
    root.querySelector(`#conn-${i}`)?.classList.add('lit');
    root.querySelector(`#step-${i}`)?.classList.add('collapsed');
    const next = root.querySelector(`#step-${i + 1}`);
    if (next) {
      next.classList.remove('collapsed');
      const nCirc = root.querySelector(`[data-step-toggle="${i + 1}"]`);
      if (nCirc) {
        nCirc.className = 'step-circle active';
      }
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function completeStepper() {
    const i = stepperData.length - 1;
    const circ = root.querySelector(`[data-step-toggle="${i}"]`);
    if (circ) {
      circ.className = 'step-circle done';
      circ.textContent = '✓';
    }
    root.querySelector(`#step-${i}`)?.classList.add('collapsed');
    const el = root.querySelector('#conclusao-m3a');
    if (el) {
      el.classList.add('show');
      el.scrollIntoView({ behavior: 'smooth' });
    }
    fireConfetti();
  }

  function buildCyberSteps() {
    const grid = root.querySelector('#cyber-steps-grid');
    if (!grid) return;

    cyberSteps.forEach((s, i) => {
      const div = document.createElement('div');
      div.className = 'cyber-step-card';
      div.id = `cystep-${i}`;
      div.innerHTML = `
        <div class="cyber-num">${s.n}</div>
        <div style="font-size:28px;margin-bottom:8px">${s.icon}</div>
        <div class="cyber-step-title">${s.title}</div>
        <div class="cyber-step-desc">${s.desc}</div>
        <div class="cyber-tap">▸ TOQUE PARA REVELAR</div>`;
      div.addEventListener('click', () => revealCyber(i, div));
      grid.appendChild(div);
    });
  }

  function revealCyber(i, el) {
    if (el.classList.contains('revealed')) return;
    el.classList.add('revealed');
    cyberRevealed += 1;
    if (cyberRevealed === cyberSteps.length) {
      setTimeout(buildSimulador, 400);
    }
  }

  function buildSimulador() {
    const wrap = root.querySelector('#sim-wrap');
    if (!wrap) return;
    const cena = simCenas[0];

    wrap.innerHTML = `
      <div class="sim-chat">
        <div class="sim-chat-header">
          <div class="sim-chat-avatar">😡</div>
          <div>
            <div class="sim-chat-name">Usuário Desconhecido</div>
            <div class="sim-chat-status">online</div>
          </div>
        </div>
        <div class="sim-messages" id="sim-msgs">
          <div class="sim-msg them">${cena.mensagem}</div>
        </div>
      </div>
      <div style="font-family:'Orbitron',sans-serif;font-size:10px;color:rgba(180,200,255,.5);letter-spacing:1.5px;margin-bottom:8px">▸ ${cena.pergunta}</div>
      <div class="sim-actions" id="sim-actions">
        ${cena.acoes.map((a, ai) => `
          <button type="button" class="sim-action" data-sim-ai="${ai}" id="sima-${ai}">
            <span class="sim-action-icon">${a.icon}</span>
            ${a.texto}
          </button>`).join('')}
      </div>
      <div id="sim-fb"></div>`;

    simRespondido = false;
  }

  function responderSim(ai) {
    if (simRespondido) return;
    simRespondido = true;
    const cena = simCenas[0];
    const a = cena.acoes[ai];
    const msgsEl = root.querySelector('#sim-msgs');

    setTimeout(() => {
      const m = document.createElement('div');
      m.className = 'sim-msg me';
      m.textContent = a.texto;
      msgsEl?.appendChild(m);
    }, 200);

    cena.acoes.forEach((_, i) => {
      const btn = root.querySelector(`#sima-${i}`);
      if (!btn) return;
      btn.disabled = true;
      if (cena.acoes[i].certa) btn.classList.add('certa');
      else if (i === ai && !a.certa) btn.classList.add('errada');
      else btn.classList.add('neutra');
    });

    setTimeout(() => {
      const m = document.createElement('div');
      m.className = 'sim-msg system';
      m.textContent = a.certa ? `✅ ${a.fb}` : `⚠️ ${a.fb}`;
      msgsEl?.appendChild(m);
      const fb = root.querySelector('#sim-fb');
      if (fb) {
        fb.innerHTML = '<button type="button" class="btn-proximo" style="margin-top:12px" data-show-concl-m3b="1">VER CONCLUSÃO DA MISSÃO ▶</button>';
      }
    }, 600);
  }

  function showConclM3b() {
    const el = root.querySelector('#conclusao-m3b');
    if (!el) return;
    el.classList.add('show');
    el.scrollIntoView({ behavior: 'smooth' });
    fireConfetti();
  }

  function buildPlat() {
    const wrap = root.querySelector('#plat-contents');
    if (!wrap) return;

    Object.entries(platData).forEach(([key, p]) => {
      const div = document.createElement('div');
      div.className = `plat-content${key === 'instagram' ? ' active' : ''}`;
      div.id = `plat-${key}`;
      div.innerHTML = `
        <div class="plat-card">
          <div style="font-size:13px;font-weight:700;color:rgba(200,180,255,.9);margin-bottom:10px">${p.icon} Como denunciar:</div>
          <div class="plat-steps-list">
            ${p.steps.map((s, i) => `
              <div class="plat-step">
                <div class="plat-step-num">${i + 1}</div>
                <div>${s}</div>
              </div>`).join('')}
          </div>
        </div>`;
      wrap.appendChild(div);
    });
  }

  function switchPlat(key, tabEl) {
    root.querySelectorAll('.plat-content').forEach((c) => c.classList.remove('active'));
    root.querySelectorAll('.plat-tab').forEach((t) => t.classList.remove('active'));
    root.querySelector(`#plat-${key}`)?.classList.add('active');
    tabEl.classList.add('active');
  }

  function fireConfetti() {
    const c = root.querySelector('#m23-confetti');
    if (!c) return;
    const colors = ['#00d4ff', '#ff2d9b', '#b45aff', '#ffd700', '#00ff88'];
    for (let i = 0; i < 60; i += 1) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      const size = 6 + Math.random() * 8;
      p.style.cssText = `
        left:${Math.random() * 100}%;
        width:${size}px;height:${size * 1.5}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration:${1.5 + Math.random() * 2}s;
        animation-delay:${Math.random() * 0.8}s;
        opacity:${0.7 + Math.random() * 0.3};
        transform:rotate(${Math.random() * 360}deg);
      `;
      c.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  }

  root.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-m23-tab]');
    if (tab) {
      switchMissao(Number(tab.dataset.m23Tab));
      return;
    }

    const nextCenario = e.target.closest('[data-next-cenario]');
    if (nextCenario) {
      proximoCenario(Number(nextCenario.dataset.nextCenario));
      return;
    }

    if (e.target.closest('#copy-btn')) {
      copyScript();
      return;
    }

    const stepToggle = e.target.closest('[data-step-toggle]');
    if (stepToggle) {
      toggleStep(Number(stepToggle.dataset.stepToggle));
      return;
    }

    const qaItem = e.target.closest('[data-qa-step]');
    if (qaItem) {
      const el = qaItem;
      el.classList.toggle('open');
      return;
    }

    const advance = e.target.closest('[data-advance-step]');
    if (advance) {
      advanceStep(Number(advance.dataset.advanceStep));
      return;
    }

    if (e.target.closest('[data-complete-stepper]')) {
      completeStepper();
      return;
    }

    const simBtn = e.target.closest('[data-sim-ai]');
    if (simBtn) {
      responderSim(Number(simBtn.dataset.simAi));
      return;
    }

    if (e.target.closest('[data-show-concl-m3b]')) {
      showConclM3b();
      return;
    }

    const platTab = e.target.closest('[data-plat-key]');
    if (platTab) {
      switchPlat(platTab.dataset.platKey, platTab);
    }
  });

  buildM2();
  buildStepper();
  buildCyberSteps();
  buildPlat();
})();
