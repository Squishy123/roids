import PhysicsActor from '../lib/physicsActor';
import Particle from './particle';
import Asteroid from './asteroid';
import Bullet from './bullet';

const MAX_VX = 10;
const MAX_VY = 10;

const MAX_FIRERATE = 10;

export default class Player extends PhysicsActor {
    constructor(ctx, bounds, input) {
        super(ctx, {
            px: bounds.px | window.innerWidth / 2,
            py: bounds.py | window.innerHeight / 2,
            width: 40,
            height: 40,
        });
        this.input = input;
        this.bulletTime = Date.now();

        this.handleAsteroidCollision = this.handleAsteroidCollision.bind(this);
        this.create();
    }

    create() {
        this.ctx.save();
        this.ctx.translate(this.px + this.width / 2, this.py + this.height / 2);
        this.ctx.rotate(this.angle * Math.PI / 180);
        this.ctx.strokeStyle = 'white';
        this.ctx.fillStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -15);
        this.ctx.lineTo(10, 10);
        this.ctx.lineTo(5, 7);
        this.ctx.lineTo(-5, 7);
        this.ctx.lineTo(-10, 10);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();

        //setup collision event
        let event = new Event('asteroidPlayerCollision');
        document.querySelector('body').addEventListener('asteroidPlayerCollision', this.handleAsteroidCollision)
    }

    handleAsteroidCollision(event) {
        console.log(event.detail)
    }

    update(deltaTime) {
        super.update(deltaTime);

        //wrap position
        if (this.px > window.innerWidth) {
            this.nx = 0;
        } else if (this.px < 0) {
            this.nx = window.innerWidth;
        }

        if (this.py > window.innerHeight) {
            this.ny = 0;
        } else if (this.py < 0) {
            this.ny = window.innerHeight;
        }

        //w
        if (this.input.keys()[87] && this.ay > -1) {
            if (Math.abs(this.vx) < MAX_VX)
                this.vx += 0.25 * Math.sin(this.angle * Math.PI / 180);
            else
                this.vx *= 0.7
            if (Math.abs(this.vy) < MAX_VY)
                this.vy -= 0.25 * Math.cos(this.angle * Math.PI / 180);
            else
                this.vy *= 0.7;

            this.stage.addActor(new Particle(this.ctx, { px: this.px + this.width / 2, py: this.py + this.height / 2, angle: this.angle, ax: this.vx, ay: this.vy }), this.zIndex - 1)
            this.stage.addActor(new Particle(this.ctx, { px: this.px + this.width / 2, py: this.py + this.height / 2, angle: this.angle + 15, ax: this.vx, ay: this.vy }), this.zIndex - 1)
            this.stage.addActor(new Particle(this.ctx, { px: this.px + this.width / 2, py: this.py + this.height / 2, angle: this.angle - 15, ax: this.vx, ay: this.vy }), this.zIndex - 1)
        }

        //a
        if (this.input.keys()[65]) {
            this.angle -= 10;
            //d
        } else if (this.input.keys()[68]) {
            this.angle += 10;
        }

        //space
        if (this.input.keys()[32]) {
            if(Date.now() - this.bulletTime > 1000/MAX_FIRERATE) {
                this.stage.addActor(new Bullet(this.ctx, { px: this.px + this.width / 2, py: this.py + this.height / 2, angle: this.angle + 180, ax: this.vx, ay: this.vy }), this.zIndex - 1)
                this.bulletTime=Date.now();
            }
        }

        //check collisions
        let collisions = this.stage.getCollisions(this);
        collisions.forEach((c) => {
            if (c instanceof Asteroid) {
                if (c.width > 50) {
                    let asteroid = new Asteroid(this.ctx, {
                        px: c.px,
                        py: c.py,
                        width: c.width / 2,
                        height: c.height / 2
                    });
                    this.stage.addActor(asteroid);
                }
                c.destroy();
                this.vx *= -0.75;
                this.vy *= -0.75;
            }
        })
    }

    render() {
        /*
        this.ctx.save();
        this.ctx.translate(this.px + this.width / 2, this.py + this.height / 2);
        this.ctx.rotate(this.angle * Math.PI / 180);
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(1, -15);
        this.ctx.lineTo(11, 11);
        this.ctx.lineTo(6, 8);
        this.ctx.lineTo(-6, 8);
        this.ctx.lineTo(-11, 11);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();*/
        this.ctx.fillStyle = "black";
        this.ctx.arc(this.px + this.width / 2, this.py + this.height / 2, 18, 0, 2 * Math.PI, false);
        this.ctx.fill();
        //super.render();
        this.px = this.nx;
        this.py = this.ny;
        //this.ctx.fillRect(Math.floor(this.px), Math.floor(this.py), this.width, this.height)
        this.ctx.save();
        this.ctx.translate(this.px + this.width / 2, this.py + this.height / 2);
        this.ctx.rotate(this.angle * Math.PI / 180);
        this.ctx.strokeStyle = 'white';
        this.ctx.fillStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -15);
        this.ctx.lineTo(10, 10);
        this.ctx.lineTo(5, 7);
        this.ctx.lineTo(-5, 7);
        this.ctx.lineTo(-10, 10);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }
}