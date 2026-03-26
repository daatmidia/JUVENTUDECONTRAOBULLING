(function () {
  'use strict';

  const LS_KEY = 'jsb_ouvidoria_reports';
  const LS_PEOPLE = 'jsb_ouvidoria_people';
  const LS_PROS = 'jsb_ouvidoria_profissionais';
  const LS_SCHOOL = 'jsb_ouvidoria_school_name';
  const ADMIN_CODE = 'escola2026';
  const SITE_ADMIN_CODE = 'site2026';
  const LANG_KEY = 'jsb_lang';
  const PT_BR = 'pt-BR';
  const EN_US = 'en-US';

  const applyPtBr = () => {
    document.documentElement.lang = PT_BR;
    localStorage.setItem(LANG_KEY, PT_BR);
  };
  const applyEnUs = () => {
    document.documentElement.lang = EN_US;
    localStorage.setItem(LANG_KEY, EN_US);
    document.title = 'School Ombudsman — Youth Without Bullying';
    const setText = (sel, txt) => { const el = document.querySelector(sel); if (el) el.textContent = txt; };
    const setHtml = (sel, html) => { const el = document.querySelector(sel); if (el) el.innerHTML = html; };
    setHtml('.logo-text', 'Youth <strong>Without Bullying</strong>');
    const nav = document.querySelectorAll('#navLinks li a');
    if (nav[0]) nav[0].textContent = 'News';
    if (nav[1]) nav[1].textContent = 'About';
    if (nav[2]) nav[2].textContent = 'About the Project';
    if (nav[3]) nav[3].textContent = 'Ombudsman';
    if (nav[4]) nav[4].textContent = '🔐 Admin Login';
    setText('.ouv-hero-title', 'School Ombudsman');
    setText('#protocolBtn', 'Check');
    setText('#adminLogin', 'Enter');
    setText('#adminAccess', 'Open Panel');
    setText('#siteAdminLogin', 'Enter');
  };
  const storedLang = localStorage.getItem(LANG_KEY) || PT_BR;
  if (storedLang === EN_US) applyEnUs();
  else applyPtBr();
  document.querySelectorAll('.js-lang-ptbr').forEach((el) => {
    const handler = (e) => {
      e.preventDefault();
      applyPtBr();
      window.location.reload();
    };
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') handler(e);
    });
  });
  document.querySelectorAll('.js-lang-enus').forEach((el) => {
    const handler = (e) => {
      e.preventDefault();
      localStorage.setItem(LANG_KEY, EN_US);
      window.location.reload();
    };
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') handler(e);
    });
  });

  // Mostra o painel administrativo apenas quando a nova aba abrir com ?admin=1
  const adminPanel = document.getElementById('painel');
  const params = new URLSearchParams(window.location.search);
  const shouldShowAdmin = params.get('admin') === '1';

  // No modo admin, deixamos a página com apenas:
  //  - Acompanhar protocolo
  //  - Painel da escola (login administrativo + painel)
  //  - O restante do formulário de denúncia fica oculto
  const hero = document.querySelector('.ouv-hero');
  const orientacoes = document.getElementById('orientacoes');
  const formulario = document.getElementById('formulario');

  if (adminPanel) {
    if (shouldShowAdmin) adminPanel.classList.remove('hidden');
    else adminPanel.classList.add('hidden');
  }

  const siteAdminPanel = document.getElementById('siteAdmin');
  if (siteAdminPanel) {
    if (shouldShowAdmin) siteAdminPanel.classList.remove('hidden');
    else siteAdminPanel.classList.add('hidden');
  }

  // Se entrar no modo admin, rola automaticamente para o painel
  if (shouldShowAdmin && adminPanel) {
    setTimeout(() => {
      try {
        adminPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('adminCode')?.focus();
      } catch {
        // ignore
      }
    }, 200);
  }

  if (hero) hero.classList.toggle('hidden', shouldShowAdmin);
  if (orientacoes) orientacoes.classList.toggle('hidden', shouldShowAdmin);
  if (formulario) formulario.classList.toggle('hidden', shouldShowAdmin);

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const form = document.getElementById('ouvForm');
  const panels = () => Array.from(document.querySelectorAll('[data-panel]'));
  const steps = () => Array.from(document.querySelectorAll('.ouv-step'));
  let current = 1;

  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnSubmit = document.getElementById('btnSubmit');
  const camposIdent = document.getElementById('camposIdent');

  function syncRadioCards() {
    document.querySelectorAll('.ouv-radio').forEach((lab) => {
      const inp = lab.querySelector('input[type="radio"]');
      lab.classList.toggle('ouv-radio--on', Boolean(inp?.checked));
    });
  }

  document.querySelectorAll('input[name="idTipo"]').forEach((r) => {
    r.addEventListener('change', () => {
      const anon = document.querySelector('input[name="idTipo"]:checked')?.value === 'anonimo';
      const anonMsg = document.getElementById('anonMessage');
      if (anonMsg) anonMsg.hidden = !anon;
      syncRadioCards();
    });
  });
  syncRadioCards();

  function showStep(n) {
    current = n;
    panels().forEach((p) => {
      const num = parseInt(p.dataset.panel, 10);
      p.classList.toggle('hidden', num !== n);
    });
    steps().forEach((s) => s.classList.toggle('active', parseInt(s.dataset.step, 10) <= n));
    if (btnPrev) btnPrev.disabled = n === 1;
    if (btnNext) btnNext.classList.toggle('hidden', n === 4);
    if (btnSubmit) btnSubmit.classList.toggle('hidden', n !== 4);
  }

  function getFormData() {
    const fd = new FormData(form);
    return Object.fromEntries(fd.entries());
  }

  function buildReview() {
    const d = getFormData();
    const lines = [
      `Identificação: ${d.idTipo || '-'}`,
      d.idTipo !== 'anonimo' ? `Nome/contato: ${d.nome || '-'} / ${d.contato || '-'}` : '',
      `Escola: ${d.escola || '-'}`,
      `Tipo: ${d.tipo || '-'} | Frequência: ${d.frequencia || '-'} | Urgência: ${d.urgencia || '-'}`,
      '',
      `Relato:`,
      d.relato || '-'
    ].filter(Boolean);
    document.getElementById('reviewBox').textContent = lines.join('\n');
  }

  btnNext?.addEventListener('click', () => {
    if (current === 1) {
      const nome = form.nome?.value.trim();
      const cont = form.contato?.value.trim();
      if (!nome || !cont) {
        alert('Preencha nome e contato para que possamos retornar se for necessário. Em modo anônimo, os dados ficam sigilosos.');
        return;
      }
    }
    if (current === 2) {
      if (!form.escola?.value.trim() || !form.tipo?.value || !form.frequencia?.value) {
        alert('Preencha escola, tipo e frequência.');
        return;
      }
    }
    if (current === 3) {
      if (!form.relato?.value.trim()) {
        alert('Descreva o ocorrido.');
        return;
      }
      buildReview();
    }
    if (current < 4) showStep(current + 1);
  });

  btnPrev?.addEventListener('click', () => {
    if (current > 1) showStep(current - 1);
  });

  function genProtocol() {
    const y = new Date().getFullYear();
    const r = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `JSB-${y}-${r}`;
  }

  function loadReports() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveReport(rep) {
    const all = loadReports();
    all.unshift(rep);
    localStorage.setItem(LS_KEY, JSON.stringify(all));
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.veracidade?.checked) {
      alert('Confirme a declaração de veracidade.');
      return;
    }
    const d = getFormData();
    const protocol = genProtocol();
    const rep = {
      protocol,
      status: 'Recebido',
      created: new Date().toISOString(),
      data: d
    };
    saveReport(rep);
    document.getElementById('modalProtocol').textContent = protocol;
    document.getElementById('successModal')?.classList.remove('hidden');
    form.reset();
    document.querySelectorAll('input[name="idTipo"]')[0].checked = true;
    const anonMsg = document.getElementById('anonMessage');
    if (camposIdent) camposIdent.hidden = false;
    if (anonMsg) anonMsg.hidden = false;
    showStep(1);
  });

  document.getElementById('modalClose')?.addEventListener('click', () => {
    document.getElementById('successModal')?.classList.add('hidden');
  });

  document.getElementById('protocolBtn')?.addEventListener('click', () => {
    const code = document.getElementById('protocolInput')?.value.trim().toUpperCase();
    const box = document.getElementById('protocolResult');
    if (!code || !box) return;
    const rep = loadReports().find((r) => r.protocol === code);
    box.classList.remove('hidden');
    if (!rep) {
      box.style.background = '#fef2f2';
      box.style.borderColor = '#fecaca';
      box.style.color = '#991b1b';
      box.textContent = 'Protocolo não encontrado neste navegador (demonstração local).';
      return;
    }
    box.style.background = '#ecfdf5';
    box.style.borderColor = '#a7f3d0';
    box.style.color = '#065f46';
    box.innerHTML = `<strong>Status:</strong> ${rep.status}<br><small>Atualizado: ${new Date(rep.created).toLocaleString('pt-BR')}</small>`;
  });

  document.getElementById('adminLogin')?.addEventListener('click', () => {
    const code = document.getElementById('adminCode')?.value;
    const app = document.getElementById('adminApp');
    const accessBlock = document.getElementById('adminAccessBlock');
    const accessBtn = document.getElementById('adminAccess');
    if (!app) return;
    if (code !== ADMIN_CODE) {
      alert('Código inválido.');
      return;
    }
    if (accessBlock) accessBlock.classList.remove('hidden');

    const schoolName = localStorage.getItem(LS_SCHOOL) || '';
    const schoolInput = document.getElementById('adminSchoolName');
    if (schoolInput && schoolName && !schoolInput.value) schoolInput.value = schoolName;

    // Tabs
    document.querySelectorAll('.ouv-admin-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll('.ouv-admin-tab').forEach((t) => {
          t.classList.toggle('active', t.dataset.tab === tab);
          t.setAttribute('aria-selected', t.dataset.tab === tab ? 'true' : 'false');
        });
        document.querySelectorAll('.ouv-admin-panel').forEach((p) => {
          p.classList.toggle('active', p.dataset.panel === tab);
        });
      });
    });

    const normalize = (s) => (s || '').toString().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').trim();

    function loadPeople() {
      try {
        return JSON.parse(localStorage.getItem(LS_PEOPLE) || '[]');
      } catch {
        return [];
      }
    }

    function savePeople(people) {
      localStorage.setItem(LS_PEOPLE, JSON.stringify(people));
    }

    function loadPros() {
      try {
        return JSON.parse(localStorage.getItem(LS_PROS) || '[]');
      } catch {
        return [];
      }
    }

    function savePros(pros) {
      localStorage.setItem(LS_PROS, JSON.stringify(pros));
    }

    function getSchoolFilter() {
      const v = document.getElementById('adminSchoolName')?.value || '';
      if (v) localStorage.setItem(LS_SCHOOL, v);
      return v;
    }

    function filterReports() {
      const school = normalize(getSchoolFilter());
      const reports = loadReports();
      if (!school) return reports;
      return reports.filter((r) => normalize(r?.data?.escola) && normalize(r.data.escola).includes(school));
    }

    function setStatus(protocol, newStatus) {
      const arr = loadReports();
      const item = arr.find((x) => x.protocol === protocol);
      if (!item) return;
      item.status = newStatus;
      localStorage.setItem(LS_KEY, JSON.stringify(arr));
    }

    function setAssigned(protocol, proId) {
      const arr = loadReports();
      const item = arr.find((x) => x.protocol === protocol);
      if (!item) return;
      item.assignedProfessionalId = proId || '';
      localStorage.setItem(LS_KEY, JSON.stringify(arr));
    }

    function formatDate(ptIso) {
      try {
        return new Date(ptIso).toLocaleDateString('pt-BR');
      } catch {
        return '';
      }
    }

    function escapeHtml(str) {
      return (str || '').toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function renderPeople() {
      const school = getSchoolFilter();
      const people = loadPeople();
      const funcs = people.filter((p) => p.kind === 'funcionario' && normalize(p.escola) && normalize(p.escola).includes(normalize(school)));
      const alunos = people.filter((p) => p.kind === 'aluno' && normalize(p.escola) && normalize(p.escola).includes(normalize(school)));
      const pros = loadPros().filter((p) => p.kind === 'profissional' && normalize(p.escola) && normalize(p.escola).includes(normalize(school)));

      const funcList = document.getElementById('funcList');
      const alunoList = document.getElementById('alunoList');
      const proList = document.getElementById('proList');
      if (funcList) {
        funcList.innerHTML = funcs.length
          ? funcs.map((p) => `<div class="ouv-admin-item"><strong>${escapeHtml(p.nome)}</strong><span class="ouv-admin-item-meta">${escapeHtml(p.cargo || '')}${p.cargo ? ' · ' : ''}${escapeHtml(p.contato || '')}</span></div>`).join('')
          : '<div class="ouv-muted">Nenhum funcionário cadastrado para esta escola.</div>';
      }
      if (alunoList) {
        alunoList.innerHTML = alunos.length
          ? alunos.map((p) => `<div class="ouv-admin-item"><strong>${escapeHtml(p.nome)}</strong><span class="ouv-admin-item-meta">${escapeHtml(p.turma || '')}${p.turma ? ' · ' : ''}${escapeHtml(p.responsavel || '')}</span></div>`).join('')
          : '<div class="ouv-muted">Nenhum aluno cadastrado para esta escola.</div>';
      }
      if (proList) {
        proList.innerHTML = pros.length
          ? pros.map((p) => `<div class="ouv-admin-item"><strong>${escapeHtml(p.nome)}</strong><span class="ouv-admin-item-meta">${escapeHtml(p.tipo || '')}${p.tipo ? ' · ' : ''}${escapeHtml(p.contato || '')}</span></div>`).join('')
          : '<div class="ouv-muted">Nenhum profissional parceiro cadastrado para esta escola.</div>';
      }
    }

    function renderProtocols() {
      const list = document.getElementById('protocolsList');
      const empty = document.getElementById('protocolsEmpty');
      if (!list || !empty) return;
      const search = normalize(document.getElementById('protocolSearch')?.value || '');
      const status = document.getElementById('protocolStatusFilter')?.value || 'all';
      const pros = loadPros().filter((p) => p.kind === 'profissional' && normalize(p.escola) && normalize(p.escola).includes(normalize(getSchoolFilter())));
      const proLabel = (id) => {
        const pro = pros.find((p) => p.id === id);
        if (!pro) return '';
        const prefix = pro.tipo === 'advogado' ? 'Advogado' : pro.tipo === 'psicologo' ? 'Psicólogo' : 'Profissional';
        return `${prefix}: ${pro.nome}`;
      };

      let reports = filterReports();
      if (search) reports = reports.filter((r) => normalize(r.protocol).includes(search));
      if (status !== 'all') reports = reports.filter((r) => r.status === status);
      reports.sort((a, b) => new Date(b.created) - new Date(a.created));

      if (!reports.length) {
        list.innerHTML = '';
        empty.textContent = 'Nenhum protocolo encontrado para estes filtros.';
        return;
      }
      empty.textContent = '';

      list.innerHTML = reports.map((r) => {
        const freq = r.data?.frequencia || '-';
        const type = r.data?.tipo || '-';
        const urg = r.data?.urgencia || '-';
        return `
          <div class="ouv-protocol-card" data-protocol="${escapeHtml(r.protocol)}">
            <div class="ouv-protocol-top">
              <div>
                <div class="ouv-protocol-proto"><strong>${escapeHtml(r.protocol)}</strong></div>
                <div class="ouv-muted">${escapeHtml(formatDate(r.created))} · ${escapeHtml(r.data?.escola || '')}</div>
              </div>
              <div class="ouv-protocol-status">
                <label class="ouv-label-small">Status</label>
                <select class="ouv-status-sel" data-protocol="${escapeHtml(r.protocol)}">
                  ${['Recebido', 'Em análise', 'Encaminhado', 'Concluído'].map((s) => `
                    <option ${r.status === s ? 'selected' : ''}>${s}</option>
                  `).join('')}
                </select>
              </div>
                <div class="ouv-protocol-assign">
                  <label class="ouv-label-small">Encaminhar para</label>
                  <select class="ouv-assign-sel" data-protocol="${escapeHtml(r.protocol)}">
                    <option value="" ${(!r.assignedProfessionalId ? 'selected' : '')}>Sem encaminhamento</option>
                    ${pros.length
                      ? pros.map((p) => {
                          const prefix = p.tipo === 'advogado' ? 'Advogado' : p.tipo === 'psicologo' ? 'Psicólogo' : 'Profissional';
                          const selected = (r.assignedProfessionalId === p.id) ? 'selected' : '';
                          return `<option value="${escapeHtml(p.id)}" ${selected}>${prefix}: ${escapeHtml(p.nome)}</option>`;
                        }).join('')
                      : `<option value="">Sem profissionais cadastrados</option>`}
                  </select>
                </div>
            </div>
            <div class="ouv-protocol-meta">
              <span class="ouv-chip">${escapeHtml(type)}</span>
              <span class="ouv-chip">Frequência: ${escapeHtml(freq)}</span>
              <span class="ouv-chip">Urgência: ${escapeHtml(urg)}</span>
              ${r.assignedProfessionalId ? `<span class="ouv-chip">${escapeHtml(proLabel(r.assignedProfessionalId))}</span>` : ''}
            </div>
          </div>
        `;
      }).join('');

      list.querySelectorAll('.ouv-status-sel').forEach((sel) => {
        sel.addEventListener('change', () => {
          const protocol = sel.dataset.protocol;
          setStatus(protocol, sel.value);
          // Atualiza protocolos e relatórios
          renderProtocols();
          renderReport();
        });
      });

      list.querySelectorAll('.ouv-assign-sel').forEach((sel) => {
        sel.addEventListener('change', () => {
          const protocol = sel.dataset.protocol;
          setAssigned(protocol, sel.value);
          renderProtocols();
          renderReport();
        });
      });
    }

    function renderReport() {
      const reportCards = document.getElementById('reportCards');
      const freqSummary = document.getElementById('freqSummary');
      const reportDetailList = document.getElementById('reportDetailList');
      if (!reportCards || !freqSummary) return;

      const startVal = document.getElementById('reportStart')?.value;
      const endVal = document.getElementById('reportEnd')?.value;
      const status = document.getElementById('reportStatus')?.value || 'all';

      let reports = filterReports();
      if (startVal) {
        const start = new Date(startVal + 'T00:00:00');
        reports = reports.filter((r) => new Date(r.created) >= start);
      }
      if (endVal) {
        const end = new Date(endVal + 'T23:59:59');
        reports = reports.filter((r) => new Date(r.created) <= end);
      }
      if (status !== 'all') reports = reports.filter((r) => r.status === status);

      const school = getSchoolFilter();
      const pros = loadPros().filter((p) => p.kind === 'profissional' && normalize(p.escola) && normalize(p.escola).includes(normalize(school)));
      const proById = new Map(pros.map((p) => [p.id, p]));
      const proLabel = (id) => {
        const pro = proById.get(id);
        if (!pro) return '';
        const prefix = pro.tipo === 'advogado' ? 'Advogado' : pro.tipo === 'psicologo' ? 'Psicólogo' : 'Profissional';
        return `${prefix}: ${pro.nome}`;
      };

      const total = reports.length;
      const byStatus = ['Recebido', 'Em análise', 'Encaminhado', 'Concluído'].map((s) => ({ s, n: reports.filter((r) => r.status === s).length }));
      const byFreq = ['unica', 'recorrente'].map((f) => ({
        f,
        n: reports.filter((r) => r.data?.frequencia === f).length
      }));
      const byTypeKeys = ['fisico', 'verbal', 'social', 'cyber', 'outro'];
      const byType = byTypeKeys.map((k) => ({ k, n: reports.filter((r) => r.data?.tipo === k).length }));

      const freqLabel = (v) => (v === 'unica' ? 'Uma vez' : v === 'recorrente' ? 'Recorrente' : v);

      reportCards.innerHTML = `
        <div class="ouv-report-card">
          <div class="ouv-report-card-title">Total de denúncias</div>
          <div class="ouv-report-card-value">${total}</div>
        </div>
        <div class="ouv-report-card">
          <div class="ouv-report-card-title">Por status</div>
          <div class="ouv-report-list">${byStatus.map((x) => `<div class="ouv-report-list-item"><span>${x.s}</span><strong>${x.n}</strong></div>`).join('')}</div>
        </div>
        <div class="ouv-report-card">
          <div class="ouv-report-card-title">Por tipo</div>
          <div class="ouv-report-list">${byType.map((x) => `<div class="ouv-report-list-item"><span>${escapeHtml(x.k)}</span><strong>${x.n}</strong></div>`).join('')}</div>
        </div>
      `;

      freqSummary.innerHTML = `
        ${byFreq.map((x) => {
          const pct = total ? Math.round((x.n / total) * 100) : 0;
          return `<div class="ouv-admin-item"><strong>${freqLabel(x.f)}</strong><span class="ouv-admin-item-meta">${x.n} denúncias · ${pct}%</span></div>`;
        }).join('')}
      `;

      if (reportDetailList) {
        reportDetailList.innerHTML = reports.length
          ? reports.map((r) => {
              const freq = r.data?.frequencia || '-';
              const type = r.data?.tipo || '-';
              const urg = r.data?.urgencia || '-';
              const assigned = r.assignedProfessionalId ? proLabel(r.assignedProfessionalId) : '';
              return `
                <div class="ouv-admin-item">
                  <strong>${escapeHtml(r.protocol)}</strong>
                  <span class="ouv-admin-item-meta">
                    ${escapeHtml(formatDate(r.created))} · ${escapeHtml(r.status)} · ${escapeHtml(type)} · ${escapeHtml(freq)} · ${escapeHtml(urg)}${assigned ? ' · ' + escapeHtml(assigned) : ''}
                  </span>
                </div>
              `;
            }).join('')
          : '<div class="ouv-muted">Nenhuma denúncia encontrada com os filtros atuais.</div>';
      }
    }

    // Events
    document.getElementById('adminRefresh')?.addEventListener('click', () => {
      renderPeople();
      renderProtocols();
      renderReport();
    });

    document.getElementById('protocolSearch')?.addEventListener('input', () => renderProtocols());
    document.getElementById('protocolStatusFilter')?.addEventListener('change', () => renderProtocols());

    document.getElementById('genReport')?.addEventListener('click', () => renderReport());
    document.getElementById('downloadCsv')?.addEventListener('click', () => {
      const reports = (() => {
        let r = filterReports();
        const startVal = document.getElementById('reportStart')?.value;
        const endVal = document.getElementById('reportEnd')?.value;
        const status = document.getElementById('reportStatus')?.value || 'all';
        if (startVal) {
          const start = new Date(startVal + 'T00:00:00');
          r = r.filter((x) => new Date(x.created) >= start);
        }
        if (endVal) {
          const end = new Date(endVal + 'T23:59:59');
          r = r.filter((x) => new Date(x.created) <= end);
        }
        if (status !== 'all') r = r.filter((x) => x.status === status);
        return r;
      })();

      const school = getSchoolFilter();
      const pros = loadPros().filter((p) => p.kind === 'profissional' && normalize(p.escola) && normalize(p.escola).includes(normalize(school)));
      const proById = new Map(pros.map((p) => [p.id, p]));
      const proLabel = (id) => {
        const pro = proById.get(id);
        if (!pro) return '';
        const prefix = pro.tipo === 'advogado' ? 'Advogado' : pro.tipo === 'psicologo' ? 'Psicólogo' : 'Profissional';
        return `${prefix}: ${pro.nome}`;
      };

      const header = ['protocolo', 'status', 'data', 'escola', 'tipo', 'frequencia', 'urgencia', 'profissional_atribuido'];
      const rows = reports.map((r) => [
        r.protocol,
        r.status,
        new Date(r.created).toISOString(),
        r.data?.escola || '',
        r.data?.tipo || '',
        r.data?.frequencia || '',
        r.data?.urgencia || '',
        r.assignedProfessionalId ? proLabel(r.assignedProfessionalId) : ''
      ]);
      const csv = [header, ...rows].map((row) => row.map((c) => `"${(c ?? '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio_ouvidoria.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });

    document.getElementById('addFunc')?.addEventListener('click', () => {
      const nome = document.getElementById('funcNome')?.value.trim();
      const cargo = document.getElementById('funcCargo')?.value.trim();
      const contato = document.getElementById('funcContato')?.value.trim();
      const escola = getSchoolFilter();
      if (!nome || !escola) {
        alert('Informe nome do funcionário e o nome da escola.');
        return;
      }
      const people = loadPeople();
      people.push({ kind: 'funcionario', escola, nome, cargo, contato, created: new Date().toISOString() });
      savePeople(people);
      document.getElementById('funcNome').value = '';
      document.getElementById('funcCargo').value = '';
      document.getElementById('funcContato').value = '';
      renderPeople();
    });

    document.getElementById('addAluno')?.addEventListener('click', () => {
      const nome = document.getElementById('alunoNome')?.value.trim();
      const turma = document.getElementById('alunoTurma')?.value.trim();
      const responsavel = document.getElementById('alunoResp')?.value.trim();
      const escola = getSchoolFilter();
      if (!nome || !escola) {
        alert('Informe nome do aluno e o nome da escola.');
        return;
      }
      const people = loadPeople();
      people.push({ kind: 'aluno', escola, nome, turma, responsavel, created: new Date().toISOString() });
      savePeople(people);
      document.getElementById('alunoNome').value = '';
      document.getElementById('alunoTurma').value = '';
      document.getElementById('alunoResp').value = '';
      renderPeople();
    });

    document.getElementById('addPro')?.addEventListener('click', () => {
      const tipo = document.getElementById('proTipo')?.value;
      const nome = document.getElementById('proNome')?.value.trim();
      const contato = document.getElementById('proContato')?.value.trim();
      const escola = getSchoolFilter();
      if (!tipo || !nome || !escola) {
        alert('Selecione o tipo, informe o nome do profissional e a escola.');
        return;
      }
      const pros = loadPros();
      pros.push({
        kind: 'profissional',
        id: 'pro_' + Math.random().toString(36).slice(2, 10).toUpperCase(),
        escola,
        tipo,
        nome,
        contato,
        created: new Date().toISOString()
      });
      savePros(pros);
      document.getElementById('proTipo').value = '';
      document.getElementById('proNome').value = '';
      document.getElementById('proContato').value = '';
      renderPeople();
      renderProtocols();
      renderReport();
    });

    // Abre o Painel Administrativo apenas quando o usuário clicar em "Acesso Administrativo"
    if (accessBtn) {
      accessBtn.onclick = () => {
        app.classList.remove('hidden');
        renderPeople();
        renderProtocols();
        renderReport();
      };
    }
  });

  // ===== Painel Administrativo do Site (3º bloco) =====
  const siteAdminPanelApp = document.getElementById('siteAdminApp');
  const siteAdminCodeInput = document.getElementById('siteAdminCode');
  document.getElementById('siteAdminLogin')?.addEventListener('click', () => {
    const code = siteAdminCodeInput?.value;
    if (!siteAdminPanelApp) return;
    if (code !== SITE_ADMIN_CODE) {
      alert('Código do administrador do site inválido.');
      return;
    }
    siteAdminPanelApp.classList.remove('hidden');
    renderSiteProtocols();
  });

  function renderSiteProtocols() {
    const list = document.getElementById('siteProtocolsList');
    const empty = document.getElementById('siteProtocolsEmpty');
    const search = normalize(document.getElementById('siteProtocolSearch')?.value || '');
    const status = document.getElementById('siteStatusFilter')?.value || 'all';
    if (!list || !empty) return;

    const reports = (() => {
      try {
        return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      } catch {
        return [];
      }
    })();

    const pros = (() => {
      try {
        return JSON.parse(localStorage.getItem(LS_PROS) || '[]');
      } catch {
        return [];
      }
    })();

    const proById = new Map(pros.filter((p) => p.kind === 'profissional').map((p) => [p.id, p]));
    const proLabel = (id) => {
      const pro = proById.get(id);
      if (!pro) return '';
      const prefix = pro.tipo === 'advogado' ? 'Advogado' : pro.tipo === 'psicologo' ? 'Psicólogo' : 'Profissional';
      return `${prefix}: ${pro.nome}`;
    };

    let filtered = reports;
    if (search) filtered = filtered.filter((r) => normalize(r.protocol).includes(search));
    if (status !== 'all') filtered = filtered.filter((r) => r.status === status);
    filtered.sort((a, b) => new Date(b.created) - new Date(a.created));

    if (!filtered.length) {
      list.innerHTML = '';
      empty.textContent = 'Nenhum protocolo encontrado.';
      return;
    }
    empty.textContent = '';

    list.innerHTML = filtered.map((r) => {
      const type = r.data?.tipo || '-';
      const freq = r.data?.frequencia || '-';
      const urg = r.data?.urgencia || '-';
      const assigned = r.assignedProfessionalId ? proLabel(r.assignedProfessionalId) : '';
      return `
        <div class="ouv-protocol-card" data-protocol="${escapeHtml(r.protocol)}">
          <div class="ouv-protocol-top">
            <div>
              <div class="ouv-protocol-proto"><strong>${escapeHtml(r.protocol)}</strong></div>
              <div class="ouv-muted">${escapeHtml(formatDateSite(r.created))}</div>
            </div>
            <div class="ouv-protocol-status">
              <label class="ouv-label-small">Status</label>
              <select class="ouv-status-sel" data-protocol="${escapeHtml(r.protocol)}">
                ${['Recebido', 'Em análise', 'Encaminhado', 'Concluído'].map((s) => `
                  <option ${r.status === s ? 'selected' : ''}>${s}</option>
                `).join('')}
              </select>
            </div>
          </div>
          <div class="ouv-protocol-meta">
            <span class="ouv-chip">${escapeHtml(type)}</span>
            <span class="ouv-chip">Frequência: ${escapeHtml(freq)}</span>
            <span class="ouv-chip">Urgência: ${escapeHtml(urg)}</span>
            ${assigned ? `<span class="ouv-chip">${escapeHtml(assigned)}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.ouv-status-sel').forEach((sel) => {
      sel.addEventListener('change', () => {
        const protocol = sel.dataset.protocol;
        const newStatus = sel.value;
        setSiteStatus(protocol, newStatus);
        renderSiteProtocols();
      });
    });
  }

  function setSiteStatus(protocol, newStatus) {
    const arr = (() => {
      try {
        return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      } catch {
        return [];
      }
    })();
    const item = arr.find((x) => x.protocol === protocol);
    if (!item) return;
    item.status = newStatus;
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
  }

  function normalize(s) {
    return (s || '').toString().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').trim();
  }

  function escapeHtml(str) {
    return (str || '').toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatDateSite(iso) {
    try {
      return new Date(iso).toLocaleDateString('pt-BR');
    } catch {
      return '';
    }
  }

  document.getElementById('siteProtocolSearch')?.addEventListener('input', () => renderSiteProtocols());
  document.getElementById('siteStatusFilter')?.addEventListener('change', () => renderSiteProtocols());
  document.getElementById('siteDownloadCsv')?.addEventListener('click', () => {
    const reports = (() => {
      try {
        return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      } catch {
        return [];
      }
    })();
    const search = normalize(document.getElementById('siteProtocolSearch')?.value || '');
    const status = document.getElementById('siteStatusFilter')?.value || 'all';
    let filtered = reports;
    if (search) filtered = filtered.filter((r) => normalize(r.protocol).includes(search));
    if (status !== 'all') filtered = filtered.filter((r) => r.status === status);
    filtered.sort((a, b) => new Date(b.created) - new Date(a.created));

    const header = ['protocolo', 'status', 'data', 'escola', 'tipo', 'frequencia', 'urgencia', 'profissional_atribuido'];
    const rows = filtered.map((r) => ([
      r.protocol,
      r.status,
      new Date(r.created).toISOString(),
      r.data?.escola || '',
      r.data?.tipo || '',
      r.data?.frequencia || '',
      r.data?.urgencia || '',
      r.assignedProfessionalId || ''
    ]));
    const csv = [header, ...rows].map((row) => row.map((c) => `"${(c ?? '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_admin_site.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  showStep(1);
})();
