function enableDarkMode() {
    const e = document.getElementsByTagName('html')[0];
    e.classList.add('dark');
    localStorage.setItem('is_darkmode_set', e.classList.contains('dark'));
}

function toggleDarkMode() {
    const e = document.getElementsByTagName('html')[0];
    e.classList.toggle('dark');
    localStorage.setItem('is_darkmode_set', e.classList.contains('dark'));
}

function toggleBackToTop() {
    const e = document.getElementById('back-to-top');
    if (window.scrollY === 0) e.classList.add('hidden');
    else e.classList.remove('hidden');
}

function backToTop() {
    window.scrollTo(0, 0);
}

if (localStorage.getItem('is_darkmode_set') === 'true') enableDarkMode();

document
    .getElementById('darkmode-toggle')
    ?.addEventListener('click', toggleDarkMode);

document
    .getElementById('back-to-top')
    ?.addEventListener('click', backToTop);

if (document.getElementById('back-to-top')) {
    window.addEventListener('scroll', toggleBackToTop);
}

function setActiveToc({ links, id }) {
    links.forEach((link) => {
        const isActive = decodeURIComponent(link.hash.slice(1)) === id;
        if (isActive) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
    });
}

function initToc() {
    const links = Array.from(document.querySelectorAll('[data-toc-link]'));
    if (links.length === 0) return;

    const headings = links
        .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
        .filter((heading, index, items) => heading && items.indexOf(heading) === index);

    if (headings.length === 0) return;
    setActiveToc({ links, id: headings[0].id });

    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length === 0) return;
        setActiveToc({ links, id: visible[0].target.id });
    }, {
        rootMargin: '0px 0px -70% 0px',
    });

    headings.forEach((heading) => observer.observe(heading));
}

initToc();

