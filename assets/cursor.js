/**
 * Interactive Dual-Layer Neon Cursor (Option 1: Electric Cyan & Indigo Theme)
 * Features zero-latency glowing micro-dot with fluid physics trailing outer ring.
 * Adapts to interactive elements, click states, and preserves native I-beam on inputs.
 * Zero mobile/touchscreen overhead (pointer: fine only).
 */
(function () {
    'use strict';

    // Only activate on devices with a fine pointer (mouse / trackpad)
    if (typeof window === 'undefined' || !window.matchMedia || !window.matchMedia('(pointer: fine)').matches) {
        return;
    }

    // Check for reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lerpFactor = prefersReducedMotion ? 1.0 : 0.16;

    // Inject cursor styles
    var styleEl = document.createElement('style');
    styleEl.id = 'portfolio-custom-cursor-styles';
    styleEl.textContent = `
        @media (pointer: fine) {
            body.custom-cursor-active,
            body.custom-cursor-active a,
            body.custom-cursor-active button,
            body.custom-cursor-active [role="button"],
            body.custom-cursor-active [onclick],
            body.custom-cursor-active .cursor-pointer,
            body.custom-cursor-active select,
            body.custom-cursor-active summary {
                cursor: none !important;
            }

            body.custom-cursor-active input[type="text"],
            body.custom-cursor-active input[type="email"],
            body.custom-cursor-active input[type="password"],
            body.custom-cursor-active input[type="search"],
            body.custom-cursor-active input[type="tel"],
            body.custom-cursor-active input[type="url"],
            body.custom-cursor-active input[type="number"],
            body.custom-cursor-active textarea {
                cursor: text !important;
            }
        }

        #cursor-dot,
        #cursor-ring {
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none !important;
            border-radius: 50%;
            opacity: 0;
            will-change: transform, opacity;
            z-index: 999999;
        }

        #cursor-dot {
            width: 7px;
            height: 7px;
            background: #06b6d4;
            box-shadow: 0 0 10px #06b6d4, 0 0 20px rgba(99, 102, 241, 0.7);
            transition: opacity 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
            z-index: 1000000;
        }

        #cursor-ring {
            width: 36px;
            height: 36px;
            border: 1.5px solid rgba(6, 182, 212, 0.6);
            background: rgba(99, 102, 241, 0.05);
            box-shadow: 0 0 16px rgba(6, 182, 212, 0.25), inset 0 0 10px rgba(99, 102, 241, 0.15);
            transition: width 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                        height 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.25s ease,
                        background-color 0.25s ease,
                        box-shadow 0.25s ease,
                        opacity 0.2s ease;
        }

        #cursor-dot.is-visible,
        #cursor-ring.is-visible {
            opacity: 1;
        }

        /* Hovering interactive elements */
        #cursor-ring.is-hovering {
            width: 56px;
            height: 56px;
            border-color: rgba(6, 182, 212, 0.95);
            background: rgba(6, 182, 212, 0.1);
            box-shadow: 0 0 24px rgba(6, 182, 212, 0.45), inset 0 0 14px rgba(99, 102, 241, 0.3);
        }

        #cursor-dot.is-hovering {
            background: #38bdf8;
            box-shadow: 0 0 14px #38bdf8, 0 0 24px rgba(99, 102, 241, 0.9);
        }

        /* Clicking / Active State */
        #cursor-ring.is-active {
            border-color: #a855f7;
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.65);
        }

        #cursor-dot.is-active {
            background: #c084fc;
            box-shadow: 0 0 14px #c084fc, 0 0 24px rgba(168, 85, 247, 0.9);
        }

        /* Inputs & Textareas: Hide custom elements to let native text cursor show */
        #cursor-dot.is-hidden,
        #cursor-ring.is-hidden {
            opacity: 0 !important;
        }

        @media (pointer: coarse), (hover: none) {
            #cursor-dot, #cursor-ring {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(styleEl);

    // Create cursor elements
    var dot = document.createElement('div');
    dot.id = 'cursor-dot';

    var ring = document.createElement('div');
    ring.id = 'cursor-ring';

    function initCursor() {
        if (!document.body || document.getElementById('cursor-dot')) return;
        document.body.appendChild(dot);
        document.body.appendChild(ring);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCursor);
    } else {
        initCursor();
    }

    var mouseX = -100;
    var mouseY = -100;
    var ringX = -100;
    var ringY = -100;
    var isVisible = false;
    var isHovering = false;
    var isActive = false;

    // Smooth physics loop
    function render() {
        if (isVisible) {
            // Fluid trailing physics (LERP)
            ringX += (mouseX - ringX) * lerpFactor;
            ringY += (mouseY - ringY) * lerpFactor;

            // Render hardware-accelerated transforms
            var dotScale = isActive ? 'scale(1.3)' : (isHovering ? 'scale(1.15)' : 'scale(1)');
            dot.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0) translate(-50%, -50%) ' + dotScale;

            var ringScale = isActive ? 'scale(0.82)' : 'scale(1)';
            ring.style.transform = 'translate3d(' + ringX + 'px, ' + ringY + 'px, 0) translate(-50%, -50%) ' + ringScale;
        }

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // Track mouse position
    window.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            ringX = mouseX;
            ringY = mouseY;
            dot.classList.add('is-visible');
            ring.classList.add('is-visible');
            document.body.classList.add('custom-cursor-active');
        }
    }, { passive: true });

    // Active click effect
    window.addEventListener('mousedown', function () {
        isActive = true;
        ring.classList.add('is-active');
        dot.classList.add('is-active');
    }, { passive: true });

    window.addEventListener('mouseup', function () {
        isActive = false;
        ring.classList.remove('is-active');
        dot.classList.remove('is-active');
    }, { passive: true });

    // Window exit/enter
    document.addEventListener('mouseleave', function () {
        isVisible = false;
        dot.classList.remove('is-visible');
        ring.classList.remove('is-visible');
    }, { passive: true });

    document.addEventListener('mouseenter', function () {
        isVisible = true;
        dot.classList.add('is-visible');
        ring.classList.add('is-visible');
    }, { passive: true });

    // Interactive target detection using event delegation
    var interactiveSelectors = 'a, button, [role="button"], [onclick], .cursor-pointer, .glass-card, .cert-card, select, summary, label, input[type="submit"], input[type="button"]';
    var textInputSelectors = 'input[type="text"], input[type="email"], input[type="password"], input[type="search"], input[type="tel"], input[type="url"], input[type="number"], textarea, iframe, object, embed';

    document.addEventListener('mouseover', function (e) {
        var target = e.target;
        if (!target || !target.closest) return;

        // Check if over text input or embedded frame
        if (target.closest(textInputSelectors)) {
            dot.classList.add('is-hidden');
            ring.classList.add('is-hidden');
            return;
        }

        // Check if over interactive element
        if (target.closest(interactiveSelectors)) {
            isHovering = true;
            dot.classList.add('is-hovering');
            ring.classList.add('is-hovering');
        }
    }, { passive: true });

    document.addEventListener('mouseout', function (e) {
        var target = e.target;
        if (!target || !target.closest) return;

        if (target.closest(textInputSelectors)) {
            dot.classList.remove('is-hidden');
            ring.classList.remove('is-hidden');
        }

        if (target.closest(interactiveSelectors)) {
            var related = e.relatedTarget;
            if (!related || !related.closest || !related.closest(interactiveSelectors)) {
                isHovering = false;
                dot.classList.remove('is-hovering');
                ring.classList.remove('is-hovering');
            }
        }
    }, { passive: true });

})();
