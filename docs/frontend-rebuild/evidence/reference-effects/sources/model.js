import * as PIXI from "https://cdn.skypack.dev/pixi.js@5.x";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

const simplex = new SimplexNoise();

class Orb {
    constructor(fill = 0x000000, bounds, radius = 10, speed = 0.0003) {
        this.bounds = bounds
        this.x = random(this.bounds["x"].min, this.bounds["x"].max);
        this.y = random(this.bounds["y"].min, this.bounds["y"].max);
        this.scale = 1
        this.fill = fill
        this.radius = radius
        this.xOff = random(0, 1000)
        this.yOff = random(0, 1000)
        this.speed = speed
        this.graphics = new PIXI.Graphics();
        this.graphics.alpha = 1;
    }

    update() {
        // self similar "psuedo-random" or noise values at a given point in "time"
        const xNoise = simplex.noise2D(this.xOff, this.xOff);
        const yNoise = simplex.noise2D(this.yOff, this.yOff);
        const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

        // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
        this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
        this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);
        // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
        this.scale = map(scaleNoise, -1, 1, 0.98, 1)

        // step through "time"
        this.xOff += this.speed;
        this.yOff += this.speed;
    }

    render() {
        this.graphics.x = this.x;
        this.graphics.y = this.y;
        this.graphics.scale.set(this.scale);
        this.graphics.clear();
        this.graphics.beginFill(this.fill);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
    }
}


var canvas = document.querySelectorAll('.orb-canvas')

for (let i = 0; i < canvas.length; i++) {
    const app = new PIXI.Application({
        view: canvas[i],
        // auto adjust size to fit the current window
        resizeTo: window,
        // transparent background, we will be creating a gradient background later using CSS
        transparent: true
    });

    // app.stage.filters = [new KawaseBlurFilter(25, 25, true)];

    const orbs = [];

    const orange_bounds = {
        x: {
            min: canvas[i].clientWidth * -0.8 - 50,
            max: canvas[i].clientWidth * -0.8 + 50
        },
        y: {
            min: canvas[i].clientWidth * 5 - 100,
            max: canvas[i].clientWidth * 5 + 100
        }
    }
    const orange = new Orb(0xff8000, orange_bounds, canvas[i].clientWidth * 5)

    app.stage.addChild(orange.graphics);

    orbs.push(orange);

    const blue_bounds = {
        x: {
            min: canvas[i].clientWidth * 2.1 - 50,
            max: canvas[i].clientWidth * 2.1 + 50
        },
        y: {
            min: canvas[i].clientWidth * 1.85 - 50,
            max: canvas[i].clientWidth * 1.85 + 50
        }
    }
    const blue = new Orb(0x184DC4, blue_bounds, canvas[i].clientWidth * 2.15)
    app.stage.addChild(blue.graphics);

    orbs.push(blue);


    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        app.ticker.add(() => {
            orbs.forEach((orb) => {
                orb.update()
                orb.render()
            })
        });
    } else {
        orbs.forEach((orb) => {
            orb.update()
            orb.render()
        })
    }
}

