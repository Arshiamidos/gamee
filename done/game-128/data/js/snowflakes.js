var Snowflakes;
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.GAMEE = !0),
      (t.game = null),
      (t.GAME_WIDTH = 640),
      (t.GAME_HEIGHT = 640),
      (t.MAX_GAME_WIDTH = 640),
      (t.MAX_GAME_HEIGHT = 640),
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
})(Snowflakes || (Snowflakes = {}));
var PhaserGlobal = { stopFocus: !0 };
window.onload = function () {
  var t = new Gamee.Gamee("Touch"),
    e = new Snowflakes.Game();
  (Snowflakes.Global.game = e), t.setGame(e);
};
var __extends =
    (this && this.__extends) ||
    function (t, e) {
      function i() {
        this.constructor = t;
      }
      for (var a in e) e.hasOwnProperty(a) && (t[a] = e[a]);
      t.prototype =
        null === e ? Object.create(e) : ((i.prototype = e.prototype), new i());
    },
  Snowflakes;
!(function (t) {
  var e = (function (e) {
    function i() {
      var a =
          (window.innerWidth,
          window.innerHeight,
          Utils.ScreenUtils.calculateScreenMetrics(
            t.Global.GAME_WIDTH,
            t.Global.GAME_HEIGHT,
            Utils.Orientation.PORTRAIT,
            t.Global.MAX_GAME_WIDTH,
            t.Global.MAX_GAME_HEIGHT
          )),
        n = Phaser.AUTO;
      e.call(this, {
        width: a.gameWidth,
        height: a.gameHeight,
        renderer: n,
        parent: "content",
        transparent: !1,
        antialias: !0,
        physicsConfig: null,
        preserveDrawingBuffer: !0,
      }),
        (i.game = this),
        Utils.PhaserUtils.ChangeAnimationPhaserJSONData(
          this.additionalFrameProperties
        ),
        Utils.PhaserUtils.AdjustTweenFunctions(),
        this.state.add("Boot", t.Boot),
        this.state.add("Preloader", t.Preloader),
        this.state.add("Menu", t.Menu),
        this.state.add("Play", t.Play),
        this.state.start("Boot");
    }
    return (
      __extends(i, e),
      (i.prototype.onMute = function () {
        Utils.AudioUtils.stopMusic(),
          (t.Global.soundOn = !1),
          (t.Global.musicOn = !1);
      }),
      (i.prototype.onUnmute = function () {
        (t.Global.soundOn = !0), (t.Global.musicOn = !0);
      }),
      (i.prototype.additionalFrameProperties = function (t, e) {
        e.anchor && ((t.anchorX = e.anchor.w), (t.anchorY = e.anchor.h)),
          e.nextitem &&
            ((t.nextItemX = e.nextitem.w), (t.nextItemY = e.nextitem.h));
      }),
      i
    );
  })(Phaser.Game);
  t.Game = e;
})(Snowflakes || (Snowflakes = {}));
var Gamee;
!(function (t) {
  var e = (function () {
    function t(e, i) {
      void 0 === i && (i = !1),
        (this._game = null),
        (this._gameeController = null),
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
        void 0 !== window.gamee &&
          ("Touch" !== e
            ? ((this._gameeController = window.gamee.controller.requestController(
                e,
                { enableKeyboard: i }
              )),
              this.keyHandlers())
            : ((this._gameeController = window.gamee.controller.requestController(
                "Touch"
              )),
              this.touchHandlers())),
        this.eventHandlers(),
        (t._instance = this);
    }
    return (
      Object.defineProperty(t, "instance", {
        get: function () {
          return null === t._instance, t._instance;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.setGame = function (t) {
        this._game = t;
      }),
      Object.defineProperty(t.prototype, "gameRunning", {
        get: function () {
          return this._gameRunning;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.keyHandlers = function () {
        var t = this;
        this._gameeController.on("keydown", function (e) {
          t._pressesCache |= t._indices[e.button];
          var i = t._game.state.getCurrentState();
          "function" == typeof i.onGameeButtonDown &&
            i.onGameeButtonDown(e.button);
        }),
          this._gameeController.on("keyup", function (e) {
            t._pressesCache &= ~t._indices[e.button];
            var i = t._game.state.getCurrentState();
            "function" == typeof i.onGameeButtonUp &&
              i.onGameeButtonUp(e.button);
          });
      }),
      (t.prototype.processKeys = function () {
        var t = this._isDown;
        this._isDown = this._pressesCache;
        var e = t ^ this._isDown;
        (this._justDown = e & this._isDown), (this._justUp = e & ~this._isDown);
      }),
      (t.prototype.clearKeys = function () {
        (this._pressesCache = 0),
          (this._isDown = 0),
          (this._justDown = 0),
          (this._justUp = 0);
      }),
      (t.prototype.isDown = function (t) {
        return (this._isDown & this._indices[t]) > 0;
      }),
      (t.prototype.justDown = function (t) {
        return (this._justDown & this._indices[t]) > 0;
      }),
      Object.defineProperty(t.prototype, "anyIsDown", {
        get: function () {
          return this._isDown > 0;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "anyJustDown", {
        get: function () {
          return this._justDown > 0;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.isUp = function (t) {
        return !this.isDown(t);
      }),
      (t.prototype.justUp = function (t) {
        return (this._justUp & this._indices[t]) > 0;
      }),
      (t.prototype.touchHandlers = function () {
        var t = this;
        this._gameeController.on("touchstart", function (e) {
          var i = t._game.state.getCurrentState();
          "function" == typeof i.onGameeTouchStart && i.onGameeTouchStart(e);
        }),
          this._gameeController.on("touchend", function (e) {
            var i = t._game.state.getCurrentState();
            "function" == typeof i.onGameeTouchEnd && i.onGameeTouchEnd(e);
          }),
          this._gameeController.on("touchmove", function (e) {
            var i = t._game.state.getCurrentState();
            "function" == typeof i.onGameeTouchMove && i.onGameeTouchMove(e);
          }),
          this._gameeController.on("touchleave", function (e) {
            var i = t._game.state.getCurrentState();
            "function" == typeof i.onGameeTouchLeave && i.onGameeTouchLeave(e);
          }),
          this._gameeController.on("touchcancel", function (e) {
            var i = t._game.state.getCurrentState();
            "function" == typeof i.onGameeTouchCancel &&
              i.onGameeTouchCancel(e);
          });
      }),
      (t.prototype.eventHandlers = function () {
        var t = this;
        (window.gamee.onPause = function () {
          t.onPause();
        }),
          (window.gamee.onUnpause = function () {
            t.onUnpause();
          }),
          (window.gamee.onRestart = function () {
            t.onRestart();
          }),
          (window.gamee.onMute = function () {
            t._game.onMute();
          }),
          (window.gamee.onUnmute = function () {
            t._game.onUnmute();
          });
      }),
      (t.prototype.onPause = function () {
        var t = this._game.state.getCurrentState();
        "function" == typeof t.onGameePause && t.onGameePause();
      }),
      (t.prototype.onUnpause = function () {
        var t = this._game.state.getCurrentState();
        "function" == typeof t.onGameeUnpause && t.onGameeUnpause();
      }),
      (t.prototype.onRestart = function () {
        var t = this._game.state.getCurrentState();
        "function" == typeof t.onGameeRestart && t.onGameeRestart();
      }),
      Object.defineProperty(t.prototype, "score", {
        get: function () {
          return this._score;
        },
        set: function (t) {
          (this._score = t), (window.gamee.score = t);
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.addScore = function (t) {
        this.score += t;
      }),
      (t.prototype.gameStart = function () {
        this._gameRunning, window.gamee.gameStart(), (this._gameRunning = !0);
      }),
      (t.prototype.gameOver = function () {
        !this._gameRunning, window.gamee.gameOver(), (this._gameRunning = !1);
      }),
      (t._instance = null),
      t
    );
  })();
  t.Gamee = e;
})(Gamee || (Gamee = {}));
var Snowflakes;
!(function (t) {
  var e;
  !(function (t) {
    function e(t, e, i) {
      var a = t * Math.PI * 2 * e,
        n = t * Math.PI * 2 * i;
      return Math.sin(a) * Math.cos(n);
    }
    function i(t, e, i) {
      var a = t * Math.PI * 2 * e,
        n = -t * i;
      return Math.sin(a) * Math.exp(n);
    }
    function a(t) {
      return -2 * t * t + 3 * t;
    }
    function n(t) {
      return -(a(1 - t) - 1);
    }
    function s(t) {
      return Math.sin(2 * t * Math.PI);
    }
    function o(t) {
      return Math.sin(2 * t * Math.PI);
    }
    function r(t, e) {
      return Math.sin(2 * t * Math.PI * e);
    }
    (t.wiggle = e),
      (t.sinWithExpDecay = i),
      (t.pop5 = a),
      (t.pop5rev = n),
      (t.sin = s),
      (t.sinRotate = o),
      (t.sinWithPeriod = r);
  })((e = t.Easing || (t.Easing = {})));
})(Snowflakes || (Snowflakes = {}));
var Helper;
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.create = function (e, i, a, n, s, o, r, l, h, c) {
        return (
          void 0 === o && (o = 0),
          void 0 === r && (r = 0),
          void 0 === l && (l = 0),
          void 0 === h && (h = 0),
          void 0 === c && (c = !1),
          (t._image = new Phaser.Image(e, 0, 0, n)),
          "string" == typeof s
            ? (t._frame = e.cache.getFrameByName(n, s))
            : (t._frame = e.cache.getFrameByIndex(n, s)),
          t.calculateNineImage(i, a, o, r, l, h, c),
          (t._nineImage = new Phaser.BitmapData(
            e,
            "NineImage" + t._textureKey++,
            t._width,
            t._height
          )),
          t.renderNineImage(),
          t._nineImage
        );
      }),
      (t.calculateNineImage = function (e, i, a, n, s, o, r) {
        var l = t._frame;
        if (
          ((t._centralWidth = l.width - n - o),
          (t._centralHeight = l.height - a - s),
          r)
        )
          (t._horizontalRepeats = e),
            (t._verticalRepeats = i),
            (t._width = n + o + t._centralWidth * e),
            (t._height = a + s + t._centralHeight * i),
            (t._lastWidth = 0),
            (t._lastHeight = 0);
        else {
          var h = e - n - o;
          (t._horizontalRepeats = Math.floor(h / t._centralWidth)),
            (t._lastWidth = h % t._centralWidth);
          var c = i - a - s;
          (t._verticalRepeats = Math.floor(c / t._centralHeight)),
            (t._lastHeight = c % t._centralHeight),
            (t._width = e),
            (t._height = i);
        }
        (t._leftWidth = n),
          (t._rightWidth = o),
          (t._topHeight = a),
          (t._bottomHeight = s);
      }),
      (t.renderNineImage = function () {
        var e = t._frame.y,
          i = 0;
        t._topHeight > 0 &&
          (t.renderNineImageRow(t._image, e, i, t._topHeight),
          (e += t._topHeight),
          (i += t._topHeight));
        for (var a = 0; a < t._verticalRepeats; a++)
          t.renderNineImageRow(t._image, e, i, t._centralHeight),
            (i += t._centralHeight);
        t._lastHeight > 0 &&
          (t.renderNineImageRow(t._image, e, i, t._lastHeight),
          (i += t._lastHeight)),
          (e += t._centralHeight),
          t._bottomHeight > 0 &&
            t.renderNineImageRow(t._image, e, i, t._bottomHeight);
      }),
      (t.renderNineImageRow = function (e, i, a, n) {
        var s = t._frame.x,
          o = 0;
        t._leftWidth > 0 &&
          (t._nineImage.copy(e, s, i, t._leftWidth, n, o, a),
          (o += t._leftWidth),
          (s += t._leftWidth));
        for (var r = 0; r < t._horizontalRepeats; r++)
          t._nineImage.copy(e, s, i, t._centralWidth, n, o, a),
            (o += t._centralWidth);
        t._lastWidth > 0 &&
          (t._nineImage.copy(e, s, i, t._lastWidth, n, o, a),
          (o += t._lastWidth)),
          (s += t._centralWidth),
          t._rightWidth > 0 &&
            t._nineImage.copy(e, s, i, t._rightWidth, n, o, a);
      }),
      (t._textureKey = 0),
      t
    );
  })();
  t.NineImage = e;
})(Helper || (Helper = {}));
var Helper;
!(function (t) {
  var e;
  !(function (t) {
    (t[(t.UNDEFINED = -1)] = "UNDEFINED"),
      (t[(t.SPACE = 1)] = "SPACE"),
      (t[(t.NEWLINE = 2)] = "NEWLINE"),
      (t[(t.CHARACTER = 3)] = "CHARACTER");
  })(e || (e = {}));
  var i = (function () {
    function t() {}
    return (
      (t.hasNext = function () {
        return t.textPosition < t.text.length;
      }),
      (t.getChar = function () {
        return t.text.charAt(t.textPosition++);
      }),
      (t.peekChar = function () {
        return t.text.charAt(t.textPosition);
      }),
      (t.getPosition = function () {
        return t.textPosition;
      }),
      (t.setPosition = function (e) {
        t.textPosition = e;
      }),
      (t.getCharAdvance = function (e, i) {
        var a = t.fontData.chars[e],
          n = a.xAdvance;
        return i > 0 && a.kerning[i] && (n += a.kerning[i]), n;
      }),
      (t.getCharType = function (t) {
        return " " === t
          ? e.SPACE
          : /(?:\r\n|\r|\n)/.test(t)
          ? e.NEWLINE
          : e.CHARACTER;
      }),
      (t.wrapText = function (i, a, n, s, o, r) {
        (t.text = a),
          t.setPosition(0),
          (t.fontData = i.cache.getBitmapFont(o).font),
          void 0 === r && (r = t.fontData.size);
        var l = r / t.fontData.size,
          h = t.fontData.lineHeight * l,
          c = n / l,
          u = [],
          _ = [],
          p = [],
          m = 0,
          f = !0,
          d = 0,
          g = 0;
        (u[m] = g), (p[d++] = 0);
        for (var y = s; t.hasNext(); ) {
          for (
            var v = 0,
              S = 0,
              P = -1,
              C = e.UNDEFINED,
              w = e.UNDEFINED,
              E = c,
              A = -1;
            t.hasNext();

          ) {
            g = t.getPosition();
            var M = t.getChar();
            C = t.getCharType(M);
            var k = M.charCodeAt(0);
            if (C === e.SPACE)
              w !== e.SPACE && (S = v), ++v, (E -= t.getCharAdvance(k, A));
            else if (C === e.CHARACTER) {
              if (
                (w !== e.CHARACTER && (P = g),
                (E -= t.getCharAdvance(k, A)),
                0 > E)
              )
                break;
              ++v;
            } else if (C === e.NEWLINE) {
              var T = !1;
              if (
                (t.hasNext() &&
                  ((T = !0),
                  (S = v),
                  (P = t.getPosition()),
                  (g = P),
                  (E = -1),
                  (C = e.CHARACTER)),
                T)
              )
                break;
            }
            (w = C), (A = k);
          }
          (y -= h),
            0 > y && (p[d++] = m),
            0 > E && C === e.CHARACTER
              ? (0 !== S ? (_[m] = S) : (_[m] = v),
                (f = !1),
                0 > y && ((f = !0), (y = s - h)),
                0 !== S
                  ? ((u[++m] = P), t.setPosition(P))
                  : ((u[++m] = g), t.setPosition(g)))
              : t.hasNext() ||
                (C === e.CHARACTER ? (_[m] = v) : C === e.SPACE && (_[m] = S));
        }
        p[d] = m + 1;
        for (var I = [], O = 1; d >= O; O++) {
          for (var G = p[O - 1], R = p[O], x = [], b = G; R > b; b++)
            x.push(t.text.substr(u[b], _[b]));
          I.push(x.join("\n"));
        }
        return I;
      }),
      t
    );
  })();
  t.TextWrapper = i;
})(Helper || (Helper = {}));
var Log;
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.msg = function (e) {
        t.messages.push(e);
      }),
      (t.messages = []),
      t
    );
  })();
  t.Log = e;
})(Log || (Log = {}));
var Snowflakes;
!(function (t) {
  var e = (function () {
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
          (this._on = t), (this._visual.exists = t), (this._visual.visible = t);
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
          (this._alpha = t), (this._visual.alpha = Phaser.Math.clamp(t, 0, 1));
        },
        enumerable: !0,
        configurable: !0,
      }),
      (e.prototype.setAlphaChange = function (t, e) {
        void 0 === e && (e = 0),
          (this._alphaChangeType = t),
          (this._alphaChange = e);
      }),
      (e.prototype.setPhysics = function (t, e, i, a, n, s) {
        void 0 === t && (t = 0),
          void 0 === e && (e = 0),
          void 0 === i && (i = 0),
          void 0 === a && (a = 0),
          void 0 === n && (n = 0),
          void 0 === s && (s = 0),
          this._velocity.setTo(t, e),
          (this._angularVelocity = i),
          (this._friction = a),
          (this._angularDrag = n),
          (this._gravity = s),
          (this._simplePhysics = 0 === s && 0 === a && 0 === n);
      }),
      (e.prototype.setFrame = function (t) {}),
      (e.prototype.onEmit = function (t) {
        t.add(this._visual);
      }),
      (e.prototype.onKill = function (t) {}),
      (e.prototype.update = function (e) {
        void 0 === e && (e = !0);
        var i = this._game.time.physicsElapsed;
        if (this.lifetime > 0 && (this.lifetime -= i) <= 0) return !1;
        if (
          ((0 !== this._velocity.x || 0 !== this._velocity.y) &&
            ((this._visual.x += this._velocity.x * i),
            (this._visual.y += this._velocity.y * i)),
          0 !== this._angularVelocity &&
            (this._visual.angle += this._angularVelocity * i),
          this._simplePhysics ||
            ((this._velocity.x += -this._friction * this._velocity.x * i),
            (this._velocity.y +=
              (this._gravity - this._friction * this._velocity.y) * i),
            (this._angularVelocity +=
              -this._angularDrag * this._angularVelocity * i)),
          !e)
        )
          return !0;
        if (this._scaleChangeType != t.eParameterChangeType.NO_CHANGE)
          switch (this._scaleChangeType) {
            case t.eParameterChangeType.IN_TIME:
              (this._visual.scale.x += this._scaleChange * i) < 0 &&
                ((this._visual.scale.x = 0),
                this._scaleChange < 0 &&
                  (this._scaleChangeType = t.eParameterChangeType.NO_CHANGE)),
                (this._visual.scale.y += this._scaleChange * i) < 0 &&
                  ((this._visual.scale.y = 0),
                  this._scaleChange < 0 &&
                    (this._scaleChangeType = t.eParameterChangeType.NO_CHANGE));
          }
        if (this._alphaChangeType != t.eParameterChangeType.NO_CHANGE)
          switch (this._alphaChangeType) {
            case t.eParameterChangeType.IN_TIME:
              (this._alpha += this._alphaChange * i),
                this._alpha < 0
                  ? ((this._visual.alpha = 0),
                    this._alphaChange < 0 &&
                      (this._alphaChangeType =
                        t.eParameterChangeType.NO_CHANGE))
                  : this._alpha > 1
                  ? ((this._visual.alpha = 1),
                    this._alphaChange > 0 &&
                      (this._alphaChangeType =
                        t.eParameterChangeType.NO_CHANGE))
                  : (this._visual.alpha = this._alpha);
          }
        return !0;
      }),
      (e.MAX_VELOCITY = 1e3),
      e
    );
  })();
  t.Particle = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e;
  !(function (t) {
    (t[(t.FLOW = 0)] = "FLOW"), (t[(t.EXPLODE = 1)] = "EXPLODE");
  })(e || (e = {})),
    (function (t) {
      (t[(t.NO_CHANGE = 0)] = "NO_CHANGE"), (t[(t.IN_TIME = 1)] = "IN_TIME");
    })(t.eParameterChangeType || (t.eParameterChangeType = {}));
  var i = t.eParameterChangeType,
    a = (function (a) {
      function n(s, o, r, l) {
        a.call(this, s, null),
          (this._maxParticles = n.MAX_PARTICELES),
          (this.emitPoint = new Phaser.Point(0, 0)),
          (this.area = new Phaser.Point(0, 0)),
          (this.gravity = 100),
          (this.particleClass = t.SpriteParticle),
          (this.particleBringToTop = !1),
          (this.particleSendToBack = !1),
          (this.frequency = 100),
          (this.minLifetime = 1),
          (this.maxLifetime = 2),
          (this.minParticleScale = 1),
          (this.maxParticleScale = 1),
          (this.scaleChange = 0),
          (this.scaleChangeType = i.NO_CHANGE),
          (this.minParticleSpeed = new Phaser.Point(-100, -100)),
          (this.maxParticleSpeed = new Phaser.Point(100, 100)),
          (this.particleFriction = 0),
          (this.minAngularSpeed = -360),
          (this.maxAngularSpeed = 360),
          (this.angularDrag = 0),
          (this.minParticleAlpha = 1),
          (this.maxParticleAlpha = 1),
          (this.alphaChange = 0),
          (this.alphaChangeType = i.NO_CHANGE),
          (this.forceEmit = !1),
          (this._on = !1),
          (this._mode = e.FLOW),
          (this._flowQuantity = 0),
          (this._flowTotal = 0),
          (this._flowCounter = 0),
          (this._particlesPool = []),
          (this._counterPool = 0),
          (this._particlesUsed = []),
          (this._counterUsed = 0),
          (this._timer = 0),
          (this._frames = null),
          (this._emitPoint = new Phaser.Point(0, 0)),
          (this._minParticleScale = new Phaser.Point(1, 1)),
          (this._maxParticleScale = new Phaser.Point(1, 1)),
          this.position.setTo(o, r),
          (this._maxParticles = l);
      }
      return (
        __extends(n, a),
        (n.prototype.update = function () {
          if (
            this._on &&
            this.game.time.time >= this._timer &&
            ((this._timer =
              this.game.time.time + this.frequency * this.game.time.slowMotion),
            this._mode === e.FLOW)
          )
            if (-1 !== this._flowTotal && this._flowCounter >= this._flowTotal)
              this.on = !1;
            else
              for (
                var t = Math.max(1, this._flowQuantity), i = 0;
                t > i &&
                !(
                  this.emitParticle(this.forceEmit) &&
                  (this._flowCounter++,
                  -1 !== this._flowTotal &&
                    this._flowCounter >= this._flowTotal)
                );
                i++
              );
          for (var i = this._counterUsed - 1; i >= 0; i--) {
            var a = this._particlesUsed[i];
            a.update() ||
              ((a.on = !1),
              a.remove(),
              a.onKill(this),
              (this._particlesUsed[i] = this._particlesUsed[
                --this._counterUsed
              ]),
              (this._particlesPool[this._counterPool++] = a));
          }
        }),
        (n.prototype.makeParticles = function (t, e, i) {
          (void 0 === i || i > this._maxParticles) && (i = this._maxParticles),
            void 0 !== e && (this._frames = e);
          for (var a = 0; i > a; a++) {
            var n = new this.particleClass(this.game);
            (n.textureKey = t),
              n.onCreate(this),
              (n.on = !1),
              (this._particlesPool[this._counterPool++] = n);
          }
        }),
        Object.defineProperty(n.prototype, "on", {
          set: function (t) {
            (this._on = t), (this.exists = t), (this.visible = t);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "lifetime", {
          set: function (t) {
            this.minLifetime = this.maxLifetime = t;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "count", {
          get: function () {
            return this._counterUsed;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (n.prototype.explode = function (t, i, a) {
          (this._mode = e.EXPLODE), (this.on = !0), this.emitParticles(t, i, a);
        }),
        (n.prototype.flow = function (t, i, a, n, s, o) {
          (this._mode = e.FLOW),
            (this.on = !0),
            (void 0 === i || 0 === i) && (i = 1),
            void 0 === a && (a = -1),
            void 0 === n && (n = !0),
            i > this._maxParticles && (i = this._maxParticles),
            (this.frequency = t),
            (this._flowCounter = 0),
            (this._flowQuantity = i),
            (this._flowTotal = a),
            n &&
              (this.emitParticles(i, s, o),
              (this._flowCounter += i),
              (this._timer =
                this.game.time.time + t * this.game.time.slowMotion));
        }),
        (n.prototype.killAllParticles = function (t) {
          for (void 0 === t && (t = !0); this._counterUsed > 0; ) {
            var e = this._particlesUsed[--this._counterUsed];
            e.remove(),
              t || e.onKill(this),
              (this._particlesPool[this._counterPool++] = e);
          }
        }),
        (n.prototype.emitParticles = function (t, e, i) {
          for (var a = 0; t > a; a++) {
            var n = this.emitParticle(this.forceEmit);
            if (null === n) break;
            void 0 !== e && null !== e && e.call(i, n);
          }
        }),
        (n.prototype.emitParticle = function (t, e) {
          if (
            (void 0 === t && (t = !1),
            void 0 === e && (e = !1),
            0 === this._counterPool)
          ) {
            if (!t) return null;
            var a = this._particlesUsed[0];
            (this._particlesUsed[0] = this._particlesUsed[--this._counterUsed]),
              a.remove(),
              a.onKill(this),
              (this._particlesPool[this._counterPool++] = a);
          }
          var n = this._particlesPool[--this._counterPool];
          if (
            ((this._particlesUsed[this._counterUsed++] = n),
            (n.on = !0),
            this.randomEmitPoint(this._emitPoint),
            n.visual.position.set(this._emitPoint.x, this._emitPoint.y),
            (n.visual.angle = 0),
            e)
          )
            (n.lifetime = -1),
              n.visual.scale.set(1, 1),
              n.setScaleChange(i.NO_CHANGE),
              (n.alpha = 1),
              n.setAlphaChange(i.NO_CHANGE),
              n.setPhysics();
          else {
            if (
              ((n.lifetime = this.game.rnd.realInRange(
                this.minLifetime,
                this.maxLifetime
              )),
              1 !== this.minParticleScale || 1 !== this.maxParticleScale)
            ) {
              var s = this.game.rnd.realInRange(
                this.minParticleScale,
                this.maxParticleScale
              );
              n.visual.scale.set(s, s);
            } else
              this._minParticleScale.x !== this._maxParticleScale.x ||
              this._minParticleScale.y !== this._maxParticleScale.y
                ? n.visual.scale.set(
                    this.game.rnd.realInRange(
                      this._minParticleScale.x,
                      this._maxParticleScale.x
                    ),
                    this.game.rnd.realInRange(
                      this._minParticleScale.y,
                      this._maxParticleScale.y
                    )
                  )
                : n.visual.scale.set(1, 1);
            n.setScaleChange(this.scaleChangeType, this.scaleChange),
              (n.alpha = this.game.rnd.realInRange(
                this.minParticleAlpha,
                this.maxParticleAlpha
              )),
              n.setAlphaChange(this.alphaChangeType, this.alphaChange),
              n.setPhysics(
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
              null !== this._frames && n.setFrame(this.randomFrame());
          }
          return (
            n.onEmit(this),
            this.particleBringToTop
              ? n.bringToTop()
              : this.particleSendToBack && n.sendToBack(),
            n
          );
        }),
        (n.prototype.destroy = function () {
          t.ParticlesManager.instance.remove(this),
            a.prototype.destroy.call(this, !0, !1);
        }),
        (n.prototype.randomFrame = function () {
          var t = null;
          return (
            null !== this._frames &&
              (t = Array.isArray(this._frames)
                ? "string" == typeof this._frames[0]
                  ? this.game.rnd.pick(this._frames)
                  : this.game.rnd.pick(this._frames)
                : this._frames),
            t
          );
        }),
        (n.prototype.randomEmitPoint = function (t) {
          return (
            this.area instanceof Phaser.Point
              ? t.setTo(0, 0)
              : this.area.random(t),
            (t.x += this.emitPoint.x),
            (t.y += this.emitPoint.y),
            t
          );
        }),
        (n.prototype.setXSpeed = function (t, e) {
          (t = t || 0),
            (e = e || 0),
            (this.minParticleSpeed.x = t),
            (this.maxParticleSpeed.x = e);
        }),
        (n.prototype.setYSpeed = function (t, e) {
          (t = t || 0),
            (e = e || 0),
            (this.minParticleSpeed.y = t),
            (this.maxParticleSpeed.y = e);
        }),
        (n.prototype.setAngularSpeed = function (t, e) {
          (t = t || 0),
            (e = e || 0),
            (this.minAngularSpeed = t),
            (this.maxAngularSpeed = e);
        }),
        (n.prototype.setAlpha = function (t, e) {
          void 0 === t && (t = 1),
            void 0 === e && (e = 1),
            (this.minParticleAlpha = t),
            (this.maxParticleAlpha = e);
        }),
        (n.prototype.setAlphaChange = function (t, e, a) {
          switch (
            (void 0 === e && (e = 0),
            void 0 === a && (a = 0),
            (this.alphaChangeType = t),
            t)
          ) {
            case i.NO_CHANGE:
              this.alphaChange = 0;
              break;
            case i.IN_TIME:
              0 === a && (a = 1), (this.alphaChange = e / a);
          }
        }),
        (n.prototype.setScale = function (t, e, i, a) {
          void 0 === t && (t = 1),
            void 0 === e && (e = 1),
            void 0 === i && (i = 1),
            void 0 === a && (a = 1),
            this._minParticleScale.setTo(t, i),
            this._maxParticleScale.setTo(e, a);
        }),
        (n.prototype.setScaleChange = function (t, e, a) {
          switch (
            (void 0 === e && (e = 0),
            void 0 === a && (a = 0),
            (this.scaleChangeType = t),
            t)
          ) {
            case i.NO_CHANGE:
              this.scaleChange = 0;
              break;
            case i.IN_TIME:
              0 === a && (a = 1), (this.scaleChange = e / a);
          }
        }),
        (n.prototype.emitAt = function (t, e) {
          this.emitPoint.setTo(t, e);
        }),
        (n.prototype.emitAtObject = function (t) {
          t.center
            ? this.emitPoint.setTo(t.center.x, t.center.y)
            : this.emitPoint.setTo(t.x, t.y);
        }),
        (n.MAX_PARTICELES = 16),
        n
      );
    })(Phaser.Group);
  t.ParticlesEmitter = a;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
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
          e >= 0 && this._emitters[e] !== t;
          e--
        );
        -1 !== e && (this._emitters[e] = this._emitters[--this._emittersCount]);
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
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (t) {
    function e() {
      t.apply(this, arguments);
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
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (e) {
    function i(a, n) {
      e.call(this, a, n);
      var s = new t.ParticlesEmitter(this.game, 0, 0, i.PARTICLES_MAX);
      (s.area = new Phaser.Line(-30, 0, 30, 0)),
        (s.particleClass = t.BoostParticle),
        (s.gravity = 0),
        (s.lifetime = 0.5),
        s.setXSpeed(-50, 50),
        s.setYSpeed(500, 600),
        s.setAngularSpeed(0),
        s.makeParticles("Sprites", null, i.PARTICLES_MAX),
        this.add(s),
        (this._emitter = s);
      var o = new Phaser.Sprite(a, 0, 0, "Sprites");
      o.anchor.set(0.5, 0.5),
        this.add(o),
        (this._heart = o),
        (this._fireParticles = !1);
    }
    return (
      __extends(i, e),
      (i.prototype.reset = function () {
        (this.visible = !1),
          (this.alpha = 1),
          (this._heart.y = 0),
          this._emitter.killAllParticles(),
          (this._fireParticles = !1);
      }),
      (i.prototype.fire = function (t) {
        this.reset(),
          (this._heart.frameName = t),
          (this.visible = !0),
          this.game.add
            .tween(this)
            .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, !0, 1500),
          this.game.add
            .tween(this._heart)
            .to({ y: -170 }, 500, Phaser.Easing.Linear.None, !0, 1500)
            .onComplete.add(function () {
              this._fireParticles = !1;
            }, this),
          (this._fireParticles = !0);
      }),
      (i.prototype.update = function () {
        this._fireParticles &&
          (this._emitter.emitAt(this._heart.x, this._heart.y + 30),
          this._emitter.emitParticle(),
          this._emitter.update());
      }),
      (i.PARTICLES_MAX = 50),
      i
    );
  })(Phaser.Group);
  t.Achievement = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.HERO_STAND = ["angel_stoji"]),
      (t.HERO_PREPARE = ["angel_odraz"]),
      (t.HERO_JUMP = ["angel_vyskok"]),
      (t.HERO_FLY = [
        "angel_f1",
        "angel_f2",
        "angel_f3",
        "angel_f4",
        "angel_f5",
      ]),
      (t.VLOCKA = ["vlocka_f1", "vlocka_f2", "vlocka_f3"]),
      (t.BOOST = [
        "partiklsrdce4",
        "partiklsrdce3",
        "partiklsrdce2",
        "partiklsrdce1",
      ]),
      t
    );
  })();
  t.Anims = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (e) {
    function i() {
      e.apply(this, arguments);
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function (i) {
        e.prototype.onCreate.call(this, i);
        var a = this._visual;
        a.animations.add("boost", t.Anims.BOOST, 8, !1);
      }),
      (i.prototype.onEmit = function (t) {
        e.prototype.onEmit.call(this, t);
        var i = this._visual;
        i.animations.currentAnim.stop(), i.animations.play("boost");
      }),
      i
    );
  })(t.SpriteParticle);
  t.BoostParticle = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (e) {
    function i(t) {
      e.call(this, t, 0, 0, "Sprites"), this.anchor.set(0.5, 0.5);
    }
    return (
      __extends(i, e),
      (i.prototype.setRandom = function () {
        (this.frameName = "mrak" + this.game.rnd.integerInRange(1, 3)),
          (this._speedX = this.game.rnd.integerInRange(
            t.Gameplay.CLOUD_SPEED_MIN,
            t.Gameplay.CLOUD_SPEED_MAX
          )),
          this.game.rnd.integerInRange(0, 99) < 50 && (this._speedX *= -1);
      }),
      (i.prototype.tick = function (t) {
        (this.x += this._speedX * t),
          this.x > 400 ? (this.x = -400) : this.x < -400 && (this.x = 400);
      }),
      i
    );
  })(Phaser.Sprite);
  t.Cloud = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (e) {
    function i(i, a) {
      e.call(this, i, a),
        (this._lastCloud = null),
        (this._cloudList = []),
        (this._cloudListCount = 0);
      t.CloudsPool.instance;
    }
    return (
      __extends(i, e),
      (i.prototype.reset = function () {
        (this._lastCloud = null), this.removeOldClouds(0, !0);
      }),
      (i.prototype.tick = function () {
        var t = this.game.time.physicsElapsed;
        this.forEach(function (e) {
          e.tick(t);
        }, this);
      }),
      (i.prototype.generateClouds = function (e) {
        for (
          var a = e - i.CAMERA_OFFSET_Y,
            n = null === this._lastCloud ? 0 : this._lastCloud.x,
            s = null === this._lastCloud ? i.FIRST_CLOUD_Y : this._lastCloud.y;
          s > a;

        ) {
          var o = t.CloudsPool.instance.createItem(),
            r = this.game.rnd.integerInRange(-320, 320),
            l =
              s -
              this.game.rnd.integerInRange(
                t.Gameplay.CLOUD_SPACING_Y_MIN,
                t.Gameplay.CLOUD_SPACING_Y_MAX
              );
          o.setRandom(),
            o.position.set(r, l),
            o.parent !== this && this.add(o),
            (this._lastCloud = o),
            (n = this._lastCloud.x),
            (s = this._lastCloud.y);
        }
      }),
      (i.prototype.removeOldClouds = function (e, a) {
        void 0 === a && (a = !1);
        var n = e + 640 + 2 * i.CAMERA_OFFSET_Y;
        for (
          this._cloudListCount = 0,
            this.forEach(function (t) {
              (t.y >= n || a) && (this._cloudList[this._cloudListCount++] = t);
            }, this);
          this._cloudListCount > 0;

        ) {
          var s = this._cloudList[--this._cloudListCount];
          (this._cloudList[this._cloudListCount] = null),
            this.remove(s),
            t.CloudsPool.instance.destroyItem(s);
        }
      }),
      (i.CAMERA_OFFSET_Y = 320),
      (i.FIRST_CLOUD_Y = -400),
      i
    );
  })(Phaser.Group);
  t.Clouds = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function () {
    function e() {}
    return (
      Object.defineProperty(e, "instance", {
        get: function () {
          return (
            null === e._instance &&
              (e._instance = new t.Pool(t.Cloud, 16, function () {
                return new t.Cloud(t.Global.game);
              })),
            e._instance
          );
        },
        enumerable: !0,
        configurable: !0,
      }),
      (e._instance = null),
      e
    );
  })();
  t.CloudsPool = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function () {
    function e() {}
    return (
      (e.prototype.reset = function () {
        (this.pickSpacingX = t.Gameplay.PICK_SPACING_X_INITIAL),
          (this.pickSpacingY = t.Gameplay.PICK_SPACING_Y_INITIAL);
      }),
      (e.prototype.onPickGenerated = function () {
        (this.pickSpacingX = Math.min(
          this.pickSpacingX + t.Gameplay.PICK_SPACING_X_STEP,
          t.Gameplay.PICK_MAX_SPACE_X
        )),
          (this.pickSpacingY = Math.min(
            this.pickSpacingY + t.Gameplay.PICK_SPACING_Y_STEP,
            t.Gameplay.PICK_MAX_SPACE_Y
          ));
      }),
      e
    );
  })();
  t.Difficulty = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (e) {
    function i(i) {
      e.call(this, i, 0, 0, "Sprites", "vlocka1"),
        (this.onKill = new Phaser.Signal()),
        this.anchor.set(0.5, 0.5),
        i.physics.enable(this, Phaser.Physics.ARCADE);
      var a = this.body;
      (a.allowGravity = !1),
        this.animations
          .add("Snowflake", t.Anims.VLOCKA, 8, !1)
          .onComplete.add(function () {
            this.onKill.dispatch(this);
          }, this);
    }
    return (
      __extends(i, e),
      Object.defineProperty(i.prototype, "saveX", {
        set: function (t) {
          this._savex = t;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "heart", {
        get: function () {
          return !this._snowflake;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (i.prototype.setRandomSnowflake = function () {
        (this.frameName = "vlocka" + this.game.rnd.integerInRange(1, 3)),
          (this._snowflake = !0);
        var e = this.body,
          i = this.game.cache.getFrameByName("Sprites", "vlocka1");
        e.setSize(Math.floor(0.8 * i.width), Math.floor(0.8 * i.height), 0, 0),
          (this._time = this.game.rnd.integerInRange(
            0,
            t.Gameplay.SNOWFLAKE_MOVE_TIME
          )),
          (this._dying = !1);
      }),
      (i.prototype.setRandomHeart = function () {
        (this.frameName = "srdce" + this.game.rnd.integerInRange(1, 2)),
          (this._snowflake = !1);
        var t = this.body,
          e = this.game.cache.getFrameByName("Sprites", "srdce1");
        t.setSize(Math.floor(0.9 * e.width), Math.floor(0.9 * e.height), 0, 0),
          (this._dying = !1);
      }),
      (i.prototype.onRemove = function () {
        (this.body.enable = !1),
          this._snowflake
            ? (this.animations.play("Snowflake"), (this._dying = !0))
            : this.onKill.dispatch(this);
      }),
      (i.prototype.move = function (e) {
        (this._time += e), (this._time %= t.Gameplay.SNOWFLAKE_MOVE_TIME);
        var i = (this._time / t.Gameplay.SNOWFLAKE_MOVE_TIME) * Math.PI * 2,
          a = Math.sin(i) * t.Gameplay.SNOWFLAKE_MOVE_DIST;
        (this.x = this._savex + a),
          this._dying && (this.y += (t.Gameplay.PICK_SPEED * e) / 1e3);
      }),
      i
    );
  })(Phaser.Sprite);
  t.Pick = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function () {
    function e() {}
    return (
      Object.defineProperty(e, "instance", {
        get: function () {
          return (
            null === e._instance &&
              (e._instance = new t.Pool(t.Pick, 30, function () {
                return new t.Pick(t.Global.game);
              })),
            e._instance
          );
        },
        enumerable: !0,
        configurable: !0,
      }),
      (e._instance = null),
      e
    );
  })();
  t.PicksPool = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.GRAVITY = 1500),
      (t.HERO_HORIZONTAL_VELOCITY = 400),
      (t.HERO_FIRST_JUMP_VELOCITY = -750),
      (t.HERO_SNOWFLAKE_JUMP_VELOCITY = -750),
      (t.HERO_HEART_JUMP_VELOCITY = -1312.5),
      (t.HERO_MEGA_HEART_JUMP_VELOCITY = -1687.5),
      (t.HERO_DEATH_FALL_HEIGHT = 960),
      (t.PICK_MIN_SPACE_X = 50),
      (t.PICK_MAX_SPACE_X = 290),
      (t.PICK_SPACING_X_INITIAL = 120),
      (t.PICK_SPACING_X_STEP = 3),
      (t.PICK_MAX_SPACE_Y = 120),
      (t.PICK_SPACING_Y_INITIAL = 80),
      (t.PICK_SPACING_Y_STEP = 0),
      (t.PICK_SPEED = 30),
      (t.SNOWFLAKE_MOVE_TIME = 4e3),
      (t.SNOWFLAKE_MOVE_DIST = 10),
      (t.BG_SCROLL_SPEED = 0.02),
      (t.CLOUD_SPEED_MIN = 20),
      (t.CLOUD_SPEED_MAX = 50),
      (t.CLOUD_SPACING_Y_MIN = 100),
      (t.CLOUD_SPACING_Y_MAX = 200),
      (t.HEART_COUNTER = 10),
      t
    );
  })();
  t.Gameplay = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (e) {
    function i(a) {
      e.call(this, a, 0, 0, "Sprites", "angel_f1"),
        this.anchor.set(0.5, 1),
        a.physics.enable(this, Phaser.Physics.ARCADE);
      var n = this.body;
      (n.allowGravity = !0), (n.gravity.y = t.Gameplay.GRAVITY);
      var s = this.game.cache.getFrameByName("Sprites", "angel_stoji");
      n.setSize(Math.floor(0.8 * s.width), Math.floor(1 * s.height), 0, 0),
        this.animations.add(
          "Stand",
          t.Anims.HERO_STAND,
          i.HERO_ANIMS_FRAMERATE,
          !0
        ),
        this.animations
          .add(
            "Prepare",
            t.Anims.HERO_PREPARE,
            Math.floor(i.HERO_ANIMS_FRAMERATE / 3),
            !1
          )
          .onComplete.add(function () {
            this.jump();
          }, this),
        this.animations.add(
          "Fly",
          t.Anims.HERO_FLY,
          i.HERO_ANIMS_FRAMERATE,
          !0
        ),
        this.animations.add(
          "Jump",
          t.Anims.HERO_JUMP,
          i.HERO_ANIMS_FRAMERATE,
          !1
        ),
        this.clear();
    }
    return (
      __extends(i, e),
      Object.defineProperty(i.prototype, "firstMove", {
        get: function () {
          return this._firstMove;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "maxHeight", {
        get: function () {
          return this._maxHeight;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (i.prototype.clear = function () {
        this.position.set(0, -50),
          (this._firstMove = !0),
          (this._jumpTime = 0),
          (this._maxHeight = 0);
        var t = this.body;
        (t.allowGravity = !0),
          t.velocity.set(0, 0),
          this.play("Stand"),
          (this.tint = 16777215);
      }),
      (i.prototype.tick = function () {
        var t = this.animations.currentAnim.name,
          e = this.body;
        this._firstMove
          ? ("Jump" === t && this.y < -150
              ? this.play("Fly")
              : "Fly" === t && this.y > -150 && this.play("Jump"),
            e.touching.down &&
              this.game.time.now - this._jumpTime > 500 &&
              this.play("Stand"))
          : e.velocity.y < 10 && "Jump" === t
          ? this.play("Fly")
          : e.velocity.y > 10 && "Fly" === t && this.play("Jump");
      }),
      (i.prototype.jump = function () {
        var e = this.body;
        (e.velocity.y = t.Gameplay.HERO_FIRST_JUMP_VELOCITY), this.play("Jump");
      }),
      (i.prototype.move = function (e, i) {
        var a = this.game.camera.y;
        a < this._maxHeight && (this._maxHeight = a);
        var n = this.body;
        if (
          ((n.velocity.x = 0),
          this._firstMove &&
            (e > 0 || i > 0) &&
            this.game.time.now - this._jumpTime > 500 &&
            n.touching.down)
        )
          return (
            (this._jumpTime = this.game.time.now),
            (this.scale.x = e > 0 ? -1 : 1),
            this.play("Prepare"),
            void Utils.AudioUtils.playSound("Jump")
          );
        var s = this.animations.currentAnim.name;
        if ("Stand" !== s && "Prepare" !== s) {
          var o = this.game.cache.getFrameByName("Sprites", "angel_f1").width;
          e > 0
            ? this.x > -320 + o / 2 &&
              ((n.velocity.x = -t.Gameplay.HERO_HORIZONTAL_VELOCITY * e),
              (this.scale.x = -1))
            : i > 0 &&
              this.x < 320 - o / 2 &&
              ((n.velocity.x = t.Gameplay.HERO_HORIZONTAL_VELOCITY * i),
              (this.scale.x = 1));
        }
      }),
      (i.prototype.jumpOnPick = function (e, i) {
        var a = this.body,
          n = e
            ? i
              ? t.Gameplay.HERO_MEGA_HEART_JUMP_VELOCITY
              : t.Gameplay.HERO_HEART_JUMP_VELOCITY
            : t.Gameplay.HERO_SNOWFLAKE_JUMP_VELOCITY;
        a.velocity.y > n && (a.velocity.y = n), (this._firstMove = !1);
      }),
      (i.prototype.isDead = function (t) {
        return this.y > t + 640 + 150;
      }),
      (i.prototype.stop = function () {
        var t = this.body;
        t.velocity.set(0, 0), (t.allowGravity = !1), this.play("Jump");
      }),
      (i.HERO_ANIMS_FRAMERATE = 20),
      i
    );
  })(Phaser.Sprite);
  t.Hero = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
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
      for (var a = 0; e > a; a++) {
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
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (e) {
    function i(i, a, n, s) {
      e.call(this, i, 0, 0, n),
        (this._lineArea = new Phaser.Line(0, 0, 640, 0)),
        (this._rectArea = new Phaser.Rectangle(0, 0, 640, 1280)),
        (this.particleClass = t.SnowParticle),
        (this.area = this._rectArea),
        (this.gravity = 0),
        (this.lifetime = -1),
        this.setXSpeed(0, 0),
        this.setYSpeed(Math.floor(60 * s), Math.floor(100 * s)),
        this.setAngularSpeed(0),
        this.makeParticles("Sprites", a, n);
    }
    return (
      __extends(i, e),
      (i.prototype.prewarm = function () {
        this.emitAt(0, this.game.camera.y),
          (this.area = this._rectArea),
          this.explode(40);
      }),
      (i.prototype.setEmitAreaY = function (t) {
        this.emitAt(0, t);
      }),
      i
    );
  })(t.ParticlesEmitter);
  t.Snow = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (t) {
    function e() {
      t.apply(this, arguments), (this._saveX = -1), (this._saveY = 0);
    }
    return (
      __extends(e, t),
      (e.prototype.update = function (e) {
        void 0 === e && (e = !0);
        var i = t.prototype.update.call(this, e);
        if (
          i &&
          (this._visual.y > this._game.camera.y + 1480 &&
            ((this._visual.y -= 1485),
            (this._visual.x = this._game.rnd.integerInRange(0, 640)),
            (this._saveX = -1)),
          -1 === this._saveX && (this._saveX = this._visual.x),
          Math.abs(this._saveY - this._visual.y) > 15)
        ) {
          this._saveY = this._visual.y;
          var a = this._game.rnd.integerInRange(
            this._saveX - 7,
            this._saveX + 7
          );
          a < this._visual.x
            ? (this._visual.x -= 1)
            : a > this._visual.x && (this._visual.x += 1);
        }
        return i;
      }),
      e
    );
  })(t.SpriteParticle);
  t.SnowParticle = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (e) {
    function i(a, n) {
      e.call(this, a, n),
        (this._lastPick = null),
        (this._pickList = []),
        (this._pickListCount = 0),
        (i._instance = this);
      t.PicksPool.instance;
      this._picksGroup = new Phaser.Group(a, this);
    }
    return (
      __extends(i, e),
      Object.defineProperty(i, "instance", {
        get: function () {
          return i._instance;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "picksGroup", {
        get: function () {
          return this._picksGroup;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (i.prototype.reset = function () {
        (this._lastPick = null),
          this.removeOldPicks(0, !0),
          (this._picksCount = 0);
      }),
      (i.prototype.generatePicks = function (e, a) {
        for (
          var n = e - i.CAMERA_OFFSET_Y,
            s = null === this._lastPick ? 0 : this._lastPick.x,
            o = null === this._lastPick ? i.FIRST_PICK_Y : this._lastPick.y;
          o > n;

        ) {
          var r = this.getPickXDistance(s, a.pickSpacingX);
          a.pickSpacingX < t.Gameplay.PICK_MAX_SPACE_X && (r += s);
          var l = o - a.pickSpacingY,
            h = t.PicksPool.instance.createItem();
          h.parent !== this._picksGroup && this._picksGroup.add(h),
            0 === h.onKill.getNumListeners() &&
              h.onKill.add(this.onKillPick, this),
            this._picksCount === t.Gameplay.HEART_COUNTER
              ? ((this._picksCount = 0), h.setRandomHeart())
              : h.setRandomSnowflake();
          var c = h.body;
          (c.enable = !0),
            h.position.set(r, l),
            (h.saveX = r),
            (c.velocity.y = t.Gameplay.PICK_SPEED),
            (this._lastPick = h),
            (s = this._lastPick.x),
            (o = this._lastPick.y),
            a.onPickGenerated(),
            ++this._picksCount;
        }
      }),
      (i.prototype.getPickXDistance = function (e, a) {
        if (a >= t.Gameplay.PICK_MAX_SPACE_X) {
          var n = this.game.rnd.integerInRange(
            -320 + i.PICK_BORDER_X,
            320 - i.PICK_BORDER_X
          );
          return -400 > n - e ? (n = e - 400) : n - e > 400 && (n = e + 400), n;
        }
        var s = Math.floor(
          this.game.rnd.integerInRange(t.Gameplay.PICK_MIN_SPACE_X, a)
        );
        return (
          this.game.rnd.integerInRange(0, 99) < 50
            ? (s = e - s < -320 + i.PICK_BORDER_X ? 0 : -s)
            : e + s > 320 - i.PICK_BORDER_X && (s = 0),
          s
        );
      }),
      (i.prototype.onPickCollision = function (t) {
        t.onRemove();
      }),
      (i.prototype.onKillPick = function (e) {
        this._picksGroup.remove(e), t.PicksPool.instance.destroyItem(e);
      }),
      (i.prototype.removeOldPicks = function (e, a) {
        void 0 === a && (a = !1);
        var n = e + 640 + 2 * i.CAMERA_OFFSET_Y,
          s = i.FIRST_PICK_Y;
        for (
          this._pickListCount = 0,
            this._picksGroup.forEach(function (t) {
              t.y >= n || a
                ? (this._pickList[this._pickListCount++] = t)
                : t.y > s && t.onRemove();
            }, this);
          this._pickListCount > 0;

        ) {
          var o = this._pickList[--this._pickListCount];
          o.animations.currentAnim.isPlaying && o.animations.currentAnim.stop(),
            (this._pickList[this._pickListCount] = null),
            this._picksGroup.remove(o),
            t.PicksPool.instance.destroyItem(o);
        }
      }),
      (i.prototype.movePicks = function () {
        var t = this.game.time.physicsElapsedMS;
        this._picksGroup.forEach(function (e) {
          e.heart || e.move(t);
        }, this);
      }),
      (i.PARTICLES_MAX = 24),
      (i.CAMERA_OFFSET_Y = 320),
      (i.PICK_BORDER_X = 25),
      (i.FIRST_PICK_Y = -220),
      (i._instance = null),
      i
    );
  })(Phaser.Group);
  t.World = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (t) {
    function e() {
      t.call(this), (this._ignoreNextResize = !1);
    }
    return (
      __extends(e, t),
      (e.prototype.init = function () {
        this.input.maxPointers = 1;
        var t = Utils.ScreenUtils.screenMetrics;
        this.game.device.desktop
          ? ((this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE),
            this.scale.setMinMax(
              0.25 * this.game.width,
              0.25 * this.game.height,
              2.5 * this.game.width,
              2.5 * this.game.height
            ),
            this.scale.setUserScale(t.scaleX, t.scaleY),
            (this.scale.pageAlignHorizontally = !0),
            (this.scale.pageAlignVertically = !0),
            this.scale.setResizeCallback(this.gameResized, this))
          : ((this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE),
            this.scale.setUserScale(t.scaleX, t.scaleY),
            (this.scale.pageAlignHorizontally = !0),
            (this.scale.pageAlignVertically = !0),
            this.scale.forceOrientation(!0, !1),
            this.scale.setResizeCallback(this.gameResized, this),
            this.scale.onOrientationChange.add(this.orientationChange, this)),
          this.orientationChange(this.scale, "", !0);
      }),
      (e.prototype.create = function () {
        this.game.state.start("Preloader", !0, !1);
      }),
      (e.prototype.gameResized = function (t, e) {}),
      (e.prototype.orientationChange = function (t, e, i) {}),
      e
    );
  })(Phaser.State);
  t.Boot = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (t) {
    function e() {
      t.call(this);
    }
    return (
      __extends(e, t),
      (e.prototype.create = function () {
        this.stage.backgroundColor = 3158064;
        var t = this.add.button(
          0,
          0,
          "Sprites",
          function () {
            this.game.state.start("Play", !0, !1);
          },
          this,
          "vlocka1",
          "vlocka1",
          "vlocka1",
          "vlocka1",
          this.world
        );
        t.anchor.setTo(0.5, 0.5);
      }),
      e
    );
  })(Phaser.State);
  t.Menu = e;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e;
  !(function (t) {
    (t[(t.NONE = 0)] = "NONE"),
      (t[(t.RIGHT = 1)] = "RIGHT"),
      (t[(t.LEFT = 2)] = "LEFT");
  })(e || (e = {}));
  var i = (function (i) {
    function a() {
      i.call(this),
        (this._gameOver = !1),
        (this._paused = !1),
        (this._runFromRestart = !1),
        (this._gameeMoveDir = e.NONE),
        (this._gameeCenterX = 0),
        (this._gameeMaxX = 0),
        (this._gameeMovementX = 0),
        (this._gameeTouched = !1),
        (this._difficulty = new t.Difficulty());
    }
    return (
      __extends(a, i),
      Object.defineProperty(a.prototype, "scrollSpeed", {
        get: function () {
          return this._scrollSpeed;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(a.prototype, "scrollSpeedCoef", {
        get: function () {
          return this._scrollSpeed;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (a.prototype.create = function () {
        var e = this.game.cache.getFrameData("Bg");
        (this._bgFrame = e.getFrame(0)),
          (this._bg = this.game.make.sprite(0, 0, "Bg")),
          this.world.add(this._bg),
          (this.stage.backgroundColor = 3869758),
          (this.camera.bounds = null),
          (this._snowBack = new t.Snow(this.game, "vlockabg", 50, 0.6)),
          this._snowBack.position.set(-320, 0),
          this.world.add(this._snowBack),
          (this._clouds = new t.Clouds(this.game, this.world)),
          (this._world = new t.World(this.game, this.world)),
          (this._floor = new Phaser.Sprite(
            this.game,
            -320,
            0,
            "Sprites",
            "zeme"
          )),
          this._floor.anchor.setTo(0, 1),
          this.physics.enable(this._floor, Phaser.Physics.ARCADE);
        var i = this._floor.body;
        (i.immovable = !0),
          this.world.add(this._floor),
          (this._hero = new t.Hero(this.game)),
          this.world.add(this._hero);
        var n = new t.ParticlesEmitter(this.game, 0, 0, a.BOOST_PARTICLES_MAX);
        (n.particleClass = t.BoostParticle),
          (n.gravity = 0),
          (n.lifetime = 0.5),
          n.setXSpeed(-100, 100),
          n.setYSpeed(0, 0),
          n.setAngularSpeed(0),
          n.makeParticles("Sprites", null, a.BOOST_PARTICLES_MAX),
          this.world.add(n),
          (this._boostEmitter = n),
          (this._snowFront = new t.Snow(
            this.game,
            ["vlockafront1", "vlockafront2"],
            50,
            1
          )),
          this._snowFront.position.set(-320, 0),
          this.world.add(this._snowFront);
        var s = new t.Achievement(this.game, this.world);
        if (
          ((s.fixedToCamera = !0),
          s.cameraOffset.set(320, 120),
          (s.visible = !1),
          (this._heartAchievement = s),
          (this._cursorKeys = this.game.input.keyboard.createCursorKeys()),
          t.Global.GAMEE)
        );
        this.reset(), t.Global.GAMEE || Utils.AudioUtils.playSound("Start");
      }),
      (a.prototype.onGameeTouchStart = function (t) {
        this.checkGameRunning(),
          this._paused && (this._paused = !1),
          (this._gameeMoveDir = e.NONE),
          (this._gameeCenterX = t.position.x),
          (this._gameeMovementX = 0),
          (this._gameeTouched = !0);
      }),
      (a.prototype.onGameeTouchMove = function (t) {
        if (this._gameeTouched) {
          var i = t.position.x;
          this._gameeMoveDir === e.NONE
            ? ((this._gameeMoveDir =
                i - this._gameeCenterX > 0 ? e.RIGHT : e.LEFT),
              (this._gameeMaxX = i))
            : this._gameeMoveDir === e.RIGHT
            ? i >= this._gameeMaxX
              ? (this._gameeMaxX = i)
              : this._gameeMaxX - i > 0.005
              ? ((this._gameeMoveDir = e.NONE), (this._gameeCenterX = i))
              : (i = this._gameeMaxX)
            : this._gameeMoveDir === e.LEFT &&
              (i <= this._gameeMaxX
                ? (this._gameeMaxX = i)
                : i - this._gameeMaxX > 0.005
                ? ((this._gameeMoveDir = e.NONE), (this._gameeCenterX = i))
                : (i = this._gameeMaxX)),
            (i -= this._gameeCenterX),
            (i *= 10),
            (i = Phaser.Math.clamp(i, -1.25, 1.25)),
            (this._gameeMovementX = i);
        }
      }),
      (a.prototype.onGameeTouchEnd = function (t) {
        (this._gameeMovementX = 0),
          (this._gameeMoveDir = e.NONE),
          (this._gameeTouched = !1);
      }),
      (a.prototype.onGameeTouchCancel = function (t) {
        (this._gameeMovementX = 0), (this._gameeMoveDir = e.NONE);
      }),
      (a.prototype.onGameeTouchLeave = function (t) {
        (this._gameeMovementX = 0), (this._gameeMoveDir = e.NONE);
      }),
      (a.prototype.onGameePause = function () {
        (this._paused = !0), (this.game.paused = !0);
      }),
      (a.prototype.onGameeUnpause = function () {
        (this._paused = !1), (this.game.paused = !1);
      }),
      (a.prototype.onGameeRestart = function () {
        var e = Gamee.Gamee.instance;
        e.gameRunning ||
          ((t.Global.game.paused = !1),
          (this._paused = !1),
          this.reset(),
          Gamee.Gamee.instance.gameStart(),
          Utils.AudioUtils.playSound("Start"));
      }),
      (a.prototype.checkGameRunning = function () {
        var t = Gamee.Gamee.instance;
        t.gameRunning ||
          this._runFromRestart ||
          (t.gameStart(),
          Utils.AudioUtils.playSound("Start"),
          (this._paused = !1));
      }),
      (a.prototype.reset = function () {
        this.camera.focusOnXY(0, -320),
          this._world.reset(),
          this._clouds.reset(),
          this._hero.clear(),
          this._snowFront.killAllParticles(),
          this._snowFront.prewarm(),
          this._snowBack.killAllParticles(),
          this._snowBack.prewarm(),
          this._heartAchievement.reset(),
          this._boostEmitter.killAllParticles(),
          (this._gameOver = !1),
          this._difficulty.reset(),
          (this._gameTime = 0),
          (this._lastTimeStep = 0),
          (this._scrollSpeed = 0),
          (this._score = 0),
          (this._hearts = 0),
          t.Global.GAMEE && (window.gamee.score = 0),
          (this._gameeMovementX = 0),
          (this._gameeTouched = !1);
      }),
      (a.prototype.update = function () {
        if ((this._clouds.tick(), this._world.movePicks(), !this._gameOver)) {
          var e = this._hero.body;
          e.velocity.y < t.Gameplay.HERO_SNOWFLAKE_JUMP_VELOCITY &&
            (this._boostEmitter.emitAt(
              this._hero.x - 15 * this._hero.scale.x,
              this._hero.y - 20
            ),
            this._boostEmitter.emitParticle(!0)),
            this._hero.firstMove &&
              this.physics.arcade.collide(this._hero, this._floor),
            this.physics.arcade.overlap(
              this._hero,
              this._world.picksGroup,
              this.pick,
              function () {
                return !0;
              },
              this
            );
          var i = this._cursorKeys.left.isDown ? 1 : 0,
            a = this._cursorKeys.right.isDown ? 1 : 0;
          i + a > 0 && this.checkGameRunning(),
            t.Global.GAMEE &&
              (this._gameeMovementX < 0
                ? (i = -this._gameeMovementX)
                : this._gameeMovementX > 0 && (a = this._gameeMovementX)),
            this._hero.move(i, a),
            this._world.removeOldPicks(this.camera.y),
            this._world.generatePicks(this.camera.y, this._difficulty),
            this._clouds.removeOldClouds(this.camera.y),
            this._clouds.generateClouds(this.camera.y),
            this._snowFront.setEmitAreaY(this.camera.y),
            this._snowBack.setEmitAreaY(this.camera.y),
            this.camera.focusOnXY(
              0,
              Math.min(
                -320,
                this._hero.y,
                this._hero.maxHeight + t.Gameplay.HERO_DEATH_FALL_HEIGHT
              )
            ),
            this._hero.isDead(this.camera.y) &&
              (Utils.AudioUtils.playSound("Death"),
              (this._gameOver = !0),
              this._hero.stop(),
              this.game.time.events.add(
                2e3,
                function () {
                  this._gameOver &&
                    (t.Global.GAMEE
                      ? ((this._runFromRestart = !0),
                        Gamee.Gamee.instance.gameOver())
                      : this.reset());
                },
                this
              )),
            this._gameOver || this._hero.tick(),
            this.moveBg();
        }
      }),
      (a.prototype.pause = function (t) {
        (this._paused = t), (this.world.isPaused = !0);
      }),
      (a.prototype.pick = function (t, e) {
        this._world.onPickCollision(e);
        var i = !1;
        e.heart
          ? (++this._hearts,
            this.addPoint(5),
            (i = this.checkHeartMilestone(this._hearts)),
            Utils.AudioUtils.playSound("Heart"),
            i && Utils.AudioUtils.playSound("Achievement"))
          : (this.addPoint(1), Utils.AudioUtils.playSound("Pick")),
          this._hero.jumpOnPick(e.heart, i);
      }),
      (a.prototype.checkHeartMilestone = function (t) {
        for (var e = 0; e < a.HEART_MILESTONES.length; e++)
          if (t === a.HEART_MILESTONES[e])
            return this._heartAchievement.fire(a.HEART_IMAGES[e]), !0;
        return !1;
      }),
      (a.prototype.moveBg = function () {
        var e = this.camera.y - this.game.height;
        (e -= this._hero.y * t.Gameplay.BG_SCROLL_SPEED),
          this._bg.position.set(-this.game.width / 2, e);
      }),
      (a.prototype.addPoint = function (e) {
        (this._score += e),
          t.Global.GAMEE && (Gamee.Gamee.instance.score = this._score);
      }),
      (a.prototype.shutdown = function () {}),
      (a.BOOST_PARTICLES_MAX = 50),
      (a.HEART_MILESTONES = [10, 25, 50]),
      (a.HEART_IMAGES = ["10", "25", "50"]),
      a
    );
  })(Phaser.State);
  t.Play = i;
})(Snowflakes || (Snowflakes = {}));
var Snowflakes;
!(function (t) {
  var e = (function (e) {
    function i() {
      e.call(this), (this._ready = !1);
    }
    return (
      __extends(i, e),
      (i.prototype.preload = function () {
        var t = "assets/";
        this.load.audio("SFX", ["assets/sfx.ogg", "assets/sfx.m4a"]),
          this.load.image("Bg", t + "bg.png"),
          this.load.atlas("Sprites", t + "Sprites.png", t + "Sprites.json"),
          this.load.json("Config", t + "config.json");
      }),
      (i.prototype.loadUpdate = function () {
        this.setLoadingText(this.load.progress);
      }),
      (i.prototype.create = function () {
        this.readConfig();
        var t = this.add.audio("SFX");
        Utils.AudioUtils.setSounds(t), (t.allowMultiple = !0);
        var e = 0;
        this.game.device.ie && this.game.device.ieVersion <= 10
          ? (e = 0.02)
          : this.game.device.iOS && (e = 0.1),
          t.addMarker("Start", 0, 0.835),
          t.addMarker("Jump", 2 - e, 0.7622 + e),
          t.addMarker("Pick", 4 - e, 0.3646 + e),
          t.addMarker("Heart", 6 - e, 0.7396 + e),
          t.addMarker("Death", 8 - e, 1.8501 + e),
          t.addMarker("Achievement", 11 - e, 1.6879 + e);
      }),
      (i.prototype.readConfig = function () {
        var e = this.game.cache.getJSON("Config");
        void 0 !== e.gravity && (t.Gameplay.GRAVITY = e.gravity),
          void 0 !== e.heroHorizontalVelocity &&
            (t.Gameplay.HERO_HORIZONTAL_VELOCITY = e.heroHorizontalVelocity),
          void 0 !== e.heroFirstJumpVelocity &&
            (t.Gameplay.HERO_FIRST_JUMP_VELOCITY = e.heroFirstJumpVelocity),
          void 0 !== e.heroSnowflakeJumpvelocity &&
            (t.Gameplay.HERO_SNOWFLAKE_JUMP_VELOCITY =
              e.heroSnowflakeJumpvelocity),
          void 0 !== e.heroHeartJumpvelocity &&
            (t.Gameplay.HERO_HEART_JUMP_VELOCITY = e.heroHeartJumpvelocity),
          void 0 !== e.heroMegaHeartJumpvelocity &&
            (t.Gameplay.HERO_MEGA_HEART_JUMP_VELOCITY =
              e.heroMegaHeartJumpvelocity),
          void 0 !== e.heroDeathFallHeight &&
            (t.Gameplay.HERO_DEATH_FALL_HEIGHT = e.heroDeathFallHeight),
          void 0 !== e.pickMinSpaceX &&
            (t.Gameplay.PICK_MIN_SPACE_X = e.pickMinSpaceX),
          void 0 !== e.pickMaxSpaceX &&
            (t.Gameplay.PICK_MAX_SPACE_X = e.pickMaxSpaceX),
          void 0 !== e.pickSpacingXInitial &&
            (t.Gameplay.PICK_SPACING_X_INITIAL = e.pickSpacingXInitial),
          void 0 !== e.pickSpacingXStep &&
            (t.Gameplay.PICK_SPACING_X_STEP = e.pickSpacingXStep),
          void 0 !== e.pickMaxYSpace &&
            (t.Gameplay.PICK_MAX_SPACE_Y = e.pickMaxYSpace),
          void 0 !== e.pickSpacingYInitial &&
            (t.Gameplay.PICK_SPACING_Y_INITIAL = e.pickSpacingYInitial),
          void 0 !== e.pickSpacingYStep &&
            (t.Gameplay.PICK_SPACING_Y_STEP = e.pickSpacingYStep),
          void 0 !== e.pickSpeed && (t.Gameplay.PICK_SPEED = e.pickSpeed),
          void 0 !== e.snowflakeMoveTime &&
            (t.Gameplay.SNOWFLAKE_MOVE_TIME = e.snowflakeMoveTime),
          void 0 !== e.snowflakeMoveDist &&
            (t.Gameplay.SNOWFLAKE_MOVE_DIST = e.snowflakeMoveDist),
          void 0 !== e.bgScrollSpeed &&
            (t.Gameplay.BG_SCROLL_SPEED = e.bgScrollSpeed),
          void 0 !== e.cloudSpeedMin &&
            (t.Gameplay.CLOUD_SPEED_MIN = e.cloudSpeedMin),
          void 0 !== e.cloudSpeedMax &&
            (t.Gameplay.CLOUD_SPEED_MAX = e.cloudSpeedMax),
          void 0 !== e.cloudSpacingYMin &&
            (t.Gameplay.CLOUD_SPACING_Y_MIN = e.cloudSpacingYMin),
          void 0 !== e.cloudSpacingYMax &&
            (t.Gameplay.CLOUD_SPACING_Y_MAX = e.cloudSpacingYMax),
          void 0 !== e.heartCounter &&
            (t.Gameplay.HEART_COUNTER = e.heartCounter);
      }),
      (i.prototype.update = function () {
        this._ready === !1 &&
          ((this._ready = !0),
          this.world.setBounds(-320, -320, 320, 320),
          this.camera.focusOnXY(0, 0),
          this.game.state.start("Play"));
      }),
      (i.prototype.setLoadingText = function (t) {}),
      i
    );
  })(Phaser.State);
  t.Preloader = e;
})(Snowflakes || (Snowflakes = {}));
var Utils;
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.setSounds = function (e) {
        t._sfx = e;
      }),
      (t.playSound = function (e) {
        Snowflakes.Global.soundOn && null !== t._sfx && t._sfx.play(e);
      }),
      (t.addMusic = function (e, i) {
        t._music[e] = i;
      }),
      (t.playMusic = function (e, i) {
        if (
          (void 0 === i && (i = !0),
          t._currentMusic !== e &&
            (null !== t._currentMusic &&
              t._currentMusic.length > 0 &&
              t.stopMusic(),
            e in t._music && Snowflakes.Global.musicOn))
        ) {
          t._currentMusic = e;
          var a = t._music[e];
          (a.loop = i), a.play();
        }
      }),
      (t.stopMusic = function () {
        null !== t._currentMusic &&
          t._currentMusic.length > 0 &&
          (t._music[t._currentMusic].stop(), (t._currentMusic = ""));
      }),
      (t.pauseMusic = function () {
        null !== t._currentMusic &&
          t._currentMusic.length > 0 &&
          t._music[t._currentMusic].pause();
      }),
      (t.resumeMusic = function () {
        null !== t._currentMusic &&
          t._currentMusic.length > 0 &&
          t._music[t._currentMusic].resume();
      }),
      (t._sfx = null),
      (t._music = {}),
      (t._currentMusic = ""),
      t
    );
  })();
  t.AudioUtils = e;
})(Utils || (Utils = {}));
var Utils;
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.supported = function () {
        var t = Snowflakes.Global.game;
        return t.scale.compatibility.supportsFullScreen;
      }),
      (t.isFullscreen = function () {
        return Snowflakes.Global.game.scale.isFullScreen;
      }),
      (t.changeFullscreen = function () {
        var e = Snowflakes.Global.game;
        t._fullscreen
          ? e.scale.stopFullScreen()
          : e.scale.startFullScreen(!1, !1);
      }),
      (t.onEnterFullscreen = function () {
        (t._fullscreen = !0),
          null !== t._listener && t._listener.call(t._listenerContext, !0);
      }),
      (t.onLeaveFullscreen = function () {
        (t._fullscreen = !1),
          null !== t._listener && t._listener.call(t._listenerContext, !1);
      }),
      (t.setListener = function (e, i) {
        (t._listener = e), (t._listenerContext = i);
      }),
      (t.removeListener = function () {
        (t._listener = null), (t._listenerContext = null);
      }),
      (t._fullscreen = !1),
      (t._listener = null),
      (t._listenerContext = null),
      t
    );
  })();
  t.FullscreenUtils = e;
})(Utils || (Utils = {}));
var Utils;
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.ChangeAnimationPhaserJSONData = function (t) {
        (Phaser.AnimationParser.myCallback = t),
          (Phaser.AnimationParser.JSONData = function (t, e) {
            if (e.frames) {
              for (
                var i = new Phaser.FrameData(), a = e.frames, n = 0;
                n < a.length;
                n++
              ) {
                var s = i.addFrame(
                  new Phaser.Frame(
                    n,
                    a[n].frame.x,
                    a[n].frame.y,
                    a[n].frame.w,
                    a[n].frame.h,
                    a[n].filename
                  )
                );
                a[n].trimmed &&
                  s.setTrim(
                    a[n].trimmed,
                    a[n].sourceSize.w,
                    a[n].sourceSize.h,
                    a[n].spriteSourceSize.x,
                    a[n].spriteSourceSize.y,
                    a[n].spriteSourceSize.w,
                    a[n].spriteSourceSize.h
                  ),
                  Phaser.AnimationParser.myCallback(s, a[n]);
              }
              return i;
            }
          });
      }),
      (t.AdjustTweenFunctions = function () {
        (Phaser.TweenManager.prototype.removeFromUpdateQueue = function (t) {
          var e = this._tweens.indexOf(t);
          -1 !== e
            ? this._tweens.splice(e, 1)
            : ((e = this._add.indexOf(t)), -1 !== e && this._add.splice(e, 1));
        }),
          (Phaser.Tween.prototype.stopAndRemoveFromUpdateQueue = function (t) {
            var e = this,
              i = e.stop(t);
            return (
              e.manager.removeFromUpdateQueue(e), (e.pendingDelete = !1), i
            );
          });
      }),
      t
    );
  })();
  t.PhaserUtils = e;
})(Utils || (Utils = {}));
var Utils;
!(function (t) {
  var e = (function () {
    function t() {}
    return t;
  })();
  (t.ScreenMetrics = e),
    (function (t) {
      (t[(t.PORTRAIT = 0)] = "PORTRAIT"), (t[(t.LANDSCAPE = 1)] = "LANDSCAPE");
    })(t.Orientation || (t.Orientation = {}));
  var i = t.Orientation,
    a = (function () {
      function t() {}
      return (
        (t.calculateScreenMetrics = function (t, a, n, s, o) {
          void 0 === n && (n = i.LANDSCAPE);
          var r, l;
          (r = window.innerWidth),
            (l = window.innerHeight),
            (r = Math.min(r, 1.5 * t)),
            (l = Math.min(l, 1.5 * a)),
            ("undefined" == typeof s || "undefined" == typeof o) &&
              (n === i.LANDSCAPE
                ? ((s = Math.round((640 * t) / 640)),
                  (o = Math.round((640 * a) / 640)))
                : ((s = Math.round((640 * t) / 640)),
                  (o = Math.round((640 * a) / 640))));
          var h = (n === i.LANDSCAPE, 1),
            c = r / l,
            u = 0,
            _ = 0,
            p = 0,
            m = 0;
          c > h
            ? ((m = a),
              (p = 2 * Math.ceil((m * c) / 2)),
              (p = Math.min(p, s)),
              (u = (p - t) / 2),
              (_ = 0))
            : ((p = t),
              (m = 2 * Math.ceil(p / c / 2)),
              (m = Math.min(m, o)),
              (u = 0),
              (_ = (m - a) / 2));
          var f = r / p,
            d = l / m;
          return (
            (this.screenMetrics = new e()),
            (this.screenMetrics.windowWidth = r),
            (this.screenMetrics.windowHeight = l),
            (this.screenMetrics.defaultGameWidth = t),
            (this.screenMetrics.defaultGameHeight = a),
            (this.screenMetrics.maxGameWidth = s),
            (this.screenMetrics.maxGameHeight = o),
            (this.screenMetrics.gameWidth = p),
            (this.screenMetrics.gameHeight = m),
            (this.screenMetrics.scaleX = f),
            (this.screenMetrics.scaleY = d),
            (this.screenMetrics.offsetX = u),
            (this.screenMetrics.offsetY = _),
            this.screenMetrics
          );
        }),
        t
      );
    })();
  t.ScreenUtils = a;
})(Utils || (Utils = {}));
var Utils;
!(function (t) {
  var e = (function () {
      function t() {}
      return t;
    })(),
    i = (function () {
      function t() {}
      return (
        (t.save = function () {
          if (t.localStorageSupported()) {
            var i = new e();
            (i.musicOn = Snowflakes.Global.musicOn),
              (i.soundOn = Snowflakes.Global.soundOn),
              (i.currentLanguage = Snowflakes.Global.currentLanguage);
            var a = JSON.stringify(i);
            localStorage.setItem("snowflake_save", a);
          }
        }),
        (t.load = function () {
          if (t.localStorageSupported()) {
            var e = JSON.parse(localStorage.getItem("snowflake_save"));
            return null === e || void 0 === e
              ? !1
              : ((Snowflakes.Global.musicOn = e.musicOn),
                (Snowflakes.Global.soundOn = e.soundOn),
                (Snowflakes.Global.currentLanguage = e.currentLanguage),
                !0);
          }
        }),
        (t.localStorageSupported = function () {
          try {
            return "localStorage" in window && null !== window.localStorage;
          } catch (t) {
            return !1;
          }
        }),
        t
      );
    })();
  t.StorageUtils = i;
})(Utils || (Utils = {}));
var Utils;
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.padNumber = function (t, e, i) {
        void 0 === i && (i = "0");
        var a = t + "";
        return a.length >= e ? a : new Array(e - a.length + 1).join(i) + a;
      }),
      t
    );
  })();
  t.StringUtils = e;
})(Utils || (Utils = {}));
var Utils;
!(function (t) {
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
})(Utils || (Utils = {}));
var Utils;
!(function (t) {
  var e = (function () {
    function t() {}
    return (
      (t.setTexts = function (e) {
        t._texts = e;
      }),
      (t.getText = function (e) {
        if (null === t._texts) return "Texts not set";
        var i = t._texts;
        if (void 0 === i[e]) return "";
        var a = i[e][Snowflakes.Global.currentLanguage];
        return (
          void 0 === a &&
            ((Snowflakes.Global.currentLanguage = "en"),
            (a = i[e][Snowflakes.Global.currentLanguage])),
          a
        );
      }),
      (t.game = null),
      (t._texts = null),
      t
    );
  })();
  t.TextUtils = e;
})(Utils || (Utils = {}));
