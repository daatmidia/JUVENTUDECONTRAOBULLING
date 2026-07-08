#!/bin/bash
cd "$(dirname "$0")"

echo "============================================"
echo "  Enviar site-JCB para o GitHub"
echo "============================================"
echo ""
echo "Repositório: daatmidia/JUVENTUDECONTRAOBULLING"
echo ""
echo "Se pedir USUÁRIO: daatmidia"
echo "Se pedir SENHA: cole seu TOKEN do GitHub"
echo "  (crie em: github.com/settings/tokens)"
echo ""
echo "Enviando..."
echo ""

git push --force origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ SUCESSO! Projeto enviado com vídeos."
  echo "   https://github.com/daatmidia/JUVENTUDECONTRAOBULLING"
else
  echo ""
  echo "❌ Falhou. Tente pelo GitHub Desktop:"
  echo "   1. Repository → Repository Settings"
  echo "   2. Marque 'Allow force push'"
  echo "   3. Branch → Force push to origin"
fi

echo ""
read -p "Pressione ENTER para fechar..."
