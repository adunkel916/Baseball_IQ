// ============ DATA ============
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
      {text:"Run to cover 2nd base", correct:false, feedback:"The shortstop or 2nd baseman can cover 2nd.
