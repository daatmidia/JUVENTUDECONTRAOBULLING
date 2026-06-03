/**
 * DAAT site — Português (Brasil) / English (US)
 */
(function () {
  "use strict";

  var STORAGE_KEY = "daat-lang";

  var STRINGS = {
    "pt-BR": {
      meta_title: "DAAT Mídia Digital | Landing Pages, Tráfego Pago e Social Media",
      meta_description:
        "A DAAT cria landing pages que vendem, escala tráfego pago e gerencia mídias sociais para gerar leads e vendas todos os dias.",
      nav_lang_aria: "Selecionar idioma do site",
      nav_brand_aria: "Ir para o topo da página",
      nav_logo_alt: "Logo DAAT Mídia Digital",
      nav_diferenciais: "Diferenciais",
      nav_sobre: "Sobre nós",
      nav_servicos: "Serviços",
      nav_servicos_aria: "Abrir menu de serviços",
      nav_sub_branding: "Branding",
      nav_sub_web: "Desenvolvimento Web",
      nav_sub_design: "Design",
      nav_sub_estrategia: "Estratégia Digital",
      nav_sub_trafego: "Tráfego Pago",
      nav_sub_social: "Social Media",
      nav_sub_suporte: "Suporte e Gestão",
      servicos_linhas_aria: "Linhas de serviço",
      nav_metodologia: "Metodologia",
      nav_resultados: "Resultados",
      nav_cta: "Quero crescer",
      nav_burger_open: "Abrir menu de navegação",
      nav_burger_close: "Fechar menu de navegação",
      a11y_toggle_open: "Abrir acessibilidade",
      a11y_toggle_close: "Fechar acessibilidade",
      a11y_title: "Acessibilidade",
      a11y_font_label: "Fonte",
      a11y_font_minus: "Fonte menor",
      a11y_font_plus: "Fonte maior",
      a11y_font_reset: "Fonte padrão",
      a11y_high_contrast: "Alto contraste",
      a11y_grayscale: "Escala de cinza",
      a11y_reduce_motion: "Reduzir movimento",
      a11y_on: "Ativado",
      a11y_off: "Desativado",
      lang_pt_label: "Português (Brasil)",
      lang_en_label: "English (United States)",
      audio_title: "אודי דמארי — ניגון תפילה · Toque para ouvir",
      audio_play: "Reproduzir música",
      audio_pause: "Pausar música",
      hero_h1_l1: "SOLUÇÕES",
      hero_h1_l2: "DIGITAIS PARA",
      hero_slide_aria: "Serviços em destaque",
      hero_w1: "REDES SOCIAIS",
      hero_w2: "WEBSITE",
      hero_w3: "MARKETING",
      hero_w4: "TRÁFEGO PAGO",
      hero_w5: "SOCIAL MEDIA",
      hero_w6: "LANDING PAGES",
      hero_lead:
        "Se o seu negócio não está vendendo na internet, você está deixando dinheiro na mesa todos os dias. Transformamos presença digital em clientes, faturamento e crescimento previsível.",
      hero_cta: "Quero transformar meu negócio",
      hero_logo_alt: "DAAT — identidade visual em alta definição",
      diff_title: "Por que escolher a DAAT Mídia Digital?",
      diff_li1:
        "<strong>Agência completa</strong> que centraliza toda a operação digital em um só lugar.",
      diff_li2: "Seu posicionamento <strong>nítido e valorizado</strong>.",
      diff_li3: "<strong>Comunicação estratégica</strong> elaborada para o seu público alto.",
      diff_li4:
        "Sites desenvolvidos exclusivamente para o seu negócio, com UX e estrutura pensadas para <strong>alavancar resultados</strong>.",
      diff_li5: "<strong>Marca que gera confiança e credibilidade</strong>.",
      diff_li6:
        "<strong>Execução de alta performance</strong>: posts, criativos e vídeos com foco no crescimento do seu negócio e fortalecimento da identidade.",
      funil_badge: "Funil de conversão",
      funil_h2_full:
        "Estrutura de funil <span class=\"funnel-callout\">(você NÃO tem isso ainda)</span>",
      funil_p: "Seu site precisa seguir essa ordem:",
      funil_ol1: "<strong>Dor</strong> (problema)",
      funil_ol2: "<strong>Identificação</strong>",
      funil_ol3: "<strong>Quebra de crença</strong>",
      funil_ol4: "<strong>Solução</strong>",
      funil_ol5: "<strong>Prova</strong>",
      funil_ol6: "<strong>Oferta</strong>",
      funil_ol7: "<strong>CTA</strong>",
      serv_badge: "O que entregamos",
      serv_h2:
        "Soluções completas para quem quer <span class=\"gradient\">vender de verdade</span>",
      serv_lead:
        "Você não precisa contratar vários fornecedores. Na DAAT você concentra estratégia, execução e otimização contínua em um único time.",
      serv1_h3: "Landing Pages de Alta Conversão",
      serv1_p:
        "Páginas com copy persuasiva, design profissional e estrutura para converter tráfego em leads e vendas.",
      serv1_li1: "Oferta e posicionamento comercial",
      serv1_li2: "Estrutura com CTA estratégico",
      serv1_li3: "Integração com WhatsApp e CRM",
      serv2_h3: "Tráfego Pago Performance",
      serv2_p:
        "Campanhas no Meta Ads e Google Ads com segmentação inteligente e foco em retorno sobre investimento.",
      serv2_li1: "Planejamento de funil e criativos",
      serv2_li2: "Gestão e otimização diária",
      serv2_li3: "Relatórios com métricas de negócio",
      serv3_h3: "Social Media e Gestão de Conteúdo",
      serv3_p:
        "Posicionamento digital profissional para fortalecer marca, gerar autoridade e nutrir potenciais clientes.",
      serv3_li1: "Calendário editorial estratégico",
      serv3_li2: "Design e copy para redes sociais",
      serv3_li3: "Gestão e evolução de presença digital",
      aud_badge: "Para quem é",
      aud_h2: "Feito para empresas que querem <span class=\"gradient\">crescimento previsível</span>",
      aud1_h3: "Negócios locais",
      aud1_p:
        "Clínicas, escolas, estéticas e serviços que querem agenda cheia com mídia de performance.",
      aud2_h3: "E-commerce",
      aud2_p:
        "Lojas virtuais que precisam aumentar ticket, recompra e escalar faturamento com rentabilidade.",
      aud3_h3: "Prestadores B2B",
      aud3_p:
        "Empresas que vendem serviços de maior valor e precisam de pipeline qualificado.",
      proc_badge: "Método DAAT",
      proc_h2: "Como geramos resultado em 4 etapas",
      proc1_h3: "Diagnóstico",
      proc1_p: "Análise do negócio, oferta, concorrência e oportunidades de escala.",
      proc2_h3: "Estratégia",
      proc2_p: "Plano de funil, criativos, canais, orçamento e metas.",
      proc3_h3: "Execução",
      proc3_p: "Publicação de páginas, campanhas e calendário social.",
      proc4_h3: "Otimização",
      proc4_p: "Melhorias semanais orientadas por dados para aumentar ROI.",
      res_badge: "Prova social",
      res_h2:
        "Quem contrata a DAAT <span class=\"gradient\">É ESCOLHIDO PELOS CLIENTES!</span>",
      depo1_quote: '"Em 60 dias nossa captação dobrou e o custo por lead caiu drasticamente."',
      depo1_meta: "Diretor Comercial, empresa educacional",
      depo2_quote:
        '"Paramos de postar sem estratégia. Hoje temos conteúdo com posicionamento e geração de negócios."',
      depo2_meta: "Dra Eduarda Henkel - Clinica de Harmonização Social",
      proof_badge: "Projeto real + depoimento",
      proof_h3: "Dr. Camargo Quintão · Advocacia & Consultoria",
      proof_lead: "Landing page profissional criada pela DAAT para o escritório.",
      proof_quote: '"A landing page ficou profissional e converte muito melhor que nosso site antigo."',
      proof_attrib: "Dr Camargo Quintão — Escritório de Advocacia",
      faq_badge: "Dúvidas frequentes",
      faq_h2: "Perguntas de quem quer <span class=\"gradient\">crescer com segurança</span>",
      faq_sum1: "Em quanto tempo começo a ver resultado?",
      faq_p1:
        "Normalmente os primeiros indicadores melhoram entre 15 e 30 dias, com ganho consistente entre 60 e 90 dias.",
      faq_sum2: "Vocês fazem só tráfego ou entregam tudo?",
      faq_p2:
        "Entregamos estratégia completa: landing page, criativos, campanhas, social media e acompanhamento com foco em vendas.",
      faq_sum3: "Como acompanho o desempenho?",
      faq_p3:
        "Você recebe acompanhamento recorrente com métricas claras de leads, CAC, CPL, ROAS e evolução de conversão.",
      cta_badge: "Vamos conversar",
      cta_h2: "Solicite seu plano de crescimento digital",
      cta_p: "Preencha os dados e receba uma proposta sob medida para o seu momento de negócio.",
      form_name: "Nome completo",
      form_company: "Empresa",
      form_email: "E-mail corporativo",
      form_wa: "WhatsApp",
      form_service: "Qual serviço você precisa?",
      form_opt_landing: "Landing Page de Alta Conversão",
      form_opt_trafego: "Tráfego Pago",
      form_opt_social: "Social Media",
      form_opt_full: "Gestão Completa (Landing + Tráfego + Social)",
      form_budget: "Investimento mensal estimado",
      form_goal: "Descreva seu objetivo principal para os próximos 90 dias",
      form_submit: "Quero receber meu diagnóstico",
      form_notice:
        "Ao enviar, você concorda em receber contato da equipe DAAT para apresentação da estratégia.",
      form_alert: "Perfeito! Recebemos seus dados. Em breve nosso time entrará em contato.",
      footer_tagline: "Landing page profissional para conversão e vendas.",
      footer_logo_alt: "Logo DAAT",
      wa_bubble: "Fale com nossa equipe de atendimento 😃",
      wa_aria: "Falar no WhatsApp com nossa equipe",
      wa_title: "Falar no WhatsApp",
      wa_href:
        "https://wa.me/5549998200000?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20DAAT%20M%C3%ADdia%20Digital%20e%20quero%20um%20diagn%C3%B3stico%20gratuito.%20Podemos%20conversar%3F",
    },
    "en-US": {
      meta_title: "DAAT Digital Media | Landing Pages, Paid Traffic & Social Media",
      meta_description:
        "DAAT builds landing pages that sell, scales paid traffic, and runs social media to generate leads and sales every day.",
      nav_lang_aria: "Choose site language",
      nav_brand_aria: "Go to top of page",
      nav_logo_alt: "DAAT Digital Media logo",
      nav_diferenciais: "Why us",
      nav_sobre: "About",
      nav_servicos: "Services",
      nav_servicos_aria: "Open services menu",
      nav_sub_branding: "Branding",
      nav_sub_web: "Web development",
      nav_sub_design: "Design",
      nav_sub_estrategia: "Digital strategy",
      nav_sub_trafego: "Paid traffic",
      nav_sub_social: "Social media",
      nav_sub_suporte: "Support & management",
      servicos_linhas_aria: "Service lines",
      nav_metodologia: "Method",
      nav_resultados: "Results",
      nav_cta: "I want to grow",
      nav_burger_open: "Open navigation menu",
      nav_burger_close: "Close navigation menu",
      a11y_toggle_open: "Open accessibility",
      a11y_toggle_close: "Close accessibility",
      a11y_title: "Accessibility",
      a11y_font_label: "Font",
      a11y_font_minus: "Smaller font",
      a11y_font_plus: "Larger font",
      a11y_font_reset: "Default font",
      a11y_high_contrast: "High contrast",
      a11y_grayscale: "Grayscale",
      a11y_reduce_motion: "Reduce motion",
      a11y_on: "On",
      a11y_off: "Off",
      lang_pt_label: "Portuguese (Brazil)",
      lang_en_label: "English (United States)",
      audio_title: "Udi Damari — Nigun Tefilah · Tap to listen",
      audio_play: "Play music",
      audio_pause: "Pause music",
      hero_h1_l1: "DIGITAL",
      hero_h1_l2: "SOLUTIONS FOR",
      hero_slide_aria: "Featured services",
      hero_w1: "SOCIAL NETWORKS",
      hero_w2: "WEBSITE",
      hero_w3: "MARKETING",
      hero_w4: "PAID TRAFFIC",
      hero_w5: "SOCIAL MEDIA",
      hero_w6: "LANDING PAGES",
      hero_lead:
        "If your business is not selling online, you are leaving money on the table every day. We turn digital presence into clients, revenue, and predictable growth.",
      hero_cta: "Transform my business",
      hero_logo_alt: "DAAT — high-definition brand visual",
      diff_title: "Why choose DAAT Digital Media?",
      diff_li1:
        "<strong>Full-service agency</strong> that centralizes your entire digital operation in one place.",
      diff_li2: "Your positioning stays <strong>sharp and valued</strong>.",
      diff_li3: "<strong>Strategic communication</strong> crafted for your high-value audience.",
      diff_li4:
        "Sites built exclusively for your business, with UX and structure designed to <strong>drive results</strong>.",
      diff_li5: "<strong>A brand that builds trust and credibility</strong>.",
      diff_li6:
        "<strong>High-performance execution</strong>: posts, creatives, and video focused on growth and brand strength.",
      funil_badge: "Conversion funnel",
      funil_h2_full:
        "Funnel structure <span class=\"funnel-callout\">(you probably don't have this yet)</span>",
      funil_p: "Your site should follow this order:",
      funil_ol1: "<strong>Pain</strong> (problem)",
      funil_ol2: "<strong>Identification</strong>",
      funil_ol3: "<strong>Belief shift</strong>",
      funil_ol4: "<strong>Solution</strong>",
      funil_ol5: "<strong>Proof</strong>",
      funil_ol6: "<strong>Offer</strong>",
      funil_ol7: "<strong>CTA</strong>",
      serv_badge: "What we deliver",
      serv_h2: "End-to-end solutions for brands that want to <span class=\"gradient\">sell for real</span>",
      serv_lead:
        "You don't need multiple vendors. At DAAT you get strategy, execution, and continuous optimization in one team.",
      serv1_h3: "High-converting landing pages",
      serv1_p:
        "Pages with persuasive copy, professional design, and structure built to turn traffic into leads and sales.",
      serv1_li1: "Offer and commercial positioning",
      serv1_li2: "Structure with a strategic CTA",
      serv1_li3: "WhatsApp and CRM integration",
      serv2_h3: "Performance paid traffic",
      serv2_p:
        "Meta Ads and Google Ads campaigns with smart targeting and a focus on return on ad spend.",
      serv2_li1: "Funnel planning and creatives",
      serv2_li2: "Daily management and optimization",
      serv2_li3: "Reports with business metrics",
      serv3_h3: "Social media & content",
      serv3_p:
        "Professional digital positioning to strengthen your brand, authority, and nurture prospects.",
      serv3_li1: "Strategic editorial calendar",
      serv3_li2: "Design and copy for social channels",
      serv3_li3: "Management and evolution of digital presence",
      aud_badge: "Who it's for",
      aud_h2: "Built for companies that want <span class=\"gradient\">predictable growth</span>",
      aud1_h3: "Local businesses",
      aud1_p:
        "Clinics, schools, aesthetics, and service businesses that want a full calendar with performance media.",
      aud2_h3: "E-commerce",
      aud2_p:
        "Online stores that need higher AOV, repeat purchases, and scalable revenue with healthy margins.",
      aud3_h3: "B2B providers",
      aud3_p: "Companies selling higher-ticket services that need a qualified pipeline.",
      proc_badge: "DAAT method",
      proc_h2: "How we deliver results in 4 steps",
      proc1_h3: "Diagnosis",
      proc1_p: "Business, offer, competition, and scale opportunity analysis.",
      proc2_h3: "Strategy",
      proc2_p: "Funnel plan, creatives, channels, budget, and goals.",
      proc3_h3: "Execution",
      proc3_p: "Launch of pages, campaigns, and social calendar.",
      proc4_h3: "Optimization",
      proc4_p: "Weekly data-driven improvements to increase ROI.",
      res_badge: "Social proof",
      res_h2: "When you hire DAAT, <span class=\"gradient\">clients choose you.</span>",
      depo1_quote: '"In 60 days our lead volume doubled and cost per lead dropped sharply."',
      depo1_meta: "Commercial Director, education company",
      depo2_quote:
        '"We stopped posting without strategy. Today our content builds positioning and drives business."',
      depo2_meta: "Dr. Eduarda Henkel — Aesthetics clinic",
      proof_badge: "Real project + testimonial",
      proof_h3: "Dr. Camargo Quintão · Law & Consulting",
      proof_lead: "Professional landing page built by DAAT for the firm.",
      proof_quote: '"The landing page looks professional and converts far better than our old website."',
      proof_attrib: "Dr. Camargo Quintão — Law firm",
      faq_badge: "FAQ",
      faq_h2: "Questions from teams that want to <span class=\"gradient\">grow with confidence</span>",
      faq_sum1: "How soon will I see results?",
      faq_p1:
        "Early indicators usually improve within 15–30 days, with consistent gains between 60 and 90 days.",
      faq_sum2: "Do you only run ads or deliver everything?",
      faq_p2:
        "We deliver full strategy: landing page, creatives, campaigns, social media, and sales-focused follow-up.",
      faq_sum3: "How do I track performance?",
      faq_p3:
        "You get recurring reporting with clear metrics on leads, CAC, CPL, ROAS, and conversion trends.",
      cta_badge: "Let's talk",
      cta_h2: "Request your digital growth plan",
      cta_p: "Fill in your details and receive a tailored proposal for your stage.",
      form_name: "Full name",
      form_company: "Company",
      form_email: "Work email",
      form_wa: "WhatsApp",
      form_service: "Which service do you need?",
      form_opt_landing: "High-converting landing page",
      form_opt_trafego: "Paid traffic",
      form_opt_social: "Social media",
      form_opt_full: "Full management (Landing + Traffic + Social)",
      form_budget: "Estimated monthly investment",
      form_goal: "Describe your main goal for the next 90 days",
      form_submit: "Get my free diagnosis",
      form_notice:
        "By submitting, you agree to be contacted by DAAT to present the strategy.",
      form_alert: "Perfect! We received your details. Our team will reach out soon.",
      footer_tagline: "Professional landing page for conversion and sales.",
      footer_logo_alt: "DAAT logo",
      wa_bubble: "Talk to our support team 😃",
      wa_aria: "Chat on WhatsApp with our team",
      wa_title: "WhatsApp",
      wa_href:
        "https://wa.me/5549998200000?text=Hi%2C%20I%20came%20from%20the%20DAAT%20Digital%20Media%20website%20and%20I%27d%20like%20a%20free%20diagnosis.%20Can%20we%20chat%3F",
    },
  };

  function getLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en-US" || saved === "pt-BR") return saved;
    return "pt-BR";
  }

  function t(lang, key) {
    var bag = STRINGS[lang] || STRINGS["pt-BR"];
    return bag[key] != null ? bag[key] : key;
  }

  function applyDaatLang(lang) {
    if (lang !== "en-US" && lang !== "pt-BR") lang = "pt-BR";
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    window.__DAAT_LANG = lang;

    var bag = STRINGS[lang];

    document.title = bag.meta_title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", bag.meta_description);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (bag[key] != null) el.textContent = bag[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (bag[key] != null) el.innerHTML = bag[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (bag[key] != null) el.setAttribute("placeholder", bag[key]);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (bag[key] != null) el.setAttribute("aria-label", bag[key]);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (bag[key] != null) el.setAttribute("title", bag[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (bag[key] != null) el.setAttribute("alt", bag[key]);
    });

    document.querySelectorAll("[data-i18n-href]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-href");
      if (bag[key] != null) el.setAttribute("href", bag[key]);
    });

    var audioBtn = document.getElementById("bgMusicToggle");
    if (audioBtn) {
      var playing = audioBtn.classList.contains("is-playing");
      audioBtn.setAttribute("aria-label", playing ? bag.audio_pause : bag.audio_play);
    }

    document.querySelectorAll(".nav-lang-btn").forEach(function (btn) {
      var isPt = btn.getAttribute("data-lang") === "pt-BR";
      var active = (isPt && lang === "pt-BR") || (!isPt && lang === "en-US");
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    var burger = document.getElementById("navBurger");
    if (burger) {
      var drawerOpen = document.body.classList.contains("nav-drawer-open");
      burger.setAttribute(
        "aria-label",
        drawerOpen ? bag.nav_burger_close : bag.nav_burger_open
      );
    }
  }

  window.DAAT_I18N = {
    getLang: getLang,
    apply: applyDaatLang,
    t: function (key) {
      return t(getLang(), key);
    },
    strings: STRINGS,
  };

  function initDaatI18nUi() {
    applyDaatLang(getLang());
    document.querySelectorAll(".nav-lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang");
        applyDaatLang(lang);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDaatI18nUi);
  } else {
    initDaatI18nUi();
  }
})();
