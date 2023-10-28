const BIRD_IMGS = [new Image(), new Image(), new Image()];
BIRD_IMGS[0].src = '../images/bird1.png';
BIRD_IMGS[1].src = '../images/bird2.png';
BIRD_IMGS[2].src = '../images/bird3.png';

class Bird {
    constructor(width, height) {
        this.x = Math.floor(width / 2 - BIRD_IMGS[0].width);
        this.y = Math.floor(height / 2 - BIRD_IMGS[0].height);
        this.img = BIRD_IMGS[0];
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.img.width * 2, this.img.height * 2);
    }
}

export default Bird;