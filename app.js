// ---------- Lightning Canvas (lightweight, performant) ----------
(function lightningBackdrop() {
    const c = document.getElementById('lightning');
    const ctx = c.getContext('2d');
    let w, h, raf;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    function resize() {
        w = c.width = Math.floor(innerWidth * DPR);
        h = c.height = Math.floor(innerHeight * DPR);
        c.style.width = innerWidth + 'px';
        c.style.height = innerHeight + 'px';
    }
    window.addEventListener('resize', resize); resize();

    const bolts = [];
    function spawnBolt() {
        const x = Math.random() * w;
        bolts.push({
            pts: [{ x, y: -20 }], life: 0, hue: Math.random() < .5 ? 188 : 56
        });
    }
    function step() {
        ctx.clearRect(0, 0, w, h);
        // subtle haze
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(0, 0, w, h);

        if (Math.random() < 0.06 && bolts.length < 4) spawnBolt();

        for (let i = bolts.length - 1; i >= 0; i--) {
            const b = bolts[i];
            const last = b.pts[b.pts.length - 1];
            if (b.pts.length < 18) {
                const angle = (Math.random() - .5) * .9;
                const len = 20 + Math.random() * 40;
                b.pts.push({ x: last.x + Math.sin(angle) * len, y: last.y + Math.cos(angle) * len });
            }
            b.life += 1;
            // draw
            ctx.lineWidth = 2 * DPR;
            const glow = b.hue === 188 ? '0,231,255' : '255,212,0';
            ctx.strokeStyle = `rgba(${glow}, ${Math.max(0, 0.8 - b.life * 0.04)})`;
            ctx.shadowColor = `rgba(${glow},0.9)`;
            ctx.shadowBlur = 12 * DPR;
            ctx.beginPath();
            ctx.moveTo(b.pts[0].x, b.pts[0].y);
            for (const p of b.pts) ctx.lineTo(p.x, p.y);
            ctx.stroke();

            // remove old
            if (b.life > 24) bolts.splice(i, 1);
        }
        raf = requestAnimationFrame(step);
    }
    step();
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(raf); else step();
    });
})();

// ---------- Projects Data ----------
const projects = [
    {
        title: 'Circuit Runner',
        desc: 'A fast‑paced cyberpunk platformer built with Unity. Tight controls, reactive VFX, and score combos.',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
        tech: ['C#', 'Unity', '2D', 'Cinemachine'],
        repo: 'https://github.com/yourname/circuit-runner',
        demo: '#'
    },
    {
        title: 'VoltBoard',
        desc: 'Realtime kanban board with drag‑and‑drop, keyboard shortcuts, and offline support.',
        img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop',
        tech: ['TypeScript', 'Vite', 'PWA', 'IndexedDB'],
        repo: 'https://github.com/yourname/voltboard',
        demo: '#'
    },
    {
        title: 'SparkSite Starter',
        desc: 'A minimalist, high‑performance static site template with electric design tokens.',
        img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1400&auto=format&fit=crop',
        tech: ['HTML', 'CSS', 'JS'],
        repo: 'https://github.com/yourname/sparksite-starter',
        demo: '#'
    },
    {
        title: 'Electric Particles',
        desc: 'Canvas particle playground with presets for lightning, plasma, and nebula effects.',
        img: 'https://images.unsplash.com/photo-1553570739-330b8db8a925?q=80&w=1400&auto=format&fit=crop',
        tech: ['JavaScript', 'Canvas', 'Shaders'],
        repo: 'https://github.com/yourname/electric-particles',
        demo: '#'
    }
];

const skills = [
    { name: 'C#', note: 'Gameplay systems, OOP, editor tooling' },
    { name: 'Unity', note: 'Animation, physics, URP, profiling' },
    { name: 'JavaScript', note: 'UI, Canvas, perf patterns' },
    { name: 'HTML/CSS', note: 'Responsive, a11y, animations' },
    { name: 'TypeScript', note: 'Large app DX, types' },
    { name: 'Node.js', note: 'APIs, tooling, CLIs' },
    { name: 'Git/GitHub', note: 'Workflows, CI basics' },
    { name: 'Design', note: 'Figma, UX polish' },
];

// ---------- Renderers ----------
function el(tag, attrs = {}, ...children) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
        else if (v != null) e.setAttribute(k, v);
    }
    for (const c of children) {
        e.append(c && c.nodeType ? c : document.createTextNode(c));
    }
    return e;
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    projects.forEach(p => {
        const card = el('article', { class: 'project card reveal' });
        const thumb = el('div', { class: 'thumb' });
        thumb.appendChild(el('img', { src: p.img, alt: p.title }));
        thumb.appendChild(el('div', { class: 'spark' }));
        const info = el('div', { class: 'info' });
        info.appendChild(el('h3', { class: 'electric' }, p.title));
        info.appendChild(el('p', {}, p.desc));
        const badges = el('div', { class: 'badges' });
        p.tech.forEach(t => badges.appendChild(el('span', { class: 'badge' }, t)));
        const actions = el('div', { class: 'actions' });
        actions.appendChild(el('a', { class: 'btn', href: p.repo, target: '_blank', rel: 'noreferrer noopener' }, 'Repo'));
        if (p.demo && p.demo !== '#') actions.appendChild(el('a', { class: 'btn', href: p.demo, target: '_blank', rel: 'noreferrer noopener' }, 'Live Demo'));
        info.appendChild(badges);
        info.appendChild(actions);
        card.appendChild(thumb);
        card.appendChild(info);
        grid.appendChild(card);
    });
}

function renderSkills() {
    const grid = document.getElementById('skills-grid');
    skills.forEach(s => {
        const it = el('div', { class: 'skill reveal' });
        it.appendChild(el('div', { class: 'electric' }, '⚡'));
        const text = el('div');
        text.appendChild(el('b', {}, s.name));
        text.appendChild(el('div', { style: 'color:var(--muted); font-size:13px;' }, s.note));
        it.appendChild(text);
        grid.appendChild(it);
    });
}

// ---------- Scroll reveal ----------
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: .12 });

function attachReveal() {
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ---------- Initialize ----------
renderProjects();
renderSkills();
attachReveal();
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        if (id) { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
    });
});
