// ============ DATA ============
const POS = {
  HOME:{x:200,y:330}, "1B":{x:300,y:230}, "2B":{x:200,y:130}, "3B":{x:100,y:230},
  P:{x:200,y:220}, C:{x:200,y:345},
  "1Bf":{x:310,y:180}, "2Bf":{x:250,y:135}, SS:{x:150,y:135}, "3Bf":{x:90,y:180},
  LF:{x:60,y:110}, LC:{x:140,y:60}, RC:{x:260,y:60}, RF:{x:340,y:110},
  "past1B":{x:350,y:230}, "past3B":{x:50,y:230}, "pastHOME":{x:200,y:370}, "past2B":{x:200,y:90},
};

const FIELDERS = [
  {label:"P", x:200, y:220},
  {label:"C", x:200, y:345},
  {label:"1B", x:310, y:180},
  {label:"2B", x:250, y:135},
  {label:"SS", x:150, y:135},
  {label:"3B", x:90, y:180},
  {label:"LF", x:60, y:110},
  {label:"LC", x:140, y:60},
  {label:"RC", x:260, y:60},
  {label:"RF", x:340, y:110},
];

const SCENARIOS = [
  {
    id:1, category:"Backing Up Overthrows",
    situation:"Runner on 2nd. Ground ball to shortstop. The shortstop looks the runner back and throws to 1st, but the throw goes wild!",
    question:"You're the RIGHT FIELDER. What do you do?",
    runners:["2B"], yourPosition:"RF", emoji:"🏃",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"past1B", type:"overthrow"}],
    options:[
      {text:"Stay in right field and watch", correct:false, feedback:"We need you closer! Always back up 1st base on throws from the infield."},
      {text:"Run to back up 1st base", correct:true, feedback:"YES! Right fielders always back up 1st base on infield throws. Great hustle!"},
      {text:"Run to cover 2nd base", correct:false, feedback:"Backing up 1st base is your #1 job on this play."}
    ],
  },
  {
    id:2, category:"Backing Up Overthrows",
    situation:"Runner on 2nd. Ground ball to the 3rd baseman. The 3rd baseman throws to 1st, but the throw sails past the 1st baseman!",
    question:"You're the RIGHT FIELDER. What do you do?",
    runners:["2B"], yourPosition:"RF", emoji:"⚡",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"past1B", type:"overthrow"}],
    options:[
      {text:"Stay in right field and watch", correct:false, feedback:"The ball got past 1st base. If nobody is there, the runner could take extra bases!"},
      {text:"Run to back up 1st base", correct:true, feedback:"Awesome! Right fielders always back up 1st base on overthrows from the infield."},
      {text:"Run to cover 2nd base", correct:false, feedback:"The throw went to 1st base, so that is where you need to back up!"}
    ],
  },
  {
    id:3, category:"Backing Up Overthrows",
    situation:"Runner on 1st. Ground ball to 3rd baseman. The 3rd baseman throws to 2nd for the force, but the throw gets past the shortstop covering 2nd!",
    question:"You're the RIGHT CENTER FIELDER. What do you do?",
    runners:["1B"], yourPosition:"RC", emoji:"🎯",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"past2B", type:"overthrow"}],
    options:[
      {text:"Run to back up 2nd base", correct:true, feedback:"That is it! The throw got past 2nd base and you're the closest outfielder."},
      {text:"Stay where you are", correct:false, feedback:"If the ball gets past everyone, the runners could advance! Always hustle in!"},
      {text:"Run to back up 3rd base", correct:false, feedback:"The throw went to 2nd base, not 3rd."}
    ],
  },
  {
    id:4, category:"Backing Up Overthrows",
    situation:"Runner on 2nd. Ground ball to 2nd baseman. The throw to 1st is on target, but the 1st baseman drops it!",
    question:"You're the RIGHT FIELDER. Where should you already be?",
    runners:["2B"], yourPosition:"RF", emoji:"👏",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}, {from:"2Bf", to:"1B", type:"throw"}],
    options:[
      {text:"Standing in right field", correct:false, feedback:"You should have been moving the moment the ball was hit!"},
      {text:"Behind 1st base, ready to grab the dropped ball", correct:true, feedback:"PERFECT! You were already backing up because you started running as soon as the ball was hit!"},
      {text:"Running toward 2nd base", correct:false, feedback:"The throw is going to 1st base. That is where you need to be backing up!"}
    ],
  },
  {
    id:5, category:"Backing Up Overthrows",
    situation:"Runner on 3rd. Fly ball to left field. The runner tags up and the left fielder throws home!",
    question:"You're the PITCHER. What's your job?",
    runners:["3B"], yourPosition:"P", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}, {from:"LF", to:"HOME", type:"throw"}],
    options:[
      {text:"Go back to the mound", correct:false, feedback:"Not yet! There's a play happening at home plate that needs backup!"},
      {text:"Back up home plate behind the catcher", correct:true, feedback:"Smart play! If the ball gets past the catcher, you're the last line of defense!"},
      {text:"Cover 1st base", correct:false, feedback:"Nobody is running to 1st right now!"}
    ],
  },
  {
    id:6, category:"Base Running",
    situation:"You're on 2nd base. The batter hits a ground ball to the shortstop.",
    question:"What should you do?",
    runners:["2B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Run to 3rd as fast as you can", correct:false, feedback:"Careful! The shortstop is right there and could tag you easily."},
      {text:"Stay close to 2nd and wait to see what happens", correct:true, feedback:"Smart! On a ground ball hit near you, read the play and don't run into an out!"},
      {text:"Run back to 1st base", correct:false, feedback:"You can't go backwards to a base you already passed!"}
    ],
  },
  {
    id:7, category:"Fielding Positions",
    situation:"Nobody on base. Ground ball hit to the 3rd baseman who throws to 1st.",
    question:"You're the PITCHER. Where do you go after the pitch?",
    runners:[], yourPosition:"P", emoji:"⚾",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"1Bf", type:"throw"}],
    options:[
      {text:"Stay on the mound", correct:false, feedback:"You need to move! Pitchers have a job on every play."},
      {text:"Run to cover the area toward 1st base", correct:true, feedback:"Yes! Pitchers break toward 1st base on ground balls to the right side."},
      {text:"Run to back up 3rd base", correct:false, feedback:"The 3rd baseman already has the ball."}
    ],
  },
  {
    id:8, category:"Backing Up Overthrows",
    situation:"Runner on 1st and 2nd. The batter hits a single to right field. The right fielder throws to 3rd base!",
    question:"You're the LEFT FIELDER. What do you do?",
    runners:["1B","2B"], yourPosition:"LF", emoji:"💪",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}, {from:"RF", to:"3B", type:"throw"}],
    options:[
      {text:"Stay in left field and watch", correct:false, feedback:"Never just watch! If that throw gets past 3rd, someone needs to be there!"},
      {text:"Run to back up 3rd base", correct:true, feedback:"Heads-up play! Left fielders back up 3rd base on throws from right field."},
      {text:"Run to cover 2nd base", correct:false, feedback:"You need to back up where the throw is going. It is at 3rd base!"}
    ],
  },
  {
    id:9, category:"Backing Up Overthrows",
    situation:"Runners on 1st and 3rd. Ground ball to shortstop. The shortstop throws to 2nd for the force, but the throw gets past the 2nd baseman!",
    question:"You're the RIGHT CENTER FIELDER. What should you be doing?",
    runners:["1B","3B"], yourPosition:"RC", emoji:"🌟",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"past2B", type:"overthrow"}],
    options:[
      {text:"Stay where you are", correct:false, feedback:"The throw got past 2nd base. If nobody backs it up, runners will advance!"},
      {text:"Run to back up 2nd base", correct:true, feedback:"That is the play! When a throw goes to 2nd base, outfielders nearby need to back it up."},
      {text:"Run to back up 3rd base", correct:false, feedback:"The throw went to 2nd base, not 3rd."}
    ],
  },
  {
    id:10, category:"Game Smarts",
    situation:"There's a pop fly hit high in the air between you and another fielder.",
    question:"What's the MOST important thing to do?",
    runners:[], yourPosition:null, emoji:"📢",
    ballPath:[{from:"HOME", to:{x:200,y:160}, type:"hit"}],
    options:[
      {text:"Just let the other person get it", correct:false, feedback:"What if they think the same thing? Someone needs to call it!"},
      {text:"Yell 'BALL! BALL! BALL!' loud and clear", correct:true, feedback:"YES! Communication wins games! Yell 'BALL!' so everyone knows you've got it."},
      {text:"Both try to catch it at the same time", correct:false, feedback:"That is how collisions happen!"}
    ],
  },
  {
    id:11, category:"Base Running",
    situation:"You're on 1st base. The batter hits a ground ball to the 2nd baseman.",
    question:"What should you do?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}],
    options:[
      {text:"Stay on 1st base", correct:false, feedback:"You have to run! It is a force play. You MUST run to 2nd!"},
      {text:"Run to 2nd base because it's a force play", correct:true, feedback:"That is right! With a runner on 1st, you're FORCED to run to 2nd when the ball is hit on the ground."},
      {text:"Run back toward home plate", correct:false, feedback:"You can't run backwards!"}
    ],
  },
  {
    id:12, category:"Base Running",
    situation:"You're on 2nd base with no outs. The batter hits a fly ball to right field.",
    question:"What should you do?",
    runners:["2B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Run to 3rd right away", correct:false, feedback:"If the fielder catches it, you could be doubled off! Wait to see if it's caught."},
      {text:"Go halfway between 2nd and 3rd and watch", correct:true, feedback:"Smart! Go halfway so you can tag up if it's caught, or run if it drops!"},
      {text:"Stay on 2nd base no matter what", correct:false, feedback:"You want to be ready to advance if the ball drops!"}
    ],
  },
  {
    id:13, category:"Base Running",
    situation:"You're on 3rd base with less than 2 outs. A fly ball is hit deep to left field.",
    question:"What should you do?",
    runners:["3B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Run home right away", correct:false, feedback:"If the fielder catches it, you'll be doubled off! You need to wait on the base."},
      {text:"Go back to 3rd base and get ready to tag up", correct:true, feedback:"Yes! Touch 3rd base and as soon as the fielder catches it, run home!"},
      {text:"Stay halfway between 3rd and home", correct:false, feedback:"On a deep fly, tag up at 3rd so you can score after the catch!"}
    ],
  },
  {
    id:14, category:"Base Running",
    situation:"You're on 1st base. The batter hits a fly ball to the left fielder who catches it.",
    question:"What do you do?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Keep running to 2nd base", correct:false, feedback:"The ball was caught. That is an out! Get back to 1st base!"},
      {text:"Get back to 1st base as fast as you can", correct:true, feedback:"Correct! When a fly ball is caught, you need to get back to your base before the ball gets there."},
      {text:"Run to the dugout", correct:false, feedback:"Only the batter is out! You're still a runner. Get back to 1st!"}
    ],
  },
  {
    id:15, category:"Backing Up Overthrows",
    situation:"Nobody on base. Ground ball to shortstop. The throw to 1st goes wild!",
    question:"You're the RIGHT FIELDER. What do you do?",
    runners:[], yourPosition:"RF", emoji:"🏃",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"past1B", type:"overthrow"}],
    options:[
      {text:"Stay in right field and watch", correct:false, feedback:"The ball got past 1st base! If nobody backs it up, the batter takes extra bases!"},
      {text:"Run to back up 1st base", correct:true, feedback:"Great hustle! Right fielders ALWAYS back up 1st base on infield throws."},
      {text:"Run to cover 2nd base", correct:false, feedback:"First, back up 1st base where the throw is going!"}
    ],
  },
  {
    id:16, category:"Backing Up Overthrows",
    situation:"Runner on 1st. Ground ball to 2nd baseman. The flip to 2nd goes wide!",
    question:"You're the LEFT CENTER FIELDER. What do you do?",
    runners:["1B"], yourPosition:"LC", emoji:"⚡",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}, {from:"2Bf", to:"past2B", type:"overthrow"}],
    options:[
      {text:"Stay where you are", correct:false, feedback:"The ball got past 2nd base! If nobody is there, the runner could score!"},
      {text:"Run to back up 2nd base", correct:true, feedback:"Perfect! The flip went toward your side. Back up 2nd to stop runners from advancing!"},
      {text:"Run to back up 1st base", correct:false, feedback:"The ball went past 2nd base, not 1st!"}
    ],
  },
  {
    id:17, category:"Game Smarts",
    situation:"You catch a ground ball in the infield with a runner on 1st and 1 out.",
    question:"Where should you throw the ball?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Throw to 2nd base for the force out", correct:true, feedback:"That is right! Get the lead runner. A quick toss to 2nd base is the priority!"},
      {text:"Throw to 1st base", correct:false, feedback:"You could get the out at 1st, but getting the lead runner at 2nd is smarter!"},
      {text:"Hold onto the ball", correct:false, feedback:"You need to make a throw! Get the lead runner at 2nd!"}
    ],
  },
  {
    id:18, category:"Game Smarts",
    situation:"You're playing RC field. A base hit goes between you and the right fielder.",
    question:"Who should field the ball?",
    runners:[], yourPosition:"RC", emoji:"📢",
    ballPath:[{from:"HOME", to:{x:300,y:90}, type:"hit"}],
    options:[
      {text:"Let the right fielder get it", correct:false, feedback:"Don't assume! Both need to go after it, and whoever is closest calls for it!"},
      {text:"Both go after it and the closest one yells 'BALL!'", correct:true, feedback:"That is it! The one who gets there first calls 'BALL!' and the other backs them up."},
      {text:"Stop and wait", correct:false, feedback:"Never stop! Every second matters!"}
    ],
  },
  {
    id:19, category:"Base Running",
    situation:"You're on 1st base. The batter hits a ground ball right at the 1st baseman.",
    question:"What should you do?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"1Bf", type:"hit"}],
    options:[
      {text:"Stay on 1st base", correct:false, feedback:"You can't stay! It is a force play. Run to 2nd!"},
      {text:"Run hard to 2nd base", correct:true, feedback:"Correct! You're forced to run on a ground ball. Run hard to 2nd!"},
      {text:"Run back toward home plate", correct:false, feedback:"You can never run backwards!"}
    ],
  },
  {
    id:20, category:"Base Running",
    situation:"You're on 2nd base. The batter hits a single into right field.",
    question:"What should you do?",
    runners:["2B"], yourPosition:null, emoji:"🏃",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Stay on 2nd base", correct:false, feedback:"On a base hit, you should be running! A single to RF means you can probably score!"},
      {text:"Run to 3rd and look at your coach", correct:true, feedback:"Yes! Run hard and look at your 3rd base coach. Listen to your coaches!"},
      {text:"Run straight home without looking", correct:false, feedback:"Don't put your head down! Look at your coach. They can see the ball!"}
    ],
  },
  {
    id:21, category:"Base Running",
    situation:"You just hit the ball into the outfield. You're running to 1st base.",
    question:"Should you run straight to 1st base or round it?",
    runners:[], yourPosition:null, emoji:"🏃",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Run straight to 1st and stop", correct:false, feedback:"If the ball is in the outfield, you might be able to get to 2nd!"},
      {text:"Round 1st base and look to see if you can go to 2nd", correct:true, feedback:"That is it! Round 1st and look at your coach and the ball. Go if you can!"},
      {text:"Run past 1st base into right field", correct:false, feedback:"Round the base toward 2nd, not away from it!"}
    ],
  },
  {
    id:22, category:"Base Running",
    situation:"You hit a ground ball to the infield. You're running to 1st base.",
    question:"How should you run through 1st base?",
    runners:[], yourPosition:null, emoji:"🏃",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Slow down before the bag", correct:false, feedback:"Never slow down! Run full speed all the way through!"},
      {text:"Run full speed straight through the bag", correct:true, feedback:"Yes! Sprint straight through 1st base and don't slow down!"},
      {text:"Slide into 1st base", correct:false, feedback:"Don't slide into 1st! It actually slows you down."}
    ],
  },
  {
    id:23, category:"Fielding Positions",
    situation:"You're the pitcher. The batter hits a ground ball to the 1st baseman.",
    question:"Where do you go?",
    runners:[], yourPosition:"P", emoji:"⚾",
    ballPath:[{from:"HOME", to:"1Bf", type:"hit"}],
    options:[
      {text:"Stay on the mound", correct:false, feedback:"The 1st baseman has to field the ball! Someone needs to cover the bag!"},
      {text:"Run to cover 1st base", correct:true, feedback:"That is right! When the 1st baseman fields the ball, the pitcher MUST cover the bag!"},
      {text:"Run home", correct:false, feedback:"No play at home right now. Cover 1st!"}
    ],
  },
  {
    id:24, category:"Fielding Positions",
    situation:"Runner on 1st. Ground ball to the shortstop who throws to 2nd.",
    question:"You're the 2ND BASEMAN. What's your job?",
    runners:["1B"], yourPosition:"2B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"2B", type:"throw"}],
    options:[
      {text:"Stay at your position", correct:false, feedback:"The throw is going to 2nd base! Someone needs to catch it!"},
      {text:"Run to cover 2nd base to receive the throw", correct:true, feedback:"Exactly! On a ground ball to the SS, the 2nd baseman covers the bag for the force!"},
      {text:"Run to back up 1st base", correct:false, feedback:"The SS is throwing to 2nd, not 1st!"}
    ],
  },
  {
    id:25, category:"Fielding Positions",
    situation:"Runner on 2nd. The batter hits a single to left field.",
    question:"You're the SHORTSTOP. Where should you be?",
    runners:["2B"], yourPosition:"SS", emoji:"⚾",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Run out to help the left fielder", correct:false, feedback:"The LF has the ball. You need to be in position for a relay!"},
      {text:"Go to the cutoff position", correct:true, feedback:"Great instinct! Line up between the LF and home plate so you can relay the throw!"},
      {text:"Cover 2nd base", correct:false, feedback:"The runner already left 2nd. Get in the cutoff position!"}
    ],
  },
  {
    id:26, category:"Fielding Positions",
    situation:"Nobody on base. The batter hits a fly ball to left center field.",
    question:"You're the SHORTSTOP. What should you do?",
    runners:[], yourPosition:"SS", emoji:"⚾",
    ballPath:[{from:"HOME", to:"LC", type:"hit"}],
    options:[
      {text:"Go out as the relay", correct:true, feedback:"Yes! Go out as the relay to help the outfielder if the ball drops!"},
      {text:"Stay at your position", correct:false, feedback:"Don't stand still! Go out toward the ball to help!"},
      {text:"Cover 2nd base", correct:false, feedback:"With nobody on base, getting in relay position is more important!"}
    ],
  },
  {
    id:27, category:"Game Smarts",
    situation:"There are 2 outs and a runner on 3rd. A ground ball is hit to you at shortstop.",
    question:"Where do you throw?",
    runners:["3B"], yourPosition:"SS", emoji:"🧠",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Throw home", correct:false, feedback:"With 2 outs, just get the batter out at 1st! That ends the inning!"},
      {text:"Throw to 1st base for the 3rd out", correct:true, feedback:"Smart! The easiest play is to get the batter at 1st. Inning over!"},
      {text:"Throw to 3rd base", correct:false, feedback:"The runner already left 3rd! Throw to 1st!"}
    ],
  },
  {
    id:28, category:"Game Smarts",
    situation:"A ground ball is hit right at you and takes a bad hop.",
    question:"What's the MOST important thing to do?",
    runners:[], yourPosition:null, emoji:"🛡️",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Turn your head away", correct:false, feedback:"If you turn away, you lose the ball! Keep your eyes on it!"},
      {text:"Block the ball with your body", correct:true, feedback:"That is right! Knock it down and keep it in front of you so you can make the throw!"},
      {text:"Jump out of the way", correct:false, feedback:"Be tough. Block it and keep it in front!"}
    ],
  },
  {
    id:29, category:"Game Smarts",
    situation:"You field a ground ball base hit in the outfield with a runner on 1st.",
    question:"What do you do with the ball?",
    runners:["1B"], yourPosition:"LF", emoji:"🧠",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Throw it to home plate", correct:false, feedback:"The runner from 1st is going to 2nd or 3rd. Throw to the cutoff!"},
      {text:"Hit the cutoff man with a quick throw", correct:true, feedback:"Yes! Get the ball to your cutoff fast so they can relay it to the right base!"},
      {text:"Hold the ball", correct:false, feedback:"Running it in takes too long! Hit the cutoff!"}
    ],
  },
  {
    id:30, category:"Game Smarts",
    situation:"Runner on 1st. No leading off at 8U.",
    question:"Where should you stand at 1st base before the pitch?",
    runners:["1B"], yourPosition:"1B", emoji:"🧠",
    ballPath:[],
    options:[
      {text:"Stand right on the bag", correct:false, feedback:"You don't need to hold runners on! Be ready for a ground ball!"},
      {text:"Stand in your normal fielding position", correct:true, feedback:"That is right! Be in your spot and ready to make a play on the ball!"},
      {text:"Stand behind the runner", correct:false, feedback:"Get in your fielding position!"}
    ],
  },
  {
    id:31, category:"Fielding Positions",
    situation:"Ball hit to RF with runners on base.",
    question:"You're the 2ND BASEMAN. Where should you go?",
    runners:["1B"], yourPosition:"2B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Stay at your position", correct:false, feedback:"When the ball is hit to the outfield, you need to get in cutoff position!"},
      {text:"Go to the cutoff position between RF and the infield", correct:true, feedback:"Yes! The 2nd baseman is the cutoff for throws from right field!"},
      {text:"Cover 1st base", correct:false, feedback:"The 1st baseman covers 1st. You are the cutoff!"}
    ],
  },
  {
    id: 32, category: "Infield Backups",
    situation: "Nobody on base. Ground ball to the shortstop.",
    question: "You're the CATCHER. What is your job?",
    runners: [], yourPosition: "C", emoji: "🛡️",
    ballPath: [{ from: "HOME", to: "SS", type: "hit" }, { from: "SS", to: "1B", type: "throw" }],
    options: [
      { text: "Stay at home plate and watch", correct: false, feedback: "Don't just watch! If the throw is wild, the runner gets 2nd base for free." },
      { text: "Run down the line to back up 1st base", correct: true, feedback: "PERFECT! Always trail the runner to 1st on infield grounders. You are the safety net!" },
      { text: "Run to the mound", correct: false, feedback: "The play is at 1st base. Get down there to help your teammate!" }
    ],
  },
  {
    id: 33, category: "Infield Backups",
    situation: "Nobody on base. Single hit into left field.",
    question: "You're the PITCHER. Where do you go to back up 2nd base?",
    runners: [], yourPosition: "P", emoji: "⚾",
    ballPath: [{ from: "HOME", to: "LF", type: "hit" }, { from: "LF", to: "2B", type: "throw" }],
    options: [
      { text: "Stay on the pitcher's mound", correct: false, feedback: "Never stand still! If the throw from left field is wild, the batter will take 2nd base." },
      { text: "Run to a spot well behind 2nd base", correct: true, feedback: "Smart! Line yourself up with the throw from LF to 2B so you can catch any overthrows." },
      { text: "Run to 1st base", correct: false, feedback: "The runner is going to 2nd. You need to back up the base where the play is happening!" }
    ],
  },
  {
    id: 34, category: "Infield Backups",
    situation: "Runner on 1st base. Single hit into left field.",
    question: "You're the PITCHER. What base should you be backing up?",
    runners: ["1B"], yourPosition: "P", emoji: "🏃",
    ballPath: [{ from: "HOME", to: "LF", type: "hit" }, { from: "LF", to: "3B", type: "throw" }],
    options: [
      { text: "Back up 2nd base", correct: false, feedback: "The runner from 1st is headed to 3rd. That is where the big play is!" },
      { text: "Back up 3rd base in foul territory", correct: true, feedback: "YES! Get deep into foul territory behind 3rd. You're the only one who can stop a run if the throw is wild!" },
      { text: "Stay on the mound", correct: false, feedback: "Move! You are the most important backup player on the field right now." }
    ],
  },
  {
    id: 35, category: "Infield Backups",
    situation: "Nobody on base. Ground ball to the 2nd baseman who throws to 1st.",
    question: "You're the CATCHER. What should you do?",
    runners: [], yourPosition: "C", emoji: "🛡️",
    ballPath: [{ from: "HOME", to: "2Bf", type: "hit" }, { from: "2Bf", to: "1B", type: "throw" }],
    options: [
      { text: "Stay behind home plate", correct: false, feedback: "Don't just stand there! The throw could get past the 1st baseman!" },
      { text: "Trail the batter-runner down toward 1st base", correct: true, feedback: "That is right! Catchers trail every ground ball play to 1st. You are the last line of defense!" },
      { text: "Run to cover 3rd base", correct: false, feedback: "Nobody is heading to 3rd. The play is at 1st base!" }
    ],
  },
  {
    id: 36, category: "Infield Backups",
    situation: "Nobody on base. Ground ball to the 3rd baseman who throws to 1st.",
    question: "You're the PITCHER. Where do you go?",
    runners: [], yourPosition: "P", emoji: "⚾",
    ballPath: [{ from: "HOME", to: "3Bf", type: "hit" }, { from: "3Bf", to: "1B", type: "throw" }],
    options: [
      { text: "Stay on the mound and watch", correct: false, feedback: "Never just watch! You have a job on every single play!" },
      { text: "Move toward the 1st base line in case of a bad throw", correct: true, feedback: "Yes! Pitchers should always move toward the play. If the throw is off, you can help!" },
      { text: "Cover home plate", correct: false, feedback: "Nobody is running home. Move toward where the action is!" }
    ],
  },
  {
    id: 37, category: "Infield Backups",
    situation: "Runner on 2nd base. Base hit to center field. The runner is heading home!",
    question: "You're the PITCHER. Where do you go?",
    runners: ["2B"], yourPosition: "P", emoji: "🏃",
    ballPath: [{ from: "HOME", to: "LC", type: "hit" }, { from: "LC", to: "HOME", type: "throw" }],
    options: [
      { text: "Back up home plate", correct: true, feedback: "PERFECT! When a throw is coming home, the pitcher backs up the catcher. If the ball gets past, you stop the run!" },
      { text: "Cover 2nd base", correct: false, feedback: "The big play is at home! Get behind the catcher!" },
      { text: "Stay on the mound", correct: false, feedback: "The throw is coming to home plate. Get behind the catcher NOW!" }
    ],
  },
  {
    id: 38, category: "Infield Backups",
    situation: "Runner on 1st base. Single hit into right field. The runner rounds 2nd and heads to 3rd.",
    question: "You're the LEFT FIELDER. What is your job?",
    runners: ["1B"], yourPosition: "LF", emoji: "💪",
    ballPath: [{ from: "HOME", to: "RF", type: "hit" }, { from: "RF", to: "3B", type: "throw" }],
    options: [
      { text: "Stay in left field", correct: false, feedback: "If the throw from RF gets past 3rd, the runner scores! You need to be there!" },
      { text: "Run to back up 3rd base", correct: true, feedback: "Heads-up play! Left fielders always back up 3rd base on throws from the right side of the field." },
      { text: "Run to cover 2nd base", correct: false, feedback: "The throw is going to 3rd. Back up where the ball is going!" }
    ],
  },
  {
    id: 39, category: "Infield Backups",
    situation: "Runner on 2nd base. Ground ball to 1st baseman who fields it and throws to the shortstop covering 2nd.",
    question: "You're the LEFT CENTER FIELDER. What should you do?",
    runners: ["2B"], yourPosition: "LC", emoji: "⚡",
    ballPath: [{ from: "HOME", to: "1Bf", type: "hit" }, { from: "1Bf", to: "2B", type: "throw" }],
    options: [
      { text: "Stay in center field", correct: false, feedback: "If the throw gets past 2nd, the runner could score! Hustle in!" },
      { text: "Run in to back up 2nd base", correct: true, feedback: "That is it! You are in the best position to stop a bad throw from getting into the outfield." },
      { text: "Back up home plate", correct: false, feedback: "The throw is going to 2nd base. Back up where the ball is headed!" }
    ],
  },
  {
    id: 40, category: "Infield Backups",
    situation: "Nobody on base. The batter hits a single to right field and tries to stretch it to 2nd.",
    question: "You're the LEFT CENTER FIELDER. Where should you be?",
    runners: [], yourPosition: "LC", emoji: "🌟",
    ballPath: [{ from: "HOME", to: "RF", type: "hit" }, { from: "RF", to: "2B", type: "throw" }],
    options: [
      { text: "Stay in your normal position", correct: false, feedback: "The throw is coming to 2nd! If it gets through, the runner takes 3rd for free!" },
      { text: "Move in to back up 2nd base on the throw from RF", correct: true, feedback: "Smart! Line yourself up behind 2nd base to catch any overthrow from right field." },
      { text: "Run to back up 1st base", correct: false, feedback: "The runner already passed 1st. The play is at 2nd!" }
    ],
  },
  {
    id: 41, category: "Infield Backups",
    situation: "Runner on 3rd base. Ground ball to the shortstop who throws to 1st.",
    question: "You're the PITCHER. What do you do after the throw goes to 1st?",
    runners: ["3B"], yourPosition: "P", emoji: "🛡️",
    ballPath: [{ from: "HOME", to: "SS", type: "hit" }, { from: "SS", to: "1B", type: "throw" }],
    options: [
      { text: "Walk back to the mound", correct: false, feedback: "The runner on 3rd could try to score! You need to be ready at home!" },
      { text: "Move toward home plate to back up the catcher in case the runner goes", correct: true, feedback: "YES! With a runner on 3rd, always be ready to cover home after the play at 1st." },
      { text: "Run to back up 1st base", correct: false, feedback: "The right fielder backs up 1st. You need to watch that runner on 3rd!" }
    ],
  },
  {
    id: 42, category: "Infield Backups",
    situation: "Runners on 1st and 2nd. Fly ball to right field is caught. Runners tag up!",
    question: "You're the PITCHER. Where do you go?",
    runners: ["1B", "2B"], yourPosition: "P", emoji: "🏃",
    ballPath: [{ from: "HOME", to: "RF", type: "hit" }, { from: "RF", to: "3B", type: "throw" }],
    options: [
      { text: "Go back to the mound", correct: false, feedback: "The play isn't over! The runner from 2nd is tagging up to 3rd!" },
      { text: "Back up 3rd base on the throw from right field", correct: true, feedback: "Great awareness! The throw is going to 3rd, and if it gets past, the runner could score!" },
      { text: "Cover 1st base", correct: false, feedback: "The action is at 3rd base right now. Get behind 3rd!" }
    ],
  },
  {
    id: 43, category: "Infield Backups",
    situation: "Nobody on base. Ground ball to the shortstop who throws to 1st.",
    question: "You're the RIGHT FIELDER. What should you already be doing?",
    runners: [], yourPosition: "RF", emoji: "🏃",
    ballPath: [{ from: "HOME", to: "SS", type: "hit" }, { from: "SS", to: "1B", type: "throw" }],
    options: [
      { text: "Standing still and watching the play", correct: false, feedback: "You should be moving the moment the ball is hit! Every throw to 1st needs a backup!" },
      { text: "Running toward 1st base to back up the throw", correct: true, feedback: "That is hustle! Right fielders back up EVERY throw to 1st base. Start moving on contact!" },
      { text: "Moving toward center field", correct: false, feedback: "The throw is going to 1st base. That is where you need to be!" }
    ],
  },
  {
    id: 44, category: "Infield Backups",
    situation: "Runner on 2nd. Single hit into right center. The runner rounds 3rd and heads home!",
    question: "You're the PITCHER. What is your job?",
    runners: ["2B"], yourPosition: "P", emoji: "🛡️",
    ballPath: [{ from: "HOME", to: "RC", type: "hit" }, { from: "RC", to: "HOME", type: "throw" }],
    options: [
      { text: "Back up home plate behind the catcher", correct: true, feedback: "PERFECT! You are the last line of defense. If the throw gets past the catcher, you save the extra base!" },
      { text: "Cover 2nd base", correct: false, feedback: "The play is at home! Get behind the catcher!" },
      { text: "Stay near the mound", correct: false, feedback: "Close, but not enough! Get all the way behind home plate!" }
    ],
  },
  {
    id: 45, category: "Infield Backups",
    situation: "Runner on 1st. Ground ball to the 2nd baseman who flips to the shortstop covering 2nd.",
    question: "You're the LEFT CENTER FIELDER. What do you do?",
    runners: ["1B"], yourPosition: "LC", emoji: "⚡",
    ballPath: [{ from: "HOME", to: "2Bf", type: "hit" }, { from: "2Bf", to: "2B", type: "throw" }],
    options: [
      { text: "Stay where you are", correct: false, feedback: "If that flip goes wide, the ball is headed right at you. Be ready!" },
      { text: "Move in behind 2nd base to back up the throw", correct: true, feedback: "That is right! On any throw to 2nd, outfielders behind the play need to move in as backup." },
      { text: "Move toward left field", correct: false, feedback: "You are moving the wrong way! The throw is at 2nd base!" }
    ],
  },
  {
    id: 46, category: "Infield Backups",
    situation: "Runner on 3rd. Fly ball caught in center field. The runner tags up!",
    question: "You're the PITCHER. Where should you be?",
    runners: ["3B"], yourPosition: "P", emoji: "🛡️",
    ballPath: [{ from: "HOME", to: "LC", type: "hit" }, { from: "LC", to: "HOME", type: "throw" }],
    options: [
      { text: "On the mound waiting for the ball back", correct: false, feedback: "The runner is tagging and heading home! A throw is coming to the plate!" },
      { text: "Behind home plate backing up the catcher", correct: true, feedback: "YES! The throw is coming home and you need to be behind the catcher in case it gets through!" },
      { text: "Covering 3rd base", correct: false, feedback: "The runner already left 3rd. The play is at home!" }
    ],
  },
  {
    id: 47, category: "Infield Backups",
    situation: "Nobody on base. The batter hits a double into the left center gap.",
    question: "You're the SHORTSTOP. What is your job?",
    runners: [], yourPosition: "SS", emoji: "🎯",
    ballPath: [{ from: "HOME", to: "LC", type: "hit" }],
    options: [
      { text: "Stay at your position", correct: false, feedback: "The ball is in the outfield! You need to get into relay position!" },
      { text: "Go out toward left center as the relay man", correct: true, feedback: "That is it! On balls to left center, the shortstop goes out as the cutoff so the outfielder has a target!" },
      { text: "Cover 2nd base", correct: false, feedback: "Someone else can cover 2nd. Your job is to be the relay!" }
    ],
  },
  {
    id: 48, category: "Infield Backups",
    situation: "Nobody on base. The batter hits a double into the right center gap.",
    question: "You're the 2ND BASEMAN. What is your job?",
    runners: [], yourPosition: "2B", emoji: "🎯",
    ballPath: [{ from: "HOME", to: "RC", type: "hit" }],
    options: [
      { text: "Cover 1st base", correct: false, feedback: "The runner already passed 1st! You need to help get the ball back in!" },
      { text: "Go out toward right center as the relay man", correct: true, feedback: "YES! On balls to right center, the 2nd baseman goes out as the relay so the outfielder has a short throw!" },
      { text: "Stay at your position and wait", correct: false, feedback: "Don't stand still! Get out there and be the relay!" }
    ],
  }
];

// ============ DIAMOND SVG BUILDER ============
function buildDiamond(runners=[], yourPosition=null, ballPath=[]) {
  function rp(p) { return (typeof p==="object") ? p : (POS[p]||{x:200,y:200}); }
  let s = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="background:transparent">`;
  
  s += `<circle cx="200" cy="200" r="195" fill="#0a1a0d" />`;
  s += `<circle cx="200" cy="200" r="185" fill="#1b3d21" />`;
  s += `<rect x="100" y="100" width="200" height="200" fill="#5d4037" transform="rotate(45 200 200)" />`;
  s += `<rect x="135" y="135" width="130" height="130" fill="#1b3d21" transform="rotate(45 200 200)" />`;
  s += `<circle cx="200" cy="220" r="15" fill="#5d4037" />`;
  s += `<line x1="200" y1="330" x2="365" y2="165" stroke="rgba(255,255,255,0.4)" stroke-width="2" />`;
  s += `<line x1="200" y1="330" x2="35" y2="165" stroke="rgba(255,255,255,0.4)" stroke-width="2" />`;

  for (const seg of (ballPath || [])) {
    const from=rp(seg.from), to=rp(seg.to);
    let col = seg.type==="hit" ? "#ffffff" : (seg.type==="overthrow" ? "#ff4444" : "#5cd672");
    s += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${col}" stroke-width="5" stroke-dasharray="10,5" />`;
    if (seg === ballPath[ballPath.length-1]) {
        s += `<circle cx="${to.x}" cy="${to.y}" r="8" fill="white" stroke="#000" stroke-width="1" />`;
        s += `<text x="${to.x}" y="${to.y+3}" text-anchor="middle" font-size="8">⚾</text>`;
    }
  }

  const baseCoords = [{x:200,y:330},{x:300,y:230},{x:200,y:130},{x:100,y:230}];
  baseCoords.forEach(b => s += `<rect x="${b.x-6}" y="${b.y-6}" width="12" height="12" fill="#fff" transform="rotate(45 ${b.x} ${b.y})" />`);

  (runners || []).forEach(r => {
    const p = POS[r];
    if (p) {
        s += `<circle cx="${p.x}" cy="${p.y-18}" r="11" fill="#ff4444" stroke="#fff" stroke-width="2">
                <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite"/>
              </circle>`;
        s += `<text x="${p.x}" y="${p.y-14}" text-anchor="middle" fill="#fff" font-size="9" font-weight="900">R</text>`;
    }
  });

  for (const f of FIELDERS) {
    const isYou = yourPosition===f.label;
    if (isYou) s += `<circle cx="${f.x}" cy="${f.y}" r="20" fill="none" stroke="#5cd672" stroke-width="3" opacity="0.6"><animate attributeName="r" values="18;22;18" dur="1.2s" repeatCount="indefinite"/></circle>`;
    s += `<circle cx="${f.x}" cy="${f.y}" r="13" fill="${isYou?'#3ea853':'#222'}" stroke="${isYou?'#fff':'#555'}" stroke-width="1.5"/>`;
    s += `<text x="${f.x}" y="${f.y+4}" text-anchor="middle" fill="#fff" font-size="10" font-weight="900" font-family="sans-serif">${f.label}</text>`;
  }
  return s + `</svg>`;
}

// ============ ENGINE ============
const sounds = {
  hit: new Audio('sounds/hit.mp3'),
  strike: new Audio('sounds/strike.m4a')
};

const walkupSongs = {
  "jackson": new Audio('sounds/jackson.m4a'),
  "andres": new Audio('sounds/andres.m4a'),
  "andrew": new Audio('sounds/andrew.m4a'),
  "caleb": new Audio('sounds/caleb.m4a'),
  "dallas": new Audio('sounds/dallas.m4a'),
  "dominic": new Audio('sounds/dominic.m4a'),
  "elliott": new Audio('sounds/elliott.m4a'),
  "gio": new Audio('sounds/gio.m4a'),
  "johnny": new Audio('sounds/johnny.m4a'),
  "liam": new Audio('sounds/liam.m4a'),
  "matthew": new Audio('sounds/matthew.m4a'),
  "weston": new Audio('sounds/weston.m4a')
};

let currentWalkup = null;
let questions = [], currentQ = 0, score = 0, streak = 0, bestStreak = 0, categoryFilter = "All", selected = null;
const $ = (id) => document.getElementById(id);

function initMenu() {
  const diamondEl = $("menu-diamond");
  const catButtonsEl = $("category-buttons");
  if (!diamondEl || !catButtonsEl) return; 

  diamondEl.innerHTML = buildDiamond([], null, []);
  const cats = ["All", ...new Set(SCENARIOS.map(s => s.category))];
  
  catButtonsEl.innerHTML = cats.map(c => `<button class="cat-btn${categoryFilter===c?' active':''}" data-cat="${c}">${c}</button>`).join("");
  
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
  
  if (currentWalkup) { currentWalkup.pause(); currentWalkup.currentTime = 0; currentWalkup = null; }
  const name = $("player-name").value.trim().toLowerCase();
  if (walkupSongs[name]) {
      currentWalkup = walkupSongs[name];
      currentWalkup.play().catch(e => console.log("Audio block:", e));
  }
  
  showScreen("play-screen");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQ];
  $("q-counter").textContent = `PLAY ${currentQ+1} / ${questions.length}`;
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
  
  if (currentWalkup) { currentWalkup.pause(); currentWalkup.currentTime = 0; currentWalkup = null; }

  const isCorrect = btn.dataset.correct === "true";
  document.querySelectorAll(".option-btn").forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === "true") b.style.borderColor = "var(--green)";
  });
  
  if (isCorrect) { 
    sounds.hit.currentTime = 0;
    sounds.hit.play().catch(e => console.log(e)); 
    score++; streak++; 
    if (streak > bestStreak) bestStreak = streak;
  } else { 
    sounds.strike.currentTime = 0;
    sounds.strike.play().catch(e => console.log(e)); 
    streak = 0; 
    btn.style.borderColor = "#ff4444"; 
  }
  
  $("feedback").classList.remove("hidden");
  $("feedback-text").textContent = (isCorrect ? "✅ " : "❌ ") + btn.dataset.feedback;
  $("next-wrap").classList.remove("hidden");
  $("next-btn").textContent = currentQ+1 >= questions.length ? "RESULTS" : "NEXT PLAY →";
}

function showResults() {
  showScreen("results-screen");
  const pct = Math.round((score / questions.length) * 100);
  $("stat-score").textContent = `${score}/${questions.length}`;
  $("stat-pct").textContent = `${pct}%`;
  $("stat-streak").textContent = `${bestStreak}`;
  $("results-grade").textContent = pct >= 80 ? "ALL-STAR! ⭐" : (pct >= 50 ? "GOOD GAME! ⚾" : "KEEP WORKING! 💪");
}

function showScreen(id) {
  ["menu-screen","play-screen","results-screen"].forEach(s => {
    $(s).classList.toggle("hidden", s !== id);
  });
}

// Ensure elements exist before attaching events to prevent silent failures
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  $("start-btn").addEventListener("click", startGame);
  $("next-btn").addEventListener("click", () => {
    if (currentQ + 1 >= questions.length) showResults(); else { currentQ++; renderQuestion(); }
  });
  $("play-again-btn").addEventListener("click", () => { startGame(); });
  $("main-menu-btn").addEventListener("click", () => { showScreen("menu-screen"); initMenu(); });
  $("quit-btn").addEventListener("click", () => {
    if (currentWalkup) { currentWalkup.pause(); currentWalkup.currentTime = 0; currentWalkup = null; }
    showScreen("menu-screen");
    initMenu();
  });
});
