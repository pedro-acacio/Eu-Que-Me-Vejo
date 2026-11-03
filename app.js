/* =========================================================
   Eu Que Me Vejo · v2
   Diário entre sessões inspirado na ACT.
   Os dados ficam só neste aparelho (localStorage).
   ========================================================= */
'use strict';

/* ---------------- Dados fixos ---------------- */
const PRO = {
  name: 'Socorro Silveira',
  title: 'Psicóloga Clínica',
  crp: 'CRP 11/01149',
  specialty: 'Especialista em Terapias Contextuais com Base em Evidências Científicas',
  headline: 'Psicologia e Liderança · Saúde mental na vida e no trabalho',
  tagline: 'Tornei minha profissão uma fonte de crescimento e realização pessoal — o que me motiva a buscar, incessantemente, formas de levar as pessoas a atingirem o seu melhor.',
  bio: [
    'Muito prazer, sou Socorro Silveira. Amo o estudo e as pesquisas científicas sobre o fascinante universo da mente e sua influência na vida e na felicidade das pessoas. Abracei o propósito de ajudar pessoas a encontrarem uma vida valiosa e plena de significado.',
    'Há mais de duas décadas, minha trajetória é construída no encontro com pessoas, suas histórias e possibilidades de desenvolvimento. Meu olhar une clínica, liderança e emoções: o cuidado emocional e a construção de uma vida valiosa, com espaço para o que faz sentido para cada um.',
    'Trabalhar com psicologia é construir relações baseadas em confiança, respeito e empatia — por isso escolhi abordagens científicas apoiadas na escuta ativa e na compreensão genuína de necessidades e objetivos.',
    'Além da atuação clínica, sou Mestre em Administração de Empresas e Diretora Executiva de Gente e Gestão na Fortes Tecnologia, onde cuido das pessoas com foco em saúde mental, bem-estar e liderança no ambiente de trabalho.'
  ],
  approaches: ['Terapias Contextuais com Base em Evidências Científicas', 'ACT', 'Terapia de Esquema', 'Terapia Comportamental Dialética (DBT)', 'Psicodrama', 'TCC'],
  roles: [
    ['Diretora Executiva de Gente e Gestão', 'Fortes Tecnologia — saúde mental, bem-estar e liderança no trabalho'],
    ['Podcast Cuca Legal', 'Conversas sobre saúde mental no trabalho e gestão de pessoas, ao lado de Helaine Tahim'],
    ['Projeto Elas Transformam', 'Encontros de autoconhecimento e desenvolvimento de mulheres, a partir da Psicologia Positiva'],
    ['Palestrante', 'Saúde mental, segurança psicológica e liderança em empresas e eventos de RH']
  ],
  press: { img: 'photos/press-feature.jpg', alt: 'Matéria de revista sobre Socorro Silveira', caption: '"Gente de verdade não cabe em currículo" — matéria sobre autenticidade, repertório humano e escuta no recrutamento, com participação de Socorro Silveira.' },
  gallery: [
    ['photos/artmed-2026.jpg', 'Artmed Experience 2026 · São Paulo'],
    ['photos/elas-transformam-palestra.jpg', 'Elas Transformam · autoconhecimento e forças de caráter'],
    ['photos/mind-summit-2026.jpg', 'Mind Summit 2026'],
    ['photos/elas-transformam-encontro.jpg', 'Elas Transformam · encontro'],
    ['photos/premio-ser-humano.jpg', 'Prêmio Ser Humano 2026'],
    ['photos/rh-com-feijao.jpg', 'RH com Feijão 2026']
  ],
  photo: 'photos/perfil.jpg',
  instagram: { handle: '@socorrosilveirapsi', url: 'https://www.instagram.com/socorrosilveirapsi/' },
  email: 'socorrosilveira14@gmail.com',
  phones: [
    { label: '(85) 98761-4653', e164: '5585987614653' }
  ],
  address: 'Av. Engenheiro Santana Jr., 3000, Sala 901, Edifício Central Park, Cocó, Fortaleza/CE',
  mapsQuery: 'Av. Engenheiro Santana Jr., 3000, Edifício Central Park, Cocó, Fortaleza - CE'
};

const VALUES = ['Família','Trabalho','Saúde','Amor','Integridade','Amizade','Crescimento pessoal','Espiritualidade','Lazer','Criatividade','Comunidade','Autocuidado','Liberdade','Aprendizado','Natureza','Gratidão','Coragem','Autenticidade','Conexão','Propósito','Diversão','Justiça','Generosidade','Paz interior'];
const EMOTIONS = ['Ansiedade','Medo','Tristeza','Raiva','Culpa','Vergonha','Frustração','Solidão','Angústia','Cansaço','Irritação','Insegurança'];

const PRACTICES = [
  'Imagine cada pensamento como uma folha descendo um rio. Observe-a chegar, passar e seguir, sem precisar pegá-la.',
  'Diante de um pensamento difícil, acrescente antes dele: "Estou percebendo que tenho o pensamento de que...".',
  'Pare por um minuto e note cinco coisas que você vê, quatro que ouve e três que sente no corpo.',
  'Escolha um valor para hoje e um gesto pequeno, possível ainda hoje, que combine com ele.',
  'Quando um desconforto aparecer, experimente abrir espaço para ele, como quem abre a mão em vez de fechar o punho.',
  'Respire devagar três vezes e pergunte a si: o que é mais importante para mim neste momento?',
  'Dê um nome ao que sente ("isto é ansiedade") e observe em que parte do corpo isso aparece.',
  'Repita um pensamento difícil em voz baixa, bem devagar, até ele soar apenas como palavras.'
];

const FIELDS = [
  { k: 'situation', cls: 'f-sit', color: '--sit', label: 'O que aconteceu', icon: 'eye' },
  { k: 'emotions',  cls: 'f-emo', color: '--emo', label: 'O que senti',      icon: 'heart' },
  { k: 'struggle',  cls: 'f-str', color: '--str', label: 'Com o que lutei',  icon: 'waves' },
  { k: 'thoughts',  cls: 'f-tho', color: '--tho', label: 'Pensamentos',      icon: 'cloud' },
  { k: 'values',    cls: 'f-val', color: '--act', label: 'Valores',          icon: 'compass' },
  { k: 'action',    cls: 'f-act', color: '--act', label: 'Ação comprometida', icon: 'sprout' }
];
const F = Object.fromEntries(FIELDS.map(f => [f.k, f]));

const STEPS = [
  { key: 'situation', stage: 1, type: 'text', title: 'O que aconteceu?',
    hint: 'Descreva como uma câmera descreveria: só o fato, sem interpretação.',
    example: 'Por exemplo: "Recebi uma mensagem do meu chefe", e não "meu chefe está insatisfeito comigo".',
    placeholder: 'O que aconteceu, de forma objetiva...', help: 'help-situation' },
  { key: 'emotions', stage: 1, type: 'emotions', title: 'O que você sentiu?',
    hint: 'Escolha as emoções que apareceram e marque o quanto elas pesaram.', help: 'help-emotions' },
  { key: 'struggle', stage: 1, type: 'text', title: 'Com o que você começou a lutar?',
    hint: 'Aquilo que tentou empurrar para longe, evitar ou controlar: a sensação, a lembrança, o desconforto.',
    placeholder: 'O que você tentou evitar, controlar ou fazer desaparecer...', help: 'help-struggle' },
  { key: 'thoughts', stage: 1, type: 'text', title: 'Que pensamentos surgiram?',
    hint: 'Anote como quem anota o que ouve, e não como verdades.',
    example: 'Experimente começar com "Eu tive o pensamento de que...".',
    placeholder: 'Eu tive o pensamento de que...', help: 'help-thoughts' },
  { key: 'values', stage: 2, type: 'values', title: 'O que importa aqui, para você?',
    hint: 'Valores são direções a seguir, e não metas a cumprir. Escolha um ou mais.', help: 'help-values' },
  { key: 'action', stage: 2, type: 'text', title: 'Qual pequeno passo é possível?',
    hint: 'Mesmo sentindo o que sente agora. Não precisa ser grande, precisa ser seu.',
    placeholder: 'Um pequeno passo na direção do que importa...', help: 'help-action', after: true },
  { key: 'review', stage: 2, type: 'review', title: 'Revise seu registro' }
];

const EXAMPLE = {
  situation: 'Recebi um comentário do meu irmão sobre eu ter chegado atrasado.',
  emotions: ['Vergonha', 'Irritação'], intensityBefore: 7,
  struggle: 'Tentei explicar demais e me defender antes mesmo de ele terminar de falar.',
  thoughts: 'Eu tive o pensamento de que sou sempre visto como irresponsável.',
  values: ['Família', 'Integridade'],
  action: 'Respirar antes de responder e dizer apenas: "entendo, vou chegar mais cedo da próxima vez".',
  intensityAfter: 4
};

/* ---------------- Ícones (traço, estilo Lucide) ---------------- */
const ICONS = {
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>',
  sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  chevD: '<path d="m6 9 6 6 6-6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M12 14v4"/><path d="M10 16h4"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  copy: '<rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2"/>',
  edit: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
  phoneDev: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  stethoscope: '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  table: '<path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  shareIos: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',
  plusSquare: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>',
  dotsV: '<circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>',
  dotsH: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  compassOpen: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  trendDown: '<path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/>'
};
function icon(name, cls = '') {
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;
}

/* Emblema do espelho (identidade do app) */
const MIRROR = `<svg class="mirror-emblem" viewBox="18 6 84 188" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse cx="60" cy="80" rx="35" ry="47" fill="#FFFFFF" fill-opacity="0.08"/>
          <ellipse cx="60" cy="80" rx="40" ry="52" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="2.2"/>
          <ellipse cx="60" cy="80" rx="34.5" ry="46" stroke="#FFFFFF" stroke-opacity="0.55" stroke-width="1"/>
          <g stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="1" stroke-linecap="round">
            <line x1="60" y1="28" x2="60" y2="34"/>
            <line x1="60" y1="126" x2="60" y2="132"/>
            <line x1="20.5" y1="80" x2="26.5" y2="80"/>
            <line x1="93.5" y1="80" x2="99.5" y2="80"/>
            <line x1="33" y1="42" x2="37.4" y2="46.6"/>
            <line x1="87" y1="42" x2="82.6" y2="46.6"/>
            <line x1="33" y1="118" x2="37.4" y2="113.4"/>
            <line x1="87" y1="118" x2="82.6" y2="113.4"/>
          </g>
          <circle cx="60" cy="9" r="2" fill="#FFFFFF" fill-opacity="0.9"/>
          <path d="M60,15 C54,8 45,8 41,14 C40,18 44,21 49,20 C52,19.3 54.5,17.5 56,15.5"
                stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="1.3" stroke-linecap="round"/>
          <path d="M60,15 C66,8 75,8 79,14 C80,18 76,21 71,20 C68,19.3 65.5,17.5 64,15.5"
                stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="1.3" stroke-linecap="round"/>
          <path d="M60,15 L60,26" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="60" y1="132" x2="60" y2="150" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round"/>
          <ellipse cx="60" cy="153" rx="7.5" ry="2.4" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="1.2"/>
          <line x1="60" y1="156" x2="60" y2="172" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M38,186 C46,178 54,182 60,188 C66,182 74,178 82,186"
                stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="1.4" stroke-linecap="round"/>
          <ellipse cx="60" cy="188" rx="24" ry="4.4" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="1.1"/>
        </svg>`;

/* Os 4 quadrados do logo */
function mark(size = 44, anim = false) {
  const s = size, g = s * 0.06, q = (s - g) / 2, r = s * 0.1;
  return `<svg class="mark ${anim ? 'mark-anim' : ''}" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" aria-hidden="true">
    <rect x="0" y="0" width="${q}" height="${q}" rx="${r}" fill="#47A5AF"/>
    <rect x="${q + g}" y="0" width="${q}" height="${q}" rx="${r}" fill="#0095DA"/>
    <rect x="0" y="${q + g}" width="${q}" height="${q}" rx="${r}" fill="#8ED8F8"/>
    <rect x="${q + g}" y="${q + g}" width="${q}" height="${q}" rx="${r}" fill="#4A5A64"/>
  </svg>`;
}

/* ---------------- Utilidades ---------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const pad = n => String(n).padStart(2, '0');
function dateKey(d = new Date()) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function nowTime() { const d = new Date(); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; }
function parseKey(k) { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function daysBetween(a, b) { return Math.round((parseKey(dateKey(b)) - parseKey(dateKey(a))) / 86400000); }
const fmtBR = k => { const [y, m, d] = k.split('-'); return `${d}/${m}/${y}`; };
function fmtDayHead(k) {
  const diff = daysBetween(parseKey(k), new Date());
  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Ontem';
  return cap(parseKey(k).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }));
}
function fmtLong(k) { return cap(parseKey(k).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })); }
function fmtNum(n) { return n.toLocaleString('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: n % 1 ? 1 : 0 }); }
function avg(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null; }
function sortEntries(list, dir = -1) {
  return [...list].sort((a, b) => dir * ((a.date + a.time).localeCompare(b.date + b.time) || (a.id - b.id)));
}
function haptic() { try { navigator.vibrate && navigator.vibrate(10); } catch (e) {} }

/* ---------------- Armazenamento local ---------------- */
const KEY = 'euqmv:v2';
const state = { name: '', entries: [], theme: 'system', onboarded: false, draft: null, reminder: '20:00', installDismissed: false };
let storageOk = true;
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) Object.assign(state, JSON.parse(raw));
  } catch (e) { storageOk = false; }
  if (!Array.isArray(state.entries)) state.entries = [];
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch (e) {
    if (storageOk) toast('Este navegador não permite salvar. Exporte seus registros antes de fechar.');
    storageOk = false;
  }
}

/* ---------------- Tema ---------------- */
const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
function resolvedTheme() { return state.theme === 'system' ? (mq && mq.matches ? 'dark' : 'light') : state.theme; }
function applyTheme() {
  const t = resolvedTheme();
  document.documentElement.setAttribute('data-theme', t);
  $('#metaTheme').setAttribute('content', t === 'dark' ? '#141D22' : '#FAF7F1');
  $('#themeBtn').innerHTML = icon(t === 'dark' ? 'sun' : 'moon');
  $('#themeBtn').setAttribute('aria-label', t === 'dark' ? 'Usar tema claro' : 'Usar tema escuro');
  $('#settingsBtn').innerHTML = icon('settings');
}
mq && mq.addEventListener && mq.addEventListener('change', () => { if (state.theme === 'system') { applyTheme(); refresh(); } });

/* ---------------- Navegação ---------------- */
const ui = { view: 'home', histPeriod: '30', histValue: null, openEntry: null, patPeriod: '30', succScope: 'one' };
const TABS = [
  { v: 'home', label: 'Registrar', ic: 'pen' },
  { v: 'history', label: 'Histórico', ic: 'book' },
  { v: 'patterns', label: 'Padrões', ic: 'chart' },
  { v: 'about', label: 'Sobre', ic: 'info' }
];
function renderTabbar() {
  $('#tabbar').innerHTML = TABS.map(t => `
    <button class="tab" type="button" data-tab="${t.v}" ${ui.view === t.v ? 'aria-current="page"' : ''}>
      <span class="tab-ic">${icon(t.ic)}</span>${t.label}
    </button>`).join('');
}
function showView(v) {
  if (v === 'settings' && ui.view !== 'settings') ui.prevView = ui.view;
  ui.view = v;
  $$('.view').forEach(s => { s.hidden = s.id !== 'view-' + v; });
  renderTabbar();
  const sb = $('#settingsBtn'); if (v === 'settings') sb.setAttribute('aria-current', 'page'); else sb.removeAttribute('aria-current');
  renderView(v);
  window.scrollTo({ top: 0 });
}
function renderView(v) {
  ({ home: renderHome, history: renderHistory, patterns: renderPatterns, about: renderAbout, settings: renderSettings })[v]();
}
function refresh() { renderView(ui.view); }

/* ---------------- Início ---------------- */
function greeting() {
  const h = new Date().getHours();
  return h < 5 ? 'Boa noite' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
}
function draftHasContent(d) {
  return d && (d.situation || d.struggle || d.thoughts || d.action || (d.emotions || []).length || (d.values || []).length);
}
function renderHome() {
  const first = (state.name || '').trim().split(/\s+/)[0];
  const today = new Date();
  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 6);
  const thisWeek = state.entries.filter(e => e.date >= dateKey(weekAgo)).length;
  const last = sortEntries(state.entries)[0];
  let lastTxt = '—';
  if (last) {
    const d = daysBetween(parseKey(last.date), today);
    lastTxt = d === 0 ? 'Hoje' : d === 1 ? 'Ontem' : `${d} dias`;
  }
  const doy = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const practice = PRACTICES[doy % PRACTICES.length];
  const hasDraft = draftHasContent(state.draft);

  $('#view-home').innerHTML = `
    <div class="greet-date">${esc(cap(today.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })))}</div>
    <h1 class="view-title" id="homeTitle">${greeting()}${first ? ', ' + esc(first) : ''}.</h1>

    <div class="hero">
      ${mark(40)}
      <div class="hero-kicker">Diário entre sessões</div>
      <h2>${hasDraft ? 'Você tem um registro em andamento' : 'Como você está agora?'}</h2>
      <p>${hasDraft ? 'Ele ficou guardado de onde você parou.' : 'Reserve alguns minutos para observar o que está acontecendo, sem se perder nisso.'}</p>
      <div class="hero-actions">
        <button class="btn" type="button" data-act="new">${icon(hasDraft ? 'pen' : 'plus')} ${hasDraft ? 'Continuar registro' : 'Novo registro'}</button>
        ${hasDraft ? `<button class="btn btn-ghost-light" type="button" data-act="discard-draft">Começar de novo</button>` : ''}
      </div>
    </div>

    <div class="stats">
      <div class="stat"><div class="stat-v">${thisWeek}</div><div class="stat-k">nos últimos 7 dias</div></div>
      <div class="stat"><div class="stat-v">${state.entries.length}</div><div class="stat-k">registros no total</div></div>
      <div class="stat"><div class="stat-v">${lastTxt}</div><div class="stat-k">${last && lastTxt.includes('dias') ? 'desde o último' : 'último registro'}</div></div>
    </div>

    <h2 class="section-title">Prática do dia</h2>
    <div class="card practice">
      <div class="practice-k">${icon('leaf', 'ic-sm')} Um exercício de ACT</div>
      <p>${esc(practice)}</p>
    </div>

    <h2 class="section-title">Para começar</h2>
    <div class="card card-list">
      <button class="link-row" type="button" data-sheet="breathing" style="--lr-bg:var(--tho-pale);--lr-ink:var(--tho-ink)">
        <span class="lr-ic">${icon('wind')}</span>
        <span class="lr-main"><span class="lr-t">Pausa guiada</span><br><span class="lr-s">Um minuto de respiração para voltar ao presente</span></span>
        <span class="chev">${icon('chevR')}</span>
      </button>
      <button class="link-row" type="button" data-sheet="about-act">
        <span class="lr-ic">${icon('help')}</span>
        <span class="lr-main"><span class="lr-t">O que é ACT?</span><br><span class="lr-s">Os quatro pilares da terapia</span></span>
        <span class="chev">${icon('chevR')}</span>
      </button>
      <button class="link-row" type="button" data-sheet="example" style="--lr-bg:var(--act-pale);--lr-ink:var(--act-ink)">
        <span class="lr-ic">${icon('file')}</span>
        <span class="lr-main"><span class="lr-t">Ver um exemplo</span><br><span class="lr-s">Um registro preenchido do começo ao fim</span></span>
        <span class="chev">${icon('chevR')}</span>
      </button>
      <button class="link-row" type="button" data-go="about" style="--lr-bg:var(--str-pale);--lr-ink:var(--str-ink)">
        <span class="lr-ic">${icon('chat')}</span>
        <span class="lr-main"><span class="lr-t">Conhecer a psicóloga</span><br><span class="lr-s">Trajetória, contato e endereço</span></span>
        <span class="chev">${icon('chevR')}</span>
      </button>
    </div>

    <div class="quote">
      ${mark(28)}
      Observar é notar o que passa, como quem vê nuvens do lado de fora. Ruminar é entrar na nuvem e girar nela sem sair. Este diário é um convite a observar.
    </div>`;
}

/* ---------------- Fluxo de registro ---------------- */
const flow = { open: false, step: 0, d: null, editingId: null, dir: 1, done: false };
function blankDraft() {
  return { date: dateKey(), time: nowTime(), situation: '', emotions: [], intensityBefore: null, struggle: '', thoughts: '', values: [], action: '', intensityAfter: null };
}
function openFlow(entry = null) {
  flow.editingId = entry ? entry.id : null;
  if (entry) flow.d = JSON.parse(JSON.stringify(entry));
  else {
    if (!draftHasContent(state.draft)) state.draft = blankDraft();
    flow.d = state.draft;
  }
  flow.step = entry ? STEPS.length - 1 : 0;
  flow.dir = 1; flow.done = false; flow.open = true;
  hideInstallCard();
  $('#flow').hidden = false;
  document.body.classList.add('locked', 'flow-open');
  pushLayer('flow');
  renderFlow();
}
function persistDraft() { if (!flow.editingId) { state.draft = flow.d; save(); } }
function closeFlowNow() {
  flow.open = false;
  $('#flow').hidden = true;
  document.body.classList.remove('locked', 'flow-open');
  if (!flow.editingId && !flow.done && draftHasContent(flow.d)) toast('Rascunho guardado. Continue quando quiser.');
  refresh();
}
function closeFlow() { popLayer('flow', closeFlowNow); }

function renderFlow() {
  const step = STEPS[flow.step];
  const el = $('#flow');
  el.classList.toggle('stage-2', !flow.done && step.stage === 2);
  if (flow.done) return renderSuccess();

  const segs = STEPS.slice(0, 6).map((s, i) =>
    `<span class="${i <= flow.step ? 'on' : ''}" style="--seg:var(${F[s.key].color})"></span>`).join('');
  const isReview = step.type === 'review';
  el.innerHTML = `
    <div class="flow-inner">
      <div class="flow-top">
        ${flow.step === 0 ? '<span style="width:42px;flex:none"></span>' : `<button class="icon-btn" type="button" data-flow="back" aria-label="Voltar">${icon('chevL')}</button>`}
        <div class="progress" role="progressbar" aria-label="Progresso do registro" aria-valuemin="1" aria-valuemax="${STEPS.length}" aria-valuenow="${flow.step + 1}">${segs}</div>
        <button class="icon-btn" type="button" data-flow="close" aria-label="Fechar registro">${icon('x')}</button>
      </div>
      <div class="flow-body" id="flowBody">
        <div class="flow-step ${flow.dir < 0 ? 'back' : ''} ${isReview ? '' : F[step.key].cls}">
          <div class="stage-label"><span class="dot"></span>${step.stage === 1 ? 'Etapa 1 · Observando' : 'Etapa 2 · Compromisso'}</div>
          ${isReview ? reviewHTML() : stepHTML(step)}
        </div>
      </div>
      <div class="flow-foot-wrap">
        <p class="flow-need" id="flowNeed" aria-live="polite"></p>
        <div class="flow-foot">
          ${isReview
            ? `<button class="btn btn-primary" type="button" data-flow="save" id="flowNext">${icon('check')} ${flow.editingId ? 'Salvar alterações' : 'Salvar registro'}</button>`
            : `<button class="btn btn-primary" type="button" data-flow="next" id="flowNext">${flow.step === STEPS.length - 2 ? 'Revisar' : 'Continuar'} ${icon('chevR')}</button>`}
        </div>
      </div>
    </div>`;
  const h = $('.q-title', el);
  h && h.focus({ preventScroll: true });
  wireStep(step);
  updateNext();
}

/* Todos os campos são obrigatórios: cada passo só avança quando está completo */
function stepMissing(i) {
  const st = STEPS[i], d = flow.d;
  const txt = k => (d[k] || '').trim().length > 0;
  switch (st && st.key) {
    case 'situation': return !d.date || !d.time ? 'Informe a data e a hora.' : !txt('situation') ? 'Descreva o que aconteceu para continuar.' : '';
    case 'emotions': return !d.emotions.length ? 'Escolha ao menos uma emoção para continuar.' : d.intensityBefore == null ? 'Marque o quanto isso pesou, de 0 a 10.' : '';
    case 'struggle': return !txt('struggle') ? 'Escreva com o que você começou a lutar.' : '';
    case 'thoughts': return !txt('thoughts') ? 'Anote os pensamentos que surgiram.' : '';
    case 'values': return !d.values.length ? 'Escolha ao menos um valor para continuar.' : '';
    case 'action': return !txt('action') ? 'Escreva o pequeno passo possível.' : d.intensityAfter == null ? 'Marque a intensidade de agora, de 0 a 10.' : '';
    default: return '';
  }
}
function firstIncomplete() {
  for (let i = 0; i < STEPS.length - 1; i++) if (stepMissing(i)) return i;
  return -1;
}
function updateNext() {
  const btn = $('#flowNext'); if (!btn) return;
  const isReview = STEPS[flow.step].type === 'review';
  const blocked = isReview ? firstIncomplete() >= 0 : !!stepMissing(flow.step);
  btn.classList.toggle('is-blocked', blocked);
  btn.setAttribute('aria-disabled', blocked);
  if (!blocked) { const n = $('#flowNeed'); n.textContent = ''; n.classList.remove('show'); }
}
function warnMissing(msg) {
  const n = $('#flowNeed'), btn = $('#flowNext');
  n.textContent = msg; n.classList.add('show');
  btn.classList.remove('shake'); void btn.offsetWidth; btn.classList.add('shake');
  try { navigator.vibrate && navigator.vibrate([20, 40, 20]); } catch (e) {}
  const target = $('#fText') || $('.chip[aria-pressed="false"]', $('#flow'));
  if ($('#fText') && !$('#fText').value.trim()) $('#fText').focus();
  else if (msg.includes('0 a 10')) { const r = $('.range.unset', $('#flow')); r && r.focus(); }
  else if (target && target.classList.contains('chip')) target.focus();
}
function tryNext() {
  const msg = stepMissing(flow.step);
  if (msg) return warnMissing(msg);
  haptic();
  flowGo(flow.step + 1);
}

function stepHTML(s) {
  const f = F[s.key], d = flow.d;
  let body = '';
  if (s.key === 'situation') {
    body += `<div class="time-row">
      <label class="time-pill">${icon('calendar', 'ic-sm')}<span class="sr-only">Data</span><input type="date" id="fDate" value="${esc(d.date)}" max="${dateKey()}"></label>
      <label class="time-pill">${icon('clock', 'ic-sm')}<span class="sr-only">Hora</span><input type="time" id="fTime" value="${esc(d.time)}"></label>
    </div>`;
  }
  if (s.type === 'text') {
    body += `<div class="field"><label class="sr-only" for="fText">${esc(s.title)}</label>
      <textarea class="textarea" id="fText" rows="5" placeholder="${esc(s.placeholder)}">${esc(d[s.key])}</textarea></div>`;
  }
  if (s.type === 'emotions') {
    body += `<div class="chips" role="group" aria-label="Emoções">${EMOTIONS.map(e =>
      `<button class="chip" type="button" data-chip="emotions" data-v="${esc(e)}" aria-pressed="${d.emotions.includes(e)}">${d.emotions.includes(e) ? icon('check') : ''}${esc(e)}</button>`).join('')}</div>
      ${intensityHTML('intensityBefore', 'Quanto isso pesou?', 'De 0 (nada) a 10 (o máximo que já sentiu).')}`;
  }
  if (s.type === 'values') {
    body += `<div class="chips" role="group" aria-label="Valores">${VALUES.map(v =>
      `<button class="chip" type="button" data-chip="values" data-v="${esc(v)}" aria-pressed="${d.values.includes(v)}">${d.values.includes(v) ? icon('check') : ''}${esc(v)}</button>`).join('')}</div>`;
  }
  if (s.after) body += intensityHTML('intensityAfter', 'E agora, depois de observar?', 'Marque de novo a intensidade do que sente.');
  return `
    <div class="q-ic">${icon(f.icon)}</div>
    <h2 class="q-title" tabindex="-1">${esc(s.title)}</h2>
    <p class="q-hint">${esc(s.hint)}</p>
    ${s.example ? `<p class="q-example">${esc(s.example)}</p>` : ''}
    ${s.help ? `<button class="q-help" type="button" data-sheet="${s.help}">${icon('help', 'ic-sm')} Entenda este passo</button>` : ''}
    ${body}`;
}
function intensityHTML(key, title, sub) {
  const v = flow.d[key];
  const unset = v === null || v === undefined;
  return `<div class="intensity">
    <div class="intensity-head">
      <div><label class="label" for="r-${key}" style="margin:0;color:var(--ink)">${esc(title)}</label><div class="setting-help" style="margin:2px 0 0">${esc(sub)}</div></div>
      <div class="intensity-v ${unset ? 'unset' : ''}" id="v-${key}" aria-hidden="true">${unset ? '—' : v}</div>
    </div>
    <input class="range ${unset ? 'unset' : ''}" type="range" min="0" max="10" step="1" id="r-${key}" data-key="${key}" value="${unset ? 5 : v}" style="--p:${(unset ? 5 : v) * 10}%" aria-valuetext="${unset ? 'Não marcado' : v + ' de 10'}">
    <div class="range-scale"><span>0 · nada</span><span>10 · muito</span></div>
  </div>`;
}
function wireStep(s) {
  const d = flow.d;
  const t = $('#fText');
  if (t) t.addEventListener('input', () => { d[s.key] = t.value; persistDraft(); updateNext(); });
  const fd = $('#fDate'), ft = $('#fTime');
  fd && fd.addEventListener('change', () => { d.date = fd.value; persistDraft(); updateNext(); });
  ft && ft.addEventListener('change', () => { d.time = ft.value; persistDraft(); updateNext(); });
  $$('.range', $('#flow')).forEach(r => {
    const upd = () => {
      const k = r.dataset.key, v = Number(r.value);
      d[k] = v; r.classList.remove('unset'); r.style.setProperty('--p', v * 10 + '%');
      r.setAttribute('aria-valuetext', v + ' de 10');
      const out = $('#v-' + k); out.textContent = v; out.classList.remove('unset');
      persistDraft(); updateNext();
    };
    r.addEventListener('input', upd);
    r.addEventListener('pointerdown', upd);
  });
}
function reviewHTML() {
  const d = flow.d;
  const rows = FIELDS.map(f => {
    let v = d[f.k];
    let txt;
    if (Array.isArray(v)) txt = v.length ? v.join(', ') : '';
    else txt = (v || '').trim();
    if (f.k === 'emotions' && d.intensityBefore != null) txt += (txt ? ' · ' : '') + `intensidade ${d.intensityBefore}/10`;
    if (f.k === 'action' && d.intensityAfter != null) txt += (txt ? '\n' : '') + `Intensidade depois: ${d.intensityAfter}/10`;
    const stepIdx = STEPS.findIndex(s => s.key === f.k);
    return `<button class="rv ${f.cls}" type="button" data-jump="${stepIdx}">
      <div class="rv-k">${icon(f.icon, 'ic-sm')} ${esc(f.label)} <span class="edit">${icon('edit', 'ic-sm')}</span></div>
      <div class="rv-v ${txt ? '' : 'rv-empty'}">${txt ? esc(txt) : 'Obrigatório: toque para preencher'}</div>
    </button>`;
  }).join('');
  return `
    <div class="q-ic" style="--f-pale:var(--act-pale);--f-ink:var(--act-ink)">${icon('check')}</div>
    <h2 class="q-title" tabindex="-1">Revise seu registro</h2>
    <p class="q-hint">${esc(fmtLong(d.date))}, às ${esc(d.time)}. Toque em um item para ajustar.</p>
    <div class="review-list">${rows}</div>`;
}
function flowGo(i) {
  flow.dir = i > flow.step ? 1 : -1;
  flow.step = Math.max(0, Math.min(STEPS.length - 1, i));
  renderFlow();
  $('#flowBody') && ($('#flowBody').scrollTop = 0);
}
function saveFlow() {
  const d = flow.d;
  const miss = firstIncomplete();
  if (miss >= 0) {
    const msg = stepMissing(miss);
    flowGo(miss);
    warnMissing(msg);
    return;
  }
  const clean = {
    id: flow.editingId || Date.now(),
    date: d.date || dateKey(), time: d.time || nowTime(),
    situation: (d.situation || '').trim(), emotions: [...d.emotions], intensityBefore: d.intensityBefore ?? null,
    struggle: (d.struggle || '').trim(), thoughts: (d.thoughts || '').trim(),
    values: [...d.values], action: (d.action || '').trim(), intensityAfter: d.intensityAfter ?? null
  };
  if (flow.editingId) {
    const i = state.entries.findIndex(e => e.id === flow.editingId);
    if (i >= 0) state.entries[i] = clean;
  } else {
    state.entries.push(clean);
    state.draft = null;
  }
  save();
  haptic();
  flow.done = true;
  flow.savedId = clean.id;
  ui.succScope = 'one';
  renderFlow();
}
function warmPDF() { setTimeout(() => { if ($('#reportCard')) preparePDF(); }, 60); }
function renderSuccess() {
  $('#flow').innerHTML = `
    <div class="flow-inner">
      <div class="flow-body">
        <div class="success">
          ${mark(92, true)}
          <h2 tabindex="-1" id="successTitle">${flow.editingId ? 'Registro atualizado' : 'Registro salvo'}</h2>
          <p>Você parou para se observar. Isso já é um passo na direção do que importa.</p>
          ${reportCardHTML('success')}
          <div class="success-actions">
            <button class="btn btn-soft" type="button" data-flow="to-history">${icon('book')} Ver no histórico</button>
            <button class="btn btn-ghost" type="button" data-flow="close">Voltar ao início</button>
          </div>
        </div>
      </div>
    </div>`;
  $('#successTitle').focus({ preventScroll: true });
  warmPDF();
}

/* ---------------- Histórico ---------------- */
function inPeriod(e, period) {
  if (period === 'all') return true;
  const from = new Date(); from.setDate(from.getDate() - (Number(period) - 1));
  return e.date >= dateKey(from);
}
function historyEntries() {
  return sortEntries(state.entries.filter(e => inPeriod(e, ui.histPeriod) && (!ui.histValue || e.values.includes(ui.histValue))));
}
function entryBars(e) {
  const has = { sit: !!e.situation, emo: e.emotions.length > 0, str: !!e.struggle, tho: !!e.thoughts, act: !!e.action || e.values.length > 0 };
  return `<span class="entry-bars" aria-hidden="true">${['sit', 'emo', 'str', 'tho', 'act'].map(k => `<i class="${has[k] ? 'on' : ''}" style="--c:var(--${k})"></i>`).join('')}</span>`;
}
function intensityBadge(e) {
  if (e.intensityBefore == null && e.intensityAfter == null) return '';
  const a = e.intensityBefore ?? '–', b = e.intensityAfter;
  return `<span class="entry-int" title="Intensidade antes e depois">${a}${b != null ? ` ${icon('chevR', 'ic-sm')} ${b}` : ''}<span class="sr-only"> de 10</span></span>`;
}
function entryHTML(e) {
  const open = ui.openEntry === e.id;
  const fields = FIELDS.map(f => {
    let v = e[f.k];
    if (Array.isArray(v)) v = v.join(', ');
    if (f.k === 'emotions' && e.intensityBefore != null) v = (v ? v + ' · ' : '') + `intensidade ${e.intensityBefore}/10`;
    if (f.k === 'action' && e.intensityAfter != null) v = (v ? v + '\n' : '') + `Intensidade depois: ${e.intensityAfter}/10`;
    if (!v) return '';
    return `<div class="ef ${f.cls}"><div class="ef-k">${esc(f.label)}</div><div class="ef-v">${esc(v)}</div></div>`;
  }).join('');
  const tags = [
    ...e.emotions.map(x => `<span class="tag tag-emo">${esc(x)}</span>`),
    ...e.values.map(x => `<span class="tag tag-val">${esc(x)}</span>`)
  ].join('');
  return `<article class="entry ${open ? 'open' : ''}" data-entry="${e.id}">
    <button class="entry-top" type="button" data-toggle="${e.id}" aria-expanded="${open}">
      <div class="entry-row1">
        <span class="entry-time">${esc(e.time)}</span>${entryBars(e)}${intensityBadge(e)}
        <span class="entry-chev" ${intensityBadge(e) ? '' : 'style="margin-left:auto"'}>${icon('chevD', 'ic-sm')}</span>
      </div>
      <div class="entry-sit">${esc(e.situation || e.struggle || e.thoughts || 'Registro sem descrição')}</div>
      <div class="entry-tags">${tags}</div>
    </button>
    <div class="entry-body"><div>
      <div class="entry-fields">${fields}</div>
      <div class="entry-actions">
        <button class="btn btn-ghost" type="button" data-edit="${e.id}">${icon('edit', 'ic-sm')} Editar</button>
        <button class="btn btn-ghost del" type="button" data-del="${e.id}">${icon('trash', 'ic-sm')} Excluir</button>
      </div>
    </div></div>
  </article>`;
}
function renderHistory() {
  const list = historyEntries();
  const usedValues = VALUES.filter(v => state.entries.some(e => e.values.includes(v)));
  if (ui.histValue && !usedValues.includes(ui.histValue)) ui.histValue = null;
  const periodBtns = [['7', '7 dias'], ['30', '30 dias'], ['all', 'Tudo']].map(([v, l]) =>
    `<button type="button" data-hperiod="${v}" aria-pressed="${ui.histPeriod === v}">${l}</button>`).join('');

  let listHTML = '';
  if (!state.entries.length) {
    listHTML = `<div class="empty">${mark(56)}<h3>Nenhum registro ainda</h3><p>Quando você fizer seu primeiro registro, ele aparece aqui, organizado por dia.</p>
      <button class="btn btn-primary" type="button" data-act="new">${icon('plus')} Fazer um registro</button></div>`;
  } else if (!list.length) {
    listHTML = `<div class="empty"><h3>Nada neste filtro</h3><p>Tente outro período ou outro valor.</p></div>`;
  } else {
    const byDay = {};
    list.forEach(e => (byDay[e.date] = byDay[e.date] || []).push(e));
    listHTML = Object.keys(byDay).map(k => `
      <div class="day-head"><h3>${esc(fmtDayHead(k))}</h3><span>${byDay[k].length} ${byDay[k].length === 1 ? 'registro' : 'registros'}</span></div>
      ${byDay[k].map(entryHTML).join('')}`).join('');
  }

  const canShare = !!(navigator.canShare && window.File);
  $('#view-history').innerHTML = `
    <h1 class="view-title" id="historyTitle">Histórico</h1>
    <p class="view-sub">Seus registros, do mais recente para o mais antigo.</p>
    ${state.entries.length ? `<div class="filters">
      <div class="segmented" role="group" aria-label="Período">${periodBtns}</div>
      ${usedValues.length ? `<div class="chips-scroll f-val" role="group" aria-label="Filtrar por valor">
        <button class="chip" type="button" data-hvalue="" aria-pressed="${!ui.histValue}">Todos os valores</button>
        ${usedValues.map(v => `<button class="chip" type="button" data-hvalue="${esc(v)}" aria-pressed="${ui.histValue === v}">${esc(v)}</button>`).join('')}
      </div>` : ''}
    </div>` : ''}
    ${listHTML}
    ${list.length ? reportCardHTML('history') : ''}`;
  warmPDF();
}

/* ---------------- Padrões ---------------- */
function countBy(list, fn) {
  const c = {};
  list.forEach(e => fn(e).forEach(k => { c[k] = (c[k] || 0) + 1; }));
  return Object.entries(c).sort((a, b) => b[1] - a[1]);
}
function hbarsHTML(rows, color, unit = 'registro') {
  const max = Math.max(1, ...rows.map(r => r[1]));
  return `<div class="hbars">${rows.map(([k, v]) => `
    <div class="hbar" data-tip="${esc(k)}|${v} ${v === 1 ? unit : unit + 's'}">
      <div class="hbar-top"><span>${esc(k)}</span><b>${v}</b></div>
      <div class="hbar-track"><div class="hbar-fill" style="width:${(v / max) * 100}%;--c:var(${color})"></div></div>
    </div>`).join('')}</div>`;
}
function tableHTML(head, rows) {
  return `<details class="data-table"><summary>${icon('table', 'ic-sm')} Ver como tabela</summary>
    <table><thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></details>`;
}
function weeklyChart() {
  const now = new Date();
  const monday = new Date(now); monday.setDate(now.getDate() - ((now.getDay() + 6) % 7)); monday.setHours(0, 0, 0, 0);
  const weeks = [];
  for (let i = 7; i >= 0; i--) {
    const s = new Date(monday); s.setDate(monday.getDate() - i * 7);
    const e = new Date(s); e.setDate(s.getDate() + 6);
    const n = state.entries.filter(x => x.date >= dateKey(s) && x.date <= dateKey(e)).length;
    weeks.push({ s, e, n, label: `${pad(s.getDate())}/${pad(s.getMonth() + 1)}` });
  }
  const max = Math.max(1, ...weeks.map(w => w.n));
  return `<div class="card chart-card">
    <h3 class="chart-title">Registros por semana</h3>
    <p class="chart-sub">Últimas 8 semanas, de segunda a domingo</p>
    <div class="cols">${weeks.map((w, i) => `
      <div class="col" data-tip="Semana de ${w.label}|${w.n} ${w.n === 1 ? 'registro' : 'registros'}">
        ${w.n && (w.n === max || i === 7) ? `<span class="val">${w.n}</span>` : ''}
        <div class="bar ${w.n ? '' : 'zero'}" style="height:${(w.n / max) * 100}%;--c:var(--chart-a)"></div>
      </div>`).join('')}</div>
    <div class="cols-x">${weeks.map((w, i) => `<span>${i % 2 === 1 || i === 7 ? w.label : ''}</span>`).join('')}</div>
    ${tableHTML(['Semana', 'Registros'], weeks.map(w => [w.label, w.n]))}
  </div>`;
}
function intensityChart(list) {
  const pts = sortEntries(list.filter(e => e.intensityBefore != null || e.intensityAfter != null), 1).slice(-12);
  if (pts.length < 2) return `<div class="card chart-card"><h3 class="chart-title">Intensidade antes e depois</h3>
    <p class="chart-sub" style="margin:4px 0 0">Marque a intensidade em pelo menos dois registros para ver esta curva.</p></div>`;
  const W = 320, H = 170, L = 26, R = 50, T = 12, B = 26;
  const x = i => L + (pts.length === 1 ? 0 : (i * (W - L - R)) / (pts.length - 1));
  const y = v => T + (1 - v / 10) * (H - T - B);
  const line = (key) => {
    let dStr = '', pen = false;
    pts.forEach((p, i) => {
      const v = p[key];
      if (v == null) { pen = false; return; }
      dStr += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`; pen = true;
    });
    return dStr;
  };
  const lastOf = key => { for (let i = pts.length - 1; i >= 0; i--) if (pts[i][key] != null) return { i, v: pts[i][key] }; return null; };
  const la = lastOf('intensityBefore'), lb = lastOf('intensityAfter');
  let ya = la ? y(la.v) : 0, yb = lb ? y(lb.v) : 0;
  if (la && lb && Math.abs(ya - yb) < 14) { const mid = (ya + yb) / 2; ya = mid - 7; yb = mid + 7; if (la.v < lb.v) [ya, yb] = [yb, ya]; }
  const dots = key => pts.map((p, i) => p[key] == null ? '' :
    `<circle cx="${x(i)}" cy="${y(p[key])}" r="4" fill="var(${key === 'intensityBefore' ? '--chart-a' : '--chart-b'})" stroke="var(--paper-raised)" stroke-width="2"/>`).join('');
  const step = (W - L - R) / Math.max(1, pts.length - 1);
  const hits = pts.map((p, i) => {
    const d = parseKey(p.date);
    const tip = `${pad(d.getDate())}/${pad(d.getMonth() + 1)} · ${p.time}|Antes ${p.intensityBefore ?? '–'} · Depois ${p.intensityAfter ?? '–'}`;
    return `<rect class="hit" x="${x(i) - step / 2}" y="${T}" width="${step}" height="${H - T - B}" data-tip="${esc(tip)}" data-xh="${x(i)}"/>`;
  }).join('');
  const first = parseKey(pts[0].date), last = parseKey(pts[pts.length - 1].date);
  return `<div class="card chart-card">
    <h3 class="chart-title">Intensidade antes e depois</h3>
    <p class="chart-sub">Seus últimos ${pts.length} registros com intensidade marcada (0 a 10)</p>
    <div class="legend"><span><i style="--c:var(--chart-a)"></i>Antes</span><span><i class="dash" style="--c:var(--chart-b)"></i>Depois de observar</span></div>
    <svg class="line-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico de linhas da intensidade antes e depois de cada registro">
      ${[0, 5, 10].map(v => `<line class="grid" x1="${L}" x2="${W - R + 8}" y1="${y(v)}" y2="${y(v)}"/><text class="axis-t" x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join('')}
      <line class="xh" id="xh" x1="0" x2="0" y1="${T}" y2="${H - B}" visibility="hidden"/>
      <path d="${line('intensityBefore')}" fill="none" stroke="var(--chart-a)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="${line('intensityAfter')}" fill="none" stroke="var(--chart-b)" stroke-width="2" stroke-dasharray="5 3" stroke-linejoin="round" stroke-linecap="round"/>
      ${dots('intensityBefore')}${dots('intensityAfter')}
      ${la ? `<text class="lbl" x="${x(la.i) + 9}" y="${ya + 4}">Antes</text>` : ''}
      ${lb ? `<text class="lbl" x="${x(lb.i) + 9}" y="${yb + 4}">Depois</text>` : ''}
      <text class="axis-t" x="${L}" y="${H - 6}">${pad(first.getDate())}/${pad(first.getMonth() + 1)}</text>
      <text class="axis-t" x="${W - R}" y="${H - 6}" text-anchor="end">${pad(last.getDate())}/${pad(last.getMonth() + 1)}</text>
      ${hits}
    </svg>
    ${tableHTML(['Data', 'Antes', 'Depois'], pts.map(p => [`${fmtBR(p.date)} ${p.time}`, p.intensityBefore ?? '–', p.intensityAfter ?? '–']))}
  </div>`;
}
function renderPatterns() {
  const list = state.entries.filter(e => inPeriod(e, ui.patPeriod));
  const periodBtns = [['30', '30 dias'], ['90', '90 dias'], ['all', 'Tudo']].map(([v, l]) =>
    `<button type="button" data-pperiod="${v}" aria-pressed="${ui.patPeriod === v}">${l}</button>`).join('');
  let body;
  if (!state.entries.length) {
    body = `<div class="empty">${mark(56)}<h3>Os padrões aparecem com o tempo</h3><p>A cada registro, este painel mostra quando o sofrimento aparece, o que você sente e o que mais importa para você.</p>
      <button class="btn btn-primary" type="button" data-act="new">${icon('plus')} Fazer um registro</button></div>`;
  } else {
    const days = new Set(list.map(e => e.date)).size;
    const ab = avg(list.filter(e => e.intensityBefore != null).map(e => e.intensityBefore));
    const aa = avg(list.filter(e => e.intensityAfter != null).map(e => e.intensityAfter));
    const both = list.filter(e => e.intensityBefore != null && e.intensityAfter != null);
    const drop = both.length ? avg(both.map(e => e.intensityBefore - e.intensityAfter)) : null;
    const periods = [['Madrugada', 0, 6], ['Manhã', 6, 12], ['Tarde', 12, 18], ['Noite', 18, 24]];
    const byPeriod = periods.map(([n, a, b]) => [n, list.filter(e => { const h = Number(e.time.slice(0, 2)); return h >= a && h < b; }).length]);
    const emos = countBy(list, e => e.emotions).slice(0, 6);
    const vals = countBy(list, e => e.values).slice(0, 6);
    const topPeriod = [...byPeriod].sort((a, b) => b[1] - a[1])[0];

    body = `
      <div class="stats" style="margin-top:16px">
        <div class="stat"><div class="stat-v">${list.length}</div><div class="stat-k">${list.length === 1 ? 'registro' : 'registros'}</div></div>
        <div class="stat"><div class="stat-v">${days}</div><div class="stat-k">${days === 1 ? 'dia com registro' : 'dias com registro'}</div></div>
        <div class="stat"><div class="stat-v stat-v-pair">${ab != null ? fmtNum(ab) : '—'}${aa != null ? `<span class="arrow">${icon('chevR', 'ic-sm')}</span>${fmtNum(aa)}` : ''}</div><div class="stat-k">intensidade média, antes e depois</div></div>
      </div>
      ${drop != null && drop > 0 ? `<div class="insight">${icon('trendDown')}<div>Nos registros em que você marcou as duas, a intensidade caiu em média <b>${fmtNum(drop)} ${drop === 1 ? 'ponto' : 'pontos'}</b> depois de observar.</div></div>` : ''}
      ${list.length && topPeriod[1] ? `<div class="insight" style="background:var(--str-pale)">${icon('clock')}<div>O período em que você mais registrou foi <b>${topPeriod[0].toLowerCase()}</b>. Vale levar isso para a sessão.</div></div>` : ''}

      <h2 class="section-title">Ao longo do tempo</h2>
      ${weeklyChart()}
      ${intensityChart(list)}

      <h2 class="section-title">O que se repete</h2>
      <div class="card chart-card">
        <h3 class="chart-title">Quando o sofrimento aparece</h3>
        <p class="chart-sub">Registros por período do dia</p>
        ${list.length ? hbarsHTML(byPeriod, '--str') : '<p class="chart-sub">Sem registros neste período.</p>'}
      </div>
      <div class="card chart-card">
        <h3 class="chart-title">Emoções mais frequentes</h3>
        <p class="chart-sub">Quantas vezes cada emoção foi marcada</p>
        ${emos.length ? hbarsHTML(emos, '--emo', 'vez') : '<p class="chart-sub">Nenhuma emoção marcada neste período.</p>'}
      </div>
      <div class="card chart-card">
        <h3 class="chart-title">Valores mais presentes</h3>
        <p class="chart-sub">As direções que mais apareceram nos seus compromissos</p>
        ${vals.length ? hbarsHTML(vals, '--act', 'vez') : '<p class="chart-sub">Nenhum valor escolhido neste período.</p>'}
      </div>`;
  }
  $('#view-patterns').innerHTML = `
    <h1 class="view-title" id="patternsTitle">Padrões</h1>
    <p class="view-sub">O que seus registros mostram, para conversar na sessão.</p>
    ${state.entries.length ? `<div class="segmented" role="group" aria-label="Período">${periodBtns}</div>` : ''}
    ${body}`;
}

/* ---------------- Sobre ---------------- */
function renderAbout() {
  const maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(PRO.mapsQuery);
  $('#view-about').innerHTML = `
    <h1 class="view-title" id="aboutTitle">Sobre</h1>
    <p class="view-sub">Sua psicóloga e a terapia que inspira este diário.</p>

    <div class="card pro">
      <div class="pro-head">
        <img class="pro-photo" src="${PRO.photo}" alt="${esc(PRO.name)}" width="700" height="700">
        <h2 class="pro-name">${esc(PRO.name)}</h2>
        <div class="pro-headline">${esc(PRO.headline)}</div>
        <div class="pro-crp">${esc(PRO.title)} · ${esc(PRO.crp)}</div>
        <div class="pro-spec">${esc(PRO.specialty)}</div>
        <blockquote class="pro-quote">"${esc(PRO.tagline)}"</blockquote>
      </div>
      <div class="contact-grid">
        ${PRO.phones.map(p => `<a class="contact c-wa" href="https://wa.me/${p.e164}" target="_blank" rel="noopener"><span class="c-ic">${icon('chat', 'ic-sm')}</span><span>WhatsApp<small>${p.label}</small></span></a>`).join('')}
        <a class="contact c-tel" href="tel:+${PRO.phones[0].e164}"><span class="c-ic">${icon('phone', 'ic-sm')}</span><span>Ligar<small>${PRO.phones[0].label}</small></span></a>
        <a class="contact c-mail" href="mailto:${PRO.email}"><span class="c-ic">${icon('mail', 'ic-sm')}</span><span>E-mail<small>${esc(PRO.email)}</small></span></a>
        <a class="contact c-map" href="${maps}" target="_blank" rel="noopener"><span class="c-ic">${icon('pin', 'ic-sm')}</span><span>Como chegar<small>${esc(PRO.address)}</small></span></a>
        <a class="contact c-ig" href="${PRO.instagram.url}" target="_blank" rel="noopener"><span class="c-ic">${icon('instagram', 'ic-sm')}</span><span>Instagram<small>${esc(PRO.instagram.handle)}</small></span></a>
      </div>
    </div>

    <h2 class="section-title">Sobre mim</h2>
    <div class="card bio">${PRO.bio.map(p => `<p>${esc(p)}</p>`).join('')}</div>

    <h2 class="section-title">Abordagens e especialidades</h2>
    <div class="chips">${PRO.approaches.map(x => `<span class="tag cred-tag">${esc(x)}</span>`).join('')}</div>

    <h2 class="section-title">Também atua como</h2>
    <div class="card card-list">${PRO.roles.map(([t, d]) => `<div class="role-row"><b>${esc(t)}</b><span>${esc(d)}</span></div>`).join('')}</div>

    <h2 class="section-title">Na mídia</h2>
    <figure class="card press">
      <img src="${PRO.press.img}" alt="${esc(PRO.press.alt)}" loading="lazy">
      <figcaption>${esc(PRO.press.caption)}</figcaption>
    </figure>

    <h2 class="section-title">Momentos</h2>
    <div class="gallery" role="list">${PRO.gallery.map(([src, alt]) => `<figure class="gallery-tile" role="listitem"><img src="${src}" alt="${esc(alt)}" loading="lazy"><figcaption>${esc(alt)}</figcaption></figure>`).join('')}</div>

    <h2 class="section-title">A terapia</h2>
    <div class="pillars">
      ${[['f-sit', 'Aceitação', 'Abrir espaço para sentir o que se sente, sem lutar contra.'],
         ['f-tho', 'Desfusão cognitiva', 'Observar os pensamentos como eventos passageiros da mente, e não como verdades absolutas.'],
         ['f-str', 'Eu observador', 'A parte de você que testemunha a experiência sem se confundir com ela: o "eu que me vê".'],
         ['f-act', 'Ação comprometida', 'Dar passos concretos na direção dos seus valores, mesmo sentindo desconforto.']]
        .map(([c, t, p], i) => `<div class="pillar ${c}"><span class="n">${i + 1}</span><div><b>${t}</b><p>${p}</p></div></div>`).join('')}
    </div>
    <button class="btn btn-outline btn-block" type="button" data-sheet="example" style="margin-top:12px">${icon('file', 'ic-sm')} Ver um exemplo de registro</button>

    <button class="btn btn-ghost btn-block" type="button" data-go="settings" style="margin-top:18px">${icon('settings', 'ic-sm')} Ajustes, privacidade e seus dados</button>
    <p class="foot-note">Eu Que Me Vejo · versão 2.0</p>`;
}

/* ---------------- Ajustes (engrenagem no topo) ---------------- */
function renderSettings() {
  const themeBtns = [['system', 'Sistema'], ['light', 'Claro'], ['dark', 'Escuro']].map(([v, l]) =>
    `<button type="button" data-theme-set="${v}" aria-pressed="${state.theme === v}">${l}</button>`).join('');
  $('#view-settings').innerHTML = `
    <button class="back-link" type="button" data-go="${ui.prevView || 'home'}">${icon('chevL', 'ic-sm')} Voltar</button>
    <h1 class="view-title" id="settingsTitle">Ajustes</h1>
    <p class="view-sub">Suas preferências, seus dados e como o app cuida da sua privacidade.</p>

    <h2 class="section-title">Preferências</h2>
    <div class="card">
      <div class="setting">
        <label class="label" for="setName">Seu nome</label>
        <input class="input" id="setName" type="text" autocomplete="given-name" placeholder="Como você gostaria de ser chamado(a)?" value="${esc(state.name)}">
        <p class="setting-help">Aparece na saudação e no cabeçalho dos relatórios.</p>
      </div>
      <div class="setting">
        <span class="label">Tema</span>
        <div class="segmented" role="group" aria-label="Tema">${themeBtns}</div>
      </div>
      <div class="setting">
        <label class="label" for="setReminder">Lembrete diário</label>
        <div class="setting-row">
          <input class="input" id="setReminder" type="time" value="${esc(state.reminder)}" style="max-width:130px">
          <button class="btn btn-soft btn-sm" type="button" data-act="ics" style="flex:1">${icon('calendar', 'ic-sm')} Adicionar à agenda</button>
        </div>
        <p class="setting-help">Cria um evento diário na agenda do seu celular, com alerta no horário escolhido. Funciona mesmo com o app fechado.</p>
      </div>
      <div class="setting">
        <span class="label">Aplicativo</span>
        ${isStandalone()
          ? `<div class="installed-ok">${icon('check', 'ic-sm')} Instalado na tela inicial</div>`
          : `<button class="btn btn-soft btn-block" type="button" data-act="install-help">${icon('phoneDev', 'ic-sm')} Como instalar na tela inicial</button>`}
      </div>
      <div class="setting">
        <span class="label">Seus dados</span>
        <button class="btn btn-outline btn-block" type="button" data-act="wipe" style="color:var(--danger);border-color:color-mix(in srgb, var(--danger) 40%, transparent)" ${state.entries.length || draftHasContent(state.draft) ? '' : 'disabled'}>${icon('trash', 'ic-sm')} Apagar todos os registros</button>
      </div>
    </div>

    <h2 class="section-title">Privacidade e cuidado</h2>
    <div class="notice notice-privacy">${icon('shield')}<div><b>Privacidade e LGPD</b>Seus registros ficam guardados só neste aparelho, dentro deste navegador. Nada é enviado para servidores: não há login, cookies de rastreamento nem banco de dados. Eles só saem daqui quando você exporta ou envia um relatório, e podem ser apagados a qualquer momento em "Seus dados", acima.</div></div>
    <div class="notice notice-clinic">${icon('stethoscope')}<div><b>Aviso clínico</b>Este app é uma ferramenta de autoconhecimento inspirada na Terapia de Aceitação e Compromisso (ACT). Ele não substitui o acompanhamento psicológico. Em uma crise, ligue para o CVV no 188 (24 horas, gratuito) ou procure o SAMU no 192.</div></div>
    <p class="foot-note">Eu Que Me Vejo · versão 2.0</p>`;
}

/* ---------------- Folhas (ajudas, exemplo, confirmação) ---------------- */
const SHEETS = {
  'help-situation': () => helpSheet('situation', 'O que aconteceu', `<p>Na ACT, este é um exercício de <b>observação objetiva</b>: descrever o fato como uma câmera descreveria, sem julgamento nem interpretação.</p><p>Compare "ele foi grosso comigo" (interpretação) com "ele respondeu em três palavras" (fato). Quanto mais objetivo o registro, mais fácil enxergar a situação sem a camada extra de sofrimento que a mente costuma acrescentar.</p>`),
  'help-emotions': () => helpSheet('emotions', 'O que senti', `<p>Dar nome ao que se sente já cria um pouco de espaço entre você e a emoção. Não existe emoção certa ou errada: todas são bem-vindas aqui.</p><p>A intensidade ajuda você e sua psicóloga a perceber, com o tempo, o que muda depois de observar.</p>`),
  'help-struggle': () => helpSheet('struggle', 'Com o que lutei', `<p>Aqui registramos o que a ACT chama de <b>evitação experiencial</b>: o esforço para afastar, controlar ou fazer desaparecer uma sensação, emoção ou lembrança desconfortável.</p><p>Sentir vontade de evitar o desconforto é humano. Nomear esse esforço é o primeiro passo para relaxar a luta.</p>`),
  'help-thoughts': () => helpSheet('thoughts', 'Pensamentos', `<p>Este passo pratica a <b>desfusão cognitiva</b>: você não é seus pensamentos, é quem os vê passar.</p><p>Escrever "eu tive o pensamento de que..." antes da frase é um gesto pequeno de linguagem que já cria distância entre você e o conteúdo da mente.</p>`),
  'help-values': () => helpSheet('values', 'Valores', `<p>Na ACT, valores são <b>direções</b> que você escolhe seguir, mesmo em meio à dor. Eles nunca se esgotam, como seguir para o norte.</p><p>Escolher um valor não apaga o sofrimento. Ele mostra por onde caminhar apesar dele.</p>`),
  'help-action': () => helpSheet('action', 'Ação comprometida', `<p>É um passo concreto e possível na direção de um valor, dado com o desconforto junto, e não depois que ele passar.</p><p>Quanto mais específico, melhor: "mandar mensagem para minha irmã hoje à noite" funciona melhor que "ser mais presente".</p>`),
  'about-act': () => `<h3>O que é ACT?</h3>
    <p>A Terapia de Aceitação e Compromisso propõe que boa parte do sofrimento vem da luta contra a dor, mais do que da dor em si. Em vez de eliminar pensamentos e sentimentos difíceis, ela convida a se relacionar com eles de outra forma, enquanto se caminha na direção do que importa.</p>
    <div class="pillars">
      ${[['f-sit', 'Aceitação', 'Abrir espaço para sentir o que se sente.'], ['f-tho', 'Desfusão cognitiva', 'Ver pensamentos como eventos da mente.'], ['f-str', 'Eu observador', 'A parte de você que testemunha a experiência.'], ['f-act', 'Ação comprometida', 'Passos concretos na direção dos seus valores.']]
        .map(([c, t, p], i) => `<div class="pillar ${c}"><span class="n">${i + 1}</span><div><b>${t}</b><p>${p}</p></div></div>`).join('')}
    </div>
    <button class="btn btn-primary btn-block" type="button" data-close-sheet style="--stage:var(--blue-deep)">Entendi</button>`,
  'breathing': () => `<h3 class="f-tho"><span class="q-ic">${icon('wind')}</span>Pausa guiada</h3>
    <p>Um minuto para sair do piloto automático e voltar para o presente: o "eu observador" em prática. Siga o ritmo do círculo.</p>
    <div class="breath">
      <div class="breath-circle" id="breathCircle" aria-hidden="true"></div>
      <div class="breath-phase" id="breathPhase" aria-live="polite">Toque em começar</div>
      <div class="breath-timer" id="breathTimer">1:00</div>
    </div>
    <div class="sheet-actions">
      <button class="btn btn-outline" type="button" data-close-sheet>Fechar</button>
      <button class="btn btn-primary" type="button" id="breathStart" style="--stage:var(--blue-deep)">Começar</button>
    </div>`,
  'example': () => `<h3>Um exemplo de registro</h3>
    <p>Para ajudar você a começar. Não existe forma certa de preencher: o importante é observar com honestidade.</p>
    <div class="example">${FIELDS.map(f => {
      let v = EXAMPLE[f.k]; if (Array.isArray(v)) v = v.join(', ');
      if (f.k === 'emotions') v += ` · intensidade ${EXAMPLE.intensityBefore}/10`;
      if (f.k === 'action') v += `\nIntensidade depois: ${EXAMPLE.intensityAfter}/10`;
      return `<div class="ef ${f.cls}"><div class="ef-k">${f.label}</div><div class="ef-v">${esc(v)}</div></div>`;
    }).join('')}</div>
    <button class="btn btn-primary btn-block" type="button" data-close-sheet style="--stage:var(--blue-deep)">Fechar</button>`
};
function helpSheet(fieldKey, title, html) {
  const f = F[fieldKey];
  return `<h3 class="${f.cls}"><span class="q-ic">${icon(f.icon)}</span>${esc(title)}</h3>${html}
    <button class="btn btn-primary btn-block" type="button" data-close-sheet style="--stage:var(--blue-deep)">Entendi</button>`;
}
let sheetOpen = false, sheetReturnFocus = null;
function openSheet(html, label = 'Informação') {
  sheetReturnFocus = document.activeElement;
  $('#sheet').innerHTML = `<div class="sheet-grab" aria-hidden="true"></div>${html}`;
  $('#sheet').setAttribute('aria-label', label);
  const ov = $('#sheetOverlay');
  ov.classList.remove('closing'); ov.hidden = false; sheetOpen = true;
  document.body.classList.add('locked');
  pushLayer('sheet');
  const btn = $('#sheet button'); btn && btn.focus({ preventScroll: true });
}
function closeSheetNow() {
  if (!sheetOpen) return;
  sheetOpen = false;
  stopBreathing();
  const ov = $('#sheetOverlay');
  ov.classList.add('closing');
  setTimeout(() => { ov.hidden = true; ov.classList.remove('closing'); }, 220);
  if (!flow.open) document.body.classList.remove('locked');
  sheetReturnFocus && sheetReturnFocus.focus && sheetReturnFocus.focus({ preventScroll: true });
}
function closeSheet() { popLayer('sheet', closeSheetNow); }
function confirmSheet({ title, text, ok, onOk }) {
  openSheet(`<h3>${esc(title)}</h3><p>${esc(text)}</p>
    <div class="sheet-actions"><button class="btn btn-outline" type="button" data-close-sheet>Cancelar</button>
    <button class="btn btn-danger" type="button" id="confirmOk">${esc(ok)}</button></div>`, title);
  $('#confirmOk').addEventListener('click', () => { closeSheet(); onOk(); });
}

/* Pausa guiada: 6 ciclos de 10 s (inspire 4, segure 2, solte 4) */
let breathTimers = [], breathTick = null;
function stopBreathing() { breathTimers.forEach(clearTimeout); breathTimers = []; clearInterval(breathTick); breathTick = null; }
function startBreathing() {
  const circle = $('#breathCircle'), phase = $('#breathPhase'), timer = $('#breathTimer'), btn = $('#breathStart');
  if (!circle) return;
  stopBreathing();
  btn.disabled = true; btn.textContent = 'Em andamento...';
  let left = 60; timer.textContent = '1:00';
  breathTick = setInterval(() => { left--; timer.textContent = left > 0 ? '0:' + pad(left) : ''; if (left <= 0) clearInterval(breathTick); }, 1000);
  const at = (ms, fn) => breathTimers.push(setTimeout(fn, ms));
  for (let i = 0; i < 6; i++) {
    const t = i * 10000;
    at(t, () => { phase.textContent = 'Inspire...'; circle.classList.add('grow'); });
    at(t + 4000, () => { phase.textContent = 'Segure...'; });
    at(t + 6000, () => { phase.textContent = 'Solte...'; circle.classList.remove('grow'); });
  }
  at(60000, () => { phase.textContent = 'Pronto. Como você está agora?'; btn.disabled = false; btn.textContent = 'Fazer de novo'; haptic(); });
}

/* Botão "voltar" do Android fecha a camada aberta */
const layers = [];
function pushLayer(name) { layers.push(name); try { history.pushState({ layer: name }, ''); } catch (e) {} }
function popLayer(name, fn) {
  if (layers[layers.length - 1] === name && history.state && history.state.layer === name) { history.back(); }
  else { const i = layers.lastIndexOf(name); if (i >= 0) layers.splice(i, 1); fn(); }
}
window.addEventListener('popstate', () => {
  const top = layers.pop();
  if (top === 'sheet') closeSheetNow();
  else if (top === 'flow') closeFlowNow();
});

/* ---------------- Toast ---------------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3400);
}

/* ---------------- Tooltip dos gráficos ---------------- */
const tip = $('#tooltip');
let tipTimer;
function showTip(el, x, y) {
  const [a, b] = el.dataset.tip.split('|');
  tip.innerHTML = `${esc(a)}${b ? `<small>${esc(b)}</small>` : ''}`;
  tip.hidden = false;
  const w = tip.offsetWidth / 2 + 8;
  tip.style.left = Math.min(window.innerWidth - w, Math.max(w, x)) + 'px';
  tip.style.top = y + 'px';
  const svg = el.closest('svg'); const xh = svg && $('.xh', svg);
  if (xh && el.dataset.xh) { xh.setAttribute('x1', el.dataset.xh); xh.setAttribute('x2', el.dataset.xh); xh.setAttribute('visibility', 'visible'); }
}
function hideTip() { tip.hidden = true; $$('.xh').forEach(x => x.setAttribute('visibility', 'hidden')); }
document.addEventListener('pointermove', e => {
  const el = e.target.closest && e.target.closest('[data-tip]');
  if (!el) { if (e.pointerType === 'mouse') hideTip(); return; }
  if (e.pointerType === 'mouse') showTip(el, e.clientX, e.clientY);
});
document.addEventListener('pointerdown', e => {
  const el = e.target.closest && e.target.closest('[data-tip]');
  if (el && e.pointerType !== 'mouse') {
    const r = el.getBoundingClientRect();
    showTip(el, e.clientX, r.top);
    clearTimeout(tipTimer); tipTimer = setTimeout(hideTip, 2200);
  } else if (!el) hideTip();
});
window.addEventListener('scroll', hideTip, { passive: true });

/* ---------------- Relatórios ---------------- */
const REPORT_SCOPES = [['one', 'Este registro'], ['7', '7 dias'], ['30', '30 dias']];
function successEntries() {
  if (ui.succScope === 'one') return state.entries.filter(e => e.id === flow.savedId);
  return sortEntries(state.entries.filter(e => inPeriod(e, ui.succScope)), 1);
}
function reportEntries() {
  if (flow.open && flow.done) return sortEntries(successEntries(), 1);
  return sortEntries(historyEntries(), 1);
}
function reportCardHTML(where) {
  const list = where === 'success' ? successEntries() : historyEntries();
  const canShare = !!(navigator.canShare && window.File);
  const scope = where === 'success' ? `<div class="segmented report-scope" role="group" aria-label="O que entra no relatório">${REPORT_SCOPES.map(([v, l]) =>
    `<button type="button" data-rscope="${v}" aria-pressed="${ui.succScope === v}">${l}</button>`).join('')}</div>` : '';
  return `<div class="report card" id="reportCard">
    <div class="chart-title">Relatório para a sessão</div>
    <div class="chart-sub" style="margin-bottom:0">${where === 'success' && ui.succScope === 'one'
      ? 'Envie este registro para sua psicóloga ou guarde o PDF para levar à sessão.'
      : `${list.length} ${list.length === 1 ? 'registro' : 'registros'}${where === 'success' ? ' no período' : ' no filtro atual'}, em ordem cronológica.`}</div>
    ${scope}
    <div class="report-grid">
      <button class="btn btn-primary wide" type="button" data-report="pdf" style="--stage:var(--blue-deep)">${icon('file')} Baixar PDF</button>
      ${canShare ? `<button class="btn btn-soft wide" type="button" data-report="share">${icon('share')} Enviar PDF (WhatsApp, e-mail...)</button>` : ''}
      <button class="btn btn-outline" type="button" data-report="email">${icon('mail', 'ic-sm')} E-mail + PDF</button>
      <button class="btn btn-outline" type="button" data-report="copy">${icon('copy', 'ic-sm')} Copiar</button>
    </div>
  </div>`;
}
function periodLabel(list) {
  if (!list.length) return '';
  const a = fmtBR(list[0].date), b = fmtBR(list[list.length - 1].date);
  return a === b ? a : `${a} a ${b}`;
}
function entryLines(e) {
  const L = [];
  L.push(`${fmtLong(e.date)}, ${e.time}`);
  if (e.situation) L.push(`O que aconteceu: ${e.situation}`);
  if (e.emotions.length || e.intensityBefore != null) L.push(`O que senti: ${[e.emotions.join(', '), e.intensityBefore != null ? `intensidade ${e.intensityBefore}/10` : ''].filter(Boolean).join(' · ')}`);
  if (e.struggle) L.push(`Com o que lutei: ${e.struggle}`);
  if (e.thoughts) L.push(`Pensamentos: ${e.thoughts}`);
  if (e.values.length) L.push(`Valores: ${e.values.join(', ')}`);
  if (e.action) L.push(`Ação comprometida: ${e.action}`);
  if (e.intensityAfter != null) L.push(`Intensidade depois: ${e.intensityAfter}/10`);
  return L;
}
function reportText(list) {
  const name = state.name.trim() || 'Paciente';
  const out = ['Eu Que Me Vejo · Diário entre sessões', `Nome: ${name}`, `Período: ${periodLabel(list)} (${list.length} ${list.length === 1 ? 'registro' : 'registros'})`, ''];
  list.forEach(e => { out.push(...entryLines(e), ''); });
  return out.join('\n');
}
function fileName() {
  const n = (state.name.trim() || 'paciente').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
  return `eu-que-me-vejo-${n}-${dateKey()}.pdf`;
}
let logoCache = null;
async function loadLogoData() {
  if (logoCache) return logoCache;
  return (logoCache = loadLogoUncached());
}
async function loadLogoUncached() {
  try {
    const blob = await (await fetch('logo.png')).blob();
    return await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); });
  } catch (e) { return null; }
}
const pdfSafe = s => String(s || '').replace(/[^\x09\x0A\x20-\x7E -ÿ–—‘’“”…•]/g, '');

async function buildPDF(list) {
  if (!window.jspdf) throw new Error('jspdf');
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210, H = 297, M = 16, CW = W - 2 * M;
  const C = {
    deep: [21, 88, 112], ink: [62, 77, 85], soft: [92, 109, 119], faint: [125, 140, 151], line: [228, 220, 204], paper: [246, 242, 234],
    sit: [0, 149, 218], emo: [90, 107, 118], str: [71, 165, 175], tho: [142, 216, 248], act: [111, 146, 105],
    sitI: [10, 110, 158], emoI: [67, 82, 90], strI: [44, 120, 128], thoI: [43, 127, 167], actI: [63, 90, 59]
  };
  const fill = c => doc.setFillColor(c[0], c[1], c[2]);
  const color = c => doc.setTextColor(c[0], c[1], c[2]);
  const logo = await loadLogoData();
  const name = pdfSafe(state.name.trim() || 'Paciente');
  let y;

  const header = (firstPage) => {
    if (logo) doc.addImage(logo, 'PNG', M, 11, 50, 50 * 151 / 780, 'logo', 'FAST');
    else { doc.setFont('helvetica', 'bold'); doc.setFontSize(12); color(C.ink); doc.text('Socorro Silveira · Psicóloga Clínica', M, 18); }
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); color(C.deep);
    doc.text('DIÁRIO ENTRE SESSÕES', W - M, 16, { align: 'right' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); color(C.faint);
    doc.text(`${name} · ${periodLabel(list)}`, W - M, 21, { align: 'right' });
    const bw = CW / 4;
    [C.str, C.sit, C.tho, C.emo].forEach((c, i) => { fill(c); doc.rect(M + i * bw, 27, bw, 1.1, 'F'); });
    y = 36;
    if (firstPage) {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(21); color(C.deep);
      doc.text('Eu Que Me Vejo', M, y + 4); y += 11;
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10); color(C.soft);
      doc.text(`Paciente: ${name}     Período: ${periodLabel(list)}     Registros: ${list.length}`, M, y); y += 8;
    }
  };
  const ensure = (h) => { if (y + h > H - 20) { doc.addPage(); header(false); } };

  header(true);

  // Resumo do período
  const emos = countBy(list, e => e.emotions).slice(0, 3).map(([k, v]) => `${k} (${v})`).join(', ') || '—';
  const vals = countBy(list, e => e.values).slice(0, 3).map(([k, v]) => `${k} (${v})`).join(', ') || '—';
  const ab = avg(list.filter(e => e.intensityBefore != null).map(e => e.intensityBefore));
  const aa = avg(list.filter(e => e.intensityAfter != null).map(e => e.intensityAfter));
  const sum = [['Emoções mais frequentes', emos], ['Valores mais presentes', vals],
    ['Intensidade média', ab != null ? `antes ${fmtNum(ab)}${aa != null ? ` · depois ${fmtNum(aa)}` : ''} (de 0 a 10)` : '—']];
  doc.setFontSize(9.5);
  const sumLines = sum.map(([k, v]) => doc.splitTextToSize(pdfSafe(v), CW - 58));
  const sumH = 8 + sumLines.reduce((a, l) => a + l.length * 4.6 + 1.6, 0);
  fill(C.paper); doc.roundedRect(M, y, CW, sumH, 2.5, 2.5, 'F');
  let sy = y + 7;
  sum.forEach(([k], i) => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); color(C.soft); doc.text(k.toUpperCase(), M + 5, sy);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); color(C.ink); doc.text(sumLines[i], M + 58, sy);
    sy += sumLines[i].length * 4.6 + 1.6;
  });
  y += sumH + 8;

  const FMAP = { situation: ['sit', 'O QUE ACONTECEU'], emotions: ['emo', 'O QUE SENTI'], struggle: ['str', 'COM O QUE LUTEI'], thoughts: ['tho', 'PENSAMENTOS'], values: ['act', 'VALORES'], action: ['act', 'AÇÃO COMPROMETIDA'] };
  list.forEach(e => {
    const blocks = [];
    Object.entries(FMAP).forEach(([k, [c, label]]) => {
      let v = e[k]; if (Array.isArray(v)) v = v.join(', ');
      if (k === 'emotions' && e.intensityBefore != null) v = (v ? v + ' · ' : '') + `intensidade ${e.intensityBefore}/10`;
      if (k === 'action' && e.intensityAfter != null) v = (v ? v + '\n' : '') + `Intensidade depois: ${e.intensityAfter}/10`;
      if (!v) return;
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(pdfSafe(v), CW - 10);
      blocks.push({ c, label, lines, h: 4.4 + lines.length * 4.9 + 3.2 });
    });
    const headH = 10;
    const total = headH + 4 + blocks.reduce((t, b) => t + b.h, 0);
    ensure(total <= H - 20 - 36 ? total : headH + (blocks[0] ? blocks[0].h : 0) + 4);
    fill(C.paper); doc.roundedRect(M, y, CW, headH, 2, 2, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); color(C.deep);
    doc.text(pdfSafe(`${fmtLong(e.date)} · ${e.time}`), M + 4, y + 6.6);
    if (e.intensityBefore != null || e.intensityAfter != null) {
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9); color(C.soft);
      doc.text(`Intensidade: ${e.intensityBefore ?? '–'} antes · ${e.intensityAfter ?? '–'} depois`, W - M - 4, y + 6.6, { align: 'right' });
    }
    y += headH + 4;
    blocks.forEach(b => {
      ensure(b.h);
      fill(C[b.c]); doc.rect(M + 1, y - 0.4, 1.3, b.h - 3, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(7.8); color(C[b.c + 'I']);
      doc.text(b.label, M + 6, y + 2.6);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10); color(C.ink);
      doc.text(b.lines, M + 6, y + 7.6);
      y += b.h;
    });
    y += 5;
  });

  const n = doc.getNumberOfPages();
  for (let i = 1; i <= n; i++) {
    doc.setPage(i);
    doc.setDrawColor(C.line[0], C.line[1], C.line[2]); doc.setLineWidth(0.3); doc.line(M, H - 14, W - M, H - 14);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); color(C.faint);
    doc.text(pdfSafe(`${PRO.name} · ${PRO.title} · ${PRO.crp} · ${PRO.phones[0].label} · ${PRO.email}`), M, H - 9);
    doc.text('Documento pessoal e confidencial', M, H - 5.5);
    doc.text(`Página ${i} de ${n}`, W - M, H - 9, { align: 'right' });
  }
  return doc;
}
/* O PDF é gerado antes do toque, para o compartilhamento abrir na hora
   (o Safari do iPhone só permite compartilhar logo após o toque). */
const pdfCache = { key: '', file: null, promise: null };
function reportKey(list) { return list.map(e => e.id + ':' + e.date + e.time).join('|') + '#' + state.name; }
function preparePDF() {
  const list = reportEntries();
  if (!list.length || !window.jspdf) return null;
  const key = reportKey(list);
  if (pdfCache.key === key && (pdfCache.file || pdfCache.promise)) return pdfCache.promise;
  pdfCache.key = key; pdfCache.file = null;
  pdfCache.promise = buildPDF(list).then(doc => {
    if (pdfCache.key === key) pdfCache.file = new File([doc.output('blob')], fileName(), { type: 'application/pdf' });
    return pdfCache.file;
  }).catch(() => null);
  return pdfCache.promise;
}
async function getPDFFile(list) {
  if (pdfCache.key === reportKey(list) && pdfCache.file) return pdfCache.file;
  const doc = await buildPDF(list);
  return new File([doc.output('blob')], fileName(), { type: 'application/pdf' });
}
function saveFile(file) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file); a.download = file.name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
function canShareFiles(file) {
  try { return !!(navigator.canShare && navigator.canShare({ files: [file] })); } catch (e) { return false; }
}
function emailSubject(list) { return `Diário entre sessões · ${state.name.trim() || 'Paciente'} · ${periodLabel(list)}`; }

async function doReport(kind) {
  const list = reportEntries();
  if (!list.length) return toast('Não há registros neste filtro.');
  if (kind === 'copy') return copyText(reportText(list));
  let file;
  try { file = await getPDFFile(list); }
  catch (e) {
    if (kind === 'email') { location.href = `mailto:${PRO.email}?subject=${encodeURIComponent(emailSubject(list))}&body=${encodeURIComponent(reportText(list))}`; return; }
    return toast('Não foi possível gerar o PDF agora. Use "Copiar" e cole no e-mail.');
  }

  if (kind === 'email') {
    const body = reportText(list);
    if (canShareFiles(file)) {
      // Celular: abre o compartilhamento com o PDF anexado e o texto no corpo.
      copyText(PRO.email, true);
      try {
        await navigator.share({ files: [file], title: emailSubject(list), text: `Para: ${PRO.email}\n\n${body}` });
        toast(`O e-mail da psicóloga (${PRO.email}) foi copiado. Cole no campo "Para".`);
      } catch (e) {
        if (e && e.name !== 'AbortError') location.href = `mailto:${PRO.email}?subject=${encodeURIComponent(emailSubject(list))}&body=${encodeURIComponent(body)}`;
      }
      return;
    }
    // Computador: baixa o PDF e abre o e-mail já endereçado, pedindo para anexar.
    saveFile(file);
    const note = `O relatório em PDF (${file.name}) foi baixado no seu aparelho. Anexe-o a este e-mail antes de enviar.\n\n`;
    setTimeout(() => { location.href = `mailto:${PRO.email}?subject=${encodeURIComponent(emailSubject(list))}&body=${encodeURIComponent(note + body)}`; }, 400);
    toast('PDF baixado. Anexe o arquivo ao e-mail que vai abrir.');
    return;
  }
  if (kind === 'share' && canShareFiles(file)) {
    try { await navigator.share({ files: [file], title: 'Diário entre sessões' }); } catch (e) { /* cancelado */ }
    return;
  }
  saveFile(file);
  toast('PDF baixado.');
}
async function copyText(text, quiet) {
  if (quiet === undefined && /^https?:/.test(text)) quiet = true;
  try { await navigator.clipboard.writeText(text); if (!quiet) toast('Relatório copiado. Cole no e-mail ou na conversa.'); }
  catch (e) {
    const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); if (!quiet) toast('Relatório copiado. Cole no e-mail ou na conversa.'); } catch (e2) { toast('Não foi possível copiar automaticamente.'); }
    ta.remove();
  }
}

/* ---------------- Lembrete na agenda (.ics) ---------------- */
function downloadICS() {
  const t = ($('#setReminder') && $('#setReminder').value) || state.reminder || '20:00';
  state.reminder = t; save();
  const [hh, mm] = t.split(':');
  const start = new Date(); if (start.getHours() * 60 + start.getMinutes() >= Number(hh) * 60 + Number(mm)) start.setDate(start.getDate() + 1);
  const dt = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}T${hh}${mm}00`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const url = location.protocol.startsWith('http') ? location.href.split('#')[0] : '';
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Eu Que Me Vejo//PT-BR', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    `UID:euqmv-${Date.now()}@eu-que-me-vejo`, `DTSTAMP:${stamp}`, `DTSTART:${dt}`, 'DURATION:PT10M', 'RRULE:FREQ=DAILY',
    'SUMMARY:Eu Que Me Vejo · um momento para observar',
    'DESCRIPTION:Pause por alguns minutos e faça seu registro do dia.' + (url ? '\\n' + url : ''),
    ...(url ? [`URL:${url}`] : []),
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:PT0M', 'DESCRIPTION:Um momento gentil para pausar e observar.', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  a.download = 'lembrete-eu-que-me-vejo.ics';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast(`Abra o arquivo para adicionar o lembrete das ${t} à sua agenda.`);
}

/* ---------------- Instalar na tela inicial ---------------- */
const INSTALL = { deferred: null, shownThisVisit: false };
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  INSTALL.deferred = e;
  const btn = $('#installNow'); if (btn) btn.hidden = false;
});
window.addEventListener('appinstalled', () => {
  INSTALL.deferred = null;
  hideInstallCard();
  toast('Pronto! O app foi adicionado à sua tela inicial.');
});
function isStandalone() {
  return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
}
function detectDevice() {
  const ua = navigator.userAgent || '';
  const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const ipad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua);
  const inApp = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Line\/|WhatsApp|TikTok|musical_ly|Snapchat|LinkedInApp|Twitter/i.test(ua);
  const inAppName = /Instagram/i.test(ua) ? 'Instagram' : /FBAN|FBAV|FB_IAB|FBIOS/i.test(ua) ? 'Facebook' : /WhatsApp/i.test(ua) ? 'WhatsApp' : /TikTok|musical_ly/i.test(ua) ? 'TikTok' : 'outro aplicativo';
  let browser = 'chrome';
  if (ios) browser = /CriOS/.test(ua) ? 'chrome' : /FxiOS/.test(ua) ? 'firefox' : /EdgiOS/.test(ua) ? 'edge' : 'safari';
  else if (android) browser = /SamsungBrowser/i.test(ua) ? 'samsung' : /Firefox/i.test(ua) ? 'firefox' : /EdgA/i.test(ua) ? 'edge' : 'chrome';
  else browser = /Edg\//.test(ua) ? 'edge' : /Firefox/i.test(ua) ? 'firefox' : /Safari/.test(ua) && !/Chrome/.test(ua) ? 'safari' : 'chrome';
  const os = ios ? 'ios' : android ? 'android' : 'desktop';
  const BN = { safari: 'Safari', chrome: 'Chrome', firefox: 'Firefox', edge: 'Edge', samsung: 'Samsung Internet' };
  const deviceName = ios ? (ipad ? 'iPad' : 'iPhone') : android ? 'Android' : 'Computador';
  return { os, ios, ipad, android, inApp, inAppName, browser, label: inApp ? `${deviceName} · dentro do ${inAppName}` : `${deviceName} · ${BN[browser]}` };
}
function installSteps(d) {
  const S = (ic, html) => ({ ic, html });
  if (d.inApp) {
    const target = d.ios ? 'Safari' : 'Chrome';
    return {
      intro: `Você abriu o link dentro do ${esc(d.inAppName)}. Para instalar, primeiro abra o app no ${target}.`,
      steps: [
        S(d.ios ? 'dotsH' : 'dotsV', `Toque no menu <b>${d.ios ? '⋯' : '⋮'}</b> no canto da tela.`),
        S('compassOpen', `Escolha <b>Abrir no ${target}</b> (ou "Abrir no navegador").`),
        S('plusSquare', `No ${target}, abra este aviso de novo para ver os passos da instalação.`)
      ],
      copy: true
    };
  }
  if (d.ios && d.browser === 'safari') return {
    intro: 'No iPhone e no iPad, a instalação é feita pelo Safari, em poucos toques.',
    steps: [
      S('shareIos', `Toque no botão <b>Compartilhar</b> ${d.ipad ? 'no topo da tela, ao lado do endereço' : 'na barra de baixo'}. Se ele não aparecer, toque antes em <b>⋯</b>.`),
      S('plusSquare', 'Role a lista e toque em <b>Adicionar à Tela de Início</b>.'),
      S('check', 'Confira o nome "Eu Que Me Vejo" e toque em <b>Adicionar</b>, no canto superior.')
    ]
  };
  if (d.ios) return {
    intro: `No iPhone, o ${d.browser === 'chrome' ? 'Chrome' : 'seu navegador'} também consegue instalar o app. Se não encontrar a opção, abra este endereço no Safari.`,
    steps: [
      S('shareIos', 'Toque no botão <b>Compartilhar</b>, ao lado da barra de endereço.'),
      S('plusSquare', 'Toque em <b>Adicionar à Tela de Início</b>.'),
      S('check', 'Toque em <b>Adicionar</b> para confirmar.')
    ],
    copy: true
  };
  if (d.android && d.browser === 'samsung') return {
    intro: 'No Samsung Internet, a instalação fica no menu do navegador.',
    steps: [
      S('menu', 'Toque no menu <b>≡</b>, na barra de baixo.'),
      S('plusSquare', 'Toque em <b>Adicionar página a</b> e depois em <b>Tela inicial</b>.'),
      S('check', 'Confirme em <b>Adicionar</b>.')
    ]
  };
  if (d.android) return {
    intro: 'No Android, o app é instalado direto pelo navegador e ganha ícone próprio, como os outros aplicativos.',
    steps: [
      S('dotsV', `Toque no menu <b>⋮</b>, no canto superior direito${d.browser === 'firefox' ? ' (no Firefox, ele fica na barra de baixo)' : ''}.`),
      S('download', 'Toque em <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>.'),
      S('check', 'Confirme em <b>Instalar</b>. O ícone aparece na sua tela inicial.')
    ]
  };
  return {
    intro: 'O Eu Que Me Vejo foi pensado para o celular. Abra este endereço no seu celular para instalá-lo.',
    steps: [
      S('phoneDev', 'No celular, abra <b>euquemevejo.vercel.app</b>.'),
      S('plusSquare', 'Abra este aviso no celular para ver os passos do seu aparelho.'),
      S('download', `No computador, ${d.browser === 'safari' ? 'use Arquivo › Adicionar ao Dock' : 'use o ícone de instalar na barra de endereço'}, se quiser.`)
    ],
    copy: true
  };
}
function installSheetHTML() {
  const d = detectDevice(), g = installSteps(d);
  return `<h3 class="f-sit"><span class="q-ic">${icon('phoneDev')}</span>Instalar na tela inicial</h3>
    <div class="device-badge">${icon(d.ios ? 'phoneDev' : d.android ? 'phoneDev' : 'info', 'ic-sm')} Seu aparelho: ${esc(d.label)}</div>
    <p>${g.intro}</p>
    <button class="btn btn-primary btn-block" type="button" id="installNow" data-act="install-now" style="--stage:var(--blue-deep)" ${INSTALL.deferred ? '' : 'hidden'}>${icon('download')} Instalar agora</button>
    <ol class="install-steps">${g.steps.map((st, i) => `<li><span class="is-n">${i + 1}</span><span class="is-ic">${icon(st.ic)}</span><span class="is-t">${st.html}</span></li>`).join('')}</ol>
    <div class="install-preview"><img src="apple-touch-icon.png" alt="" width="52" height="52"><span>O ícone do app vai aparecer assim na sua tela inicial, com o nome <b>Eu Que Me Vejo</b>.</span></div>
    ${g.copy ? `<button class="btn btn-outline btn-block" type="button" data-act="copy-link">${icon('link', 'ic-sm')} Copiar o endereço do app</button>` : ''}
    <div class="sheet-actions">
      <button class="btn btn-ghost" type="button" data-act="install-never">Não mostrar mais</button>
      <button class="btn btn-primary" type="button" data-close-sheet style="--stage:var(--blue-deep)">Entendi</button>
    </div>`;
}
function renderInstallCard() {
  if (isStandalone() || state.installDismissed || INSTALL.shownThisVisit || $('#installCard')) return;
  const d = detectDevice();
  if (d.os === 'desktop' && !INSTALL.deferred) return;
  INSTALL.shownThisVisit = true;
  const how = d.inApp ? `Abra no ${d.ios ? 'Safari' : 'Chrome'} e adicione o app à sua tela inicial.`
    : d.ios ? 'Toque em Compartilhar e depois em "Adicionar à Tela de Início".'
    : d.android ? `Instale pelo menu ${d.browser === 'samsung' ? '≡' : '⋮'} do navegador.`
    : 'Instale o app neste computador.';
  const el = document.createElement('div');
  el.className = 'install-card'; el.id = 'installCard';
  el.setAttribute('role', 'dialog'); el.setAttribute('aria-labelledby', 'installTitle');
  el.innerHTML = `
    <img class="install-icon" src="apple-touch-icon.png" alt="" width="48" height="48">
    <div class="install-body">
      <div class="install-title" id="installTitle">Tenha o app na sua tela inicial</div>
      <div class="install-text">${esc(how)} Ele abre em tela cheia, como um aplicativo.</div>
      <div class="install-actions">
        ${INSTALL.deferred && !d.inApp ? `<button class="btn btn-primary btn-sm" type="button" data-act="install-now" style="--stage:var(--blue-deep)">${icon('download', 'ic-sm')} Instalar agora</button>` : ''}
        <button class="btn ${INSTALL.deferred && !d.inApp ? 'btn-outline' : 'btn-primary'} btn-sm" type="button" data-act="install-help" style="--stage:var(--blue-deep)">Ver como fazer</button>
      </div>
    </div>
    <button class="install-close" type="button" data-act="install-close" aria-label="Fechar aviso">${icon('x', 'ic-sm')}</button>`;
  document.body.appendChild(el);
}
function hideInstallCard() {
  const el = $('#installCard'); if (!el) return;
  el.classList.add('closing');
  setTimeout(() => el.remove(), 260);
}
function maybeShowInstall(delay) { setTimeout(() => { if (!flow.open && $('#onboarding').hidden) renderInstallCard(); }, delay); }
async function runInstallPrompt() {
  const ev = INSTALL.deferred;
  if (!ev) { openSheet(installSheetHTML(), 'Instalar na tela inicial'); return; }
  INSTALL.deferred = null;
  ev.prompt();
  try { const r = await ev.userChoice; if (r && r.outcome === 'accepted') hideInstallCard(); } catch (e) {}
}

/* ---------------- Boas-vindas ---------------- */
function renderOnboarding() {
  const ob = $('#onboarding');
  ob.innerHTML = `<div class="ob-inner">
    <img class="ob-logo" src="logo-light.png" alt="Socorro Silveira, Psicóloga Clínica" width="780" height="151">
    <div class="ob-hero">
      ${MIRROR}
      <h1 class="ob-title" id="obTitle">Eu Que Me Vejo</h1>
      <p class="ob-sub">um espaço para observar, sem se perder no que se observa</p>
      <ul class="ob-list">
        <li><span class="ob-ic">${icon('phoneDev')}</span><span><b>Fica só no seu aparelho</b>Seus registros são guardados neste navegador e em nenhum outro lugar.</span></li>
        <li><span class="ob-ic">${icon('lock')}</span><span><b>Sem login e sem rastreadores</b>Não há conta, banco de dados nem coleta de informações.</span></li>
        <li><span class="ob-ic">${icon('send')}</span><span><b>Você decide o que compartilhar</b>Gere um relatório em PDF para levar à sessão quando quiser.</span></li>
      </ul>
      <div class="ob-name">
        <label class="label" for="obName">Como você gostaria de ser chamado(a)? (opcional)</label>
        <input class="input" id="obName" type="text" autocomplete="given-name" placeholder="Seu nome" value="${esc(state.name)}">
      </div>
      <button class="btn btn-block ob-cta" type="button" id="obStart">Começar</button>
      <p class="ob-legal">Ferramenta de apoio entre sessões. Não substitui o acompanhamento psicológico.</p>
    </div>
  </div>`;
  ob.hidden = false;
  document.body.classList.add('locked');
  $('#obStart').addEventListener('click', () => {
    state.name = $('#obName').value.trim();
    state.onboarded = true; save();
    ob.classList.add('closing');
    setTimeout(() => { ob.hidden = true; ob.classList.remove('closing'); document.body.classList.remove('locked'); }, 450);
    refresh();
    maybeShowInstall(900);
  });
  $('#obName').addEventListener('keydown', e => { if (e.key === 'Enter') $('#obStart').click(); });
}

/* ---------------- Eventos (delegação) ---------------- */
document.addEventListener('click', e => {
  const t = e.target.closest('button, a');
  if (!t) return;
  const ds = t.dataset;

  if (ds.tab) return showView(ds.tab);
  if (ds.go) return showView(ds.go);
  if (ds.sheet) return openSheet(SHEETS[ds.sheet](), t.textContent.trim());
  if (t.hasAttribute('data-close-sheet')) return closeSheet();
  if (t.id === 'breathStart') return startBreathing();

  if (ds.act === 'new') return openFlow();
  if (ds.act === 'discard-draft') return confirmSheet({ title: 'Começar de novo?', text: 'O registro em andamento será descartado.', ok: 'Descartar', onOk: () => { state.draft = null; save(); refresh(); } });
  if (ds.act === 'ics') return downloadICS();
  if (ds.act === 'install-help') { hideInstallCard(); return openSheet(installSheetHTML(), 'Instalar na tela inicial'); }
  if (ds.act === 'install-close') return hideInstallCard();
  if (ds.act === 'install-now') { closeSheet(); return runInstallPrompt(); }
  if (ds.act === 'install-never') { state.installDismissed = true; save(); hideInstallCard(); closeSheet(); return toast('Tudo bem. As instruções continuam em Ajustes, no ícone de engrenagem.'); }
  if (ds.act === 'copy-link') return copyText(location.href.split('#')[0].split('?')[0]).then(() => toast('Endereço copiado. Cole no Safari ou no Chrome.'));
  if (ds.act === 'wipe') return confirmSheet({
    title: 'Apagar todos os registros?', text: 'Isso remove todos os registros e o rascunho deste aparelho. Não dá para desfazer. Se quiser guardar uma cópia, baixe o PDF no Histórico antes.',
    ok: 'Apagar tudo', onOk: () => { state.entries = []; state.draft = null; save(); refresh(); toast('Registros apagados deste aparelho.'); }
  });

  if (ds.flow === 'next') return tryNext();
  if (ds.flow === 'back') return flow.step === 0 ? closeFlow() : flowGo(flow.step - 1);
  if (ds.flow === 'close') return closeFlow();
  if (ds.flow === 'save') return saveFlow();
  if (ds.flow === 'to-history') { const id = flow.savedId; closeFlow(); ui.histPeriod = 'all'; ui.histValue = null; ui.openEntry = id; return showView('history'); }
  if (ds.jump) { const j = Number(ds.jump), miss = firstIncomplete(); return flowGo(miss >= 0 && miss < j ? miss : j); }

  if (ds.chip) {
    const arr = flow.d[ds.chip], v = ds.v, i = arr.indexOf(v);
    i >= 0 ? arr.splice(i, 1) : arr.push(v);
    const on = i < 0;
    t.setAttribute('aria-pressed', on);
    t.innerHTML = (on ? icon('check') : '') + esc(v);
    haptic(); persistDraft(); updateNext();
    return;
  }

  if (ds.toggle) {
    const id = Number(ds.toggle), card = t.closest('.entry');
    const open = !card.classList.contains('open');
    $$('.entry.open').forEach(c => { c.classList.remove('open'); $('.entry-top', c).setAttribute('aria-expanded', 'false'); });
    card.classList.toggle('open', open); t.setAttribute('aria-expanded', open);
    ui.openEntry = open ? id : null;
    return;
  }
  if (ds.edit) { const en = state.entries.find(x => x.id === Number(ds.edit)); return en && openFlow(en); }
  if (ds.del) {
    const id = Number(ds.del);
    return confirmSheet({ title: 'Excluir este registro?', text: 'Ele será removido deste aparelho e não dá para desfazer.', ok: 'Excluir', onOk: () => {
      state.entries = state.entries.filter(x => x.id !== id); save(); refresh(); toast('Registro excluído.');
    } });
  }
  if (ds.hperiod) { ui.histPeriod = ds.hperiod; return renderHistory(); }
  if (ds.hvalue !== undefined) { ui.histValue = ds.hvalue || null; return renderHistory(); }
  if (ds.pperiod) { ui.patPeriod = ds.pperiod; return renderPatterns(); }
  if (ds.report) return doReport(ds.report);
  if (ds.rscope) { ui.succScope = ds.rscope; const c = $('#reportCard'); if (c) c.outerHTML = reportCardHTML('success'); warmPDF(); return; }
  if (ds.themeSet) { state.theme = ds.themeSet; save(); applyTheme(); return renderSettings(); }
});

$('#settingsBtn').addEventListener('click', () => showView(ui.view === 'settings' ? (ui.prevView || 'home') : 'settings'));
$('#themeBtn').addEventListener('click', () => {
  state.theme = resolvedTheme() === 'dark' ? 'light' : 'dark';
  save(); applyTheme();
  if (ui.view === 'settings' || ui.view === 'patterns') refresh();
});
$('#sheetOverlay').addEventListener('click', e => { if (e.target.id === 'sheetOverlay') closeSheet(); });
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (sheetOpen) closeSheet(); else if (flow.open) closeFlow();
});
document.addEventListener('input', e => {
  if (e.target.id === 'setName') { state.name = e.target.value; save(); }
});
document.addEventListener('change', e => {
  if (e.target.id === 'setReminder' && e.target.value) { state.reminder = e.target.value; save(); }
});
window.addEventListener('scroll', () => { $('#topbar').classList.toggle('scrolled', window.scrollY > 4); }, { passive: true });

/* ---------------- Início do app ---------------- */
// Animação de abertura: o espelho aparece, recebe um brilho e sai.
(function () {
  const el = $('#entryAnimation');
  if (!el) return;
  const quick = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => el.classList.add('fade-out'), quick ? 500 : 1900);
  setTimeout(() => el.remove(), quick ? 900 : 2550);
})();
load();
applyTheme();
showView('home');
if (!state.onboarded) renderOnboarding();
else maybeShowInstall(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches ? 1000 : 2800);

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}
