(function () {
	var BulletClass = function ()
	{
		var _self = this,
			_events = {};

    
		_self.on = function (event, fn, once)
		{
			if (arguments.length < 2 ||
				typeof event !== "string" ||
				typeof fn !== "function") return;

			var fnString = fn.toString();

			// if the named event object already exists in the dictionary...
			if (typeof _events[event] !== "undefined")
			{
				// add a callback object to the named event object if one doesn't already exist.
				if (typeof _events[event].callbacks[fnString] === "undefined")
				{
					_events[event].callbacks[fnString] = {
						cb : fn,
						once : !!once
					};
				}
				else if (typeof once === "boolean")
				{
					// the function already exists, so update it's 'once' value.
					_events[event].callbacks[fnString].once = once;
				}
			}
			else
			{
				// create a new event object in the dictionary with the specified name and callback.
				_events[event] = {
					callbacks : {}
				};

				_events[event].callbacks[fnString] = {cb : fn, once : !!once};
			}
		};

		_self.once = function (event, fn)
		{
			_self.on(event, fn, true);
		};

		_self.off = function (event, fn)
		{
			if (typeof event !== "string" ||
				typeof _events[event] === "undefined") return;

			// remove just the function, if passed as a parameter and in the dictionary.
			if (typeof fn === "function")
			{
				var fnString = fn.toString(),
					fnToRemove = _events[event].callbacks[fnString];

				if (typeof fnToRemove !== "undefined")
				{
					// delete the callback object from the dictionary.
					delete _events[event].callbacks[fnString];
				}
			}
			else
			{
				// delete all functions in the dictionary that are
				// registered to this event by deleting the named event object.
				delete _events[event];
			}
		};

		_self.trigger = function (event, data)
		{
			if (typeof event !== "string" ||
				typeof _events[event] === "undefined") return;

			for (var fnString in _events[event].callbacks)
			{
				var callbackObject = _events[event].callbacks[fnString];

				if (typeof callbackObject.cb === "function") callbackObject.cb(data);
				if (typeof callbackObject.once === "boolean" && callbackObject.once === true) _self.off(event, callbackObject.cb);
			}
		};

	};

	// check for AMD/Module support, otherwise define Bullet as a global variable.
	if (typeof define !== "undefined" && define.amd)
	{
		// AMD. Register as an anonymous module.
		define (function()
		{
			"use strict";
			return new BulletClass();
		});

	}
	else if (typeof module !== "undefined" && module.exports)
	{
		module.exports = new BulletClass();
	}
	else
	{
		window.Bullet = new BulletClass();
	}
	
})();
//
// Wrappers for `$pandaNative` object on diferent platforms which
// directly communicates with the GameeApp.
//
// Games should not used this object, it exists only for internal use
// for the public `gamee` object.
(function(global) {
	'use strict';
	
	//
	// ## $pandaNative
	//
	// Basic `$pandaNative` interface
	var pandaNative = {
			/** ### updateScore
			 * Update score.
			 *
			 * @param {String} score
			 */ 
			updateScore: function(score) {},

			/** ### requestController
			 * Request controller.
			 *
			 * *see also 
			 * [gamee.controller.requestController](controller.js.html#requestcontroller)*
			 * @param {String} type
			 */
			requestController: function(type) {},

			/** ### additionalController
			 * Request additional controller (for desktop).
			 *
			 * *see also 
			 * [gamee.controller.additionalController](controller.js.html#additionalcontroller)*
			 *
			 * @param {String} type type of controller 			 
			 */
			additionalController: function(type) {},

			/** ### gameOver
			 * Game over.
			 *
			 * *see also
			 * [gamee.gameOver](gamee.js.html#gamee.gameover)
			 */
			gameOver: function() {},

			/** ### gameStart
			 * Game start.
			 *
			 * *see also
			 * [gamee.gameStart](gamee.js.html#gamee.gamestart)
			 */ 
			gameStart: function() {},

			gameLoaded: function() {},

			type: 'no-gamee'
		},

		/* current user agent */
		userAgent = navigator.userAgent.toLowerCase();
		
		/**
		 * Gamee Mobile App 
		 */
		function gameeMobile(pandaNative) {
			pandaNative.updateScore = function(score) {
				window.location.href = "panda://score/" + score;
			};

			pandaNative.requestController = function(type) {
				window.location.href = "panda://request-controller/" + type;
			};

			pandaNative.gameOver = function() {
				window.location.href = "panda://game-over";
			};

			pandaNative.gameStart = function() {
				window.location.href = "panda://game-start";
			};

			pandaNative.gameLoaded = function() {
				window.location.href = "panda://game-loaded";
			};

			pandaNative.type = 'gamee-mobile';
		}

		/**
		 * Gamee simulator and validator
		 */
		function gameeSimulator(pandaNative) {
			var simulator = window.parent.gameeSimulator;

			pandaNative.updateScore = function(score) {
				simulator.updateScore(score);
			};

			pandaNative.requestController = function(type) {
				simulator.requestController(type);
			};

			pandaNative.gameOver = function() {
				simulator.gameOver();
			};

			pandaNative.gameStart = function() {
				simulator.gameStart();
			};

			pandaNative.gameLoaded = function() {
				simulator.gameLoaded();
			};

			pandaNative.type = 'gamee-simulator';
		}

		/**
		 * Gamee Web App
		 */
		function gameeWeb(pandaNative) {
			var gamee = window.parent;

			pandaNative.updateScore = function(score) {
				gamee.postMessage(["score", score], '*');
			};

			pandaNative.requestController = function(type) {
				gamee.postMessage(['request-controller', type], '*');
			};

			pandaNative.additionalController = function(type) {
				gamee.postMessage(['additional-controller', type], '*');
			};

			pandaNative.gameOver = function() {
				gamee.postMessage(['game-over'], '*');
			};

			pandaNative.gameStart = function() {
				gamee.postMessage(['game-start'], '*');
			};

			pandaNative.gamePaused = function() {
				gamee.postMessage(['game-paused'], '*');
			};

			pandaNative.gameLoaded = function() {
				gamee.postMessage(['game-loaded'], '*');
			};

			pandaNative.type = 'gamee-web';
		}
    
    

	// user agent is use to determine current enviroment
	if (/iphone|ipod|ipad|android/.test(userAgent)) {    
           if(window.self !== window.top) {
               gameeWeb(pandaNative);  
           } else {
               gameeMobile(pandaNative);
           }
    } else if (/gamee\/[0-9\.]+$/.test(userAgent)) {
        gameeMobile(pandaNative);  
    } else if (window.parent) {
        gameeWeb(pandaNative);    
    } else if (window.parent && window.parent.gameeSimulator) {
		gameeSimulator(pandaNative);    
    } else {
		console.error('No gamee enviroment matched');
	}

	// export to global scope
	global.$pandaNative = pandaNative;
}(this));

// # Gamee.js
// 
// This file defines and expose a public API for games to communicate
// with Gamee*.
//
// Also it handles some requirements when Gamee is run in an desktop 
// environment.
//
// \* _later in the document Gamee will be referred as GameeApp to not
// be mistaken for word game_
//
// ** _GameeWebApp will refer to Gamee which is running in a desktop 
// browser_
var gamee = function(global) {
	'use strict';

	/** internal state of the game score */
	var score;

	/** an empty function */
	var noop = function() {};

	/** ## gamee
	 *
	 * GameeApp interface for games. It is exposed as a `gamee` global
	 * object and games should only use its public methods and 
	 * properties to communicate with the GameeApp. 
	 *
	 * _There is also [$pandaNative](gamee_native.js.html) global object 
	 * which handles internal parts of the communication._
	 */
	var gamee = {};

	// 
	// ## Signaling game state 
	// 
	// The game should signal the GameeApp its status (playing/game-over)
	// and current score.
	//

	/** ### gamee.score
	 * 
	 * Set or get the game score and update the score in the GameeApp.
	 * 
	 * ```javascript
	 * gamee.score = gamee.score + 1;
	 * ```
	 */
	Object.defineProperty(gamee, 'score', {
		get: function() {
			return score;
		},

		set: function(newScore) {
			score = newScore;

			global.$pandaNative.updateScore(score);
			console.log("score3",score)
			var tmp=""
			tmp +=  score 
			$("#score").html(tmp)
		}
	});

	/** ### gamee.gameOver
	 * 
	 * Indicate that game has ended to GameeApp. GameeApp will take the 
	 * focus and the game has to wait for `onRestart` or `onStop` 
	 * callbacks.
	 */
	gamee.gameOver = function() {
		global.$pandaNative.gameOver();
		console.log("gameover")
		$("#success").trigger("click");
	};

	/** ### gamee.gameStart
	 *
	 * Indicate that player has started the game (even after restart).
	 */
	gamee.gameStart = function() {
		global.$pandaNative.gameStart();
	};

	/** ### gamee.gameLoaded
	 *
	 * Indicate that the game has loaded
	 */
	gamee.gameLoaded = function() {
		global.$pandaNative.gameLoaded();
	};

	// ## Controller
	//
	// To keep it light controller code is in [controller.js](controller.js.html)

	/** ### gamee.requestController
	 *
	 * See [controller.js#requestController](controller.js.html#requestcontroller)
	 */

	//
	// ## Callbacks - handling user action
	//
	// To handle signals from GameeApp you have to assinge callbacks to 
	// `gamee` object to react on user actions from GameeApp (outside the
	// game's webview/iframe).
	//
	// From the GameeApp user can
	//
	// * pause the game 
	// * resume the game after pause
	// * restart the game after game has ended with `gamee.gameOver()` call
	// * mute the game
	//
	// ```javascript
	// gamee.onPause = function() { 
	//   myGame.setState('pause'); 
	//   myGame.update();
	// }
	// ```

	/** ### gamee.onPause
	 *
	 * Will be called when user paused the game
	 */
	gamee.onPause   = noop;

	/** ### gamee.onStop
	 *
	 * Will be called when the user has closed the game
	 */
	gamee.onStop    = noop;

	/** ### gamee.onRestart
	 *
	 * Will be called when user will return the game after 
	 * `gamee.gameOver()` was called
	 */
	gamee.onRestart = noop;

	/** ### gamee.onMute
	 *
	 * Will be called when user clicks the mute button and the game should
	 * mute all game sounds.
	 */
	gamee.onMute    = noop;

	/** ### gamee.onUnmute
	 *
	 * Will be called when user clicks the unmute button and the game 
	 * should unmute all game sounds.
	 */
	gamee.onUnmute    = noop;

	/**
	 * *gamee.onUnpause*
	 *
	 * ***deprecated***
	 *
	 * for backward compatibility, use [onResume](#gamee.onresume) instead
	 */
	gamee.onUnpause = noop;

	/** ### gamee.onResume
	 * 
	 * Will be called after user resumes the game after pause or GameeApp
	 * suspension
	 */
	gamee.onResume = function() {
		gamee.onUnpause();
	};

	// 
	// ## Private methods
	//
	// These methods are only for internal use, should be avoided in games,
	// but it can be helpful for debugging.

	/** ### gamee._keydown
	 * 
	 * A helper function to listen for `keydown` events on window object.
	 * 
	 * @param {Function} fn callback to handle the event
	 */
	gamee._keydown = function(fn) {
		addDOMEvent(global, 'keydown', wrapKeyEvent(fn));
	};

	/** ### gamee._keyup
	 * 
	 * A helper function to listen for `keyup` events on window object.
	 * 
	 * @param {Function} fn callback to handle the event
	 */
	gamee._keyup = function(fn) {
		addDOMEvent(global, 'keyup', wrapKeyEvent(fn));	
	};

	// 
	// ## Private functions
	// 
	// These are internal helper functions in closed scope. Good to know
	// about them when debugging.
	
	/** ### addDOMEvent
	 * 
	 * Add an event listener for a DOM event
	 *
	 * @param {EventTarget} target an object to listen for a DOM event on
	 * @param {String} event event name
	 * @param {Function} fn callback to handle the event
	 */
	function addDOMEvent(target, event, fn) {
 		if (target.addEventListener) {
			target.addEventListener(event, fn, false);

		} else if (target.attachEvent) {
			target.attachEvent('on' + event, fn);
		}
	}

	/** ### removeDOMEvent
	 * 
	 * Remove an event listener for a DOM event
	 *
	 * @param {EventTarget} target an object to listen for a DOM event on
	 * @param {String} event event name
	 * @param {Function} fn callback to remove
	 */
	function removeDOMEvent(target, event, fn) {
		if (target.removeEventListener) {
			target.removeEventListener(event, fn, false);

		} else if (target.detachEvent) {
			target.detachEvent('on' + event, fn);
		}
	}

	/** ### wrapKeyEvent 
	 * 
	 * Handle old IE event differences for key events
	 * 
	 * @param {Function} fn callback
	 */
	function wrapKeyEvent(fn) {
		return function(ev) {
			if (!ev || !ev.keyCode) {
				if (!ev) {
					ev = window.event;
				}

				if (ev.which) {
					ev.keyCode = ev.which;
				}
			}

			return fn(ev);
		};
	}


	// 
	// ## Gamee Web App
	// 
	// gamee.js handles also some specific requirements for the GameeWebApp

	if (global.$pandaNative.type === 'gamee-web') {

		// 
		// ### Key binding
		//
		// For user comfort the web app interface requires to react on 
		// certain keys within the game and the game should not override
		// them.
		//
		// * 'p' - for pause
		// * 'r' - for restart
		// 
		gamee._keydown(function(ev) {
			switch(ev.keyCode) {
				case 80:  // p for pause
					gamee.onPause();
					$pandaNative.gamePaused();
					break;

				case 82: // r for restart
					gamee.onRestart();
					break;
			}
		});

		//
		// ### Interframe communication 
		// 
		// In the GameeWebApp games are inside iframe and are hosted on
		// different domains, therefor `postMessage`/ `on('message')` 
		// is used. This handles the callbacks send from the GameeApp.
		//
		// [More about *postMessage*](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
		addDOMEvent(global, 'message', function(ev) {
			switch(ev.data[0]) {
				case 'pause': 
					gamee.onPause();
					break;

				case 'resume':
					gamee.onResume();
					break;

				case 'restart':
					// after restart we have to steal the focus from parent frame
					window.focus(); 
					gamee.onRestart();
					break;

				case 'mute':
					gamee.onMute();
					break;

				case 'button_button_down':
					gamee.controller.trigger("keydown", {button : "button"});
					break;

				case 'button_button_up':
					gamee.controller.trigger("keyup", {button : "button"});
					break;

				case 'button_left_up':
					gamee.controller.trigger("keyup", {button : "left"});
					break;

				case 'button_left_down':
					gamee.controller.trigger("keydown", {button : "left"});
					break;

				case 'button_right_down':
					gamee.controller.trigger("keydown", {button : "right"});
					break;

				case 'button_right_up':
					gamee.controller.trigger("keyup", {button : "right"});
					break;

				case 'button_up_down':
					gamee.controller.trigger("keydown", {button : "up"});
					break;

				case 'button_up_up':
					gamee.controller.trigger("keyup", {button : "up"});
					break;

				case 'button_down_down':
					gamee.controller.trigger("keydown", {button : "down"});
					break;

				case 'button_down_up':
					gamee.controller.trigger("keyup", {button : "down"});
					break;

				case 'button_a_down':
					gamee.controller.trigger("keydown", {button : "A"});
					break;

				case 'button_a_up':
					gamee.controller.trigger("keyup", {button : "A"});
					break;


				case 'button_b_down':
					gamee.controller.trigger("keydown", {button : "B"});
					break;

				case 'button_b_up':
					gamee.controller.trigger("keyup", {button : "B"});
					break;

				default:
					throw Error('Unknown message');
			}
		});
	}
	
	return gamee;
}(this);

// 
// Controller for ``gamee``
//
(function(global, gamee) {
	'use strict';

	/** ## Bullet 
	 *
	 * [Bullet.js](https://github.com/munkychop/bullet) is used as pub/sub
	 * library. 
	 * 
	 * The controller and its buttons are instance of Bullet.
	 */
	var BulletClass = Bullet.constructor;

	//
	// ## gamee.controller
	//
	// Namespace where the methods for controller are published.
	// 
	gamee.controller = {
		/** ### requestController
		 *
		 * Factory method to create a controller. It creates the controller
		 * and signals to GameeApp which type the game requires
		 *
		 * You should called this method once before calling
		 * `gamee.gameStart()`.
		 *
		 * @param {String} type type of controller (see [controllerTypes](#controllertypes))
		 * @param {Object} [opts] optional controller options 
		 * {'enableKeyboard': .., 'buttons': ...}
		 * @param {boolean} [opts.enableKeyboard] enable the keyboard
		 * @param {Object} [opts.buttons] remap buttons {'oldKey': 'newKey', 
		 * 'left': 'break' ..}
		 */
		requestController: function (type, opts) {
			var controller = createController(type, opts);

			global.$pandaNative.requestController(type);
			mainController = controller;
			
			return controller;
		},

		/** ### additionalController
		 * 
		 * Construct an additional controller. Sometimes games require a
		 * different controller depending on platform (eg. touch on mobile, 
		 e but Four Buttons on desktop)
		 *
		 * **This is currently supported only for GameeWebApp** as a way to 
		 * have alternate keybinding. The game should request a type used 
		 * for mobile platform and then some other as *additionalController*
		 * if alternate keybinding is needed;
		 */
		additionalController: function(type, opts) {
			var controller = createController(type, opts);
			global.$pandaNative.additionalController(type);

			return controller;
		},

		/** ### trigger
		 * 
		 * Triggers and event for the controller
		 *
		 * This is called by GameeApp to trigger the *keydown*, *keyup*
		 * events. For more info see [Controller](#controller)
		 * 
		 * @param {String} eventName name of the event
		 * @param {*} [data,...] data to pass for the event
		 *
		 */
		trigger: function() {
			var i;

			if (mainController) {
				mainController.trigger.apply(mainController, arguments); 
			} else {
				throw new Error('No controller present');
			}
		}
	};


	/** ## Button
	 *
	 * Represenation of a controller button. It is a child of 
	 * [Bullet](https://github.com/munkychop/bullet), so you can
	 * subscribe for events triggered on it. 
	 *
	 * @param {String} key name of the button
	 * @param {Number} keyCode keycode for the key to represent the button
	 * on keyboard
	 */
	function Button(key, keyCode) {
		var self = this;

		BulletClass.call(this);

		this._pressed = false;

		this.key = key;
		this.keyCode = keyCode;

		this.on('keydown', function() {
			self._pressed = true;
		});

		this.on('keyup', function() {
			self._pressed = false;
		});
	}

	Button.prototype = Object.create(BulletClass.constructor.prototype);
	Button.constructor = Button;

	Button.prototype.resetPressed = function() {
		this._pressed = false;
	};

	/** ### isDown
	 * 
	 * Ask if the button is currently pressed.
	 *
	 * @return {Boolean} true if the button is currently pressed
	 */
	Button.prototype.isDown = function() {
		return this._pressed;
	};

	/** ## Controller
	 * 
	 * Controller has a collection of [buttons](#buttons).
	 * It is a child of 
	 * [Bullet](https://github.com/munkychop/bullet), so you can 
	 * subscribe for events triggered on it. 
	 *
	 * Controllers will get all the events for its buttons so you can
	 * listen for them globaly from controller or individualy on every
	 * button.
	 *
	 * ```javascript
	 * controller.on('keydown', function(data) {
	 *   console.log('button ' + data.button + ' is pressed');
	 * });
	 *
	 * controller.buttons.left.on('keydown', function() {
	 *   console.log('button left is pressed');
	 * });
	 * ```
	 */ 
	function Controller() {
		var self = this;

		BulletClass.call(this);

		// ### buttons
		//
		// Map of controller's [buttons](#button) by their name.
		//
		// ```javascript
		// controller.buttons.left // Button('left', ..)
		// ```
		this.buttons = {};

		// ### buttonAlias
		//
		// Map of remapped buttons.
		//
		// *see [remapButton](#remapbutton) for more info*
		//
		this.buttonAlias = {};

		// Events prefixed with *$* are private, sent from GameeApp ment
		// to be handled before resended as *public (non-prefixed)* 
		// event.
		//
		// They should be not used in games as they can change in the future.
		this.on('$keydown', function(data) {
			if (data.button && self.buttonAlias[data.button]) {
				data.button = self.buttonAlias[data.button];
			}

			self.trigger('keydown', data);
		});

		this.on('$keyup', function(data) {
			if (data.button && self.buttonAlias[data.button]) {
				data.button = self.buttonAlias[data.button];
			}

			self.trigger('keyup', data);
		});

	 	// By default GameeApp will trigger *keydown* and *keyup* events for
		// the controller for every button presses/released.
		// 
		// The controller then handles the event and triggers the event for
		// the coresponding button.
		// 
		// It expexts a `data` argument which should have a property `button`
		// with the name of button.
		this.on('keydown', function(data) {
			if (!data.button || !self.buttons[data.button]) {
				return;
			}

			self.buttons[data.button].trigger('keydown');
		});

		this.on('keyup', function(data) {
			if (!data.button || !self.buttons[data.button]) {
				return;
			}

			self.buttons[data.button].trigger('keyup');
		});
	}

	Controller.prototype = Object.create(BulletClass.constructor.prototype);
	Controller.constructor = Controller;

	/** ### addButton
	 *
	 * Add button to the controller.
	 * 
	 * @param {Button} button a [Button](#button) instance
	 */
	Controller.prototype.addButton = function(button) {
		this.buttons[button.key] = button;
	};

	/** ### enableKeyboard
	 * 
	 * Enable keyboard controlls. It will attach event listeners to the 
	 * *window* object for every button and trigger their *keydown* /
	 * *keyup* event for the controller.
	 */
	Controller.prototype.enableKeyboard = function() {
		var key, button, keyCodes = {}, self = this;

		for (key in this.buttons) {
			button = this.buttons[key];

			if (button.keyCode) {
				keyCodes[button.keyCode] = button;
			}
		}

		gamee._keydown(function(ev) {
			var button = keyCodes[ev.keyCode];

			if (!button) {
				return;
			}

			ev.preventDefault();
			self.trigger('keydown', {button: button.key});
		});
		
		gamee._keyup(function(ev) {
			var button = keyCodes[ev.keyCode];

			if (!button) {
				return;
			}

			ev.preventDefault();
			self.trigger('keyup', {button: button.key});
		});
	};

	/** ### remapButton
	 * 
	 * Remap the names of the controller's buttons. Controllers have their
	 * button names set (left, right, A, B), but sometimes in context of 
	 * the game a different names are desired.
	 *
	 * ```javascript
	 * var controller = gamee.controller.requestController('TwoButtons');
	 * controller.remapButton('left', 'throttle');
	 * controller.remapButton('right', 'break');
	 * 
	 * controller.buttons.throttle.on('keydown', ..);
	 * ```
	 *
	 * @param {String} oldName button name we want to change
	 * @param {String} newName new button name
	 */
	Controller.prototype.remapButton = function(oldName, newName) {
		
		// handle old code
		if (newName.name) {
			newName = newName.name;
		}

		if (this.buttons[oldName]) {
			this.buttonAlias[oldName] = newName.name;
			
			this.buttons[newName.name] = this.buttons[oldName];

			delete this.buttons[oldName];
		} else {
			throw Error('Button ' + oldName + ' was not found in controller');
		}
	};

	// ## Controllers 

	/** ### OneButtonController
	 *
	 * Controller with only one button.
	 */
	function OneButtonController() {
		Controller.call(this);

		// * __name__: 'button' 
		// * __key__: spacebar
		this.addButton(new Button('button', 32)); 
	}
	OneButtonController.prototype = Object.create(Controller.prototype);
	OneButtonController.prototype.constructor = OneButtonController;


	/** ### TwoButtonController
	 *
	 * Controller with two buttons
	 */
	function TwoButtonController() {
		Controller.call(this);

		// * __name__: 'left'
		// * __key__: left arrow
		this.addButton(new Button('left', 37)); 

		// * __name__: 'right'
		// * __key__: righ arrow
		this.addButton(new Button('right', 39));
	}
	TwoButtonController.prototype = Object.create(Controller.prototype);
	TwoButtonController.prototype.constructor = TwoButtonController;


	/** ### FourButtonController
	 *
	 * Controller with four buttons
	 */
	function FourButtonController() {
		Controller.call(this);

		// * __name__: 'up'
		// * __key__: left arrow
		this.addButton(new Button('up', 38));

		// * __name__: 'left'
		// * __key__: left arrow
		this.addButton(new Button('left', 37));  

		
		// * __name__: 'right'
		// * __key__: righ arrow
		this.addButton(new Button('right', 39)); 

		// * __name__: 'A'
		// * __key__: spacebar
		this.addButton(new Button('A', 32));     
	}
	FourButtonController.prototype = Object.create(Controller.prototype);
	FourButtonController.prototype.constructor = FourButtonController;

	/** ### FiveButtonController
	 *
	 * Controller with five buttons
	 */
	function FiveButtonController() {
		Controller.call(this);

		// * __name__: 'up'
		// * __key__: left arrow
		this.addButton(new Button('up', 38));

		// * __name__: 'left'
		// * __key__: left arrow
		this.addButton(new Button('left', 37));  

		
		// * __name__: 'right'
		// * __key__: righ arrow
		this.addButton(new Button('right', 39)); 

		// * __name__: 'down'
		// * __key__: down arrow
		this.addButton(new Button('down', 40));  

		// * __name__: 'A'
		// * __key__: spacebar
		this.addButton(new Button('A', 32));     
	}
	FiveButtonController.prototype = Object.create(Controller.prototype);
	FiveButtonController.prototype.constructor = FiveButtonController;

	/** ### SixButtonController
	 *
	 * Controller with six buttons
	 */
	function SixButtonController() {
		Controller.call(this);

		// * __name__: 'up'
		// * __key__: left arrow
		this.addButton(new Button('up', 38));

		// * __name__: 'left'
		// * __key__: left arrow
		this.addButton(new Button('left', 37));  

		
		// * __name__: 'right'
		// * __key__: righ arrow
		this.addButton(new Button('right', 39)); 

		// * __name__: 'down'
		// * __key__: down arrow
		this.addButton(new Button('down', 40));  

		// * __name__: 'A'
		// * __key__: spacebar
		this.addButton(new Button('A', 32));     

		// * __name__: 'B'
		// * __key__: ctrl
		this.addButton(new Button('B', 17));
	}
	SixButtonController.prototype = Object.create(Controller.prototype);
	SixButtonController.prototype.constructor = SixButtonController;

	/** ### FourArrowController 
	 *
	 * Controller with four arrow buttons
	 */
	function FourArrowController() {
		Controller.call(this);

		// * __name__: 'up'
		// * __key__: left arrow
		this.addButton(new Button('up', 38));

		// * __name__: 'left'
		// * __key__: left arrow
		this.addButton(new Button('left', 37));  

		
		// * __name__: 'right'
		// * __key__: righ arrow
		this.addButton(new Button('right', 39)); 

		// * __name__: 'down'
		// * __key__: down arrow
		this.addButton(new Button('down', 40));  
	}
	FourArrowController.prototype = Object.create(Controller.prototype);
	FourArrowController.prototype.constructor = FourArrowController;

	/** ### TouchController 
	 *
	 * This controller has no buttons. Instead it has a touchpad which
	 * triggers *touchstart*, *touchend*, *touchmove*, *touchcancel*,
	 * *touchend* events (similar to 
	 * [Touch event types](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent#Touch_event_types))
	 *
	 * The position of the touch is in the `data.position` argument as a 
	 * *x* and *y* with the values between [0, 0] for the left top corner
	 * and [1, 1] for the bottom right corner ([0.5, 0.5] is the center).
	 *
	 * ```javascript
	 * controller = gamee.controller.requestController('Touch');
	 *
	 * controller.on('touchstart', function(data) {
	 *	if (data.position.x < 0.5 && data.position.y < 0.5) {
	 *    console.log('touch in the top left quadrant');
	 *  }
	 * })
	 * ```
	 */
	function TouchController() {
		var self = this;

		Controller.call(this);

		this.on("$touchstart", function(data) {
			self.trigger('touchstart', data);
		});

		this.on("$touchend", function(data) {
			self.trigger('touchend', data);
		});

		this.on("$touchmove", function(data) {
			self.trigger('touchmove', data);
		});

		this.on("$touchleave", function(data) {
			self.trigger('touchleave', data);
		});

		this.on("$touchcancel", function(data) {
			self.trigger('touchcancel', data);
		});
	}
	TouchController.prototype = Object.create(TouchController.prototype);
	TouchController.prototype.constructor = TouchController;

	/** ### JoystickController 
	 *
	 * JoystickController emits `change` event, after the position of the 
	 * joystick is changed. 
	 *
	 * The position of the joystick is in the property `x` and `y`. The 
	 * position on axis is between <-1, 1> (for x -1 is max left 
	 * position, 1 max right position). [0.0, 0.0] is the center.
	 *
	 * ```javascript
	 * joystick = gamee.controller.requestController('Joystick');
	 *
	 * joystick.on('change', function() {
	 *   new_x = joystick.x;
	 *   nex_y = joystick.y;
	 * })
	 * ```
	 */
	function JoystickController() {
		var self = this;

		Controller.call(this);
	
		// x axis
		this.x = 0;
		// y axis
		this.y = 0;

		this.on("$change", function(data) {
			self.x = data.position.x;
			self.y = data.position.y;

			self.trigger("change", data);
		});
	}
	JoystickController.prototype = Object.create(Controller.prototype);
	JoystickController.prototype.constructor = JoystickController;

	/** ### JoystickButtonController 
	 *
	 * JoystickButtonController is a `JoystickController` with one button.
	 *
	 * ```javascript
	 * joystick = gamee.controller.requestController('JoystickWithButton');
	 *
	 * joystick.on('change', function() {
	 *   new_x = joystick.x;
	 *   nex_y = joystick.y;
	 * })
	 *
	 * joystick.buttons.button.on('keydown', callback)
	 * // or simply
	 * joystick.on('keydown', callback)
	 * ```
	 */
	function JoystickButtonController() {
		var self = this;

		JoystickController.call(this);

		// * __name__: 'button' 
		// * __key__: spacebar
		this.addButton(new Button('button', 32)); 
	}
	JoystickButtonController.prototype = Object.create(JoystickController.prototype);
	JoystickButtonController.prototype.constructor = JoystickButtonController;

	//
	// ## Private objects and methods
	// These are internal objects in closed scope. Good to know about them
	// when debugging.


	/** ### createController
	 * 
	 * Function to create a controller.
	 *
	 * *see [requestController](#requestcontroller)
	 *
	 * @param {String} type
	 * @param {Object} [opts]
	 * @returns {Controller} controller
	 */
	function createController(type, opts) {
		var btn, controller;

		if (!controllerTypes[type]) {
			throw new Error('Unsupported controller type, ' + type);
		}

		opts = opts || {};

		controller = new controllerTypes[type]();

		if (opts.enableKeyboard) {
			controller.enableKeyboard();
		}

		if (opts.buttons) {
			for (btn in opts.buttons) {
				controller.remapButton(btn, opts.buttons[btn]);
			}
		}

		return controller;
	}


	/** ### mainController
	 * 
	 * Current controller.
	 */
	var mainController; 

	/** ### controllerTypes
	 *
	 * List of controller types and their coresponding classes.
	 *
	 * *see [Controllers](#controllers) for more info*
	 */
	var controllerTypes = {
		'OneButton': OneButtonController,
		'TwoButtons': TwoButtonController,
		'FourButtons': FourButtonController,
		'FiveButtons': FiveButtonController,
		'SixButtons': SixButtonController,
		'FourArrows': FourArrowController,
		'Touch': TouchController,
		'Joystick': JoystickController,
		'JoystickWithButton': JoystickButtonController
	};
}(this, gamee));
