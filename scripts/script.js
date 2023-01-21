$(document).ready(function () {
    let n, div;
    let pun = [];

    const noise = new Tone.Noise("pink").toDestination();
    const fatOsc = new Tone.FatOscillator("Ab3", "sawtooth", 100).toDestination();

    (function () {
        let run = Pts.quickStart("#pt", "#000");

        let sound = Sound.from(noise, noise.context).analyze(32);
        let tempo = new Tempo(3000);

        let x1 = 432;
        let y1 = 352;
        let r = 300;
        let n = 300;

        drawNave(x1, y1, r, n);
        let val = 0;
        let cont = 0;
        let up = true;
        let pos = 0;
        let stop = false;
        let cFondo = "#ff0033";

        tempo.every(1).start((count, t) => {
            if (!stop) {
                if (up) {
                    val++;
                    if (val >= 120) {
                        up = false;
                        stop = true;
                        noise.stop();
                        fatOsc.start();
                    }
                }
                else {
                    val--;
                    if (val <= 0) {
                        up = true;
                        stop = true;
                        noise.stop();
                        fatOsc.start();
                    }
                }
                cFondo = "#ff0033";
                drawNave(x1, y1, r, n);
            }
            else {
                if (cont < 30) {
                    cont++;
                }
                else {
                    cont = 0;
                    stop = false;
                    fatOsc.stop();
                    noise.start();
                }
                cFondo = "#2DC5F4";
            }
            console.log(val);
            pos = scale(val, 0, 120, -30, 30);
        })

        run((time, ftime) => {
            let m = space.pointer;
            let fdata = sound.freqDomain();
            let rect = Rectangle.fromCenter(space.center, space.width);
            console.log(cFondo);
            form.fillOnly(cFondo).rect(rect);
            form.strokeOnly("#000", 10, "round", "round").polygon(Curve.bspline(pun));
            form.fillOnly("#FFF").circle(Circle.fromCenter(new Pt(332, 320), 45));
            form.fillOnly("#FFF").circle(Circle.fromCenter(new Pt(532, 320), 45));
            form.fillOnly("#000").circle(Circle.fromCenter(new Pt(332 + pos, 320), 15));
            form.fillOnly("#000").circle(Circle.fromCenter(new Pt(532 + pos, 320), 15));
            form.strokeOnly("#000", 10).line([new Pt(392, 460), new Pt(392, 770), new Pt(302, 790)]);
            form.strokeOnly("#000", 10).line([new Pt(472, 460), new Pt(472, 770), new Pt(392, 790)]);
        });
        space.add(tempo);
        space.bindMouse().bindTouch().play();
    })();

    $("#pt").click(function (e) {
        noise.start();
        noise.stop();
        fatOsc.start();
        fatOsc.stop();
    });

    function drawNave(x, y, r, n) {
        let x0 = x - r;
        let x1 = x + r;
        let y0 = y - r;
        let y1 = y + r;
        pun = [];
        for (let i = 0; i <= n; i++) {
            let xp = getRandomArbitrary(x0, x1);
            let yp = getRandomArbitrary(y0, y1);
            let punto = new Pt(xp, yp);
            pun.push(punto);
        }
    }

    function scale(number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

});