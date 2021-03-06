/***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
var _$_5750 = [
  "Gamee",
  "CANVAS",
  "DonaldsWall",
  "Game",
  "undefined",
  "type",
  "gamee-unknown",
  "score",
  "Dead",
  "restart",
  "start",
  "resume",
  "gameStart",
  "visible",
  "destroy",
  "InGame",
  "antialias",
  "clearBeforeRender",
  "preserveDrawingBuffer",
  "desiredFps",
  "time",
  "scaleMode",
  "scale",
  "USER_SCALE",
  "ScaleManager",
  "pageAlignHorizontally",
  "pageAlignVertically",
  "forceSingleUpdate",
  "init",
  "loading_01",
  "assets/loading/loading_01.png",
  "image",
  "load",
  "canonSpring",
  "assets/pics/DonaldsWall_PRUZINA.png",
  "fist",
  "assets/pics/DonaldsWall_BOXERKA_RUKAVICE.png",
  "setOneKeyInputMethod",
  "LoadingState",
  "add",
  "state",
  "preload",
  "prototype",
  "backgroundColor",
  "stage",
  "#fff",
  "width",
  "setTo",
  "anchor",
  "x",
  "angle",
  "tileSprite",
  "onLoadComplete",
  "assets/pics/DonaldsWall_UVOD.png",
  "finish",
  "assets/pics/DonaldsWall_ZAVER.png",
  "game_bg",
  "assets/pics/DonaldsWall_POZADI.png",
  "name",
  "assets/sprites/",
  "sprite",
  ".png",
  ".json",
  "atlas",
  "bullet",
  "assets/pics/DonaldsWall_MAFIAN_NABOJ.png",
  "wall",
  "assets/pics/DonaldsWall_zed.png",
  "wallDamaged",
  "assets/pics/DonaldsWall_zed_ponicena.png",
  "bubbleYeah",
  "assets/pics/DonaldsWall_KOMIX-BUBLINA_yeah.png",
  "bubbleYes",
  "assets/pics/DonaldsWall_KOMIX-BUBLINA_yes.png",
  "bubble01",
  "assets/pics/DonaldsWall_BUBLINA01.png",
  "bubble02",
  "assets/pics/DonaldsWall_BUBLINA02.png",
  "bubble03",
  "assets/pics/DonaldsWall_BUBLINA03.png",
  "trumpOff",
  "assets/pics/DonaldsWall_DONALD_01.png",
  "trumpOn",
  "assets/pics/DonaldsWall_DONALD_02.png",
  "trumpAngry",
  "assets/pics/DonaldsWall_DONALD_nastvany.png",
  "trumpSteam",
  "assets/sprites/DonaldsWall_DONALD_kour.png",
  "assets/sprites/DonaldsWall_DONALD_kour.json",
  "canonBase",
  "assets/pics/DonaldsWall_BOXERKA_STOJAN.png",
  "canon",
  "assets/pics/DonaldsWall_BOXERKA_DELO.png",
  "stars",
  "assets/pics/DonaldsWall_HVEZDICKY.png",
  "length",
  "assets/sounds/",
  "file",
  ".mp3",
  ".ogg",
  "audio",
  "hitWall",
  "assets/sounds/hit_wall.mp3",
  "assets/sounds/hit_wall.ogg",
  "music",
  "assets/sounds/a-spanish-affair.mp3",
  "assets/sounds/a-spanish-affair.ogg",
  "loadUpdate",
  "progress",
  "height",
  "create",
  "ARCADE",
  "Physics",
  "startSystem",
  "physics",
  "setBoundsToWorld",
  "setBounds",
  "world",
  "gameLoaded",
  "LaunchScreen",
  "bringToTop",
  "Ready",
  "gamee-mobile",
  "shoot",
  "update",
  "y",
  "position",
  "pause",
  "makeTrumpAngry",
  "removeEnemies",
  "removeBonus",
  "gameOver",
  "render",
  "debug",
  "group",
  "fixedToCamera",
  "mainMenu",
  "addMenu",
  "menuManager",
  "gameMenu",
  "gameEndedMenu",
  "windowSize",
  "min",
  "setUserScale",
  "setResizeCallback",
  "onfocus",
  "onblur",
  "onMute",
  "mute",
  "onUnmute",
  "unmute",
  "onPause",
  "paused",
  "onUnpause",
  "onResume",
  "unlockAudio",
  "onRestart",
  "showMenu",
  "onStop",
];
var BUILD_TYPE = Implementation[_$_5750[0]];
var GAME_WIDTH = 640;
var GAME_HEIGHT = 640;
var game = new Phaser[_$_5750[3]](
  GAME_WIDTH,
  GAME_HEIGHT,
  Phaser[_$_5750[1]],
  _$_5750[2],
  { init: init, preload: preload, create: create }
);
var aldaEngine = new AldaEngine(game, BUILD_TYPE, _$_5750[2]);
var GAME_TYPE =
  typeof $gameeNative !== _$_5750[4] ? $gameeNative[_$_5750[5]] : _$_5750[6];
var GameState = { LaunchScreen: 0, Wait: 1, Ready: 2, InGame: 3, Dead: 4 };
var background;
var startBg;
var gameState;
var gameManager = new GameManager(game);
var audioEnabled = true;
var firstFocus = true;
var endImage = null;
function resetScore() {
  aldaEngine[_$_5750[7]] = 0;
}
function incScore() {
  aldaEngine[_$_5750[7]]++;
}
function startGame() {
  resetScore();
  resetGame = false;
  if (gameState === GameState[_$_5750[8]]) {
    gameManager[_$_5750[9]]();
  } else {
    gameManager[_$_5750[10]]();
  }
  aldaEngine[_$_5750[11]]();
  aldaEngine[_$_5750[12]]();
  if (endImage != null) {
    endImage[_$_5750[13]] = false;
    endImage[_$_5750[14]]();
    endImage = null;
  }
  gameState = GameState[_$_5750[15]];
}
function init() {
  game[_$_5750[16]] = false;
  game[_$_5750[17]] = false;
  game[_$_5750[18]] = false;
  game[_$_5750[20]][_$_5750[19]] = 45;
  game[_$_5750[22]][_$_5750[21]] = Phaser[_$_5750[24]][_$_5750[23]];
  game[_$_5750[22]][_$_5750[25]] = true;
  game[_$_5750[22]][_$_5750[26]] = true;
  game[_$_5750[27]] = false;
  initCallbacks();
  gameManager[_$_5750[28]]();
}
function preload() {
  game[_$_5750[32]][_$_5750[31]](_$_5750[29], _$_5750[30]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[33], _$_5750[34]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[35], _$_5750[36]);
  aldaEngine[_$_5750[37]](buttonDown, true, true);
}
function create() {
  game[_$_5750[40]][_$_5750[39]](_$_5750[38], LoadingState);
  game[_$_5750[40]][_$_5750[10]](_$_5750[38]);
}
var LoadingState = (function () {
  function LoadingState() {}
  return LoadingState;
})();
var lloadingFistX;
var loadingSpring, loadingFist;
LoadingState[_$_5750[42]][_$_5750[41]] = function () {
  game[_$_5750[44]][_$_5750[43]] = _$_5750[45];
  var cu = this[_$_5750[39]][_$_5750[31]](
    game[_$_5750[46]] / 2,
    480,
    _$_5750[29]
  );
  cu[_$_5750[48]][_$_5750[47]](0, 0.5);
  cu[_$_5750[49]] -= cu[_$_5750[46]] / 2;
  loadingFistX = game[_$_5750[46]] / 2 - 15;
  loadingFist = this[_$_5750[39]][_$_5750[31]](loadingFistX, 460, _$_5750[35]);
  loadingFist[_$_5750[50]] = 90;
  loadingSpring = this[_$_5750[39]][_$_5750[51]](
    game[_$_5750[46]] / 2 - 115,
    495,
    32,
    32,
    _$_5750[33]
  );
  loadingSpring[_$_5750[50]] = -90;
  this[_$_5750[32]][_$_5750[52]][_$_5750[39]](loadComplete, this);
  game[_$_5750[32]][_$_5750[31]](_$_5750[10], _$_5750[53]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[54], _$_5750[55]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[56], _$_5750[57]);
  game[_$_5750[32]][_$_5750[63]](
    enemy_type[0][_$_5750[58]],
    _$_5750[59] + enemy_type[0][_$_5750[60]] + _$_5750[61],
    _$_5750[59] + enemy_type[0][_$_5750[60]] + _$_5750[62]
  );
  game[_$_5750[32]][_$_5750[63]](
    enemy_type[1][_$_5750[58]],
    _$_5750[59] + enemy_type[1][_$_5750[60]] + _$_5750[61],
    _$_5750[59] + enemy_type[1][_$_5750[60]] + _$_5750[62]
  );
  game[_$_5750[32]][_$_5750[63]](
    enemy_type[2][_$_5750[58]],
    _$_5750[59] + enemy_type[2][_$_5750[60]] + _$_5750[61],
    _$_5750[59] + enemy_type[2][_$_5750[60]] + _$_5750[62]
  );
  game[_$_5750[32]][_$_5750[63]](
    enemy_type[3][_$_5750[58]],
    _$_5750[59] + enemy_type[3][_$_5750[60]] + _$_5750[61],
    _$_5750[59] + enemy_type[3][_$_5750[60]] + _$_5750[62]
  );
  game[_$_5750[32]][_$_5750[31]](_$_5750[64], _$_5750[65]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[66], _$_5750[67]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[68], _$_5750[69]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[70], _$_5750[71]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[72], _$_5750[73]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[74], _$_5750[75]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[76], _$_5750[77]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[78], _$_5750[79]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[80], _$_5750[81]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[82], _$_5750[83]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[84], _$_5750[85]);
  game[_$_5750[32]][_$_5750[63]](_$_5750[86], _$_5750[87], _$_5750[88]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[89], _$_5750[90]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[91], _$_5750[92]);
  game[_$_5750[32]][_$_5750[31]](_$_5750[93], _$_5750[94]);
  game[_$_5750[32]][_$_5750[63]](
    bonus_taco[_$_5750[58]],
    _$_5750[59] + bonus_taco[_$_5750[60]] + _$_5750[61],
    _$_5750[59] + bonus_taco[_$_5750[60]] + _$_5750[62]
  );
  game[_$_5750[32]][_$_5750[63]](
    bonus_hammer[_$_5750[58]],
    _$_5750[59] + bonus_hammer[_$_5750[60]] + _$_5750[61],
    _$_5750[59] + bonus_hammer[_$_5750[60]] + _$_5750[62]
  );
  game[_$_5750[32]][_$_5750[63]](
    bonus_star[_$_5750[58]],
    _$_5750[59] + bonus_star[_$_5750[60]] + _$_5750[61],
    _$_5750[59] + bonus_star[_$_5750[60]] + _$_5750[62]
  );
  for (var cb = 0; cb < audio_list[_$_5750[95]]; cb++) {
    game[_$_5750[32]][_$_5750[100]](audio_list[cb][_$_5750[58]], [
      _$_5750[96] + audio_list[cb][_$_5750[97]] + _$_5750[98],
      _$_5750[96] + audio_list[cb][_$_5750[97]] + _$_5750[99],
    ]);
  }
  game[_$_5750[32]][_$_5750[100]](_$_5750[101], [_$_5750[102], _$_5750[103]]);
  game[_$_5750[32]][_$_5750[100]](_$_5750[104], [_$_5750[105], _$_5750[106]]);
};
LoadingState[_$_5750[42]][_$_5750[107]] = function () {
  loadingFist[_$_5750[49]] =
    loadingFistX + game[_$_5750[32]][_$_5750[108]] * 1.3;
  loadingSpring[_$_5750[109]] = 32 + game[_$_5750[32]][_$_5750[108]] * 1.3;
};
function loadComplete(cZ, cY, Q, db, da) {
  startBg = game[_$_5750[39]][_$_5750[31]](0, 0, _$_5750[10]);
}
LoadingState[_$_5750[42]][_$_5750[110]] = function () {
  createMainMenu();
  createGameMenu();
  createEndedMenu();
  game[_$_5750[114]][_$_5750[113]](Phaser[_$_5750[112]][_$_5750[111]]);
  game[_$_5750[114]][_$_5750[115]](false, false, false, true);
  game[_$_5750[117]][_$_5750[116]](0, 0, GAME_WIDTH, GAME_HEIGHT);
  aldaEngine[_$_5750[118]]();
  gameState = GameState[_$_5750[119]];
};
function completeLoad() {
  background = game[_$_5750[39]][_$_5750[31]](0, 0, _$_5750[56]);
  gameManager[_$_5750[110]]();
  startBg[_$_5750[120]]();
  gameState = GameState[_$_5750[121]];
}
function cannotStartGame() {
  return firstFocus && GAME_TYPE == _$_5750[122];
}
function buttonDown() {
  if (cannotStartGame()) {
    firstFocus = false;
    return;
  }
  switch (gameState) {
    case GameState[_$_5750[119]]:
      completeLoad();
      startBg[_$_5750[13]] = false;
      startBg[_$_5750[14]]();
      startBg = null;
      startGame();
      break;
    case GameState[_$_5750[121]]:
      break;
    case GameState[_$_5750[15]]:
      gameManager[_$_5750[123]]();
      break;
  }
}
LoadingState[_$_5750[42]][_$_5750[124]] = function () {
  switch (gameState) {
    case GameState[_$_5750[15]]:
      gameManager[_$_5750[124]]();
      break;
    case GameState[_$_5750[8]]:
      break;
  }
};
function die(G) {
  if (G[_$_5750[126]][_$_5750[125]] < 0) {
    return;
  }
  if (gameState === GameState[_$_5750[8]]) {
    return;
  }
  gameManager[_$_5750[127]]();
  gameManager[_$_5750[128]]();
  gameState = GameState[_$_5750[8]];
}
function setEndTimer() {
  var dc = game[_$_5750[20]][_$_5750[110]](true);
  dc[_$_5750[39]](2000, gameOverScreen, this);
  dc[_$_5750[10]]();
  endGame();
}
function endGame() {
  endImage = game[_$_5750[39]][_$_5750[31]](0, 0, _$_5750[54]);
  gameManager[_$_5750[129]]();
  gameManager[_$_5750[130]]();
}
function gameOverScreen() {
  aldaEngine[_$_5750[131]]();
}
LoadingState[_$_5750[42]][_$_5750[132]] = function () {
  if (gameState == GameState[_$_5750[15]]) {
    gameManager[_$_5750[133]]();
  }
};
function createMainMenu() {
  var cU = game[_$_5750[39]][_$_5750[134]]();
  cU[_$_5750[135]] = true;
  aldaEngine[_$_5750[138]][_$_5750[137]](_$_5750[136], cU, startGame);
}
function createGameMenu() {
  var cT = game[_$_5750[39]][_$_5750[134]]();
  aldaEngine[_$_5750[138]][_$_5750[137]](_$_5750[139], cT, startGame);
}
function createEndedMenu() {
  var cS = game[_$_5750[39]][_$_5750[134]]();
  cS[_$_5750[135]] = true;
  aldaEngine[_$_5750[138]][_$_5750[137]](_$_5750[140], cS, function () {
    aldaEngine[_$_5750[131]]();
  });
}
function initCallbacks() {
  game[_$_5750[22]][_$_5750[144]](function (cW, cV) {
    cV = AldaEngine[_$_5750[141]];
    var cX = Math[_$_5750[142]](cV[_$_5750[46]], cV[_$_5750[109]]) / 640;
    cW[_$_5750[143]](cX, cX, 0, 0);
  }, this);
  this[_$_5750[145]] = function () {};
  this[_$_5750[146]] = this[_$_5750[145]];
  aldaEngine[_$_5750[147]] = function () {
    gameManager[_$_5750[148]]();
    audioEnabled = false;
  };
  aldaEngine[_$_5750[149]] = function () {
    gameManager[_$_5750[150]]();
    audioEnabled = true;
  };
  aldaEngine[_$_5750[151]] = function () {
    game[_$_5750[152]] = true;
  };
  aldaEngine[_$_5750[153]] = function () {
    game[_$_5750[152]] = false;
  };
  aldaEngine[_$_5750[154]] = function () {
    if (BUILD_TYPE === Implementation[_$_5750[0]]) {
      game[_$_5750[152]] = false;
      aldaEngine[_$_5750[155]]();
    } else {
      updatePaused = false;
    }
  };
  aldaEngine[_$_5750[156]] = function () {
    if (BUILD_TYPE === Implementation[_$_5750[0]]) {
      aldaEngine[_$_5750[155]]();
    }
    if (gameState === GameState[_$_5750[15]]) {
      gameState = GameState[_$_5750[8]];
      gameManager[_$_5750[127]]();
      endGame();
    }
    aldaEngine[_$_5750[138]][_$_5750[157]](_$_5750[139], true);
  };
  aldaEngine[_$_5750[158]] = function () {};
}
