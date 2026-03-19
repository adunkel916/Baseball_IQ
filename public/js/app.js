// ============ DATA ============
const POS = {
  HOME:{x:200,y:330}, "1B":{x:300,y:230}, "2B":{x:200,y:130}, "3B":{x:100,y:230},
  P:{x:200,y:220}, C:{x:200,y:345},
  "1Bf":{x:310,y:180}, "2Bf":{x:250,y:135}, SS:{x:150,y:135}, "3Bf":{x:90,y:180},
  LF:{x:60,y:100}, LC:{x:140,y:50}, RC:{x:260,y:50}, RF:{x:340,y:100},
  "past1B":{x:350,y:230}, "past3B":{x:50,y:230}, "pastHOME":{x:200,y:370}, "past2B":{x:200,y:90},
};

const SCENARIOS = [
  { id:1, category:"Backing Up Overthrows", situation:"Runner on 1st. Ground ball to shortstop. The throw to 1st base goes wild!", question:"You're the RIGHT FIELDER. What do you do?", runners:["1B"], yourPosition:"RF", emoji:"🏃", ballPath:[{from:"HOME",to:"SS",type:"hit"},{from:"SS",to:"past1B",type:"overthrow"}], options:[{text:"Stay in right field and watch",correct:false,feedback:"We need you closer! Always back up 1st base."},{text:"Run to back up 1st base",correct:true,feedback:"YES! Right fielders always back up 1st base on infield throws."},{text:"Run to cover 2nd base",correct:false,feedback:"Backing up 1st base is your #1 job here."}]},
  { id:2, category:"Backing Up Overthrows", situation:"Runner on 2nd. Ground ball to the 3rd baseman. The 3rd baseman throws to 1st, but the throw sails past the 1st baseman!", question:"You're the RIGHT FIELDER. What do you do?", runners:["2B"], yourPosition:"RF", emoji:"⚡", ballPath:[{from:"HOME",to:"3Bf",type:"hit"},{from:"3Bf",to:"past1B",type:"overthrow"}], options:[{text:"Stay in right field and watch",correct:false,feedback:"If nobody is there, the runner could take extra bases!"},{text:"Run to back up 1st base",correct:true,feedback:"Awesome! Right fielders always back up 1st base on infield overthrows."},{text:"Run to cover 2nd base",correct:false,feedback:"The throw went to 1st base!"}]},
  { id:3, category:"Backing Up Overthrows", situation:"Runner on 1st. Ground ball to 3rd baseman. The throw to 2nd for the force goes wild and gets past the shortstop!", question:"You're the RIGHT CENTER FIELDER. What do you do?", runners:["1B"], yourPosition:"RC", emoji:"🎯", ballPath:[{from:"HOME",to:"3Bf",type:"hit"},{from:"3Bf",to:"past2B",type:"overthrow"}], options:[{text:"Run to back up 2nd base",correct:true,feedback:"That's it! You're the closest outfielder. Stop those extra bases!"},{text:"Stay where you are",correct:false,feedback:"Always hustle in to back up the play!"},{text:"Run to back up 3rd base",correct:false,feedback:"The throw went to 2nd base!"}]},
  { id:4, category:"Backing Up Overthrows", situation:"Runner on 2nd. Ground ball to 2nd baseman. The throw to 1st is on target, but the 1st baseman drops it!", question:"You're the RIGHT FIELDER. Where should you already be?", runners:["2B"], yourPosition:"RF", emoji:"👏", ballPath:[{from:"HOME",to:"2Bf",type:"hit"},{from:"2Bf",to:"1B",type:"throw"}], options:[{text:"Standing in right field",correct:false,feedback:"You should have been moving as soon as the ball was hit!"},{text:"Behind 1st base, ready to grab the ball",correct:true,feedback:"PERFECT! You were already backing up. Great hustle!"},{text:"Running toward 2nd base",correct:false,feedback:"The throw is going to 1st!"}]},
  { id:5, category:"Backing Up Overthrows", situation:"Runner on 3rd. Fly ball to left field. The runner tags up and the left fielder throws home!", question:"You're the PITCHER. What's your job?", runners:["3B"], yourPosition:"P", emoji:"🛡️", ballPath:[{from:"HOME",to:"LF",type:"hit"},{from:"LF",to:"HOME",type:"throw"}], options:[{text:"Go back to the mound",correct:false,feedback:"Not yet! There's a play at home!"},{text:"Back up home plate behind the catcher",correct:true,feedback:"Smart! You're the last line of defense if the ball gets past the catcher."},{text:"Cover 1st base",correct:false,feedback:"The action is at home plate!"}]},
  { id:6, category:"Base Running", situation:"You're on 2nd base. The batter hits a ground ball to the shortstop.", question:"What should you do?", runners:["2B"], yourPosition:null, emoji:"🧠", ballPath:[{from:"HOME",to:"SS",type:"hit"}], options:[{text:"Run to 3rd as fast as you can",correct:false,feedback:"Careful! The shortstop is right there."},{text:"Stay close to 2nd and wait",correct:true,feedback:"Smart! Don't run into an out on a ball hit near you."},{text:"Run back to 1st base",correct:false,feedback:"No going backwards!"}]},
  { id:7, category:"Fielding Positions", situation:"Nobody on base. Ground ball hit to the 3rd baseman who throws to 1st.", question:"You're the PITCHER. Where do you go after the pitch?", runners:[], yourPosition:"P", emoji:"⚾", ballPath:[{from:"HOME",to:"3Bf",type:"hit"},{from:"3Bf",to:"1Bf",type:"throw"}], options:[{text:"Stay on the mound",correct:false,feedback:"Pitchers have a job on every play!"},{text:"Run to cover the area toward 1st base",correct:true,feedback:"Yes! Always be moving toward the play."},{text:"Run to back up 3rd base",correct:false,feedback:"The 3rd baseman already has the ball."}]}
];

const FIELDERS = [
  {label:"P",x:200,y:220},{label:"C",x:200,y:345},{label:"1B",x:300,y:230},
  {label:"2B",x:240,y:140},{label:"SS",x:160,y:140},{label:"3B",x:100,y:230},
  {label:"LF",x:60,y:110},{label:"LC",x:140,y:60},{label:"RC",x:260,y:60},{label:"RF",x:340,y:110}
];

function buildDiamond(runners=[], yourPosition=null, ballPath=[]) {
  function rp(p) { return (typeof p==="object") ? p : (POS[p]||{x:200,y:200}); }
  let s = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="background:#0d1b0d">`;
  
  // VECTOR FIELD: Grass
  s += `<circle cx="200" cy="200" r="180" fill="#1a4d26" />`;
  // VECTOR FIELD: Dirt Infield
  s += `<rect x="100" y="100" width="200" height="200" fill="#6d4c41" transform="rotate(45 200 200)" />`;
  // VECTOR FIELD: Grass Infield
  s += `<rect x="135" y="135" width="130" height="130" fill="#1a4d26" transform="rotate(45 200 200)" />`;
  // Foul Lines
  s += `<line x1="200" y1="330" x2="350" y2="180" stroke="white" stroke-width="2" />`;
  s += `<line x1="200" y1="330" x2="50" y2="180" stroke="white" stroke-width="2" />`;

  // Ball Paths
  for (const seg of (ballPath || [])) {
    const from=rp(seg.from), to=rp(seg.to);
    let col = seg.type==="hit" ? "#ffffff" : (seg.type==="overthrow" ? "#ff4444" : "#5cd672");
    s += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${col}" stroke-width="4" stroke-dasharray="6,4" />`;
    if (seg === ballPath[ballPath.length-1]) {
        s += `<circle cx="${to.x}" cy="${to.y}" r="6" fill="white" stroke="black" stroke-width="1" />`;
    }
  }

  // Bases
  const baseCoords = [{x:200,y:330},{x:300,y:230},{x:200,y:130},{x:100,y:230}];
  baseCoords.forEach(b => s += `<rect x="${b.x-6}" y="${b.y-6}" width="12" height="12" fill="white" transform="rotate(45 ${b.x} ${b.y})" />`);

  // Runners
  runners.forEach(r => {
    const p = POS[r];
    if (p) s += `<circle cx="${p.x}" cy="${p.y-15}" r="10" fill="#ff4444" stroke="white" stroke-width="2"><animate attributeName="r" values="9;11;9" dur="1s" repeatCount="indefinite"/></circle>`;
  });

  // Fielders
  for (const f of FIELDERS) {
    const isYou = yourPosition===f.label;
    if (isYou) s += `<circle cx="${f.x}" cy="${f.y}" r="18" fill="none" stroke="#5cd672" stroke-width="3" opacity="0.6"><animate attributeName="r" values="16;20;16" dur="1.5s" repeatCount="indefinite"/></circle>`;
    s += `<circle cx="${f.x}" cy="${f.y}" r="12" fill="${isYou?'#3ea853':'#444'}" stroke="white" stroke-width="1.5"/>`;
    s += `<text x="${f.x}" y="${f.y+4}" text-anchor="middle" fill="white" font-size="10" font-weight="900" font-family="sans-serif">${f.label}</text>`;
  }
  return s + `</svg>`;
}

// ============ ENGINE ============
const correctSound = new Audio('sounds/hit.mp3');
const wrongSound = new Audio('sounds/strike.m4a');
const walkupSongs = { "jackson": new Audio('sounds/jackson.m4a') };

let questions = [], currentQ = 0, score = 0, streak = 0, bestStreak = 0, categoryFilter = "All", selected = null;
const $ = (id) => document.getElementById(id);

function initMenu() {
  $("menu-diamond").innerHTML = buildDiamond([], null);
  const cats = ["All", ...new Set(SCENARIOS.map(s => s.category))];
  $("category-buttons").innerHTML = cats.map(c => `<button class="cat-btn${categoryFilter===c?' active':''}" data-cat="${c}">${c}</button>`).join("");
  document.querySelectorAll(".cat-btn").forEach(btn => btn.addEventListener("click", () => {
    categoryFilter = btn.dataset.cat;
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }));
}

function startGame() {
  const filtered = categoryFilter==="All" ? SCENARIOS : SCENARIOS.filter(s => s.category===categoryFilter);
  questions = filtered.sort(() => Math.random() - 0.5);
  currentQ = 0; score = 0; streak = 0; bestStreak = 0;
  const name = $("player-name").value.trim().toLowerCase();
  if (walkupSongs[name]) walkupSongs[name].play();
  showScreen("play-screen");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQ];
  $("q-counter").textContent = `Q ${currentQ+1} / ${questions.length}`;
  $("score-display").textContent = `✓ ${score}`;
  $("progress-fill").style.width = `${(currentQ / questions.length) * 100}%`;
  $("cat-badge").textContent = q.category.toUpperCase();
  $("play-diamond").innerHTML = buildDiamond(q.runners, q.yourPosition, q.ballPath);
  $("situation-text").textContent = q.situation;
  $("question-text").textContent = q.question;
  $("options-wrap").innerHTML = q.options.sort(() => Math.random() - 0.5).map(opt => `<button class="option-btn" data-correct="${opt.correct}" data-feedback="${opt.feedback}">${opt.text}</button>`).join("");
  document.querySelectorAll(".option-btn").forEach(btn => btn.addEventListener("click", () => handleAnswer(btn)));
  $("feedback").classList.add("hidden");
  $("next-wrap").classList.add("hidden");
  selected = null;
}

function handleAnswer(btn) {
  if (selected) return;
  selected = btn;
  const isCorrect = btn.dataset.correct === "true";
  document.querySelectorAll(".option-btn").forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === "true") b.style.borderColor = "var(--green)";
  });
  if (isCorrect) { correctSound.play(); score++; streak++; } 
  else { wrongSound.play(); streak = 0; btn.style.borderColor = "var(--red)"; }
  $("feedback").classList.remove("hidden");
  $("feedback-text").textContent = (isCorrect ? "✅ " : "❌ ") + btn.dataset.feedback;
  $("next-wrap").classList.remove("hidden");
  $("next-btn").textContent = currentQ+1 >= questions.length ? "RESULTS" : "NEXT →";
}

function showScreen(id) { ["menu-screen","play-screen","results-screen"].forEach(s => $(s).classList.toggle("hidden", s !== id)); }

$("start-btn").addEventListener("click", startGame);
$("next-btn").addEventListener("click", () => currentQ+1 >= questions.length ? showResults() : (currentQ++, renderQuestion()));
$("quit-btn").addEventListener("click", () => { showScreen("menu-screen"); initMenu(); });
initMenu();
