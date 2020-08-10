var gui = new dat.GUI()

const config = {
	n: 6,
	d: 71,
	Scale: 260,
	Background: [47, 161, 214],
	Color: [255, 255, 255],
	increaseBy: 0.000009,
	automateN: false,
	automateD: false,
	RotateX: true,
	RotateY: true,
	RotateZ: true,
	speed: 0.1,
}

gui.add(config, 'n').min(1).max(359).step(1).listen()
gui.add(config, 'd').min(1).max(359).step(1).listen()
gui.add(config, 'Scale').min(1).max(2000).step(1).listen()
gui.addColor(config, 'Background')
gui.addColor(config, 'Color')

var f1 = gui.addFolder('Rotate')
f1.add(config, 'RotateX').name('x-axis')
f1.add(config, 'RotateY').name('y-axis')
f1.add(config, 'RotateZ').name('z-axis')
f1.add(config, 'speed').min(0.1).max(10).step(0.1).name('Speed')
f1.open()

var f = gui.addFolder('Automate')
f.add(config, 'increaseBy').min(0).max(0.001).step(0.00001).name('var num =')
f.add(config, 'automateN').name('n+= num')
f.add(config, 'automateD').name('d+= num')

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
	angleMode(DEGREES)
}

function draw() {
	background(config.Background)

	if (config.RotateX) {
		rotateX(frameCount * config.speed)
	}

	if (config.RotateY) {
		rotateY(frameCount * config.speed)
	}

	if (config.RotateZ) {
		rotateZ(frameCount * config.speed)
	}

	if (config.automateN) {
		config.n += config.increaseBy
	}

	if (config.automateD) {
		config.d += config.increaseBy
	}

	stroke(config.Color)
	noFill()
	strokeWeight(1)
	beginShape()
	for (let i = 0; i < 360; i++) {
		let k = i * config.d
		let r = config.Scale * sin(config.n * k)
		let x = r * cos(k)
		let y = r * sin(k)
		vertex(x, y, r)
	}
	endShape()
}

if (
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)
) {
	config.Scale = window.innerWidth / 3
}
