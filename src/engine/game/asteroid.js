import PhysicsActor from '../lib/physicsActor';

export default class Asteroid extends PhysicsActor {
    constructor(ctx, bounds) {
        super(ctx, bounds);

        //acceleration
        this.ax = 0.1 * Math.sin(Math.random() * 100);
        this.ay = 0.1 * Math.cos(Math.random() * 100);

        this.create();
    }

    create() {
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(Math.floor(this.px), Math.floor(this.py), this.width, this.height)
    }


    update() {
        super.update();
        //check radius to center
        let xComp = window.innerWidth / 2 - this.px;
        let yComp = window.innerHeight / 2 - this.py;
        let distance = Math.sqrt(xComp * xComp + yComp * yComp);
        if (distance > 1000) {
            this.destroy();
        }
    }

    render() {
        super.render();

        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(Math.floor(this.px), Math.floor(this.py), this.width, this.height)
    }

    destroy() {
        //clear previous
        this.ctx.clearRect(Math.floor(this.px)-1, Math.floor(this.py)-1, this.width + 1, this.height + 1);
        this.stage.removeActor(this);
    }
}