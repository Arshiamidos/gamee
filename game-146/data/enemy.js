/***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
var _$_dc4f=["walk","shooting","audio","add","undefined","y","velocity","body","move","play","animations","alive","min_posY","max_posY","remove","events","time","stop","take","getAnimation","x","bullet","sprite","ARCADE","Physics","enable","physics","down","checkCollision","unlockAudio","bullet_speed","moveFrom","checkWorldBounds","destroy","onOutOfBounds","shoot","onComplete","speed","name","integerInRange","rnd","loop","key","playBreakAnim","break","checkBulletCollision","getBounds","intersects","Rectangle","destroyBullet","isAlive","setSpeedMultiplier","resetSpeedMultiplier","enableStars","width","height","stars","setTo","anchor","anim_time","None","Linear","Easing","to","tween","visible","removeEvent","insertEvent","getSprite","getLine","isEventSet","setBreakingWall","getBreakingWall","checkAndMove","checkAndDestroy","isBreakingWall","firedBullet","getBullet","line"];var Enemy=function(p,t,q,s,r){var x=[];x[0]= null;x[1]= null;var G=t;var H=null;var v=-1;var y=q;var C=1;var E=s;var D=r;var F=1;var u=_$_dc4f[0];var w=null;var B=game[_$_dc4f[3]][_$_dc4f[2]](_$_dc4f[1]);var z=function(I){if( typeof I=== _$_dc4f[4]){G[_$_dc4f[7]][_$_dc4f[6]][_$_dc4f[5]]= C* D* F}else {G[_$_dc4f[7]][_$_dc4f[6]][_$_dc4f[5]]= I* D* F}};this[_$_dc4f[8]]= function(){G[_$_dc4f[10]][_$_dc4f[9]](u,8,true);F= 1;z()};var A=function(){if(G!== null&& G[_$_dc4f[11]]=== true){if((G[_$_dc4f[5]]> shootInfo[_$_dc4f[12]])&& (G[_$_dc4f[5]]< shootInfo[_$_dc4f[13]])){game[_$_dc4f[16]][_$_dc4f[15]][_$_dc4f[14]](x[1]);x[1]= null;this[_$_dc4f[17]]();var J=G[_$_dc4f[10]][_$_dc4f[19]](_$_dc4f[18]);J[_$_dc4f[36]][_$_dc4f[3]](function(K){w= game[_$_dc4f[3]][_$_dc4f[22]](G[_$_dc4f[20]]+ 52,G[_$_dc4f[5]]- 20,_$_dc4f[21]);game[_$_dc4f[26]][_$_dc4f[25]](w,Phaser[_$_dc4f[24]][_$_dc4f[23]]);w[_$_dc4f[7]][_$_dc4f[28]][_$_dc4f[27]]= true;if(audioEnabled){aldaEngine[_$_dc4f[29]]();B[_$_dc4f[9]]()};w[_$_dc4f[7]][_$_dc4f[31]](10000,shootInfo[_$_dc4f[30]],90);w[_$_dc4f[32]]= true;w[_$_dc4f[15]][_$_dc4f[34]][_$_dc4f[3]](function(G){G[_$_dc4f[33]]();w= null},this,w);u= _$_dc4f[35];this[_$_dc4f[8]]()},this);G[_$_dc4f[10]][_$_dc4f[9]](_$_dc4f[18],1,false)}}};switch(G[_$_dc4f[42]]){case enemy_type[0][_$_dc4f[38]]:C= enemy_type[0][_$_dc4f[37]];break;case enemy_type[1][_$_dc4f[38]]:x[1]= game[_$_dc4f[16]][_$_dc4f[15]][_$_dc4f[41]](game[_$_dc4f[40]][_$_dc4f[39]](500,2000),A,this);C= enemy_type[1][_$_dc4f[37]];break;case enemy_type[2][_$_dc4f[38]]:C= enemy_type[2][_$_dc4f[37]];break;case enemy_type[3][_$_dc4f[38]]:C= enemy_type[3][_$_dc4f[37]];break};this[_$_dc4f[43]]= function(){G[_$_dc4f[10]][_$_dc4f[9]](_$_dc4f[44],5,true)};this[_$_dc4f[45]]= function(L){if(w!== null){if(L!== null){return Phaser[_$_dc4f[48]][_$_dc4f[47]](w[_$_dc4f[46]](),L[_$_dc4f[46]]())}};return false};this[_$_dc4f[49]]= function(){if(w!= null){w[_$_dc4f[33]]()};w= null};this[_$_dc4f[50]]= function(){if(G!== null){return G[_$_dc4f[11]]}else {return false}};this[_$_dc4f[51]]= function(M){if((M> 0)){D= M;z()}};this[_$_dc4f[52]]= function(){D= E;z()};this[_$_dc4f[17]]= function(game){G[_$_dc4f[10]][_$_dc4f[17]]();F= 0;z()};this[_$_dc4f[53]]= function(N){if(H== null){H= game[_$_dc4f[3]][_$_dc4f[22]](G[_$_dc4f[20]]+ G[_$_dc4f[54]]/ 2,G[_$_dc4f[5]]- G[_$_dc4f[55]],_$_dc4f[56]);H[_$_dc4f[58]][_$_dc4f[57]](0.5,0.5);game[_$_dc4f[3]][_$_dc4f[64]](H)[_$_dc4f[63]]({rotation:90},starsInfo[_$_dc4f[59]],Phaser[_$_dc4f[62]][_$_dc4f[61]][_$_dc4f[60]],true)};H[_$_dc4f[65]]= N};this[_$_dc4f[66]]= function(game){game[_$_dc4f[16]][_$_dc4f[15]][_$_dc4f[14]](x[1]);x[1]= null};this[_$_dc4f[67]]= function(O){x[0]= O};this[_$_dc4f[68]]= function(){return G};this[_$_dc4f[69]]= function(){return y};this[_$_dc4f[70]]= function(){if((x[0]== null)&& (x[1]== null)){return false}else {return true}};this[_$_dc4f[71]]= function(P){v= P};this[_$_dc4f[72]]= function(){return v};this[_$_dc4f[73]]= function(L){var Q=L[_$_dc4f[74]](v);v=  -1;this[_$_dc4f[8]]();game[_$_dc4f[16]][_$_dc4f[15]][_$_dc4f[14]](x[0]);x[0]= null;return Q};this[_$_dc4f[75]]= function(){return (v==  -1)?false:true};this[_$_dc4f[14]]= function(){G[_$_dc4f[33]]();G= null;if(H!= null){H[_$_dc4f[33]]();H= null}};this[_$_dc4f[76]]= function(){if(w== null){return false};return true};this[_$_dc4f[77]]= function(){w[_$_dc4f[78]]= y;return w}}