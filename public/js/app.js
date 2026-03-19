// ============ DATA ============
// Coordinate lookup for ball path points
const POS = {
  HOME:{x:200,y:318}, "1B":{x:292,y:218}, "2B":{x:200,y:118}, "3B":{x:108,y:218},
  P:{x:200,y:210}, C:{x:200,y:328},
  "1Bf":{x:300,y:170}, "2Bf":{x:240,y:128}, SS:{x:158,y:128}, "3Bf":{x:100,y:170},
  LF:{x:62,y:100}, LC:{x:138,y:48}, RC:{x:262,y:48}, RF:{x:338,y:100},
  "past1B":{x:330,y:232}, "past3B":{x:70,y:232}, "pastHOME":{x:200,y:345}, "past2B":{x:200,y:95},
};

const SCENARIOS = [
  {
    id:1, category:"Backing Up Overthrows",
    situation:"Runner on 1st. Ground ball to shortstop. The throw to 1st base goes wild!",
    question:"You're the RIGHT FIELDER. What do you do?",
    runners:["1B"], yourPosition:"RF", emoji:"🏃",
    ballPath:[
      {from:"HOME", to:"SS", type:"hit"},
      {from:"SS", to:"past1B", type:"overthrow"},
    ],
    options:[
      {text:"Stay in right field and watch", correct:false, feedback:"We need you closer! Always back up 1st base on throws from the infield."},
      {text:"Run to back up 1st base", correct:true, feedback:"YES! Right fielders always back up 1st base on infield throws. Great hustle!"},
      {text:"Run to cover 2nd base", correct:false, feedback:"Good thinking about 2nd, but backing up 1st base is your #1 job on this play."},
    ],
  },
  {
    id:2, category:"Backing Up Overthrows",
    situation:"Runner on 2nd. Ground ball to the 3rd baseman. The 3rd baseman throws to 1st, but the throw sails past the 1st baseman!",
    question:"You're the RIGHT FIELDER. What do you do?",
    runners:["2B"], yourPosition:"RF", emoji:"⚡",
    ballPath:[
      {from:"HOME", to:"3Bf", type:"hit"},
      {from:"3Bf", to:"past1B", type:"overthrow"},
    ],
    options:[
      {text:"Stay in right field and watch", correct:false, feedback:"The ball got past 1st — if nobody is there, the runner could take extra bases! Always hustle to back up!"},
      {text:"Run to back up 1st base", correct:true, feedback:"Awesome! Right fielders always back up 1st base on overthrows from the infield. Great hustle!"},
      {text:"Run to cover 2nd base", correct:false, feedback:"The throw went to 1st base, so that's where you need to back up!"},
    ],
  },
  {
    id:3, category:"Backing Up Overthrows",
    situation:"Runner on 1st. Ground ball to 3rd baseman. The 3rd baseman throws to 2nd for the force, but the throw gets past the shortstop covering 2nd!",
    question:"You're the RIGHT CENTER FIELDER. What do you do?",
    runners:["1B"], yourPosition:"RC", emoji:"🎯",
    ballPath:[
      {from:"HOME", to:"3Bf", type:"hit"},
      {from:"3Bf", to:"past2B", type:"overthrow"},
    ],
    options:[
      {text:"Run to back up 2nd base", correct:true, feedback:"That's it! The throw got past 2nd base and you're the closest outfielder. You need to back it up to stop runners from taking extra bases!"},
      {text:"Stay where you are", correct:false, feedback:"If the ball gets past everyone, the runners could advance! Always hustle in to back up the play!"},
      {text:"Run to back up 3rd base", correct:false, feedback:"The throw went to 2nd base, not 3rd. Always back up the base where the ball is being thrown!"},
    ],
  },
  {
    id:4, category:"Backing Up Overthrows",
    situation:"Runner on 2nd. Ground ball to 2nd baseman. The throw to 1st is on target, but the 1st baseman drops it!",
    question:"You're the RIGHT FIELDER. Where should you already be?",
    runners:["2B"], yourPosition:"RF", emoji:"👏",
    ballPath:[
      {from:"HOME", to:"2Bf", type:"hit"},
      {from:"2Bf", to:"1B", type:"throw"},
    ],
    options:[
      {text:"Standing in right field", correct:false, feedback:"You should have been moving the moment the ball was hit! Always back up 1st base."},
      {text:"Behind 1st base, ready to grab the dropped ball", correct:true, feedback:"PERFECT! You were already backing up because you started running as soon as the ball was hit to the infield!"},
      {text:"Running toward 2nd base", correct:false, feedback:"The throw is going to 1st — that's where you need to be backing up!"},
    ],
  },
  {
    id:5, category:"Backing Up Overthrows",
    situation:"Runner on 3rd. Fly ball to left field. The runner tags up and the left fielder throws home!",
    question:"You're the PITCHER. What's your job?",
    runners:["3B"], yourPosition:"P", emoji:"🛡️",
    ballPath:[
      {from:"HOME", to:"LF", type:"hit"},
      {from:"LF", to:"HOME", type:"throw"},
    ],
    options:[
      {text:"Go back to the mound and get ready", correct:false, feedback:"Not yet! There's a play happening at home plate that needs backup!"},
      {text:"Back up home plate behind the catcher", correct:true, feedback:"Smart play! The pitcher backs up home plate on throws from the outfield. If the ball gets past the catcher, you're the last line of defense!"},
      {text:"Cover 1st base", correct:false, feedback:"Nobody is running to 1st right now — the action is at home plate!"},
    ],
  },
  {
    id:6, category:"Base Running",
    situation:"You're on 2nd base. The batter hits a ground ball to the shortstop.",
    question:"What should you do?",
    runners:["2B"], yourPosition:null, emoji:"🧠",
    ballPath:[
      {from:"HOME", to:"SS", type:"hit"},
    ],
    options:[
      {text:"Run to 3rd as fast as you can", correct:false, feedback:"Careful! The shortstop is right there and could tag you or throw you out easily."},
      {text:"Stay close to 2nd and wait to see what happens", correct:true, feedback:"Smart! On a ground ball hit near you, stay close to your base and read the play. Don't run into an out!"},
      {text:"Run back to 1st base", correct:false, feedback:"You can't go backwards to a base you already passed! Stay near 2nd."},
    ],
  },
  {
    id:7, category:"Fielding Positions",
    situation:"Nobody on base. Ground ball hit to the 3rd baseman who throws to 1st.",
    question:"You're the PITCHER. Where do you go after the pitch?",
    runners:[], yourPosition:"P", emoji:"⚾",
    ballPath:[
      {from:"HOME", to:"3Bf", type:"hit"},
      {from:"3Bf", to:"1Bf", type:"throw"},
    ],
    options:[
      {text:"Stay on the mound", correct:false, feedback:"You need to move! Pitchers have a job on every play."},
      {text:"Run to cover the area between home and 1st base", correct:true, feedback:"Yes! Pitchers break toward 1st base on ground balls to the right side, and back up throws on the left side. Always be moving!"},
      {text:"Run to back up 3rd base", correct:false, feedback:"The 3rd baseman already has the ball. Think about where the throw is going!"},
    ],
  },
  {
    id:8, category:"Backing Up Overthrows",
    situation:"Runner on 1st and 2nd. The batter hits a single to right field. The right fielder throws to 3rd base!",
    question:"You're the LEFT FIELDER. What do you do?",
    runners:["1B","2B"], yourPosition:"LF", emoji:"💪",
    ballPath:[
      {from:"HOME", to:"RF", type:"hit"},
      {from:"RF", to:"3B", type:"throw"},
    ],
    options:[
      {text:"Stay in left field and watch the play", correct:false, feedback:"Never just watch! If that throw gets past 3rd, someone needs to be there!"},
      {text:"Run to back up 3rd base", correct:true, feedback:"Heads-up play! Left fielders back up 3rd base on throws from right field. You could save the game!"},
      {text:"Run to cover 2nd base", correct:false, feedback:"The shortstop or 2nd baseman can cover 2nd. You need to back up where the throw is going — 3rd base!"},
    ],
  },
  {
    id:9, category:"Backing Up Overthrows",
    situation:"Runners on 1st and 3rd. Ground ball to shortstop. The shortstop throws to 2nd for the force, but the throw gets past the 2nd baseman!",
    question:"You're the RIGHT CENTER FIELDER. What should you be doing?",
    runners:["1B","3B"], yourPosition:"RC", emoji:"🌟",
    ballPath:[
      {from:"HOME", to:"SS", type:"hit"},
      {from:"SS", to:"past2B", type:"overthrow"},
    ],
    options:[
      {text:"Stay where you are since it's an infield play", correct:false, feedback:"The throw got past 2nd base — if nobody backs it up, runners will advance! Always hustle in!"},
      {text:"Run to back up 2nd base", correct:true, feedback:"That's the play! When a throw goes to 2nd base, outfielders nearby need to back it up. You stopped the runner from scoring!"},
      {text:"Run to back up 3rd base", correct:false, feedback:"The throw went to 2nd base, not 3rd. Always back up the base where the ball is being thrown!"},
    ],
  },
  {
    id:10, category:"Game Smarts",
    situation:"There's a pop fly hit high in the air between you and another fielder.",
    question:"What's the MOST important thing to do?",
    runners:[], yourPosition:null, emoji:"📢",
    ballPath:[
      {from:"HOME", to:{x:200,y:160}, type:"hit"},
    ],
    options:[
      {text:"Just let the other person get it", correct:false, feedback:"What if they think the same thing? Someone needs to call it!"},
      {text:"Yell 'BALL! BALL! BALL!' loud and clear", correct:true, feedback:"YES! Communication wins games! Yell 'BALL!' to call off other players so everyone knows you've got it. If you hear someone else call it, back off and let them have it."},
      {text:"Both try to catch it at the same time", correct:false, feedback:"That's how collisions happen! Always communicate — one person calls it, the other backs up."},
    ],
  },
  {
    id:11, category:"Base Running",
    situation:"You're on 1st base. The batter hits a ground ball to the 2nd baseman.",
    question:"What should you do?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[
      {from:"HOME", to:"2Bf", type:"hit"},
    ],
    options:[
      {text:"Stay on 1st base", correct:false, feedback:"You have to run! It's a force play — the defense can just step on 2nd base to get you out. You MUST run to 2nd!"},
      {text:"Run to 2nd base because it's a force play", correct:true, feedback:"That's right! With a runner on 1st, you're FORCED to run to 2nd when the ball is hit on the ground. Run hard!"},
      {text:"Run back toward home plate", correct:false, feedback:"You can't run backwards! You have to go forward to 2nd base on a ground ball."},
    ],
  },
  {
    id:12, category:"Base Running",
    situation:"You're on 2nd base with no outs. The batter hits a fly ball to right field.",
    question:"What should you do?",
    runners:["2B"], yourPosition:null, emoji:"🧠",
    ballPath:[
      {from:"HOME", to:"RF", type:"hit"},
    ],
    options:[
      {text:"Run to 3rd right away", correct:false, feedback:"If the fielder catches it and you've left 2nd, you could be doubled off! Wait to see if it's caught first."},
      {text:"Go halfway between 2nd and 3rd and watch", correct:true, feedback:"Smart! On a fly ball, go halfway so you can tag up if it's caught, or keep running if it drops!"},
      {text:"Stay on 2nd base no matter what", correct:false, feedback:"You should get partway to 3rd so you're ready. If the ball drops, you want to advance!"},
    ],
  },
  {
    id:13, category:"Base Running",
    situation:"You're on 3rd base with less than 2 outs. A fly ball is hit deep to left field.",
    question:"What should you do?",
    runners:["3B"], yourPosition:null, emoji:"🧠",
    ballPath:[
      {from:"HOME", to:"LF", type:"hit"},
    ],
    options:[
      {text:"Run home right away", correct:false, feedback:"If the fielder catches it, you'll be doubled off! You need to wait on the base."},
      {text:"Go back to 3rd base and get ready to tag up", correct:true, feedback:"Yes! Touch 3rd base and as soon as the fielder catches it, run home! That's called tagging up."},
      {text:"Stay halfway between 3rd and home", correct:false, feedback:"On a deep fly ball with less than 2 outs, you should tag up at 3rd so you can score after the catch!"},
    ],
  },
  {
    id:14, category:"Base Running",
    situation:"You're on 1st base. The batter hits a fly ball to the left fielder who catches it.",
    question:"What do you do?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[
      {from:"HOME", to:"LF", type:"hit"},
    ],
    options:[
      {text:"Keep running to 2nd base", correct:false, feedback:"The ball was caught — that's an out! If you're off the base, they can throw to 1st to double you off!"},
      {text:"Get back to 1st base as fast as you can", correct:true, feedback:"Correct! When a fly ball is caught, you need to get back to your base before the ball gets there or you're out!"},
      {text:"Run to the dugout since the batter is out", correct:false, feedback:"Only the batter is out! You're still a runner — get back to 1st base before they throw it there!"},
    ],
  },
  {
    id:15, category:"Backing Up Overthrows",
    situation:"Nobody on base. Ground ball to shortstop. The throw to 1st goes wild!",
    question:"You're the RIGHT FIELDER. What do you do?",
    runners:[], yourPosition:"RF", emoji:"🏃",
    ballPath:[
      {from:"HOME", to:"SS", type:"hit"},
      {from:"SS", to:"past1B", type:"overthrow"},
    ],
    options:[
      {text:"Stay in right field and watch", correct:false, feedback:"The ball got past 1st base! If nobody backs it up, the batter could take extra bases!"},
      {text:"Run to back up 1st base", correct:true, feedback:"Great hustle! Right fielders ALWAYS back up 1st base on infield throws, even with nobody on base!"},
      {text:"Run to cover 2nd base", correct:false, feedback:"First, back up 1st base where the throw is going. That's your #1 job!"},
    ],
  },
  {
    id:16, category:"Backing Up Overthrows",
    situation:"Runner on 1st. Ground ball to 2nd baseman. The 2nd baseman flips to shortstop at 2nd for the force, but the flip goes wide!",
    question:"You're the LEFT CENTER FIELDER. What do you do?",
    runners:["1B"], yourPosition:"LC", emoji:"⚡",
    ballPath:[
      {from:"HOME", to:"2Bf", type:"hit"},
      {from:"2Bf", to:"past2B", type:"overthrow"},
    ],
    options:[
      {text:"Stay where you are", correct:false, feedback:"The ball got past 2nd base! If nobody is there, the runner could go all the way to 3rd or home!"},
      {text:"Run to back up 2nd base", correct:true, feedback:"Perfect! The flip went toward your side of the field. You need to back up 2nd base to stop runners from advancing!"},
      {text:"Run to back up 1st base", correct:false, feedback:"The ball went past 2nd base, not 1st. Always back up the base where the ball is going!"},
    ],
  },
  {
    id:17, category:"Game Smarts",
    situation:"You catch a ground ball in the infield with a runner on 1st and 1 out.",
    question:"Where should you throw the ball?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[
      {from:"HOME", to:"SS", type:"hit"},
    ],
    options:[
      {text:"Throw to 2nd base for the force out", correct:true, feedback:"That's right! Get the lead runner — a quick toss to 2nd base (or step on the bag if you're the shortstop) gets the go-ahead runner out. That's always the priority!"},
      {text:"Throw to 1st base to get the batter out", correct:false, feedback:"You could get the out at 1st, but the lead runner at 2nd is the priority! A quick toss to 2nd gets the more dangerous runner."},
      {text:"Hold onto the ball", correct:false, feedback:"You need to make a throw! Every second counts — get the lead runner at 2nd!"},
    ],
  },
  {
    id:18, category:"Game Smarts",
    situation:"You're playing right center field. A base hit goes between you and the right fielder.",
    question:"Who should field the ball?",
    runners:[], yourPosition:"RC", emoji:"📢",
    ballPath:[
      {from:"HOME", to:{x:300,y:90}, type:"hit"},
    ],
    options:[
      {text:"Let the right fielder get it since it's closer to them", correct:false, feedback:"Don't assume! You both need to go after it, and whoever is closest calls for it!"},
      {text:"Both go after it and the closest one yells 'BALL! BALL! BALL!'", correct:true, feedback:"That's it! Both players run hard to the ball, and the one who gets there first calls 'BALL!' to call off the other player. The other player backs them up!"},
      {text:"Stop and wait to see what happens", correct:false, feedback:"Never stop! Always run hard to the ball. Every second matters!"},
    ],
  },
  {
    id:19, category:"Base Running",
    situation:"You're on 1st base. The batter hits a ground ball right at the 1st baseman.",
    question:"What should you do?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[
      {from:"HOME", to:"1Bf", type:"hit"},
    ],
    options:[
      {text:"Stay on 1st base", correct:false, feedback:"You can't stay! It's a force play — the 1st baseman can just step on the bag to get you out. Run to 2nd!"},
      {text:"Run hard to 2nd base", correct:true, feedback:"Correct! You're forced to run on a ground ball. Run hard to 2nd — you have to go no matter where the ball is hit!"},
      {text:"Run back toward home plate", correct:false, feedback:"You can never run backwards to a base you already passed! Go to 2nd!"},
    ],
  },
  {
    id:20, category:"Base Running",
    situation:"You're on 2nd base. The batter hits a single into right field.",
    question:"What should you do?",
    runners:["2B"], yourPosition:null, emoji:"🏃",
    ballPath:[
      {from:"HOME", to:"RF", type:"hit"},
    ],
    options:[
      {text:"Stay on 2nd base to be safe", correct:false, feedback:"On a base hit, you should be running! A single to right field means you can probably score!"},
      {text:"Run to 3rd and look at your coach for the sign to go home", correct:true, feedback:"Yes! Run hard to 3rd and look at your 3rd base coach. They'll wave you home or tell you to stop. Always listen to your coaches!"},
      {text:"Run straight home without looking", correct:false, feedback:"Don't put your head down! Round 3rd and look at your coach — they can see where the ball is and will tell you to go or stop!"},
    ],
  },
  {
    id:21, category:"Base Running",
    situation:"You just hit the ball into the outfield. You're running to 1st base.",
    question:"Should you run straight to 1st base or round it?",
    runners:[], yourPosition:null, emoji:"🏃",
    ballPath:[
      {from:"HOME", to:"LF", type:"hit"},
    ],
    options:[
      {text:"Run straight to 1st and stop on the bag", correct:false, feedback:"If the ball is in the outfield, you might be able to get to 2nd! Don't just stop!"},
      {text:"Round 1st base and look to see if you can go to 2nd", correct:true, feedback:"That's it! Hit the inside corner of 1st base, round it, and look at your coach and the ball. If you can make it to 2nd, keep going!"},
      {text:"Run past 1st base into right field", correct:false, feedback:"Round the base toward 2nd, not into the field! Touch the inside corner and curve toward 2nd."},
    ],
  },
  {
    id:22, category:"Base Running",
    situation:"You hit a ground ball to the infield. You're running to 1st base.",
    question:"How should you run through 1st base?",
    runners:[], yourPosition:null, emoji:"🏃",
    ballPath:[
      {from:"HOME", to:"SS", type:"hit"},
    ],
    options:[
      {text:"Slow down before you get to the bag", correct:false, feedback:"Never slow down! Run full speed all the way through the bag!"},
      {text:"Run full speed straight through the bag", correct:true, feedback:"Yes! On a ground ball to the infield, run full speed THROUGH 1st base. Don't slow down, don't round it — just sprint straight through!"},
      {text:"Slide into 1st base", correct:false, feedback:"Don't slide into 1st! It actually slows you down. Run full speed through the bag!"},
    ],
  },
  {
    id:23, category:"Fielding Positions",
    situation:"You're the pitcher. After you throw the pitch, the batter hits a ground ball to the 1st baseman.",
    question:"Where do you go?",
    runners:[], yourPosition:"P", emoji:"⚾",
    ballPath:[
      {from:"HOME", to:"1Bf", type:"hit"},
    ],
    options:[
      {text:"Stay on the mound", correct:false, feedback:"The 1st baseman has to leave the bag to field the ball! Someone needs to cover 1st base!"},
      {text:"Run to cover 1st base", correct:true, feedback:"That's right! When the 1st baseman fields the ball, the pitcher MUST run over to cover 1st base so the 1st baseman can toss you the ball for the out!"},
      {text:"Run to back up home plate", correct:false, feedback:"No play at home right now. The 1st baseman needs you to cover 1st base!"},
    ],
  },
  {
    id:24, category:"Fielding Positions",
    situation:"Runner on 1st. Ground ball to the shortstop who throws to 2nd for the force out.",
    question:"You're the 2ND BASEMAN. What's your job?",
    runners:["1B"], yourPosition:"2B", emoji:"⚾",
    ballPath:[
      {from:"HOME", to:"SS", type:"hit"},
      {from:"SS", to:"2B", type:"throw"},
    ],
    options:[
      {text:"Stay at your normal position", correct:false, feedback:"The throw is going to 2nd base! Someone needs to be there to catch it!"},
      {text:"Run to cover 2nd base to receive the throw", correct:true, feedback:"Exactly! On a ground ball to the shortstop, the 2nd baseman covers the bag at 2nd to receive the throw for the force out!"},
      {text:"Run to back up 1st base", correct:false, feedback:"The shortstop is throwing to 2nd, not 1st! You need to be at 2nd base to catch the throw!"},
    ],
  },
  {
    id:25, category:"Fielding Positions",
    situation:"Runner on 2nd. The batter hits a single to left field.",
    question:"You're the SHORTSTOP. Where should you be?",
    runners:["2B"], yourPosition:"SS", emoji:"⚾",
    ballPath:[
      {from:"HOME", to:"LF", type:"hit"},
    ],
    options:[
      {text:"Run out to help the left fielder", correct:false, feedback:"The left fielder has the ball. You need to be in position to receive a throw or relay!"},
      {text:"Go to the cutoff position between the outfielder and home plate", correct:true, feedback:"Great instinct! The shortstop is the cutoff. Line up between the left fielder and home plate so you can catch the throw and relay it home if needed!"},
      {text:"Cover 2nd base", correct:false, feedback:"The runner already left 2nd. You need to get in the cutoff position to help relay the throw from the outfield!"},
    ],
  },
  {
    id:26, category:"Fielding Positions",
    situation:"Nobody on base. The batter hits a fly ball to left center field.",
    question:"You're the SHORTSTOP. What should you do?",
    runners:[], yourPosition:"SS", emoji:"⚾",
    ballPath:[
      {from:"HOME", to:"LC", type:"hit"},
    ],
    options:[
      {text:"Go out to shallow left field in case the ball drops", correct:true, feedback:"Yes! Go out as the relay. If the outfielder catches it, great. If they miss, you're there to back them up or relay the throw to the infield!"},
      {text:"Stay at your position and wait", correct:false, feedback:"Don't stand still! Get into position to help — go out toward the ball as the relay or backup!"},
      {text:"Cover 2nd base", correct:false, feedback:"With nobody on base, getting in relay position is more important. Go toward the ball to help!"},
    ],
  },
  {
    id:27, category:"Game Smarts",
    situation:"There are 2 outs and a runner on 3rd. A ground ball is hit to you at shortstop.",
    question:"Where do you throw?",
    runners:["3B"], yourPosition:"SS", emoji:"🧠",
    ballPath:[
      {from:"HOME", to:"SS", type:"hit"},
    ],
    options:[
      {text:"Throw home to get the runner", correct:false, feedback:"With 2 outs, you don't need to stop the run — just get the batter out! Throw to 1st for the easy 3rd out!"},
      {text:"Throw to 1st base for the 3rd out", correct:true, feedback:"Smart! With 2 outs, the easiest play is to get the batter at 1st. That ends the inning and the run doesn't count!"},
      {text:"Throw to 3rd base", correct:false, feedback:"The runner already left 3rd! Throw to 1st to get the 3rd out and end the inning!"},
    ],
  },
  {
    id:28, category:"Game Smarts",
    situation:"A ground ball is hit right at you. It takes a bad hop and bounces up toward your face.",
    question:"What's the MOST important thing to do?",
    runners:[], yourPosition:null, emoji:"🛡️",
    ballPath:[
      {from:"HOME", to:"SS", type:"hit"},
    ],
    options:[
      {text:"Turn your head away", correct:false, feedback:"If you turn away, you lose the ball! Use your glove to protect yourself while keeping your eyes on it."},
      {text:"Block the ball with your body and keep it in front of you", correct:true, feedback:"That's right! Knock it down and keep it in front of you. Even if you don't catch it cleanly, you can still pick it up and make the throw!"},
      {text:"Jump out of the way", correct:false, feedback:"If you jump away, the ball goes past you and runners advance! Be tough — block it and keep it in front!"},
    ],
  },
  {
    id:29, category:"Game Smarts",
    situation:"You're in the outfield and you field a ground ball base hit with a runner on 1st.",
    question:"What do you do with the ball?",
    runners:["1B"], yourPosition:"LF", emoji:"🧠",
    ballPath:[
      {from:"HOME", to:"LF", type:"hit"},
    ],
    options:[
      {text:"Throw it as hard as you can toward home plate", correct:false, feedback:"The runner from 1st is probably only going to 2nd or 3rd. Don't throw to a base where there's no play!"},
      {text:"Hit the cutoff man with a quick, accurate throw", correct:true, feedback:"Yes! Get the ball to your cutoff man fast and accurate. They can see the whole field and will relay it to the right base!"},
      {text:"Hold the ball and run it in", correct:false, feedback:"Running it in takes too long! Throw to the cutoff man — every second matters when runners are moving!"},
    ],
  },
  {
    id:30, category:"Game Smarts",
    situation:"You're playing 1st base. The pitcher is pitching and you have a runner on 1st.",
    question:"Where should you stand before the pitch?",
    runners:["1B"], yourPosition:"1B", emoji:"🧠",
    ballPath:[],
    options:[
      {text:"Stand right on the bag to keep the runner close", correct:false, feedback:"At 8U you don't need to hold runners on. Get in your fielding position so you're ready for a ground ball!"},
      {text:"Stand in your normal fielding position, ready for the ball", correct:true, feedback:"That's right! At 8U there's no leading off or stealing, so don't worry about holding the runner. Be in your fielding spot, ready to make a play!"},
      {text:"Stand behind the runner so they can't see you", correct:false, feedback:"Get in your fielding position! You need to be ready to field a ground ball, not watching the runner."},
    ],
  },
  {
    id:31, category:"Fielding Positions",
    situation:"The ball is hit to the right fielder with runners on base.",
    question:"You're the 2ND BASEMAN. Where should you go?",
    runners:["1B"], yourPosition:"2B", emoji:"⚾",
    ballPath:[
      {from:"HOME", to:"RF", type:"hit"},
    ],
    options:[
      {text:"Stay at your position", correct:false, feedback:"When the ball is hit to the outfield, you need to move! Get into position to receive a throw!"},
      {text:"Go to the cutoff position between right field and the infield", correct:true, feedback:"Yes! The 2nd baseman is the cutoff for throws from right field. Line up to receive the throw and relay it where it needs to go!"},
      {text:"Cover 1st base", correct:false, feedback:"The 1st baseman covers 1st. You need to get in the cutoff position to help relay the throw from right field!"},
    ],
  },
];

// ============ DIAMOND SVG BUILDER ============
const BASES = { HOME:{x:200,y:318}, "1B":{x:292,y:218}, "2B":{x:200,y:118}, "3B":{x:108,y:218} };
const FIELDERS = [
  {label:"P",x:200,y:210},{label:"C",x:200,y:328},
  {label:"1B",x:300,y:170},{label:"2B",x:240,y:128},
  {label:"SS",x:158,y:128},{label:"3B",x:100,y:170},
  {label:"LF",x:62,y:100},{label:"LC",x:138,y:48},{label:"RC",x:262,y:48},{label:"RF",x:338,y:100},
];



function buildDiamond(runners=[], yourPosition=null, ballPath=[]) {
  const hasRunner = (b) => runners.includes(b);
  function rp(p) { if (typeof p==="object"&&p.x!==undefined) return p; return POS[p]||{x:200,y:200}; }
  let s = `<svg viewBox="0 0 400 400" class="diamond-svg">`;
  s += `<defs>
    <marker id="ah" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="rgba(255,255,255,0.6)"/></marker>
    <marker id="at" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#66bb6a"/></marker>
    <marker id="ao" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#e53935"/></marker>
    <filter id="glow"><feGaussianBlur stdDeviation="2" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>`;
  s += `<rect x="0" y="0" width="400" height="400" fill="#0d1b0d"/>`;
  s += `<image href="/images/field.jpg" x="0" y="8" width="400" height="368"/>`;

  // Ball paths
  for (const seg of ballPath) {
    const from=rp(seg.from), to=rp(seg.to);
    let col,dash,mk,w;
    if (seg.type==="hit") { col="rgba(255,255,255,0.5)"; dash="6 4"; mk="url(#ah)"; w=2; }
    else if (seg.type==="overthrow") { col="#e53935"; dash="5 3"; mk="url(#ao)"; w=2.5; }
    else { col="#66bb6a"; dash="6 4"; mk="url(#at)"; w=2; }
    s += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${col}" stroke-width="${w}" stroke-dasharray="${dash}" marker-end="${mk}" opacity="0.9"/>`;
  }
  if (ballPath.length>0) {
    const ep=rp(ballPath[ballPath.length-1].to);
    s += `<circle cx="${ep.x}" cy="${ep.y}" r="6" fill="white" filter="url(#glow)" opacity="0.85"/>`;
    s += `<text x="${ep.x}" y="${ep.y+4}" text-anchor="middle" font-size="10">\u26BE</text>`;
  }

  // Runner indicators on bases (no white base squares - image has them)
  for (const [name,pos] of Object.entries(BASES)) {
    const hr=hasRunner(name);
    if (hr) {
      s += `<circle cx="${pos.x}" cy="${pos.y-16}" r="8" fill="#e53935" stroke="#b71c1c" stroke-width="1.5"><animate attributeName="r" values="7;9;7" dur="1.5s" repeatCount="indefinite"/></circle>`;
      s += `<text x="${pos.x}" y="${pos.y-13}" text-anchor="middle" fill="white" font-size="8" font-weight="900" font-family="sans-serif">R</text>`;
    }
  }

  // Fielder dots
  for (const f of FIELDERS) {
    const isYou=yourPosition===f.label;
    if (isYou) {
      s += `<circle cx="${f.x}" cy="${f.y}" r="16" fill="none" stroke="#66bb6a" stroke-width="2" opacity="0.7"><animate attributeName="r" values="14;18;14" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0.25;0.7" dur="1.5s" repeatCount="indefinite"/></circle>`;
    }
    s += `<circle cx="${f.x}" cy="${f.y}" r="11" fill="${isYou?'#4caf50':'rgba(0,0,0,0.55)'}" stroke="${isYou?'#66bb6a':'rgba(255,255,255,0.25)'}" stroke-width="1.5"/>`;
    s += `<text x="${f.x}" y="${f.y+4}" text-anchor="middle" fill="white" font-size="${f.label.length>2?'7':'8'}" font-weight="800" font-family="sans-serif">${f.label}</text>`;
  }

  // Legend
  let lx=25;
  if (runners.length>0) { s+=`<circle cx="${lx}" cy="388" r="4" fill="#e53935"/><text x="${lx+8}" y="391" fill="rgba(255,255,255,0.5)" font-size="8" font-family="sans-serif" font-weight="700">Runner</text>`; lx+=62; }
  if (yourPosition) { s+=`<circle cx="${lx}" cy="388" r="4" fill="#4caf50"/><text x="${lx+8}" y="391" fill="rgba(255,255,255,0.5)" font-size="8" font-family="sans-serif" font-weight="700">You</text>`; lx+=45; }
  const hasOT=ballPath.some(x=>x.type==="overthrow");
  if (ballPath.length>0) {
    s+=`<line x1="${lx}" y1="388" x2="${lx+12}" y2="388" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-dasharray="3 2"/><text x="${lx+16}" y="391" fill="rgba(255,255,255,0.5)" font-size="8" font-family="sans-serif" font-weight="700">Hit</text>`; lx+=42;
    if (hasOT) { s+=`<line x1="${lx}" y1="388" x2="${lx+12}" y2="388" stroke="#e53935" stroke-width="1.5" stroke-dasharray="3 2"/><text x="${lx+16}" y="391" fill="rgba(255,255,255,0.5)" font-size="8" font-family="sans-serif" font-weight="700">Overthrow</text>`; }
    else if (ballPath.some(x=>x.type==="throw")) { s+=`<line x1="${lx}" y1="388" x2="${lx+12}" y2="388" stroke="#66bb6a" stroke-width="1.5" stroke-dasharray="3 2"/><text x="${lx+16}" y="391" fill="rgba(255,255,255,0.5)" font-size="8" font-family="sans-serif" font-weight="700">Throw</text>`; }
  }
  s+=`</svg>`;
  return s;
}



// ============ GAME STATE ============
const correctSound = new Audio('/sounds/hit.mp3');
const wrongSound = new Audio('/sounds/strike.m4a');

// NEW: Walkup Song Directory
const walkupSongs = {
  "jackson": new Audio('/sounds/jackson.m4a'),
  "andres": new Audio('/sounds/andres.m4a'),
  "andrew": new Audio('/sounds/andrew.m4a'),
  "caleb": new Audio('/sounds/caleb.m4a'),
  "dallas": new Audio('/sounds/dallas.m4a'),
  "dominic": new Audio('/sounds/dominic.m4a'),
  "elliott": new Audio('/sounds/elliott.m4a'),
  "gio": new Audio('/sounds/gio.m4a'),
  "johnny": new Audio('/sounds/johnny.m4a'),
  "liam": new Audio('/sounds/liam.m4a'),
  "matthew": new Audio('/sounds/matthew.m4a'),
  "weston": new Audio('/sounds/weston.m4a')
  };

let currentWalkup = null; // Keeps track of the active song

let gameState = "menu";
let questions = [];
let currentQ = 0;
let selected = null;
let score = 0;
let streak = 0;
let bestStreak = 0;
let categoryFilter = "All";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============ DOM REFS ============
const $ = (id) => document.getElementById(id);

// ============ INIT MENU ============
function initMenu() {
  $("menu-diamond").innerHTML = buildDiamond([], null);
  const cats = ["All", ...new Set(SCENARIOS.map(s => s.category))];
  $("category-buttons").innerHTML = cats.map(c =>
    `<button class="cat-btn${categoryFilter===c?' active':''}" data-cat="${c}">${c}</button>`
  ).join("");
  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      categoryFilter = btn.dataset.cat;
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

// ============ START GAME ============
function startGame() {
  const filtered = categoryFilter === "All" ? SCENARIOS : SCENARIOS.filter(s => s.category === categoryFilter);
  questions = shuffle(filtered).map(q => ({ ...q, options: shuffle(q.options) }));
  currentQ = 0; selected = null; score = 0; streak = 0; bestStreak = 0;
  
  // NEW: Stop any currently playing walkup song
  if (currentWalkup) {
    currentWalkup.pause();
    currentWalkup.currentTime = 0;
  }

  // NEW: Check the typed name and play their hype track
  const typedName = $("player-name").value.trim().toLowerCase();
  if (walkupSongs[typedName]) {
    currentWalkup = walkupSongs[typedName];
    currentWalkup.currentTime = 0;
    currentWalkup.play().catch(err => console.log("Audio play failed:", err));
  }

  showScreen("play-screen");
  renderQuestion();
}

// ============ RENDER QUESTION ============
function renderQuestion() {
  const q = questions[currentQ];
  $("q-counter").textContent = `Q ${currentQ+1} / ${questions.length}`;
  $("score-display").textContent = `✓ ${score}`;
  if (streak >= 2) { $("streak-display").textContent = `🔥 ${streak}`; $("streak-display").classList.remove("hidden"); }
  else { $("streak-display").classList.add("hidden"); }
  $("progress-fill").style.width = `${(currentQ / questions.length) * 100}%`;
  $("cat-badge").textContent = `${q.emoji} ${q.category.toUpperCase()}`;
  $("play-diamond").innerHTML = buildDiamond(q.runners, q.yourPosition, q.ballPath || []);
  $("situation-text").textContent = q.situation;
  $("question-text").textContent = q.question;

  $("options-wrap").innerHTML = q.options.map((opt, i) =>
    `<button class="option-btn" data-idx="${i}" style="animation-delay:${i*0.08}s">${opt.text}</button>`
  ).join("");

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => handleAnswer(parseInt(btn.dataset.idx)));
  });

  // --- NEW CODE: Initialize 3D Tilt Effect ---
  VanillaTilt.init(document.querySelectorAll(".option-btn"), {
    max: 15,          // Maximum tilt rotation (degrees)
    speed: 400,       // Speed of the enter/exit transition
    glare: true,      // Adds a cool lighting reflection
    "max-glare": 0.2, // Opacity of the glare
    scale: 1.02       // Slight zoom when hovered/touched
  });
  
  $("feedback").classList.add("hidden");
  $("next-wrap").classList.add("hidden");
  $("confetti").classList.add("hidden");
  selected = null;
}

// ============ HANDLE ANSWER ============
function handleAnswer(idx) {
  if (selected !== null) return;
  selected = idx;

// NEW: Stop the walkup music so the hit/strike sound is clear
  if (currentWalkup) {
    currentWalkup.pause();
    currentWalkup.currentTime = 0;
    currentWalkup = null; 
  }
  
  const q = questions[currentQ];
  const isCorrect = q.options[idx].correct;

  // Style buttons
  document.querySelectorAll(".option-btn").forEach((btn, i) => {
    btn.disabled = true;
    if (i === idx && isCorrect) btn.classList.add("correct");
    else if (i === idx && !isCorrect) btn.classList.add("wrong");
    else if (q.options[i].correct) btn.classList.add("was-correct");
  });

  if (isCorrect) {
    correctSound.currentTime = 0;
    correctSound.play();

    score++; streak++;
    if (streak > bestStreak) bestStreak = streak;
    $("score-display").textContent = `✓ ${score}`;
    $("score-display").classList.remove("bump");
    void $("score-display").offsetWidth;
    $("score-display").classList.add("bump");
    if (streak >= 2) { $("streak-display").textContent = `🔥 ${streak}`; $("streak-display").classList.remove("hidden"); }
    showConfetti();
  } else {
    wrongSound.currentTime = 0;
    wrongSound.play();

    streak = 0;
    $("streak-display").classList.add("hidden");
  }

  // Feedback
  const fb = $("feedback");
  fb.classList.remove("hidden", "correct-fb", "wrong-fb");
  fb.classList.add(isCorrect ? "correct-fb" : "wrong-fb");
  $("feedback-text").textContent = (isCorrect ? "✅ " : "❌ ") + q.options[idx].feedback;

  // Next button
  $("next-wrap").classList.remove("hidden");
  $("next-btn").textContent = currentQ + 1 >= questions.length ? "SEE RESULTS" : "NEXT PLAY →";
}

// ============ CONFETTI ============
function showConfetti() {
  const wrap = $("confetti");
  wrap.classList.remove("hidden");
  wrap.innerHTML = "";
  const colors = ["#3ea853","#5cd672","#f5c842","#e2f0e2","#2a7a3a","#8bc34a"];
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * 360;
    const dist = 40 + Math.random() * 60;
    const dx = Math.cos(angle * Math.PI / 180) * dist;
    const dy = Math.sin(angle * Math.PI / 180) * dist;
    const size = 4 + Math.random() * 6;
    const dot = document.createElement("div");
    dot.className = "confetti-dot";
    dot.style.cssText = `width:${size}px;height:${size}px;border-radius:${i%3===0?'50%':'2px'};background:${colors[i%6]};animation:confetti-pop 0.7s ease-out forwards;--dx:${dx}px;--dy:${dy}px;`;
    wrap.appendChild(dot);
  }
}

// ============ NEXT / RESULTS ============
function nextQuestion() {
  if (currentQ + 1 >= questions.length) {
    showResults();
  } else {
    currentQ++;
    renderQuestion();
  }
}

function showResults() {
  showScreen("results-screen");
  const pct = Math.round((score / questions.length) * 100);
  let grade, color;
  if (pct >= 90) { grade = "ALL-STAR! ⭐"; color = "#fbbf24"; }
  else if (pct >= 70) { grade = "GREAT HUSTLE! 💪"; color = "#22c55e"; }
  else if (pct >= 50) { grade = "NICE EFFORT! 👍"; color = "#3b82f6"; }
  else { grade = "KEEP PRACTICING! ⚾"; color = "#f97316"; }

  const rg = $("results-grade");
  rg.textContent = grade;
  rg.style.color = color;

  const name = $("player-name").value.trim();
  if (name) {
    $("results-name").textContent = `Great game, ${name}!`;
    $("results-name").classList.remove("hidden");
  } else {
    $("results-name").classList.add("hidden");
  }

  $("stat-score").textContent = `${score}/${questions.length}`;
  $("stat-pct").textContent = `${pct}%`;
  $("stat-streak").textContent = `🔥 ${bestStreak}`;
  $("results-diamond").innerHTML = buildDiamond([], null);
}

// ============ SCREEN MANAGEMENT ============
function showScreen(id) {
  const screens = ["menu-screen","play-screen","results-screen"];
  const current = screens.find(s => !$(s).classList.contains("hidden"));

  if (current && current !== id) {
    const currentEl = $(current);
    currentEl.classList.add("fade-out");
    setTimeout(() => {
      screens.forEach(s => {
        $(s).classList.toggle("hidden", s !== id);
        $(s).classList.remove("fade-out","fade-in");
      });
      $(id).classList.add("fade-in");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 280);
  } else {
    screens.forEach(s => {
      $(s).classList.toggle("hidden", s !== id);
      $(s).classList.remove("fade-out","fade-in");
    });
    $(id).classList.add("fade-in");
  }
}

// ============ EVENT LISTENERS ============
$("start-btn").addEventListener("click", startGame);
$("next-btn").addEventListener("click", nextQuestion);
$("play-again-btn").addEventListener("click", startGame);
$("main-menu-btn").addEventListener("click", () => {
  categoryFilter = "All";
  showScreen("menu-screen");
  initMenu();
});

// New Home/Quit button listener
$("quit-btn").addEventListener("click", () => { 
  categoryFilter = "All"; // Adding this resets the category filter just like the main menu button
  showScreen("menu-screen"); 
  initMenu(); 
});

// ============ BOOT ============
initMenu();
