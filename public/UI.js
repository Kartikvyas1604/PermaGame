export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');

    }
    draw(context){
        context.save();
        context.shadowOffsetX =2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur=0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillstyle = this.game.fontColor;
        //score
        context.fillText('Score: ' + this.game.score, 20, 50);
        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time/1000).toFixed(1), 20, 80);
        //Boost
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Boost: ' + (this.game.boost).toFixed(1), 20, 110);
        //lives
        for( let i =0 ;i < this.game.lives; i++){
            context.drawImage(this.livesImage, 25 * i +25, 120,25,35);
        }
        
        // game over messages
        if (this.game.gameOver){
        context.textAlign = 'center';
        context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
        if(this.game.score > this.game.winningScore ){
            context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5 -20);
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            context.fillText( 'What are creatures of the night afraid of? YOU!!! ', this.game.width * 0.5, this.game.height * 0.5+20);
        } else {
            context.font = this.fontSize * 1.3 + 'px ' + this.fontFamily;
            context.fillText('Love At First Bite ?', this.game.width * 0.5, this.game.height * 0.5 -20);
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            context.fillText( 'NOPE , Better Luck Next Time ', this.game.width * 0.5, this.game.height * 0.5+20);
        }
       
        }

        context.restore();
    
    }
}