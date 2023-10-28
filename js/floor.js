const floorImg = new Image();
floorImg.src = '../images/base.png';

class Floor {
    constructor(width, height, velX) {
        this.x = 0;
        this.y = height - floorImg.height;
        this.velX = velX;
        this.img = floorImg;
        this.width = width;
        this.height = floorImg.height * 2;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width * 2, this.height);
        this.x -= this.velX;
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }
}

export default Floor;