import Stage from '../lib/stage';

import FPSCounter from './fpsCounter';
import Asteroid from './asteroid';
import Player from './player';
import InputHandler from '../lib/inputHandler';
import { prototype } from 'events';

export default class AsteroidStage extends Stage {
    create() {
        this.spawnStart = Date.now();
        this.numSpawns = 0;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.elem.width = this.width;
        this.elem.height = this.height;
        Object.assign(this.elem.style, { backgroundColor: "black" });


        this.addActor(new FPSCounter(this.ctx), 100)

        this.inputHandler = new InputHandler(document.querySelector('body'));
        this.inputHandler.startHandler();
        this.addActor(new Player(this.ctx, {}, this.inputHandler), 10);
        //this.children.push(new Ball(this.ctx, {px: 100, py: 100, width: 50, height: 50}))
    }

    update() {
        let tempDate = Date.now();
        if (tempDate - this.spawnStart > 500) {
            let rand = Math.floor(Math.random() * 4);
            let px, py;
            if (rand == 0) {
                px=0;
                py=Math.floor(Math.random() * window.innerHeight);
            } else if (rand == 1) {
                px=window.innerWidth;
                py=Math.floor(Math.random() * window.innerHeight);
            } else if (rand == 2) {
                py=0;
                px=Math.floor(Math.random() * window.innerWidth);
            } else {
                py=window.innerHeight;
                px=Math.floor(Math.random() * window.innerWidth);
            }

            let asteroid = new Asteroid(this.ctx, {
                px: px,
                py: py,
                width: 100,
                height: 100
            });
            this.addActor(asteroid);
            this.numSpawns++;
            this.spawnStart = Date.now();
        }
    }
}