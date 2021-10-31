kaboom({
    global: true,
    fullscreen: true,
    clearColor: [0, 0, 0, 1],
})

loadSprite("batman", "sprites/batman.png")
loadSprite("batarang", "sprites/batarang.png")

const player = add([
    sprite("batman"),
    pos(50, 200),
    scale(0.2),
    area(),
    body(),
])




const SPEED = 150
const PSPEED = 1000

keyPress("space", () => {
    if (player.grounded())
    player.jump()
})

keyDown("right", () => {
    player.move(SPEED, 0);
})

keyDown("left", () => {
    player.move(-SPEED, 0);
})

keyPress("q", () => {
    add([
        sprite("batarang"),
        pos(player.pos.x + 10, player.pos.y),
        scale(0.02),
        area(),
        move((0,15), PSPEED),
        "projectile",
    ])
})

function spawnTree() {
    // add tree
    add([
        rect(48, 64),
        area(),
        outline(4),
        pos(width(), height() - 48),
        origin("botleft"),
        color(255, 180, 255),
        move(LEFT, 240),
        rotate(5),
        "obstacle",
    ]);
    wait(rand(0.5, 1.5), () => {
        spawnTree();
    });
}

spawnTree();

// add platform
add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(50, 50, 50),
])

collides("projectile", "obstacle", (b, a) => {
    if (!a.initializing) {
        destroy(b);
        destroy(a);
    }
});

// scene("game", () => {

// })

// start("game")