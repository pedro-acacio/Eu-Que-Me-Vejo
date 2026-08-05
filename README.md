# Eu Que Me Vejo

Site pessoal / PWA de Socorro Silveira — página única em HTML/CSS/JS puro, instalável como aplicativo (manifest, ícones, splash screens para iOS incluídos).

## Como ver

Abra `index.html` no navegador — não precisa de instalação nem servidor. Também pode ser "instalado" a partir do navegador (Adicionar à tela inicial) graças ao `manifest.json`.

## Estrutura

- `index.html` — todo o conteúdo, estilos e scripts da página
- `manifest.json` — configuração de PWA (nome, ícones, cores)
- `icons/`, `photos/`, `splash/` — imagens usadas na página e nas telas de abertura em iOS

## Dependências externas

A página carrega a fonte do Google Fonts e a biblioteca [jsPDF](https://github.com/parallax/jsPDF) via CDN — é necessário estar conectado à internet para esses recursos carregarem.

## Rodando localmente

Basta abrir `index.html` direto no navegador ou servir a pasta com qualquer servidor estático (ex: `npx serve .`).
