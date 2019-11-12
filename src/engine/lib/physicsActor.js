import Actor from '../lib/actor';

export default class PhysicsActor extends Actor {
    constructor(ctx, bounds) {
        super(ctx);
        this.px = bounds.px | 0;
        this.py = bounds.py | 0;
        this.width = bounds.width | 0;
        this.height = bounds.height;

        //angle relative origin
        this.angle = bounds.angle | 0;

        //render position
        this.nx = this.px;
        this.ny = this.py;

        //velocity
        this.vx = bounds.vx | 0;
        this.vy = bounds.vy | 0;

        //acceleration
        this.ax = bounds.ax | 0;
        this.ay = bounds.ay | 0;

        this.create();

        //bind
        this.update = this.update.bind(this);
    }

    create() {
        this.ctx.fillStyle = "#39ff14";
        this.ctx.fillRect(this.px, this.py, this.width, this.height)
    }


    update(deltaTime) {
        //console.log(deltaTime);
        //apply physics
        let dx=this.vx*deltaTime + 0.5 * this.ax * deltaTime * deltaTime;
        this.nx += dx;
        this.vx += this.ax * deltaTime;
        let dy=this.vy*deltaTime + 0.5 * this.ay * deltaTime * deltaTime;
        this.ny += dy;
        this.vy += this.ay * deltaTime;
        //console.log(deltaTime);
    }

    render() {
        //clear previous
        this.ctx.clearRect(Math.floor(this.px)-1, Math.floor(this.py)-1, this.width + this.ctx.lineWidth, this.height +  this.ctx.lineWidth);
        this.px = this.nx;
        this.py = this.ny;
    }
}