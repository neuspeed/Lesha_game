const PLATFORM_HEIGHT = 150
const SPEED = 150
const PSPEED = 1000

var projectileSpawned = false
kaboom({
    width: 1280,
    height: 720,
    global: true,
    clearColor: [0, 0, 0, 1],
})

loadRoot("sprites/")
loadSprite("batman", "batman.png")
loadSprite("batarang", "batarang.png")
loadSprite("background", "background.png")
loadSprite("badguy", "badguy.png")


// custom comp
function handleout() {
	return {
		id: "handleout",
		require: [ "pos" ],
		update() {
			const spos = this.screenPos();
			if (
				spos.x < 0 ||
				spos.x > width() ||
				spos.y < 0 ||
				spos.y > height()
			) {
				// triggers a custom event when out
				this.trigger("out");
			}
		},
	};
}

const backgorund = add([
    sprite("background"),
    pos(0, 0),
])

const player = add([
    sprite("batman"),
    pos(0, 0),
    scale(0.2),
    area(),
    body(),
])






keyPress("space", () => {
    if (player.grounded())
    player.jump(1000)
})

keyDown("right", () => {
    player.move(SPEED, 0);
})

keyDown("left", () => {
    player.move(-SPEED, 0);
})

keyDown("d", () => {
    player.move(SPEED, 0);
})

keyDown("a", () => {
    player.move(-SPEED, 0);
})

keyPress("q", () => {
    if (!projectileSpawned) {
        var batarang = add([
            sprite("batarang"),
            pos(player.pos),
            scale(0.02),
            area(),
            move((0,15), PSPEED),
            "projectile",
            handleout(),
        ])
    
        batarang.action(() => {
            batarang.angle = time() * 500;
        })
        projectileSpawned = true
    }
})



function spawnTree() {
    // add tree
    add([
        sprite("badguy"),
        scale(0.2),
        area(),
        pos(width(), height() - PLATFORM_HEIGHT),
        origin("botleft"),
        move(LEFT, 240),
        "obstacle",
    ]);
    wait(rand(1.5, 3.0), () => {
        spawnTree();
    });
}

spawnTree();

// add platform
const platform = add([
    rect(width(), PLATFORM_HEIGHT),
    pos(0, height() - PLATFORM_HEIGHT),
    area(),
    solid(),
    opacity(0.0),
    "platform",
])

collides("projectile", "obstacle", (b, a) => {
    if (!a.initializing) {
        addKaboom(b.pos);
        destroy(b);
        destroy(a);
        projectileSpawned = false;
    }
});

collides("projectile", "platform", (a) => {
    destroy(a);
    projectileSpawned = false;
})

on("out", "projectile", (m) => {
    destroy(m);
    projectileSpawned = false;
})
// scene("game", () => {

// })

// start("game")