//Single Scene in Spin & Win Game
//Basic skeleton for the game -> Game Loop

let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}

let config = {
    type : Phaser.CANVAS,
    width : 800,
    height: 600,
    backgroundColor : 0xffcc00,
    //single scene => level of game
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};

let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    //load images using load object
    this.load.image('background','../Assets/back.jpg');
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');      
}

function create(){
    console.log("Create");

    //create the background image
    let W = game.config.width;
    let H = game.config.height;
    
    //sprite is a way to create images
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    //reducing the size of image by 20%
    background.setScale(0.20);
    

    //either put stand first in the code or use depth property
    //create the stand
    let stand = this.add.sprite(W/2,H/2 + 250,'stand');
    stand.setScale(0.25);
    
    //create a pin
    let pin = this.add.sprite(W/2,H/2-250,"pin");
    pin.setScale(0.25);
    pin.depth = 1;
    
    //create wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25); 
    //to make wheel 50% transparent
    //this.wheel.alpha = 0.5;
    //alpha = 1(opaque)
    
    //event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);
    
    //create text object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "red",
    }

    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);  
}

//Game Loop
function update(){
    console.log("Inside Update");
}

function spinwheel(){
    
    console.log("You clicked the mouse");
    console.log("Start spinning");
    
    //onclick function
    //this.game_text.setText("You clicked the mouse!");
    
    //generating random numbers between 2 to 4
    let rounds = Phaser.Math.Between(2,4);
    //generating random degrees in the multiples of 30
    let degrees = Phaser.Math.Between(0,11)*30;
    
    //generating angles randomly
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    //tweens
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle, 
        //speed gradually decreases using ease
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope:this,
        onComplete:function(){
            this.game_text.setText("You won something: " + prizes_config.prize_names[idx]);
        },
    });   
}