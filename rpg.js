var music = new Audio("Veiled-in-Black.mp3");

function startMusic() {
  music = document.getElementById("myMusic");
  music.play();
}
function musicPause() {
  music = document.getElementById("myMusic");
  music.pause();
}

const playerHealth = document.getElementById("player-hp");
const monsterHealth = document.getElementById("monster-hp");
const sp = document.getElementById("max-sp");
const playerDamage = document.getElementById("player-damage");
const monsterDamage = document.getElementById("monster-damage");
const recovery = document.getElementById("recovery");
const noSkillPoints = document.getElementById("no-skill-points");
const playerAttack = document.getElementById("player-atak");
const playerSkill1 = document.getElementById("player-skill1");
const playerSkill2 = document.getElementById("player-skill2");
const playerSkill3 = document.getElementById("player-skill3");
const playerSkill4 = document.getElementById("player-skill4");
const victory = document.getElementById("win-game");
const loseGame = document.getElementById("gm-over");
const restartGame = document.querySelector("#resetBtn");
const hpColor = document.getElementById("pl-color");
let playerHp = 100;
let monsterHp = 1000;
let skillPoints = 5;

gameData();
restartGame.addEventListener("click", resetGame);

function gameData() {
  attack();
  skill1Dmg();
  skill2Dmg();
  skill3Dmg();
  HealValue();
}

function maxMonsterHp() {
  if (monsterHp <= 0) {
    monsterHp = 0;
  }
  monsterHealth.innerHTML = `Monster HP: ${monsterHp}`;
  if (monsterHp <= 0) {
    victory.classList.add("opacity-visible");
  }
}

function calculateDmg(min, max) {
  dmgCalc = Math.round(Math.random() * (max - min)) + min;
  return dmgCalc;
}

function attack() {
  let playerDmg;

  playerAttack.addEventListener("click", () => {
    playerDmg = calculateDmg(5, 20);
    monsterHp -= playerDmg;
    skillPoints++;
    sp.innerHTML = `SP: ${skillPoints}`;

    playerDamage.innerHTML = `Player dmg: ${playerDmg}`;
    playerDamage.classList.add("opacity-visible");
    setTimeout(() => {
      playerDamage.classList.remove("opacity-visible");
    }, 1000);

    maxMonsterHp();
    setTimeout(() => {
      calculateMonsterDmg();
    }, 500);
  });
}

function skill1Dmg() {
  let playerDmg;

  playerSkill1.addEventListener("click", () => {
    if (skillPoints <= 0) {
      noSkillPoints.classList.add("opacity-visible");
      setTimeout(() => {
        noSkillPoints.classList.remove("opacity-visible");
      }, 1000);
      return;
    } else {
      skillPoints--;
    }
    sp.innerHTML = `SP: ${skillPoints}`;

    playerDmg = calculateDmg(20, 50);

    playerDamage.innerHTML = `Player dmg: ${playerDmg}`;
    playerDamage.classList.add("opacity-visible");
    setTimeout(() => {
      playerDamage.classList.remove("opacity-visible");
    }, 1000);

    monsterHp -= playerDmg;

    maxMonsterHp();
    setTimeout(() => {
      calculateMonsterDmg();
    }, 500);
  });
}

function skill2Dmg() {
  let playerDmg;

  playerSkill2.addEventListener("click", () => {
    if (skillPoints <= 1) {
      noSkillPoints.classList.add("opacity-visible");
      setTimeout(() => {
        noSkillPoints.classList.remove("opacity-visible");
      }, 1000);
      return;
    } else {
      skillPoints -= 2;
    }
    sp.innerHTML = `SP: ${skillPoints}`;

    playerDmg = calculateDmg(50, 100);

    playerDamage.innerHTML = `Player dmg: ${playerDmg}`;
    playerDamage.classList.add("opacity-visible");
    setTimeout(() => {
      playerDamage.classList.remove("opacity-visible");
    }, 1000);

    monsterHp -= playerDmg;
    maxMonsterHp();
    setTimeout(() => {
      calculateMonsterDmg();
    }, 500);
  });
}

function skill3Dmg() {
  let playerDmg;

  playerSkill3.addEventListener("click", () => {
    if (skillPoints <= 2) {
      noSkillPoints.classList.add("opacity-visible");
      setTimeout(() => {
        noSkillPoints.classList.remove("opacity-visible");
      }, 1000);
      return;
    } else {
      skillPoints -= 3;
    }
    sp.innerHTML = `SP: ${skillPoints}`;

    playerDmg = calculateDmg(100, 200);

    playerDamage.innerHTML = `Player dmg: ${playerDmg}`;
    playerDamage.classList.add("opacity-visible");
    setTimeout(() => {
      playerDamage.classList.remove("opacity-visible");
    }, 1000);

    monsterHp -= playerDmg;
    maxMonsterHp();
    setTimeout(() => {
      calculateMonsterDmg();
    }, 500);
  });
}

function HealValue() {
  const min = 40;
  const max = 70;
  let healingSkill;

  playerSkill4.addEventListener("click", () => {
    healingSkill = Math.round(Math.random() * (max - min)) + min;

    if (skillPoints <= 0) {
      noSkillPoints.classList.add("opacity-visible");
      setTimeout(() => {
        noSkillPoints.classList.remove("opacity-visible");
      }, 1000);
      return;
    } else {
      skillPoints--;
      recovery.innerHTML = `Recovered: ${healingSkill} hp`;
      recovery.classList.add("opacity-visible");
      setTimeout(() => {
        recovery.classList.remove("opacity-visible");
      }, 1000);
    }
    sp.innerHTML = `SP: ${skillPoints}`;

    playerHp += healingSkill;

    if (playerHp > 100) {
      playerHp = 100;
    }

    playerHealth.innerHTML = `Player HP: ${playerHp}`;
  });
}

function calculateMonsterDmg() {
  let monsterAttack;

  monsterAttack = calculateDmg(10, 30);
  playerHp -= monsterAttack;

  monsterDamage.innerHTML = `Monster damage: ${monsterAttack}`;
  monsterDamage.classList.add("opacity-visible");
  setTimeout(() => {
    monsterDamage.classList.remove("opacity-visible");
  }, 1000);

  if (playerHp <= 0) {
    playerHp = 0;
  }

  playerHealth.innerHTML = `Player HP: ${playerHp}`;
  if (playerHp <= 0) {
    loseGame.classList.add("opacity-visible");
  }
}

function resetGame() {
  playerHp = 100;
  monsterHp = 1000;
  skillPoints = 5;

  playerHealth.innerHTML = `Player HP: ${playerHp}`;
  monsterHealth.innerHTML = `Monster HP: ${monsterHp}`;
  sp.innerHTML = `SP: ${skillPoints}`;
  loseGame.classList.remove("opacity-visible");
  victory.classList.remove("opacity-visible");
}
