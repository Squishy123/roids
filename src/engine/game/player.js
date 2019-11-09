import PhysicsActor from '../lib/physicsActor';
import Particle from './particle';

export default class Player extends PhysicsActor {
    constructor(ctx, bounds, input) {
        super(ctx, {
            px: bounds.px | window.innerWidth / 2,
            py: bounds.py | window.innerHeight / 2,
            width: 40,
            height: 40
        });
        this.input = input;

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
    }

    update() {
        super.update();

        //wrap position
        if(this.px > window.innerWidth) {
            this.nx = 0;
        } else if (this.px < 0) {
            this.nx = window.innerWidth;
        }

        if(this.py > window.innerHeight) {
            this.ny = 0;
        } else if (this.py < 0) {
            this.ny = window.innerHeight;
        }

        //w
        if (this.input.keys()[87] && this.ay > -1) {
            this.vx += 0.25 * Math.sin(this.angle * Math.PI / 180);
            this.vy -= 0.25 * Math.cos(this.angle * Math.PI / 180);

            this.stage.addActor(new Particle(this.ctx, { px: this.px + this.width / 2, py: this.py + this.height / 2, angle: this.angle }), this.zIndex-1)
        }

        //a
        if (this.input.keys()[65]) {
            this.angle -= 10;
            //d
        } else if (this.input.keys()[68]) {
            this.angle += 10;
        }
    }

    render() {
        this.ctx.save();
        this.ctx.translate(this.px + this.width / 2, this.py + this.height / 2);
        this.ctx.rotate(this.angle * Math.PI / 180);
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = 'black';
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