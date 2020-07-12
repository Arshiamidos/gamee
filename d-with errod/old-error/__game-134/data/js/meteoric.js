var Gamee,
  Log,
  Helper,
  UI,
  Utils,
  Meteoric,
  __extends =
    (this && this.__extends) ||
    (function () {
      var s = function (t, e) {
        return (s =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(t, e);
      };
      return function (t, e) {
        function i() {
          this.constructor = t;
        }
        s(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((i.prototype = e.prototype), new i()));
      };
    })();
function startGame() {
  var t = new Meteoric.Game();
  return (Meteoric.Global.game = t);
}
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.GAMEE = !0),
      (t.TEST_ADS = !1),
      (t.game = null),
      (t.GAME_WIDTH = 640),
      (t.GAME_HEIGHT = 840),
      (t.MAX_GAME_WIDTH = 640),
      (t.MAX_GAME_HEIGHT = 1040),
      (t.scaleX = 1),
      (t.scaleY = 1),
      (t.correctOrientation = !1),
      (t.musicOn = !0),
      (t.soundOn = !0),
      (t.showLanguages = !1),
      (t.supportedLanguages = ["en"]),
      (t.currentLanguage = "en"),
      t
    );
  })();
  t.Global = e;
})(Meteoric || (Meteoric = {})),
  (window.onload = function () {
    if (Meteoric.Global.GAMEE)
      var e = new Gamee.Gamee("OneButton", {}, ["rewardedAds"], function () {
        var t = startGame();
        e.setGame(t);
      });
    else startGame();
  }),
  (function (n) {
    var t = (function (i) {
      function s() {
        var t = this,
          e = Phaser.AUTO;
        return (
          (t =
            i.call(this, {
              width: 1,
              height: 1,
              renderer: e,
              parent: "content",
              transparent: !1,
              antialias: !0,
              physicsConfig: null,
              preserveDrawingBuffer: !0,
            }) || this),
          (s.game = t),
          Utils.PhaserUtils.ChangeAnimationPhaserJSONData(
            t.additionalFrameProperties
          ),
          Utils.PhaserUtils.AdjustTweenFunctions(),
          t.state.add("Boot", n.Boot),
          t.state.add("Preloader", n.Preloader),
          t.state.add("Menu", n.Menu),
          t.state.add("Play", n.Play),
          t.state.start("Boot"),
          t
        );
      }
      return (
        __extends(s, i),
        (s.prototype.onSound = function (t) {
          if (null != this.sound)
            if (
              ((this.sound.mute = !t),
              (n.Global.soundOn = t),
              (n.Global.musicOn = t))
            ) {
              if (!this.cache.checkSoundKey("Music")) return;
              Utils.AudioUtils.playMusic("Music");
            } else Utils.AudioUtils.stopMusic();
        }),
        (s.prototype.additionalFrameProperties = function (t, e) {
          e.anchor && ((t.anchorX = e.anchor.w), (t.anchorY = e.anchor.h)),
            e.nextitem &&
              ((t.nextItemX = e.nextitem.w), (t.nextItemY = e.nextitem.h));
        }),
        Object.defineProperty(s.prototype, "virtualJoystick", {
          get: function () {
            return this._virtualJoystick;
          },
          set: function (t) {
            this._virtualJoystick = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        s
      );
    })(Phaser.Game);
    n.Game = t;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function () {
      function n(t, e, i, s) {
        (this._game = null),
          (this._controller = null),
          (this._saveState = null),
          (this._replayData = null),
          (this._socialData = null),
          (this._indices = {
            right: 1,
            up: 2,
            left: 4,
            down: 8,
            A: 16,
            B: 32,
            button: 64,
          }),
          (this._pressesCache = 0),
          (this._isDown = 0),
          (this._justDown = 0),
          (this._justUp = 0),
          (this._gameRunning = !1),
          (this._score = 0),
          (this._ghostScore = 0),
          (this._gameReady = !1),
          (this._platform = null),
          (this._isBattle = !1),
          (this._isVideoLoading = !1),
          (this._isVideoReady = !1),
          (this._gameReady = !1),
          void 0 !== window.gamee &&
            (this.setEventHandlers(),
            window.gamee.gameInit(
              t,
              {},
              i,
              function (t, e) {
                this.initResponse(t, e), s();
              }.bind(this)
            )),
          (n._instance = this);
      }
      return (
        Object.defineProperty(n, "instance", {
          get: function () {
            return n._instance;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (n.prototype.initResponse = function (t, e) {
          var i = e.sound;
          void 0 === i && (i = !0),
            (this._controller = e.controller),
            (this._sound = i),
            null != e.replayData &&
              null != e.replayData.data &&
              0 !== e.replayData.data.length &&
              (this._replayData = JSON.parse(e.replayData.data)),
            null != e.socialData &&
              0 !== e.socialData.length &&
              (this._socialData = JSON.parse(e.socialData)),
            null != e.platform &&
              0 !== e.platform.length &&
              (this._platform = e.platform),
            null != e.gameContext &&
              0 !== e.gameContext.length &&
              (this._isBattle = "battle" === e.gameContext),
            this.loadRewardedVideo(),
            this.setKeyHandlers();
        }),
        (n.prototype.setGame = function (t) {
          this._game = t;
        }),
        Object.defineProperty(n.prototype, "gameRunning", {
          get: function () {
            return this._gameRunning;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "sound", {
          get: function () {
            return this._sound;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "replayData", {
          get: function () {
            return this._replayData;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "saveState", {
          get: function () {
            return this._saveState;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "isWeb", {
          get: function () {
            return (
              null !== this._platform &&
              ("web" === this._platform || "mobile_web" === this._platform)
            );
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "isBattle", {
          get: function () {
            return this._isBattle;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "isVideoReady", {
          get: function () {
            return this._isVideoReady;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (n.prototype.gameReady = function () {
          window.gamee.gameReady(), (this._gameReady = !0);
        }),
        (n.prototype.setKeyHandlers = function () {
          var i = this;
          this._controller.on("keydown", function (t) {
            i._pressesCache |= i._indices[t.button];
            var e = i._game.state.getCurrentState();
            "function" == typeof e.onGameeButtonDown &&
              e.onGameeButtonDown(t.button);
          }),
            this._controller.on("keyup", function (t) {
              i._pressesCache &= ~i._indices[t.button];
              var e = i._game.state.getCurrentState();
              "function" == typeof e.onGameeButtonUp &&
                e.onGameeButtonUp(t.button);
            });
        }),
        (n.prototype.setEventHandlers = function () {
          var e = this;
          window.gamee.emitter.addEventListener("pause", function () {
            e.onPause();
          }),
            window.gamee.emitter.addEventListener("resume", function () {
              e.onUnpause();
            }),
            window.gamee.emitter.addEventListener("mute", function () {
              e._game && e._game.onSound(!1);
            }),
            window.gamee.emitter.addEventListener("unmute", function () {
              e._game && e._game.onSound(!0);
            }),
            window.gamee.emitter.addEventListener("start", function (t) {
              e.onStart(t);
            });
        }),
        (n.prototype.onPause = function () {
          var t = this._game.state.getCurrentState();
          "function" == typeof t.onGameePause && t.onGameePause();
        }),
        (n.prototype.onUnpause = function () {
          var t = this._game.state.getCurrentState();
          "function" == typeof t.onGameeUnpause && t.onGameeUnpause();
        }),
        (n.prototype.onStart = function (t) {
          if (!this._gameReady)
            throw new Error(
              "Game received 'start' event before gameReady() was called!"
            );
          this.gameStart();
          var e = this._game.state.getCurrentState();
          if ("function" == typeof e.onGameeRestart) {
            var i =
                void 0 !== t.detail.opt_resetState && t.detail.opt_resetState,
              s = void 0 !== t.detail.opt_replay && t.detail.opt_replay,
              n = void 0 !== t.detail.opt_ghostMode && t.detail.opt_ghostMode;
            e.onGameeRestart(i, s, n);
          }
          t.detail.callback();
        }),
        Object.defineProperty(n.prototype, "score", {
          get: function () {
            return this._score;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (n.prototype.setScore = function (t, e) {
          void 0 === e && (e = !1),
            e
              ? ((this._ghostScore = t), window.gamee.updateScore(t, !0))
              : ((this._score = t), window.gamee.updateScore(t));
        }),
        (n.prototype.gameStart = function () {
          this._gameRunning, (this._gameRunning = !0);
        }),
        (n.prototype.gameOver = function (t) {
          this._gameRunning,
            (this._gameRunning = !1),
            null != t && (t = { data: JSON.stringify(t) }),
            window.gamee.gameOver(t);
        }),
        (n.prototype.gameSave = function (t, e) {
          window.gamee.gameSave(t, e);
        }),
        (n.prototype.loadRewardedVideo = function () {
          if (!this._isVideoReady && !this._isVideoLoading) {
            var i = this;
            window.gamee.loadRewardedVideo(function (t, e) {
              (i._isVideoLoading = !1),
                e && e.videoLoaded
                  ? (i._isVideoReady = !0)
                  : (i._isVideoReady = !1);
            });
          }
        }),
        (n.prototype.showRewardedVideo = function (i) {
          var s = this;
          this._isVideoReady &&
            window.gamee.showRewardedVideo(function (t, e) {
              e && e.videoPlayed ? i(!0) : i(!1), (s._isVideoReady = !1);
            });
        }),
        (n._instance = null),
        n
      );
    })();
    t.Gamee = e;
  })(Gamee || (Gamee = {})),
  (function (t) {
    var r = function (t, e) {
        (this.msg = t), (this.color = e);
      },
      e = (function () {
        function a() {}
        return (
          (a.msg = function (t, e) {
            var i = a.messages;
            void 0 === e && (e = a.YELLOW);
            for (var s = 0; s < t.length; ) {
              var n = t.substr(s, 60);
              if (i.length < a.MAX_LINE) a.messages.push(new r(n, e));
              else {
                for (var o = 1; o < a.MAX_LINE; o++)
                  (i[o - 1].msg = i[o].msg), (i[o - 1].color = i[o].color);
                (i[a.MAX_LINE - 1].msg = n), (i[a.MAX_LINE - 1].color = e);
              }
              s += 60;
            }
          }),
          (a.render = function (t) {
            for (var e = a.messages, i = 0; i < e.length; i++)
              t.text(e[i].msg, 10, 70 + 16 * i, e[i].color);
          }),
          (a.RED = "RGB(255, 0, 0)"),
          (a.GREEN = "RGB(0, 255, 0)"),
          (a.BLUE = "RGB(, 0, 255)"),
          (a.YELLOW = "RGB(255, 255, 0)"),
          (a.MAGENTA = "RGB(255, 0, 255)"),
          (a.CYAN = "RGB(0, 255, 255)"),
          (a.WHITE = "RGB(255, 255, 255)"),
          (a.MAX_LINE = 32),
          (a.messages = []),
          a
        );
      })();
    t.Log = e;
  })(Log || (Log = {})),
  (function (t) {
    var e = (function () {
      function r() {}
      return (
        (r.randomizeArray = function (t, e, i, s) {
          void 0 === i && (i = !1), void 0 === s && (s = !1);
          var n = i ? e.slice() : e;
          return Phaser.ArrayUtils.shuffle(n), s ? n.slice(0, t) : n;
        }),
        (r.sort = function (t, e, i, s) {
          if (
            (void 0 === i && (i = 0), void 0 === s && (s = t.length), i < s)
          ) {
            for (var n, o = i, a = i + 1; a <= s; a++)
              0 < e(t[i], t[a]) && ((n = t[++o]), (t[o] = t[a]), (t[a] = n));
            (n = t[i]),
              (t[i] = t[o]),
              (t[o] = n),
              r.sort(t, e, i, o - 1),
              r.sort(t, e, o + 1, s);
          }
        }),
        r
      );
    })();
    t.ArrayUtils = e;
  })(Helper || (Helper = {})),
  (function (t) {
    !(function (t) {
      function e(t) {
        return -2 * t * t + 3 * t;
      }
      (t.wiggle = function (t, e, i) {
        var s = t * Math.PI * 2 * e,
          n = t * (2 * Math.PI * i + Math.PI / 2);
        return Math.sin(s) * Math.cos(n);
      }),
        (t.sinWithExpDecay = function (t, e, i) {
          var s = t * Math.PI * 2 * e,
            n = -t * i;
          return Math.sin(s) * Math.exp(n);
        }),
        (t.pop5 = e),
        (t.pop5rev = function (t) {
          return -(e(1 - t) - 1);
        }),
        (t.sin = function (t) {
          return Math.sin(2 * t * Math.PI);
        }),
        (t.halfSin = function (t) {
          return Math.sin(t * Math.PI);
        }),
        (t.sinWithPeriod = function (t, e) {
          return Math.sin(2 * t * Math.PI * e);
        });
    })(t.Easing || (t.Easing = {}));
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function () {
      function d() {}
      return (
        (d.create = function (t, e, i, s, n, o, a, r, h, l, c, u) {
          void 0 === o && (o = 0),
            void 0 === a && (a = 0),
            void 0 === r && (r = 0),
            void 0 === h && (h = 0),
            void 0 === l && (l = !1),
            void 0 === c && (c = !1),
            void 0 === u && (u = !1);
          var p,
            _ = new Phaser.Image(t, 0, 0, s, n);
          return (
            (p =
              "string" == typeof n
                ? t.cache.getFrameByName(s, n)
                : t.cache.getFrameByIndex(s, n)),
            (d._scaleCenterX = c),
            (d._scaleCenterY = u),
            d.calculateNineImage(p, e, i, o, a, r, h, l),
            (d._nineImage = new Phaser.BitmapData(
              t,
              "NineImage" + d._textureKey++,
              d._width,
              d._height
            )),
            d.renderNineImage(_),
            d._nineImage
          );
        }),
        (d.calculateNineImage = function (t, e, i, s, n, o, a, r) {
          if (
            ((d._centralWidth = t.width - n - a),
            (d._centralHeight = t.height - s - o),
            r)
          )
            (d._horizontalRepeats = e),
              (d._verticalRepeats = i),
              (d._width = n + a + d._centralWidth * e),
              (d._height = s + o + d._centralHeight * i),
              (d._lastWidth = 0),
              (d._lastHeight = 0);
          else {
            var h = e - n - a;
            (d._horizontalRepeats = Math.floor(h / d._centralWidth)),
              (d._lastWidth = h % d._centralWidth);
            var l = i - s - o;
            (d._verticalRepeats = Math.floor(l / d._centralHeight)),
              (d._lastHeight = l % d._centralHeight),
              (d._width = e),
              (d._height = i);
          }
          (d._leftWidth = n),
            (d._rightWidth = a),
            (d._topHeight = s),
            (d._bottomHeight = o);
        }),
        (d.renderNineImage = function (t) {
          var e = 0,
            i = 0;
          if (
            (0 < d._topHeight &&
              (d.renderNineImageRow(t, e, i, d._topHeight),
              (e += d._topHeight),
              (i += d._topHeight)),
            d._scaleCenterY)
          ) {
            var s = d._verticalRepeats * d._centralHeight + d._lastHeight;
            d.renderNineImageRow(t, e, i, d._centralHeight, s), (i += s);
          } else {
            for (var n = 0; n < d._verticalRepeats; n++)
              d.renderNineImageRow(t, e, i, d._centralHeight),
                (i += d._centralHeight);
            0 < d._lastHeight &&
              (d.renderNineImageRow(t, e, i, d._lastHeight),
              (i += d._lastHeight));
          }
          (e += d._centralHeight),
            0 < d._bottomHeight &&
              d.renderNineImageRow(t, e, i, d._bottomHeight);
        }),
        (d.renderNineImageRow = function (t, e, i, s, n) {
          var o = 0,
            a = 0;
          if (
            ((n = n || s),
            0 < d._leftWidth &&
              (d._nineImage.copy(
                t,
                o,
                e,
                d._leftWidth,
                s,
                a,
                i,
                d._leftWidth,
                n
              ),
              (a += d._leftWidth),
              (o += d._leftWidth)),
            d._scaleCenterX)
          ) {
            var r = d._horizontalRepeats * d._centralWidth + d._lastWidth;
            d._nineImage.copy(t, o, e, d._centralWidth, s, a, i, r, n),
              (a += r);
          } else {
            for (var h = 0; h < d._horizontalRepeats; h++)
              d._nineImage.copy(
                t,
                o,
                e,
                d._centralWidth,
                s,
                a,
                i,
                d._centralWidth,
                n
              ),
                (a += d._centralWidth);
            0 < d._lastWidth &&
              (d._nineImage.copy(
                t,
                o,
                e,
                d._lastWidth,
                s,
                a,
                i,
                d._lastWidth,
                n
              ),
              (a += d._lastWidth));
          }
          (o += d._centralWidth),
            0 < d._rightWidth &&
              d._nineImage.copy(
                t,
                o,
                e,
                d._rightWidth,
                s,
                a,
                i,
                d._rightWidth,
                n
              );
        }),
        (d._textureKey = 0),
        d
      );
    })();
    t.NineImage = e;
  })(Helper || (Helper = {})),
  (function (t) {
    var N, e;
    ((e = N || (N = {}))[(e.UNDEFINED = -1)] = "UNDEFINED"),
      (e[(e.SPACE = 1)] = "SPACE"),
      (e[(e.NEWLINE = 2)] = "NEWLINE"),
      (e[(e.CHARACTER = 3)] = "CHARACTER");
    var i = (function () {
      function L() {}
      return (
        (L.hasNext = function () {
          return L.textPosition < L.text.length;
        }),
        (L.getChar = function () {
          return L.text.charAt(L.textPosition++);
        }),
        (L.peekChar = function () {
          return L.text.charAt(L.textPosition);
        }),
        (L.getPosition = function () {
          return L.textPosition;
        }),
        (L.setPosition = function (t) {
          L.textPosition = t;
        }),
        (L.getCharAdvance = function (t, e) {
          var i = L.fontData.chars[t],
            s = i.xAdvance;
          return 0 < e && i.kerning[e] && (s += i.kerning[e]), s;
        }),
        (L.getCharType = function (t) {
          return " " === t
            ? N.SPACE
            : /(?:\r\n|\r|\n)/.test(t)
            ? N.NEWLINE
            : N.CHARACTER;
        }),
        (L.wrapText = function (t, e, i, s, n, o) {
          (L.text = e),
            L.setPosition(0),
            (L.fontData = t.cache.getBitmapFont(n).font),
            void 0 === o && (o = L.fontData.size);
          var a = o / L.fontData.size,
            r = L.fontData.lineHeight * a,
            h = i / a,
            l = [],
            c = [],
            u = [],
            p = 0,
            _ = 0,
            d = 0;
          (l[p] = d), (u[_++] = 0);
          for (var m = s; L.hasNext(); ) {
            for (
              var y = 0,
                f = 0,
                g = -1,
                E = N.UNDEFINED,
                P = N.UNDEFINED,
                S = h,
                v = -1;
              L.hasNext();

            ) {
              d = L.getPosition();
              var k = L.getChar();
              E = L.getCharType(k);
              var A = k.charCodeAt(0);
              if (E === N.SPACE)
                P !== N.SPACE && (f = y), ++y, (S -= L.getCharAdvance(A, v));
              else if (E === N.CHARACTER) {
                if (
                  (P !== N.CHARACTER && (g = d),
                  (S -= L.getCharAdvance(A, v)) < 0)
                )
                  break;
                ++y;
              } else if (E === N.NEWLINE) {
                var b = !1;
                if (
                  (L.hasNext() &&
                    ((b = !0),
                    (f = y),
                    (d = g = L.getPosition()),
                    (S = -1),
                    (E = N.CHARACTER)),
                  b)
                )
                  break;
              }
              (P = E), (v = A);
            }
            (m -= r) < 0 && (u[_++] = p),
              S < 0 && E === N.CHARACTER
                ? ((c[p] = 0 !== f ? f : y),
                  !1,
                  m < 0 && (!0, (m = s - r)),
                  0 !== f
                    ? ((l[++p] = g), L.setPosition(g))
                    : ((l[++p] = d), L.setPosition(d)))
                : L.hasNext() ||
                  (E === N.CHARACTER
                    ? (c[p] = y)
                    : E === N.SPACE && (c[p] = f));
          }
          u[_] = p + 1;
          for (var T = [], C = 1; C <= _; C++) {
            for (var O = u[C - 1], w = u[C], I = [], M = O; M < w; M++)
              I.push(L.text.substr(l[M], c[M]));
            T.push(I.join("\n"));
          }
          return T;
        }),
        L
      );
    })();
    t.TextWrapper = i;
  })(Helper || (Helper = {})),
  (function (e) {
    var t = (function () {
      function t() {}
      return (
        Object.defineProperty(t, "instance", {
          get: function () {
            return (
              null === t._instance &&
                (t._instance = new e.Pool(
                  e.Block,
                  e.Gameplay.ROWS * e.Gameplay.COLUMNS
                )),
              t._instance
            );
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t._instance = null),
        t
      );
    })();
    e.BlockPool = t;
  })(Meteoric || (Meteoric = {})),
  (function (e) {
    var t = (function () {
      function t() {}
      return (
        Object.defineProperty(t, "instance", {
          get: function () {
            return (
              null === t._instance &&
                (t._instance = new e.Pool(
                  e.BlockSprite,
                  e.Gameplay.ROWS * e.Gameplay.COLUMNS,
                  function () {
                    return new e.BlockSprite(e.Global.game);
                  }
                )),
              t._instance
            );
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t._instance = null),
        t
      );
    })();
    e.BlockSpritePool = t;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e, i;
    ((i = e = t.eBlockType || (t.eBlockType = {}))[(i.DEBRIS = 0)] = "DEBRIS"),
      (i[(i.ASTEROID = 1)] = "ASTEROID"),
      (i[(i.PLANET = 2)] = "PLANET"),
      (i[(i.SUN = 3)] = "SUN"),
      (i[(i.SPACESHIP = 4)] = "SPACESHIP"),
      (i[(i.BLACKHOLE = 5)] = "BLACKHOLE");
    var s = (function () {
      function t() {}
      return (
        (t.prototype.set = function (t, e, i, s) {
          (this.x = t), (this.y = e), (this.value = i), (this.type = s);
        }),
        (t.prototype.clear = function () {
          (this.x = this.y = this.value = -1),
            this.clearMatchCount(),
            this.clearFall(),
            this.clearMerged();
        }),
        (t.prototype.clearMerged = function () {
          this.merging = !1;
        }),
        (t.prototype.clearMatchCount = function () {
          this.matchCount = 0;
        }),
        (t.prototype.clearFall = function () {
          this.falling = !1;
        }),
        Object.defineProperty(t.prototype, "isBasic", {
          get: function () {
            return this.type <= e.SUN;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.equals = function (t) {
          return this.value === t.value && this.type === t.type;
        }),
        t
      );
    })();
    t.Block = s;
  })(Meteoric || (Meteoric = {})),
  (function (e) {
    var t = (function () {
      function t() {}
      return (
        (t.DESTROY_ROWS_ON_CONTINUE = 4),
        (t.UI_HEIGHT = 200),
        (t.KEY_DELAY = 200),
        (t.TITLES = ["Streak!", "Amazing!", "Spacetacular!"]),
        (t.PLANETS_ASSETS_COUNT = 6),
        (t.PLANETS_COUNT = 4),
        (t.SPAWN_FROM_ITEM = e.eBlockType.DEBRIS),
        (t.SPAWN_TO_ITEM = e.eBlockType.ASTEROID),
        (t.PLANET_COUNT_STEP_1 = 20),
        (t.PLANET_COUNT_STEP_2 = 40),
        (t.MATCH_LENGTH = 2),
        (t.MAX_SCORE_STREAK = 5),
        (t.FALL_DELAY = 2),
        (t.FALL_SPEED = 1),
        (t.FAST_FALL_MULTIPLIER = 10),
        (t.PLANET_FALL_MULTIPLIER = 20),
        (t.COLUMNS = 8),
        (t.ROWS = 8),
        (t.MERGE_TIME = 0.25),
        (t.RISE_TIME = 0.5),
        (t.SUN_EXPLODE_TIME = 1),
        (t.BLACKHOLE_MERGE_TIME = 1),
        (t.MINIMAL_OBJECTS_COUNT = 16),
        (t.INITIAL_ROWS = 4),
        (t.SKIP_PROBABILITY = 0.05),
        (t.SKIP_PROBABILITY_STEP = 0.08),
        (t.INIT_FROM_ITEM = t.SPAWN_FROM_ITEM),
        (t.INIT_TO_ITEM = e.eBlockType.PLANET),
        (t.SPACESHIP_FALL_ROUND_MIN = 6),
        (t.SPACESHIP_FALL_ROUND_MAX = 8),
        (t.RISE_ROUND_MIN = 10),
        (t.RISE_ROUND_MAX = 10),
        (t.BLACKHOLE_SPAWN_MIN = 5),
        (t.BLACKHOLE_SPAWN_MAX = 5),
        (t.CONSECUTIVE_MATCHES_FOR_BLACKHOLE = 5),
        t
      );
    })();
    e.Gameplay = t;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function () {
      function t(t, e, i) {
        void 0 === i && (i = null),
          (this._newFunction = null),
          (this._count = 0),
          (this._pool = []),
          (this._canGrow = !0),
          (this._maxPoolSize = 0),
          (this._classType = t),
          (this._newFunction = i);
        for (var s = 0; s < e; s++) {
          var n = this.newItem();
          this._pool[this._count++] = n;
        }
      }
      return (
        (t.prototype.createItem = function () {
          return 0 === this._count
            ? this._canGrow
              ? this.newItem()
              : null
            : this._pool[--this._count];
        }),
        (t.prototype.destroyItem = function (t) {
          this._pool[this._count++] = t;
        }),
        Object.defineProperty(t.prototype, "newFunction", {
          set: function (t) {
            this._newFunction = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.newItem = function () {
          return null !== this._newFunction
            ? this._newFunction()
            : new this._classType();
        }),
        Object.defineProperty(t.prototype, "canGrow", {
          set: function (t) {
            this._canGrow = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        t
      );
    })();
    t.Pool = e;
  })(Meteoric || (Meteoric = {})),
  (function (i) {
    var t = (function () {
      function e(t) {
        (this.maxVelocity = e.MAX_VELOCITY),
          (this._velocity = new Phaser.Point(0, 0)),
          (this._angularVelocity = 0),
          (this._friction = 0),
          (this._angularDrag = 0),
          (this._gravity = 0),
          (this._alpha = 1),
          (this._scaleChange = 0),
          (this._alphaChange = 0),
          (this._game = t);
      }
      return (
        Object.defineProperty(e.prototype, "visual", {
          get: function () {
            return this._visual;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "on", {
          set: function (t) {
            (this._on = t),
              (this._visual.exists = t),
              (this._visual.visible = t);
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.remove = function () {
          var t = this._visual.parent;
          null !== t &&
            (t instanceof Phaser.Group
              ? t.remove(this._visual)
              : t.removeChild(this._visual),
            (t = null));
        }),
        (e.prototype.bringToTop = function () {
          var t = this._visual.parent;
          t instanceof Phaser.Group && t.bringToTop(this._visual);
        }),
        (e.prototype.sendToBack = function () {
          var t = this._visual.parent;
          t instanceof Phaser.Group && t.sendToBack(this._visual);
        }),
        Object.defineProperty(e.prototype, "textureKey", {
          set: function (t) {
            this._textureKey = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.setScaleChange = function (t, e) {
          void 0 === e && (e = 0),
            (this._scaleChangeType = t),
            (this._scaleChange = e);
        }),
        Object.defineProperty(e.prototype, "alpha", {
          set: function (t) {
            (this._alpha = t),
              (this._visual.alpha = Phaser.Math.clamp(t, 0, 1));
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.setAlphaChange = function (t, e) {
          void 0 === e && (e = 0),
            (this._alphaChangeType = t),
            (this._alphaChange = e);
        }),
        (e.prototype.setPhysics = function (t, e, i, s, n, o) {
          void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            void 0 === s && (s = 0),
            void 0 === n && (n = 0),
            void 0 === o && (o = 0),
            this._velocity.setTo(t, e),
            (this._angularVelocity = i),
            (this._friction = s),
            (this._angularDrag = n),
            (this._gravity = o),
            (this._simplePhysics = 0 === o && 0 === s && 0 === n);
        }),
        (e.prototype.setFrame = function (t) {}),
        (e.prototype.onEmit = function (t) {
          t.add(this._visual);
        }),
        (e.prototype.onKill = function (t) {}),
        (e.prototype.update = function (t) {
          void 0 === t && (t = !0);
          var e = this._game.time.physicsElapsed;
          if (0 < this.lifetime && (this.lifetime -= e) <= 0) return !1;
          if (
            ((0 === this._velocity.x && 0 === this._velocity.y) ||
              ((this._visual.x += this._velocity.x * e),
              (this._visual.y += this._velocity.y * e)),
            0 !== this._angularVelocity &&
              (this._visual.angle += this._angularVelocity * e),
            this._simplePhysics ||
              ((this._velocity.x += -this._friction * this._velocity.x * e),
              (this._velocity.y +=
                (this._gravity - this._friction * this._velocity.y) * e),
              (this._angularVelocity +=
                -this._angularDrag * this._angularVelocity * e)),
            !t)
          )
            return !0;
          if (this._scaleChangeType != i.eParameterChangeType.NO_CHANGE)
            switch (this._scaleChangeType) {
              case i.eParameterChangeType.IN_TIME:
                (this._visual.scale.x += this._scaleChange * e) < 0 &&
                  ((this._visual.scale.x = 0),
                  this._scaleChange < 0 &&
                    (this._scaleChangeType = i.eParameterChangeType.NO_CHANGE)),
                  (this._visual.scale.y += this._scaleChange * e) < 0 &&
                    ((this._visual.scale.y = 0),
                    this._scaleChange < 0 &&
                      (this._scaleChangeType =
                        i.eParameterChangeType.NO_CHANGE));
            }
          if (this._alphaChangeType != i.eParameterChangeType.NO_CHANGE)
            switch (this._alphaChangeType) {
              case i.eParameterChangeType.IN_TIME:
                (this._alpha += this._alphaChange * e),
                  this._alpha < 0
                    ? ((this._visual.alpha = 0),
                      this._alphaChange < 0 &&
                        (this._alphaChangeType =
                          i.eParameterChangeType.NO_CHANGE))
                    : 1 < this._alpha
                    ? ((this._visual.alpha = 1),
                      0 < this._alphaChange &&
                        (this._alphaChangeType =
                          i.eParameterChangeType.NO_CHANGE))
                    : (this._visual.alpha = this._alpha);
            }
          return !0;
        }),
        (e.MAX_VELOCITY = 1e3),
        e
      );
    })();
    i.Particle = t;
  })(Meteoric || (Meteoric = {})),
  (function (r) {
    var h, t, l, e;
    ((t = h || (h = {}))[(t.FLOW = 0)] = "FLOW"),
      (t[(t.EXPLODE = 1)] = "EXPLODE"),
      ((e = l = r.eParameterChangeType || (r.eParameterChangeType = {}))[
        (e.NO_CHANGE = 0)
      ] = "NO_CHANGE"),
      (e[(e.IN_TIME = 1)] = "IN_TIME");
    var i = (function (o) {
      function a(t, e, i, s) {
        var n = o.call(this, t, null) || this;
        return (
          (n._maxParticles = a.MAX_PARTICELES),
          (n.emitPoint = new Phaser.Point(0, 0)),
          (n.area = new Phaser.Point(0, 0)),
          (n.gravity = 100),
          (n.particleClass = r.SpriteParticle),
          (n.particleBringToTop = !1),
          (n.particleSendToBack = !1),
          (n.frequency = 100),
          (n.minLifetime = 1),
          (n.maxLifetime = 2),
          (n.minParticleScale = 1),
          (n.maxParticleScale = 1),
          (n.scaleChange = 0),
          (n.scaleChangeType = l.NO_CHANGE),
          (n.minParticleSpeed = new Phaser.Point(-100, -100)),
          (n.maxParticleSpeed = new Phaser.Point(100, 100)),
          (n.particleFriction = 0),
          (n.minAngularSpeed = -360),
          (n.maxAngularSpeed = 360),
          (n.angularDrag = 0),
          (n.minParticleAlpha = 1),
          (n.maxParticleAlpha = 1),
          (n.alphaChange = 0),
          (n.alphaChangeType = l.NO_CHANGE),
          (n.forceEmit = !1),
          (n._on = !1),
          (n._mode = h.FLOW),
          (n._flowQuantity = 0),
          (n._flowTotal = 0),
          (n._flowCounter = 0),
          (n._particlesPool = []),
          (n._counterPool = 0),
          (n._particlesUsed = []),
          (n._counterUsed = 0),
          (n._timer = 0),
          (n._frames = null),
          (n._emitPoint = new Phaser.Point(0, 0)),
          (n._minParticleScale = new Phaser.Point(1, 1)),
          (n._maxParticleScale = new Phaser.Point(1, 1)),
          n.position.setTo(e, i),
          (n._maxParticles = s),
          n
        );
      }
      return (
        __extends(a, o),
        (a.prototype.update = function () {
          if (
            this._on &&
            this.game.time.time >= this._timer &&
            ((this._timer =
              this.game.time.time + this.frequency * this.game.time.slowMotion),
            this._mode === h.FLOW)
          )
            if (-1 !== this._flowTotal && this._flowCounter >= this._flowTotal)
              this.on = !1;
            else
              for (
                var t = Math.max(1, this._flowQuantity), e = 0;
                e < t &&
                !(
                  this.emitParticle(this.forceEmit) &&
                  (this._flowCounter++,
                  -1 !== this._flowTotal &&
                    this._flowCounter >= this._flowTotal)
                );
                e++
              );
          for (e = this._counterUsed - 1; 0 <= e; e--) {
            var i = this._particlesUsed[e];
            i.update() ||
              ((i.on = !1),
              i.remove(),
              i.onKill(this),
              (this._particlesUsed[e] = this._particlesUsed[
                --this._counterUsed
              ]),
              (this._particlesPool[this._counterPool++] = i));
          }
        }),
        (a.prototype.makeParticles = function (t, e, i) {
          (void 0 === i || i > this._maxParticles) && (i = this._maxParticles),
            void 0 !== e && (this._frames = e);
          for (var s = 0; s < i; s++) {
            var n = new this.particleClass(this.game);
            (n.textureKey = t),
              n.onCreate(this),
              (n.on = !1),
              (this._particlesPool[this._counterPool++] = n);
          }
        }),
        Object.defineProperty(a.prototype, "on", {
          set: function (t) {
            (this._on = t), (this.exists = t), (this.visible = t);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(a.prototype, "lifetime", {
          set: function (t) {
            this.minLifetime = this.maxLifetime = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(a.prototype, "countUsed", {
          get: function () {
            return this._counterUsed;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (a.prototype.explode = function (t, e, i) {
          (this._mode = h.EXPLODE), (this.on = !0), this.emitParticles(t, e, i);
        }),
        (a.prototype.flow = function (t, e, i, s, n, o) {
          (this._mode = h.FLOW),
            (this.on = !0),
            (void 0 !== e && 0 !== e) || (e = 1),
            void 0 === i && (i = -1),
            void 0 === s && (s = !0),
            e > this._maxParticles && (e = this._maxParticles),
            (this.frequency = t),
            (this._flowCounter = 0),
            (this._flowQuantity = e),
            (this._flowTotal = i),
            s &&
              (this.emitParticles(e, n, o),
              (this._flowCounter += e),
              (this._timer =
                this.game.time.time + t * this.game.time.slowMotion));
        }),
        (a.prototype.killAllParticles = function (t) {
          for (void 0 === t && (t = !0); 0 < this._counterUsed; ) {
            var e = this._particlesUsed[--this._counterUsed];
            e.remove(),
              t || e.onKill(this),
              (this._particlesPool[this._counterPool++] = e);
          }
        }),
        (a.prototype.emitParticles = function (t, e, i) {
          for (var s = 0; s < t; s++) {
            var n = this.emitParticle(this.forceEmit);
            if (null === n) break;
            null != e && e.call(i, n);
          }
        }),
        (a.prototype.emitParticle = function (t, e) {
          if (
            (void 0 === t && (t = !1),
            void 0 === e && (e = !1),
            0 === this._counterPool)
          ) {
            if (!t) return null;
            var i = this._particlesUsed[0];
            (this._particlesUsed[0] = this._particlesUsed[--this._counterUsed]),
              i.remove(),
              i.onKill(this),
              (this._particlesPool[this._counterPool++] = i);
          }
          var s = this._particlesPool[--this._counterPool];
          if (
            (((this._particlesUsed[this._counterUsed++] = s).on = !0),
            this.randomEmitPoint(this._emitPoint),
            s.visual.position.set(this._emitPoint.x, this._emitPoint.y),
            (s.visual.angle = 0),
            e)
          )
            (s.lifetime = -1),
              s.visual.scale.set(1, 1),
              s.setScaleChange(l.NO_CHANGE),
              (s.alpha = 1),
              s.setAlphaChange(l.NO_CHANGE),
              s.setPhysics();
          else {
            if (
              ((s.lifetime = this.game.rnd.realInRange(
                this.minLifetime,
                this.maxLifetime
              )),
              1 !== this.minParticleScale || 1 !== this.maxParticleScale)
            ) {
              var n = this.game.rnd.realInRange(
                this.minParticleScale,
                this.maxParticleScale
              );
              s.visual.scale.set(n, n);
            } else
              this._minParticleScale.x !== this._maxParticleScale.x ||
              this._minParticleScale.y !== this._maxParticleScale.y
                ? s.visual.scale.set(
                    this.game.rnd.realInRange(
                      this._minParticleScale.x,
                      this._maxParticleScale.x
                    ),
                    this.game.rnd.realInRange(
                      this._minParticleScale.y,
                      this._maxParticleScale.y
                    )
                  )
                : s.visual.scale.set(1, 1);
            s.setScaleChange(this.scaleChangeType, this.scaleChange),
              (s.alpha = this.game.rnd.realInRange(
                this.minParticleAlpha,
                this.maxParticleAlpha
              )),
              s.setAlphaChange(this.alphaChangeType, this.alphaChange),
              s.setPhysics(
                this.game.rnd.realInRange(
                  this.minParticleSpeed.x,
                  this.maxParticleSpeed.x
                ),
                this.game.rnd.realInRange(
                  this.minParticleSpeed.y,
                  this.maxParticleSpeed.y
                ),
                this.game.rnd.realInRange(
                  this.minAngularSpeed,
                  this.maxAngularSpeed
                ),
                this.particleFriction,
                this.angularDrag,
                this.gravity
              ),
              null !== this._frames && s.setFrame(this.randomFrame());
          }
          return (
            s.onEmit(this),
            this.particleBringToTop
              ? s.bringToTop()
              : this.particleSendToBack && s.sendToBack(),
            s
          );
        }),
        (a.prototype.destroy = function () {
          r.ParticlesManager.instance.remove(this),
            o.prototype.destroy.call(this, !0, !1);
        }),
        (a.prototype.randomFrame = function () {
          var t = null;
          return (
            null !== this._frames &&
              (t = Array.isArray(this._frames)
                ? (this._frames[0], this.game.rnd.pick(this._frames))
                : this._frames),
            t
          );
        }),
        (a.prototype.randomEmitPoint = function (t) {
          return (
            this.area instanceof Phaser.Point
              ? t.setTo(0, 0)
              : this.area.random(t),
            (t.x += this.emitPoint.x),
            (t.y += this.emitPoint.y),
            t
          );
        }),
        (a.prototype.setXSpeed = function (t, e) {
          (t = t || 0),
            (e = e || 0),
            (this.minParticleSpeed.x = t),
            (this.maxParticleSpeed.x = e);
        }),
        (a.prototype.setYSpeed = function (t, e) {
          (t = t || 0),
            (e = e || 0),
            (this.minParticleSpeed.y = t),
            (this.maxParticleSpeed.y = e);
        }),
        (a.prototype.setAngularSpeed = function (t, e) {
          (t = t || 0),
            (e = e || 0),
            (this.minAngularSpeed = t),
            (this.maxAngularSpeed = e);
        }),
        (a.prototype.setAlpha = function (t, e) {
          void 0 === t && (t = 1),
            void 0 === e && (e = 1),
            (this.minParticleAlpha = t),
            (this.maxParticleAlpha = e);
        }),
        (a.prototype.setAlphaChange = function (t, e, i) {
          switch (
            (void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            (this.alphaChangeType = t))
          ) {
            case l.NO_CHANGE:
              this.alphaChange = 0;
              break;
            case l.IN_TIME:
              0 === i && (i = 1), (this.alphaChange = e / i);
          }
        }),
        (a.prototype.setScale = function (t, e, i, s) {
          void 0 === t && (t = 1),
            void 0 === e && (e = 1),
            void 0 === i && (i = 1),
            void 0 === s && (s = 1),
            this._minParticleScale.setTo(t, i),
            this._maxParticleScale.setTo(e, s);
        }),
        (a.prototype.setScaleChange = function (t, e, i) {
          switch (
            (void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            (this.scaleChangeType = t))
          ) {
            case l.NO_CHANGE:
              this.scaleChange = 0;
              break;
            case l.IN_TIME:
              0 === i && (i = 1), (this.scaleChange = e / i);
          }
        }),
        (a.prototype.emitAt = function (t, e) {
          this.emitPoint.setTo(t, e);
        }),
        (a.prototype.emitAtObject = function (t) {
          t.center
            ? this.emitPoint.setTo(t.center.x, t.center.y)
            : this.emitPoint.setTo(t.x, t.y);
        }),
        (a.MAX_PARTICELES = 16),
        a
      );
    })(Phaser.Group);
    r.ParticlesEmitter = i;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function () {
      function t() {
        (this._emitters = []), (this._emittersCount = 0);
      }
      return (
        Object.defineProperty(t, "instance", {
          get: function () {
            return null === t._instance && (t._instance = new t()), t._instance;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.add = function (t) {
          this._emitters[this._emittersCount++] = t;
        }),
        (t.prototype.remove = function (t) {
          for (
            var e = this._emittersCount - 1;
            0 <= e && this._emitters[e] !== t;
            e--
          );
          -1 !== e &&
            (this._emitters[e] = this._emitters[--this._emittersCount]);
        }),
        (t.prototype.update = function () {
          for (var t = 0; t < this._emittersCount; t++) {
            var e = this._emitters[t];
            e.exists && e.update();
          }
        }),
        (t._instance = null),
        t
      );
    })();
    t.ParticlesManager = e;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.setFrame = function (t) {
          var e = this._visual;
          "string" == typeof t ? (e.frameName = t) : (e.frame = t);
        }),
        (e.prototype.onCreate = function (t) {
          var e = new Phaser.Sprite(this._game, 0, 0, this._textureKey);
          e.anchor.setTo(0.5, 0.5), (this._visual = e);
        }),
        e
      );
    })(t.Particle);
    t.SpriteParticle = e;
  })(Meteoric || (Meteoric = {})),
  (Phaser.VirtualJoystick = function (t, e) {
    Phaser.Plugin.call(this, t, e),
      (this.sticks = null),
      (this.buttons = null),
      (this._pointerTotal = 0);
  }),
  (Phaser.VirtualJoystick.prototype = Object.create(Phaser.Plugin.prototype)),
  (Phaser.VirtualJoystick.prototype.constructor = Phaser.VirtualJoystick),
  (Phaser.VirtualJoystick.NONE = 0),
  (Phaser.VirtualJoystick.HORIZONTAL = 1),
  (Phaser.VirtualJoystick.VERTICAL = 2),
  (Phaser.VirtualJoystick.CIRC_BUTTON = 0),
  (Phaser.VirtualJoystick.RECT_BUTTON = 1),
  (Phaser.VirtualJoystick.prototype.init = function () {
    (this.sticks = new Phaser.ArraySet()),
      (this.buttons = new Phaser.ArraySet());
  }),
  (Phaser.VirtualJoystick.prototype.addStick = function (t, e, i, s, n, o) {
    void 0 === n && (n = "base"), void 0 === o && (o = "stick");
    var a = new Phaser.VirtualJoystick.Stick(this, t, e, i, s, n, o);
    return (
      this.sticks.add(a),
      this._pointerTotal++,
      2 < this._pointerTotal && this.game.input.addPointer(),
      a
    );
  }),
  (Phaser.VirtualJoystick.prototype.addDPad = function (
    t,
    e,
    i,
    s,
    n,
    o,
    a,
    r,
    h
  ) {
    void 0 === n && (n = "neutral"),
      void 0 === o && (o = "up"),
      void 0 === a && (a = "down"),
      void 0 === r && (r = "left"),
      void 0 === h && (h = "right");
    var l = new Phaser.VirtualJoystick.DPad(this, t, e, i, s, n, o, a, r, h);
    return (
      this.sticks.add(l),
      this._pointerTotal++,
      2 < this._pointerTotal && this.game.input.addPointer(),
      l
    );
  }),
  (Phaser.VirtualJoystick.prototype.removeStick = function (t) {
    this.sticks.remove(t), t.destroy();
  }),
  (Phaser.VirtualJoystick.prototype.addButton = function (t, e, i, s, n, o) {
    void 0 === o && (o = Phaser.VirtualJoystick.CIRC_BUTTON);
    var a = new Phaser.VirtualJoystick.Button(this, o, t, e, i, s, n);
    return (
      this.buttons.add(a),
      this._pointerTotal++,
      2 < this._pointerTotal && this.game.input.addPointer(),
      a
    );
  }),
  (Phaser.VirtualJoystick.prototype.removeButton = function (t) {
    this.buttons.remove(t), t.destroy();
  }),
  (Phaser.VirtualJoystick.prototype.update = function () {
    this.sticks.callAll("update"), this.buttons.callAll("update");
  }),
  (Phaser.VirtualJoystick.prototype.destroy = function () {
    this.sticks.removeAll(!0), this.buttons.removeAll(!0);
  }),
  (Phaser.VirtualJoystick.Stick = function (t, e, i, s, n, o, a) {
    (this.pad = t),
      (this.baseFrame = o),
      (this.stickFrame = a),
      (this.position = new Phaser.Point(e, i)),
      (this.line = new Phaser.Line(
        this.position.x,
        this.position.y,
        this.position.x,
        this.position.y
      )),
      (this.baseSprite = this.pad.game.make.sprite(
        this.position.x,
        this.position.y,
        n,
        o
      )),
      this.baseSprite.anchor.set(0.5),
      (this.stickSprite = this.pad.game.make.sprite(
        this.position.x,
        this.position.y,
        n,
        a
      )),
      this.stickSprite.anchor.set(0.5),
      (this.baseHitArea = new Phaser.Circle(
        this.position.x,
        this.position.y,
        s
      )),
      (this.stickHitArea = new Phaser.Circle(
        this.position.x,
        this.position.y,
        this.stickSprite.width
      )),
      (this.limitPoint = new Phaser.Point()),
      (this.pointer = null),
      (this.enabled = !0),
      (this.isDown = !1),
      (this.isUp = !0),
      (this.onDown = new Phaser.Signal()),
      (this.onUp = new Phaser.Signal()),
      (this.onMove = new Phaser.Signal()),
      (this.onUpdate = new Phaser.Signal()),
      (this.timeDown = 0),
      (this.timeUp = 0),
      (this.angle = 0),
      (this.angleFull = 0),
      (this.quadrant = 0),
      (this.octant = 0),
      (this.motionLock = Phaser.VirtualJoystick.NONE),
      (this._distance = s),
      (this._deadZone = 0.15 * s),
      (this._scale = 1),
      (this._tracking = !1),
      (this._showOnTouch = !1),
      this.pad.game.stage.addChild(this.baseSprite),
      this.pad.game.stage.addChild(this.stickSprite),
      this.pad.game.input.onDown.add(this.checkDown, this),
      this.pad.game.input.onUp.add(this.checkUp, this),
      this.pad.game.input.addMoveCallback(this.moveStick, this);
  }),
  (Phaser.VirtualJoystick.Stick.prototype = {
    checkDown: function (t) {
      this.enabled &&
        this.isUp &&
        ((this.pointer = t),
        this.motionLock === Phaser.VirtualJoystick.NONE
          ? this.line.end.copyFrom(this.pointer)
          : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
          ? (this.line.end.x = this.pointer.x)
          : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
            (this.line.end.y = this.pointer.y),
        this._showOnTouch
          ? (this.line.start.copyFrom(t),
            (this.posX = t.x),
            (this.posY = t.y),
            (this.visible = !0),
            this.setDown())
          : this.stickHitArea.contains(t.x, t.y) &&
            (this.line.length <= this.deadZone
              ? (this._tracking = !0)
              : (this.setDown(), this.moveStick())));
    },
    checkUp: function (t) {
      t === this.pointer &&
        ((this.pointer = null),
        (this.stickHitArea.x = this.position.x),
        (this.stickHitArea.y = this.position.y),
        (this.stickSprite.x = this.stickHitArea.x),
        (this.stickSprite.y = this.stickHitArea.y),
        this.line.end.copyFrom(this.line.start),
        (this.isDown = !1),
        (this.isUp = !0),
        (this.timeUp = this.pad.game.time.time),
        this.onUp.dispatch(this, t),
        this._showOnTouch && (this.visible = !1));
    },
    setDown: function () {
      (this.isDown = !0),
        (this.isUp = !1),
        (this.timeDown = this.pad.game.time.time),
        (this.timeUp = 0),
        (this._tracking = !1),
        this.checkArea(),
        this.onDown.dispatch(this, this.pointer);
    },
    checkArea: function () {
      (this.angle = this.pad.game.math.radToDeg(this.line.angle)),
        (this.angleFull = this.angle),
        this.angleFull < 0 && (this.angleFull += 360),
        (this.octant = 45 * Math.round(this.angleFull / 45)),
        45 <= this.angleFull && this.angleFull < 135
          ? (this.quadrant = 1)
          : 135 <= this.angleFull && this.angleFull < 225
          ? (this.quadrant = 2)
          : 225 <= this.angleFull && this.angleFull < 315
          ? (this.quadrant = 3)
          : (this.quadrant = 0);
    },
    moveStick: function () {
      this.pointer &&
        (this.isDown || this._tracking) &&
        (this.motionLock === Phaser.VirtualJoystick.NONE
          ? this.line.end.copyFrom(this.pointer)
          : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
          ? (this.line.end.x = this.pointer.x)
          : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
            (this.line.end.y = this.pointer.y),
        this.checkArea(),
        (!this.isDown && this.line.length <= this.deadZone) ||
          (this._tracking && this.setDown(),
          this.line.length < this.baseHitArea.radius
            ? this.motionLock === Phaser.VirtualJoystick.NONE
              ? ((this.stickHitArea.x = this.pointer.x),
                (this.stickHitArea.y = this.pointer.y))
              : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
              ? (this.stickHitArea.x = this.pointer.x)
              : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
                (this.stickHitArea.y = this.pointer.y)
            : (this.baseHitArea.circumferencePoint(
                this.line.angle,
                !1,
                this.limitPoint
              ),
              this.motionLock === Phaser.VirtualJoystick.NONE
                ? ((this.stickHitArea.x = this.limitPoint.x),
                  (this.stickHitArea.y = this.limitPoint.y))
                : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
                ? (this.stickHitArea.x = this.limitPoint.x)
                : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
                  (this.stickHitArea.y = this.limitPoint.y)),
          (this.stickSprite.x = this.stickHitArea.x),
          (this.stickSprite.y = this.stickHitArea.y),
          this.onMove.dispatch(this, this.force, this.forceX, this.forceY)));
    },
    update: function () {
      this.isDown &&
        !this._tracking &&
        this.onUpdate.dispatch(this, this.force, this.forceX, this.forceY);
    },
    alignBottomLeft: function (t) {
      void 0 === t && (t = 0);
      var e = this.baseSprite.width / 2 + t,
        i = this.baseSprite.height / 2 + t;
      (this.posX = e), (this.posY = this.pad.game.height - i);
    },
    alignBottomRight: function (t) {
      void 0 === t && (t = 0);
      var e = this.baseSprite.width / 2 + t,
        i = this.baseSprite.height / 2 + t;
      (this.posX = this.pad.game.width - e),
        (this.posY = this.pad.game.height - i);
    },
    destroy: function () {
      this.pad.game.input.onDown.remove(this.checkDown, this),
        this.pad.game.input.onUp.remove(this.checkUp, this);
      for (var t = this.pad.game.input.moveCallbacks, e = 0; e < t.length; e++)
        if (t.callback === this.moveStick && t.context === this) {
          t.splice(e, 1);
          break;
        }
      this.stickSprite.destroy(),
        this.baseSprite.destroy(),
        (this.stickHitArea = null),
        (this.baseHitArea = null),
        (this.line = null),
        (this.limitPoint = null),
        this.onDown.dispose(),
        this.onUp.dispose(),
        this.onMove.dispose(),
        this.onUpdate.dispose(),
        (this.pointer = null),
        (this._scale = null),
        (this.pad = null);
    },
    debug: function (t, e, i) {
      void 0 === t && (t = !0),
        void 0 === e && (e = !0),
        void 0 === i && (i = this.baseSprite.right);
      var s = this.pad.game.debug;
      if (
        (t &&
          ((s.context.lineWidth = 2),
          s.geom(this.baseHitArea, "rgba(255, 0, 0, 1)", !1),
          s.geom(this.stickHitArea, "rgba(0, 255, 0, 1)", !1),
          s.geom(this.line, "rgba(255, 255, 0, 1)"),
          (s.context.lineWidth = 1)),
        e)
      ) {
        var n = s.renderShadow,
          o = i,
          a = this.baseSprite.y - 114;
        (s.renderShadow = !0),
          s.text("Force: " + this.force.toFixed(2), o, a),
          s.text("ForceX: " + this.forceX.toFixed(2), o, a + 24),
          s.text("ForceY: " + this.forceY.toFixed(2), o, a + 48),
          s.text("Rotation: " + this.rotation.toFixed(2), o, a + 96),
          s.text("Angle: " + this.angle.toFixed(2), o, a + 120),
          s.text("Distance: " + this.distance, o, a + 172),
          s.text("Quadrant: " + this.quadrant, o, a + 196),
          s.text("Octant: " + this.octant, o, a + 220),
          (s.renderShadow = n);
      }
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "rotation", {
    get: function () {
      return this.line.angle;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "posX", {
    get: function () {
      return this.position.x;
    },
    set: function (t) {
      this.position.x !== t &&
        ((this.position.x = t),
        (this.baseSprite.x = t),
        (this.stickSprite.x = t),
        (this.baseHitArea.x = t),
        (this.stickHitArea.x = t),
        (this.line.start.x = t),
        (this.line.end.x = t));
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "posY", {
    get: function () {
      return this.position.y;
    },
    set: function (t) {
      this.position.y !== t &&
        ((this.position.y = t),
        (this.baseSprite.y = t),
        (this.stickSprite.y = t),
        (this.baseHitArea.y = t),
        (this.stickHitArea.y = t),
        (this.line.start.y = t),
        (this.line.end.y = t));
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "force", {
    get: function () {
      return Math.min(1, (this.line.length / this.distance) * 2);
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "forceX", {
    get: function () {
      return this.force * this.x;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "forceY", {
    get: function () {
      return this.force * this.y;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "x", {
    get: function () {
      return 0 <= this.line.angle
        ? this.line.angle <= 1.5707963267948966
          ? (1.5707963267948966 - this.line.angle) / 1.5707963267948966
          : ((3.141592653589793 - this.line.angle) / 3.141592653589793) * 2 - 1
        : -1.5707963267948966 <= this.line.angle
        ? Math.abs(-1.5707963267948966 - this.line.angle) / 1.5707963267948966
        : (Math.abs(-3.141592653589793 - this.line.angle) / 3.141592653589793) *
            2 -
          1;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "y", {
    get: function () {
      return 0 <= this.line.angle
        ? 1 -
            Math.abs(1.5707963267948966 - this.line.angle) / 1.5707963267948966
        : Math.abs(-1.5707963267948966 - this.line.angle) / 1.5707963267948966 -
            1;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "filterX", {
    get: function () {
      if (0 === this.x) return 0.5;
      var t = Math.abs(this.forceX) / 2;
      return this.x < 0 ? (0.5 - t).toFixed(2) : (0.5 + t).toFixed(2);
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "filterY", {
    get: function () {
      if (0 === this.y) return 0.5;
      var t = Math.abs(this.forceY) / 2;
      return this.y < 0 ? 1 - (0.5 - t).toFixed(2) : 1 - (0.5 + t).toFixed(2);
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "alpha", {
    get: function () {
      return this.stickSprite.alpha;
    },
    set: function (t) {
      (this.stickSprite.alpha = t), (this.baseSprite.alpha = t);
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "visible", {
    get: function () {
      return this.stickSprite.visible;
    },
    set: function (t) {
      (this.stickSprite.visible = t), (this.baseSprite.visible = t);
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "distance", {
    get: function () {
      return this._distance * this._scale;
    },
    set: function (t) {
      this._distance !== t && (this._distance = t);
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "deadZone", {
    get: function () {
      return this._deadZone * this._scale;
    },
    set: function (t) {
      this._deadZone = t;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "scale", {
    get: function () {
      return this._scale;
    },
    set: function (t) {
      this._scale !== t &&
        (this.stickSprite.scale.set(t),
        this.baseSprite.scale.set(t),
        this.baseHitArea.setTo(
          this.position.x,
          this.position.y,
          this.distance * t
        ),
        this.stickHitArea.setTo(
          this.position.x,
          this.position.y,
          this.stickSprite.width
        ),
        (this._scale = t));
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "showOnTouch", {
    get: function () {
      return this._showOnTouch;
    },
    set: function (t) {
      this._showOnTouch !== t &&
        ((this._showOnTouch = t),
        this._showOnTouch && this.visible && (this.visible = !1));
    },
  }),
  (Phaser.VirtualJoystick.Button = function (t, e, i, s, n, o, a) {
    (this.pad = t),
      (this.upFrame = o),
      (this.downFrame = a),
      (this.sprite = this.pad.game.make.sprite(i, s, n, o)),
      this.sprite.anchor.set(0.5),
      e === Phaser.VirtualJoystick.CIRC_BUTTON
        ? (this.hitArea = new Phaser.Circle(
            this.sprite.x,
            this.sprite.y,
            this.sprite.width
          ))
        : e === Phaser.VirtualJoystick.RECT_BUTTON &&
          (this.hitArea = new Phaser.Rectangle(
            this.sprite.x - this.sprite.width / 2,
            this.sprite.y - this.sprite.height / 2,
            this.sprite.width,
            this.sprite.height
          )),
      (this.pointer = null),
      (this.enabled = !0),
      (this.isDown = !1),
      (this.isUp = !0),
      (this.onDown = new Phaser.Signal()),
      (this.onUp = new Phaser.Signal()),
      (this.timeDown = 0),
      (this.timeUp = 0),
      (this.repeatRate = 0),
      (this.key = null),
      (this._timeNext = 0),
      (this._scale = 1),
      this.pad.game.stage.addChild(this.sprite),
      this.pad.game.input.onDown.add(this.checkDown, this),
      this.pad.game.input.onUp.add(this.checkUp, this);
  }),
  (Phaser.VirtualJoystick.Button.prototype = {
    addKey: function (t) {
      if (this.key) {
        if (this.key.keyCode === t) return !1;
        this.key.onDown.removeAll(),
          this.key.onUp.removeAll(),
          this.pad.game.input.keyboard.removeKey(this.key),
          (this.key = null);
      }
      return (
        t &&
          ((this.key = this.pad.game.input.keyboard.addKey(t)),
          this.key.onDown.add(this.keyDown, this),
          this.key.onUp.add(this.keyUp, this)),
        this.key
      );
    },
    keyDown: function () {
      this.isDown ||
        ((this.sprite.frameName = this.downFrame),
        (this.isDown = !0),
        (this.isUp = !1),
        (this.timeDown = this.pad.game.time.time),
        (this.timeUp = 0),
        this.onDown.dispatch(this, this.key),
        (this._timeNext = this.timeDown + this.repeatRate));
    },
    keyUp: function () {
      this.isDown &&
        ((this.sprite.frameName = this.upFrame),
        (this.isDown = !1),
        (this.isUp = !0),
        (this.timeUp = this.pad.game.time.time),
        this.onUp.dispatch(this, this.key, this.duration));
    },
    checkDown: function (t) {
      this.enabled &&
        this.isUp &&
        this.hitArea.contains(t.x, t.y) &&
        ((this.pointer = t),
        (this.sprite.frameName = this.downFrame),
        (this.isDown = !0),
        (this.isUp = !1),
        (this.timeDown = this.pad.game.time.time),
        (this.timeUp = 0),
        this.onDown.dispatch(this, t),
        (this._timeNext = this.timeDown + this.repeatRate));
    },
    checkUp: function (t) {
      t === this.pointer &&
        ((this.pointer = null),
        (this.sprite.frameName = this.upFrame),
        (this.isDown = !1),
        (this.isUp = !0),
        (this.timeUp = this.pad.game.time.time),
        this.onUp.dispatch(this, t, this.duration));
    },
    update: function () {
      0 < this.repeatRate &&
        this.isDown &&
        this.pad.game.time.time >= this._timeNext &&
        (this.onDown.dispatch(this, this.pointer),
        (this._timeNext = this.pad.game.time.time + this.repeatRate));
    },
    alignBottomLeft: function (t) {
      void 0 === t && (t = 0);
      var e = this.sprite.width / 2 + t,
        i = this.sprite.height / 2 + t;
      (this.posX = e), (this.posY = this.pad.game.height - i);
    },
    alignBottomRight: function (t) {
      void 0 === t && (t = 0);
      var e = this.sprite.width / 2 + t,
        i = this.sprite.height / 2 + t;
      (this.posX = this.pad.game.width - e),
        (this.posY = this.pad.game.height - i);
    },
    destroy: function () {
      this.pad.game.input.onDown.remove(this.checkDown, this),
        this.pad.game.input.onUp.remove(this.checkUp, this),
        this.sprite.destroy(),
        this.onDown.dispose(),
        this.onUp.dispose(),
        (this.hitArea = null),
        (this.pointer = null),
        (this._scale = null),
        (this.pad = null);
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "posX", {
    get: function () {
      return this.sprite.x;
    },
    set: function (t) {
      this.sprite.x !== t &&
        ((this.sprite.x = t),
        this.hitArea.type === Phaser.CIRCLE
          ? (this.hitArea.x = t)
          : (this.hitArea.x = t - this.sprite.width / 2));
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "posY", {
    get: function () {
      return this.sprite.y;
    },
    set: function (t) {
      this.sprite.y !== t &&
        ((this.sprite.y = t),
        this.hitArea.type === Phaser.CIRCLE
          ? (this.hitArea.y = t)
          : (this.hitArea.y = t - this.sprite.height / 2));
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "alpha", {
    get: function () {
      return this.sprite.alpha;
    },
    set: function (t) {
      this.sprite.alpha = t;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "visible", {
    get: function () {
      return this.sprite.visible;
    },
    set: function (t) {
      this.sprite.visible = t;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "scale", {
    get: function () {
      return this._scale;
    },
    set: function (t) {
      this._scale !== t &&
        (this.sprite.scale.set(t),
        this.hitArea.type === Phaser.CIRCLE
          ? this.hitArea.setTo(this.sprite.x, this.sprite.y, this.sprite.width)
          : this.hitArea.setTo(
              this.sprite.x,
              this.sprite.y,
              this.sprite.width,
              this.sprite.height
            ),
        (this._scale = t));
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "duration", {
    get: function () {
      return this.isUp
        ? this.timeUp - this.timeDown
        : this.game.time.time - this.timeDown;
    },
  }),
  (Phaser.VirtualJoystick.DPad = function (t, e, i, s, n, o, a, r, h, l) {
    (this.pad = t),
      (this.neutralFrame = o),
      (this.upFrame = a),
      (this.downFrame = r),
      (this.leftFrame = h),
      (this.rightFrame = l),
      (this.position = new Phaser.Point(e, i)),
      (this.line = new Phaser.Line(
        this.position.x,
        this.position.y,
        this.position.x,
        this.position.y
      )),
      (this.sprite = this.pad.game.make.sprite(e, i, n, o)),
      this.sprite.anchor.set(0.5),
      (this.baseHitArea = new Phaser.Circle(
        this.position.x,
        this.position.y,
        s
      )),
      (this.stickHitArea = new Phaser.Circle(
        this.position.x,
        this.position.y,
        this.sprite.width
      )),
      (this.limitPoint = new Phaser.Point()),
      (this.pointer = null),
      (this.enabled = !0),
      (this.isDown = !1),
      (this.isUp = !0),
      (this.onDown = new Phaser.Signal()),
      (this.onUp = new Phaser.Signal()),
      (this.onMove = new Phaser.Signal()),
      (this.onUpdate = new Phaser.Signal()),
      (this.timeDown = 0),
      (this.timeUp = 0),
      (this.angle = 0),
      (this.angleFull = 0),
      (this.quadrant = 0),
      (this.octant = 0),
      (this.direction = Phaser.NONE),
      (this._distance = s),
      (this._deadZone = 0.15 * s),
      (this._scale = 1),
      (this._tracking = !1),
      (this._showOnTouch = !1),
      this.pad.game.stage.addChild(this.sprite),
      this.pad.game.input.onDown.add(this.checkDown, this),
      this.pad.game.input.onUp.add(this.checkUp, this),
      this.pad.game.input.addMoveCallback(this.moveStick, this);
  }),
  (Phaser.VirtualJoystick.DPad.prototype = {
    checkDown: function (t) {
      this.enabled &&
        this.isUp &&
        ((this.pointer = t),
        this.line.end.copyFrom(t),
        this._showOnTouch
          ? (this.line.start.copyFrom(t),
            (this.posX = t.x),
            (this.posY = t.y),
            (this.visible = !0),
            this.setDown())
          : this.stickHitArea.contains(t.x, t.y) &&
            (this.line.length <= this.deadZone
              ? (this._tracking = !0)
              : (this.setDown(), this.moveStick())));
    },
    checkUp: function (t) {
      t === this.pointer &&
        ((this.pointer = null),
        (this.stickHitArea.x = this.position.x),
        (this.stickHitArea.y = this.position.y),
        (this.sprite.frameName = this.neutralFrame),
        this.line.end.copyFrom(this.line.start),
        (this.isDown = !1),
        (this.isUp = !0),
        (this.direction = Phaser.NONE),
        (this.timeUp = this.pad.game.time.time),
        this.onUp.dispatch(this, t),
        this._showOnTouch && (this.visible = !1));
    },
    setDown: function () {
      (this.isDown = !0),
        (this.isUp = !1),
        (this.timeDown = this.pad.game.time.time),
        (this.timeUp = 0),
        (this._tracking = !1),
        this.checkArea(),
        this.onDown.dispatch(this, this.pointer);
    },
    checkArea: function () {
      (this.angle = this.pad.game.math.radToDeg(this.line.angle)),
        (this.angleFull = this.angle),
        this.angleFull < 0 && (this.angleFull += 360),
        (this.octant = 45 * Math.round(this.angleFull / 45)),
        45 <= this.angleFull && this.angleFull < 135
          ? (this.quadrant = 1)
          : 135 <= this.angleFull && this.angleFull < 225
          ? (this.quadrant = 2)
          : 225 <= this.angleFull && this.angleFull < 315
          ? (this.quadrant = 3)
          : (this.quadrant = 0);
    },
    moveStick: function () {
      return this.pointer && (this.isDown || this._tracking)
        ? (this.line.end.copyFrom(this.pointer),
          this.checkArea(),
          !this.isDown && this.line.length <= this.deadZone
            ? ((this.direction = Phaser.NONE),
              void (this.sprite.frameName = this.neutralFrame))
            : (this._tracking && this.setDown(),
              this.line.length < this.baseHitArea.radius
                ? this.motionLock === Phaser.VirtualJoystick.NONE
                  ? ((this.stickHitArea.x = this.pointer.x),
                    (this.stickHitArea.y = this.pointer.y))
                  : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
                  ? (this.stickHitArea.x = this.pointer.x)
                  : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
                    (this.stickHitArea.y = this.pointer.y)
                : (this.baseHitArea.circumferencePoint(
                    this.line.angle,
                    !1,
                    this.limitPoint
                  ),
                  this.motionLock === Phaser.VirtualJoystick.NONE
                    ? ((this.stickHitArea.x = this.limitPoint.x),
                      (this.stickHitArea.y = this.limitPoint.y))
                    : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
                    ? (this.stickHitArea.x = this.limitPoint.x)
                    : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
                      (this.stickHitArea.y = this.limitPoint.y)),
              1 === this.quadrant
                ? ((this.sprite.frameName = this.downFrame),
                  (this.direction = Phaser.DOWN))
                : 2 === this.quadrant
                ? ((this.sprite.frameName = this.leftFrame),
                  (this.direction = Phaser.LEFT))
                : 3 === this.quadrant
                ? ((this.sprite.frameName = this.upFrame),
                  (this.direction = Phaser.UP))
                : ((this.sprite.frameName = this.rightFrame),
                  (this.direction = Phaser.RIGHT)),
              void this.onMove.dispatch(this, this.x, this.y)))
        : ((this.direction = Phaser.NONE),
          void (this.sprite.frameName = this.neutralFrame));
    },
    update: function () {
      this.isDown &&
        !this._tracking &&
        this.onUpdate.dispatch(this, this.x, this.y);
    },
    alignBottomLeft: function (t) {
      void 0 === t && (t = 0);
      var e = this.sprite.width / 2 + t,
        i = this.sprite.height / 2 + t;
      (this.posX = e), (this.posY = this.pad.game.height - i);
    },
    alignBottomRight: function (t) {
      void 0 === t && (t = 0);
      var e = this.sprite.width / 2 + t,
        i = this.sprite.height / 2 + t;
      (this.posX = this.pad.game.width - e),
        (this.posY = this.pad.game.height - i);
    },
    destroy: function () {
      this.pad.game.input.onDown.remove(this.checkDown, this),
        this.pad.game.input.onUp.remove(this.checkUp, this);
      for (var t = this.pad.game.input.moveCallbacks, e = 0; e < t.length; e++)
        if (t.callback === this.moveStick && t.context === this) {
          t.splice(e, 1);
          break;
        }
      this.sprite.destroy(),
        (this.stickHitArea = null),
        (this.baseHitArea = null),
        (this.line = null),
        (this.limitPoint = null),
        this.onDown.dispose(),
        this.onUp.dispose(),
        (this.pointer = null),
        (this._scale = null),
        (this.pad = null);
    },
    debug: function (t, e, i) {
      void 0 === t && (t = !0),
        void 0 === e && (e = !0),
        void 0 === i && (i = this.sprite.right);
      var s = this.pad.game.debug;
      if (
        (t &&
          ((s.context.lineWidth = 2),
          s.geom(this.baseHitArea, "rgba(255, 0, 0, 1)", !1),
          s.geom(this.stickHitArea, "rgba(0, 255, 0, 1)", !1),
          s.geom(this.line, "rgba(255, 255, 0, 1)"),
          (s.context.lineWidth = 1)),
        e)
      ) {
        var n = s.renderShadow,
          o = i,
          a = this.sprite.y - 48;
        (s.renderShadow = !0),
          s.text("X: " + this.x, o, a),
          s.text("Y: " + this.y, o, a + 24),
          s.text("Distance: " + this.distance, o, a + 48),
          s.text("Quadrant: " + this.quadrant, o, a + 96),
          s.text("Octant: " + this.octant, o, a + 120),
          (s.renderShadow = n);
      }
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "rotation", {
    get: function () {
      return this.line.angle;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "posX", {
    get: function () {
      return this.position.x;
    },
    set: function (t) {
      this.position.x !== t &&
        ((this.position.x = t),
        (this.sprite.x = t),
        (this.baseHitArea.x = t),
        (this.stickHitArea.x = t),
        (this.line.start.x = t),
        (this.line.end.x = t));
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "posY", {
    get: function () {
      return this.position.y;
    },
    set: function (t) {
      this.position.y !== t &&
        ((this.position.y = t),
        (this.sprite.y = t),
        (this.baseHitArea.y = t),
        (this.stickHitArea.y = t),
        (this.line.start.y = t),
        (this.line.end.y = t));
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "x", {
    get: function () {
      return this.direction === Phaser.LEFT
        ? -1
        : this.direction === Phaser.RIGHT
        ? 1
        : 0;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "y", {
    get: function () {
      return this.direction === Phaser.UP
        ? -1
        : this.direction === Phaser.DOWN
        ? 1
        : 0;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "alpha", {
    get: function () {
      return this.sprite.alpha;
    },
    set: function (t) {
      this.sprite.alpha = t;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "visible", {
    get: function () {
      return this.sprite.visible;
    },
    set: function (t) {
      this.sprite.visible = t;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "distance", {
    get: function () {
      return this._distance * this._scale;
    },
    set: function (t) {
      this._distance !== t && (this._distance = t);
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "deadZone", {
    get: function () {
      return this._deadZone * this._scale;
    },
    set: function (t) {
      this._deadZone = t;
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "scale", {
    get: function () {
      return this._scale;
    },
    set: function (t) {
      this._scale !== t &&
        (this.sprite.scale.set(t),
        this.baseHitArea.setTo(
          this.position.x,
          this.position.y,
          this.distance * t
        ),
        this.stickHitArea.setTo(
          this.position.x,
          this.position.y,
          this.sprite.width
        ),
        (this._scale = t));
    },
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "showOnTouch", {
    get: function () {
      return this._showOnTouch;
    },
    set: function (t) {
      this._showOnTouch !== t &&
        ((this._showOnTouch = t),
        this._showOnTouch && this.visible && (this.visible = !1));
    },
  }),
  (function (o) {
    var t = (function (s) {
      function n() {
        return (null !== s && s.apply(this, arguments)) || this;
      }
      return (
        __extends(n, s),
        (n.prototype.onCreate = function (t) {
          s.prototype.onCreate.call(this, t);
          var e = this._visual,
            i = 10 / o.Gameplay.SUN_EXPLODE_TIME;
          e.animations.add("explosion", n.EXPLOSION, i, !1),
            (i = 7 / o.Gameplay.BLACKHOLE_MERGE_TIME),
            e.animations.add("blackhole", n.BLACK_HOLE, i, !1);
        }),
        (n.prototype.onEmit = function (t) {
          s.prototype.onEmit.call(this, t),
            this._visual.animations.currentAnim.stop();
        }),
        (n.EXPLOSION = Phaser.Animation.generateFrameNames("explosion0", 0, 9)),
        (n.BLACK_HOLE = Phaser.Animation.generateFrameNames("bh_anim0", 1, 7)),
        n
      );
    })(o.SpriteParticle);
    o.AnimatedParticle = t;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function () {
      function t() {
        (this.blocks = []), (this.length = 0), (this.consecutiveMatch = 0);
      }
      return (
        (t.prototype.clear = function () {
          this.length = 0;
        }),
        (t.prototype.add = function (t) {
          this.blocks[this.length++] = t;
        }),
        t
      );
    })();
    t.BlockChain = e;
  })(Meteoric || (Meteoric = {})),
  (function (n) {
    var t = (function (i) {
      function s(t) {
        var e = i.call(this, t, 0, 0, "Sprites") || this;
        return (
          e.anchor.set(0.5, 0.5),
          (e._over = new Phaser.Sprite(t, 0, 0, "Sprites")),
          e._over.anchor.set(0.5, 0.5),
          e._over.kill(),
          (e._under = new Phaser.Sprite(t, 0, 0, "Sprites")),
          e._under.anchor.set(0.5, 0.5),
          e._under.kill(),
          (e._fallTween1 = t.add
            .tween(e.scale)
            .to({ x: 1.15 }, s.TWEEN_TIME, n.Easing.halfSin, !1)),
          (e._fallTween2 = t.add
            .tween(e.scale)
            .to({ y: 0.9 }, s.TWEEN_TIME, n.Easing.halfSin, !1)),
          e
        );
      }
      return (
        __extends(s, i),
        Object.defineProperty(s.prototype, "block", {
          get: function () {
            return this._block;
          },
          set: function (t) {
            this._block = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (s.prototype.setVisual = function (t) {
          var e = this._block,
            i = n.BlockTypes.types[e.value];
          this.scale.set(1, 1),
            this._under.scale.set(1, 1),
            this._over.scale.set(1, 1),
            e.type <= n.eBlockType.PLANET
              ? ((this.frameName = n.BlockTypes.SPRITE_DEFS[e.type][i]),
                e === t.board.currentBlock &&
                  ((this._under.exists = this._under.visible = !0),
                  (this._under.frameName =
                    e.type === n.eBlockType.DEBRIS
                      ? "ohon_bordelu"
                      : "ohon_asteroidu"),
                  this._under.anchor.set(0.5, 0.9),
                  t.underGroup.add(this._under)))
              : e.type === n.eBlockType.SUN
              ? ((this.frameName = n.BlockTypes.SUN),
                (this._over.exists = this._over.visible = !0),
                (this._over.frameName = "slunecni_zare"),
                t.overGroup.add(this._over),
                t.underGroup.remove(this._under),
                this._under.kill())
              : e.type === n.eBlockType.SPACESHIP
              ? (this.frameName = n.BlockTypes.SPACESHIP_TYPES[e.value])
              : e.type === n.eBlockType.BLACKHOLE &&
                (this.frameName = n.BlockTypes.BLACKHOLE_TYPES[0]);
        }),
        (s.prototype.onSpawned = function (t) {
          t.add(this);
        }),
        (s.prototype.onDestroy = function (t) {
          t.remove(this),
            t.underGroup.remove(this._under),
            t.overGroup.remove(this._over),
            this._under.kill(),
            this._over.kill();
        }),
        (s.prototype.updateBlock = function (t) {
          var e =
              this._block.x * n.Gameplay.BLOCK_WIDTH +
              n.Gameplay.BLOCK_WIDTH / 2,
            i =
              -this._block.y * n.Gameplay.BLOCK_HEIGHT -
              n.Gameplay.BLOCK_HEIGHT / 2;
          if (
            (this.position.set(e, i),
            this._under.position.set(e, i),
            this._over.position.set(e, i),
            this._block.type === n.eBlockType.SUN)
          ) {
            var s = 1 - 0.1 * t.board.sunshineCounter;
            this._over.scale.set(s, s);
          }
          if (
            (this._under.exists &&
              this._block !== t.board.currentBlock &&
              (t.underGroup.remove(this._under), this._under.kill()),
            this._block.merging &&
              t.board.state === n.eBoardState.BLACKHOLE_MERGE)
          ) {
            s = 1 - 0.6 * t.board.mergeRatio;
            this.scale.set(s, s), this._over.scale.set(s, s);
          }
        }),
        (s.prototype.fallTween = function () {
          this._fallTween1.isRunning ||
            (this._fallTween1.start(), this._fallTween2.start());
        }),
        (s.TWEEN_TIME = 200),
        s
      );
    })(Phaser.Sprite);
    n.BlockSprite = t;
  })(Meteoric || (Meteoric = {})),
  (function (s) {
    var t = (function () {
      function i() {}
      return (
        (i.randomize = function () {
          for (var t = [], e = 0; e < s.Gameplay.PLANETS_ASSETS_COUNT; e++)
            t[e] = e;
          i.types = Helper.ArrayUtils.randomizeArray(
            s.Gameplay.PLANETS_ASSETS_COUNT,
            t
          );
        }),
        (i.SPRITE_DEFS = [
          (i.DEBRIS_TYPES = [
            "bordel_A",
            "bordel_B",
            "bordel_C",
            "bordel_D",
            "bordel_E",
            "bordel_F",
          ]),
          (i.ASTEROID_TYPES = [
            "asteroid_A",
            "asteroid_B",
            "asteroid_C",
            "asteroid_D",
            "asteroid_E",
            "asteroid_F",
          ]),
          (i.PLANET_TYPES = [
            "planeta_A",
            "planeta_B",
            "planeta_C",
            "planeta_D",
            "planeta_E",
            "planeta_F",
          ]),
          (i.SUN = "slunce"),
          (i.SPACESHIP_TYPES = ["satelit", "sputnik", "ufo"]),
          (i.BLACKHOLE_TYPES = ["cerna_dira"]),
        ]),
        i
      );
    })();
    s.BlockTypes = t;
  })(Meteoric || (Meteoric = {})),
  (function (p) {
    var _, t;
    ((t = _ = p.eBoardState || (p.eBoardState = {}))[(t.NONE = 0)] = "NONE"),
      (t[(t.SPAWN = 1)] = "SPAWN"),
      (t[(t.FALL_DELAY = 2)] = "FALL_DELAY"),
      (t[(t.FALLING = 3)] = "FALLING"),
      (t[(t.MATCH = 4)] = "MATCH"),
      (t[(t.MERGE = 5)] = "MERGE"),
      (t[(t.RISE = 6)] = "RISE"),
      (t[(t.RISE_WAIT = 7)] = "RISE_WAIT"),
      (t[(t.SUN_EXPLODE_WAIT = 8)] = "SUN_EXPLODE_WAIT"),
      (t[(t.BLACKHOLE_MERGE = 9)] = "BLACKHOLE_MERGE");
    var e = (function () {
      function e(t, e) {
        (this._foundChains = []),
          (this._mergeBlocks = []),
          (this._sunsToExplode = []),
          (this._game = t),
          (this._listener = e),
          (this._blocks = this.createEmptyBoard());
      }
      return (
        Object.defineProperty(e.prototype, "currentBlock", {
          get: function () {
            return this._currentBlock;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "state", {
          get: function () {
            return this._state;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "mergeRatio", {
          get: function () {
            return this._mergeRatio;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "sunshineCounter", {
          get: function () {
            return this._sunshineCounter;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "fastFall", {
          get: function () {
            return this._fastFall;
          },
          set: function (t) {
            (this._fastFall = t) && (this._fallDelayCounter = 0);
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.moveBlock = function (t) {
          if (0 !== t && null !== this._currentBlock) {
            var e = Math.floor(this._currentBlock.x),
              i = e + t;
            if (!(i < 0 || i >= p.Gameplay.COLUMNS)) {
              var s = Math.floor(this._currentBlock.y);
              null === this._blocks[s][i] &&
                ((this._blocks[s][e] = null),
                (this._blocks[s][i] = this._currentBlock),
                (this._currentBlock.x = i)),
                (this._fallDelayCounter = 0);
            }
          }
        }),
        (e.prototype.reset = function () {
          for (var t = 0; t < p.Gameplay.ROWS + 1; t++)
            for (var e = 0; e < p.Gameplay.COLUMNS; e++)
              null !== this._blocks[t][e] &&
                (p.BlockPool.instance.destroyItem(this._blocks[t][e]),
                (this._blocks[t][e] = null));
          (this._currentBlock = null),
            (this._fallSpeed = p.Gameplay.FALL_SPEED),
            (this._spaceshipRoundCounter = this._game.rnd.integerInRange(
              p.Gameplay.SPACESHIP_FALL_ROUND_MIN,
              p.Gameplay.SPACESHIP_FALL_ROUND_MAX
            )),
            (this._riseRoundCounter = this._game.rnd.integerInRange(
              p.Gameplay.RISE_ROUND_MIN,
              p.Gameplay.RISE_ROUND_MAX
            )),
            (this._blackholeCounter =
              p.Gameplay.CONSECUTIVE_MATCHES_FOR_BLACKHOLE),
            (this._planetsCount = p.Gameplay.PLANETS_COUNT),
            this.spawnRows(p.Gameplay.INITIAL_ROWS, !0),
            (this._state = _.SPAWN),
            (this._spawnCounter = 0),
            (this._consecutiveMatches = 0);
        }),
        (e.prototype.update = function () {
          switch ((this.updateSunshine(), this._state)) {
            case _.SPAWN:
              (this.fastFall = !1),
                this.spawnBlock(),
                null !== this._currentBlock
                  ? ((this._state = _.FALL_DELAY),
                    (this._fallDelayCounter = p.Gameplay.FALL_DELAY))
                  : (this._state = _.FALLING);
              break;
            case _.FALL_DELAY:
              (this._fallDelayCounter -= this._game.time.physicsElapsed),
                this._fallDelayCounter <= 0 && (this._state = _.FALLING);
              break;
            case _.FALLING:
              var t = _.NONE;
              (t = this.fall(this._fallSpeed)) !== _.NONE && (this._state = t);
              break;
            case _.BLACKHOLE_MERGE:
              this.updateMerge(this._game.time.physicsElapsed) &&
                (this.destroyMerged(), (this._state = _.FALLING));
              break;
            case _.MATCH:
              (this._currentBlock = null),
                0 === this.findGroups()
                  ? (this._userObjectFalling &&
                      ((this._consecutiveMatches = 0),
                      (this._blackholeCounter =
                        p.Gameplay.CONSECUTIVE_MATCHES_FOR_BLACKHOLE)),
                    this._riseRoundCounter <= 0 ||
                    this.objectsCount() < p.Gameplay.MINIMAL_OBJECTS_COUNT
                      ? ((this._waitCounter = p.Gameplay.RISE_TIME),
                        this.initRise(),
                        (this._state = _.RISE_WAIT))
                      : (this._state = _.SPAWN))
                  : (--this._blackholeCounter,
                    this.removeChains()
                      ? ((this._mergeTime = 0),
                        (this._mergeRatio = 0),
                        (this._state = _.MERGE))
                      : (this._state = _.FALLING)),
                this.clearFall();
              break;
            case _.MERGE:
              this.updateMerge(this._game.time.physicsElapsed) &&
                (this.destroyMerged(),
                this._waitCounter <= 0
                  ? (this._state = _.FALLING)
                  : (this._state = _.SUN_EXPLODE_WAIT));
              break;
            case _.SUN_EXPLODE_WAIT:
              (this._waitCounter -= this._game.time.physicsElapsed) <= 0 &&
                (this._state = _.FALLING);
              break;
            case _.RISE_WAIT:
              (this._waitCounter -= this._game.time.physicsElapsed) <= 0 &&
                (this._state = _.RISE);
              break;
            case _.RISE:
              this.rise(this._game.time.physicsElapsed) ||
                (this._gameOverAfterRise
                  ? ((this._state = _.NONE), this._listener.onGameOver(null))
                  : (this._state = _.SPAWN));
          }
        }),
        (e.prototype.objectsCount = function () {
          for (var t = 0, e = 0; e < p.Gameplay.ROWS; e++)
            for (var i = 0; i < p.Gameplay.COLUMNS; i++)
              null !== this._blocks[e][i] && ++t;
          return t;
        }),
        (e.prototype.updateSunshine = function () {
          var t = (this._game.time.time % e.SUNSHINE_SPEED) / e.SUNSHINE_SPEED;
          this._sunshineCounter = Math.sin(Math.PI * t);
        }),
        (e.prototype.initRise = function () {
          (this._gameOverAfterRise = !1),
            (this._riseTimeCounter = p.Gameplay.RISE_TIME),
            (this._riseRoundCounter = this._game.rnd.integerInRange(
              p.Gameplay.RISE_ROUND_MIN,
              p.Gameplay.RISE_ROUND_MAX
            ));
          for (var t = p.Gameplay.ROWS - 1, e = t; 0 <= e; e--)
            for (var i = 0; i < p.Gameplay.COLUMNS; i++) {
              var s = this._blocks[e][i];
              (this._blocks[e + 1][i] = s),
                (this._blocks[e][i] = null),
                e === t && null !== s && (this._gameOverAfterRise = !0);
            }
          this.spawnRows(1, !1), this.rise(0), this._listener.onBoardRise();
        }),
        (e.prototype.rise = function (t) {
          var e = 0,
            i = this._gameOverAfterRise ? 0.4 : 0;
          (this._riseTimeCounter -= t),
            (e =
              this._riseTimeCounter > i
                ? this._riseTimeCounter / p.Gameplay.RISE_TIME
                : i);
          for (var s = p.Gameplay.ROWS; 0 <= s; s--)
            for (var n = 0; n < p.Gameplay.COLUMNS; n++) {
              var o = this._blocks[s][n];
              null !== o && (o.y = s - e);
            }
          return i < e;
        }),
        (e.prototype.fall = function (t) {
          var e = 1,
            i = 1,
            s = t * this._game.time.physicsElapsed,
            n = !1,
            o = !1,
            a = null;
          this._userObjectFalling = !1;
          for (var r = 0; r < p.Gameplay.ROWS; r++)
            for (var h = 0; h < p.Gameplay.COLUMNS; h++) {
              var l = this._blocks[r][h];
              if (null !== l) {
                this._blocks[r][h] = null;
                var c = l.y;
                this._currentBlock === l
                  ? this._fastFall
                    ? (l.y -= s * p.Gameplay.FAST_FALL_MULTIPLIER)
                    : (l.y -= s)
                  : (l.y -= s * p.Gameplay.PLANET_FALL_MULTIPLIER);
                var u = Math.floor(l.y);
                (u < 0 || null !== this._blocks[u][h]) && ((u += 1), (l.y = u)),
                  (this._blocks[u][h] = l).y !== c
                    ? ((n = !0), (l.falling = !0))
                    : (l.falling &&
                        (this._listener.onFallEnded(l),
                        l.type === p.eBlockType.SPACESHIP
                          ? 0 < e &&
                            (Utils.AudioUtils.playSound("TrashImpact"), --e)
                          : 0 < i &&
                            (Utils.AudioUtils.playSound("Impact"), --i)),
                      l === this._currentBlock &&
                        (l.type === p.eBlockType.BLACKHOLE
                          ? ((o = !0), (a = l))
                          : (this._userObjectFalling = !0),
                        (this._currentBlock = null)));
              }
            }
          return (
            o && null !== a && this.explodeBlackhole(a),
            n ? _.NONE : o ? _.BLACKHOLE_MERGE : _.MATCH
          );
        }),
        (e.prototype.updateMerge = function (t) {
          var e = !1;
          (this._mergeTime += t),
            this._mergeTime > this._mergingTimeMax
              ? ((this._mergeTime = this._mergingTimeMax),
                (this._mergeRatio = 1),
                (e = !0))
              : (this._mergeRatio = this._mergeTime / this._mergingTimeMax),
            this._state === _.BLACKHOLE_MERGE &&
              ((this._mergeRatio = this._mergeRatio * this._mergeRatio),
              (this._mergeRatio = this._mergeRatio * this._mergeRatio));
          for (var i = 0; i < this._mergeBlocksCount; i++)
            this._mergeBlocks[i].update(this._mergeRatio);
          if (e) {
            0 < this._sunsToExplodeCount
              ? (this._waitCounter = p.Gameplay.SUN_EXPLODE_TIME)
              : (this._waitCounter = 0);
            for (i = 0; i < this._sunsToExplodeCount; i++) {
              var s = this._sunsToExplode[i];
              this._listener.onExplodeSun(s), this.explodeSun(s);
            }
          }
          return e;
        }),
        (e.prototype.destroyMerged = function () {
          for (var t = 0; t < this._mergeBlocksCount; t++)
            if (this._mergeBlocks[t].destroyOnFinish) {
              var e = this._mergeBlocks[t].block;
              this.destroyBlock(e);
            }
        }),
        (e.prototype.iterateBlocks = function (t) {
          for (var e = 0; e < p.Gameplay.ROWS; e++)
            for (var i = 0; i < p.Gameplay.COLUMNS; i++) {
              var s = this._blocks[e][i];
              null !== s && t(s);
            }
        }),
        (e.prototype.clearMatched = function () {
          this.iterateBlocks(function (t) {
            t.clearMerged();
          });
        }),
        (e.prototype.clearMatchCount = function () {
          this.iterateBlocks(function (t) {
            t.clearMatchCount();
          });
        }),
        (e.prototype.clearFall = function () {
          this.iterateBlocks(function (t) {
            t.clearFall();
          });
        }),
        (e.prototype.findGroups = function () {
          (this._foundChainsCount = 0), this.clearMatchCount();
          for (var t = this.getFreeChain(), e = 0; e < p.Gameplay.ROWS; e++)
            for (var i = 0; i < p.Gameplay.COLUMNS; i++) {
              var s = this._blocks[e][i];
              if (null !== s && s.isBasic && 0 === s.matchCount)
                if (
                  this.findGroupRecursively(i, e, s, t) >=
                  p.Gameplay.MATCH_LENGTH
                ) {
                  ++this._consecutiveMatches;
                  var n = this._consecutiveMatches;
                  t.consecutiveMatch = 3 <= n ? n : 0;
                  var o = 10;
                  s.type === p.eBlockType.PLANET
                    ? (o = 20)
                    : s.type === p.eBlockType.SUN && (o = 30),
                    (o *= Math.min(
                      this._consecutiveMatches,
                      p.Gameplay.MAX_SCORE_STREAK
                    )),
                    this._listener.onAddScore(o),
                    (t = this.getFreeChain());
                } else t.clear();
            }
          return (
            t.length < p.Gameplay.MATCH_LENGTH && --this._foundChainsCount,
            this._foundChainsCount
          );
        }),
        (e.prototype.findGroupRecursively = function (t, e, i, s) {
          if (t < 0 || t >= p.Gameplay.COLUMNS || e < 0 || e >= p.Gameplay.ROWS)
            return s.length;
          var n = this._blocks[e][t];
          return (
            null !== n &&
              0 === n.matchCount &&
              n.equals(i) &&
              (s.add(n),
              (n.matchCount = 1),
              this.findGroupRecursively(t - 1, e, n, s),
              this.findGroupRecursively(t + 1, e, n, s),
              this.findGroupRecursively(t, e - 1, n, s),
              this.findGroupRecursively(t, e + 1, n, s)),
            s.length
          );
        }),
        (e.prototype.getFreeChain = function () {
          this._foundChainsCount >= this._foundChains.length &&
            (this._foundChains[this._foundChainsCount] = new p.BlockChain());
          var t = this._foundChains[this._foundChainsCount++];
          return t.clear(), t;
        }),
        (e.prototype.removeChains = function () {
          (this._mergingTimeMax = p.Gameplay.MERGE_TIME), this.clearMatched();
          var t = !1;
          this._mergeBlocksCount = 0;
          for (
            var e = (this._sunsToExplodeCount = 0);
            e < this._foundChainsCount;
            e++
          ) {
            var i = this._foundChains[e],
              s = this.getChainMainBlock(i),
              n = i.consecutiveMatch;
            (3 !== n && 5 !== n && 7 !== n) ||
              (this._listener.onStreakTitle(n),
              n < 7
                ? Utils.AudioUtils.playSound("SmallCheer")
                : Utils.AudioUtils.playSound("BigCheer")),
              3 <= n && this._listener.onStreak(s, n);
            for (var o = 0; o < i.length; o++) {
              var a = i.blocks[o];
              a.type === p.eBlockType.ASTEROID
                ? Utils.AudioUtils.playSound("MatchAsteroid")
                : a.type === p.eBlockType.PLANET
                ? Utils.AudioUtils.playSound("MatchPlanet")
                : a.type === p.eBlockType.SUN &&
                  Utils.AudioUtils.playSound("MatchSun"),
                this.explodeSpaceships(a),
                a !== s
                  ? ((a.mainBlock = !1), (this._blocks[a.y][a.x] = null))
                  : (a.mainBlock = !0),
                this.setMerger(a, s),
                (t = !0);
            }
          }
          return t;
        }),
        (e.prototype.setMerger = function (t, e) {
          this._mergeBlocksCount >= this._mergeBlocks.length &&
            (this._mergeBlocks[this._mergeBlocksCount] = new p.Merger(this)),
            this._mergeBlocks[this._mergeBlocksCount++].init(
              t,
              t !== e,
              t.x,
              t.y,
              e.x,
              e.y
            ),
            (t.merging = !0);
        }),
        (e.prototype.explodeBlackhole = function (t) {
          (this._mergeRatio = 0),
            (this._mergingTimeMax = p.Gameplay.BLACKHOLE_MERGE_TIME),
            this.clearMatched(),
            (this._mergeBlocksCount = 0),
            (this._sunsToExplodeCount = 0);
          for (var e = t.x, i = t.y, s = 0; s < p.Gameplay.COLUMNS; s++) {
            null !== (o = this._blocks[i][s]) &&
              o !== t &&
              ((this._blocks[i][s] = null), this.setMerger(o, t));
          }
          for (var n = 0; n < p.Gameplay.ROWS; n++) {
            var o;
            null !== (o = this._blocks[n][e]) &&
              o !== t &&
              ((this._blocks[n][e] = null), this.setMerger(o, t));
          }
          (this._blocks[i][e] = null),
            this._listener.onExplodeBlackhole(t),
            this.destroyBlock(t);
        }),
        (e.prototype.explodeSpaceships = function (t) {
          this.explodeSpaceship(t.x, t.y + 1),
            this.explodeSpaceship(t.x - 1, t.y),
            this.explodeSpaceship(t.x + 1, t.y),
            this.explodeSpaceship(t.x, t.y - 1);
        }),
        (e.prototype.explodeSpaceship = function (t, e) {
          if (
            !(t < 0 || t >= p.Gameplay.COLUMNS || e < 0 || e >= p.Gameplay.ROWS)
          ) {
            var i = this._blocks[e][t];
            null !== i &&
              i.type === p.eBlockType.SPACESHIP &&
              ((this._blocks[e][t] = null),
              this._listener.onExplodeSpaceship(i),
              this.destroyBlock(i));
          }
        }),
        (e.prototype.explodeSun = function (t) {
          for (var e = t.x, i = t.y, s = i - 1; s <= i + 1; s++)
            if (!(s < 0 || s >= p.Gameplay.ROWS))
              for (var n = e - 1; n <= e + 1; n++)
                if (!(n < 0 || n >= p.Gameplay.COLUMNS)) {
                  var o = this._blocks[s][n];
                  null !== o &&
                    ((n === e && s === i) || this._listener.onKilledBySun(o, t),
                    (this._blocks[s][n] = null),
                    this.destroyBlock(o));
                }
        }),
        (e.prototype.onMergeFinish = function (t) {
          this._state == _.MERGE &&
            (t.type <= p.eBlockType.PLANET
              ? (++t.type,
                (t.value = t.type !== p.eBlockType.SUN ? t.value : 0))
              : t.type === p.eBlockType.SUN &&
                t.mainBlock &&
                (this._sunsToExplode[this._sunsToExplodeCount++] = t),
            this._listener.onBlockMergeFinish(t));
        }),
        (e.prototype.getChainMainBlock = function (t) {
          for (var e = t.blocks[0], i = 0; i < t.length; i++) {
            var s = t.blocks[i];
            s.falling && (e.falling ? s.y <= e.y && (e = s) : (e = s));
          }
          return e;
        }),
        (e.prototype.destroyBlock = function (t) {
          this._listener.onBlockDestroyed(t),
            p.BlockPool.instance.destroyItem(t);
        }),
        (e.prototype.createEmptyBoard = function () {
          for (var t = [], e = 0; e < p.Gameplay.ROWS + 1; e++) {
            for (var i = [], s = 0; s < p.Gameplay.COLUMNS; s++) i[s] = null;
            t[e] = i;
          }
          return t;
        }),
        (e.prototype.spawnBlock = function () {
          var t = !1;
          this._blackholeCounter <= 0 &&
            ((t = !0),
            (this._blackholeCounter =
              p.Gameplay.CONSECUTIVE_MATCHES_FOR_BLACKHOLE));
          var e = !1;
          --this._spaceshipRoundCounter <= 0 &&
            ((e = !0),
            (this._spaceshipRoundCounter = this._game.rnd.integerInRange(
              p.Gameplay.SPACESHIP_FALL_ROUND_MIN,
              p.Gameplay.SPACESHIP_FALL_ROUND_MAX
            ))),
            --this._riseRoundCounter;
          var i = p.BlockPool.instance.createItem();
          return (
            i.clear(),
            t
              ? this.spawnStandard(i, !0)
              : e
              ? this.spawnSpaceship(i)
              : this.spawnStandard(i, !1),
            i
          );
        }),
        (e.prototype.spawnStandard = function (t, e) {
          var i = p.Gameplay.ROWS - 1,
            s = Math.floor(p.Gameplay.COLUMNS / 2);
          p.Gameplay.COLUMNS % 2 == 0 &&
            (null === this._blocks[i][s] && null === this._blocks[i][s - 1]
              ? (s += p.Global.game.rnd.integerInRange(-1, 0))
              : null !== this._blocks[i][s] && (s -= 1)),
            e
              ? t.set(s, i + 0.25, 0, p.eBlockType.BLACKHOLE)
              : (t.set(
                  s,
                  i + 0.25,
                  this._game.rnd.integerInRange(0, this._planetsCount - 1),
                  this._game.rnd.integerInRange(
                    p.Gameplay.SPAWN_FROM_ITEM,
                    p.Gameplay.SPAWN_TO_ITEM
                  )
                ),
                ++this._spawnCounter,
                (this._planetsCount =
                  this._spawnCounter > p.Gameplay.PLANET_COUNT_STEP_2
                    ? 6
                    : this._spawnCounter > p.Gameplay.PLANET_COUNT_STEP_1
                    ? 5
                    : 4)),
            (this._currentBlock = t),
            (this._fastFall = !1),
            Utils.AudioUtils.playSound("Fall"),
            this._listener.onBlockSpawned(t),
            null !== this._blocks[i][s]
              ? this._listener.onGameOver(t)
              : (this._blocks[i][s] = t);
        }),
        (e.prototype.spawnSpaceship = function (t) {
          var e = p.Gameplay.ROWS - 1,
            i = this._game.rnd.integerInRange(0, p.Gameplay.COLUMNS - 1),
            s = i;
          do {
            if (null === this._blocks[e][i]) break;
            i = (i + 1) % p.Gameplay.COLUMNS;
          } while (i !== s);
          t.set(
            i,
            e + 0.35,
            this._game.rnd.integerInRange(
              0,
              p.BlockTypes.SPACESHIP_TYPES.length - 1
            ),
            p.eBlockType.SPACESHIP
          ),
            (this._currentBlock = null),
            (this._fastFall = !0),
            Utils.AudioUtils.playSound("Fall"),
            this._listener.onBlockSpawned(t),
            null !== this._blocks[e][i]
              ? ((this._currentBlock = t), this._listener.onGameOver(t))
              : (this._blocks[e][i] = t);
        }),
        (e.prototype.spawnRows = function (t, e) {
          this._foundChainsCount = 0;
          for (
            var i = this.getFreeChain(), s = p.Gameplay.SKIP_PROBABILITY, n = 0;
            n < t;
            n++
          ) {
            for (var o = 0; o < p.Gameplay.COLUMNS; o++)
              if (0 === n || null !== this._blocks[n - 1][o]) {
                if (e && this._game.rnd.frac() < s) continue;
                var a = p.BlockPool.instance.createItem();
                (this._blocks[n][o] = a).clear(),
                  a.set(
                    o,
                    n,
                    this._game.rnd.integerInRange(0, this._planetsCount - 1),
                    this._game.rnd.integerInRange(
                      p.Gameplay.INIT_FROM_ITEM,
                      p.Gameplay.INIT_TO_ITEM
                    )
                  ),
                  this.clearMatchCount(),
                  i.clear();
                for (
                  ;
                  this.findGroupRecursively(o, n, a, i) >=
                  p.Gameplay.MATCH_LENGTH;

                )
                  this.clearMatchCount(),
                    i.clear(),
                    (a.value = this._game.rnd.integerInRange(
                      0,
                      this._planetsCount - 1
                    )),
                    (a.type = this._game.rnd.integerInRange(
                      p.Gameplay.INIT_FROM_ITEM,
                      p.Gameplay.INIT_TO_ITEM
                    ));
                this._listener.onBlockSpawned(a);
              }
            s += p.Gameplay.SKIP_PROBABILITY_STEP;
          }
        }),
        (e.prototype.killAll = function (t) {
          for (var e = 0; e < p.Gameplay.ROWS + 1; e++)
            for (var i = 0; i < p.Gameplay.COLUMNS; i++) {
              var s = this._blocks[e][i];
              null !== s &&
                (p.BlockPool.instance.destroyItem(s),
                t.onExplodeSpaceship(s),
                t.onBlockDestroyed(s),
                (this._blocks[e][i] = null));
            }
          null !== this._currentBlock &&
            (t.onExplodeSpaceship(this._currentBlock),
            t.onBlockDestroyed(this._currentBlock));
        }),
        (e.prototype.prepareToContinue = function (t) {
          for (var e = 0; e < p.Gameplay.DESTROY_ROWS_ON_CONTINUE; e++)
            for (var i = 0; i < p.Gameplay.COLUMNS; i++) {
              null !== (s = this._blocks[e][i]) &&
                (p.BlockPool.instance.destroyItem(s),
                t.onExplodeSpaceship(s),
                t.onBlockDestroyed(s),
                (this._blocks[e][i] = null));
            }
          for (i = 0; i < p.Gameplay.COLUMNS; i++) {
            var s;
            null !== (s = this._blocks[p.Gameplay.ROWS][i]) &&
              (p.BlockPool.instance.destroyItem(s),
              t.onExplodeSpaceship(s),
              t.onBlockDestroyed(s),
              (this._blocks[p.Gameplay.ROWS][i] = null));
          }
          null !== this._currentBlock &&
            (t.onExplodeSpaceship(this._currentBlock),
            t.onBlockDestroyed(this._currentBlock)),
            (this._currentBlock = null),
            (this._state = _.FALLING);
        }),
        (e.SUNSHINE_SPEED = 2e3),
        e
      );
    })();
    p.Board = e;
  })(Meteoric || (Meteoric = {})),
  (function (a) {
    var t = (function (n) {
      function o(t, e) {
        var i = n.call(this, t, e) || this;
        (i._hlpPoint = new Phaser.Point()),
          (a.Gameplay.BLOCK_WIDTH = 80),
          (a.Gameplay.BLOCK_HEIGHT = 80);
        var s = new a.ParticlesEmitter(t, 0, 0, o.DEBRIS_PARTICLES);
        return (
          (s.particleClass = a.DelayedParticle),
          (s.gravity = 2e3),
          (s.lifetime = 5),
          s.setXSpeed(-50, 50),
          s.setYSpeed(-400, -600),
          s.setAngularSpeed(-45, 45),
          s.makeParticles("Sprites", null, o.DEBRIS_PARTICLES),
          e.add(s),
          (i._debrisEmitter = s),
          ((s = new a.ParticlesEmitter(
            t,
            0,
            0,
            o.DEBRIS_PARTICLES
          )).particleClass = a.AnimatedParticle),
          (s.gravity = 0),
          (s.lifetime = 0.75),
          s.setXSpeed(0),
          s.setYSpeed(0),
          s.setAngularSpeed(0),
          s.makeParticles("Sprites", null, o.DEBRIS_PARTICLES),
          e.add(s),
          (i._explosionEmitter = s),
          i
        );
      }
      return (
        __extends(o, n),
        (o.prototype.bringParticlesToFront = function () {
          this._debrisEmitter.parent.bringToTop(this._debrisEmitter),
            this._explosionEmitter.parent.bringToTop(this._explosionEmitter);
        }),
        Object.defineProperty(o.prototype, "board", {
          get: function () {
            return this._board;
          },
          set: function (t) {
            this._board = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(o.prototype, "underGroup", {
          get: function () {
            return this._underGroup;
          },
          set: function (t) {
            this._underGroup = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(o.prototype, "overGroup", {
          get: function () {
            return this._overGroup;
          },
          set: function (t) {
            this._overGroup = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (o.prototype.reset = function () {
          this._debrisEmitter.killAllParticles(),
            this._explosionEmitter.killAllParticles(),
            this.forEach(function (t) {
              (t.block = null), a.BlockSpritePool.instance.destroyItem(t);
            }, this),
            this.removeAll();
        }),
        (o.prototype.update = function () {
          this.forEach(function (t) {
            t.updateBlock(this);
          }, this);
        }),
        (o.prototype.findBlockSprite = function (t) {
          for (var e = 0; e < this.children.length; e++) {
            var i = this.children[e];
            if (i.block === t) return i;
          }
          return null;
        }),
        (o.prototype.onBlockSpawned = function (t) {
          var e = a.BlockSpritePool.instance.createItem();
          (e.block = t),
            e.setVisual(this),
            e.updateBlock(this),
            e.onSpawned(this);
        }),
        (o.prototype.onBlockDestroyed = function (t) {
          var e = this.findBlockSprite(t);
          e.onDestroy(this), a.BlockSpritePool.instance.destroyItem(e);
        }),
        (o.prototype.onBlockMergeFinish = function (t) {
          this.findBlockSprite(t).setVisual(this);
        }),
        (o.prototype.onGameOver = function (t) {}),
        (o.prototype.onExplodeSpaceship = function (t) {
          var e = this.findBlockSprite(t);
          this._debrisEmitter.emitAtObject(e);
          var i = this._debrisEmitter.emitParticle();
          if (null !== i) {
            var s = e.frameName;
            i.setFrame(s);
          }
        }),
        (o.prototype.onExplodeSun = function (t) {
          var e = this.findBlockSprite(t);
          this._explosionEmitter.emitAtObject(e);
          var i = this._explosionEmitter.emitParticle();
          null !== i &&
            ((i.lifetime = a.Gameplay.SUN_EXPLODE_TIME),
            i.visual.animations.play("explosion"));
        }),
        (o.prototype.onKilledBySun = function (t, e) {
          var i = this.findBlockSprite(t);
          this._hlpPoint.set(t.x - e.x, e.y - t.y),
            this._hlpPoint.setMagnitude(this.game.rnd.integerInRange(200, 400));
          var s = i.frameName;
          this._debrisEmitter.emitAtObject(i);
          var n = this._debrisEmitter.emitParticle();
          null !== n &&
            (n.setFrame(s),
            n.setPhysics(
              this._hlpPoint.x,
              this._hlpPoint.y,
              this.game.rnd.integerInRange(-45, 45),
              0,
              0,
              2e3
            ),
            (n.delay = a.Gameplay.SUN_EXPLODE_TIME / 2));
        }),
        (o.prototype.onExplodeBlackhole = function (t) {
          var e = this.findBlockSprite(t);
          this._explosionEmitter.emitAtObject(e);
          var i = this._explosionEmitter.emitParticle();
          null !== i &&
            ((i.lifetime = a.Gameplay.BLACKHOLE_MERGE_TIME),
            i.visual.animations.play("blackhole"));
        }),
        (o.prototype.onFallEnded = function (t) {
          var e = this.findBlockSprite(t);
          null !== e && e.fallTween();
        }),
        (o.DEBRIS_PARTICLES = 80),
        (o.EXPLOSION_PARTICLES = 8),
        o
      );
    })(Phaser.Group);
    a.BoardGroup = t;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        __extends(t, e),
        Object.defineProperty(t.prototype, "delay", {
          set: function (t) {
            this._delay = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.update = function (t) {
          return (
            void 0 === t && (t = !0),
            (0 < this._delay &&
              0 < (this._delay -= this._game.time.physicsElapsed)) ||
              e.prototype.update.call(this, t)
          );
        }),
        (t.prototype.onEmit = function (t) {
          e.prototype.onEmit.call(this, t), (this._delay = 0);
        }),
        t
      );
    })(t.SpriteParticle);
    t.DelayedParticle = e;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function () {
      function t(t) {
        this._listener = t;
      }
      return (
        (t.prototype.init = function (t, e, i, s, n, o) {
          (this._block = t),
            (this._destroyOnFinish = e),
            (this._fromX = i),
            (this._fromY = s),
            (this._toX = n),
            (this._toY = o),
            (this._time = 0);
        }),
        Object.defineProperty(t.prototype, "block", {
          get: function () {
            return this._block;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "destroyOnFinish", {
          get: function () {
            return this._destroyOnFinish;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.update = function (t) {
          t < 1
            ? ((this._block.x = Phaser.Math.linear(this._fromX, this._toX, t)),
              (this._block.y = Phaser.Math.linear(this._fromY, this._toY, t)))
            : ((this._block.x = this._toX),
              (this._block.y = this._toY),
              this._listener.onMergeFinish(this._block));
        }),
        t
      );
    })();
    t.Merger = e;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function (n) {
      function o(t, e) {
        var i = n.call(this, t, 0, 0, "Font", "", 40) || this;
        (i.onFinished = new Phaser.Signal()),
          i.anchor.set(0.5, 0.5),
          i.pivot.set(0, 10);
        var s = i;
        return (
          (i._tweenScale = t.add
            .tween(i.scale)
            .to(
              { x: 2, y: 2 },
              o.TWEEN_TIME,
              Phaser.Easing.Linear.None,
              !1,
              o.TWEEN_DELAY
            )),
          (i._tweenAlpha = t.add
            .tween(i)
            .to(
              { alpha: 0 },
              o.TWEEN_TIME,
              Phaser.Easing.Linear.None,
              !1,
              o.TWEEN_DELAY
            )),
          i._tweenAlpha.onComplete.add(function () {
            s.onFinished.dispatch(s);
          }, i),
          i
        );
      }
      return (
        __extends(o, n),
        (o.prototype.tween = function () {
          this._tweenAlpha.isRunning ||
            (this.scale.set(1, 1),
            (this.alpha = 1),
            this._tweenScale.start(),
            this._tweenAlpha.start());
        }),
        (o.TWEEN_DELAY = 600),
        (o.TWEEN_TIME = 300),
        o
      );
    })(Phaser.BitmapText);
    t.Streak = e;
  })(Meteoric || (Meteoric = {})),
  (function (a) {
    var t = (function (n) {
      function o(e, t) {
        var i = n.call(this, e, t) || this,
          s = i;
        return (
          (i._streakPool = new a.Pool(a.Streak, o.STREAK_MAX, function () {
            var t = new a.Streak(e, "Font");
            return t.onFinished.add(s.onStreakEnd, s), t;
          })),
          (i._streakTitle = new a.Title(e, "Font")),
          i._streakTitle.position.set(
            e.width / 2,
            (9.5 * -a.Global.GAME_HEIGHT) / 13
          ),
          i
        );
      }
      return (
        __extends(o, n),
        (o.prototype.update = function () {
          var e = 40 * this.game.time.physicsElapsed;
          this.forEach(function (t) {
            t !== this._streakTitle && (t.y -= e);
          }, this);
        }),
        (o.prototype.reset = function () {
          this.forEach(function (t) {
            t !== this._streakTitle && this._streakPool.destroyItem(t);
          }, this),
            this.removeAll();
        }),
        (o.prototype.addStreak = function (t, e, i) {
          var s = this._streakPool.createItem();
          null !== s &&
            (s.position.set(t, e), (s.text = "x" + i), this.add(s), s.tween());
        }),
        (o.prototype.removeStreak = function (t) {
          this._streakPool.destroyItem(t), this.remove(t);
        }),
        (o.prototype.onStreakEnd = function (t) {
          this.removeStreak(t);
        }),
        (o.prototype.showTitle = function (t) {
          this.add(this._streakTitle);
          var e = "NO TITLE!";
          3 === t
            ? (e = a.Gameplay.TITLES[0])
            : 5 === t
            ? (e = a.Gameplay.TITLES[1])
            : 7 === t && (e = a.Gameplay.TITLES[2]),
            (this._streakTitle.text = e),
            this._streakTitle.tween();
        }),
        (o.STREAK_MAX = 4),
        o
      );
    })(Phaser.Group);
    a.StreakGroup = t;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function (s) {
      function n(t, e) {
        var i = s.call(this, t, 0, 0, "Font", "", 80) || this;
        i.anchor.set(0.5, 0.5), i.pivot.set(0, -25);
        return (
          (i._tweenScale = t.add
            .tween(i.scale)
            .to({ x: 1, y: 1 }, n.TWEEN_TIME, Phaser.Easing.Bounce.Out, !1)),
          (i._tweenAlpha = t.add
            .tween(i)
            .to(
              { alpha: 1 },
              n.TWEEN_TIME + 200,
              Phaser.Easing.Linear.None,
              !1
            )),
          (i._tweenAlpha2 = t.add
            .tween(i)
            .to(
              { alpha: 0 },
              400,
              Phaser.Easing.Quintic.Out,
              !1,
              n.TWEEN_DELAY + n.TWEEN_TIME
            )),
          i._tweenAlpha2.onComplete.add(function () {
            (this.exists = !1), (this.visible = !1);
          }, i),
          i
        );
      }
      return (
        __extends(n, s),
        (n.prototype.tween = function () {
          this._tweenScale.isRunning &&
            (this._tweenScale.stopAndRemoveFromUpdateQueue(),
            this._tweenAlpha.stopAndRemoveFromUpdateQueue(),
            this._tweenAlpha2.stopAndRemoveFromUpdateQueue()),
            (this.alpha = 1),
            this._tweenAlpha2.start(),
            this.scale.set(4, 4),
            (this.alpha = 0),
            (this.exists = !0),
            (this.visible = !0),
            this._tweenScale.start(),
            this._tweenAlpha.start();
        }),
        (n.TWEEN_DELAY = 1e3),
        (n.TWEEN_TIME = 700),
        n
      );
    })(Phaser.BitmapText);
    t.Title = e;
  })(Meteoric || (Meteoric = {})),
  (function (a) {
    var t = (function (e) {
      function t() {
        var t = e.call(this) || this;
        return (
          (t._userScale = new Phaser.Point(1, 1)),
          (t._gameDims = new Phaser.Point()),
          t
        );
      }
      return (
        __extends(t, e),
        (t.prototype.init = function () {
          (this.input.maxPointers = 1),
            (this.stage.disableVisibilityChange = !0),
            this.calcGameDims(),
            (this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE),
            this.scale.setUserScale(this._userScale.x, this._userScale.y),
            (this.scale.pageAlignHorizontally = !0),
            (this.scale.pageAlignVertically = !0),
            this.scale.setResizeCallback(this.gameResized, this),
            this.game.device.desktop ||
              (this.scale.forceOrientation(!1, !0),
              this.scale.onOrientationChange.add(this.orientationChange, this)),
            Utils.Device.androidUnlockAudio(this.game);
        }),
        (t.prototype.create = function () {
          a.Global.GAMEE && this.game.onSound(Gamee.Gamee.instance.sound),
            this.game.state.start("Preloader", !0, !1);
        }),
        (t.prototype.calcGameDims = function () {
          var t = window.innerWidth,
            e = window.innerHeight;
          e < t && (t = (640 * e) / a.Global.GAME_HEIGHT);
          var i = 1,
            s = 1,
            n = t,
            o = e;
          (n = (t + 0.01) / (s = i = e / a.Global.GAME_HEIGHT)),
            (o = a.Global.GAME_HEIGHT),
            n < a.Global.GAME_WIDTH &&
              ((i = s = t / a.Global.GAME_WIDTH),
              (n = a.Global.GAME_WIDTH),
              (o = e / i)),
            this._userScale.set(s, i),
            this._gameDims.set(n, o);
        }),
        (t.prototype.gameResized = function (t, e) {
          if (!t.incorrectOrientation) {
            var i = this._userScale.x,
              s = this._userScale.y;
            this.calcGameDims();
            var n = this._gameDims,
              o = this._userScale;
            if (
              n.x !== this.game.width ||
              n.y !== this.game.height ||
              0.001 < Math.abs(o.x - i) ||
              0.001 < Math.abs(o.y - s)
            ) {
              this.scale.setGameSize(n.x, n.y),
                this.scale.setUserScale(o.x, o.y);
              var a = this.game.state.getCurrentState();
              "function" == typeof a.onResize && a.onResize(n.x, n.y);
            }
          }
        }),
        (t.prototype.orientationChange = function (t, e, i) {
          t.isPortrait
            ? this.leaveIncorrectOrientation()
            : this.enterIncorrectOrientation();
        }),
        (t.prototype.enterIncorrectOrientation = function () {
          document.getElementById("sbc_orientation").style.display = "block";
          var t = this.game.state.getCurrentState();
          "function" == typeof t.onPause && t.onPause();
        }),
        (t.prototype.leaveIncorrectOrientation = function () {
          document.getElementById("sbc_orientation").style.display = "none";
          var t = this.game.state.getCurrentState();
          "function" == typeof t.onResume && t.onResume();
        }),
        t
      );
    })(Phaser.State);
    a.Boot = t;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function (e) {
      function t() {
        var t = e.call(this) || this;
        return (t._restartCounter = 2), t;
      }
      return (
        __extends(t, e),
        (t.prototype.create = function () {
          (this._once = !1),
            (this._pressed = !1),
            (this.stage.backgroundColor = 2892636),
            this.add.image(0, 0, "Tut").anchor.setTo(0.5, 0.5),
            this.input.onDown.add(function () {
              this._pressed = !0;
            }, this),
            this.onResize(this.game.width, this.game.height),
            (this._cursorKeys = this.game.input.keyboard.createCursorKeys());
        }),
        (t.prototype.onResize = function (t, e) {
          (this.camera.bounds = null), this.camera.focusOnXY(0, 0);
        }),
        (t.prototype.onGameeRestart = function () {
          --this._restartCounter <= 0 &&
            ((this._pressed = !0), Utils.AudioUtils.playSound("Fall"));
        }),
        (t.prototype.update = function () {
          this._once ||
            ((this._cursorKeys.left.justDown ||
              this._cursorKeys.right.justDown ||
              this._cursorKeys.up.justDown ||
              this._cursorKeys.down.justDown) &&
              (this._pressed = !0),
            this._pressed &&
              ((this._once = !0), this.game.state.start("Play")));
        }),
        t
      );
    })(Phaser.State);
    t.Menu = e;
  })(Meteoric || (Meteoric = {})),
  (function (n) {
    var t, e;
    ((e = t || (t = {}))[(e.NONE = 0)] = "NONE"),
      (e[(e.RIGHT = 1)] = "RIGHT"),
      (e[(e.LEFT = 2)] = "LEFT");
    var i = (function (e) {
      function i() {
        var t = e.call(this) || this;
        return (
          (t._gameOver = !1),
          (t._bg = null),
          (t._keyLeftDown = !1),
          (t._keyRightDown = !1),
          (t._keyDownDown = !1),
          (t._buttonLeft = null),
          (t._buttonRight = null),
          (t._buttonFall = null),
          (t._dlgContinue = null),
          (t._continueUsed = !1),
          t
        );
      }
      return (
        __extends(i, e),
        (i.prototype.create = function () {
          (this._globalGroup = new Phaser.Group(this.game, this.world)),
            this._globalGroup.position.set(
              -n.Global.GAME_WIDTH / 2,
              n.Global.GAME_HEIGHT / 2
            ),
            (this.stage.backgroundColor = 2892379),
            (this._bg = this.add.image(0, 0, "Bg", 0, this._globalGroup)),
            this._bg.anchor.set(0, 1);
          var t = new Phaser.Group(this.game, this._globalGroup);
          this._boardGroup = new n.BoardGroup(this.game, this._globalGroup);
          var e = new Phaser.Group(this.game, this._globalGroup);
          (this._board = new n.Board(this.game, this)),
            (this._boardGroup.underGroup = t),
            (this._boardGroup.overGroup = e),
            this.add.sprite(0, 0, "Sprites", "hide_belt", this._globalGroup),
            (this._boardGroup.board = this._board),
            this._boardGroup.bringParticlesToFront(),
            (this._streakLayer = new n.StreakGroup(
              this.game,
              this._globalGroup
            )),
            (this._buttonLeft = this.game.virtualJoystick.addButton(
              0,
              0,
              "Sprites",
              "left_up",
              "left_down",
              Phaser.VirtualJoystick.CIRC_BUTTON
            )),
            this._buttonLeft.onDown.add(function () {
              this._keyLeftDown = !0;
            }, this),
            (this._buttonLeft.repeatRate = n.Gameplay.KEY_DELAY),
            this._buttonLeft.addKey(Phaser.KeyCode.LEFT),
            (this._buttonRight = this.game.virtualJoystick.addButton(
              0,
              0,
              "Sprites",
              "right_up",
              "right_down",
              Phaser.VirtualJoystick.CIRC_BUTTON
            )),
            this._buttonRight.onDown.add(function () {
              this._keyRightDown = !0;
            }, this),
            (this._buttonRight.repeatRate = n.Gameplay.KEY_DELAY),
            this._buttonRight.addKey(Phaser.KeyCode.RIGHT),
            (this._buttonFall = this.game.virtualJoystick.addButton(
              400,
              400,
              "Sprites",
              "fall_up",
              "fall_down",
              Phaser.VirtualJoystick.CIRC_BUTTON
            )),
            this._buttonFall.onDown.add(function () {
              this._keyDownDown = !0;
            }, this),
            this._buttonFall.addKey(Phaser.KeyCode.DOWN),
            this.onResize(this.game.width, this.game.height),
            this.reset();
        }),
        (i.prototype.onResize = function (t, e) {
          (this.camera.bounds = null),
            this.camera.focusOnXY(0, 0),
            (this._globalGroup.position.y = -n.Gameplay.UI_HEIGHT / 2 + 320);
          var i = (e - n.Gameplay.UI_HEIGHT - 640) / 2;
          (this._buttonLeft.posX = 80),
            (this._buttonLeft.posY = this.game.height - 110 - i / 2),
            (this._buttonRight.posX = this.game.width - 80),
            (this._buttonRight.posY = this.game.height - 110 - i / 2),
            (this._buttonFall.posX = this.game.width / 2),
            (this._buttonFall.posY = this.game.height - 90 - i / 2);
        }),
        (i.prototype.onGameePause = function () {
          this.game.paused = !0;
        }),
        (i.prototype.onGameeUnpause = function () {
          this.game.paused = !1;
        }),
        (i.prototype.onGameeRestart = function () {
          (n.Global.game.paused = !1),
            this.reset(),
            Utils.AudioUtils.playSound("Fall");
        }),
        (i.prototype.reset = function () {
          (this._keyLeftDown = this._keyRightDown = this._keyDownDown = !1),
            n.BlockTypes.randomize(),
            this._boardGroup.reset(),
            this._board.reset(),
            this._streakLayer.reset(),
            (this._gameOver = !1),
            (this._score = 0),
            n.Global.GAMEE,
            (this._continueUsed = !1),
            n.Global.GAMEE && Gamee.Gamee.instance.loadRewardedVideo(),
            this.enableButtons(!0);
        }),
        (i.prototype.enableButtons = function (t) {
          (this._buttonLeft.enabled = this._buttonLeft.visible = t),
            (this._buttonRight.enabled = this._buttonRight.visible = t),
            (this._buttonFall.enabled = this._buttonFall.visible = t);
        }),
        (i.prototype.update = function () {
          if (
            (!n.Global.GAMEE || Gamee.Gamee.instance.gameRunning) &&
            !this._gameOver
          ) {
            var t = this._keyLeftDown ? -1 : 0,
              e = this._keyRightDown ? 1 : 0,
              i = this._keyDownDown;
            (this._board.fastFall = this._board.fastFall || i),
              t + e !== 0 &&
                null !== this._board.currentBlock &&
                this._board.moveBlock(t + e),
              this._gameOver || this._board.update(),
              (this._keyLeftDown = this._keyRightDown = this._keyDownDown = !1);
          }
        }),
        (i.prototype.shutdown = function () {
          var t = this.game.virtualJoystick;
          t.removeButton(this._buttonLeft),
            t.removeButton(this._buttonRight),
            t.removeButton(this._buttonFall);
        }),
        (i.prototype.onAddScore = function (t) {
          (this._score += t),
            n.Global.GAMEE && Gamee.Gamee.instance.setScore(this._score);
        }),
        (i.prototype.onBlockSpawned = function (t) {
          this._boardGroup.onBlockSpawned(t), (this._keyDownDown = !1);
        }),
        (i.prototype.onBlockDestroyed = function (t) {
          this._boardGroup.onBlockDestroyed(t);
        }),
        (i.prototype.onBlockMergeFinish = function (t) {
          this._boardGroup.onBlockMergeFinish(t);
        }),
        (i.prototype.onExplodeSun = function (t) {
          this._boardGroup.onExplodeSun(t),
            Utils.AudioUtils.playSound("Explosion");
        }),
        (i.prototype.onKilledBySun = function (t, e) {
          this._boardGroup.onKilledBySun(t, e);
        }),
        (i.prototype.onExplodeSpaceship = function (t) {
          this._boardGroup.onExplodeSpaceship(t);
        }),
        (i.prototype.onExplodeBlackhole = function (t) {
          this._boardGroup.onExplodeBlackhole(t),
            Utils.AudioUtils.playSound("Blackhole");
        }),
        (i.prototype.onGameOver = function (t) {
          (this._gameOver = !0),
            Utils.AudioUtils.playSound("GameOver"),
            this.enableButtons(!1),
            !this._continueUsed &&
            (n.Global.TEST_ADS ||
              (n.Global.GAMEE && Gamee.Gamee.instance.isVideoReady))
              ? (null === this._dlgContinue &&
                  ((this._dlgContinue = new n.DialogContinue(
                    this.game,
                    100,
                    100
                  )),
                  this._dlgContinue.onDialogClosed.add(
                    this.onContinueDialogClosed,
                    this
                  ),
                  this.world.bringToTop(this._dlgContinue)),
                this._dlgContinue.show())
              : this.doGameOver(!1);
        }),
        (i.prototype.onContinueDialogClosed = function (t) {
          if ("Yes" === t)
            if (n.Global.GAMEE) {
              var e = this;
              Gamee.Gamee.instance.showRewardedVideo(function (t) {
                e.doGameOver(t);
              });
            } else this.doGameOver(!0);
          else this.doGameOver(!1);
        }),
        (i.prototype.doGameOver = function (t) {
          t
            ? ((this._continueUsed = !0),
              this.game.time.events.add(
                i.KILL_DELAY,
                function () {
                  this._board.prepareToContinue(this._boardGroup),
                    this.game.time.events.add(
                      i.KILL_DELAY,
                      function () {
                        (this._gameOver = !1), this.enableButtons(!0);
                      },
                      this
                    );
                },
                this
              ))
            : (this.game.time.events.add(
                i.KILL_DELAY,
                function () {
                  this._board.killAll(this._boardGroup);
                },
                this
              ),
              this.game.time.events.add(
                i.TWEEN_DELAY + 2 * i.TWEEN_TIME,
                function () {
                  this._gameOver &&
                    (n.Global.GAMEE
                      ? ((this._runFromRestart = !0),
                        Gamee.Gamee.instance.gameOver())
                      : this.reset());
                },
                this
              ));
        }),
        (i.prototype.onBoardRise = function () {
          var t = Math.floor(1e3 * n.Gameplay.RISE_TIME),
            e = this.game.add.tween(this.camera).to(
              { x: this.camera.x + 5 },
              t,
              function (t) {
                return n.Easing.wiggle(t, -1, 2);
              },
              !1
            ),
            i = this.game.add.tween(this.camera).to(
              { y: this.camera.y + 2 },
              t,
              function (t) {
                return n.Easing.wiggle(t, 3, 1);
              },
              !1
            );
          e.start(), i.start(), Utils.AudioUtils.playSound("Quake");
        }),
        (i.prototype.onStreak = function (t, e) {
          var i = t.x * n.Gameplay.BLOCK_WIDTH + n.Gameplay.BLOCK_WIDTH / 2,
            s = -t.y * n.Gameplay.BLOCK_HEIGHT - n.Gameplay.BLOCK_HEIGHT / 2;
          this._streakLayer.addStreak(i, s, e);
        }),
        (i.prototype.onStreakTitle = function (t) {
          this._streakLayer.showTitle(t);
        }),
        (i.prototype.onFallEnded = function (t) {
          this._boardGroup.onFallEnded(t);
        }),
        (i.TWEEN_TIME = 800),
        (i.TWEEN_DELAY = 1e3),
        (i.KILL_DELAY = 1e3),
        (i.MOVE_ON_DOWN = !0),
        (i.TAP_TOLERANCE_PIXELS = 30),
        (i.TAP_DEAD_BELT_IN_BLOCKS = 0),
        (i.SWIPE_DISTANCE = 50),
        (i.SWIPE_FINISHED_AFTER_MIN_DISTANCE = !0),
        (i.SWIPE_CONTINUOUS = !1),
        i
      );
    })(Phaser.State);
    n.Play = i;
  })(Meteoric || (Meteoric = {})),
  (function (i) {
    var t = (function (e) {
      function t() {
        var t = e.call(this) || this;
        return (t._ready = !1), t;
      }
      return (
        __extends(t, e),
        (t.prototype.preload = function () {
          var t = "assets/";
          this.load.audio("SFX", ["assets/sfx.ogg", "assets/sfx.m4a"]),
            this.load.image("Bg", t + "bg.jpg"),
            this.load.image("Tut", t + "meteo.jpg"),
            this.load.atlas("Sprites", t + "Sprites.png", t + "Sprites.json"),
            this.load.bitmapFont("Font", t + "font.png", t + "font.xml"),
            this.load.json("Config", t + "config.json");
        }),
        (t.prototype.loadUpdate = function () {
          this.setLoadingText(this.load.progress);
        }),
        (t.prototype.create = function () {
          this.readConfig();
          var t = this.add.audio("SFX");
          Utils.AudioUtils.setSounds(t), (t.allowMultiple = !0);
          var e = 0;
          this.game.device.iOS && (e = 0.1),
            t.addMarker("Explosion", 0, 1.6678),
            t.addMarker("Fall", 3 - e, 0.0515 + e),
            t.addMarker("Impact", 5 - e, 0.4462 + e),
            t.addMarker("MatchAsteroid", 7 - e, 0.7817 + e),
            t.addMarker("MatchPlanet", 9 - e, 0.8493 + e),
            t.addMarker("MatchSun", 11 - e, 1.0562 + e),
            t.addMarker("SmallCheer", 14 - e, 1.8016 + e),
            t.addMarker("Quake", 17 - e, 2.6425 + e),
            t.addMarker("TrashImpact", 21 - e, 0.3941 + e),
            t.addMarker("GameOver", 23 - e, 3.3717 + e),
            t.addMarker("Blackhole", 28 - e, 1.4133 + e),
            t.addMarker("BigCheer", 31 - e, 3.5449 + e),
            (this.game.virtualJoystick = this.game.plugins.add(
              Phaser.VirtualJoystick
            ));
        }),
        (t.prototype.readConfig = function () {
          var t = this.game.cache.getJSON("Config");
          void 0 !== t.DESTROY_ROWS_ON_CONTINUE &&
            (i.Gameplay.DESTROY_ROWS_ON_CONTINUE = t.DESTROY_ROWS_ON_CONTINUE),
            void 0 !== t.KEY_DELAY && (i.Gameplay.KEY_DELAY = t.KEY_DELAY),
            void 0 !== t.PLANETS_COUNT &&
              (i.Gameplay.PLANETS_COUNT = t.PLANETS_COUNT),
            void 0 !== t.SPAWN_FROM_ITEM &&
              ((i.Gameplay.SPAWN_FROM_ITEM = t.SPAWN_FROM_ITEM),
              (i.Gameplay.INIT_FROM_ITEM = t.SPAWN_FROM_ITEM)),
            void 0 !== t.SPAWN_TO_ITEM &&
              (i.Gameplay.SPAWN_TO_ITEM = t.SPAWN_TO_ITEM),
            void 0 !== t.PLANET_COUNT_STEP_1 &&
              (i.Gameplay.PLANET_COUNT_STEP_1 = t.PLANET_COUNT_STEP_1),
            void 0 !== t.PLANET_COUNT_STEP_2 &&
              (i.Gameplay.PLANET_COUNT_STEP_2 = t.PLANET_COUNT_STEP_2),
            void 0 !== t.MATCH_LENGTH &&
              (i.Gameplay.MATCH_LENGTH = t.MATCH_LENGTH),
            void 0 !== t.MAX_SCORE_STREAK &&
              (i.Gameplay.MAX_SCORE_STREAK = t.MAX_SCORE_STREAK),
            void 0 !== t.FALL_DELAY && (i.Gameplay.FALL_DELAY = t.FALL_DELAY),
            void 0 !== t.FALL_SPEED && (i.Gameplay.FALL_SPEED = t.FALL_SPEED),
            void 0 !== t.FAST_FALL_MULTIPLIER &&
              (i.Gameplay.FAST_FALL_MULTIPLIER = t.FAST_FALL_MULTIPLIER),
            void 0 !== t.PLANET_FALL_MULTIPLIER &&
              (i.Gameplay.PLANET_FALL_MULTIPLIER = t.PLANET_FALL_MULTIPLIER),
            void 0 !== t.MERGE_TIME && (i.Gameplay.MERGE_TIME = t.MERGE_TIME),
            void 0 !== t.RISE_TIME && (i.Gameplay.RISE_TIME = t.RISE_TIME),
            void 0 !== t.INITIAL_ROWS &&
              (i.Gameplay.INITIAL_ROWS = t.INITIAL_ROWS),
            void 0 !== t.SKIP_PROBABILITY &&
              (i.Gameplay.SKIP_PROBABILITY = t.SKIP_PROBABILITY),
            void 0 !== t.SKIP_PROBABILITY_STEP &&
              (i.Gameplay.SKIP_PROBABILITY_STEP = t.SKIP_PROBABILITY_STEP),
            void 0 !== t.MINIMAL_OBJECTS_COUNT &&
              (i.Gameplay.MINIMAL_OBJECTS_COUNT = t.MINIMAL_OBJECTS_COUNT),
            void 0 !== t.SPACESHIP_FALL_ROUND_MIN &&
              (i.Gameplay.SPACESHIP_FALL_ROUND_MIN =
                t.SPACESHIP_FALL_ROUND_MIN),
            void 0 !== t.SPACESHIP_FALL_ROUND_MAX &&
              (i.Gameplay.SPACESHIP_FALL_ROUND_MAX =
                t.SPACESHIP_FALL_ROUND_MAX),
            void 0 !== t.RISE_ROUND_MIN &&
              (i.Gameplay.RISE_ROUND_MIN = t.RISE_ROUND_MIN),
            void 0 !== t.RISE_ROUND_MAX &&
              (i.Gameplay.RISE_ROUND_MAX = t.RISE_ROUND_MAX),
            void 0 !== t.BLACKHOLE_SPAWN_MIN &&
              (i.Gameplay.BLACKHOLE_SPAWN_MIN = t.BLACKHOLE_SPAWN_MIN),
            void 0 !== t.BLACKHOLE_SPAWN_MAX &&
              (i.Gameplay.BLACKHOLE_SPAWN_MAX = t.BLACKHOLE_SPAWN_MAX),
            void 0 !== t.CONSECUTIVE_MATCHES_FOR_BLACKHOLE &&
              (i.Gameplay.CONSECUTIVE_MATCHES_FOR_BLACKHOLE =
                t.CONSECUTIVE_MATCHES_FOR_BLACKHOLE);
        }),
        (t.prototype.update = function () {
          !1 === this._ready &&
            ((this._ready = !0),
            i.Global.GAMEE && Gamee.Gamee.instance.gameReady(),
            this.game.state.start("Menu"));
        }),
        (t.prototype.setLoadingText = function (t) {}),
        t
      );
    })(Phaser.State);
    i.Preloader = t;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function (l) {
      function t(t, e, i, s, n, o, a) {
        var r = l.call(this, t) || this;
        (r.onClick = new Phaser.Signal()),
          (r.onDown = new Phaser.Signal()),
          (r.scaleOnOver = new Phaser.Point(1, 1)),
          (r.scaleOnDown = new Phaser.Point(1, 1)),
          (r.offsetOnOver = new Phaser.Point(0, 0)),
          (r.offsetOnDown = new Phaser.Point(0, 0)),
          (r._tinted = !1),
          (r._downTint = 8421504),
          (r._overTint = 16777215),
          (r._savePosition = new Phaser.Point()),
          (r._saveScale = new Phaser.Point()),
          (r._over = !1),
          (r._down = !1),
          (r.name = e);
        var h = new Phaser.Button(t, 0, 0, i);
        return (
          r.add(h),
          (r._button = h),
          void 0 !== n && n && (r._tinted = !0),
          void 0 === o &&
            ((o = "string" == typeof s ? s + "Down" : null),
            (r._tinted || (o && !t.cache.getFrameByName(i, o))) && (o = null)),
          void 0 === a &&
            ((a = "string" == typeof s ? s + "Over" : null),
            (r._tinted || (a && !t.cache.getFrameByName(i, a))) && (a = null)),
          h.setFrames(a, s, o, s),
          h.anchor.setTo(0.5, 0.5),
          (h.name = e),
          h.onInputOver.add(r.overEvent, r),
          h.onInputOut.add(r.outEvent, r),
          h.onInputDown.add(r.downEvent, r),
          h.onInputUp.add(r.upEvent, r),
          r
        );
      }
      return (
        __extends(t, l),
        Object.defineProperty(t.prototype, "button", {
          get: function () {
            return this._button;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "anchor", {
          get: function () {
            return this._button.anchor;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.setEnabled = function (t) {
          this._button.inputEnabled = t;
        }),
        (t.prototype.setHitArea = function (t) {
          this._button.hitArea = t;
        }),
        (t.prototype.setTint = function (t, e) {
          void 0 === e && (e = 0), (this._downTint = t), (this._overTint = e);
        }),
        (t.prototype.overEvent = function (t, e) {
          this.setButton(!0, this._down), this.overAction();
        }),
        (t.prototype.outEvent = function (t, e) {
          this.setButton(!1, !1), this.outAction();
        }),
        (t.prototype.downEvent = function (t, e) {
          this.setButton(this._over, !0),
            this.downAction(),
            this.onDown.dispatch(this);
        }),
        (t.prototype.upEvent = function (t, e, i) {
          this.setButton(this._over, !1),
            this.upAction(),
            i && this.onClick.dispatch(this);
        }),
        (t.prototype.setButton = function (t, e) {
          if (
            (this._over ||
              this._down ||
              (this._saveScale.copyFrom(this._button.scale),
              this._savePosition.copyFrom(this._button.position)),
            (this._down = e),
            (this._over = t),
            e)
          ) {
            if (
              (Phaser.Point.multiply(
                this._saveScale,
                this.scaleOnDown,
                this._button.scale
              ),
              Phaser.Point.add(
                this._button.position,
                this.offsetOnDown,
                this._button.position
              ),
              this._tinted)
            ) {
              this._button.tint = this._downTint;
              for (var i = 0; i < this._button.children.length; i++)
                this._button.getChildAt(i).tint = this._downTint;
            }
          } else if (t) {
            if (
              (Phaser.Point.multiply(
                this._saveScale,
                this.scaleOnOver,
                this._button.scale
              ),
              Phaser.Point.add(
                this._button.position,
                this.offsetOnOver,
                this._button.position
              ),
              this._tinted)
            ) {
              this._button.tint = this._overTint;
              for (i = 0; i < this._button.children.length; i++)
                this._button.getChildAt(i).tint = this._overTint;
            }
          } else if (
            (this._button.scale.copyFrom(this._saveScale),
            this._button.position.copyFrom(this._savePosition),
            this._tinted)
          ) {
            this._button.tint = 16777215;
            for (i = 0; i < this._button.children.length; i++)
              this._button.getChildAt(i).tint = 16777215;
          }
        }),
        (t.prototype.overAction = function () {}),
        (t.prototype.outAction = function () {}),
        (t.prototype.downAction = function () {
          Utils.AudioUtils.playSound("Fall");
        }),
        (t.prototype.upAction = function () {}),
        (t.prototype.reset = function () {
          for (var t = this._button.input._pointerData, e = 0; e < 10; e++)
            t[e] = {
              id: e,
              x: 0,
              y: 0,
              isDown: !1,
              isUp: !1,
              isOver: !1,
              isOut: !1,
              timeOver: 0,
              timeOut: 0,
              timeDown: 0,
              timeUp: 0,
              downDuration: 0,
              isDragged: !1,
            };
          this.setButton(!1, !1);
        }),
        t
      );
    })(Phaser.Group);
    t.Button = e;
  })(UI || (UI = {})),
  (function (t) {
    var e = (function () {
      function s() {}
      return (
        (s.setSounds = function (t) {
          s._sfx = t;
        }),
        (s.playSound = function (t) {
          Meteoric.Global.soundOn && null !== s._sfx && s._sfx.play(t);
        }),
        (s.addMusic = function (t, e) {
          s._music[t] = e;
        }),
        (s.playMusic = function (t, e) {
          if (
            (void 0 === e && (e = !0),
            s._currentMusic !== t &&
              (null !== s._currentMusic &&
                0 < s._currentMusic.length &&
                s.stopMusic(),
              t in s._music && Meteoric.Global.musicOn))
          ) {
            s._currentMusic = t;
            var i = s._music[t];
            (i.loop = e), i.play();
          }
        }),
        (s.stopMusic = function () {
          null !== s._currentMusic &&
            0 < s._currentMusic.length &&
            (s._music[s._currentMusic].stop(), (s._currentMusic = ""));
        }),
        (s.pauseMusic = function () {
          null !== s._currentMusic &&
            0 < s._currentMusic.length &&
            s._music[s._currentMusic].pause();
        }),
        (s.resumeMusic = function () {
          null !== s._currentMusic &&
            0 < s._currentMusic.length &&
            s._music[s._currentMusic].resume();
        }),
        (s._sfx = null),
        (s._music = {}),
        (s._currentMusic = ""),
        s
      );
    })();
    t.AudioUtils = e;
  })(Utils || (Utils = {})),
  (function (t) {
    var e = (function () {
      function i() {}
      return (
        (i.supported = function () {
          return Meteoric.Global.game.scale.compatibility.supportsFullScreen;
        }),
        (i.isFullscreen = function () {
          return Meteoric.Global.game.scale.isFullScreen;
        }),
        (i.changeFullscreen = function () {
          var t = Meteoric.Global.game;
          i._fullscreen
            ? t.scale.stopFullScreen()
            : t.scale.startFullScreen(!1, !1);
        }),
        (i.onEnterFullscreen = function () {
          (i._fullscreen = !0),
            null !== i._listener && i._listener.call(i._listenerContext, !0);
        }),
        (i.onLeaveFullscreen = function () {
          (i._fullscreen = !1),
            null !== i._listener && i._listener.call(i._listenerContext, !1);
        }),
        (i.setListener = function (t, e) {
          (i._listener = t), (i._listenerContext = e);
        }),
        (i.removeListener = function () {
          (i._listener = null), (i._listenerContext = null);
        }),
        (i._fullscreen = !1),
        (i._listener = null),
        (i._listenerContext = null),
        i
      );
    })();
    t.FullscreenUtils = e;
  })(Utils || (Utils = {})),
  (function (t) {
    var e = (function () {
      function t() {}
      return (
        (t.ChangeAnimationPhaserJSONData = function (t) {
          (Phaser.AnimationParser.myCallback = t),
            (Phaser.AnimationParser.JSONData = function (t, e) {
              if (!e.frames) return null;
              for (
                var i = new Phaser.FrameData(), s = e.frames, n = 0;
                n < s.length;
                n++
              ) {
                var o = i.addFrame(
                  new Phaser.Frame(
                    n,
                    s[n].frame.x,
                    s[n].frame.y,
                    s[n].frame.w,
                    s[n].frame.h,
                    s[n].filename
                  )
                );
                s[n].trimmed &&
                  o.setTrim(
                    s[n].trimmed,
                    s[n].sourceSize.w,
                    s[n].sourceSize.h,
                    s[n].spriteSourceSize.x,
                    s[n].spriteSourceSize.y,
                    s[n].spriteSourceSize.w,
                    s[n].spriteSourceSize.h
                  ),
                  Phaser.AnimationParser.myCallback(o, s[n]);
              }
              return i;
            });
        }),
        (t.AdjustTweenFunctions = function () {
          (Phaser.TweenManager.prototype.removeFromUpdateQueue = function (t) {
            var e = this._tweens.indexOf(t);
            -1 !== e
              ? this._tweens.splice(e, 1)
              : -1 !== (e = this._add.indexOf(t)) && this._add.splice(e, 1);
          }),
            (Phaser.Tween.prototype.stopAndRemoveFromUpdateQueue = function (
              t
            ) {
              var e = this.stop(t);
              return (
                this.manager.removeFromUpdateQueue(this),
                (this.pendingDelete = !1),
                e
              );
            });
        }),
        t
      );
    })();
    t.PhaserUtils = e;
  })(Utils || (Utils = {})),
  (function (t) {
    var d,
      e,
      m = function () {};
    (t.ScreenMetrics = m),
      ((e = d = t.Orientation || (t.Orientation = {}))[(e.PORTRAIT = 0)] =
        "PORTRAIT"),
      (e[(e.LANDSCAPE = 1)] = "LANDSCAPE");
    var i = (function () {
      function t() {}
      return (
        (t.calculateScreenMetrics = function (t, e, i, s, n) {
          var o, a;
          void 0 === i && (i = d.LANDSCAPE),
            (o = window.innerWidth),
            (a = window.innerHeight),
            (o = Math.min(o, 1.5 * t)),
            (a = Math.min(a, 1.5 * e)),
            (void 0 !== s && void 0 !== n) ||
              (n =
                (d.LANDSCAPE,
                (s = Math.round((640 * t) / 640)),
                Math.round((640 * e) / 640)));
          var r = o / a,
            h = 0,
            l = 0,
            c = 0,
            u = 0;
          l =
            (d.LANDSCAPE, 1) < r
              ? ((u = e),
                (c = 2 * Math.ceil((u * r) / 2)),
                (h = ((c = Math.min(c, s)) - t) / 2),
                0)
              : ((c = t),
                (u = 2 * Math.ceil(c / r / 2)),
                (h = 0),
                ((u = Math.min(u, n)) - e) / 2);
          var p = o / c,
            _ = a / u;
          return (
            (this.screenMetrics = new m()),
            (this.screenMetrics.windowWidth = o),
            (this.screenMetrics.windowHeight = a),
            (this.screenMetrics.defaultGameWidth = t),
            (this.screenMetrics.defaultGameHeight = e),
            (this.screenMetrics.maxGameWidth = s),
            (this.screenMetrics.maxGameHeight = n),
            (this.screenMetrics.gameWidth = c),
            (this.screenMetrics.gameHeight = u),
            (this.screenMetrics.scaleX = p),
            (this.screenMetrics.scaleY = _),
            (this.screenMetrics.offsetX = h),
            (this.screenMetrics.offsetY = l),
            this.screenMetrics
          );
        }),
        t
      );
    })();
    t.ScreenUtils = i;
  })(Utils || (Utils = {})),
  (function (t) {
    var s = function () {},
      e = (function () {
        function i() {}
        return (
          (i.save = function () {
            if (i.localStorageSupported()) {
              var t = new s();
              (t.musicOn = Meteoric.Global.musicOn),
                (t.soundOn = Meteoric.Global.soundOn),
                (t.currentLanguage = Meteoric.Global.currentLanguage);
              var e = JSON.stringify(t);
              localStorage.setItem("meteoric_save", e);
            }
          }),
          (i.load = function () {
            if (i.localStorageSupported()) {
              var t = JSON.parse(localStorage.getItem("meteoric_save"));
              return (
                null != t &&
                ((Meteoric.Global.musicOn = t.musicOn),
                (Meteoric.Global.soundOn = t.soundOn),
                (Meteoric.Global.currentLanguage = t.currentLanguage),
                !0)
              );
            }
            return !1;
          }),
          (i.localStorageSupported = function () {
            try {
              return "localStorage" in window && null !== window.localStorage;
            } catch (t) {
              return !1;
            }
          }),
          i
        );
      })();
    t.StorageUtils = e;
  })(Utils || (Utils = {})),
  (function (t) {
    var e = (function () {
      function t() {}
      return (
        (t.padNumber = function (t, e, i) {
          void 0 === i && (i = "0");
          var s = t + "";
          return e <= s.length ? s : new Array(e - s.length + 1).join(i) + s;
        }),
        t
      );
    })();
    t.StringUtils = e;
  })(Utils || (Utils = {})),
  (function (t) {
    var e = (function () {
      function t() {}
      return (
        (t.isAndroidStockBrowser = function () {
          var t = navigator.userAgent,
            e = /Android/.test(t),
            i = /Chrome/.test(t);
          return e && !i;
        }),
        t
      );
    })();
    t.SystemUtils = e;
  })(Utils || (Utils = {})),
  (function (t) {
    var e = (function () {
      function s() {}
      return (
        (s.setTexts = function (t) {
          s._texts = t;
        }),
        (s.getText = function (t) {
          if (null === s._texts) return "Texts not set";
          var e = s._texts;
          if (void 0 === e[t]) return "";
          var i = e[t][Meteoric.Global.currentLanguage];
          return (
            void 0 === i &&
              ((Meteoric.Global.currentLanguage = "en"),
              (i = e[t][Meteoric.Global.currentLanguage])),
            i
          );
        }),
        (s.game = null),
        (s._texts = null),
        s
      );
    })();
    t.TextUtils = e;
  })(Utils || (Utils = {})),
  (function (t) {
    var e = (function () {
      function t() {}
      return (
        (t.isAndroidStockBrowser = function () {
          var t = window.navigator.userAgent.match(
            /Android.*AppleWebKit\/([\d.]+)/
          );
          return t && parseFloat(t[1]) < 537;
        }),
        (t.androidVersion = function () {
          var t = navigator.userAgent.match(/Android\s([0-9\.]*)/);
          return t ? parseFloat(t[1]) : -1;
        }),
        (t.androidUnlockAudio = function (t) {
          t.device.android &&
            t.device.chrome &&
            55 <= t.device.chromeVersion &&
            ((t.sound.touchLocked = !0),
            t.input.addTouchLockCallback(
              function () {
                if (
                  this.noAudio ||
                  !this.touchLocked ||
                  null !== this._unlockSource
                )
                  return !0;
                if (this.usingWebAudio) {
                  var t = this.context.createBuffer(1, 1, 22050);
                  (this._unlockSource = this.context.createBufferSource()),
                    (this._unlockSource.buffer = t),
                    this._unlockSource.connect(this.context.destination),
                    void 0 === this._unlockSource.start
                      ? this._unlockSource.noteOn(0)
                      : this._unlockSource.start(0),
                    "suspended" === this._unlockSource.context.state &&
                      this._unlockSource.context.resume();
                }
                return !0;
              },
              t.sound,
              !0
            ));
        }),
        t
      );
    })();
    t.Device = e;
  })(Utils || (Utils = {})),
  (function (i) {
    var t = (function (n) {
      function e(t, e, i) {
        var s = n.call(this, t) || this;
        return (
          (s.onDialogClosed = new Phaser.Signal()),
          (s._width = 0),
          (s._height = 0),
          (s._blocker = null),
          (s._dialogContainer = null),
          (s._dialogBgBmd = null),
          (s._dialogBg = null),
          (s._btnClose = null),
          (s._tweenInPosition = null),
          (s._tweenInAlpha = null),
          (s._tweenOutPosition = null),
          (s._tweenOutAlpha = null),
          (s._hideSourceName = null),
          (s._width = e),
          (s._height = i),
          (s._blocker = new Phaser.Sprite(t, 0, 0, "Sprites", "FillBlack")),
          s._blocker.anchor.set(0.5),
          (s._blocker.width = t.width),
          (s._blocker.height = t.height),
          (s._blocker.tint = 0),
          (s._blocker.alpha = 0),
          (s._blocker.inputEnabled = !0),
          s.add(s._blocker),
          (s._dialogContainer = new Phaser.Group(t)),
          s._dialogContainer.position.set(0, 0),
          s.add(s._dialogContainer),
          (s._dialogBg = t.add.sprite(
            0,
            -120,
            "Sprites",
            "ContinueBg",
            s._dialogContainer
          )),
          s._dialogBg.anchor.set(0.5),
          s.createCloseButton(t, e, i),
          s.createTweens(t),
          s.activate(!1),
          s
        );
      }
      return (
        __extends(e, n),
        (e.prototype.createCloseButton = function (t, e, i) {}),
        (e.prototype.createTweens = function (t) {
          (this._tweenInPosition = t.add
            .tween(this)
            .to({ containerX: 0 }, e.TWEEN_DURATION, i.Easing.pop5, !1)),
            this._tweenInPosition.onComplete.add(this.onShownComplete, this),
            (this._tweenInAlpha = t.add
              .tween(this)
              .to(
                { blockerAlpha: 0.9 },
                e.TWEEN_DURATION - 200,
                Phaser.Easing.Sinusoidal.Out,
                !1
              )),
            (this._tweenOutPosition = t.add
              .tween(this)
              .to({ containerX: 640 }, e.TWEEN_DURATION, i.Easing.pop5rev, !1)),
            this._tweenOutPosition.onComplete.add(this.onHideComplete, this),
            (this._tweenOutAlpha = t.add
              .tween(this)
              .to(
                { blockerAlpha: 0 },
                e.TWEEN_DURATION - 200,
                Phaser.Easing.Sinusoidal.In,
                !1,
                200
              ));
        }),
        Object.defineProperty(e.prototype, "blockerAlpha", {
          get: function () {
            return this._blocker.alpha;
          },
          set: function (t) {
            this._blocker.alpha = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "containerX", {
          get: function () {
            return this._dialogContainer.x;
          },
          set: function (t) {
            this._dialogContainer.x = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "containerScale", {
          get: function () {
            return this._dialogContainer.scale.x;
          },
          set: function (t) {
            this._dialogContainer.scale.set(t);
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.enableInput = function (t) {
          null !== this._btnClose && this._btnClose.setEnabled(t);
        }),
        (e.prototype.activate = function (t) {
          (this.exists = t), (this.visible = t);
        }),
        (e.prototype.onResize = function (t, e) {
          (this._blocker.width = this.game.width),
            (this._blocker.height = this.game.height);
        }),
        (e.prototype.show = function () {
          this.onResize(this.game.width, this.game.height),
            (this._dialogContainer.x = 640),
            this.enableInput(!1),
            this.activate(!0),
            this._tweenOutPosition.resume(),
            this._tweenInPosition.start(),
            this._tweenInAlpha &&
              (this._tweenInAlpha.resume(), this._tweenInAlpha.start());
        }),
        (e.prototype.onShownComplete = function () {
          this.enableInput(!0);
        }),
        (e.prototype.hide = function (t) {
          void 0 === t && (t = null),
            (this._hideSourceName = t),
            this.enableInput(!1),
            this._tweenOutPosition.resume(),
            this._tweenOutPosition.start(),
            this._tweenOutAlpha &&
              (this._tweenInAlpha.resume(), this._tweenOutAlpha.start());
        }),
        (e.prototype.onHideComplete = function () {
          this.activate(!1);
          var t = this._hideSourceName;
          (this._hideSourceName = null), this.onDialogClosed.dispatch(t);
        }),
        (e.prototype.onCloseClicked = function (t) {
          this.hide("Close");
        }),
        (e.TWEEN_DURATION = 550),
        e
      );
    })(Phaser.Group);
    i.DialogBase = t;
  })(Meteoric || (Meteoric = {})),
  (function (t) {
    var e = (function (n) {
      function t(t, e, i) {
        var s = n.call(this, t, e, i) || this;
        return (
          (s._btnYes = null),
          (s._btnNo = null),
          (s._btnYes = new UI.Button(
            t,
            "Yes",
            "Sprites",
            "ContinueYes1",
            !1,
            "ContinueYes2"
          )),
          s._btnYes.position.set(0, 125),
          s._btnYes.onClick.add(s.onDialogButtonClick, s),
          s._dialogContainer.add(s._btnYes),
          (s._btnNo = new UI.Button(
            t,
            "No",
            "Sprites",
            "ContinueNo1",
            !1,
            "ContinueNo2"
          )),
          s._btnNo.position.set(0, 280),
          s._btnNo.onClick.add(s.onDialogButtonClick, s),
          s._dialogContainer.add(s._btnNo),
          s
        );
      }
      return (
        __extends(t, n),
        (t.prototype.createCloseButton = function (t, e, i) {}),
        (t.prototype.enableInput = function (t) {
          n.prototype.enableInput.call(this, t),
            this._btnYes.setEnabled(t),
            this._btnNo.setEnabled(t);
        }),
        (t.prototype.onDialogButtonClick = function (t) {
          this.hide(t.name);
        }),
        t
      );
    })(t.DialogBase);
    t.DialogContinue = e;
  })(Meteoric || (Meteoric = {}));
