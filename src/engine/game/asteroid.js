import PhysicsActor from '../lib/physicsActor';
import Player from './player';
import Bullet from './bullet';

export default class Asteroid extends PhysicsActor {
    constructor(ctx, bounds) {
        super(ctx, bounds);

        //acceleration
        this.ax = 0.01 * Math.sin(Math.random() * 100);
        this.ay = 0.01 * Math.cos(Math.random() * 100);

        this.create();
    }

    create() {
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(Math.floor(this.px), Math.floor(this.py), this.width, this.height)
    }


    update(deltaTime) {
        super.update(deltaTime);
        //check radius to center
        let xComp = window.innerWidth / 2 - this.px;
        let yComp = window.innerHeight / 2 - this.py;
        let distance = Math.sqrt(xComp * xComp + yComp * yComp);
        if (distance > 1000) {
            this.destroy();
        }

        //check collisions
        let collisions = this.stage.getCollisions(this);
        collisions.forEach((c) => {
            if (c instanceof Asteroid || c instanceof Bullet) {
                if (this.width > 10) {
                    let asteroid = new Asteroid(this.ctx, {
                        px: this.px,
                        py: this.py,
                        width: this.width / 2,
                        height: this.height / 2
                    });
                    this.stage.addActor(asteroid);
                }
                this.destroy();
            }
            //document.querySelector('body').dispatchEvent('asteroidPlayerCollision');
        })
    }

    render() {
        super.render();

        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(Math.floor(this.px), Math.floor(this.py), this.width, this.height)
    }

    destroy() {
        //clear previous
        this.ctx.clearRect(Math.floor(this.px)-1, Math.floor(this.py)-1, this.width + this.ctx.lineWidth, this.height +  this.ctx.lineWidth);
        this.stage.removeActor(this);
    }
}