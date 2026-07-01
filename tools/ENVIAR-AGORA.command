#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
GH="$SCRIPT_DIR/gh"

echo "============================================"
echo "  Enviando site-JCB para o GitHub"
echo "============================================"
echo ""

if [ ! -x "$GH" ]; then
  echo "Erro: gh não encontrado em $GH"
  read -p "Pressione ENTER para fechar..."
  exit 1
fi

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "Você ainda não fez login. Abrindo login no navegador..."
  "$GH" auth login -h github.com -p https -w
fi

"$GH" auth setup-git

echo "Enviando projeto (pode demorar 1-2 minutos)..."
cd "$PROJECT_DIR" || exit 1
git push --force origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ SUCESSO! Vídeos enviados."
  echo "   https://github.com/daatmidia/JUVENTUDECONTRAOBULLING/tree/main/assets"
  open "https://github.com/daatmidia/JUVENTUDECONTRAOBULLING/tree/main/assets"
else
  echo ""
  echo "❌ Falhou. Copie a mensagem de erro acima e envie para ajuda."
fi

echo ""
read -p "Pressione ENTER para fechar..."
