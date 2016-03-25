Level2 = function(screenWidth, screenHight){

	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;
	this.black = new Color(0,0,0,1);
	this.red = new Color(255,0,0,1);
	this.floor = new Array();
	this.shelf = new Array();
	this.pickUps = new Array();
	this.pickPoints = new Array();
	this.groundImg = new Image();
	this.groundImg.src = "groundFactory.png";
	this.shelfImg = new Image();
	this.shelfImg.src = "shelf.png";
	this.forkImg = new Image();
	this.bgImg = new Image();
	this.bgImg2 = new Image();

	this.backgroundOffset = 500

	this.forkImg.src = "fork.png";
	this.bgImg.src = "factorybg.png"
	this.bgImg2.src = "factorybg2.jpg"

	this.name = "lvl2";

	this.currentPickup = 0;

	this.levelClear = false;

	this.itemList = ['Apples', 'Oranges', 'Bananas'];
	this.toPickUp = 0;

	this.itemInInventory = false;

	this.deliveryPoint = new Rectangle(1800 + 519, this.screenHeight - 43 - 50, 90, 50);
	this.flash = 0;
	this.inverter = 1;

	this.groundLvl = this.screenHeight - 43;

	this.Draw = function(ctx, pos){
		this.red.a = this.flash;
		ctx.lineWidth = 3;
		ctx.fillStyle= '#ffffff';
		ctx.font="30px Arcade";


		this.drawBackground(ctx, pos);
		this.drawStatusText(ctx, pos);
		this.drawShelfs(ctx, pos);
		this.drawFloor(ctx, pos);
		this.drawPickPointBorders(ctx, pos);
		this.drawPickList(ctx, pos);
		this.drawDeliveryPoint(ctx, pos);



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
			this.pickPoints.push(new Rectangle(342 + (41.7*rand*(i*3)), this.screenHeight - 126, 40, 84));
		}

		for(var i = 0; i < 3; i++){
			this.pickPoints[i].color = this.red;
		}
	};

	//ADD spacebar Action here, dependent on lvl
	this.spacebarAction = function(player){
		if (this.deliveryPoint.Intersects(player.rect) && this.itemInInventory == true){
			this.itemInInventory = false;
			this.currentPickup++;
		}
	};

	this.levelClearCheck = function(){
			if(this.toPickUp <= 0){
			}
		};

	this.levelCollison = function(player){
		for(var i = 0; i < this.pickPoints.length; i++){
			if(this.pickPoints[this.currentPickup].Intersects(player.rect) && this.itemInInventory == false){
				this.itemInInventory = true;
			}
		}
	};

//DRAW METHODS
	this.drawBackground = function(ctx, pos){
		ctx.drawImage(this.bgImg2, - this.backgroundOffset + pos/1.02, 0)
		ctx.drawImage(this.bgImg2, - this.backgroundOffset + this.bgImg2.width + pos/1.02, 0)
		ctx.drawImage(this.bgImg, - this.backgroundOffset + pos/1.09, 265)
		ctx.drawImage(this.bgImg, - this.backgroundOffset + this.bgImg.width + pos/1.09, 265)
	};

	this.drawStatusText = function(ctx, pos){
		if(this.itemInInventory == true){
			ctx.fillText('Return: ' + this.itemList[this.currentPickup], player.offsetX, 30);
		}
		else{
			ctx.fillText(this.itemList[this.currentPickup], player.offsetX, 30);
		}
	};

	this.drawShelfs = function(ctx, pos){
		for(var i = 0; i < this.shelf.length; i++){
				ctx.drawImage(this.shelfImg, this.shelf[i].x , this.shelf[i].y);
		}
	};

	this.drawFloor = function(ctx, pos){
		for(var i = 0; i < this.floor[0].width/this.groundImg.width; i++){
			ctx.drawImage(this.groundImg, this.floor[0].x + i*this.groundImg.width, this.floor[0].y);
		}
	};

	this.drawPickPointBorders = function(ctx, pos){
		for(var i = 0; i < this.pickPoints.length; i++){
			this.pickPoints[i].DrawBoarder(ctx);
		}
	};
	this.drawPickList = function(ctx, pos){
		ctx.fillStyle = '#000000'
		ctx.strokeStyle = 'black';


		for(var i = 0; i < this.pickPoints.length; i++){
			textWidth = ctx.measureText(this.itemList[i])

			x = (this.pickPoints[i].x - (textWidth.width/4));
			y = this.pickPoints[i].y + 16;
			ctx.fillText(this.itemList[i],x,y);
		}
	};

	this.drawDeliveryPoint = function(ctx, pos){
		ctx.drawImage(this.forkImg, 1800 + 519, this.screenHeight - this.groundImg.height - 20);
		this.deliveryPoint.DrawBoarder(ctx);
		if(this.flash > 0.95){
			this.inverter = -1;
		}else if(this.flash < 0.005){
			this.inverter = 1;
		}
		this.flash += 0.05*this.inverter;
	};


};
