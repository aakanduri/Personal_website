const content = {
  about: {
    kicker: "",
    title: "ABOUT ME",
    hint: "Bed selected",
    tooltip: "About Me",
    image: "./headshot.JPG",
    body: [
      "Hi, I’m Aayush.",
      "I’m a Computer Engineering student at the University of Michigan, also pursuing a minor in Mathematics.",
      "I came into college wanting to build things. Not just write code, but understand how systems work end to end.",
      "Over time, that grew into an interest in full-stack development, systems design, and applied AI. I like taking ideas from a rough concept to something real and usable.",
      "To me, technology is leverage. When it is built well, it can simplify complexity and open up new ways of thinking and working.",
      "Please feel free to reach out if you share a similar vision or would just like to chat."
    ],
    actions: []
  },
  experience: {
    kicker: "",
    title: "Where I have worked",
    hint: "Work icon selected",
    tooltip: "Where I have worked",
    body: [
      ""
    ],
    actions: [],
    companies: [
      {
        name: "AgentMail",
        href: "https://agentmail.to/",
        logoBg: "#f6f4ef",
        logoFile: "./agentmail_logo.png"
      },
      {
        name: "Circular Action Alliance",
        href: "https://circularactionalliance.org/",
        logoBg: "#f6f4ef",
        logoFile: "./caa_logo.png"
      },
      {
        name: "Milieu",
        href: "https://milieuskin.com/",
        logoBg: "#f6f4ef",
        logoFile: "./milieu_logo.png"
      }
    ]
  },
  now: {
    kicker: "",
    title: "What I am focused on now",
    hint: "Shelf selected",
    tooltip: "What I'm Up To",
    body: [
      "Talk about what you are learning, what you are exploring, or what kind of work you want next.",
      "This section makes the site feel current even if you do not have many projects yet."
    ],
    actions: [
      { label: "Say Hi", href: "mailto:akanduri@umich.edu", className: "primary-link" },
      { label: "View LinkedIn", href: "https://www.linkedin.com/", className: "secondary-link" }
    ]
  },
  languages: {
    kicker: "",
    title: "Coding languages I know",
    hint: "Computer selected",
    tooltip: "Coding Languages",
    body: [],
    languageCards: [
      {
        title: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        tone: "python"
      },
      {
        title: "C++",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        tone: "cpp"
      },
      {
        title: "Java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        tone: "java"
      },
      {
        title: "SQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg",
        tone: "sql"
      }
    ],
    actions: []
  },
  interests: {
    kicker: "",
    title: "Things I am into",
    hint: "Dumbbell selected",
    tooltip: "Interests",
    body: [],
    interestCards: [
      { title: "Weightlifting / Powerlifting", emoji: "🏋️", tone: "strength" },
      { title: "Skiing", emoji: "🎿", tone: "snow" },
      { title: "Rock Climbing", emoji: "🧗", tone: "climb" },
      { title: "Ping Pong", emoji: "🏓", tone: "sport" },
      { title: "Reading", emoji: "📚", tone: "read" },
      { title: "Baking", emoji: "🥐", tone: "bake" }
    ],
    actions: []
  },
  contact: {
    kicker: "",
    title: "The easiest way to reach me",
    hint: "Phone selected",
    tooltip: "Contact",
    body: [
      "Email me at akanduri@umich.edu.",
      "Feel free to reach out or simply connect with me!",
      "Please contact me to see my resume."
    ],
    actions: [
      { label: "Email Me", href: "mailto:akanduri@umich.edu", className: "primary-link" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/aayush-kanduri", className: "secondary-link" }
    ]
  }
};

const canvas = document.querySelector("#scene-canvas");
const tooltipBadge = document.querySelector("#tooltip-badge");
const detailOverlay = document.querySelector("#detail-overlay");
const backButton = document.querySelector("#back-button");
const panelTitle = document.querySelector("#panel-title");
const panelHint = document.querySelector("#panel-hint");
const panelImage = document.querySelector("#panel-image");
const panelBody = document.querySelector("#panel-body");
const panelActions = document.querySelector("#panel-actions");
const legendChips = document.querySelectorAll(".legend-chip");

function renderWorkIcon(company) {
  return `
    <span class="work-icon" style="background:${company.logoBg}">
      <img class="work-logo" src="${company.logoFile}" alt="${company.name} logo" />
    </span>
  `;
}

const scene = new THREE.Scene();
scene.background = new THREE.Color("#617d93");
scene.fog = new THREE.Fog("#7d746f", 13, 25);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(1.2, 6.0, 10.8);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;

const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 6;
controls.maxDistance = 15;
controls.minPolarAngle = Math.PI * 0.23;
controls.maxPolarAngle = Math.PI * 0.47;
controls.target.set(1.9, 1.9, -1.8);

const ambientLight = new THREE.AmbientLight("#b5bcc6", 0.95);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight("#ffd7ad", 1.95);
sunLight.position.set(4, 8, 3);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.left = -12;
sunLight.shadow.camera.right = 12;
sunLight.shadow.camera.top = 12;
sunLight.shadow.camera.bottom = -12;
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight("#56718c", 0.8);
fillLight.position.set(-7, 5, -5);
scene.add(fillLight);

const roomGroup = new THREE.Group();
scene.add(roomGroup);

const clickableObjects = [];
const hoverScale = new THREE.Vector3(1.07, 1.07, 1.07);
const normalScale = new THREE.Vector3(1, 1, 1);

function makeMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.92,
    metalness: 0.02
  });
}

function addBox({ w, h, d, color, x = 0, y = 0, z = 0, cast = true, receive = true }) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    makeMaterial(color)
  );
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  return mesh;
}

const floor = addBox({ w: 12, h: 0.6, d: 12, color: "#6c4f42", y: -0.3 });
floor.receiveShadow = true;
roomGroup.add(floor);

const backWall = addBox({ w: 12, h: 6.5, d: 0.4, color: "#a59de0", y: 2.95, z: -6 });
const sideWall = addBox({ w: 0.4, h: 6.5, d: 12, color: "#6ec9d5", x: 6, y: 2.95 });
const trim = addBox({ w: 12.1, h: 0.3, d: 0.5, color: "#5e4537", y: 0.15, z: -6 });
roomGroup.add(backWall, sideWall, trim);

const posterA = addBox({ w: 1.1, h: 1.5, d: 0.1, color: "#ff8b6b", x: -3.8, y: 3.6, z: -5.72 });
const posterB = addBox({ w: 1.1, h: 1.5, d: 0.1, color: "#4d7dff", x: -2.25, y: 3.5, z: -5.72 });
roomGroup.add(posterA, posterB);

function createInitialPosterLetter(letter, x, y, z) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff6ea";
  ctx.font = "900 180px Nunito, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, canvas.width / 2, canvas.height / 2 + 10);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.9), material);
  mesh.position.set(x, y, z);
  roomGroup.add(mesh);
}

createInitialPosterLetter("A", -3.8, 3.6, -5.66);
createInitialPosterLetter("K", -2.25, 3.5, -5.66);

function addPlant() {
  return null;
}

addPlant();

function registerInteractive(group, sectionKey) {
  group.userData.sectionKey = sectionKey;
  group.userData.allowScaleHighlight = true;
  group.traverse((child) => {
    if (child.isMesh) {
      child.userData.sectionKey = sectionKey;
      child.userData.hasEmissive = Boolean(child.material && child.material.emissive);
      child.userData.baseEmissive = child.userData.hasEmissive
        ? child.material.emissive.clone()
        : new THREE.Color("#000000");
      clickableObjects.push(child);
    }
  });
}

function createIconTexture(label, bgColor, textColor = "#fffaf0") {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  const radius = 48;
  ctx.moveTo(radius, 0);
  ctx.lineTo(canvas.width - radius, 0);
  ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
  ctx.lineTo(canvas.width, canvas.height - radius);
  ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
  ctx.lineTo(radius, canvas.height);
  ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 44px Nunito, sans-serif";

  const lines = label.split("\n");
  lines.forEach((line, index) => {
    const y = canvas.height / 2 + (index - (lines.length - 1) / 2) * 46;
    ctx.fillText(line, canvas.width / 2, y);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createBed() {
  const group = new THREE.Group();
  const frame = addBox({ w: 2.8, h: 0.7, d: 4.1, color: "#ff5a54", y: 0.5 });
  const mattress = addBox({ w: 2.55, h: 0.45, d: 3.7, color: "#ffd9c7", y: 1.02 });
  const pillowA = addBox({ w: 0.95, h: 0.28, d: 0.72, color: "#fff8ef", x: -0.55, y: 1.32, z: -1.18 });
  const pillowB = addBox({ w: 0.95, h: 0.28, d: 0.72, color: "#fff8ef", x: 0.55, y: 1.32, z: -1.18 });
  const blanket = addBox({ w: 2.45, h: 0.22, d: 2.1, color: "#ff7b6e", y: 1.22, z: 0.58 });
  group.add(frame, mattress, pillowA, pillowB, blanket);
  group.rotation.y = 0;
  group.position.set(2.95, 0, -4.1);
  registerInteractive(group, "about");
  roomGroup.add(group);
}

function createDesk() {
  const group = new THREE.Group();
  const top = addBox({ w: 2.3, h: 0.24, d: 1.2, color: "#3b66ff", y: 1.55 });
  const leg1 = addBox({ w: 0.18, h: 1.5, d: 0.18, color: "#2848bf", x: -0.95, y: 0.75, z: -0.42 });
  const leg2 = addBox({ w: 0.18, h: 1.5, d: 0.18, color: "#2848bf", x: 0.95, y: 0.75, z: -0.42 });
  const leg3 = addBox({ w: 0.18, h: 1.5, d: 0.18, color: "#2848bf", x: -0.95, y: 0.75, z: 0.42 });
  const leg4 = addBox({ w: 0.18, h: 1.5, d: 0.18, color: "#2848bf", x: 0.95, y: 0.75, z: 0.42 });
  group.add(top, leg1, leg2, leg3, leg4);
  group.position.set(0.15, 0, -4.05);
  roomGroup.add(group);
}

function createTimelineGraphic() {
  const group = new THREE.Group();
  const frame = addBox({ w: 0.1, h: 1.02, d: 2.5, color: "#fff0d7", x: 5.75, y: 3.1, z: 0 });
  const board = addBox({ w: 0.05, h: 0.72, d: 2.18, color: "#f58d67", x: 5.71, y: 3.1, z: 0, cast: false });
  const line = addBox({ w: 0.05, h: 0.05, d: 1.65, color: "#fff2cc", x: 5.69, y: 3.08, z: 0, cast: false });
  const dashOne = addBox({ w: 0.05, h: 0.22, d: 0.08, color: "#fff2cc", x: 5.68, y: 3.08, z: -0.56, cast: false });
  const dashTwo = addBox({ w: 0.05, h: 0.22, d: 0.08, color: "#fff2cc", x: 5.68, y: 3.08, z: 0, cast: false });
  const dashThree = addBox({ w: 0.05, h: 0.22, d: 0.08, color: "#fff2cc", x: 5.68, y: 3.08, z: 0.56, cast: false });
  group.add(frame, board, line, dashOne, dashTwo, dashThree);
  registerInteractive(group, "experience");
  group.userData.allowScaleHighlight = false;
  roomGroup.add(group);
}

function createPhone() {
  const group = new THREE.Group();
  const body = addBox({ w: 0.56, h: 1.08, d: 0.1, color: "#161a22", y: 1.02 });
  const screen = addBox({ w: 0.42, h: 0.8, d: 0.04, color: "#ffe34c", y: 1.04, z: 0.04, cast: false });
  group.add(body, screen);
  group.rotation.x = -Math.PI / 2;
  group.rotation.z = 0.08;
  group.position.set(0.68, 1.66, -2.88);
  registerInteractive(group, "contact");
  roomGroup.add(group);
}

function createDumbbell() {
  const group = new THREE.Group();
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 1.15, 18),
    makeMaterial("#111111")
  );
  handle.rotation.z = Math.PI / 2;
  handle.position.y = 0.22;
  handle.castShadow = true;

  const plateData = [
    [-0.5, "#121212"],
    [-0.33, "#121212"],
    [0.33, "#121212"],
    [0.5, "#121212"]
  ];

  group.add(handle);

  for (const [x, color] of plateData) {
    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.12, 18),
      makeMaterial(color)
    );
    plate.rotation.z = Math.PI / 2;
    plate.position.set(x, 0.22, 0);
    plate.castShadow = true;
    group.add(plate);
  }

  group.rotation.z = 0;
  group.position.set(-1.55, 0.01, 1.65);
  registerInteractive(group, "interests");
  roomGroup.add(group);
}

function createLanguageDesk() {
  const desk = new THREE.Group();
  const top = addBox({ w: 2.1, h: 0.22, d: 1.1, color: "#6a57d2", y: 1.5 });
  const leg1 = addBox({ w: 0.16, h: 1.46, d: 0.16, color: "#45389a", x: -0.86, y: 0.73, z: -0.38 });
  const leg2 = addBox({ w: 0.16, h: 1.46, d: 0.16, color: "#45389a", x: 0.86, y: 0.73, z: -0.38 });
  const leg3 = addBox({ w: 0.16, h: 1.46, d: 0.16, color: "#45389a", x: -0.86, y: 0.73, z: 0.38 });
  const leg4 = addBox({ w: 0.16, h: 1.46, d: 0.16, color: "#45389a", x: 0.86, y: 0.73, z: 0.38 });
  desk.add(top, leg1, leg2, leg3, leg4);
  desk.position.set(3.65, 0, 2.75);
  roomGroup.add(desk);

  const chair = new THREE.Group();
  const seat = addBox({ w: 0.9, h: 0.14, d: 0.9, color: "#ff9d4d", y: 0.92 });
  const back = addBox({ w: 0.9, h: 1.0, d: 0.14, color: "#ff9d4d", y: 1.38, z: -0.36 });
  const chairLeg1 = addBox({ w: 0.12, h: 0.88, d: 0.12, color: "#8f5a2f", x: -0.32, y: 0.44, z: -0.26 });
  const chairLeg2 = addBox({ w: 0.12, h: 0.88, d: 0.12, color: "#8f5a2f", x: 0.32, y: 0.44, z: -0.26 });
  const chairLeg3 = addBox({ w: 0.12, h: 0.88, d: 0.12, color: "#8f5a2f", x: -0.32, y: 0.44, z: 0.26 });
  const chairLeg4 = addBox({ w: 0.12, h: 0.88, d: 0.12, color: "#8f5a2f", x: 0.32, y: 0.44, z: 0.26 });
  chair.add(seat, back, chairLeg1, chairLeg2, chairLeg3, chairLeg4);
  chair.position.set(3.65, 0, 1.55);
  roomGroup.add(chair);

  const computer = new THREE.Group();
  const monitor = addBox({ w: 1.1, h: 0.7, d: 0.12, color: "#21242d", y: 2.04, z: -0.08 });
  const screen = addBox({ w: 0.9, h: 0.54, d: 0.04, color: "#67ffcc", y: 2.04, z: -0.01, cast: false });
  const stand = addBox({ w: 0.14, h: 0.42, d: 0.1, color: "#4d5160", y: 1.64, z: -0.06 });
  const keyboard = addBox({ w: 0.92, h: 0.06, d: 0.32, color: "#e8edf2", y: 1.6, z: 0.26, cast: false });
  computer.add(monitor, screen, stand, keyboard);
  computer.rotation.y = Math.PI;
  computer.position.set(3.65, 0, 2.75);
  registerInteractive(computer, "languages");
  roomGroup.add(computer);
}

createBed();
createDesk();
createTimelineGraphic();
createLanguageDesk();
createPhone();
createDumbbell();

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hoveredSection = null;
let activeSection = null;
let promptedSection = null;
let overlayOpen = false;
const highlightColor = new THREE.Color("#ffe84f");

function updatePanel(sectionKey) {
  const section = content[sectionKey];
  if (!section) {
    return;
  }

  activeSection = sectionKey;
  panelTitle.textContent = section.title;
  panelHint.textContent = section.hint;
  if (section.image) {
    panelImage.hidden = false;
    panelImage.src = section.image;
    panelImage.alt = "Aayush Kanduri headshot";
  } else {
    panelImage.hidden = true;
    panelImage.removeAttribute("src");
    panelImage.alt = "";
  }
  const bodyHtml = section.body.map((paragraph) => `<p>${paragraph}</p>`).join("");
  const languagesHtml = section.languageCards
    ? `<div class="interest-grid">${section.languageCards
        .map(
          (language) => `
            <div class="interest-card interest-${language.tone}">
              <div class="interest-visual">
                <img class="interest-logo" src="${language.logo}" alt="${language.title} logo" />
              </div>
              <div class="interest-name">${language.title}</div>
            </div>`
        )
        .join("")}</div>`
    : "";
  const interestsHtml = section.interestCards
    ? `<div class="interest-grid">${section.interestCards
        .map(
          (interest) => `
            <div class="interest-card interest-${interest.tone}">
              <div class="interest-visual">${interest.emoji}</div>
              <div class="interest-name">${interest.title}</div>
            </div>`
        )
        .join("")}</div>`
    : "";
  const companiesHtml = section.companies
    ? `<div class="work-grid">${section.companies
        .map(
          (company) => `
            <a class="work-card" href="${company.href}" target="_blank" rel="noreferrer">
              ${renderWorkIcon(company)}
              <span class="work-name">${company.name}</span>
            </a>`
        )
        .join("")}</div>`
    : "";
  panelBody.innerHTML = bodyHtml + languagesHtml + interestsHtml + companiesHtml;
  panelActions.innerHTML = section.actions
    .map((action) => {
      const externalAttrs = action.href.startsWith("http")
        ? ' target="_blank" rel="noreferrer"'
        : "";
      return `<a class="${action.className}" href="${action.href}"${externalAttrs}>${action.label}</a>`;
    })
    .join("");

  refreshHighlights();
}

function openOverlay(sectionKey) {
  updatePanel(sectionKey);
  promptedSection = null;
  hoveredSection = null;
  overlayOpen = true;
  detailOverlay.hidden = false;
  tooltipBadge.hidden = true;
}

function closeOverlay() {
  overlayOpen = false;
  detailOverlay.hidden = true;
  activeSection = null;
  promptedSection = null;
  legendChips.forEach((chip) => chip.classList.remove("active"));
  setHoveredSection(null);
}

function refreshHighlights(pointerSection = hoveredSection) {
  const pulse = 0.72 + Math.sin(performance.now() * 0.012) * 0.28;

  for (const object of clickableObjects) {
    const sectionKey = object.userData.sectionKey;
    const isPrompted = sectionKey === promptedSection;
    const isHovered = sectionKey === pointerSection;
    const isActive = sectionKey === activeSection;
    const shouldGlow = isPrompted || isHovered || isActive;

    if (object.userData.hasEmissive) {
      object.material.emissive.set(shouldGlow ? highlightColor : "#000000");
      object.material.emissiveIntensity = isHovered
        ? 0.62 + pulse * 0.22
        : isPrompted
          ? 0.56 + pulse * 0.28
          : isActive
            ? 0.34 + pulse * 0.14
            : 0;
    }
    if (object.parent.userData.allowScaleHighlight === false) {
      object.parent.scale.copy(normalScale);
    } else {
      object.parent.scale.copy(shouldGlow ? hoverScale : normalScale);
    }
  }
}

function promptSection(sectionKey) {
  promptedSection = sectionKey;
  hoveredSection = sectionKey;
  legendChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.section === sectionKey);
  });
  const rect = canvas.getBoundingClientRect();
  tooltipBadge.hidden = false;
  tooltipBadge.textContent = `Click the ${
    sectionKey === "about"
      ? "bed"
      : sectionKey === "experience"
        ? "work icon"
        : sectionKey === "languages"
          ? "computer"
          : sectionKey === "interests"
            ? "dumbbell"
            : "phone"
  } for details`;
  tooltipBadge.style.left = `${rect.left + rect.width * 0.5}px`;
  tooltipBadge.style.top = `${rect.top + rect.height * 0.88}px`;
  refreshHighlights(sectionKey);
}

function setHoveredSection(sectionKey, clientX = 0, clientY = 0) {
  hoveredSection = sectionKey;

  if (!sectionKey) {
    tooltipBadge.hidden = true;
    canvas.style.cursor = "grab";
    hoveredSection = null;
    refreshHighlights(null);
    return;
  }

  tooltipBadge.hidden = false;
  tooltipBadge.textContent = content[sectionKey].tooltip;
  tooltipBadge.style.left = `${clientX}px`;
  tooltipBadge.style.top = `${clientY}px`;
  canvas.style.cursor = "pointer";
  refreshHighlights(sectionKey);
}

function findSectionUnderPointer(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersections = raycaster.intersectObjects(clickableObjects, false);
  return intersections.length > 0 ? intersections[0].object.userData.sectionKey : null;
}

function onPointerMove(event) {
  if (overlayOpen) {
    return;
  }
  const sectionKey = findSectionUnderPointer(event.clientX, event.clientY);
  setHoveredSection(sectionKey, event.clientX, event.clientY);
}

function onClick(event) {
  if (overlayOpen) {
    return;
  }
  const sectionKey = findSectionUnderPointer(event.clientX, event.clientY);

  if (sectionKey) {
    promptedSection = null;
    openOverlay(sectionKey);
  }
}

canvas.addEventListener("pointermove", onPointerMove);
canvas.addEventListener("pointerleave", () => setHoveredSection(null));
canvas.addEventListener("click", onClick);

legendChips.forEach((chip) => {
  chip.addEventListener("click", () => promptSection(chip.dataset.section));
});

backButton.addEventListener("click", closeOverlay);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlayOpen) {
    closeOverlay();
  }
});

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const clock = new THREE.Clock();

function animate() {
  const elapsed = clock.getElapsedTime();
  controls.update();
  refreshHighlights();

  const bed = roomGroup.children.find((child) => child.userData.sectionKey === "about");
  const desk = roomGroup.children.find((child) => child.userData.sectionKey === "experience");
  const shelf = roomGroup.children.find((child) => child.userData.sectionKey === "now");
  const phone = roomGroup.children.find((child) => child.userData.sectionKey === "contact");

  if (bed) {
    bed.position.y = Math.sin(elapsed * 1.3) * 0.04;
  }
  if (desk) {
    desk.rotation.y = Math.sin(elapsed * 0.8) * 0.02;
  }
  if (shelf) {
    shelf.position.y = Math.sin(elapsed * 1.2 + 1.2) * 0.03;
  }
  if (phone) {
    phone.rotation.y = Math.sin(elapsed * 1.6) * 0.12;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

updatePanel("about");
activeSection = null;
refreshHighlights(null);
animate();
