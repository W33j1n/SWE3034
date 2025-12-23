document.addEventListener('DOMContentLoaded', () => {
  const cat = document.querySelector('.cat-body');
  const eyes = document.querySelectorAll('.eye');

  // Mouse tracking for eyes
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    eyes.forEach(eye => {
      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const angle = Math.atan2(y - eyeY, x - eyeX);
      const distance = Math.min(3, Math.hypot(x - eyeX, y - eyeY) / 20);

      const pupX = Math.cos(angle) * distance;
      const pupY = Math.sin(angle) * distance;

      eye.style.transform = `translate(${pupX}px, ${pupY}px)`;
    });
  });

  // Cat Click/Hover Interaction
  cat.addEventListener('click', () => {
    cat.style.transform = 'scale(0.95)';
    setTimeout(() => cat.style.transform = 'scale(1)', 100);
  });

  // Scroll to Content
  window.scrollToContent = () => {
    const content = document.getElementById('content');
    content.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Level 2 Interactions ---

  // Scroll to Level 2
  window.scrollToLevel2 = () => {
    const level2 = document.getElementById('level-2');
    level2.style.display = 'flex';
    setTimeout(() => {
      level2.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Coin Animation
  window.popCoin = () => {
    const coin = document.querySelector('.coin-anim');
    coin.style.animation = 'none';
    coin.offsetHeight; /* Trigger reflow */
    coin.style.animation = 'coin-pop 1s ease-out forwards';
  }

  // --- Level 4: Animation Triggers ---

  // Sequential Diagram Flow Animation
  const runDiagramFlow = () => {
    const nodes = document.querySelectorAll('.d-node');
    const links = document.querySelectorAll('.connection.main-link');

    let delay = 0;
    const stepTime = 600; // ms per step

    // Reset
    nodes.forEach(n => n.classList.remove('active-step'));
    links.forEach(l => l.classList.remove('active-link'));

    // Sequence: Start -> Link0 -> S1 -> Link1 -> ...
    // Nodes: 0(Start), 1(S1), 2(S2), 3(S3), 4(S4), 5(S5), 6(End)
    // Links: 0, 1, 2, 3, 4 (5 links)

    const sequence = [
      { el: nodes[0], type: 'node' }, // Start
      { el: links[0], type: 'link' },
      { el: nodes[1], type: 'node' }, // S1
      { el: links[1], type: 'link' },
      { el: nodes[2], type: 'node' }, // S2
      { el: links[2], type: 'link' },
      { el: nodes[3], type: 'node' }, // S3
      { el: links[3], type: 'link' },
      { el: nodes[4], type: 'node' }, // S4
      { el: links[4], type: 'link' },
      { el: nodes[5], type: 'node' }, // S5
      // ... S6 loop is complex, simplifing to linear finish
      { el: nodes[6], type: 'node' }, // End
    ];

    sequence.forEach((step, index) => {
      setTimeout(() => {
        if (step.type === 'node') step.el.classList.add('active-step');
        if (step.type === 'link') step.el.classList.add('active-link');
      }, index * stepTime);
    });

    // Loop
    setTimeout(runDiagramFlow, sequence.length * stepTime + 2000);
  };

  const diagramObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start loop if not already running (simple check)
        if (!entry.target.dataset.running) {
          entry.target.dataset.running = "true";
          runDiagramFlow();
        }
      }
    });
  }, { threshold: 0.3 });

  const diagramSection = document.querySelector('.code-diagram-wrapper');
  if (diagramSection) diagramObserver.observe(diagramSection);

  // --- Level 3 Interactions ---

  // Scroll to Level 3
  window.scrollToLevel3 = () => {
    const level3 = document.getElementById('level-3');
    level3.style.display = 'flex';
    setTimeout(() => {
      level3.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Scroll to Level 4 (Scaffold)
  window.scrollToLevel4 = () => {
    const level4 = document.getElementById('level-4');
    level4.style.display = 'flex';
    setTimeout(() => {
      level4.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Logic Machine Interaction
  // --- Level 3: Engineering Grid Animation ---
  const engRows = document.querySelectorAll('.anim-row');

  const engRowObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Staggered Reveal
        const index = Array.from(engRows).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // 100ms delay per row index for cascade effect

        engRowObserver.unobserve(entry.target); // Run once
      }
    });
  }, { threshold: 0.2 });

  engRows.forEach(row => engRowObserver.observe(row));

  // --- Level 2: Scan Animation ---
  const scannerLine = document.querySelector('.scanner-line');
  const scanObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scanning');
      } else {
        entry.target.classList.remove('scanning');
      }
    });
  }, { threshold: 0.5 });

  if (scannerLine) scanObserver.observe(scannerLine.parentElement); // Observe container for better trigger

  // --- Level 4: Blueprint Diagram Flow ---
  const bpDiagram = document.querySelector('.blueprint-diagram');
  const bpLinks = document.querySelectorAll('.bp-link');

  const bpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger flow sequence S1 -> S6
        bpLinks.forEach((link, index) => {
          setTimeout(() => {
            link.classList.add('highlight-flow');

            // Optional: Reset after animation to loop? 
            // For now, keep it lit to show "Verification Complete" path
          }, index * 800); // 800ms delay per step for traceability
        });
        bpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (bpDiagram) bpObserver.observe(bpDiagram);

});
