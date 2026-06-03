# Portal Juventude Sem Bullying

Projeto estático (HTML + CSS + JavaScript) salvo em:

**`Documents/portal-juventude-sem-bullying/`**

## Arquivos

| Arquivo | Descrição |
|--------|------------|
| `index.html` | Página inicial (notícias, sobre, dados, depoimentos) |
| `styles.css` | Estilos principais (tema neon + layout responsivo) |
| `script.js` | Menu mobile, partículas, carrossel, busca de notícias (RSS) |
| `ouvidoria.html` / `ouvidoria.css` / `ouvidoria.js` | Ouvidoria em etapas, protocolo e painel demo (localStorage) |
| `conheca-o-projeto.html` / `.css` / `.js` | Página educativa (direitos e deveres) |

## Como ver no computador

1. Abra a pasta `portal-juventude-sem-bullying` no Finder.
2. Dê **duplo clique** em `index.html` (abre no navegador).

Ou pelo Terminal:

```bash
cd ~/Documents/portal-juventude-sem-bullying
python3 -m http.server 8080
```

Depois acesse: `http://localhost:8080`

> As notícias usam a API pública `rss2json.com` e feeds RSS. É preciso **internet**. Se algo falhar, o site mostra notícias de exemplo.

## Ouvidoria (demonstração)

- Os registros ficam no **navegador** (`localStorage`), não em servidor.
- Painel escola (demo): código **`escola2026`**.
