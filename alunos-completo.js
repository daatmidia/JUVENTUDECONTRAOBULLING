// ================================================================
//  JU_FALA — Web Speech API calibrada para o tom da Ju
// ================================================================
const JU_FALA = window.JU_FALA || (() => {

  const FRASES = {
    saudacao: 'Oi, eu sou a Ju! Vamos jogar juntos?',
    selector: 'Olá mentes brilhantes! Preparados para um desafio?',
    acertou: 'Isso mesmo, você mandou super bem!',
    errou: 'Quase! Não desiste, vamos aprender juntos!',
    parabens: 'Parabéns! Saber pedir ajuda é um superpoder!! Use quando precisar.',
  };

  const CFG = { lang: 'pt-BR', pitch: 1.5, rate: 1.05, vol: 1 };

  let voz = null;
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
  if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = carregarVoz;

  function alvosJu() {
    return document.querySelectorAll(
      '.ju-arena, .ju-kids, .kids-ju, .ju-img, .game-start-mascot, #selectorJu, #kidsJu, [data-ju-avatar]'
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
          t++;
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
          t++;
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
    u.onstart = () => { ondas(true); if (tipo) efeito(tipo); };
    u.onend = u.onerror = () => { ondas(false); pararEfeito(); utterAtual = null; };
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
    },
  };
})();

window.JU_FALA = JU_FALA;

// ══════════════════════════════════════
// DADOS — ADAPTADOS POR FAIXA ETÁRIA
// ══════════════════════════════════════

// ── 6-9 anos: frases curtíssimas, emojis grandes, sem juridiquês ──
const KIDS_Q=[
  {emoji:"😢",q:"João empurra Pedro todo dia na escola. Isso é bullying?",
   sub:"Pensa: acontece sempre ou só uma vez?",a:true,
   ok:"Sim! Machucar alguém de propósito, várias vezes, é bullying! A Ju aprova! 💪",
   no:"Na verdade é sim bullying! Quando alguém machuca de propósito todo dia, é errado. 🤍",
   jatok:"Parabéns! Você é uma mente brilhante! 🌟",jatnok:"Quase lá! Pensa de novo com calma! 💙"},
  {emoji:"🤔",q:"Ana ficou brava com Maria por um dia. É bullying?",
   sub:"Dica: todo mundo briga às vezes!",a:false,
   ok:"Isso mesmo! Brigar uma vez é normal. Bullying é quando acontece sempre! ⭐",
   no:"Não é bullying! Ficar brava um dia é normal entre amigas. Bullying repete sempre! 🤍",
   jatok:"Mandou bem! Você entendeu a diferença! 🎯",jatnok:"Essa foi difícil! Uma briga não é bullying! 💙"},
  {emoji:"📱",q:"Alguém postou fotos feias de Lucas na internet para humilhá-lo. É bullying?",
   sub:"Na internet também pode acontecer bullying!",a:true,
   ok:"Sim! Bullying na internet chama cyberbullying e é muito sério! 🚀",
   no:"É sim! Usar a internet para machucar alguém também é bullying! 🤍",
   jatok:"Você sabe de tudo! A Ju está orgulhosa! 🏆",jatnok:"Na internet também tem bullying. Isso é cyberbullying! 💙"},
  {emoji:"😞",q:"Sofia não foi convidada para a festa de propósito toda semana. É bullying?",
   sub:"Pensa: é de propósito e acontece sempre?",a:true,
   ok:"Sim! Excluir alguém de propósito toda semana é bullying social! 💜",
   no:"É sim! Deixar alguém de fora de propósito, toda semana, é bullying! 🤍",
   jatok:"Arrasou! Exclusão também é bullying! 🌈",jatnok:"Excluir alguém de propósito é errado e é bullying! 💙"}
];

// ── 10-12 anos: cenários escolares reais, linguagem clara, 4 opções ──
const MEDIO_Q=[
  {t:"Na fila do refeitório, Gustavo empurra Mateus toda semana e faz ele cair de propósito na frente dos colegas.",
   ctx:"Repara: acontece toda semana e é de propósito.",b:true,
   ex:"Isso é bullying físico. Quando alguém machuca de propósito e fica repetindo, é bullying — mesmo que pareça 'brincadeira'.",
   ok:"Certíssimo! Violência física repetida é bullying. O Mateus merece um ambiente seguro! 💪",
   no:"É sim bullying! Ações repetidas e de propósito sempre caracterizam bullying."},
  {t:"Lara e Beatriz brigaram porque a Lara contou um segredo. Elas ficaram sem falar por três dias.",
   ctx:"Repara: foi uma briga pontual entre amigas.",b:false,
   ex:"Isso é um conflito normal entre colegas. Bullying precisa ser intencional, repetido e com desequilíbrio de poder.",
   ok:"Exato! Brigas pontuais fazem parte das relações. Não é bullying.",
   no:"Não é bullying! Conflitos acontecem. Bullying precisa ser repetido e com intenção de machucar."},
  {t:"Um grupo do 7º ano criou uma conta falsa no Instagram com fotos da Camila com legendas ofensivas.",
   ctx:"Isso acontece nas redes sociais — bullying digital.",b:true,
   ex:"Isso é cyberbullying — bullying que acontece pela internet. É crime previsto na Lei nº 14.811/2024 e pode ter punição legal.",
   ok:"Correto! Criar perfis falsos para humilhar é cyberbullying e é crime! 🔍",
   no:"É sim! Na internet também existe bullying — e a lei brasileira pune quem pratica!"},
  {t:"A turma do 6º ano combinou de ignorar Felipe em todas as aulas e nunca chamar ele nos trabalhos em grupo.",
   ctx:"Repara: é combinado, intencional e repetido.",b:true,
   ex:"Isso é bullying social ou relacional. Exclusão intencional deixa marcas emocionais profundas — mesmo sem toque físico.",
   ok:"Muito bem! Excluir alguém de propósito é violência — mesmo sem toque físico. 💜",
   no:"É sim bullying! A exclusão intencional e repetida é uma forma grave de violência social."},
  {t:"Rafael chamou Daniela de apelido feio uma vez no recreio. Ela pediu pra parar, ele pediu desculpa e não repetiu.",
   ctx:"Repara: aconteceu uma só vez e foi resolvido.",b:false,
   ex:"Não é bullying neste caso. Quando alguém respeita o pedido para parar, não caracteriza bullying. A resolução importa!",
   ok:"Certo! Respeito e reconhecimento do erro não configuram bullying.",
   no:"Não é bullying aqui! Ele respeitou o pedido e não repetiu — isso é diferente de bullying."},
  {t:"Toda semana na educação física, um grupo imita o jeito de correr de Rodrigo e todos riem. Ele chega em casa chorando.",
   ctx:"Repara: toda semana, em grupo, com intenção de humilhar.",b:true,
   ex:"Bullying verbal em grupo. A humilhação pública repetida causa danos emocionais sérios e precisa ser reportada a um adulto.",
   ok:"Na mosca! Humilhação pública repetida é bullying verbal. O Rodrigo precisa de apoio! ⚖️",
   no:"É sim! Imitar para humilhar, toda semana, em grupo, é bullying verbal."},
  {t:"A professora tirou 5 pontos do trabalho de Ana porque ela entregou um dia atrasado.",
   ctx:"Repara: a professora tem autoridade para avaliar alunos.",b:false,
   ex:"Não é bullying! Professores têm autoridade pedagógica. Bullying acontece entre pessoas na mesma posição de poder — entre colegas.",
   ok:"Correto! Consequências pedagógicas são diferentes de bullying.",
   no:"Não é bullying! Professores têm o papel de avaliar alunos — isso é diferente de perseguição."},
  {t:"Pedro e Kaio barram a saída do banheiro para Carlos toda semana e pedem o lanche dele ameaçando bater.",
   ctx:"Repara: toda semana, com ameaça física e intimidação.",b:true,
   ex:"Isso é bullying grave com intimidação e extorsão. Carlos precisa contar para um adulto de confiança imediatamente.",
   ok:"Correto! Ameaça e extorsão são formas gravíssimas de bullying. Peça ajuda agora! 🚨",
   no:"É gravíssimo! Ameaça física + extorsão = bullying grave. Isso precisa ser reportado urgentemente!"}
];

// ── 10-12 anos: flip cards com linguagem clara ──
const FLIP_D=[
  {icon:"👊",type:"Físico",color:"#ff4466",
   ex:"Empurrões, socos, chutes, roubo de objetos, danos a pertences.",
   alert:"Marcas no corpo, roupas rasgadas, medo do intervalo ou da escola.",
   act:"Afaste-se da situação. Conte para um professor, orientador ou familiar imediatamente.",
   lei:"Lei nº 14.811/2024 prevê responsabilização"},
  {icon:"🗣️",type:"Verbal",color:"#f59e0b",
   ex:"Apelidos ofensivos, xingamentos, ameaças, humilhação pública em sala.",
   alert:"Tristeza após intervalos, não quer ir à escola, isolamento, baixa autoestima.",
   act:"Não responda às provocações. Guarde registros (anotações de data/hora) e conte para um adulto.",
   lei:"Pode gerar processo por injúria e calúnia"},
  {icon:"👥",type:"Social",color:"#b45aff",
   ex:"Exclusão proposital de grupos, espalhar mentiras para isolar, impedir amizades.",
   alert:"Sempre sozinho(a), sem amigos na escola, parece triste sem motivo aparente.",
   act:"Seja aliado(a): inclua, converse, chame para participar. Avise um adulto discretamente.",
   lei:"Dano moral reconhecido pela justiça"},
  {icon:"📱",type:"Cyberbullying",color:"#00d4ff",
   ex:"Posts humilhantes, perfil falso, mensagens de ódio, exposição de fotos sem permissão.",
   alert:"Ansiedade ao usar celular, evita redes sociais, chora após usar o celular.",
   act:"Não responda. Salve prints. Bloqueie. Conte para um adulto. Denuncie na plataforma.",
   lei:"Crime previsto na Lei nº 14.811/2024 e Lei Carolina Dieckmann"}
];

// ── 13-18 anos: quiz com cenários complexos e contexto legal ──
const TEEN_Q=[
  {t:"Henrique sofre apelidos sobre sua aparência desde o 1º ano do ensino médio. Os comentários acontecem diariamente no grupo da turma e na escola.",
   ctx:"Contexto: repetição sistemática, ambiente escolar e digital.",b:true,
   ex:"Bullying verbal + cyberbullying simultâneos. A Lei nº 14.811/2024 determina que a escola tem obrigação de agir ao tomar conhecimento do caso.",
   ok:"Correto! Esse é um caso claro que envolve múltiplos ambientes e exige ação institucional imediata.",
   no:"É bullying grave. A repetição, a intencionalidade e o impacto emocional documentado caracterizam claramente bullying."},
  {t:"Dois amigos discutiram por mensagem sobre quem usaria o microfone no trabalho. Um bloqueou o outro e depois desculparam.",
   ctx:"Contexto: conflito pontual resolvido voluntariamente.",b:false,
   ex:"Conflito interpessoal resolvido pelos próprios envolvidos. Bullying pressupõe desequilíbrio de poder, intencionalidade e repetição sistemática.",
   ok:"Exato! Conflitos pontuais com resolução espontânea não configuram bullying.",
   no:"Não é bullying. A ausência de repetição e a resolução voluntária diferem esse caso de bullying."},
  {t:"Sofia percebeu que toda vez que responde em aula, um grupo de colegas suspira, rola os olhos e ri. O professor nunca intervém.",
   ctx:"Contexto: intimidação sistemática com conivência institucional.",b:true,
   ex:"Bullying social e verbal com omissão institucional. Quando a escola tolera ou ignora o bullying, viola a Lei nº 14.811/2024 que responsabiliza a instituição.",
   ok:"Sim. O padrão sistemático e a omissão institucional configuram bullying com responsabilidade da escola.",
   no:"É bullying. A sistematicidade e a omissão do professor caracterizam a situação — e responsabilizam a escola."},
  {t:"Alguém criou um formulário anônimo 'avalie seus colegas' e compartilhou na turma. Comentários cruéis sobre corpos e inteligência foram publicados.",
   ctx:"Contexto: cyberbullying coletivo com anonimato.",b:true,
   ex:"Cyberbullying coletivo. O anonimato não isenta de responsabilidade legal. A Lei nº 14.811/2024 e o Marco Civil da Internet permitem identificação de autores.",
   ok:"Correto! O anonimato não protege legalmente os autores — plataformas podem ser obrigadas a revelar dados.",
   no:"É cyberbullying. O anonimato online não elimina a responsabilidade civil e criminal dos autores."},
  {t:"Lucas entrou no time de futebol e os veteranos exigem que ele carregue as mochilas e faça tarefas para eles. Dizem que é 'tradição'.",
   ctx:"Contexto: assédio hierárquico com justificativa cultural.",b:true,
   ex:"Isso é bullying hierárquico e pode ser caracterizado como assédio moral. 'Tradição' não justifica violência ou humilhação — há base legal para punição.",
   ok:"Sim. Imposição de tarefas humilhantes com ameaça implícita configura bullying, independente de 'tradições'.",
   no:"É bullying. A justificativa de 'tradição' não tem respaldo legal e não elimina o caráter violento da situação."},
  {t:"Beatriz compartilhou uma conversa particular com uma amiga que estava sofrendo em sigilo. O grupo leu e começou a caçoar dela.",
   ctx:"Contexto: violação de privacidade com consequências de bullying.",b:true,
   ex:"A Beatriz cometeu violação de privacidade (crime pelo Marco Civil) que resultou em bullying. Há responsabilidade de quem compartilhou e de quem humilhou.",
   ok:"Correto. Há dupla responsabilidade: violação de privacidade + bullying resultante.",
   no:"É uma situação grave com duas infrações: violação de privacidade e bullying. Ambas têm respaldo legal."},
  {t:"A professora de educação física sempre escolhe os mesmos alunos como líderes e ignora visivelmente dois alunos nas aulas.",
   ctx:"Contexto: tratamento diferenciado por autoridade.",b:false,
   ex:"Pode ser favoritism ou negligência pedagógica, mas não bullying no sentido técnico-legal. Bullying ocorre entre pares, não de autoridade para aluno — isso pode ser assédio institucional.",
   ok:"Análise correta! Conduta de professores é assédio institucional, não bullying — mas igualmente punível.",
   no:"Não é bullying no sentido legal — é conduta inadequada de autoridade, que pode configurar assédio institucional, igualmente punível."},
  {t:"Mateus encontra bilhetes com ameaças na mochila toda semana. Não sabe quem manda. Está com medo de ir à escola.",
   ctx:"Contexto: ameaça anônima sistemática com impacto severo.",b:true,
   ex:"Bullying grave com ameaças — crime previsto no Código Penal (art. 147). A escola tem obrigação legal de investigar e acionar autoridades. O Mateus deve reportar imediatamente.",
   ok:"Correto. Ameaças anônimas sistemáticas são bullying grave e crime. Requer BO e ação da escola. 🚨",
   no:"É bullying grave e crime. Ameaças sistemáticas exigem Boletim de Ocorrência e ação imediata da escola."}
];

// ── 13-18 anos: flip cards com contexto legal ──
const TEEN_FLIP=[
  {icon:"👊",type:"Físico",color:"#ff4466",
   ex:"Agressão física, constrangimento, destruição de pertences, intimidação com contato.",
   alert:"Lesões físicas, evitar espaços específicos, chegar machucado sem explicação.",
   act:"Documente com fotos se houver marcas. Registre Boletim de Ocorrência. Acione a orientação escolar.",
   lei:"Lesão corporal dolosa — Código Penal art. 129. Lei nº 14.811/2024"},
  {icon:"🗣️",type:"Verbal",color:"#f59e0b",
   ex:"Humilhação sistemática, ameaças, difamação, calúnia, apelidos ofensivos repetidos.",
   alert:"Isolamento progressivo, queda de rendimento, ansiedade antes de ir à escola.",
   act:"Registre datas, locais e testemunhas. Relate à orientação e exija registro formal da escola.",
   lei:"Injúria (CP art. 140), Calúnia (CP art. 138). Dano moral indenizável"},
  {icon:"👥",type:"Social",color:"#b45aff",
   ex:"Exclusão sistemática, campanha de difamação, manipulação de relações sociais.",
   alert:"Ausência de amizades, comportamento recluso, relatos de exclusão proposital.",
   act:"Documente padrões. Envolva família e orientação. A escola tem obrigação legal de intervir.",
   lei:"Dano moral reconhecido pelo STJ. Responsabilidade solidária da escola"},
  {icon:"📱",type:"Cyberbullying",color:"#00d4ff",
   ex:"Exposição não consentida de imagens, perfis falsos, incitação ao ódio online, doxxing.",
   alert:"Ansiedade com notificações, exclusão de grupos online, comportamento alterado após uso do celular.",
   act:"Preserve prints (não delete nada). Denuncie nas plataformas. Registre BO. A escola e o MP podem agir.",
   lei:"Lei nº 14.811/2024. Marco Civil da Internet. Lei Carolina Dieckmann. CP art. 147-A"}
];

// ── 13-18 anos: steps aliado ──
const ALI_STEPS=[
  {icon:"👀",t:"Reconheça — sem minimizar",
   d:"Bullying não é 'briga de crianças' nem 'drama'. Se você viu e sentiu que algo estava errado, provavelmente estava. Seu senso de justiça importa.",
   extra:""},
  {icon:"🤝",t:"Apoie a vítima — sem se expor desnecessariamente",
   d:"Após a situação, aborde a pessoa em particular. Diga: <em>'Eu vi o que aconteceu. Você não está sozinho(a). Posso ajudar?'</em> Não enfrente o agressor publicamente — isso pode escalar.",
   script:"'Eu vi o que aconteceu. Isso não foi certo. Estou aqui se você precisar.'"},
  {icon:"📝",t:"Documente se possível",
   d:"Se você testemunhou, anotar data, local, o que aconteceu e quem estava presente pode ser crucial para um processo formal. Você pode ser testemunha oficial.",
   extra:""},
  {icon:"🏫",t:"Acione a escola formalmente",
   d:"Contar para um adulto não é 'dedurar' — é exercer cidadania. Peça que a escola registre formalmente a ocorrência. A Lei nº 14.811/2024 obriga a escola a agir.",
   script:"'Preciso relatar algo que vi. Quero que fique registrado formalmente na escola.'"},
  {icon:"⚖️",t:"Saiba o que pode acontecer",
   d:"A escola tem obrigação legal de abrir apuração, notificar famílias e tomar medidas protetivas. O agressor pode responder pelo ECA (se menor) ou penalmente (se maior de 18).",
   extra:""}
];

// ── 13-18 anos: checklist acolhimento ──
const ACOL_CHECKS=[
  "O que acontece comigo se repete — não foi só uma vez",
  "A pessoa (ou grupo) faz isso de propósito, não é coincidência",
  "Tenho evitado ir à escola, ao intervalo ou a lugares por causa disso",
  "Já fui humilhado(a), ameaçado(a) ou excluído(a) publicamente",
  "Isso está me causando ansiedade, tristeza ou medo constante",
  "Já pedi para parar e não respeitaram",
  "Tenho evitado usar redes sociais por causa de mensagens ou comentários",
  "Sinto que não há ninguém em quem eu possa confiar na escola"
];

// ── 13-18 anos: accordion por que é difícil contar ──
const ACOL_ACC=[
  {emoji:"😰",h:"'Tenho medo de que piore se eu contar.'",
   body:`Esse medo é compreensível e muito comum. Mas pesquisas mostram que o silêncio geralmente beneficia o agressor — ele se sente protegido pela impunidade.<div class="acc-hl purple">Quando um adulto de confiança intervém com estratégia, o risco de retaliação cai significativamente. Você pode pedir sigilo ao fazer a denúncia.</div>`},
  {emoji:"😔",h:"'Ninguém vai acreditar em mim sem provas.'",
   body:`Você não precisa de provas para ser ouvido(a). Se tiver prints, anotações de datas ou testemunhas, melhor — mas relatos consistentes já abrem investigação.<div class="acc-hl blue">'Não precisa ser perfeito para pedir ajuda. Só precisa começar.'</div>`},
  {emoji:"🥺",h:"'Tenho vergonha — parece fraqueza pedir ajuda.'",
   body:`Pedir ajuda diante de uma injustiça é um ato de coragem e inteligência. Os maiores ativistas da história construíram mudanças pedindo apoio.<div class="acc-hl gold">Você não é fraco(a) por estar sofrendo. Você está respondendo com sensibilidade a uma violência real.</div>`},
  {emoji:"⚖️",h:"'Não sei se o que acontece comigo é grave o suficiente.'",
   body:`A Lei nº 14.811/2024 não exige que você espere a violência 'piorar' para agir. Padrões repetidos — mesmo que 'pequenos' — já caracterizam bullying e têm respaldo legal.<div class="acc-hl green">Você não precisa esperar uma agressão física para ter direito à proteção. O impacto emocional já é suficiente.</div>`},
  {emoji:"💭",h:"'Talvez eu tenha provocado de alguma forma.'",
   body:`<strong>Nenhuma provocação justifica bullying.</strong> Mesmo em conflitos mútuos, a resposta com violência sistemática não é proporcional nem legal. A responsabilidade da agressão é sempre de quem agride.<div class="acc-hl purple">A culpa nunca é da vítima. Nunca.</div>`}
];

// ── 13-18 anos: direitos ──
const DIREITOS=[
  {icon:"🔒",t:"Sigilo da denúncia",h:"toque para saber",
   back:"Você pode exigir que seu nome não seja revelado ao agressor ou à turma durante a apuração. Peça isso por escrito ao apresentar a denúncia.",lei:"Lei nº 14.811/2024 — Art. 5º"},
  {icon:"🏫",t:"Ambiente escolar seguro",h:"toque para saber",
   back:"A escola tem obrigação legal de garantir um ambiente livre de violência. Isso inclui corredores, recreios, grupos de WhatsApp da turma e eventos escolares.",lei:"Lei nº 14.811/2024 / ECA Art. 53"},
  {icon:"🧠",t:"Apoio psicológico gratuito",h:"toque para saber",
   back:"Você tem direito a atendimento psicológico pelo CAPS ou pela rede de saúde municipal. A escola pode acionar o Conselho Tutelar para garantir esse apoio.",lei:"Lei nº 14.811/2024 — Art. 5º"},
  {icon:"⚖️",t:"Responsabilização legal",h:"toque para saber",
   back:"O agressor pode responder pelo ECA (se menor de 18) ou penalmente (se adulto). A escola pode ser responsabilizada civilmente por omissão.",lei:"Lei nº 14.811/2024 / CP / ECA"},
  {icon:"📋",t:"Registro formal e acompanhamento",h:"toque para saber",
   back:"Você tem direito de exigir que a escola registre formalmente a ocorrência e te informe sobre as medidas tomadas. Isso é obrigação — não favor.",lei:"Lei nº 14.811/2024 — Art. 5º"},
  {icon:"🚨",t:"Acesso ao Conselho Tutelar",h:"toque para saber",
   back:"Se a escola se omitir, você ou sua família podem acionar diretamente o Conselho Tutelar (136) ou o Ministério Público da Educação.",lei:"ECA — Art. 98 / Art. 136"}
];

// ══════════════════════════════════════
// ESTADO
// ══════════════════════════════════════
let KS={cur:0,ok:0,answered:false};
let MS={cur:0,ok:0,no:0,answered:false,flipped:0};
let TS={phase:0,cur:0,ok:0,no:0,answered:false,flipped:0,aliStep:0,checked:new Set()};

// ══════════════════════════════════════
// NAVEGAÇÃO
// ══════════════════════════════════════
let alunosPinObserver = null;

function setHomeChromeVisible(visible) {
  const banner = document.getElementById('alunosHomeBanner');
  if (banner) banner.hidden = !visible;
}

function setAlunosPhase(phase) {
  document.body.classList.remove('alunos-phase-greeting', 'alunos-phase-selector', 'alunos-phase-game');
  if (phase) document.body.classList.add(`alunos-phase-${phase}`);
}

function stopAlunosPinWatch() {
  if (alunosPinObserver) {
    alunosPinObserver.disconnect();
    alunosPinObserver = null;
  }
}

function getAlunosChromeOffset() {
  const nav = document.getElementById('navbar');
  const tabs = document.querySelector('.edu-tabs-wrap');
  return (nav?.offsetHeight || 72) + (tabs?.offsetHeight || 56) + 8;
}

function updateAlunosChromeOffset() {
  const nav = document.getElementById('navbar');
  const tabs = document.querySelector('.edu-tabs-wrap');
  const banner = document.getElementById('alunosHomeBanner');
  let offset = (nav?.offsetHeight || 72) + (tabs?.offsetHeight || 56);
  if (document.body.classList.contains('home-faixa-ready') && banner) {
    offset += banner.offsetHeight;
  }
  document.documentElement.style.setProperty('--alunos-chrome-offset', `${offset + 4}px`);
}

function pinAlunosScreen(screenId) {
  updateAlunosChromeOffset();
  const screen = document.getElementById(screenId);
  if (!screen?.classList.contains('active')) return;

  if (document.body.classList.contains('alunos-phase-greeting')
    || document.body.classList.contains('alunos-phase-selector')) {
    return;
  }

  const run = () => {
    updateAlunosChromeOffset();
    const el = document.getElementById(screenId);
    if (!el?.classList.contains('active')) return;
    const top = el.getBoundingClientRect().top + window.scrollY - getAlunosChromeOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  };

  requestAnimationFrame(() => requestAnimationFrame(run));
  window.setTimeout(run, 80);
  window.setTimeout(run, 280);
  if (document.fonts?.ready) document.fonts.ready.then(run).catch(() => {});
}

function watchAlunosPin(screenId) {
  stopAlunosPinWatch();
  const screen = document.getElementById(screenId);
  if (!screen || !('ResizeObserver' in window)) return;

  alunosPinObserver = new ResizeObserver(() => {
    updateAlunosChromeOffset();
    if (!document.body.classList.contains('alunos-phase-greeting')
      && !document.body.classList.contains('alunos-phase-selector')) {
      pinAlunosScreen(screenId);
    }
  });
  alunosPinObserver.observe(document.body);
  const banner = document.getElementById('alunosHomeBanner');
  if (banner) alunosPinObserver.observe(banner);
  document.getElementById('navbar') && alunosPinObserver.observe(document.getElementById('navbar'));
  document.querySelector('.edu-tabs-wrap') && alunosPinObserver.observe(document.querySelector('.edu-tabs-wrap'));
}

function showSelectorScreen() {
  document.body.classList.add('home-faixa-ready');
  setAlunosPhase('selector');
  document.getElementById('screen-selector')?.classList.add('active', 'fade-in');
  setHomeChromeVisible(true);
  updateAlunosChromeOffset();
  watchAlunosPin('screen-selector');
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

/** Volta ao seletor de faixa (sem reabrir o vídeo de saudação). */
function showHomeScreens() {
  showSelectorScreen();
}

function hideHomeScreens() {
  document.getElementById('screen-selector')?.classList.remove('active');
}

function goMode(m){
  stopAlunosPinWatch();
  document.body.classList.remove('home-faixa-ready');
  setAlunosPhase('game');
  hideHomeScreens();
  setHomeChromeVisible(false);
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const target = document.getElementById('screen-'+m);
  if (!target) return;
  target.classList.add('active');
  pinAlunosScreen('screen-'+m);
  if(m==='kids')initKids();
  else if(m==='medio')initMedio();
  else initTeen();
  if (window.JU_VOZ) {
    JU_VOZ.unlock();
    JU_VOZ.setFaixa(m === 'kids' ? 'kids' : m === 'medio' ? 'medio' : 'teen');
  }
}
function scrollToActiveScreen(screenId) {
  pinAlunosScreen(screenId);
}

function goBack(){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  showSelectorScreen();
  initSelectorJu();
}

// ══════════════════════════════════════
// MODO KIDS 6-9
// ══════════════════════════════════════
function initKids(){
  KS={cur:0,ok:0,answered:false};
  renderKDots();renderKQ();
  window.setTimeout(()=>JU_VOZ.falarSom('saudacao'),600);
}
function renderKDots(){
  const d=document.getElementById('kprog');d.innerHTML='';
  KIDS_Q.forEach((_,i)=>{
    const dot=document.createElement('div');dot.className='kd';
    if(i<KS.cur)dot.classList.add('done');
    else if(i===KS.cur)dot.classList.add('active');
    d.appendChild(dot);
  });
}
function renderKQ(){
  if(KS.cur>=KIDS_Q.length){showKResult();return;}
  const q=KIDS_Q[KS.cur];KS.answered=false;
  document.getElementById('kids-balloon').innerHTML=`Pergunta ${KS.cur+1} de ${KIDS_Q.length}! 🤔`;
  document.getElementById('kids-content').innerHTML=`
    <div class="kcard fade-in">
      <span class="k-emoji">${q.emoji}</span>
      <div class="k-question">${q.q}</div>
      ${q.sub?`<div class="k-tip">${q.sub}</div>`:''}
    </div>
    <div class="kbtns">
      <button class="kbtn kb-b" onclick="answerK(true)"><span class="bicon">🚨</span>É bullying!</button>
      <button class="kbtn kb-n" onclick="answerK(false)"><span class="bicon">✅</span>Não é!</button>
    </div>
    <div id="kfb"></div>`;
}
function answerK(u){
  if(KS.answered)return;KS.answered=true;
  const q=KIDS_Q[KS.cur];const ok=(u===q.a);
  if(ok){KS.ok++;juAcertou();}else{juErrou();}
  const stars=ok?3:1;
  let sh='';for(let i=0;i<3;i++)sh+=`<span class="star" style="animation-delay:${i*.15}s">${i<stars?'⭐':'☆'}</span>`;
  document.getElementById('kfb').innerHTML=`
    <div class="stars">${sh}</div>
    <div class="kfb ${ok?'ok':'no'}">${ok?'🎉 ':'💙 '}${ok?q.ok:q.no}</div>
    ${KS.cur+1<KIDS_Q.length
      ?`<button class="knext" onclick="nextK()">Próxima pergunta ▶</button>`
      :`<button class="knext" onclick="showKResult()">Ver meu resultado! 🏆</button>`}`;
  document.getElementById('kids-balloon').innerHTML=ok?q.jatok:q.jatnok;
}
function nextK(){KS.cur++;renderKDots();renderKQ();}
function showKResult(){
  const pct=Math.round(KS.ok/KIDS_Q.length*100);
  let em,tit,msg,st;
  if(pct>=75){em='🏆';tit='Você é incrível!';msg='Você sabe muito sobre bullying! Continue sendo um amigo(a) especial para todo mundo na escola! 💜';st=3;}
  else if(pct>=50){em='⭐';tit='Muito bem!';msg='Você está aprendendo bastante! Continue aprendendo com a Ju — você vai arrasar! 🌟';st=2;}
  else{em='💙';tit='Continue tentando!';msg='Está ficando cada vez melhor! A Ju acredita em você — cada aprendizado conta! 🤍';st=1;}
  document.getElementById('kids-balloon').innerHTML=`${em} ${tit}! Você foi incrível!`;
  document.getElementById('kprog').innerHTML='';
  let sh='';for(let i=0;i<3;i++)sh+=`<span class="star" style="animation-delay:${i*.2}s;font-size:32px">${i<st?'⭐':'☆'}</span>`;
  document.getElementById('kids-content').innerHTML=`
    <div class="kresult fade-in">
      <span class="kres-emoji">${em}</span>
      <div class="kres-title">${tit}</div>
      <div class="stars">${sh}</div>
      <div class="kres-msg">${msg}<br><br>Você acertou <strong>${KS.ok} de ${KIDS_Q.length}</strong> perguntas!</div>
      <button class="kres-btn p" onclick="window.location.href='ouvidoria.html'">💬 Preciso de ajuda</button>
      <button class="kres-btn s" onclick="initKids()">🔄 Jogar de novo</button>
    </div>`;
  JU_FALA.parabens();
  fireConfetti();
}

// ══════════════════════════════════════
// MODO MÉDIO 10-12
// ══════════════════════════════════════
function initMedio(){
  MS={cur:0,ok:0,no:0,answered:false,flipped:0};
  document.getElementById('m-ok').textContent='0';
  document.getElementById('m-no').textContent='0';
  document.getElementById('medio-flip').style.display='none';
  renderMDots();renderMQ();
}
function renderMDots(){
  const d=document.getElementById('m-dots');d.innerHTML='';
  MEDIO_Q.forEach((_,i)=>{
    const dot=document.createElement('div');dot.className='pdot';
    if(i<MS.cur)dot.classList.add('done');else if(i===MS.cur)dot.classList.add('active');
    d.appendChild(dot);
  });
}
function setBlnM(txt,cls=''){
  const b=document.getElementById('bln-m');
  b.className='arena-bln left'+(cls?' '+cls:'');
  document.getElementById('bln-m-txt').textContent=txt;
}
function renderMQ(){
  if(MS.cur>=MEDIO_Q.length){showMFlip();return;}
  const q=MEDIO_Q[MS.cur];MS.answered=false;
  setBlnM('Analise este cenário com atenção!');
  document.getElementById('m-hud').textContent=`OK:${MS.ok} | ERR:${MS.no} | CEN ${MS.cur+1}/${MEDIO_Q.length}`;
  document.getElementById('m-status').textContent='● ANALISANDO';
  document.getElementById('medio-content').innerHTML=`
    <div class="gc fade-in">
      <div class="gc-label">CENÁRIO ${MS.cur+1} DE ${MEDIO_Q.length}</div>
      <div class="gc-text">${q.t}</div>
      ${q.ctx?`<div class="gc-context">💡 ${q.ctx}</div>`:''}
    </div>
    <div class="opt-grid" id="m-opts">
      <button class="opt" onclick="answerM(true)" id="mo-b"><div class="opt-letter">B</div><div class="opt-text">🚨 É bullying</div></button>
      <button class="opt" onclick="answerM(false)" id="mo-n"><div class="opt-letter">N</div><div class="opt-text">✅ Não é bullying</div></button>
    </div>
    <div id="m-fb"></div>`;
}
function answerM(u){
  if(MS.answered)return;MS.answered=true;
  const q=MEDIO_Q[MS.cur];const ok=(u===q.b);
  if(ok){MS.ok++;document.getElementById('m-ok').textContent=MS.ok;juAcertou();}
  else{MS.no++;document.getElementById('m-no').textContent=MS.no;juErrou();}
  ['mo-b','mo-n'].forEach(id=>document.getElementById(id).disabled=true);
  document.getElementById(q.b?'mo-b':'mo-n').classList.add('certa');
  if(!ok)document.getElementById(q.b?'mo-n':'mo-b').classList.add('errada');
  setBlnM(ok?q.ok:q.no,ok?'bln-green':'bln-pink');
  document.getElementById('m-status').textContent=ok?'● CORRETO ✓':'● INCORRETO ✗';
  document.getElementById('m-fb').innerHTML=`
    <div class="fb ${ok?'ok':'no'} fade-in"><strong>${ok?'✅ Correto!':'🤔 Não exatamente!'}</strong> ${q.ex}</div>
    <div style="text-align:center">
      <button class="btn-next" onclick="nextM()">${MS.cur+1<MEDIO_Q.length?'Próximo cenário ▶':'Ver os 4 tipos de bullying ▶'}</button>
    </div>`;
}
function nextM(){MS.cur++;renderMDots();renderMQ();}
function showMFlip(){
  document.getElementById('m-dots').innerHTML='';
  document.getElementById('medio-content').innerHTML='';
  document.getElementById('medio-flip').style.display='block';
  setBlnM('Agora descubra os 4 tipos de bullying — toque em cada card!','bln-purple');
  document.getElementById('m-status').textContent='● EXPLORANDO';
  const grid=document.getElementById('m-flip-grid');grid.innerHTML='';MS.flipped=0;
  FLIP_D.forEach(f=>{
    const c=document.createElement('div');c.className='flip-card';
    c.innerHTML=`<div class="flip-inner">
      <div class="flip-front"><div class="fi" style="color:${f.color}">${f.icon}</div>
        <div class="ft" style="color:${f.color}">${f.type}</div>
        <div class="fh">▸ toque para revelar</div></div>
      <div class="flip-back" style="border-color:${f.color}">
        <div class="fbt" style="color:${f.color}">${f.icon} ${f.type.toUpperCase()}</div>
        <div class="fbl" style="color:${f.color}">Exemplo:</div><div class="fbd">${f.ex}</div>
        <div class="fbl" style="color:#ff9999">Sinal:</div><div class="fbd">${f.alert}</div>
        <div class="fbl" style="color:#00ff88">O que fazer:</div><div class="fbd">${f.act}</div>
        <div class="fbl" style="color:#ffd700;margin-top:4px">⚖️</div><div class="fbd" style="color:rgba(255,215,0,.7)">${f.lei}</div>
      </div></div>`;
    c.onclick=()=>{
      if(c.classList.contains('flipped'))return;
      c.classList.add('flipped');MS.flipped++;
      const msgs=['Ótimo! Mais 3 para descobrir!','Dois revelados! Continue!','Quase lá!','Todos revelados! Você conhece os 4 tipos! 🎉'];
      setBlnM(msgs[MS.flipped-1],'bln-purple');
      if(MS.flipped===FLIP_D.length)setTimeout(()=>showMFinal(),500);
    };
    grid.appendChild(c);
  });
}
function showMFinal(){
  const sc=MS.ok;const tot=MEDIO_Q.length;const pct=Math.round(sc/tot*100);
  let em,tit,msg,st;
  if(pct>=75){em='🏆';tit='Mestre da Justiça!';msg='Você domina o tema! Continue sendo um aliado de verdade e ajudando quem precisa.';st=3;}
  else if(pct>=50){em='⭐';tit='Guardião(ã) da Justiça!';msg='Bom trabalho! Você está aprendendo muito sobre bullying.';st=2;}
  else{em='💪';tit='Aprendiz da Justiça!';msg='Cada aprendizado importa! Continue praticando com a Ju.';st=1;}
  setBlnM('Parabéns! Você concluiu o Desafio da Ju! ⚖️','bln-gold');
  let sh='';for(let i=0;i<3;i++)sh+=`<span class="rstar" style="animation-delay:${i*.2}s">${i<st?'⭐':'☆'}</span>`;
  document.getElementById('m-flip-done').style.display='block';
  document.getElementById('m-flip-done').innerHTML=`
    <div class="result-final fade-in">
      <span class="rf-emoji">${em}</span>
      <div class="rf-title">${tit}</div>
      <div class="rf-score">${sc}/${tot}</div>
      <div class="rf-stars">${sh}</div>
      <div class="rf-msg">${msg}</div>
      <button class="btn-next" style="margin:0 auto;display:block" onclick="initMedio()">🔄 Jogar de novo</button>
    </div>
    <div class="ouv-card">
      <div class="ouv-title">PROJETO REACT — VOCÊ NÃO ESTÁ SOZINHO(A)</div>
      <div class="ouv-sub">Se você ou alguém que conhece está sofrendo bullying, fale com um adulto de confiança ou acesse a ouvidoria do Projeto REACT.</div>
      <div class="ouv-btns">
        <button class="btn-ouv p" onclick="window.location.href='ouvidoria.html'">💬 Ouvidoria REACT</button>
        <button class="btn-ouv s" onclick="window.open('https://cvv.org.br','_blank')">📞 CVV 188</button>
      </div>
    </div>`;
  JU_FALA.parabens();
  fireConfetti();
}

// ══════════════════════════════════════
// MODO TEEN 13-18
// ══════════════════════════════════════
function initTeen(){
  TS={phase:0,cur:0,ok:0,no:0,answered:false,flipped:0,aliStep:0,checked:new Set()};
  updateTTabs();renderTPhase();
}
function updateTTabs(){
  [0,1,2,3].forEach(i=>{
    const t=document.getElementById('ttab'+i);
    if(i===TS.phase){t.className='ttab active';}else{t.className='ttab';}
  });
  document.getElementById('t-hud').textContent=`FASE ${TS.phase+1}/4`;
}
function setBlnT(txt,pos='left',cls=''){
  const b=document.getElementById('bln-t');
  b.className='arena-bln '+pos+(cls?' '+cls:'');
  document.getElementById('bln-t-txt').textContent=txt;
}
function renderTPhase(){
  document.getElementById('teen-final').style.display='none';
  const c=document.getElementById('teen-content');
  if(TS.phase===0)renderTQuiz(c);
  else if(TS.phase===1)renderTFlip(c);
  else if(TS.phase===2)renderTAliado(c);
  else renderTAcolhimento(c);
}

// Fase 1 teen: quiz
function renderTQuiz(c){
  if(TS.cur>=TEEN_Q.length){TS.phase=1;updateTTabs();renderTPhase();return;}
  const q=TEEN_Q[TS.cur];TS.answered=false;
  setBlnT('Analise o contexto completo antes de responder.');
  document.getElementById('t-status').textContent='● ANALISANDO';
  let dh='<div class="dots-row">';
  TEEN_Q.forEach((_,i)=>{dh+=`<div class="pdot ${i<TS.cur?'done':i===TS.cur?'active':''}"></div>`;});
  dh+='</div>';
  dh+=`<div class="score-row"><div class="sc"><div class="scd ok"></div>${TS.ok} corretas</div><div class="sc"><div class="scd no"></div>${TS.no} erradas</div></div>`;
  c.innerHTML=dh+`
    <div class="gc fade-in">
      <div class="gc-label">CENÁRIO ${TS.cur+1} DE ${TEEN_Q.length}</div>
      <div class="gc-text">${q.t}</div>
      ${q.ctx?`<div class="gc-context">📌 ${q.ctx}</div>`:''}
    </div>
    <div class="opt-grid" id="t-opts">
      <button class="opt" onclick="answerT(true)" id="to-b"><div class="opt-letter">B</div><div class="opt-text">🚨 É bullying</div></button>
      <button class="opt" onclick="answerT(false)" id="to-n"><div class="opt-letter">N</div><div class="opt-text">✅ Não é bullying</div></button>
    </div>
    <div id="t-fb"></div>`;
}
function answerT(u){
  if(TS.answered)return;TS.answered=true;
  const q=TEEN_Q[TS.cur];const ok=(u===q.b);
  if(ok){TS.ok++;juAcertou();}else{TS.no++;juErrou();}
  ['to-b','to-n'].forEach(id=>document.getElementById(id).disabled=true);
  document.getElementById(q.b?'to-b':'to-n').classList.add('certa');
  if(!ok)document.getElementById(q.b?'to-n':'to-b').classList.add('errada');
  setBlnT(ok?q.ok:q.no,'left',ok?'bln-green':'bln-pink');
  document.getElementById('t-status').textContent=ok?'● CORRETO ✓':'● INCORRETO ✗';
  document.getElementById('t-fb').innerHTML=`
    <div class="fb ${ok?'ok':'no'} fade-in"><strong>${ok?'✅ Análise correta!':'🤔 Reconsidere:'}</strong> ${q.ex}</div>
    <div style="text-align:center">
      <button class="btn-next" onclick="nextT()">${TS.cur+1<TEEN_Q.length?'Próximo cenário ▶':'Fase 2: Os 4 Tipos ▶'}</button>
    </div>`;
}
function nextT(){TS.cur++;renderTPhase();}

// Fase 2 teen: flip
function renderTFlip(c){
  TS.flipped=0;
  setBlnT('Conheça os 4 tipos — e o respaldo legal de cada um.','right','bln-purple');
  document.getElementById('t-status').textContent='● FASE 2';
  c.innerHTML=`
    <div style="text-align:center;margin-bottom:12px">
      <div class="phase-badge">FASE 2 — OS 4 TIPOS + BASE LEGAL</div>
      <div style="font-size:13px;color:rgba(180,200,255,.6);margin-top:4px">Revelados: <span id="t-flip-cnt" style="color:var(--nb);font-weight:900">0</span>/4</div>
    </div>
    <div class="flip-grid" id="t-flip-grid"></div>
    <div id="t-flip-done" style="display:none;text-align:center">
      <button class="btn-primary" onclick="TS.phase=2;updateTTabs();renderTPhase()">Fase 3: Missão Aliado 🛡️ ▶</button>
    </div>`;
  const grid=document.getElementById('t-flip-grid');
  TEEN_FLIP.forEach(f=>{
    const card=document.createElement('div');card.className='flip-card';
    card.innerHTML=`<div class="flip-inner">
      <div class="flip-front"><div class="fi" style="color:${f.color};filter:drop-shadow(0 0 7px ${f.color})">${f.icon}</div>
        <div class="ft" style="color:${f.color};text-shadow:0 0 8px ${f.color}">${f.type}</div>
        <div class="fh">▸ TOQUE PARA REVELAR</div></div>
      <div class="flip-back" style="border-color:${f.color}">
        <div class="fbt" style="color:${f.color}">${f.icon} ${f.type.toUpperCase()}</div>
        <div class="fbl" style="color:${f.color}">Exemplo:</div><div class="fbd">${f.ex}</div>
        <div class="fbl" style="color:#ff9999">Sinal:</div><div class="fbd">${f.alert}</div>
        <div class="fbl" style="color:#00ff88">O que fazer:</div><div class="fbd">${f.act}</div>
        <div class="fbl" style="color:#ffd700;margin-top:3px">⚖️ Lei:</div><div class="fbd" style="color:rgba(255,215,0,.7)">${f.lei}</div>
      </div></div>`;
    card.onclick=()=>{
      if(card.classList.contains('flipped'))return;
      card.classList.add('flipped');TS.flipped++;
      document.getElementById('t-flip-cnt').textContent=TS.flipped;
      const msgs=['3 restantes — continue!','Dois revelados!','Quase!','Todos revelados. Base legal incluída. 🏛️'];
      setBlnT(msgs[TS.flipped-1],'right','bln-purple');
      if(TS.flipped===TEEN_FLIP.length)setTimeout(()=>document.getElementById('t-flip-done').style.display='block',400);
    };
    grid.appendChild(card);
  });
}

// Fase 3 teen: aliado
function renderTAliado(c){
  TS.aliStep=0;
  setBlnT("Ser aliado(a) vai além de 'ser legal'. É agir com responsabilidade e conhecer seus direitos.",'top');
  document.getElementById('t-status').textContent='● FASE 3';
  c.innerHTML=`
    <div style="text-align:center;margin-bottom:14px">
      <div class="phase-badge">FASE 3 — MISSÃO ALIADO</div>
      <div class="phase-sub" style="margin-top:4px">Clique em cada etapa para expandir</div>
    </div>
    <div id="ali-wrap"></div>
    <div id="ali-done" style="display:none;text-align:center;margin-top:10px">
      <button class="btn-primary" onclick="TS.phase=3;updateTTabs();renderTPhase()">Fase 4: Se Eu Estiver Sofrendo 💜 ▶</button>
    </div>`;
  buildAliWrap();
}
function buildAliWrap(){
  const wrap=document.getElementById('ali-wrap');wrap.innerHTML='';
  ALI_STEPS.forEach((s,i)=>{
    const done=i<TS.aliStep;const active=i===TS.aliStep;
    const div=document.createElement('div');
    div.className='step-item'+(active?' active':done?' done':'');
    div.innerHTML=`
      <div class="step-head" onclick="setAliS(${i})">
        <div class="step-num">${done?'✅':s.icon}</div>
        <div class="step-title">${s.t}</div>
        <div style="font-size:11px;color:rgba(0,212,255,.4)">${active?'▾':done?'✓':'▸'}</div>
      </div>
      <div class="step-body">
        ${s.d}
        ${s.script?`<div class="step-script">${s.script}</div>`:''}
        ${active&&i<ALI_STEPS.length-1?`<br><button class="btn-next" onclick="advAli(${i})">Entendido ▶</button>`:''}
        ${active&&i===ALI_STEPS.length-1?`<br><button class="btn-primary" onclick="showAliDone()">Missão concluída ✓</button>`:''}
      </div>`;
    wrap.appendChild(div);
  });
}
function setAliS(i){TS.aliStep=i;buildAliWrap();}
function advAli(i){
  TS.aliStep=i+1;buildAliWrap();
  const msgs=['Apoio direto anotado!','Documentação registrada!','Escola notificada!','Consequências mapeadas!'];
  setBlnT(msgs[i]||'Continue!','top','bln-green');
}
function showAliDone(){document.getElementById('ali-done').style.display='block';}

// Fase 4 teen: acolhimento
function renderTAcolhimento(c){
  TS.checked=new Set();
  setBlnT('O que está acontecendo com você não é culpa sua. Bullying não é frescura — existe lei que te protege.','top','bln-purple');
  document.getElementById('t-status').textContent='● FASE 4';
  c.innerHTML=`
    <div style="text-align:center;margin-bottom:14px">
      <div class="phase-badge">FASE 4 — SE EU ESTIVER SOFRENDO</div>
    </div>
    <div style="background:rgba(180,90,255,.07);border-left:3px solid var(--nv);border-radius:0 8px 8px 0;padding:13px 16px;font-size:14px;font-style:italic;color:#d4b0ff;line-height:1.6;margin-bottom:16px">
      "O que está acontecendo com você não é culpa sua. Bullying não é frescura — é violência, e existe lei que te protege."
    </div>
    <div style="font-family:'Orbitron',sans-serif;font-size:10px;color:rgba(0,212,255,.55);letter-spacing:1.5px;margin-bottom:10px">IDENTIFIQUE O QUE ESTÁ ACONTECENDO:</div>
    <div class="chk-grid" id="t-chk"></div>
    <div class="chk-result" id="t-chk-result"></div>
    <div class="neon-line"></div>
    <div style="font-family:'Orbitron',sans-serif;font-size:10px;color:rgba(180,90,255,.6);letter-spacing:1.5px;margin-bottom:10px">POR QUE É DIFÍCIL CONTAR</div>
    <div class="acc-list" id="t-acc"></div>
    <div class="neon-line"></div>
    <div style="font-family:'Orbitron',sans-serif;font-size:10px;color:rgba(255,215,0,.55);letter-spacing:1.5px;margin-bottom:10px">MEUS DIREITOS — LEI Nº 14.811/2024</div>
    <div class="dir-grid" id="t-dir"></div>
    <div id="t-acol-done" style="display:none"></div>`;
  buildTChk();buildTAcc();buildTDir();
}
function buildTChk(){
  const wrap=document.getElementById('t-chk');
  ACOL_CHECKS.forEach((ch,i)=>{
    const div=document.createElement('div');div.className='chk-item';
    div.innerHTML=`<div class="chk-box" id="cb-${i}"></div><div class="chk-label">${ch}</div>`;
    div.onclick=()=>{
      if(TS.checked.has(i))TS.checked.delete(i);else TS.checked.add(i);
      const cb=document.getElementById('cb-'+i);
      div.classList.toggle('checked',TS.checked.has(i));
      cb.textContent=TS.checked.has(i)?'✓':'';
      updateTChkResult();
    };
    wrap.appendChild(div);
  });
}
function updateTChkResult(){
  const n=TS.checked.size;const el=document.getElementById('t-chk-result');
  el.className='chk-result';
  if(n===0){el.style.display='none';return;}
  el.style.display='block';
  let cls,icon,tit,txt;
  if(n<=2){cls='r-few';icon='💙';tit='Você está prestando atenção ao que sente.';txt='Mesmo que pareça pouco, o que você sente importa. Se está te afetando, merece atenção. Converse com alguém de confiança.';}
  else if(n<=5){cls='r-some';icon='💜';tit='O que você está descrevendo pode caracterizar bullying.';txt='Você tem direito à proteção legal. Não precisa esperar piorar para pedir ajuda. A Lei nº 14.811/2024 está do seu lado.';}
  else{cls='r-many';icon='❤️';tit='Você está sendo corajoso(a) ao reconhecer isso.';txt='O que você está vivendo é sério e você merece ajuda agora. Por favor, fale com um adulto de confiança hoje — ou ligue para o CVV: 188 (gratuito, 24h, sigiloso).';}
  el.classList.add(cls);
  el.innerHTML=`<span class="res-icon">${icon}</span><div class="res-title">${tit}</div><div class="res-text">${txt}</div>`;
  if(n>=3&&document.getElementById('t-acol-done').style.display==='none'){
    document.getElementById('t-acol-done').style.display='block';showTFinal();}
}
function buildTAcc(){
  const wrap=document.getElementById('t-acc');
  ACOL_ACC.forEach(a=>{
    const div=document.createElement('div');div.className='acc-item';
    div.innerHTML=`<div class="acc-head" onclick="toggleAcc(this.parentElement)"><span class="acc-emoji">${a.emoji}</span><span class="acc-htitle">${a.h}</span><span class="acc-arrow">▾</span></div><div class="acc-body"><div class="acc-text">${a.body}</div></div>`;
    wrap.appendChild(div);
  });
}
function toggleAcc(el){
  const isOpen=el.classList.contains('open');
  document.querySelectorAll('.acc-item').forEach(a=>a.classList.remove('open'));
  if(!isOpen)el.classList.add('open');
}
function buildTDir(){
  const grid=document.getElementById('t-dir');
  DIREITOS.forEach(d=>{
    const card=document.createElement('div');card.className='dir-card';
    card.innerHTML=`<div class="flip-inner">
      <div class="flip-front" style="border-color:rgba(180,90,255,.25)">
        <div class="fi">${d.icon}</div>
        <div class="ft" style="color:var(--nv)">${d.t}</div>
        <div class="fh">▸ ${d.h}</div>
      </div>
      <div class="flip-back" style="border-color:rgba(180,90,255,.45)">
        <div class="fbt" style="color:var(--nv)">${d.icon} ${d.t.toUpperCase()}</div>
        <div class="fbd" style="margin-top:4px">${d.back}</div>
        <div class="fbl" style="color:#ffd700;margin-top:6px">⚖️ ${d.lei}</div>
      </div></div>`;
    card.onclick=()=>card.classList.toggle('flipped');
    grid.appendChild(card);
  });
}
function showTFinal(){
  const sc=TS.ok;const tot=TEEN_Q.length;const pct=Math.round(sc/tot*100);
  let em,tit,msg,st;
  if(pct>=75){em='🏆';tit='MESTRE DA JUSTIÇA!';msg='Você demonstrou análise crítica exemplar sobre bullying. Está preparado(a) para ser um agente de mudança real.';st=3;}
  else if(pct>=50){em='⭐';tit='GUARDIÃO DA JUSTIÇA!';msg='Ótima capacidade analítica! Continue desenvolvendo seu senso crítico.';st=2;}
  else{em='💪';tit='APRENDIZ DA JUSTIÇA!';msg='Você está construindo conhecimento. Cada cenário aprendido te torna um aliado mais forte.';st=1;}
  setBlnT('Você concluiu o Desafio Completo da Ju. Justiça e conhecimento andam juntos.','top','bln-gold');
  document.getElementById('t-status').textContent='● CONCLUÍDO';
  let sh='';for(let i=0;i<3;i++)sh+=`<span class="rstar" style="animation-delay:${i*.2}s">${i<st?'⭐':'☆'}</span>`;
  document.getElementById('t-acol-done').innerHTML=`
    <div class="result-final fade-in">
      <span class="rf-emoji">${em}</span>
      <div class="rf-title">${tit}</div>
      <div class="rf-score">${sc}/${tot} no quiz</div>
      <div class="rf-stars">${sh}</div>
      <div class="rf-msg">${msg}</div>
      <button class="btn-next" style="margin:0 auto;display:block" onclick="initTeen()">🔄 Jogar de novo</button>
    </div>
    <div class="ouv-card">
      <div class="ouv-title">PROJETO REACT — OUVIDORIA ESCOLAR</div>
      <div class="ouv-sub">Canal oficial do Projeto REACT para denúncias e acompanhamento de casos. Sigiloso, gratuito e baseado na Lei nº 14.811/2024.</div>
      <div class="ouv-btns">
        <button class="btn-ouv p" onclick="window.location.href='ouvidoria.html'">💬 Acessar Ouvidoria REACT</button>
        <button class="btn-ouv s" onclick="window.open('https://cvv.org.br','_blank')">📞 CVV 188</button>
        <button class="btn-ouv s" onclick="window.open('tel:100','_blank')">☎️ Disque 100</button>
      </div>
    </div>`;
  JU_FALA.parabens();
  fireConfetti();
}

// ══════════════════════════════════════
// VOZ DA JU — Web Speech API
// ══════════════════════════════════════
const JU_VOZ = (() => {

  // ── Áudios reais da Ju (extraídos do vídeo original) ──
  const SOM = {
    acertou: new Audio("data:audio/mpeg;base64,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AA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cmR0j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//twZHUP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cmR0j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//twZHUP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cmR0j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//twZHUP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cGR1D/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo="),
    errou:   new Audio("data:audio/mpeg;base64,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CJYOQ1rG/aKnBBUmkqAgk4Drnz5xGdKFBZBr///2DHkCjl4wXQXaViFwADcAbWICwLKh7DYsAEKgygX4iDMdeylAHxd6BYIoX///+QU27OH9RxGz9JkWAA2RkpAgQggYhkz7D+Lof8CFbdugh56Q0C7U3I9pYO7GPLC09Q+VaQGWgXc9CUAeRuQiTzJV2vIDG3FdGRCLV4k6P/+wVjxRKmB2kucGAAqQJsUAJIRiRzannN2tkOHgfIIDjjaCL+IkMrTmy92UDaP//6q2ealrv2fDa7v//6EJGWts1KAQONEYewHlew1AeHZccROn59RgzMzMzfjYMKX+ZleZr79lhwMDFulfru71wN3//vkNCDQCEDiQc/////twZCAAAlAmV+GDNawvwYoFLegKDYChRg1lhYCWBKo0wzCQ//ieCGU/aUl374oIALAuKWfyw0xQKqsQxokZHkoMSz6XJvFdLyn93/l1NF37jemtkU/a29PTlDjvqMSLLQxEyd8/cct06KRRqKAUREUlQPDYHcU70g0FH9mj9gUNEt0mfN0yXNGUb1qJilYcQTO1o8uRfGyppHefxpkoHloLPWttZaenPWjsdWdSxKXQnALqYK+HVgYOouZDX+p7REFYmPNYpPTbsCKQtKAAGYAGUFwFCYTDxADdVAYIZw6TR2N0K6mf5f/LTT7PiWeVAwAwAAAEOw13cB3kGqGADGxgY7yEArHzCBIODscx4CDB4RAoLatZbGBQa0aFPgipFeI4s7nNMg+HLg2EMTiipN8drsLDbH1Ff//7cmQkgBMAJ1TjPEJAJqGqj2AjcAto31ktJLKAjgqnrYeJQv//jBu59v//g+cJ0f///EBNDhQ+YBKVJiQwqV4ABwAAMXnf9AChq9ukj1u02pQBVxl3ZiLRFroJxP4Y/FjAABgAIZbD4CthYW89FcGRjNoiFSZyWgQKlYJFqkhlTALg4anW5rScWWSxqTtd/NJooGSVQQKzm299IwGGhREq//6Kx3////RKsHykFz0F///+DI44PB+FAQUB0gAAAwATNnJbCFQoWr84OFbWhUPAwimfPFzt/+pQJ9jDifhJCmcoAwGSkQgohKjodggUSpNcKMqXumw2m2ALI1+H8ogPObG43UtSso9jh/Rt5lPOMChV7f/oTV////stBWAourJ2//////82jUZBw11Hi40yqUUP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"),
  };
  Object.values(SOM).forEach(a => a.load());

  // ── Frases para o balão (texto) ──
  const FALAS = {
    kids: {
      ola:      ['Oi! Sou a Ju! Vamos jogar juntos e aprender sobre bullying?'],
      acertou:  ['Uhul!! Você acertou! Sabia que você conseguia! ⭐', 'Isso aí!! Mandou muito bem!', 'Arrasou!! Três estrelinhas para você!'],
      errou:    ['Quase lá, tente outra vez! 💙', 'Não desanima! Quase, vai de novo!', 'Eita, mas tudo bem! Tenta mais uma vez!'],
    },
    medio: {
      ola:      ['Pronto para o desafio? Vou te mostrar situações reais da escola!'],
      acertou:  ['Na mosca! Equilíbrio perfeito!', 'Correto! Você está mandando bem!', 'Isso mesmo! Continue assim!'],
      errou:    ['Quase lá! Olhe de novo com atenção.', 'Não exatamente! Analise o contexto.', 'Hmm, pensa mais um pouco!'],
    },
    teen: {
      ola:      ['Olá, mentes brilhantes! Sou a Ju do Projeto REACT, e vim desafiar o senso de justiça de vocês!'],
      acertou:  ['Análise correta! Excelente senso de justiça.', 'Perfeito! Você domina o tema.', 'Correto! A balança está equilibrada.'],
      errou:    ['Reconsidere o contexto. Analise os detalhes.', 'Não exatamente. Pense na repetição e intencionalidade.', 'Quase! Releia o contexto do cenário.'],
    },
    selector: {
      ola:      ['Olá mentes brilhantes! Preparados para um desafio?'],
    },
  };

  let mudo    = false;
  let somAtual = null;
  let faixaAtual = 'medio';
  let speechUnlocked = false;
  let voicesPromise = null;
  let activeUtterance = null;

  function hasSpeech() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  }

  function waitForVoices() {
    if (!hasSpeech()) return Promise.resolve([]);
    if (voicesPromise) return voicesPromise;
    voicesPromise = new Promise((resolve) => {
      const finish = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length) { resolve(voices); return true; }
        return false;
      };
      if (finish()) return;
      const onChange = () => {
        if (finish()) window.speechSynthesis.removeEventListener('voiceschanged', onChange);
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
    return voices.find(v => v.lang === 'pt-BR')
      || voices.find(v => v.lang.startsWith('pt-BR'))
      || voices.find(v => v.lang.startsWith('pt'))
      || null;
  }

  function unlockSpeech() {
    speechUnlocked = true;
    if (!hasSpeech()) return;
    try {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    } catch (_) { /* ignore */ }
  }

  function stopSpeech() {
    if (hasSpeech()) {
      activeUtterance = null;
      window.speechSynthesis.cancel();
    }
  }

  async function speakText(text) {
    const message = String(text || '').trim();
    if (mudo || !message || !hasSpeech() || !speechUnlocked) return false;
    stopSpeech();
    const voices = await waitForVoices();
    const voice = pickPtVoice(voices);
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.92;
      utterance.pitch = 1.08;
      utterance.volume = 1;
      if (voice) utterance.voice = voice;
      let settled = false;
      const done = (ok) => {
        if (settled) return;
        settled = true;
        if (activeUtterance === utterance) activeUtterance = null;
        resolve(ok);
      };
      utterance.onstart = () => {
        ondas(true);
        animarJu('falar');
        if (window.speechSynthesis.paused) {
          try { window.speechSynthesis.resume(); } catch (_) { /* ignore */ }
        }
      };
      utterance.onend = () => { ondas(false); pararAnim(); done(true); };
      utterance.onerror = () => { ondas(false); pararAnim(); done(false); };
      activeUtterance = utterance;
      try { window.speechSynthesis.resume(); } catch (_) { /* ignore */ }
      window.setTimeout(() => {
        try { window.speechSynthesis.speak(utterance); } catch (_) { done(false); }
      }, 40);
    });
  }

  function stripHtml(text) {
    return String(text || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // ── Ondas visuais ──
  function ondas(on) {
    document.querySelectorAll(
      '#voice-waves,.ju-waves,.voice-waves,#ju-ondas,.ju-ondas'
    ).forEach(el => { el.style.display = on ? 'flex' : 'none'; });
  }

  // ── Anima a Ju ──
  function animarJu(tipo) {
    document.querySelectorAll(
      '.ju-real-img,.ju-img,.ju-sel,.ju-kids,.ju-arena,[data-ju-avatar]'
    ).forEach(el => {
      el.style.animation = 'none';
      void el.offsetWidth;
      if (tipo === 'acertou') {
        el.style.animation = 'jufloat 0.5s ease-in-out infinite';
        let t=0;
        const fl = setInterval(()=>{
          t++;
          el.style.filter = t%2===0
            ? 'drop-shadow(0 0 22px #00ff88) brightness(1.3)'
            : 'drop-shadow(0 0 8px rgba(0,212,255,.6)) brightness(1)';
          if(t>6){ clearInterval(fl); el.style.filter=''; }
        },110);
      } else if (tipo === 'errou') {
        el.style.animation = 'juShake 0.4s ease';
      } else {
        el.style.animation = 'jufloat 0.5s ease-in-out infinite';
      }
    });
  }

  function pararAnim() {
    document.querySelectorAll(
      '.ju-real-img,.ju-img,.ju-sel,.ju-kids,.ju-arena,[data-ju-avatar]'
    ).forEach(el => { el.style.animation=''; el.style.filter=''; });
  }

  // ── Toca áudio real ──
  function tocarSom(tipo) {
    if (mudo) return;
    if (somAtual) { somAtual.pause(); somAtual.currentTime=0; }
    const audio = SOM[tipo];
    if (!audio) return;
    audio.currentTime = 0;
    somAtual = audio;
    audio.onplay  = ()=>{ ondas(true);  animarJu(tipo); };
    audio.onended = ()=>{ ondas(false); pararAnim(); somAtual=null; };
    audio.onerror = ()=>{ ondas(false); pararAnim(); somAtual=null; };
    audio.play().catch(()=>{
      document.addEventListener('click', ()=>audio.play(), {once:true});
    });
  }

  // ── Atualiza o balão de texto da Ju ──
  function atualizarBalao(tipo, faixa) {
    const lista = FALAS[faixa]?.[tipo] || FALAS.medio[tipo] || [];
    const txt   = lista[Math.floor(Math.random()*lista.length)] || '';
    if (!txt) return;
    const selectorBubble = document.getElementById('selectorBubble');
    if (selectorBubble && document.getElementById('screen-selector')?.classList.contains('active')) {
      selectorBubble.textContent = txt;
      selectorBubble.style.animation = 'none';
      void selectorBubble.offsetWidth;
      selectorBubble.style.animation = 'bpop .35s cubic-bezier(.2,1.4,.4,1)';
    }
    // Atualiza todos os balões visíveis
    ['p1-bubble-text','bln-m-txt','bln-t-txt','bubble-text'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.closest('.screen.active, #arena-m, #arena-t, #arena-intro')) {
        el.textContent = txt;
        // Re-trigger balloon animation
        const bln = el.closest('.arena-bln, .arena-balloon, .speech-balloon, .ju-balloon');
        if (bln) {
          bln.style.animation = 'none';
          void bln.offsetWidth;
          bln.style.animation = 'bpop .35s cubic-bezier(.2,1.4,.4,1)';
        }
      }
    });
  }

  // ── API pública ──
  return {

    setFaixa(f) { faixaAtual = f || 'medio'; },

    unlock() { unlockSpeech(); },

    ola(faixa) {
      const f = faixa || faixaAtual || 'selector';
      const lista = FALAS[f]?.ola || FALAS.selector?.ola || [];
      const txt = lista[Math.floor(Math.random() * lista.length)] || '';
      if (!txt) return Promise.resolve(false);
      const selectorBubble = document.getElementById('selectorBubble');
      if (selectorBubble && document.getElementById('screen-selector')?.classList.contains('active')) {
        selectorBubble.textContent = txt;
        selectorBubble.style.animation = 'none';
        void selectorBubble.offsetWidth;
        selectorBubble.style.animation = 'bpop .35s cubic-bezier(.2,1.4,.4,1)';
      }
      return speakText(txt);
    },

    acertou(faixa) {
      const f = faixa || faixaAtual;
      tocarSom('acertou');
      atualizarBalao('acertou', f);
    },

    errou(faixa) {
      const f = faixa || faixaAtual;
      tocarSom('errou');
      atualizarBalao('errou', f);
    },

    falar(txt) {
      const message = String(txt || '').trim();
      if (!message) return Promise.resolve(false);
      ['p1-bubble-text','bln-m-txt','bln-t-txt','selectorBubble'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = message;
      });
      return speakText(message);
    },

    falarSom(tipo) {
      tocarSom(tipo);
    },

    parar() {
      stopSpeech();
      if(somAtual){ somAtual.pause(); somAtual.currentTime=0; somAtual=null; }
      ondas(false); pararAnim();
    },

    alternarMudo() {
      mudo = !mudo;
      if(mudo) this.parar();
      ['ju-mudo-btn','ju-voz-btn','ju-voz-float','voz-btn'].forEach(id=>{
        const btn=document.getElementById(id);
        if(btn) btn.textContent = mudo ? '🔇' : '🔊';
      });
      const label = document.getElementById('ju-voz-label');
      if (label) label.textContent = mudo ? 'Voz da Ju desligada' : 'Voz da Ju ligada';
    },

    // Compatibilidade com chamadas antigas (toggle era o nome antigo)
    toggle() { this.alternarMudo(); },
    init() { waitForVoices(); },

  };
})();

window.JU_VOZ = JU_VOZ;

if (!window.juAcertou) window.juAcertou = () => JU_VOZ.acertou();
if (!window.juErrou) window.juErrou = () => JU_VOZ.errou();
if (!window.juParabens) window.juParabens = () => JU_FALA.parabens();
if (!window.juSaudacao) window.juSaudacao = () => JU_VOZ.falarSom('saudacao');

// ── Define faixa ao entrar em cada modo ──
const _goMode_voz = goMode;
goMode = function(m) {
  _goMode_voz(m);
  JU_VOZ.setFaixa(m === 'kids' ? 'kids' : m === 'medio' ? 'medio' : 'teen');
};


// ══ CONFETTI ══
function fireConfetti(){
  const wrap=document.getElementById('confetti');
  const colors=['#00d4ff','#ff2d9b','#b45aff','#ffd700','#00ff88'];
  for(let i=0;i<60;i++){
    const p=document.createElement('div');p.className='cp';
    const sz=6+Math.random()*8;
    p.style.cssText=`left:${Math.random()*100}%;width:${sz}px;height:${sz*1.5}px;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.8}s;opacity:${.7+Math.random()*.3};transform:rotate(${Math.random()*360}deg)`;
    wrap.appendChild(p);setTimeout(()=>p.remove(),4500);
  }
}


function initSelectorJu() {
  const selectorBubble = document.getElementById('selectorBubble');
  if (selectorBubble) {
    selectorBubble.textContent = 'Olá mentes brilhantes! Preparados para um desafio?';
  }
}

function bindSelectorAutoGreeting() {
  if (window.__juSelectorAutoBound) return;
  window.__juSelectorAutoBound = true;

  const tryAutoGreet = () => {
    const selectorActive = document.getElementById('screen-selector')?.classList.contains('active');
    if (!selectorActive || window.__juSelectorAutoSpoke) return;
    window.__juSelectorAutoSpoke = true;
    JU_VOZ.unlock();
    JU_VOZ.ola('selector');
  };

  const unlockOnInteract = () => {
    JU_VOZ.unlock();
    tryAutoGreet();
  };

  document.addEventListener('pointerdown', unlockOnInteract, { passive: true });
  document.addEventListener('keydown', unlockOnInteract);
  window.setTimeout(() => {
    JU_VOZ.unlock();
    tryAutoGreet();
  }, 600);
}

function initAlunosHome() {
  initSelectorJu();
  bindSelectorAutoGreeting();
  document.body.classList.add('home-faixa-ready');
  setAlunosPhase('selector');
  setHomeChromeVisible(true);
  updateAlunosChromeOffset();
  watchAlunosPin('screen-selector');
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

document.addEventListener('DOMContentLoaded', () => {
  JU_VOZ.init();
  initAlunosHome();

  const alunosTab = document.querySelector('.edu-tab[data-panel="panel-alunos"]');
  alunosTab?.addEventListener('click', () => {
    requestAnimationFrame(() => {
      const activeScreen = document.querySelector('#panel-alunos .screen.active');
      if (activeScreen?.id) pinAlunosScreen(activeScreen.id);
    });
  });
});

