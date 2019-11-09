import Actor from '../lib/actor';

export default class Ball extends Actor {
    constructor(ctx, bounds) {
        super(ctx);
        this.px = bounds.px;
        this.py = bounds.py;
        this.width = bounds.width;
        this.height = bounds.height;

        //render position
        this.nx = this.px;
        this.ny = this.py;

        //velocity
        this.vx = 0;
        this.vy = 0;

        //acceleration
        this.ax = 0;
        this.ay = 0.1;

        this.create();
    }

    create() {
        this.ctx.fillStyle = "#39ff14";
        this.ctx.fillRect(this.px, this.py, this.width, this.height)
    }


    update() {
        //this.vx=10*Math.sin(0.005*Date.now())
        //this.vy=10*Math.cos(0.005*Date.now())

        //apply physics
        this.vx += this.ax;
        this.nx += this.vx;

        if (this.ny < window.innerHeight - this.height) {
            this.vy += this.ay;
            this.ny += this.vy;
        }
        else {
            if (this.ny > window.innerHeight - this.height) {
                this.ny = window.innerHeight - this.height + 1;
            }

            this.ny = window.innerHeight - this.height;
            this.vy *= -0.7
            this.ny += this.vy;
        }

    }

    render() {
        //clear previous
        this.ctx.clearRect(Math.floor(this.px), Math.floor(this.py), this.width, this.height);

        this.px = this.nx;
        this.py = this.ny;
        this.ctx.fillStyle = "#39ff14";
        this.ctx.fillRect(Math.floor(this.px), Math.floor(this.py), this.width, this.height)
    }
}