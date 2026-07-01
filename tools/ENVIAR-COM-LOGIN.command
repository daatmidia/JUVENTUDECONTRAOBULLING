#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
GH="$SCRIPT_DIR/gh"

echo "============================================"
echo "  Login no GitHub + envio completo"
echo "============================================"
echo ""

if [ ! -x "$GH" ]; then
  echo "Erro: GitHub CLI não encontrado em $GH"
  read -p "Pressione ENTER para fechar..."
  exit 1
fi

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "PASSO 1 — Vai abrir o login no navegador."
  echo "         Escolha: GitHub.com → HTTPS → Login with browser"
  echo ""
  read -p "Pressione ENTER para iniciar o login..."
  "$GH" auth login -h github.com -p https -w
else
  echo "✓ Já logado no GitHub como daatmidia"
fi

echo ""
echo "PASSO 2 — Configurando Git..."
"$GH" auth setup-git

echo ""
echo "PASSO 3 — Enviando projeto completo (com vídeos)..."
cd "$PROJECT_DIR" || exit 1
git push --force origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ SUCESSO!"
  echo "   https://github.com/daatmidia/JUVENTUDECONTRAOBULLING/tree/main/assets"
  open "https://github.com/daatmidia/JUVENTUDECONTRAOBULLING/tree/main/assets"
else
  echo ""
  echo "❌ Falhou. Tente o upload em lotes (pasta upload-lotes)."
fi

echo ""
read -p "Pressione ENTER para fechar..."
