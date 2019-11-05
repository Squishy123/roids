export default class Stage {
    constructor(elem) {
        //set cycle ticks and times
        this.ticks = 0;
        this.updateFPS = 60;
        this.updateTimeStart = Date.now();
        this.updateDeltaTime = 0;

        this.renderFPS = 60;
        this.renderTimeStart = Date.now();
        this.renderDeltaTime = 0;

        //setup canvas
        this.elem = elem;
        if (!elem) {
            this.elem = document.createElement('canvas');
            document.querySelector('body').appendChild(this.elem);
        }
        this.ctx = this.elem.getContext('2d');

        //setup children
        this.children = [];

        //bind functions
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.create = this.create.bind(this);
        this.callUpdateCycles = this.callUpdateCycles.bind(this);
        this.callRenderCycles = this.callRenderCycles.bind(this);

        //run create
        this.create();
    }

    callUpdateCycles() {
        let timeNow = Date.now();
        if ((timeNow - this.updateTimeStart) > this.updateFPS) {
            this.updateDeltaTime = timeNow - this.updateTimeStart;
            this.updateCycles(this.updateDeltaTime);
            this.updateTimeStart = Date.now();
        }
        window.requestAnimationFrame(this.callUpdateCycles)
    }
    
    callRenderCycles() {
        let timeNow = Date.now();
        if ((timeNow - this.renderTimeStart) > this.renderFPS) {
            this.renderDeltaTime = timeNow - this.renderTimeStart;
            this.renderCycles(this.renderDeltaTime);
            this.renderTimeStart = Date.now();
        }
        window.requestAnimationFrame(this.callRenderCycles)
    }

    create() {

    }

    start() {
        window.requestAnimationFrame(this.callUpdateCycles);
        window.requestAnimationFrame(this.callRenderCycles);
    }

    stop() {
        window.cancelAnimationFrame(this.callUpdateCycles);
        window.cancelAnimationFrame(this.callRenderCycles);
    }

    renderCycles(deltaTime) {
        //call all children render cycles
        this.children.forEach(function(child) {
            child.render(deltaTime)
        });
    }

    updateCycles(deltaTime) {
        console.log("Updating!")
        //call all update render cycles
        this.children.forEach(function(child) {
            child.update(deltaTime)
        });
    }
}