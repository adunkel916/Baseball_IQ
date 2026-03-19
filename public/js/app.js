// ============ DATA ============
const POS = {
  HOME:{x:200,y:318}, "1B":{x:292,y:218}, "2B":{x:200,y:118}, "3B":{x:108,y:218},
  P:{x:200,y:210}, C:{x:200,y:328},
  "1Bf":{x:300,y:170}, "2Bf":{x:240,y:128}, SS:{x:158,y:128}, "3Bf":{x:100,y:170},
  LF:{x:62,y:100}, LC:{x:138,y:48}, RC:{x:262,y:48}, RF:{x:338,y:100},
  "past1B":{x:330,y:232}, "past3B":{x:70,y:232}, "pastHOME":{x:200,y:345}, "past2B":{x:200,y:95},
};

const SCENARIOS = [
  { id:1, category:"Backing Up Overthrows", situation:"Runner on 1st. Ground ball to shortstop. The throw to 1st base goes wild!", question:"You're the RIGHT FIELDER. What do you do?", runners:["1B"], yourPosition:"RF", emoji:"🏃", ballPath:[{from:"HOME",to:"SS",type:"hit"},{from:"SS",to:"past1B",type:"overthrow"}], options:[{text:"Stay in right field and watch",correct:false,feedback:"We need you closer! Always back up 1st base on throws from the infield."},{text:"Run to back up 1st base",correct:true,feedback:"YES! Right fielders always back up 1st base on infield throws. Great hustle!"},{text:"Run to cover 2nd base",correct:false,feedback:"Good thinking about 2nd, but backing up 1st base is your #1 job on this play."}]},
  { id:2, category:"Backing Up Overthrows", situation:"Runner on 2nd. Ground ball to the 3rd baseman. The 3rd baseman throws to 1st, but the throw sails past the 1st baseman!", question:"You're the RIGHT FIELDER. What do you do?", runners:["2B"], yourPosition:"RF", emoji:"⚡", ballPath:[{from:"HOME",to:"3Bf",type:"hit"},{from:"3Bf",to:"past1B",type:"overthrow"}], options:[{text:"Stay in right field and watch",correct:false,feedback:"The ball got past 1st — if nobody is there, the runner could take extra bases!"},{text:"Run to back up 1st base",correct:true,feedback:"Awesome! Right fielders always back up 1st base on overthrows from the infield."},{text:"Run to cover 2nd base",correct:false,feedback:"The throw went to 1st base, so that's where you need to back up!"}]},
  { id:3, category:"Backing Up Overthrows", situation:"Runner on 1st. Ground ball to 3rd baseman. The 3rd baseman throws to 2nd for the force, but the throw gets past the shortstop covering 2nd!", question:"You're the RIGHT CENTER FIELDER. What do you do?", runners:["1B"], yourPosition:"RC", emoji:"🎯", ballPath:[{from:"HOME",to:"3Bf",type:"hit"},{from:"3Bf",to:"past2B",type:"overthrow"}], options:[{text:"Run to back up 2nd base",correct:true,feedback:"That's it! The throw got past 2nd base and you're the closest outfielder."},{text:"Stay where you are",correct:false,feedback:"If the ball gets past everyone, the runners could advance!"},{text:"Run to back up 3rd base",correct:false,feedback:"The throw went to 2nd base, not 3rd."}]},
  { id:4, category:"Backing Up Overthrows", situation:"Runner on 2nd. Ground ball to 2nd baseman. The throw to 1st is on target, but the 1st baseman drops it!", question:"You're the RIGHT FIELDER. Where should you already be?", runners:["2B"], yourPosition:"RF", emoji:"👏", ballPath:[{from:"HOME",to:"2Bf",type:"hit"},{from:"2Bf",to:"1B",type:"throw"}], options:[{text:"Standing in right field",correct:false,feedback:"You should have been moving the moment the ball was hit!"},{text:"Behind 1st base, ready to grab the dropped ball",correct:true,feedback:"PERFECT! You were already backing up because you started running as soon as the ball was hit!"},{text:"Running toward 2nd base",correct:false,feedback:"The throw is going to 1st — that's where you need to be backing up!"}]},
  { id:5, category:"Backing Up Overthrows", situation:"Runner on 3rd. Fly ball to left field. The runner tags up and the left fielder throws home!", question:"You're the PITCHER. What's your job?", runners:["3B"], yourPosition:"P", emoji:"🛡️", ballPath:[{from:"HOME",to:"LF",type:"hit"},{from:"LF",to:"HOME",type:"throw"}], options:[{text:"Go back to the mound and get ready",correct:false,feedback:"Not yet! There's a play happening at home plate that needs backup!"},{text:"Back up home plate behind the catcher",correct:true,feedback:"Smart play! The pitcher backs up home plate on throws from the outfield."},{text:"Cover 1st base",correct:false,feedback:"Nobody is running to 1st right now — the action is at home plate!"}]},
  { id:6, category:"Base Running", situation:"You're on 2nd base. The batter hits a ground ball to the shortstop.", question:"What should you do?", runners:["2B"], yourPosition:null, emoji:"🧠", ballPath:[{from:"HOME",to:"SS",type:"hit"}], options:[{text:"Run to 3rd as fast as you can",correct:false,feedback:"Careful! The shortstop is right there and could tag you."},{text:"Stay close to 2nd and wait to see what happens",correct:true,feedback:"Smart! On a ground ball hit near you, don't run into an out!"},{text:"Run back to 1st base",correct:false,feedback:"You can't go backwards!"}]},
  { id:7, category:"Fielding Positions", situation:"Nobody on base. Ground ball hit to the 3rd baseman who throws to 1st.", question:"You're the PITCHER. Where do you go after the pitch?", runners:[], yourPosition:"P", emoji:"⚾", ballPath:[{from:"HOME",to:"3Bf",type:"hit"},{from:"3Bf",to:"1Bf",type:"throw"}], options:[{text:"Stay on the mound",correct:false,feedback:"You need to move! Pitchers have a job on every play."},{text:"Run to cover the area between home and 1st base",correct:true,feedback:"Yes! Pitchers break toward 1st base on ground balls to the right side."},{text:"Run to back up 3rd base",correct:false,feedback:"The 3rd baseman already has the ball."}]},
  { id:8, category:"Backing Up Overthrows", situation:"Runner on 1st and 2nd. The batter hits a single to right field. The right fielder throws to 3rd base!", question:"You're the LEFT FIELDER. What do you do?", runners:["1B","2B"], yourPosition:"LF", emoji:"💪", ballPath:[{from:"HOME",to:"RF",type:"hit"},{from:"RF",to:"3B",type:"throw"}], options:[{text:"Stay in left field and watch the play",correct:false,feedback:"Never just watch!"},{text:"Run to back up 3rd base",correct:true,feedback:"Heads-up play! Left fielders back up 3rd base on throws from right field."},{text:"Run to cover 2nd base",correct:false,feedback:"You need to back up where the throw is going — 3rd base!"}]},
  { id:9, category:"Backing Up Overthrows", situation:"Runners on 1st and 3rd. Ground ball to shortstop. The shortstop throws to 2nd for the force, but the throw gets past the 2nd baseman!", question:"You're the RIGHT CENTER FIELDER. What should you be doing?", runners:["1B","3B"], yourPosition:"RC", emoji:"🌟", ballPath:[{from:"HOME",to:"SS",type:"hit"},{from:"SS",to:"past2B",type:"overthrow"}], options:[{text:"Stay where you are since it's an infield play",correct:false,feedback:"The throw got past 2nd base — if nobody backs it up, runners will advance!"},{text:"Run to back up 2nd base",correct:true,feedback:"That's the play! When a throw goes to 2nd base, outfielders nearby need to back it up."},{text:"Run to back up 3rd base",correct:false,feedback:"Always back up the base where the ball is being thrown!"}]}
];

const FIELDERS = [
  {label:"P",x:200,y:210},{label:"C",x:200,y:328},{label:"1B",x:300,y:170},
  {label:"2B",x:240,y:128},{label:"SS",x:158,y:128},{label:"3B",x:100,y:170},
  {label:"LF",x:62,y:100},{label:"LC",x:138,y:48},{label:"RC",x:262,y:48},{label:"RF",x:338,y:100}
];

function buildDiamond(runners=[], yourPosition=null, ballPath=[]) {
  function rp(p) { return (typeof p==="object") ? p : (POS[p]||{x:200,y:200}); }
  let s = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">`;
  s += `<rect x="0" y="0" width="400" height="400" fill="#0d1b0d" rx="14"/>`; 
  s += `<image href="images/field.jpg" x="0" y="8" width="400" height="368" opacity="0.8"/>`;

  for (const seg of ballPath) {
    const from=rp(seg.from), to=rp(seg.to);
    let col = seg.type==="hit" ? "#ffffff" : (seg.type==="overthrow" ? "#ff4444" : "#5cd672");
    s += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${col}" stroke-width="3" stroke-dasharray="6,4" opacity="1"/>`;
  }

  for (const f of FIELDERS) {
    const isYou = yourPosition===f.label;
    if (isYou) {
      s += `<circle cx="${f.x}" cy="${f.y}" r="16" fill="none" stroke="#5cd672" stroke-width="2.5" opacity="0.8"><animate attributeName="r" values="14;18;14" dur="1.5s" repeatCount="indefinite"/></circle>`;
    }
    s += `<circle cx="${f.x}" cy="${f.y}" r="11" fill="${isYou?'#3ea853':'#444'}" stroke="${isYou?'#5cd672':'#888'}" stroke-width="1.5"/>`;
    s += `<text x="${f.x}" y="${f.y+4}" text-anchor="middle" fill="white" font-size="9" font-weight="900">${f.label}</text>`;
  }
  return s + `</svg>`;
}

// ============ AUDIO & STATE ============
const correctSound = new Audio('sounds/hit.mp3');
const wrongSound = new Audio('sounds/strike.m4a');
const walkupSongs = {
  "jackson": new Audio('sounds/jackson.m4a'), "andres": new Audio('sounds/andres.m4a'),
  "andrew": new Audio('sounds/andrew.m4a'), "caleb": new Audio('sounds/caleb.m4a'),
  "dallas": new Audio('sounds/dallas.m4a'), "dominic": new Audio('sounds/dominic.m4a'),
  "elliott": new Audio('sounds/elliott.m4a'), "gio": new Audio('sounds/gio.m4a'),
  "johnny": new Audio('sounds/johnny.m4a'), "liam": new Audio('sounds/liam.m4a'),
  "matthew": new Audio('sounds/matthew.m4a'), "weston": new Audio('sounds/weston.m4a')
};

let currentWalkup = null, questions = [], currentQ = 0, selected = null, score = 0, streak = 0, bestStreak = 0, categoryFilter = "All";

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
  
  if (currentWalkup) { currentWalkup.pause(); currentWalkup.currentTime = 0; }
  const name = $("player-name").value.trim().toLowerCase();
  if (walkupSongs[name]) { currentWalkup = walkupSongs[name]; currentWalkup.play(); }

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
  $("options-wrap").innerHTML = q.options.sort(() => Math.random() - 0.5).map((opt, i) => `<button class="option-btn" data-correct="${opt.correct}" data-feedback="${opt.feedback}">${opt.text}</button>`).join("");
  document.querySelectorAll(".option-btn").forEach(btn => btn.addEventListener("click", () => handleAnswer(btn)));
  $("feedback").classList.add("hidden");
  $("next-wrap").classList.add("hidden");
  selected = null;
}

function handleAnswer(btn) {
  if (selected !== null) return;
  selected = btn;
  if (currentWalkup) { currentWalkup.pause(); currentWalkup = null; }
  const isCorrect = btn.dataset.correct === "true";
  
  document.querySelectorAll(".option-btn").forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === "true") b.style.borderColor = "var(--green)";
  });

  if (isCorrect) {
    correctSound.play(); score++; streak++;
    if (streak > bestStreak) bestStreak = streak;
    btn.style.backgroundColor = "rgba(62,168,83,0.2)";
  } else {
    wrongSound.play(); streak = 0;
    btn.style.backgroundColor = "rgba(224,72,72,0.2)";
    btn.style.borderColor = "var(--red)";
  }

  $("feedback").classList.remove("hidden");
  $("feedback-text").textContent = (isCorrect ? "✅ " : "❌ ") + btn.dataset.feedback;
  $("next-wrap").classList.remove("hidden");
  $("next-btn").textContent = currentQ+1 >= questions.length ? "RESULTS" : "NEXT →";
}

function showResults() {
  showScreen("results-screen");
  const pct = Math.round((score / questions.length) * 100);
  $("results-grade").textContent = pct >= 80 ? "ALL-STAR! ⭐" : "GOOD GAME! ⚾";
  $("stat-score").textContent = `${score}/${questions.length}`;
  $("stat-pct").textContent = `${pct}%`;
  $("stat-streak").textContent = `🔥 ${bestStreak}`;
}

function showScreen(id) {
  ["menu-screen","play-screen","results-screen"].forEach(s => $(s).classList.toggle("hidden", s !== id));
}

$("start-btn").addEventListener("click", startGame);
$("next-btn").addEventListener("click", () => currentQ+1 >= questions.length ? showResults() : (currentQ++, renderQuestion()));
$("play-again-btn").addEventListener("click", startGame);
$("main-menu-btn").addEventListener("click", () => { showScreen("menu-screen"); initMenu(); });
$("quit-btn").addEventListener("click", () => { showScreen("menu-screen"); initMenu(); });

initMenu();
