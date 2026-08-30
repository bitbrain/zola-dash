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

function getHeadingTopOffset() {
    const header = document.querySelector('.article-site-header');
    const rootStyles = getComputedStyle(document.documentElement);
    const stickyGapValue = rootStyles
        .getPropertyValue('--article-sticky-gap')
        .trim();
    const stickyGap = stickyGapValue.endsWith('rem')
        ? parseFloat(stickyGapValue) * parseFloat(rootStyles.fontSize)
        : parseFloat(stickyGapValue);
    return (header?.offsetHeight || 0) + (stickyGap || 0);
}

function navigateToHeading({ heading, links }) {
    const hash = `#${encodeURIComponent(heading.id)}`;
    if (location.hash !== hash) history.pushState(null, '', hash);

    setActiveToc({ links, id: heading.id });
    window.scrollTo({
        top: window.scrollY + heading.getBoundingClientRect().top -
            getHeadingTopOffset(),
        behavior: 'auto',
    });
}

function updateActiveToc({ links, headings }) {
    const topOffset = getHeadingTopOffset();
    const isAtBottom = window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;
    let activeHeading = headings[0];

    if (isAtBottom) {
        activeHeading = headings[headings.length - 1];
    } else {
        for (const heading of headings) {
            if (heading.getBoundingClientRect().top > topOffset + 1) break;
            activeHeading = heading;
        }
    }

    setActiveToc({ links, id: activeHeading.id });
}

function initToc() {
    const links = Array.from(document.querySelectorAll('[data-toc-link]'));
    if (links.length === 0) return;

    const headings = links
        .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
        .filter((heading, index, items) => heading && items.indexOf(heading) === index);

    if (headings.length === 0) return;
    let updatePending = false;
    const update = () => {
        updateActiveToc({ links, headings });
        updatePending = false;
    };

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const id = decodeURIComponent(link.hash.slice(1));
            const heading = document.getElementById(id);
            if (!heading) return;
            navigateToHeading({ heading, links });
        });
    });

    window.addEventListener('scroll', () => {
        if (updatePending) return;
        updatePending = true;
        requestAnimationFrame(update);
    }, { passive: true });

    update();
}

initToc();

function initHeadingAnchors() {
    const links = Array.from(document.querySelectorAll('[data-toc-link]'));

    document
        .querySelectorAll('.article-prose :is(h1, h2, h3, h4, h5, h6)[id]')
        .forEach((heading) => {
            if (!heading.querySelector('a')) {
                const anchor = document.createElement('a');
                anchor.href = `#${heading.id}`;
                anchor.className = 'heading-anchor';
                while (heading.firstChild) {
                    anchor.appendChild(heading.firstChild);
                }
                heading.appendChild(anchor);
            }

            heading.querySelector('.heading-anchor')?.addEventListener('click', (event) => {
                event.preventDefault();
                navigateToHeading({ heading, links });
            });

            heading.addEventListener('click', (event) => {
                if (event.target.closest('a')) return;
                navigateToHeading({ heading, links });
            });
        });
}

initHeadingAnchors();

function initExternalLinks() {
    document.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
            return;
        }

        let url;
        try {
            url = new URL(href, window.location.href);
        } catch {
            return;
        }

        if (url.origin === window.location.origin) return;

        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
}

initExternalLinks();

