Level1 = function(){
	
	this.black = new Color(0,0,0,1);
	this.red = new Color(255,0,0,1);
	this.floor = new Array();
	this.pickUps = new Array();
	this.groundImg = new Image()
	this.groundImg.src = "ground.png";
	this.logImg = new Image()
	this.logImg.src = "log.png";
	this.millImg = new Image()
	this.millImg.src = "saw2.png";
	this.toDeliver = 15;
	this.deliveryPoint = new Rectangle(1800 + 519, 800 - 43 - 50, 90, 50);
	this.flash = 0;
	this. inverter = 1;
	this.name = "lvl1";

		
	this.groundLvl = 800 - 43;

	this.Draw = function(ctx, pos){

		this.red.a = this.flash;
				ctx.lineWidth = 3;

		for(var i = 1; i < this.floor.length; i++){
			//this.floor[i].Draw(ctx);
			if(this.floor[i].x < pos + 1024/2 + 172&& this.floor[i].x > pos - 1024/2 - 172){
				ctx.drawImage(this.groundImg, this.floor[i].x , this.floor[i].y);
			}
			

		}
		for(var i = 0; i < this.pickUps.length; i++){
			if(this.pickUps[i].x < pos + 1024/2 + 172&& this.pickUps[i].x > pos - 1024/2 - 172){
				ctx.drawImage(this.logImg, this.pickUps[i].x , this.pickUps[i].y);
				//this.pickUps[i].Draw(ctx);
			}

		}		

		for(var i = 0; i < this.floor[0].width/this.groundImg.width; i++){
			ctx.drawImage(this.groundImg, this.floor[0].x + i*this.groundImg.width, this.floor[0].y);
		}


		ctx.drawImage(this.millImg, 1800, this.groundLvl - this.millImg.height + 6);
		ctx.fillText("Logs to deliver: ",2070, this.groundLvl - this.millImg.height + 6);
		ctx.fillText(this.toDeliver,2070 + 200, this.groundLvl - this.millImg.height + 6);
				//this.pickUps[i].Draw(ctx);
		this.deliveryPoint.DrawBoarder(ctx);
		if(this.flash > 0.95){
			this.inverter = -1;
		}else if(this.flash < 0.005){
			this.inverter = 1;
		}

		this.flash += 0.05*this.inverter;
		
	};

	this.Create = function(){
		this.floor.push(new Rectangle(-800, this.groundLvl, 3600 ,20));
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
			this.floor.push(new Rectangle((800 + test*171/2 + (35*rand) ), 740 - 65 - (i*80), 171 ,2));
			this.pickUps.push(new Rectangle((800 + test*171/2 + (35*rand) + rand) + 171/2, 740 - 58 - (i*80) - 30, 50 ,20));
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


};