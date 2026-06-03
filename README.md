# Portal Projeto REACT

Projeto estático (HTML + CSS + JavaScript) salvo em:

**`Documents/site-juventude-sem-limites-site/`**

## Arquivos

| Arquivo | Descrição |
|--------|------------|
| `index.html` | Página inicial (notícias, sobre, dados, depoimentos) |
| `styles.css` | Estilos principais (tema neon + layout responsivo) |
| `script.js` | Menu mobile, partículas, carrossel, busca de notícias (RSS) |
| `ouvidoria.html` / `ouvidoria.css` / `ouvidoria.js` | Ouvidoria em etapas, protocolo e painel demo (localStorage) |
| `conheca-o-projeto.html` / `.css` / `.js` | Página educativa (direitos e deveres) |

## Como ver no computador

1. Abra a pasta `site-juventude-sem-limites-site` no Finder.
2. Dê **duplo clique** em `index.html` (abre no navegador).

Ou pelo Terminal:

```bash
cd ~/Documents/site-juventude-sem-limites-site
python3 -m http.server 8080
```

Depois acesse: `http://localhost:8080`

> As notícias usam a API pública `rss2json.com` e feeds RSS. É preciso **internet**. Se algo falhar, o site mostra notícias de exemplo.

## Ouvidoria (demonstração)

- Os registros ficam no **navegador** (`localStorage`), não em servidor.
- Painel escola (demo): código **`escola2026`**.
