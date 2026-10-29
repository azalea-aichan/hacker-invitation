const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const chars = '01Z%&$#@!?';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

window.addEventListener('resize', () => {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

function drawMatrix() {
  ctx.fillStyle = 'rgba(5,5,5,.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0f0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > .975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 40);

const output = document.getElementById('output');
const lines = [
  { type:'text', text:'Initializing invitation protocol...' },
  { type:'text', text:'Establishing secure handshake [OK]' },
  { type:'text', text:'Decrypting payload..............................' },
  { type:'blank' },
  { type:'section', text:'>>> EVENT BRIEFING' },
  { type:'label', text:'Op Name   :' }, { type:'value', text:'THE GATHERING' },
  { type:'label', text:'Objective :' }, { type:'value', text:'Private celebration & digital lock-in' },
  { type:'label', text:'Date      :' }, { type:'value', text:'TBA (check back for epoch timestamp)' },
  { type:'label', text:'Location  :' }, { type:'value', text:'Classified server room XYZ' },
  { type:'blank' },
  { type:'section', text:'>>> ACCESS INSTRUCTIONS' },
  { type:'value', text:'1. Bring your own device (BYOD).' },
  { type:'value', text:'2. Dress code: dark mode preferred.' },
  { type:'value', text:'3. Zero trust: verify at gate.' },
  { type:'blank' },
  { type:'text', text:'root@invitation:~# awaiting presence...' },
];

let idx = 0;
function typeNext() {
  if (idx >= lines.length) return;
  const item = lines[idx++];
  const span = document.createElement('span');
  span.className = 'line ' + (item.type === 'blank' ? '' : item.type);
  output.appendChild(span);

  if (item.type === 'blank') {
    span.innerHTML = '&nbsp;';
    setTimeout(typeNext, 120);
    return;
  }

  let c = 0;
  const txt = item.text || '';
  const tick = setInterval(() => {
    span.textContent += txt.charAt(c++);
    if (c >= txt.length) {
      clearInterval(tick);
      setTimeout(typeNext, 220);
    }
  }, 18);
}

window.addEventListener('load', () => setTimeout(typeNext, 600));
