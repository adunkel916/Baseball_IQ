// ============ DATA ============
const POS = {
  HOME:{x:200,y:330}, "1B":{x:300,y:230}, "2B":{x:200,y:130}, "3B":{x:100,y:230},
  P:{x:200,y:220}, C:{x:200,y:345},
  "1Bf":{x:310,y:180}, "2Bf":{x:250,y:135}, SS:{x:150,y:135}, "3Bf":{x:90,y:180},
  LF:{x:62,y:100}, LC:{x:138,y:48}, RC:{x:262,y:48}, RF:{x:338,y:100},
  "past1B":{x:350,y:230}, "past3B":{x:50,y:230}, "pastHOME":{x:200,y:370}, "past2B":{x:200,y:90},
};

const SCENARIOS = [
  {id:1, category:"Backing Up Overthrows", situation:"Runner on 1st. Ground ball to shortstop. The throw to 1st base goes wild!", question:"You're the RIGHT FIELDER. What do you do?", runners:["1B"], yourPosition:"RF", emoji:"🏃", ballPath:[{from:"HOME", to:"SS", type:"hit"},{from:"SS", to:"past1B", type:"overthrow"}], options:[{text:"Stay in right field and watch", correct:false, feedback:"We need you closer! Always back up 1st base on throws from the infield."},{text:"Run to back up 1st base", correct:true, feedback:"YES! Right fielders always back up 1st base on infield throws. Great hustle!"},{text:"Run to cover 2nd base", correct:false, feedback:"Good thinking about 2nd, but backing up 1st base is your #1 job on this play."}]},
  {id:2, category:"Backing Up Overthrows", situation:"Runner on 2nd. Ground ball to the 3rd baseman. The 3rd baseman throws to 1st, but the throw sails past the 1st baseman!", question:"You're the RIGHT FIELDER. What do you do?", runners:["2B"], yourPosition:"RF", emoji:"⚡", ballPath:[{from:"HOME", to:"3Bf", type:"hit"},{from:"3Bf", to:"past1B", type:"overthrow"}], options:[{text:"Stay in right field and watch", correct:false, feedback:"The ball got past 1st base. if nobody is there, the runner could take extra bases! Always hustle to back up!"},{text:"Run to back up 1st base", correct:true, feedback:"Awesome! Right fielders always back up 1st base on overthrows from the infield. Great hustle!"},{text:"Run to cover 2nd base", correct:false, feedback:"The throw went to 1st base, so that's where you need to back up!"}]},
  {id:3, category:"Backing Up Overthrows", situation:"Runner on 1st. Ground ball to 3rd baseman. The 3rd baseman throws to 2nd for the force, but the throw gets past the shortstop covering 2nd!", question:"You're the RIGHT CENTER FIELDER. What do you do?", runners:["1B"], yourPosition:"RC", emoji:"🎯", ballPath:[{from:"HOME", to:"3Bf", type:"hit"},{from:"3Bf", to:"past2B", type:"overthrow"}], options:[{text:"Run to back up 2nd base", correct:true, feedback:"That's it! The throw got past 2nd base and you're the closest outfielder. You need to back it up to stop runners from taking extra bases!"},{text:"Stay where you are", correct:false, feedback:"If the ball gets past everyone, the runners could advance! Always hustle in to back up the play!"},{text:"Run to back up 3rd base", correct:false, feedback:"The throw went to 2nd base, not 3rd. Always back up the base where the ball is being thrown!"}]},
  {id:4, category:"Backing Up Overthrows", situation:"Runner on 2nd. Ground ball to 2nd baseman. The throw to 1st is on target, but the 1st baseman drops it!", question:"You're the RIGHT FIELDER. Where should you already be?", runners:["2B"], yourPosition:"RF", emoji:"👏", ballPath:[{from:"HOME", to:"2Bf", type:"hit"},{from:"2Bf", to:"1B", type:"throw"}], options:[{text:"Standing in right field", correct:false, feedback:"You should have been moving the moment the ball was hit! Always back up 1st base."},{text:"Behind 1st base, ready to grab the dropped ball", correct:true, feedback:"PERFECT! You were already backing up because you started running as soon as the ball was hit to the infield!"},{text:"Running toward 2nd base", correct:false, feedback:"The throw is going to 1st base. that's where you need to be backing up!"}]},
  {id:5, category:"Backing Up Overthrows", situation:"Runner on 3rd. Fly ball to left field. The runner tags up and the left fielder throws home!", question:"You're the PITCHER. What's your job?", runners:["3B"], yourPosition:"P", emoji:"🛡️", ballPath:[{from:"HOME", to:"LF", type:"hit"},{from:"LF", to:"HOME", type:"throw"}], options:[{text:"Go back to the mound and get ready", correct:false, feedback:"Not yet! There's a play happening at home plate that needs backup!"},{text:"Back up home plate behind the catcher", correct:true, feedback:"Smart play! The pitcher backs up home plate on throws from the outfield. If the ball gets past the catcher, you're the last line of defense!"},{text:"Cover 1st base", correct:false, feedback:"Nobody is running to 1st right now. the action is at home plate!"}]},
  {id:6, category:"Base Running", situation:"You're on 2nd base. The batter hits a ground ball to the shortstop.", question:"What should you do?", runners:["2B"], yourPosition:null, emoji:"🧠", ballPath:[{from:"HOME", to:"SS", type:"hit"}], options:[{text:"Run to 3rd as fast as you can", correct:false, feedback:"Careful! The shortstop is right there and could tag you or throw you out easily."},{text:"Stay close to 2nd and wait to see what happens", correct:true, feedback:"Smart! On a ground ball hit near you, stay close to your base and read the play. Don't run into an out!"},{text:"Run back to 1st base", correct:false, feedback:"You can't go backwards to a base you already passed! Stay near 2nd."}]},
  {id:7, category:"Fielding Positions", situation:"Nobody on base. Ground ball hit to the 3rd baseman who throws to 1st.", question:"You're the PITCHER. Where do you go after the pitch?", runners:[], yourPosition:"P", emoji:"⚾", ballPath:[{from:"HOME", to:"3Bf", type:"hit"},{from:"3Bf", to:"1Bf", type:"throw"}], options:[{text:"Stay on the mound", correct:false, feedback:"You need to move! Pitchers have a job on every play."},{text:"Run to cover the area between home and 1st base", correct:true, feedback:"Yes! Pitchers break toward 1st base on ground balls to the right side, and back up throws on the left side. Always be moving!"},{text:"Run to back up 3rd base", correct:false, feedback:"The 3rd baseman already has the ball. Think about where the throw is going!"}]},
  {id:8, category:"Backing Up Overthrows", situation:"Runner on 1st and 2nd. The batter hits a single to right field. The right fielder throws to 3rd base!", question:"You're the LEFT FIELDER. What do you do?", runners:["1B","2B"], yourPosition:"LF", emoji:"💪", ballPath:[{from:"HOME", to:"RF", type:"hit"},{from:"RF", to:"3B", type:"throw"}], options:[{text:"Stay in left field and watch the play", correct:false, feedback:"Never just watch! If that throw gets past 3rd, someone needs to be there!"},{text:"Run to back up 3rd base", correct:true, feedback:"Heads-up play! Left fielders back up 3rd base on throws from right field. You could save the game!"},{text:"Run to cover 2nd base", correct:false, feedback:"The shortstop or 2nd baseman can cover 2nd. You need to back up where the throw is going. 3rd base!"}]},
  {id:9, category:"Backing Up Overthrows", situation:"Runners on 1st and 3rd. Ground ball to shortstop. The shortstop throws to 2nd for the force, but the throw gets past the 2nd baseman!", question:"You're the RIGHT CENTER FIELDER. What should you be doing?", runners:["1B","3B"], yourPosition:"RC", emoji:"🌟", ballPath:[{from:"HOME", to:"SS", type:"hit"},{from:"SS", to:"past2B", type:"overthrow"}], options:[{text:"Stay where you are since it's an infield play", correct:false, feedback:"The throw got past 2nd base. if nobody backs it up, runners will advance! Always hustle in!"},{text:"Run to back up 2nd base", correct:true, feedback:"That's the play! When a throw goes to 2nd base, outfielders nearby need to back it up. You stopped the runner from scoring!"},{text:"Run to back up 3rd base", correct:false, feedback:"The throw went to 2nd base, not 3rd. Always back up the base where the ball is being thrown!"}]},
  {id:10, category:"Game Smarts", situation:"There's a pop fly hit high in the air between you and another fielder.", question:"What's the MOST important thing to do?", runners:[], yourPosition:null, emoji:"📢", ballPath:[{from:"HOME", to:{x:200,y:160}, type:"hit"}], options:[{text:"Just let the other person get it", correct:false, feedback:"What if they think the same thing? Someone needs to call it!"},{text:"Yell 'BALL! BALL! BALL!' loud and clear", correct:true, feedback:"YES! Communication wins games! Yell 'BALL!' to call off other players so everyone knows you've got it. If you hear someone else call it, back off and let them have it."},{text:"Both try to catch it at the same time", correct:false, feedback:"That's how collisions happen! Always communicate. one person calls it, the other backs up."}]},
  {id:11, category:"Base Running", situation:"You're on 1st base. The batter hits a ground ball to the 2nd baseman.", question:"What should you do?", runners:["1B"], yourPosition:null, emoji:"🧠", ballPath:[{from:"HOME", to:"2Bf", type:"hit"}], options:[{text:"Stay on 1st base", correct:false, feedback:"You have to run! It's a force play. the defense can just step on 2nd base to get you out. You MUST run to 2nd!"},{text:"Run to 2nd base because it's a force play", correct:true, feedback:"That's right! With a runner on 1st, you're FORCED to run to 2nd when the ball is hit on the ground. Run hard!"},{text:"Run back toward home plate", correct:false, feedback:"You can't run backwards! You have to go forward to 2nd base on a ground ball."}]},
  {id:12, category:"Base Running", situation:"You're on 2nd base with no outs. The batter hits a fly ball to right field.", question:"What should you do?", runners:["2B"], yourPosition:null, emoji:"🧠", ballPath:[{from:"HOME", to:"RF", type:"hit"}], options:[{text:"Run to 3rd right away", correct:false, feedback:"If the fielder catches it and you've left 2nd, you could be doubled off! Wait to see if it's caught first."},{text:"Go halfway between 2nd and 3rd and watch", correct:true, feedback:"Smart! On a fly ball, go halfway so you can tag up if it's caught, or keep running if it drops!"},{text:"Stay on 2nd base no matter what", correct:false, feedback:"You should get partway to 3rd so you're ready. If the ball drops, you want to advance!"}]},
  {id:13, category:"Base Running", situation:"You're on 3rd base with less than 2 outs. A fly ball is hit deep to left field.", question:"What should you do?", runners:["3B"], yourPosition:null, emoji:"🧠", ballPath:[{from:"HOME", to:"LF", type:"hit"}], options:[{text:"Run home right away", correct:false, feedback:"If the fielder catches it, you'll be doubled off! You need to wait on the base."},{text:"Go back to 3rd base and get ready to tag up", correct:true, feedback:"Yes! Touch 3rd base and as soon as the fielder catches it, run home! That's called tagging up."},{text:"Stay halfway between 3rd and home", correct:false, feedback:"On a deep fly ball with less than 2 outs, you should tag up at 3rd so you can score after the catch!"}]},
  {id:14, category:"Base Running", situation:"You're on 1st base. The batter hits a fly ball to the left fielder who catches it.", question:"What do you do?", runners:["1B"], yourPosition:null, emoji:"🧠", ballPath:[{from:"HOME", to:"LF", type:"hit"}], options:[{text:"Keep running to 2nd base", correct:false, feedback:"The ball was caught. that's an out! If you're off the base, they can throw to 1st to double you off!"},{text:"Get back to 1st base as fast as you can", correct:true, feedback:"Correct! When a fly ball is caught, you need to get back to your base before the ball gets there or you're out!"},{text:"Run to the dugout since the batter is out", correct:false, feedback:"Only the batter is out! You're still a runner. get back to 1st base before they throw it there!"}]},
  {id:15, category:"Backing Up Overthrows", situation:"Nobody on base. Ground ball to shortstop. The throw to 1st goes wild!", question:"You're the RIGHT FIELDER. What do you do?", runners:[], yourPosition:"RF", emoji:"🏃", ballPath:[{from:"HOME", to:"SS", type:"hit"},{from:"SS", to:"past1B", type:"overthrow"}], options:[{text:"Stay in right field and watch", correct:false, feedback:"The ball got past 1st base! If nobody backs it up, the batter could take extra bases!"},{text:"Run to back up 1st base", correct:true, feedback:"Great hustle! Right fielders ALWAYS back up 1st base on infield throws, even with nobody on base!"},{text:"Run to cover 2nd base", correct:false, feedback:"First, back up 1st base where the throw is going. That's your #1 job!"}]},
  {id:16, category:"Backing Up Overthrows", situation:"Runner on 1st. Ground ball to 2nd baseman. The 2nd baseman flips to shortstop at 2nd for the force, but the flip goes wide!", question:"You're the LEFT CENTER FIELDER. What do you do?", runners:["1B"], yourPosition:"LC", emoji:"⚡", ballPath:[{from:"HOME", to:"2Bf", type:"hit"},{from:"2Bf", to:"past2B", type:"overthrow"}], options:[{text:"Stay where you are", correct:false, feedback:"The ball got past 2nd base! If nobody is there, the runner could go all the way to 3rd or home!"},{text:"Run to back up 2nd base", correct:true, feedback:"Perfect! The flip went toward your side of the field. You need to back up 2nd base to stop runners from advancing!"},{text:"Run to back up 1st base", correct:false, feedback:"The ball went past 2nd base, not 1st. Always back up the base where the ball is going!"}]},
  {id:17, category:"Game Smarts", situation:"You catch a ground ball in the infield with a runner on 1st and 1 out.", question:"Where should you throw the ball?", runners:["1B"], yourPosition:null, emoji:"🧠", ballPath:[{from:"HOME", to:"SS", type:"hit"}], options:[{text:"Throw to 2nd base for the force out", correct:true, feedback:"That's right! Get the lead runner. a quick toss to 2nd base (or step on the bag if you're the shortstop) gets the go-ahead runner out. That's always the priority!"},{text:"Throw to 1st base to get the batter out", correct:false, feedback:"You could get the out at 1st, but the lead runner at 2nd is the priority! A quick toss to 2nd gets the more dangerous runner."},{text:"Hold onto the ball", correct:false, feedback:"You need to make a throw! Every second counts. get the lead runner at 2nd!"}]},
  {id:18, category:"Game Smarts", situation:"You're playing right center field. A base hit goes between you and the right fielder.", question:"Who should field the ball?", runners:[], yourPosition:"RC", emoji:"📢", ballPath:[{from:"HOME", to:{x:300,y:90}, type:"hit"}], options:[{text:"Let the right fielder get it since it's closer to them", correct:false, feedback:"Don't assume! You both need to go after it, and whoever is closest calls for it!"},{text:"Both go after it and the closest one yells 'BALL! BALL! BALL!'", correct:true, feedback:"That's it! Both players run hard to the ball, and the one who gets there first calls 'BALL!' to call off the other player. The other player backs them up!"},{text:"Stop and wait to see what happens", correct:false, feedback:"Never stop! Always run hard to the ball. Every second matters!"}]},
  {id:19, category:"Base Running", situation:"You're on 1st base. The batter hits a ground ball right at the 1st baseman.", question:"What should you do?", runners:["1B"], yourPosition:null, emoji:"🧠", ballPath:[{from:"HOME", to:"1Bf", type:"hit"}], options:[{text:"Stay on 1st base", correct:false, feedback:"You can't stay! It's a force play. the 1st baseman can just step on the bag to get you out. Run to 2nd!"},{text:"Run hard to 2nd base", correct:true, feedback:"Correct! You're forced to run on a ground ball. Run hard to 2nd. you have to go no matter where the ball is hit!"},{text:"Run back toward home plate", correct:false, feedback:"You can never run backwards to a base you already passed! Go to 2nd!"}]},
  {id:20, category:"Base Running", situation:"You're on 2nd base. The batter hits a single into right field.", question:"What should you do?", runners:["2B"], yourPosition:null, emoji:"🏃", ballPath:[{from:"HOME", to:"RF", type:"hit"}], options:[{text:"Stay on 2nd base to be safe", correct:false, feedback:"On a base hit, you should be running! A single to right field means you can probably score!"},{text:"Run to 3rd and look at your coach for the sign to go home", correct:true, feedback:"Yes! Run hard to 3rd and look at your 3rd base coach. They'll wave you home or tell you to stop. Always listen to your coaches!"},{text:"Run straight home without looking", correct:false, feedback:"Don't put your head down! Round 3rd and look at your coach. they can see where the ball is and will tell you to go or stop!"}]},
  {id:21, category:"Base Running", situation:"You just hit the ball into the outfield. You're running to 1st base.", question:"Should you run straight to 1st base or round it?", runners:[], yourPosition:null, emoji:"🏃", ballPath:[{from:"HOME", to:"LF", type:"hit"}], options:[{text:"Run straight to 1st and stop on the bag", correct:false, feedback:"If the ball is in the outfield, you might be able to get to 2nd! Don't just stop!"},{text:"Round 1st base and look to see if you can go to 2nd", correct:true, feedback:"That's it! Hit the inside corner of 1st base, round it, and look at your coach and the ball. If you can make it to 2nd, keep going!"},{text:"Run past 1st base into right field", correct:false, feedback:"Round the base toward 2nd, not into the field! Touch the inside corner and curve toward 2nd."}]},
  {id:22, category:"Base Running", situation:"You hit a ground ball to the infield. You're running to 1st base.", question:"How should you run through 1st base?", runners:[], yourPosition:null, emoji:"🏃", ballPath:[{from:"HOME", to:"SS", type:"hit"}], options:[{text:"Slow down before you get to the bag", correct:false, feedback:"Never slow down! Run full speed all the way through the bag!"},{text:"Run full speed straight through the bag", correct:true, feedback:"Yes! On a ground ball to the infield, run full speed THROUGH 1st base. Don't slow down, don't round it. just sprint straight through!"},{text:"Slide into 1st base", correct:false, feedback:"Don't slide into 1st! It actually slows you down. Run full speed through the bag!"}]},
  {id:23, category:"Fielding Positions", situation:"You're the pitcher. After you throw the pitch, the batter hits a ground ball to the 1st baseman.", question:"Where do you go?", runners:[], yourPosition:"P", emoji:"⚾", ballPath:[{from:"HOME", to:"1Bf", type:"hit"}], options:[{text:"Stay on the mound", correct:false, feedback:"The 1st baseman has to leave the bag to field the ball! Someone needs to cover 1st base!"},{text:"Run to cover 1st base", correct:true, feedback:"That's right! When the 1st baseman fields the ball, the pitcher MUST run over to cover 1st base so the 1st baseman can toss you the ball for the out!"},{text:"Run to back up home plate", correct:false, feedback:"No play at home right now. The 1st baseman needs you to cover 1st base!"}]},
  {id:24, category:"Fielding Positions", situation:"Runner on 1st. Ground ball to the shortstop who throws to 2nd for the force out.", question:"You're the 2ND BASEMAN. What's your job?", runners:["1B"], yourPosition:"2B", emoji:"⚾", ballPath:[{from:"HOME", to:"SS", type:"hit"},{from:"SS", to:"2B", type:"throw"}], options:[{text:"Stay at your position", correct:false, feedback:"The throw is going to 2nd base! Someone needs to be there to catch it!"},{text:"Run to cover 2nd base to receive the throw", correct:true, feedback:"Exactly! On a ground ball to the shortstop, the 2nd baseman covers the bag at 2nd to receive the throw for the force out!"},{text:"Run to back up 1st base", correct:false, feedback:"The shortstop is throwing to 2nd, not 1st! You need to be at 2nd base to catch the throw!"}]},
  {id:25, category:"Fielding Positions", situation:"Runner on 2nd. The batter hits a single to left field.", question:"You're the SHORTSTOP. Where should you be?", runners:["2B"], yourPosition:"SS", emoji:"⚾", ballPath:[{from:"HOME", to:"LF", type:"hit"}], options:[{text:"Run out to help the left fielder", correct:false, feedback:"The left fielder has the ball. You need to be in position to receive a throw or relay!"},{text:"Go to the cutoff position between the outfielder and home plate", correct:true, feedback:"Great instinct! The shortstop is the cutoff. Line up between the left fielder and home plate so you can catch the throw and relay it home if needed!"},{text:"Cover 2nd base", correct:false, feedback:"The runner already left 2nd. You need to get in the cutoff position to help relay the throw from the outfield!"}]},
  {id:26, category:"Fielding Positions", situation:"Nobody on base. The batter hits a fly ball to left center field.", question:"You're the SHORTSTOP. What should you do?", runners:[], yourPosition:"SS", emoji:"⚾", ballPath:[{from:"HOME", to:"LC", type:"hit"}], options:[{text:"Go out to shallow left field in case the ball drops", correct:true, feedback:"Yes! Go out as the relay. If the outfielder catches it, great. If they miss, you're there to back them up or relay the throw to the infield!"},{text:"Stay at your position and wait", correct:false, feedback:"Don't stand still! Get into position to help. go out toward the ball as the relay or backup!"},{text:"Cover 2nd base", correct:false, feedback:"With nobody on base, getting in relay position is more important. Go toward the ball to help!"}]},
  {id:27, category:"Game Smarts", situation:"There are 2 outs and a runner on 3rd. A ground ball is hit to you at shortstop.", question:"Where do you throw?", runners:["3B"], yourPosition:"SS", emoji:"🧠", ballPath:[{from:"HOME", to:"SS", type:"hit"}], options:[{text:"Throw home to get the runner", correct:false, feedback:"With 2 outs, you don't need to stop the run. just get the batter out! Throw to 1st for the easy 3rd out!"},{text:"Throw to 1st base for the 3rd out", correct:true, feedback:"Smart! With 2 outs, the easiest play is to get the batter at 1st. That ends the inning and the run doesn't count!"},{text:"Throw to 3rd base", correct:false, feedback:"The runner already left 3rd! Throw to 1st to get the 3rd out and end the inning!"}]},
  {id:28, category:"Game Smarts", situation:"A ground ball is hit right at you. It takes a bad hop and bounces up toward your face.", question:"What's the MOST important thing to do?", runners:[], yourPosition:null, emoji:"🛡️", ballPath:[{from:"HOME", to:"SS", type:"hit"}], options:[{text:"Turn your head away", correct:false, feedback:"If you turn away, you lose the ball! Use your glove to protect yourself while keeping your eyes on it."},{text:"Block the ball with your body and keep it in front of you", correct:true, feedback:"That's right! Knock it down and keep it in front of you. Even if you don't catch it cleanly, you can still pick it up and make the throw!"},{text:"Jump out of the way", correct:false, feedback:"If you jump away, the ball goes past you and runners advance! Be tough. block it and keep it in front!"}]},
  {id:29, category:"Game Smarts", situation:"You're in the outfield and you field a ground ball base hit with a runner on 1st.", question:"What do you do with the ball?", runners:["1B"], yourPosition:"LF", emoji:"🧠", ballPath:[{from:"HOME", to:"LF", type:"hit"}], options:[{text:"Throw it as hard as you can toward home plate", correct:false, feedback:"The runner from 1st is probably only going to 2nd or 3rd. Don't throw to a base where there's no play!"},{text:"Hit the cutoff man with a quick, accurate throw", correct:true, feedback:"Yes! Get the ball to your cutoff man fast and accurate. They can see the whole field and will relay it to the right base!"},{text:"Hold the ball and run it in", correct:false, feedback:"Running it in takes too long! Throw to the cutoff man. every second matters when runners are moving!"}]},
  {id:30, category:"Game Smarts", situation:"You're playing 1st base. The pitcher is pitching and you have a runner on 1st.", question:"Where should you stand before the pitch?", runners:["1B"], yourPosition:"1B", emoji:"🧠", ballPath:[], options:[{text:"Stand right on the bag to keep the runner close", correct:false, feedback:"At 8U you don't need to hold runners on. Get in your fielding position so you're ready for a ground ball!"},{text:"Stand in your normal fielding position, ready for the ball", correct:true, feedback:"That's right! At 8U there's no leading off or stealing, so don't worry about holding the runner. Be in your fielding spot, ready to make a play!"},{text:"Stand behind the runner so they can't see you", correct:false, feedback:"Get in your fielding position! You need to be ready to field a ground ball, not watching the runner."}]},
  {id:31, category:"Fielding Positions", situation:"The ball is hit to the right fielder with runners on base.", question:"You're the 2ND BASEMAN. Where should you go?", runners:["1B"], yourPosition:"2B", emoji:"⚾", ballPath:[{from:"HOME", to:"RF", type:"hit"}], options:[{text:"Stay at your position", correct:false, feedback:"When the ball is hit to the outfield, you need to move! Get into position to receive a throw!"},{text:"Go to the cutoff position between right field and the infield", correct:true, feedback:"Yes! The 2nd baseman is the cutoff for throws from right field. Line up to receive the throw and relay it where it needs to go!"},{text:"Cover 1st base", correct:false, feedback:"The 1st baseman covers 1st. You need to get in the cutoff position to help relay the throw from right field!"}]}
];

const FIELDERS = [
  {label:"P",x:200,y:220},{label:"C",x:200,y:345},{label:"1B",x:300,y:230},
  {label:"2B",x:240,y:140},{label:"SS",x:160,y:140},{label:"3B",x:100,y:230},
  {label:"LF",x:60,y:110},{label:"LC",x:140,y:60},{label:"RC",x:260,y:60},{label:"RF",x:340,y:110}
];

function buildDiamond(runners=[], yourPosition=null, ballPath=[]) {
  function rp(p) { return (typeof p==="object") ? p : (POS[p]||{x:200,y:200}); }
  let s = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">`;
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

  runners.forEach(r => {
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
    s += `<text x="${f.x}" y="${f.y+4}" text-anchor="middle" fill="#fff" font-size="10" font-weight="800" font-family="sans-serif">${f.label}</text>`;
  }
  return s + `</svg>`;
}

// ============ ENGINE ============
const sounds = {
  hit: new Audio('sounds/hit.mp3'),
  strike: new Audio('sounds/strike.m4a'),
  jackson: new Audio('sounds/jackson.m4a')
};

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
  
  if (sounds.jackson) { sounds.jackson.pause(); sounds.jackson.currentTime = 0; }
  
  const name = $("player-name").value.trim().toLowerCase();
  if (name === "jackson") sounds.jackson.play();
  
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
  
  // Kill the intro song immediately when an answer is selected
  if (sounds.jackson) { sounds.jackson.pause(); sounds.jackson.currentTime = 0; }

  const isCorrect = btn.dataset.correct === "true";
  document.querySelectorAll(".option-btn").forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === "true") b.style.borderColor = "var(--green)";
  });
  
  if (isCorrect) { 
    sounds.hit.currentTime = 0;
    sounds.hit.play(); 
    score++; streak++; 
    if (streak > bestStreak) bestStreak = streak;
  } else { 
    sounds.strike.currentTime = 0;
    sounds.strike.play(); 
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

// Ensure listeners are correctly attached
$("start-btn").addEventListener("click", startGame);
$("next-btn").addEventListener("click", () => {
  if (currentQ + 1 >= questions.length) {
    showResults();
  } else {
    currentQ++;
    renderQuestion();
  }
});

$("play-again-btn").addEventListener("click", () => {
  startGame();
});

$("main-menu-btn").addEventListener("click", () => {
  showScreen("menu-screen");
  initMenu();
});

$("quit-btn").addEventListener("click", () => {
  if (sounds.jackson) { sounds.jackson.pause(); sounds.jackson.currentTime = 0; }
  showScreen("menu-screen");
  initMenu();
});

initMenu();
