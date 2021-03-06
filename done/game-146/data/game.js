/***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
var _$_4036 = [
  "game",
  "init",
  "isPrepared",
  "isReseting",
  "create",
  "group",
  "add",
  "wall",
  "wallDamaged",
  "insertSprite",
  "sprite",
  "loadSprite",
  "push",
  "fist",
  "ARCADE",
  "Physics",
  "enable",
  "physics",
  "body",
  "setSize",
  "checkWorldBounds",
  "onOutOfBounds",
  "events",
  "setTo",
  "anchor",
  "y",
  "pivot",
  "position",
  "rotate_speed",
  "speed_rotate",
  "canonSpring",
  "tileSprite",
  "canon",
  "image",
  "canonBase",
  "trumpOff",
  "trumpSteam",
  "steam",
  "DonaldsWall_DONALD_kour",
  ".png",
  "generateFrameNames",
  "Animation",
  "animations",
  "getAnimation",
  "loadTexture",
  "stop",
  "currentFrame",
  "currentAnim",
  "onComplete",
  "intro",
  "audio",
  "integerInRange",
  "rnd",
  "outro1",
  "outro2",
  "spring",
  "hit_bonus",
  "hit_mexican",
  "hit_wall",
  "hit_wall_delay",
  "time",
  "onStop",
  "music",
  "loop",
  "random",
  "wall_hit",
  "after_bonus",
  "allowMultiple",
  "probability",
  "name",
  "Bad computed probability of enemy resapwn",
  "log",
  "walk",
  "break",
  "take",
  "shoot",
  "Bad name of enemy",
  "key",
  "width",
  "height",
  "up",
  "checkCollision",
  "bonusTaco",
  "slow_index",
  "move",
  "max_speed",
  "delay",
  "step_speed_changer",
  "destroy",
  "isWallDamaged",
  "min_posY",
  "max_posY",
  "play",
  "velocity",
  "speed",
  "start",
  "unlockAudio",
  "time_raising_speed_rotate",
  "max_speed_rotate",
  "step_raising_speed_rotate",
  "pause",
  "timer",
  "removeEnemies",
  "length",
  "removeEvent",
  "remove",
  "removeBonus",
  "restart",
  "resume",
  "regenerate",
  "getSprite",
  "isEventSet",
  "firedBullet",
  "getBullet",
  "splice",
  "bubbleYeah",
  "bubbleYes",
  "bubble01",
  "bubble02",
  "bubble03",
  "x",
  "scale",
  "anim_time",
  "None",
  "Linear",
  "Easing",
  "to",
  "tween",
  "anim_stay",
  "yoyo",
  "angle",
  "rotate_angle",
  "setSpeedMultiplier",
  "resetSpeedMultiplier",
  "duration",
  "getHeightWall",
  "getHealthWall",
  "bonusHammer",
  "enableStars",
  "bonusStar",
  "getWall",
  "isBreakingWall",
  "undefined",
  "isPlaying",
  "getLine",
  "isEmpty",
  "playBreakAnim",
  "setBreakingWall",
  "breaking_time",
  "insertEvent",
  "checkBulletCollision",
  "destroyByBullet",
  "destroyBullet",
  "checkAndMove",
  "alive",
  "line",
  "getBounds",
  "intersects",
  "Rectangle",
  "update",
  "SORT_ASCENDING",
  "Group",
  "sort",
  "Point",
  "speed_move",
  "velocityFromAngle",
  "arcade",
  "sqrt",
  "moveFrom",
  "movementCallback",
  "trumpOn",
  "isAlive",
  "_dx",
  "_dy",
  "stopMovement",
  "onMoveComplete",
  "makeTrumpAngry",
  "trumpAngry",
  "0",
  "addMarker",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "rnd_cnt",
  "hit_cnt",
  "bon_cnt",
  "mute",
  "unmute",
  "debug",
];
var WALL_WIDTH = 7;
var WALL_HEIGHT = 2;
var BLOCK_WIDTH = 92;
var BLOCK_HEIGHT = 60;
var audioEnabled = true;
var GameManager = function (game) {
  this[_$_4036[0]] = game;
  var bp = [];
  var bj = [];
  var R;
  var L = [];
  var bn = {};
  var bR = {};
  var V = {};
  var br = [];
  var bS;
  var bT;
  var bm, bl, bk;
  var U;
  var T = false;
  var S = false;
  var bo;
  var bL;
  var bN;
  var bP;
  var bI;
  var bJ;
  var bK;
  var bH;
  var bQ;
  var bO;
  var X = true;
  var W = true;
  var bM;
  var bU;
  var bd = 8;
  this[_$_4036[1]] = function () {
    bn[_$_4036[2]] = true;
    bn[_$_4036[3]] = false;
    bo = true;
  };
  this[_$_4036[4]] = function () {
    for (var bW = 0; bW < WALL_WIDTH; bW++) {
      bp[bW] = game[_$_4036[6]][_$_4036[5]]();
      var bV = new Wall(WALL_HEIGHT);
      bV[_$_4036[9]](_$_4036[7], _$_4036[8]);
      for (var bX = 0; bX < WALL_HEIGHT; bX++) {
        var G = game[_$_4036[6]][_$_4036[10]](
          bW * BLOCK_WIDTH,
          500 - bX * (BLOCK_HEIGHT - 15),
          _$_4036[7]
        );
        bV[_$_4036[11]](G, bX);
      }
      L[_$_4036[12]](bV);
    }
    bn[_$_4036[10]] = game[_$_4036[6]][_$_4036[10]](0, 0, _$_4036[13]);
    game[_$_4036[17]][_$_4036[16]](
      bn[_$_4036[10]],
      Phaser[_$_4036[15]][_$_4036[14]]
    );
    bn[_$_4036[10]][_$_4036[18]][_$_4036[16]] = true;
    bn[_$_4036[10]][_$_4036[18]][_$_4036[19]](25, 25, 12, 20);
    bn[_$_4036[10]][_$_4036[20]] = true;
    bn[_$_4036[10]][_$_4036[22]][_$_4036[21]][_$_4036[6]](bw, this);
    bn[_$_4036[10]][_$_4036[24]][_$_4036[23]](0.5, 0.35);
    bn[_$_4036[10]][_$_4036[26]][_$_4036[25]] = 100;
    bn[_$_4036[10]][_$_4036[27]][_$_4036[23]](321, 560);
    bn[_$_4036[28]] = fistInfo[_$_4036[29]];
    bR[_$_4036[10]] = game[_$_4036[6]][_$_4036[31]](
      323,
      560,
      32,
      20,
      _$_4036[30]
    );
    game[_$_4036[17]][_$_4036[16]](
      bR[_$_4036[10]],
      Phaser[_$_4036[15]][_$_4036[14]]
    );
    bR[_$_4036[10]][_$_4036[24]][_$_4036[23]](0.5, 1.0);
    bR[_$_4036[10]][_$_4036[26]][_$_4036[25]] = 40;
    V[_$_4036[10]] = game[_$_4036[6]][_$_4036[33]](321, 560, _$_4036[32]);
    V[_$_4036[10]][_$_4036[24]][_$_4036[23]](0.5, 1.0);
    game[_$_4036[17]][_$_4036[16]](
      V[_$_4036[10]],
      Phaser[_$_4036[15]][_$_4036[14]]
    );
    game[_$_4036[6]][_$_4036[33]](280, 535, _$_4036[34]);
    bS = game[_$_4036[6]][_$_4036[33]](70, 415, _$_4036[35]);
    bT = game[_$_4036[6]][_$_4036[33]](80, 510, _$_4036[36]);
    bT[_$_4036[42]][_$_4036[6]](
      _$_4036[37],
      Phaser[_$_4036[41]][_$_4036[40]](_$_4036[38], 1, 6, _$_4036[39], 2)
    );
    var J = bT[_$_4036[42]][_$_4036[43]](_$_4036[37]);
    J[_$_4036[48]][_$_4036[6]](function (K) {
      bS[_$_4036[44]](_$_4036[35]);
      bT[_$_4036[42]][_$_4036[45]](null, true);
      bT[_$_4036[42]][_$_4036[46]] = bT[_$_4036[42]][_$_4036[47]][_$_4036[46]];
      setEndTimer();
    }, this);
    bL = game[_$_4036[6]][_$_4036[50]](_$_4036[49]);
    if (game[_$_4036[52]][_$_4036[51]](0, 0)) {
      bN = game[_$_4036[6]][_$_4036[50]](_$_4036[53]);
    } else {
      bN = game[_$_4036[6]][_$_4036[50]](_$_4036[54]);
    }
    bP = game[_$_4036[6]][_$_4036[50]](_$_4036[55]);
    bI = game[_$_4036[6]][_$_4036[50]](_$_4036[56]);
    bJ = game[_$_4036[6]][_$_4036[50]](_$_4036[57]);
    bK = game[_$_4036[6]][_$_4036[50]](_$_4036[58]);
    bK[_$_4036[61]][_$_4036[6]](function () {
      game[_$_4036[60]][_$_4036[22]][_$_4036[6]](
        audioInfo[_$_4036[59]],
        function () {
          X = true;
        }
      );
    }, this);
    bM = game[_$_4036[6]][_$_4036[50]](_$_4036[62]);
    bM[_$_4036[63]] = true;
    bO = game[_$_4036[6]][_$_4036[50]](_$_4036[64]);
    bQ = game[_$_4036[6]][_$_4036[50]](_$_4036[65]);
    bH = game[_$_4036[6]][_$_4036[50]](_$_4036[66]);
    bO[_$_4036[67]] = true;
    bQ[_$_4036[67]] = true;
    bH[_$_4036[67]] = true;
    bO[_$_4036[61]][_$_4036[6]](function () {
      W = true;
    });
    bQ[_$_4036[61]][_$_4036[6]](function () {
      W = true;
    });
    bH[_$_4036[61]][_$_4036[6]](function () {
      W = true;
    });
    bD();
    bB();
    bE();
  };
  var bz = function () {
    var bY = game[_$_4036[52]][_$_4036[51]](0, WALL_WIDTH - 1);
    var bZ = game[_$_4036[52]][_$_4036[51]](0, 100);
    var ca;
    if (enemy_type[0][_$_4036[68]] > bZ) {
      ca = enemy_type[0][_$_4036[69]];
    } else {
      if (enemy_type[1][_$_4036[68]] + enemy_type[0][_$_4036[68]] > bZ) {
        ca = enemy_type[1][_$_4036[69]];
      } else {
        if (
          enemy_type[2][_$_4036[68]] +
            enemy_type[1][_$_4036[68]] +
            enemy_type[0][_$_4036[68]] >
          bZ
        ) {
          ca = enemy_type[2][_$_4036[69]];
        } else {
          if (
            enemy_type[3][_$_4036[68]] +
              enemy_type[2][_$_4036[68]] +
              enemy_type[1][_$_4036[68]] +
              enemy_type[0][_$_4036[68]] >=
            bZ
          ) {
            ca = enemy_type[3][_$_4036[69]];
          } else {
            console[_$_4036[71]](_$_4036[70]);
            return;
          }
        }
      }
    }
    var G = bp[bY][_$_4036[4]](bY * BLOCK_WIDTH + 1, 0, ca);
    G[_$_4036[24]][_$_4036[25]] = 1.0;
    switch (G[_$_4036[77]]) {
      case enemy_type[0][_$_4036[69]]:
        G[_$_4036[42]][_$_4036[6]](
          _$_4036[72],
          Phaser[_$_4036[41]][_$_4036[40]](
            enemy_type[0][_$_4036[10]],
            1,
            16,
            _$_4036[39],
            2
          )
        );
        G[_$_4036[42]][_$_4036[6]](
          _$_4036[73],
          Phaser[_$_4036[41]][_$_4036[40]](
            enemy_type[1][_$_4036[10]],
            17,
            18,
            _$_4036[39],
            2
          )
        );
        break;
      case enemy_type[1][_$_4036[69]]:
        G[_$_4036[42]][_$_4036[6]](
          _$_4036[72],
          Phaser[_$_4036[41]][_$_4036[40]](
            enemy_type[1][_$_4036[10]],
            1,
            4,
            _$_4036[39],
            2
          )
        );
        G[_$_4036[42]][_$_4036[6]](
          _$_4036[74],
          Phaser[_$_4036[41]][_$_4036[40]](
            enemy_type[1][_$_4036[10]],
            5,
            8,
            _$_4036[39],
            2
          )
        );
        G[_$_4036[42]][_$_4036[6]](
          _$_4036[75],
          Phaser[_$_4036[41]][_$_4036[40]](
            enemy_type[1][_$_4036[10]],
            9,
            12,
            _$_4036[39],
            2
          )
        );
        G[_$_4036[42]][_$_4036[6]](
          _$_4036[73],
          Phaser[_$_4036[41]][_$_4036[40]](
            enemy_type[1][_$_4036[10]],
            13,
            14,
            _$_4036[39],
            2
          )
        );
        break;
      case enemy_type[2][_$_4036[69]]:
        G[_$_4036[42]][_$_4036[6]](
          _$_4036[72],
          Phaser[_$_4036[41]][_$_4036[40]](
            enemy_type[2][_$_4036[10]],
            1,
            4,
            _$_4036[39],
            2
          )
        );
        G[_$_4036[42]][_$_4036[6]](
          _$_4036[73],
          Phaser[_$_4036[41]][_$_4036[40]](
            enemy_type[2][_$_4036[10]],
            5,
            6,
            _$_4036[39],
            2
          )
        );
        break;
      case enemy_type[3][_$_4036[69]]:
        G[_$_4036[42]][_$_4036[6]](
          _$_4036[72],
          Phaser[_$_4036[41]][_$_4036[40]](
            enemy_type[3][_$_4036[10]],
            1,
            4,
            _$_4036[39],
            2
          )
        );
        G[_$_4036[42]][_$_4036[6]](
          _$_4036[73],
          Phaser[_$_4036[41]][_$_4036[40]](
            enemy_type[3][_$_4036[10]],
            5,
            6,
            _$_4036[39],
            2
          )
        );
        break;
      default:
        console[_$_4036[71]](_$_4036[76]);
        return;
    }
    game[_$_4036[17]][_$_4036[16]](G, Phaser[_$_4036[15]][_$_4036[14]]);
    boxSizeWidth = G[_$_4036[78]] * 0.15;
    boxSizeHeight = G[_$_4036[79]] * 0.15;
    G[_$_4036[18]][_$_4036[16]] = true;
    G[_$_4036[18]][_$_4036[19]](
      G[_$_4036[78]] - boxSizeWidth * 2,
      G[_$_4036[79]] - boxSizeHeight * 2,
      boxSizeWidth,
      boxSizeHeight
    );
    G[_$_4036[20]] = true;
    G[_$_4036[18]][_$_4036[81]][_$_4036[80]] = false;
    G[_$_4036[22]][_$_4036[21]][_$_4036[6]](die, this);
    if (S && U[_$_4036[69]] == _$_4036[82]) {
      var K = new Enemy(game, G, bY, 1, bonus_taco[_$_4036[83]]);
    } else {
      var K = new Enemy(game, G, bY, 1, 1);
    }
    K[_$_4036[84]]();
    bj[_$_4036[12]](K);
    if (enemy_speed_respawn[_$_4036[85]] < bm[_$_4036[86]]) {
      bm[_$_4036[86]] -= enemy_speed_respawn[_$_4036[87]];
    }
  };
  var bi = function () {
    if (R != null) {
      R[_$_4036[88]]();
      R = null;
      T = false;
    }
  };
  var by = function () {
    if (R == null && !S) {
      var bZ = game[_$_4036[52]][_$_4036[51]](0, 100);
      if (bZ <= bonus_taco[_$_4036[68]]) {
        U = bonus_taco;
      } else {
        if (bZ <= bonus_taco[_$_4036[68]] + bonus_hammer[_$_4036[68]]) {
          var cc = false;
          for (var cb = 0; cb < WALL_WIDTH; cb++) {
            if (L[cb][_$_4036[89]]()) {
              cc = true;
              break;
            }
          }
          if (!cc) {
            if (game[_$_4036[52]][_$_4036[51]](0, 1)) {
              U = bonus_taco;
            } else {
              U = bonus_star;
            }
          } else {
            U = bonus_hammer;
          }
        } else {
          U = bonus_star;
        }
      }
      var bY = game[_$_4036[52]][_$_4036[51]](0, WALL_WIDTH - 1);
      var cd = game[_$_4036[52]][_$_4036[51]](U[_$_4036[90]], U[_$_4036[91]]);
      R = bp[bY][_$_4036[4]](bY * BLOCK_WIDTH + 20, 0, U[_$_4036[69]]);
      R[_$_4036[24]][_$_4036[25]] = 1.0;
      R[_$_4036[42]][_$_4036[6]](
        _$_4036[72],
        Phaser[_$_4036[41]][_$_4036[40]](U[_$_4036[10]], 1, 3, _$_4036[39], 2)
      );
      R[_$_4036[42]][_$_4036[92]](_$_4036[72], 8, true);
      game[_$_4036[17]][_$_4036[16]](R, Phaser[_$_4036[15]][_$_4036[14]]);
      boxSizeWidth = R[_$_4036[78]] * 0.15;
      boxSizeHeight = R[_$_4036[79]] * 0.15;
      R[_$_4036[18]][_$_4036[16]] = true;
      R[_$_4036[18]][_$_4036[19]](
        R[_$_4036[78]] - boxSizeWidth * 2,
        R[_$_4036[79]] - boxSizeHeight * 2,
        boxSizeWidth,
        boxSizeHeight
      );
      R[_$_4036[20]] = true;
      R[_$_4036[22]][_$_4036[21]][_$_4036[6]](
        function (G) {
          G[_$_4036[88]]();
          R = null;
        },
        this,
        R
      );
      R[_$_4036[18]][_$_4036[93]][_$_4036[25]] = U[_$_4036[94]];
      for (var cb = 0; cb < WALL_WIDTH; cb++) {
        bp[bY][_$_4036[6]](R);
      }
    }
  };
  this[_$_4036[95]] = function () {
    if (audioEnabled) {
      aldaEngine[_$_4036[96]]();
      bL[_$_4036[92]]();
      bL[_$_4036[61]][_$_4036[6]](function () {
        bM[_$_4036[92]]();
      });
    }
    bm = this[_$_4036[0]][_$_4036[60]]
      [_$_4036[4]](this[_$_4036[0]])
      [_$_4036[63]](enemy_speed_respawn[_$_4036[94]], bz, this);
    bl = this[_$_4036[0]][_$_4036[60]]
      [_$_4036[4]](this[_$_4036[0]])
      [_$_4036[63]](
        game[_$_4036[52]][_$_4036[51]](
          bonus_speed_respawn_min,
          bonus_speed_respawn_max
        ),
        by,
        this
      );
    bk = this[_$_4036[0]][_$_4036[60]]
      [_$_4036[4]](this[_$_4036[0]])
      [_$_4036[63]](
        fistInfo[_$_4036[97]],
        function () {
          if (fistInfo[_$_4036[98]] > bn[_$_4036[28]]) {
            bn[_$_4036[28]] += fistInfo[_$_4036[99]];
          } else {
            bk[_$_4036[101]][_$_4036[100]]();
          }
        },
        this
      );
    bm[_$_4036[101]][_$_4036[95]]();
    bl[_$_4036[101]][_$_4036[95]]();
    bk[_$_4036[101]][_$_4036[95]]();
  };
  this[_$_4036[102]] = function () {
    for (var cb = 0; cb < bj[_$_4036[103]]; cb++) {
      bj[cb][_$_4036[104]](game);
      bj[cb][_$_4036[105]]();
    }
    bj = [];
  };
  this[_$_4036[106]] = function () {
    bi();
  };
  this[_$_4036[100]] = function () {
    bM[_$_4036[45]]();
    bm[_$_4036[101]][_$_4036[100]]();
    bl[_$_4036[101]][_$_4036[100]]();
    bk[_$_4036[101]][_$_4036[100]]();
  };
  this[_$_4036[107]] = function () {
    if (audioEnabled) {
      aldaEngine[_$_4036[96]]();
      bL[_$_4036[92]]();
      bL[_$_4036[61]][_$_4036[6]](function () {
        bM[_$_4036[92]]();
      });
    }
    bm[_$_4036[86]] = enemy_speed_respawn[_$_4036[94]];
    bn[_$_4036[28]] = fistInfo[_$_4036[29]];
    bm[_$_4036[101]][_$_4036[108]]();
    bl[_$_4036[101]][_$_4036[108]]();
    bk[_$_4036[101]][_$_4036[108]]();
    bv();
  };
  var bv = function () {
    for (var cb = 0; cb < L[_$_4036[103]]; cb++) {
      L[cb][_$_4036[109]](false);
    }
  };
  var ba = function () {
    for (var cb = 0; cb < bj[_$_4036[103]]; cb++) {
      if (be(bj[cb][_$_4036[110]](), bn[_$_4036[10]])) {
        if (audioEnabled) {
          aldaEngine[_$_4036[96]]();
          bJ[_$_4036[92]]();
          if (
            audioInfo[_$_4036[68]] >= game[_$_4036[52]][_$_4036[51]](0, 100) &&
            W
          ) {
            bt();
          }
        }
        bF(bj[cb][_$_4036[110]](), false);
        if (bj[cb][_$_4036[111]]()) {
          bj[cb][_$_4036[104]](game);
        }
        for (var ce = 0; ce < bj[_$_4036[103]]; ce++) {
          bj[ce][_$_4036[111]]();
        }
        bj[cb][_$_4036[105]]();
        if (bj[cb][_$_4036[112]]()) {
          br[_$_4036[12]](bj[cb][_$_4036[113]]());
        }
        bj[_$_4036[114]](cb, 1);
        incScore();
        bx();
        break;
      }
    }
  };
  var bF = function (G, ch) {
    var cg;
    if (ch) {
      switch (game[_$_4036[52]][_$_4036[51]](0, 1)) {
        case 0:
          cg = _$_4036[115];
          break;
        case 1:
          cg = _$_4036[116];
          break;
      }
    } else {
      switch (game[_$_4036[52]][_$_4036[51]](0, 2)) {
        case 0:
          cg = _$_4036[117];
          break;
        case 1:
          cg = _$_4036[118];
          break;
        case 2:
          cg = _$_4036[119];
          break;
      }
    }
    var cf = game[_$_4036[6]][_$_4036[10]](
      G[_$_4036[120]] + G[_$_4036[78]] / 2,
      G[_$_4036[25]] - G[_$_4036[79]] / 2,
      cg
    );
    cf[_$_4036[24]][_$_4036[23]](0.5, 0.5);
    cf[_$_4036[121]][_$_4036[23]](0, 0);
    var ci = game[_$_4036[6]]
      [_$_4036[127]](cf[_$_4036[121]])
      [_$_4036[126]](
        { x: 1.0, y: 1.0 },
        bubbleInfo[_$_4036[122]],
        Phaser[_$_4036[125]][_$_4036[124]][_$_4036[123]],
        true
      );
    ci[_$_4036[129]](true, bubbleInfo[_$_4036[128]]);
  };
  var bq = function () {
    if (bn[_$_4036[10]][_$_4036[130]] > fistInfo[_$_4036[131]]) {
      bo = false;
    } else {
      if (bn[_$_4036[10]][_$_4036[130]] < -fistInfo[_$_4036[131]]) {
        bo = true;
      }
    }
    if (bo) {
      bn[_$_4036[10]][_$_4036[130]] += bn[_$_4036[28]];
      bR[_$_4036[10]][_$_4036[130]] += bn[_$_4036[28]];
      V[_$_4036[10]][_$_4036[130]] += bn[_$_4036[28]];
    } else {
      bn[_$_4036[10]][_$_4036[130]] -= bn[_$_4036[28]];
      bR[_$_4036[10]][_$_4036[130]] -= bn[_$_4036[28]];
      V[_$_4036[10]][_$_4036[130]] -= bn[_$_4036[28]];
    }
  };
  var bG = function (cj) {
    S = true;
    for (var cb = 0; cb < bj[_$_4036[103]]; cb++) {
      bj[cb][_$_4036[132]](cj);
    }
  };
  var bA = function () {
    for (var cb = 0; cb < bj[_$_4036[103]]; cb++) {
      bj[cb][_$_4036[133]]();
    }
    S = false;
  };
  var Y = function (gameManager) {
    if (R != null) {
      if (be(R, bn[_$_4036[10]])) {
        T = true;
        if (audioEnabled) {
          aldaEngine[_$_4036[96]]();
          bI[_$_4036[92]]();
          if (
            audioInfo[_$_4036[68]] >= game[_$_4036[52]][_$_4036[51]](0, 100) &&
            W
          ) {
            bs();
          }
        }
        bF(R, true);
        switch (U[_$_4036[69]]) {
          case _$_4036[82]:
            bG(bonus_taco[_$_4036[83]]);
            game[_$_4036[60]][_$_4036[22]][_$_4036[6]](
              bonus_taco[_$_4036[134]],
              bA,
              this
            );
            break;
          case _$_4036[137]:
            var cm = game[_$_4036[52]][_$_4036[51]](0, WALL_WIDTH - 1);
            var cl = L[cm][_$_4036[135]]();
            var ck = L[cm][_$_4036[136]]();
            for (var cb = 0; cb < WALL_WIDTH; cb++) {
              if (
                cl > L[cb][_$_4036[135]]() ||
                (cl == L[cb][_$_4036[135]]() && ck > L[cb][_$_4036[136]]())
              ) {
                cm = cb;
                cl = L[cb][_$_4036[135]]();
                ck = L[cb][_$_4036[136]]();
              }
            }
            L[cm][_$_4036[109]](true);
            break;
          case _$_4036[139]:
            for (var cb = 0; cb < bj[_$_4036[103]]; cb++) {
              bj[cb][_$_4036[138]](true);
              bj[cb][_$_4036[45]]();
            }
            game[_$_4036[60]][_$_4036[22]][_$_4036[6]](
              bonus_star[_$_4036[86]],
              gameManager[_$_4036[102]],
              this
            );
            break;
        }
        bx();
      }
    }
  };
  var Z = function () {
    if (R != null && !T) {
      var y = (R[_$_4036[120]] - 20) / BLOCK_WIDTH;
      if (bf(L[y][_$_4036[140]](), R)) {
        bi();
      }
    }
  };
  var bb = function () {
    for (var cb = 0; cb < bj[_$_4036[103]]; cb++) {
      if (bj[cb][_$_4036[141]]()) {
        if (
          audioEnabled &&
          (typeof bQ === _$_4036[142] || (!bQ[_$_4036[143]] && X))
        ) {
          aldaEngine[_$_4036[96]]();
          bK[_$_4036[92]]();
          X = false;
        }
        continue;
      }
      var y = bj[cb][_$_4036[144]]();
      if (!L[y][_$_4036[145]]()) {
        if (bg(bj[cb][_$_4036[110]](), L[y][_$_4036[140]](), 35)) {
          bj[cb][_$_4036[45]]();
          bj[cb][_$_4036[146]]();
          bj[cb][_$_4036[147]](L[y][_$_4036[135]]());
          bj[cb][_$_4036[149]](
            game[_$_4036[60]][_$_4036[22]][_$_4036[6]](
              wallInfo[_$_4036[148]],
              bh,
              this,
              L[y],
              bj[cb]
            )
          );
        }
      }
      if (bj[cb][_$_4036[150]](L[y][_$_4036[140]]())) {
        if (
          audioEnabled &&
          (typeof bQ === _$_4036[142] || (!bQ[_$_4036[143]] && X))
        ) {
          aldaEngine[_$_4036[96]]();
          bK[_$_4036[92]]();
          X = false;
        }
        L[y][_$_4036[151]]();
        bj[cb][_$_4036[152]]();
        for (var cb = 0; cb < bj[_$_4036[103]]; cb++) {
          bj[cb][_$_4036[153]](L[y]);
        }
      }
    }
  };
  var bc = function () {
    for (var cb = 0; cb < br[_$_4036[103]]; cb++) {
      if (br[cb][_$_4036[154]]) {
        var cn = L[br[cb][_$_4036[155]]][_$_4036[140]]();
        if (cn != null) {
          if (
            Phaser[_$_4036[158]][_$_4036[157]](
              br[cb][_$_4036[156]](),
              cn[_$_4036[156]]()
            )
          ) {
            if (
              audioEnabled &&
              (typeof bQ === _$_4036[142] || (!bQ[_$_4036[143]] && X))
            ) {
              aldaEngine[_$_4036[96]]();
              bK[_$_4036[92]]();
              X = false;
            }
            L[br[cb][_$_4036[155]]][_$_4036[151]]();
            br[cb][_$_4036[88]]();
            br[_$_4036[114]](cb, 1);
          }
        }
      } else {
        br[_$_4036[114]](cb, 1);
      }
    }
  };
  this[_$_4036[159]] = function () {
    if (!bn[_$_4036[2]] && !bn[_$_4036[3]]) {
      ba();
      Y(this);
    } else {
      if (bn[_$_4036[2]]) {
        bq();
      }
    }
    bb();
    Z();
    bc();
    for (var cb = 0; cb < bp[_$_4036[103]]; cb++) {
      bp[cb][_$_4036[162]](_$_4036[25], Phaser[_$_4036[161]][_$_4036[160]]);
    }
    bU = true;
  };
  this[_$_4036[75]] = function () {
    if (bn[_$_4036[2]]) {
      if (audioEnabled) {
        aldaEngine[_$_4036[96]]();
        bP[_$_4036[92]]();
      }
      bU = false;
      var co = new Phaser[_$_4036[163]](0, 0);
      game[_$_4036[17]][_$_4036[166]][_$_4036[165]](
        bn[_$_4036[10]][_$_4036[130]] - 90,
        fistInfo[_$_4036[164]],
        co
      );
      bR[_$_4036[94]] =
        Math[_$_4036[167]](
          co[_$_4036[120]] * co[_$_4036[120]] +
            co[_$_4036[25]] * co[_$_4036[25]]
        ) / 45;
      bn[_$_4036[10]][_$_4036[18]][_$_4036[130]] =
        bn[_$_4036[10]][_$_4036[130]];
      bn[_$_4036[10]][_$_4036[18]][_$_4036[168]](
        10000,
        fistInfo[_$_4036[164]],
        bn[_$_4036[10]][_$_4036[130]] - 90
      );
      bn[_$_4036[10]][_$_4036[18]][_$_4036[169]] = function () {
        bR[_$_4036[10]][_$_4036[79]] += bR[_$_4036[94]];
      };
      bn[_$_4036[2]] = false;
      bS[_$_4036[44]](_$_4036[170]);
    }
  };
  var be = function (cp, cq) {
    if (cp != null && cq != null) {
      return game[_$_4036[17]][_$_4036[166]][_$_4036[157]](
        cp[_$_4036[18]],
        cq[_$_4036[18]]
      );
    } else {
      return false;
    }
  };
  var bf = function (cp, cq) {
    if (cp != null && cq != null) {
      return Phaser[_$_4036[158]][_$_4036[157]](
        cp[_$_4036[156]](),
        cq[_$_4036[156]]()
      );
    } else {
      return false;
    }
  };
  var bg = function (cp, cq, ct) {
    if (cp != null && cq != null) {
      var cs = cq[_$_4036[156]]();
      cs[_$_4036[25]] += ct;
      var cr = cp[_$_4036[156]]();
      cr[_$_4036[25]] += cr[_$_4036[79]];
      cr[_$_4036[79]] = 1;
      return Phaser[_$_4036[158]][_$_4036[157]](cr, cs);
    } else {
      return false;
    }
  };
  var bh = function (L, K) {
    if (K[_$_4036[171]]()) {
      for (var cb = 0; cb < bj[_$_4036[103]]; cb++) {
        if (K[_$_4036[144]]() == bj[cb][_$_4036[144]]()) {
          if (bj[cb][_$_4036[153]](L)) {
            if (
              audioEnabled &&
              W &&
              audioInfo[_$_4036[68]] >= game[_$_4036[52]][_$_4036[51]](0, 100)
            ) {
              aldaEngine[_$_4036[96]]();
              bu();
            }
          }
        }
      }
    }
  };
  var bx = function () {
    if (bn[_$_4036[10]][_$_4036[18]][_$_4036[130]] < 0) {
      bn[_$_4036[10]][_$_4036[18]][_$_4036[120]] -=
        2 * bn[_$_4036[10]][_$_4036[18]][_$_4036[172]];
    } else {
      bn[_$_4036[10]][_$_4036[18]][_$_4036[120]] +=
        2 * bn[_$_4036[10]][_$_4036[18]][_$_4036[172]];
    }
    if (bU) {
      if (bn[_$_4036[10]][_$_4036[18]][_$_4036[173]] < 0) {
        bn[_$_4036[10]][_$_4036[18]][_$_4036[25]] -=
          2 * bn[_$_4036[10]][_$_4036[18]][_$_4036[173]];
      }
    }
    bw();
  };
  var bw = function () {
    if (!bn[_$_4036[3]]) {
      bn[_$_4036[3]] = true;
      bn[_$_4036[10]][_$_4036[18]][_$_4036[169]] = function () {
        bR[_$_4036[10]][_$_4036[79]] -= bR[_$_4036[94]];
        if (R != null && T) {
          R[_$_4036[120]] += bn[_$_4036[10]][_$_4036[18]][_$_4036[172]];
          R[_$_4036[25]] += bn[_$_4036[10]][_$_4036[18]][_$_4036[173]];
        }
        if (bR[_$_4036[10]][_$_4036[79]] <= 20) {
          if (bR[_$_4036[10]][_$_4036[79]] < 15) {
            if (bn[_$_4036[10]][_$_4036[18]][_$_4036[130]] < 0) {
              bn[_$_4036[10]][_$_4036[18]][_$_4036[120]] +=
                bn[_$_4036[10]][_$_4036[18]][_$_4036[172]];
            } else {
              bn[_$_4036[10]][_$_4036[18]][_$_4036[120]] -=
                bn[_$_4036[10]][_$_4036[18]][_$_4036[172]];
            }
            bn[_$_4036[10]][_$_4036[18]][_$_4036[25]] -=
              bn[_$_4036[10]][_$_4036[18]][_$_4036[173]];
          }
          if (T) {
            bi();
          }
          bn[_$_4036[10]][_$_4036[18]][_$_4036[174]](true);
          bn[_$_4036[10]][_$_4036[18]][_$_4036[169]] = null;
          bR[_$_4036[10]][_$_4036[79]] = 20;
        }
      };
      bn[_$_4036[10]][_$_4036[18]][_$_4036[168]](
        10000,
        fistInfo[_$_4036[164]],
        bn[_$_4036[10]][_$_4036[130]] - 270
      );
      bn[_$_4036[10]][_$_4036[18]][_$_4036[175]][_$_4036[6]](bC);
    }
  };
  var bC = function () {
    if (!bT[_$_4036[42]][_$_4036[47]][_$_4036[143]]) {
      bS[_$_4036[44]](_$_4036[35]);
    }
    bn[_$_4036[3]] = false;
    bn[_$_4036[2]] = true;
  };
  this[_$_4036[176]] = function () {
    for (var cb = 0; cb < bj[_$_4036[103]]; cb++) {
      bj[cb][_$_4036[45]]();
    }
    if (R != null) {
      R[_$_4036[18]][_$_4036[93]][_$_4036[25]] = 0;
    }
    bS[_$_4036[44]](_$_4036[177]);
    var J = bT[_$_4036[42]][_$_4036[43]](_$_4036[37]);
    bT[_$_4036[42]][_$_4036[92]](_$_4036[37], 3, false);
    if (audioEnabled) {
      aldaEngine[_$_4036[96]]();
      bM[_$_4036[45]]();
      bN[_$_4036[92]]();
    }
  };
  var bD = function () {
    bO[_$_4036[179]](_$_4036[178], 0, 2.429);
    bO[_$_4036[179]](_$_4036[180], 2.429, 1.802);
    bO[_$_4036[179]](_$_4036[181], 4.231, 2.116);
    bO[_$_4036[179]](_$_4036[182], 6.347, 1.802);
    bO[_$_4036[179]](_$_4036[183], 8.149, 2.586);
    bO[_$_4036[179]](_$_4036[184], 10.735, 2.978);
    bO[_$_4036[179]](_$_4036[185], 13.53, 2.795);
    bO[_$_4036[179]](_$_4036[186], 16.325, 1.28);
    bO[_$_4036[179]](_$_4036[187], 17.605, 1.045);
    bO[_$_4036[179]](_$_4036[188], 18.65, 1.071);
    bO[_$_4036[179]](_$_4036[189], 19.721, 1.985);
    bO[_$_4036[179]](_$_4036[190], 21.706, 0.679);
    bO[_$_4036[179]](_$_4036[191], 22.385, 1.985);
    bO[_$_4036[179]](_$_4036[192], 24.37, 0.731);
  };
  var bt = function () {
    W = false;
    bO[_$_4036[92]](game[_$_4036[52]][_$_4036[51]](0, audioInfo[_$_4036[193]]));
  };
  var bE = function () {
    bQ[_$_4036[179]](_$_4036[178], 0, 1.766);
    bQ[_$_4036[179]](_$_4036[180], 1.766, 0.731);
    bQ[_$_4036[179]](_$_4036[181], 2.497, 0.679);
    bQ[_$_4036[179]](_$_4036[182], 3.176, 1.541);
    bQ[_$_4036[179]](_$_4036[183], 4.038, 1.358);
    bQ[_$_4036[179]](_$_4036[184], 5.396, 1.698);
    bQ[_$_4036[179]](_$_4036[185], 7.094, 0.993);
  };
  var bu = function () {
    W = false;
    bQ[_$_4036[92]](game[_$_4036[52]][_$_4036[51]](0, audioInfo[_$_4036[194]]));
  };
  var bB = function () {
    bH[_$_4036[179]](_$_4036[178], 0, 3.605);
    bH[_$_4036[179]](_$_4036[180], 3.605, 1.567);
    bH[_$_4036[179]](_$_4036[181], 5.172, 1.907);
    bH[_$_4036[179]](_$_4036[182], 7.079, 1.515);
    bH[_$_4036[179]](_$_4036[183], 8.594, 1.672);
    bH[_$_4036[179]](_$_4036[184], 10.266, 1.515);
  };
  var bs = function () {
    W = false;
    bH[_$_4036[92]](game[_$_4036[52]][_$_4036[51]](0, audioInfo[_$_4036[195]]));
  };
  this[_$_4036[196]] = function () {
    bM[_$_4036[196]] = true;
  };
  this[_$_4036[197]] = function () {
    bM[_$_4036[196]] = false;
  };
  this[_$_4036[198]] = function () {};
};
