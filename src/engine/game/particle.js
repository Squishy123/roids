import PhysicsActor from '../lib/physicsActor';

const PARTICLE_LIFETIME = 50;

export default class Particle extends PhysicsActor {
    constructor(ctx, bounds) {
        super(ctx, {
            width: 5,
            height: 5,
            angle: bounds.angle,
            px: bounds.px - 2.5,
            py: bounds.py - 2.5,
            ax: 1,
            ay: 1
        });

        this.totalDistance = 0;

        this.create();
    }

    create() {
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(this.px, this.py, this.width, this.height);
    }

    update() {
        super.update();
        this.vx = -this.ax * Math.sin(this.angle * Math.PI / 180);
        this.vy = this.ay * Math.cos(this.angle * Math.PI / 180);

        this.totalDistance+=Math.abs(this.vx)+Math.abs(this.vy);

        if (this.totalDistance > PARTICLE_LIFETIME) {
            this.destroy();
        }
    }

    render() {
        super.render();
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(this.px, this.py, this.width, this.height);
    }

    destroy() {
        this.ctx.clearRect(Math.floor(this.px) - 1, Math.floor(this.py) - 1, this.width + 2, this.height + 2);
        this.stage.removeActor(this);
    }
}