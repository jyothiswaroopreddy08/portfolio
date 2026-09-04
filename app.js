// ============================================================
// KNOW ME → LAPTOP EXPERIENCE
// ============================================================
const knowMeBtn = document.getElementById('knowMeBtn');
const laptopOverlay = document.getElementById('laptopOverlay');
const closeLaptop = document.getElementById('closeLaptop');
const slideTrack = document.getElementById('slideTrack');
const slideDotsWrap = document.getElementById('slideDots');
const slides = Array.from(slideTrack.querySelectorAll('.slide'));
let currentSlide = 0;
let slideTimer = null;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  slideDotsWrap.appendChild(dot);
});
const dots = Array.from(slideDotsWrap.children);

function goToSlide(i) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = i;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startSlideAutoplay() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, 5000);
}

function openLaptop() {
  laptopOverlay.classList.add('open');
  laptopOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  startSlideAutoplay();
}
function closeLaptopFn() {
  laptopOverlay.classList.remove('open');
  laptopOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  clearInterval(slideTimer);
}

knowMeBtn.addEventListener('click', openLaptop);
closeLaptop.addEventListener('click', closeLaptopFn);
laptopOverlay.addEventListener('click', (e) => { if (e.target === laptopOverlay) closeLaptopFn(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && laptopOverlay.classList.contains('open')) closeLaptopFn();
});

// ============================================================
// CI/CD PIPELINE
// ============================================================
const stageData = {
  commit: {
    title: 'Commit',
    tools: 'Git · GitHub',
    body: [
      'Every change enters through version control — branching, pull requests, and code review before anything moves further down the pipeline.',
      'At Infosys, this stage fed directly into a CI/CD system I helped migrate from Jenkins to GitHub Actions, so a commit reliably triggers the same pipeline every time.'
    ]
  },
  build: {
    title: 'Build',
    tools: 'Jenkins · GitHub Actions · Docker',
    body: [
      'Build automation runs through Jenkins and GitHub Actions, including reusable workflows so the same build logic isn\u2019t rewritten per project.',
      'Docker containerization was integrated into the delivery lifecycle here — the step that lifted deployment throughput by 25% and made runtime behavior predictable across environments.'
    ]
  },
  test: {
    title: 'Test',
    tools: 'Python · TypeScript · Bash',
    body: [
      'Automated cross-stack testing frameworks run as validation gates embedded directly in the pipeline, rather than as a manual step after the fact.',
      'This is the work that reduced post-release defects by 15% — catching problems before they reach production.'
    ]
  },
  scan: {
    title: 'Scan',
    tools: 'SonarQube · CodeQL · Megalinter · JFrog Xray',
    body: [
      'Static analysis, linting and dependency/artifact scanning run as pipeline gates rather than a final review — SonarQube and CodeQL for code quality and vulnerabilities, Megalinter for consistency, JFrog Xray for artifact risk.',
      'This work was done in partnership with security and compliance teams to strengthen governance controls and align with industry standards.'
    ]
  },
  publish: {
    title: 'Publish',
    tools: 'GitHub Actions · JFrog Xray',
    body: [
      'Once a build clears its security and quality gates, it\u2019s versioned and promoted as an artifact — with secrets management and approvals built into the GitHub Actions workflow rather than handled ad hoc.'
    ]
  },
  deploy: {
    title: 'Deploy',
    tools: 'Kubernetes · OpenShift · Terraform · AWS / Azure / GCP',
    body: [
      'Deployment runs on Kubernetes and OpenShift, provisioned through Terraform-based Infrastructure as Code across AWS, Azure and GCP for predictable, repeatable environments.',
      'Environment-based deployments and approval gates in GitHub Actions give this stage the same reliability the rest of the pipeline is built for.'
    ]
  }
};

const stages = document.querySelectorAll('.stage');
const stagePanel = document.getElementById('stagePanel');
const stagePanelContent = document.getElementById('stagePanelContent');
const stagePanelClose = document.getElementById('stagePanelClose');
const pipelinePacket = document.getElementById('pipelinePacket');
const pipelineTrack = document.getElementById('pipelineTrack');
const stageOrder = ['commit', 'build', 'test', 'scan', 'publish', 'deploy'];

function openStage(key, index) {
  const data = stageData[key];
  stagePanelContent.innerHTML = `
    <h3>${data.title}</h3>
    <p class="stage-tools mono small">${data.tools}</p>
    ${data.body.map(p => `<p class="${p.match(/\d/) ? 'achievement' : ''}">${p}</p>`).join('')}
  `;
  stagePanel.hidden = false;
  stages.forEach(s => s.classList.remove('active'));
  stages[index].classList.add('active');

  // animate packet along the track
  const trackWidth = pipelineTrack.offsetWidth;
  const targetPct = index / (stageOrder.length - 1);
  pipelinePacket.style.opacity = '1';
  pipelinePacket.style.left = '0px';
  pipelinePacket.classList.add('moving');
  requestAnimationFrame(() => {
    pipelinePacket.style.left = `${targetPct * trackWidth}px`;
  });
  setTimeout(() => { pipelinePacket.style.opacity = '0'; }, 1200);

  stagePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

stages.forEach((btn, index) => {
  btn.addEventListener('click', () => openStage(btn.dataset.stage, index));
});
stagePanelClose.addEventListener('click', () => {
  stagePanel.hidden = true;
  stages.forEach(s => s.classList.remove('active'));
});

// ============================================================
// EFFICIENCY / REUSABLE WORKFLOW DEMO
// ============================================================
const cacheToggle = document.getElementById('cacheToggle');
const cacheFlow = document.getElementById('cacheFlow');
const cacheStateLabel = document.getElementById('cacheStateLabel');
const cacheDemo = document.querySelector('.cache-demo');

let cached = false;
const beforeHTML = cacheFlow.innerHTML;
const afterHTML = `
  <div class="cache-node">Pipeline triggered</div>
  <div class="cache-arrow">↓</div>
  <div class="cache-node hit">Reusable workflow — Project A</div>
  <div class="cache-arrow">↓</div>
  <div class="cache-node hit">Reusable workflow — Project B</div>
  <div class="cache-arrow">↓</div>
  <div class="cache-node hit">Reusable workflow — Project C</div>
  <div class="cache-arrow">↓</div>
  <div class="cache-node">Build</div>
`;

cacheToggle.addEventListener('click', () => {
  cached = !cached;
  if (cached) {
    cacheFlow.style.opacity = '0';
    setTimeout(() => {
      cacheFlow.innerHTML = afterHTML;
      cacheFlow.style.opacity = '1';
    }, 200);
    cacheStateLabel.textContent = 'AFTER — ONE DEFINITION, CALLED EVERYWHERE';
    cacheToggle.textContent = 'Show Before';
    cacheDemo.classList.add('cached');
  } else {
    cacheFlow.style.opacity = '0';
    setTimeout(() => {
      cacheFlow.innerHTML = beforeHTML;
      cacheFlow.style.opacity = '1';
    }, 200);
    cacheStateLabel.textContent = 'BEFORE — DUPLICATED EFFORT';
    cacheToggle.textContent = 'Enable Reusable Workflow';
    cacheDemo.classList.remove('cached');
  }
});
cacheFlow.style.transition = 'opacity 0.2s ease';

// ============================================================
// DEVSECOPS GATE
// ============================================================
const secGateBtn = document.getElementById('secGateBtn');
const secopsPanel = document.getElementById('secopsPanel');
secGateBtn.addEventListener('click', () => {
  secopsPanel.hidden = !secopsPanel.hidden;
});

// ============================================================
// TECH CONSTELLATION
// ============================================================
const constDescriptions = {
  'Jenkins': 'Ran the original CI/CD pipeline before I led its migration to GitHub Actions, and later became the target of a custom Python monitoring engine I built to catch bottlenecks proactively.',
  'GitHub Actions': 'The system I migrated an enterprise CI/CD pipeline onto — reusable workflows, environment-based deployments, approvals and secrets management.',
  'Harness': 'Continuous delivery and GitOps tooling — certified in both CD/GitOps and CI development.',
  'Docker': 'Integrated into the application delivery lifecycle, lifting deployment throughput by 25% and standardizing runtime behavior.',
  'Kubernetes': 'Target environment for containerized deployments, paired with Terraform-provisioned infrastructure.',
  'OpenShift': 'Enterprise container orchestration platform used alongside Kubernetes for deployment.',
  'AWS': 'Primary cloud platform for infrastructure provisioning, standardized through reusable Terraform configurations.',
  'Terraform': 'Infrastructure as Code across AWS, Azure and GCP — the layer that makes provisioning predictable and repeatable.',
  'Python': 'Used to build a monitoring engine integrated with Jenkins APIs, and to automate cross-stack testing.',
  'Bash': 'Scripting for pipeline automation and cross-stack test frameworks.',
  'PowerShell': 'Scripting for automation across Windows-based environments.',
  'Groovy': 'Jenkins pipeline scripting.',
  'YAML': 'Pipeline and workflow configuration across Jenkins and GitHub Actions.',
  'SonarQube': 'Static code analysis run as a gate inside the pipeline, not a manual review step.',
  'CodeQL': 'Automated vulnerability scanning integrated into the DevSecOps toolchain.',
  'Megalinter': 'Linting enforcement for consistent code quality across projects.',
  'JFrog Xray': 'Artifact and dependency scanning before promotion to production.',
  'Git': 'Version control foundation for every pipeline this portfolio describes.',
  'GitHub': 'Repository hosting and the trigger point for CI/CD automation.'
};

const groupRelations = {
  cicd: ['containers', 'vcs'],
  containers: ['cicd', 'cloud', 'iac'],
  cloud: ['iac', 'containers'],
  iac: ['cloud', 'containers'],
  scripting: ['cicd', 'security'],
  security: ['cicd', 'scripting'],
  vcs: ['cicd']
};

const constellation = document.getElementById('constellation');
const constDetail = document.getElementById('constDetail');
const tags = document.querySelectorAll('.tag');

tags.forEach(tag => {
  tag.addEventListener('click', () => {
    const alreadySelected = tag.classList.contains('selected');
    tags.forEach(t => t.classList.remove('selected'));
    constellation.classList.remove('dimmed');
    document.querySelectorAll('.const-group').forEach(g => g.classList.remove('related'));

    if (alreadySelected) {
      constDetail.hidden = true;
      return;
    }

    tag.classList.add('selected');
    const group = tag.closest('.const-group');
    const groupKey = group.dataset.group;
    constellation.classList.add('dimmed');
    group.classList.add('related');
    (groupRelations[groupKey] || []).forEach(rel => {
      const relGroup = constellation.querySelector(`[data-group="${rel}"]`);
      if (relGroup) relGroup.classList.add('related');
    });

    const desc = constDescriptions[tag.textContent] || '';
    constDetail.innerHTML = `<strong>${tag.textContent}</strong> — ${desc}`;
    constDetail.hidden = false;
  });
});

// ============================================================
// TIMELINE
// ============================================================
const timelineNodes = document.querySelectorAll('.timeline-node');
timelineNodes.forEach(node => {
  node.addEventListener('click', () => {
    const i = node.dataset.node;
    const detail = document.querySelector(`.timeline-detail[data-detail="${i}"]`);
    const isOpen = !detail.hidden;
    detail.hidden = isOpen;
    node.classList.toggle('open', !isOpen);
  });
});

// ============================================================
// BEYOND THE TERMINAL — sequential reveal
// ============================================================
const beyondItems = document.querySelectorAll('.beyond-item');

beyondItems.forEach((item, idx) => {
  const trigger = item.querySelector('.beyond-trigger');
  const reveal = item.querySelector('.beyond-reveal');
  trigger.addEventListener('click', () => {
    if (!reveal.hidden) return;
    reveal.hidden = false;
    const next = beyondItems[idx + 1];
    if (next) next.hidden = false;
  });
});

// music player
const playBtn = document.getElementById('playBtn');
const audioEl = document.getElementById('audioEl');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    if (audioEl.paused) {
      audioEl.play().catch(() => {
        playBtn.textContent = '▶';
      });
      playBtn.textContent = '❚❚';
    } else {
      audioEl.pause();
      playBtn.textContent = '▶';
    }
  });
  audioEl.addEventListener('ended', () => { playBtn.textContent = '▶'; });
}

// art lightbox
const artOpen = document.getElementById('artOpen');
if (artOpen) {
  artOpen.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">×</button>
      <div class="lightbox-content">PLACEHOLDER — replace assets/digital-art.jpg<br>with your artwork to display it fullscreen here.</div>
    `;
    document.body.appendChild(lightbox);
    requestAnimationFrame(() => lightbox.classList.add('open'));
    function close() {
      lightbox.classList.remove('open');
      setTimeout(() => lightbox.remove(), 250);
    }
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  });
}

// ============================================================
// TERMINAL EASTER EGG
// ============================================================
const termTrigger = document.getElementById('termTrigger');
const terminalOverlay = document.getElementById('terminalOverlay');
const terminalClose = document.getElementById('terminalClose');
const terminalBody = document.getElementById('terminalBody');

const terminalScript = [
  { prompt: '$ whoami', delay: 0 },
  { line: 'Jyothi Swaroop Reddy Mula — DevOps Engineer', delay: 500 },
  { prompt: '$ experience', delay: 1100 },
  { line: '4.8 years, across consulting and enterprise engineering', delay: 1600 },
  { prompt: '$ philosophy', delay: 2200 },
  { line: 'Automate. Secure. Optimize. Deploy.', delay: 2700 }
];

let terminalOpened = false;

function runTerminal() {
  terminalBody.innerHTML = '';
  terminalScript.forEach(step => {
    setTimeout(() => {
      const line = document.createElement('div');
      if (step.prompt) {
        line.innerHTML = `<span class="prompt">${step.prompt}</span>`;
      } else {
        line.textContent = step.line;
      }
      terminalBody.appendChild(line);
    }, step.delay);
  });
  setTimeout(() => {
    const caret = document.createElement('span');
    caret.className = 'caret';
    terminalBody.appendChild(caret);
  }, 3000);
}

function openTerminal() {
  terminalOverlay.hidden = false;
  runTerminal();
}
function closeTerminal() {
  terminalOverlay.hidden = true;
}

termTrigger.addEventListener('click', openTerminal);
terminalClose.addEventListener('click', closeTerminal);
terminalOverlay.addEventListener('click', (e) => { if (e.target === terminalOverlay) closeTerminal(); });

// typed "sudo whoami" anywhere on the page
let typedBuffer = '';
document.addEventListener('keydown', (e) => {
  if (e.key.length === 1) {
    typedBuffer = (typedBuffer + e.key).slice(-14);
    if (typedBuffer.includes('sudo whoami')) {
      openTerminal();
      typedBuffer = '';
    }
  }
  if (e.key === 'Escape' && !terminalOverlay.hidden) closeTerminal();
});
