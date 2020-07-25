window.minigame = window.minigame || {}

function startGame(){
	
	console.log('gamee init')
    
    var capabilities = ["saveState", "socialData"]
	gamee.gameInit("FullScreen", {}, capabilities, function(error, data) {
		if(error !== null)
			throw error;
		
		var hasSound = data.sound;
		sound.setSound(hasSound)
        
        //var socialData = data.socialData;
        console.log(data)
        
        console.log(data.saveState + ' addTutorial')
        sceneloader.setTutorial(data.saveState)
	});
		
	window.game = new Phaser.Game(document.body.clientWidth, document.body.clientHeight, Phaser.CANVAS, null, {init: init, create: create }, false, true);
    document.body.style.visibility = "hidden"
	
	function preloadScenes(sceneList){
		
		var gameReady = false
		
    	function onCompletePreloading(){

			function onLoadFile(event){
	    		var loaderScene = sceneloader.getScene("preloaderIntro")
	    		loaderScene.updateLoadingBar(event.totalLoaded, event.totalFiles)
	    	}

	    	function onCompleteSceneLoading(){

				runGame()
	    	}
			
			function runGame(){
				
				gamee.gameReady()
				sceneloader.show("gameScene")
			}
			
	      	sceneloader.preload(sceneList, {onLoadFile: onLoadFile, onComplete: onCompleteSceneLoading})
            sceneloader.show("preloaderIntro")
			
    	}

        document.body.style.visibility = "visible"
    	sceneloader.preload([preloaderIntro], {onComplete: onCompletePreloading})
		//social.socialRequest()
	}

    function init(){

        var fullWidth = 540
        var fullHeight = 960

        var ratio = document.body.clientWidth / document.body.clientHeight
        var gameHeight = Math.round(fullHeight)
        var gameWidth = Math.round(fullHeight * ratio)

        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
        game.scale.setGameSize(gameWidth, gameHeight)

        game.stage.backgroundColor = "#ffffff"
        game.time.advancedTiming = true
        game.stage.disableVisibilityChange = true;        

        window.minigame.game = window.game
    	sceneloader.init(game)
    	sound.init(game)
		
    }

    function create(){

    	preloadScenes([
            gameScene,
    	])
    }
}

startGame()
//minigame.orientation.init(startGame)
