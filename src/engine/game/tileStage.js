import Stage from '../lib/stage';

import Tile from './tile';
import FPSCounter from './fpsCounter';
import Ball from './ball';

export default class TileStage extends Stage {
    create() {
        this.elem.width = window.innerWidth;
        this.elem.height = window.innerHeight;
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        //draw map
        for (let offset = 0; offset < 500; offset += 15) {
            for (let x = 0; x < window.innerWidth; x += 15) {
                let b = new Ball(this.ctx, {
                    px: x,
                    py: x * -1 + offset,
                    width: 10,
                    height: 10
                })
                this.children.push(b)
            }
        }
        this.children.push(new FPSCounter(this.ctx))

        //this.children.push(new Ball(this.ctx, {px: 100, py: 100, width: 50, height: 50}))
    }
}