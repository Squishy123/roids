import Stage from '../lib/stage';

import Tile from './tile';

export default class TileStage extends Stage {
    create() {
        this.elem.width = window.innerWidth;
        this.elem.height = window.innerHeight;
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        //draw map
        for(let x = 0; x < 1; x+=128) {
            let t = new Tile(this.ctx, x, 0)
            this.children.push(t)
        } 
    }
}