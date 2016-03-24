var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var screenWidth = canvas.width;
var screenHeight = canvas.height;
ctx.fillstyle = "blue";
ctx.font = "bold 26px Arial";
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

input.offset = new Vector2(GetLeft(canvas), GetTop(canvas));

//Game Init
var player = new Player();
player.SetPosition(player.offsetX);

var level1 = new Level1(screenWidth, screenHeight);
var level2 = new Level2(screenWidth, screenHeight);

level1.Create();
level2.Create();

var level = level1;
var collison = new Collision(level, player);

levels = [level1, level2]




var update = setInterval(function(){

	player.Update();
	collison.CheckPickups();
	level.levelClearCheck();

	if(!collison.CheckEnvironment()){
		player.jumpAvailable = false;
	}

	console.log(level.name);
	if(level.levelClear == true){
		console.log('Loading next lvl')


		level = level2;
		collison = new Collision(level, player);
	}

}, 1);

var Draw = setInterval(function(){
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate((canvas.width/2) - player.offsetX, 0);
	ctx.fillText(player.points, -(canvas.width/2) + 5 + player.offsetX, 28);
	level.Draw(ctx, player.rect.x);
	player.Draw(ctx);


	ctx.restore();



}, 33);
