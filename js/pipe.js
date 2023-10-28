const PIPE_TOP = new Image();
const PIPE_BUTTOM = new Image();
PIPE_TOP.src = '../images/pipe_top.png';
PIPE_BUTTOM.src = '../images/pipe_bottom.png';

class Pipe {
    constructor(width, height, velX, pipeX) {
        this.imgTop = PIPE_TOP;
        this.imgButtom = PIPE_BUTTOM;
        this.pipeX = pipeX;
        this.bottomY = Math.round(height/3) + Math.round(Math.random() * height/5);
        this.gap = 200 + Math.round(Math.random() * 100);
        this.topY = Math.max((this.bottomY - this.imgTop.height * 2) - this.gap, Math.round(-height * 0.7625));
        this.velX = velX;
        this.width = this.imgTop.width;
        this.passed = false;
    }

    draw(ctx) { 
        ctx.drawImage(this.imgTop, this.pipeX, this.topY, this.width * 2, this.imgButtom.height * 2);
        ctx.drawImage(this.imgButtom, this.pipeX, this.bottomY, this.width * 2, this.imgButtom.height * 2);
        this.pipeX -= this.velX;
    }
}

export default Pipe;