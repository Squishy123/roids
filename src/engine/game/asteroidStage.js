import Stage from '../lib/stage';

import FPSCounter from './fpsCounter';
import Asteroid from './asteroid';
import Player from './player';
import InputHandler from '../lib/inputHandler';

export default class AsteroidStage extends Stage {
    create() {
        this.spawnStart = Date.now();
        this.numSpawns = 0;

        this.elem.width = window.innerWidth;
        this.elem.height = window.innerHeight;
        Object.assign(this.elem.style, { backgroundColor: "black" });


        this.addActor(new FPSCounter(this.ctx), 100)

        this.inputHandler = new InputHandler(document.querySelector('body'));
        this.inputHandler.startHandler();
        this.addActor(new Player(this.ctx, {}, this.inputHandler), 10);
        //this.children.push(new Ball(this.ctx, {px: 100, py: 100, width: 50, height: 50}))
    }

    update() {
        let tempDate = Date.now();
        if (tempDate - this.spawnStart > 1000) {
            let asteroid = new Asteroid(this.ctx, {
                px: Math.random() * window.innerWidth,
                py: Math.random() * window.innerHeight,
                width: 100,
                height: 100
            });
            this.addActor(asteroid);
            this.numSpawns++;
            this.spawnStart = Date.now();
        }
    }
}