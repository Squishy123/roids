import Actor from '../lib/actor';

export default class FPSCounter extends Actor {
    create() {
        this.renderStart = Date.now();
        this.renderFPS=0;
        this.storRenderFPS=0;
        this.updateStart = Date.now();
        this.updateFPS=0;
        this.storUpdateFPS=0;
    }

    update() {
        let timeNow = Date.now();
        if (timeNow - this.updateStart > 1000) {
            this.updateStart = Date.now();
            this.storUpdateFPS=this.updateFPS;
            this.updateFPS=0;
        }
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 300, 40)

        this.ctx.fillStyle = "#00bcd4";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`Update FPS: ${this.storUpdateFPS}`, 30, 30)
        this.updateFPS+=1;
    }

    render() {
        let timeNow = Date.now();
        if (timeNow - this.renderStart > 1000) {
            this.renderStart = Date.now();
            this.storRenderFPS=this.renderFPS;
            this.renderFPS=0;
        }
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 30, 300, 40)

        this.ctx.fillStyle = "#00bcd4";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`Render FPS: ${(this.storRenderFPS)}`, 30, 60)

        this.renderFPS+=1;
    }
}