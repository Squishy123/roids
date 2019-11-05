import Actor from '../lib/actor';

export default class Tile extends Actor {
    constructor(ctx, x, y) {
        super(ctx);
        this.x = x;
        this.y = y;
        this.nx = x;
        this.ny = y;

        this.create = this.create.bind(this);

        this.create();
    }

    create() {
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(this.x, this.y, 64, 64);
    }

    update(deltaTime) {
        this.nx = 100 * Math.cos(0.0005 * Date.now()) + window.innerWidth / 2 + 32;
        this.ny = 100 * Math.sin(0.0005 * Date.now()) + window.innerHeight / 2 + 32;
    }

    render(deltaTime) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.x-1, this.y-1, 67, 67);
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(this.nx, this.ny, 64, 64);
        this.x=this.nx;
        this.y=this.ny;
    }
}