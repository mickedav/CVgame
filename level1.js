Level1 = function(screenWidth, screenHight){


	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;
	this.black = new Color(0,0,0,1);
	this.red = new Color(255,0,0,1);
	this.floor = new Array();
	this.pickUps = new Array();
	this.backgroundOffset = 500
	this.groundImg = new Image()
	this.bgImg = new Image();

	this.bgImg.src = "forestbg.gif"
	this.groundImg.src = "ground.png";

	this.logImg = new Image()
	this.logImg.src = "log.png";
	this.millImg = new Image()
	this.millImg.src = "saw2.png";
	this.toDeliver = 15;
	this.deliveryPoint = new Rectangle(1800 + 519, this.screenHeight - 43 - 50, 90, 50);
	this.flash = 0;
	this.inverter = 1;
	this.name = "lvl1";

	this.levelClear = false;

	this.groundLvl = this.screenHeight - 43;

	this.Draw = function(ctx, pos){
		this.red.a = this.flash;
		ctx.lineWidth = 3;
		ctx.font="30px Arcade";
		this.drawBackground(ctx, pos);
		this.drawSkyFloor(ctx, pos);
		this.drawPickups(ctx, pos);
		this.drawFloor(ctx, pos);
		this.drawPictures(ctx, pos);
		this.drawBorders(ctx, pos);
		ctx.fillText(this.points, -(canvas.width/2) + 5 + this.offsetX, 28);
	};

	this.Create = function(){

		this.floor.push(new Rectangle(-this.screenHeight , this.groundLvl, 3600 ,20));
		var rand = 0;
		this.deliveryPoint.color = this.red;

		for(var i = 0; i < 7; i++){
			rand = Math.random() * 70;
			var test = Math.pow(-1,i);

			this.floor.push(new Rectangle((400 + test*171/2 + (35*test) ), 740 - 65 - (i*80), 171 ,2));
			this.pickUps.push(new Rectangle((400 + test*171/2 + (35*test) + rand*test) + 171/2, 740 - 58 - (i*80) - 30, 50 ,20));
		}

		for(var i = 0; i < 7; i++){
			rand = Math.random() * 6;
			var test = Math.pow(-1,i);
			this.floor.push(new Rectangle((this.screenHeight  + test*171/2 + (35*rand) ), 740 - 65 - (i*80), 171 ,2));
			this.pickUps.push(new Rectangle((this.screenHeight  + test*171/2 + (35*rand) + rand) + 171/2, 740 - 58 - (i*80) - 30, 50 ,20));
		}
			for(var i = 0; i < 7; i++){
			rand = Math.random() * 4;
			var test = Math.pow(-1,i);
			this.floor.push(new Rectangle((1200 + test*171/2 + (35*rand) ), 740 - 65 - (i*80), 171 ,2));
			this.pickUps.push(new Rectangle((1200 + test*171/2 + (35*rand) + rand) + 171/2, 740 - 58 - (i*80) - 30, 50 ,20));
		}


		for(var i = 0; i < this.floor.length; i++){
			this.floor[i].color = this.black;
		}
		for(var i = 0; i < this.pickUps.length; i++){
			this.pickUps[i].color = this.red;
		}
	};

//ADD spacebar Action here, dependent on lvl
	this.spacebarAction = function(player){
		if (this.deliveryPoint.Intersects(player.rect)){
			this.toDeliver -= player.points;
			player.points = 0;
		}
	};

	this.levelClearCheck = function(){
		if(this.toDeliver <= 0){
			this.levelClear = true;
		}

	};

	this.levelCollison = function(player){
		for(var i = 0; i < this.pickUps.length; i++){
			if(this.pickUps[i].Intersects(player.rect)){
				this.pickUps.RemoveAt(i);
				player.points++;
			}
		}
	}

	//DRAW METHODS
	this.drawBackground = function(ctx, pos){
		ctx.drawImage(this.bgImg, - this.backgroundOffset + pos/1.09, -200)
		ctx.drawImage(this.bgImg, - this.backgroundOffset + this.bgImg.width + pos/1.09, -200)
	};

	this.drawSkyFloor = function(ctx, pos){
		for(var i = 1; i < this.floor.length; i++){
			if(this.floor[i].x < pos + this.screenWidth/2 + 172&& this.floor[i].x > pos - this.screenWidth/2 - 172){
				ctx.drawImage(this.groundImg, this.floor[i].x , this.floor[i].y);
			}
		}
	};

	this.drawPickups = function(ctx, pos){
		for(var i = 0; i < this.pickUps.length; i++){
			if(this.pickUps[i].x < pos + this.screenWidth/2 + 172&& this.pickUps[i].x > pos - this.screenWidth/2 - 172){
				ctx.drawImage(this.logImg, this.pickUps[i].x , this.pickUps[i].y);
			}
		}
	};

	this.drawFloor = function(ctx, pos){
		for(var i = 0; i < this.floor[0].width/this.groundImg.width; i++){
			ctx.drawImage(this.groundImg, this.floor[0].x + i*this.groundImg.width, this.floor[0].y);
		}
	};

	this.drawPictures = function(ctx, pos){
		ctx.drawImage(this.millImg, 1800, this.groundLvl - this.millImg.height + 6);
		ctx.fillText("Logs to deliver: ",2070, this.groundLvl - this.millImg.height + 6);
		ctx.fillText(this.toDeliver,2070 + 200, this.groundLvl - this.millImg.height + 6);
	};

	this.drawBorders = function(ctx, pos){
		this.deliveryPoint.DrawBoarder(ctx);
		if(this.flash > 0.95){
			this.inverter = -1;
		}else if(this.flash < 0.005){
			this.inverter = 1;
		}

		this.flash += 0.05*this.inverter;
	};

};
