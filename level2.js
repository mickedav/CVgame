Level2 = function(screenWidth, screenHight){

	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;
	this.black = new Color(0,0,0,1);
	this.red = new Color(255,0,0,1);
	this.floor = new Array();
	this.shelf = new Array();
	this.pickUps = new Array();
	this.pickPoints = new Array();
	this.groundImg = new Image()
	this.groundImg.src = "groundFactory.png";
	this.shelfImg = new Image()
	this.shelfImg.src = "shelf.png";
	this.forkImg = new Image()
	this.forkImg.src = "fork.png";
	this.name = "lvl2";
	this.toPickUp = 0;

	this.itemList = ['Apple', 'Oranges', 'Bananas'];

	this.itemInInventory = false;

	this.toDeliver = 15;
	this.deliveryPoint = new Rectangle(1800 + 519, this.screenHeight - 43 - 50, 90, 50);
	this.flash = 0;
	this.inverter = 1;


	this.groundLvl = this.screenHeight - 43;

	this.Draw = function(ctx, pos){
		this.red.a = this.flash;
		ctx.lineWidth = 3;

		ctx.fillText(this.itemList[this.toPickUp], player.offsetX, 20);

		for(var i = 0; i < this.shelf.length; i++){
				ctx.drawImage(this.shelfImg, this.shelf[i].x , this.shelf[i].y);
		}

		for(var i = 0; i < this.floor[0].width/this.groundImg.width; i++){
			ctx.drawImage(this.groundImg, this.floor[0].x + i*this.groundImg.width, this.floor[0].y);
		}

		for(var i = 0; i < this.pickPoints.length; i++){
			this.pickPoints[i].DrawBoarder(ctx);

			textWidth = ctx.measureText(this.itemList[i])

			x = (this.pickPoints[i].x - (textWidth.width/4));
			y = this.pickPoints[i].y - 10;
			ctx.fillText(this.itemList[i],x,y);
		}


		ctx.drawImage(this.forkImg, 1800 + 519, this.screenHeight - this.groundImg.height - 20);
		this.deliveryPoint.DrawBoarder(ctx);

		if(this.flash > 0.95){
			this.inverter = -1;
		}else if(this.flash < 0.005){
			this.inverter = 1;
		}

		this.flash += 0.05*this.inverter;
	};

	this.Create = function(){
		this.floor.push(new Rectangle(-this.screenHeight, this.groundLvl, 4000 ,20));
		var rand = 0;
		this.deliveryPoint.color = this.red;


		for (var i = 0; i < 4; i++) {
			this.shelf.push(new Rectangle(300 + i*500, this.screenHeight - 126, 500 ,84));
		}

		for(var i = 0; i < 3; i++){
			rand = 2 + Math.random() * 5;
			rand = Math.round(rand);
			//console.log(41.7*rand*(i*3));
			this.pickPoints.push(new Rectangle(300 + (41.7*rand*(i*3)), this.screenHeight - 126, 40, 84));
		}


		for(var i = 0; i < 3; i++){
			this.pickPoints[i].color = this.red;
		}

	};


};
