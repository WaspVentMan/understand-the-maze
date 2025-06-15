let lastTaunt = Date.now()
let tick = Date.now()
let start = Date.now()
let lastMitosis = Date.now()
let monsterInterval = ""
let playerInterval = "Ended"
let mode = 0
let score = 0

let wind = new Audio("audio/ambientGroan.mp3")
wind.loop = true
wind.volume = 0

let player = {
    "pos": [3, 3],
    "dir": 0,
    "stamina": 100,
    "fear": 0,
    "lastMove": 0,
    "trip": false,
    "petrified": false,
    "dead": false,
    "map": false,
    "control": true
}

let monster = [
    {
        "pos": [15, 15],
        "dir": 2,
        "distance": 0,
    }
]

let mazes = [
    "eyJuYW1lIjoiRmFtaWxpYXIgUGxhY2UiLCJtYXplIjpbIjAwMDAwMDAwMDAwMDAwMDAwMDAiLCIwMDAwMDAwMDAwMDAwMDAwMDAwIiwiMDAxMTExMTIxMTEyMTExMTEwMCIsIjAwMTAwMDAwMDAwMDAwMDAxMDAiLCIwMDEwMTExMDExMTAxMTEwMTAwIiwiMDAyMDAwMTAwMDIwMDAwMDIwMCIsIjAwMTAxMDEwMTAxMTEwMTAxMDAiLCIwMDEwMTAwMDEwMDAwMDEwMTAwIiwiMDAxMDEwMTExMjEwMTExMDEwMCIsIjAwMjAwMDIwMDAwMDIwMDAyMDAiLCIwMDEwMTExMDExMTExMDEwMTAwIiwiMDAyMDAwMjAwMDAwMDAxMDEwMCIsIjAwMTAxMDEwMTExMDEwMTAxMDAiLCIwMDEwMTAwMDEwMDAyMDEwMTAwIiwiMDAxMDExMTAxMDExMTAxMDEwMCIsIjAwMTAwMDAwMDAwMDAwMDAxMDAiLCIwMDExMTExMTEyMTExMjExMTAwIiwiMDAwMDAwMDAwMDAwMDAwMDAwMCIsIjAwMDAwMDAwMDAwMDAwMDAwMDAiXX0=",
    "eyJuYW1lIjoiVGhlIFJvc2UiLCJtYXplIjpbIjAwMDAwMDAwMDAwMDAwMDAwMDAiLCIwMDAwMDAwMDAwMDAwMDAwMDAwIiwiMDAxMTExMTExMjExMTExMTEwMCIsIjAwMTAwMDAwMDAwMDAwMDAxMDAiLCIwMDEwMTAxMTEwMTExMDEwMTAwIiwiMDAxMDAwMTAwMDAwMTAwMDEwMCIsIjAwMTAxMTEwMTIxMDExMTAxMDAiLCIwMDEwMTAwMDAwMDAwMDEwMTAwIiwiMDAxMDEwMTAxMDEwMTAxMDEwMCIsIjAwMjAwMDEwMDAwMDEwMDAyMDAiLCIwMDEwMTAxMDEwMTAxMDEwMTAwIiwiMDAxMDEwMDAwMDAwMDAxMDEwMCIsIjAwMTAxMTEwMTIxMDExMTAxMDAiLCIwMDEwMDAxMDAwMDAxMDAwMTAwIiwiMDAxMDEwMTExMDExMTAxMDEwMCIsIjAwMTAwMDAwMDAwMDAwMDAxMDAiLCIwMDExMTExMTEyMTExMTExMTAwIiwiMDAwMDAwMDAwMDAwMDAwMDAwMCIsIjAwMDAwMDAwMDAwMDAwMDAwMDAiXX0=",
    "eyJuYW1lIjoiaGFsbHMgb2YgaGFsbHMgYW5kIGN1cGJvYXJkcyIsIm1hemUiOlsiMDAwMDAwMDAwMDAwMDAwMDAwMCIsIjAwMDAwMDAwMDAwMDAwMDAwMDAiLCIwMDEyMTEyMTEyMTEyMTEyMTAwIiwiMDAyMDAwMDAwMDAwMDAwMDIwMCIsIjAwMTAxMTAxMTAxMTAxMTAxMDAiLCIwMDEwMTEwMTEwMTEwMTEwMTAwIiwiMDAyMDAwMDAwMDAwMDAwMDIwMCIsIjAwMTAxMTAxMTAxMTAxMTAxMDAiLCIwMDEwMTEwMTEwMTEwMTEwMTAwIiwiMDAyMDAwMDAwMDAwMDAwMDIwMCIsIjAwMTAxMTAxMTAxMTAxMTAxMDAiLCIwMDEwMTEwMTEwMTEwMTEwMTAwIiwiMDAyMDAwMDAwMDAwMDAwMDIwMCIsIjAwMTAxMTAxMTAxMTAxMTAxMDAiLCIwMDEwMTEwMTEwMTEwMTEwMTAwIiwiMDAyMDAwMDAwMDAwMDAwMDIwMCIsIjAwMTIxMTIxMTIxMTIxMTIxMDAiLCIwMDAwMDAwMDAwMDAwMDAwMDAwIiwiMDAwMDAwMDAwMDAwMDAwMDAwMCJdfQ==",
    "eyJuYW1lIjoidGhlIGNlbGxhciIsIm1hemUiOlsiMDAwMDAwMDAwMDAwMDAwMDAwMCIsIjAwMDAwMDAwMDAwMDAwMDAwMDAiLCIwMDExMTIxMTEyMTExMjExMTAwIiwiMDAxMDAwMDAwMDAwMDAwMDEwMCIsIjAwMTAxMDEwMTAxMDEwMTAxMDAiLCIwMDIwMDAwMDAwMDAwMDAwMjAwIiwiMDAxMDEwMTAxMDEwMTAxMDEwMCIsIjAwMTAwMDAwMDAwMDAwMDAxMDAiLCIwMDEwMTAxMDEwMTAxMDEwMTAwIiwiMDAyMDAwMDAwMDAwMDAwMDIwMCIsIjAwMTAxMDEwMTAxMDEwMTAxMDAiLCIwMDEwMDAwMDAwMDAwMDAwMTAwIiwiMDAxMDEwMTAxMDEwMTAxMDEwMCIsIjAwMjAwMDAwMDAwMDAwMDAyMDAiLCIwMDEwMTAxMDEwMTAxMDEwMTAwIiwiMDAxMDAwMDAwMDAwMDAwMDEwMCIsIjAwMTExMjExMTIxMTEyMTExMDAiLCIwMDAwMDAwMDAwMDAwMDAwMDAwIiwiMDAwMDAwMDAwMDAwMDAwMDAwMCJdfQ=="
]

let mazePacks = []
let mazePack = localStorage.getItem("MAZEMAZES")
if (mazePack != null){
    mazePacks = JSON.parse(mazePack)
}

let maze = JSON.parse(atob(mazes[0])).maze

function mountPacks() {
    for (let x = 0; x < mazePacks.length; x++){
        mazes.push(mazePacks[x])
    }
}

mountPacks()

function distance(x, y){return Math.sqrt((x**2) + (y**2))}

function double(){
    monster = JSON.parse(JSON.stringify(monster).slice(0, -1).split(" ") + "," + JSON.stringify(monster).slice(1))
}

function calcWalls(){
    let objects = {
        "leftWall": document.querySelector(".leftWall"),
        "rightWall": document.querySelector(".rightWall"),
        "backWallFar": document.querySelector(".backWallFar"),
        "backWall": document.querySelector(".backWall"),
        "overlay": document.querySelector(".overlay")
    }

    if (player.dir == 0){
        document.querySelector(".backWall").style.display = "none"

        if (maze[player.pos[0]+1][player.pos[1]] != "0"){
            objects.backWall.style.display = "block"
            objects.backWall.style.backgroundImage = `url(img/wallnear.png)`
            if (maze[player.pos[0]+1][player.pos[1]] == "2"){
                objects.backWall.style.backgroundImage = `url(img/doornear.png)`
            }
        } else if (maze[player.pos[0]+2][player.pos[1]] == "1"){
            objects.backWallFar.style.backgroundImage = `url(img/wallfar.png)`
        } else if (maze[player.pos[0]+3][player.pos[1]] == "1"){
            objects.backWallFar.style.backgroundImage = `url(img/wallfarer.png)`
        } else {
            objects.backWallFar.style.backgroundImage = `url(img/hall.png)`
        }

        for (let x = 0; x < monster.length; x++){
            if (player.pos[0]+2 == monster[x].pos[0] && player.pos[1] == monster[x].pos[1]){
                objects.backWallFar.style.backgroundImage = `url(img/monsterfar.png)`
            }

            if (player.pos[0]+1 == monster[x].pos[0] && player.pos[1] == monster[x].pos[1]){
                objects.backWall.style.display = "block"
                objects.backWall.style.backgroundImage = `url(img/monsternear.png)`
            }
        }

        let wall = ""

        wall += maze[player.pos[0]][player.pos[1]+1]
        wall += maze[player.pos[0]+1][player.pos[1]+1]

        objects.leftWall.style.backgroundPosition = `${96*(parseInt(wall[1])+1)*2}px ${216*(parseInt(wall[0])+1)*2}px`

        wall = ""

        wall += maze[player.pos[0]][player.pos[1]-1]
        wall += maze[player.pos[0]+1][player.pos[1]-1]

        objects.rightWall.style.backgroundPosition = `${96*(parseInt(wall[1])+1)*2}px ${216*(parseInt(wall[0])+1)*2}px`
    }

    if (player.dir == 1){
        document.querySelector(".backWall").style.display = "none"

        if (maze[player.pos[0]][player.pos[1]+1] != "0"){
            objects.backWall.style.display = "block"
            objects.backWall.style.backgroundImage = `url(img/wallnear.png)`
            if (maze[player.pos[0]][player.pos[1]+1] == "2"){
                objects.backWall.style.backgroundImage = `url(img/doornear.png)`
            }
        } else if (maze[player.pos[0]][player.pos[1]+2] == "1"){
            objects.backWallFar.style.backgroundImage = `url(img/wallfar.png)`
        } else if (maze[player.pos[0]][player.pos[1]+3] == "1"){
            objects.backWallFar.style.backgroundImage = `url(img/wallfarer.png)`
        } else {
            objects.backWallFar.style.backgroundImage = `url(img/hall.png)`
        }

        for (let x = 0; x < monster.length; x++){
            if (player.pos[0] == monster[x].pos[0] && player.pos[1]+2 == monster[x].pos[1]){
                objects.backWallFar.style.backgroundImage = `url(img/monsterfar.png)`
            }

            if (player.pos[0] == monster[x].pos[0] && player.pos[1]+1 == monster[x].pos[1]){
                objects.backWall.style.display = "block"
                objects.backWall.style.backgroundImage = `url(img/monsternear.png)`
            }
        }

        let wall = ""

        wall += maze[player.pos[0]-1][player.pos[1]]
        wall += maze[player.pos[0]-1][player.pos[1]+1]

        objects.leftWall.style.backgroundPosition = `${96*(parseInt(wall[1])+1)*2}px ${216*(parseInt(wall[0])+1)*2}px`

        wall = ""

        wall += maze[player.pos[0]+1][player.pos[1]]
        wall += maze[player.pos[0]+1][player.pos[1]+1]

        objects.rightWall.style.backgroundPosition = `${96*(parseInt(wall[1])+1)*2}px ${216*(parseInt(wall[0])+1)*2}px`
    }

    if (player.dir == 2){
        document.querySelector(".backWall").style.display = "none"

        if (maze[player.pos[0]-1][player.pos[1]] != "0"){
            objects.backWall.style.display = "block"
            objects.backWall.style.backgroundImage = `url(img/wallnear.png)`
            if (maze[player.pos[0]-1][player.pos[1]] == "2"){
                objects.backWall.style.backgroundImage = `url(img/doornear.png)`
            }
        } else if (maze[player.pos[0]-2][player.pos[1]] == "1"){
            objects.backWallFar.style.backgroundImage = `url(img/wallfar.png)`
        } else if (maze[player.pos[0]-3][player.pos[1]] == "1"){
            objects.backWallFar.style.backgroundImage = `url(img/wallfarer.png)`
        } else {
            objects.backWallFar.style.backgroundImage = `url(img/hall.png)`
        }

        for (let x = 0; x < monster.length; x++){
            if (player.pos[0]-2 == monster[x].pos[0] && player.pos[1] == monster[x].pos[1]){
                objects.backWallFar.style.backgroundImage = `url(img/monsterfar.png)`
            }

            if (player.pos[0]-1 == monster[x].pos[0] && player.pos[1] == monster[x].pos[1]){
                objects.backWall.style.display = "block"
                objects.backWall.style.backgroundImage = `url(img/monsternear.png)`
            }
        }

        let wall = ""

        wall += maze[player.pos[0]][player.pos[1]-1]
        wall += maze[player.pos[0]-1][player.pos[1]-1]

        objects.leftWall.style.backgroundPosition = `${96*(parseInt(wall[1])+1)*2}px ${216*(parseInt(wall[0])+1)*2}px`

        wall = ""

        wall += maze[player.pos[0]][player.pos[1]+1]
        wall += maze[player.pos[0]-1][player.pos[1]+1]

        objects.rightWall.style.backgroundPosition = `${96*(parseInt(wall[1])+1)*2}px ${216*(parseInt(wall[0])+1)*2}px`
    }

    if (player.dir == 3){
        document.querySelector(".backWall").style.display = "none"

        if (maze[player.pos[0]][player.pos[1]-1] != "0"){
            objects.backWall.style.display = "block"
            objects.backWall.style.backgroundImage = `url(img/wallnear.png)`
            if (maze[player.pos[0]][player.pos[1]-1] == "2"){
                objects.backWall.style.backgroundImage = `url(img/doornear.png)`
            }
        } else if (maze[player.pos[0]][player.pos[1]-2] == "1"){
            objects.backWallFar.style.backgroundImage = `url(img/wallfar.png)`
        } else if (maze[player.pos[0]][player.pos[1]-3] == "1"){
            objects.backWallFar.style.backgroundImage = `url(img/wallfarer.png)`
        } else {
            objects.backWallFar.style.backgroundImage = `url(img/hall.png)`
        }

        for (let x = 0; x < monster.length; x++){
            if (player.pos[0] == monster[x].pos[0] && player.pos[1]-2 == monster[x].pos[1]){
                objects.backWallFar.style.backgroundImage = `url(img/monsterfar.png)`
            }

            if (player.pos[0] == monster[x].pos[0] && player.pos[1]-1 == monster[x].pos[1]){
                objects.backWall.style.display = "block"
                objects.backWall.style.backgroundImage = `url(img/monsternear.png)`
            }
        }

        let wall = ""

        wall += maze[player.pos[0]+1][player.pos[1]]
        wall += maze[player.pos[0]+1][player.pos[1]-1]

        objects.leftWall.style.backgroundPosition = `${96*(parseInt(wall[1])+1)*2}px ${216*(parseInt(wall[0])+1)*2}px`

        wall = ""

        wall += maze[player.pos[0]-1][player.pos[1]]
        wall += maze[player.pos[0]-1][player.pos[1]-1]

        objects.rightWall.style.backgroundPosition = `${96*(parseInt(wall[1])+1)*2}px ${216*(parseInt(wall[0])+1)*2}px`
    }
    
    objects.overlay.style.display = "none"

    if (maze[player.pos[0]][player.pos[1]] == "2"){
        objects.overlay.style.display = "block"
    }

    let grid = ""
    for (let x = 0; x < maze.length; x++){
        if (x < 2){continue}
        grid += `<div style="width: max-content; height: 8px; display: flex; text-align: center">`
        for (let y = 0; y < maze[x].length; y++){
            if (y < 2){continue}
            grid += `<div style="width: 8px; height: 8px; background-color: `
            if (JSON.stringify([x,y]) == JSON.stringify(player.pos)){
                grid += "#006AB4"
            } else if (maze[x][y] != 0){
                grid += "#8A6042"
            } else {
                for (let z = 0; z < monster.length; z++){
                    if (JSON.stringify([x,y]) == JSON.stringify(monster[z].pos)){
                        grid += "#991515"
                        break
                    }
                }
            }
            grid += `;"></div>`
        }
        grid += `</div>`
    }

    document.querySelector(".map").innerHTML = grid
    document.querySelector(".map").style.paddingLeft = -((player.pos[0]*8)-10) + "px"
}

function startGame(){
    document.querySelector(".die").style.display = "none"
    document.querySelector(".title").style.display = "none"
    lastTaunt = Date.now()
    tick = Date.now()
    start = Date.now()
    lastMitosis = Date.now()

    maze = JSON.parse(atob(mazes[0])).maze

    if (mode == 1){
        let selection = Math.floor(Math.random()*mazes.length)

        document.querySelector(".textboxfar").style.opacity = "100%"
        document.querySelector(".textbox").style.opacity = "100%"
        document.querySelector(".textbox").innerHTML = renderString(`round ${score+1}: ${JSON.parse(atob(mazes[selection])).name}`)
        document.querySelector(".textboxfar").innerHTML = renderString(`round ${score+1}: ${JSON.parse(atob(mazes[selection])).name}`)

        setTimeout(()=>{
            document.querySelector(".textboxfar").style.opacity = "0%"
            document.querySelector(".textbox").style.opacity = "0%" 
        }, 5000)
        
        maze = JSON.parse(atob(mazes[selection])).maze
    }

    if (mode == 0){
        document.querySelector(".textboxfar").style.opacity = "100%"
        document.querySelector(".textbox").style.opacity = "100%"
        document.querySelector(".textbox").innerHTML = renderString(`[arrow keys] to move`)
        document.querySelector(".textboxfar").innerHTML = renderString(`[arrow keys] to move`)
        
        setTimeout(()=>{
            document.querySelector(".textboxfar").style.opacity = "0%"
            document.querySelector(".textbox").style.opacity = "0%" 
        }, 3000)

        setTimeout(()=>{
            document.querySelector(".textboxfar").style.opacity = "100%"
            document.querySelector(".textbox").style.opacity = "100%"
            document.querySelector(".textbox").innerHTML = renderString(`[x] to pull out the map`)
            document.querySelector(".textboxfar").innerHTML = renderString(`[x] to pull out the map`)
        }, 5000)

        setTimeout(()=>{
            document.querySelector(".textboxfar").style.opacity = "0%"
            document.querySelector(".textbox").style.opacity = "0%" 
        }, 8000)
    }

    player = {
        "pos": [3, 3],
        "dir": 0,
        "stamina": 100,
        "fear": 0,
        "lastMove": 0,
        "trip": false,
        "petrified": false,
        "dead": false,
        "map": false,
        "control": true
    }

    monster = [
        {
            "pos": [15, 15],
            "dir": 2,
            "distance": 0,
        }
    ]

    if (mode == 1){
        if (score >= 2){
            for (let x = 0; x < Math.floor(score/2); x++){
                double()
            }
        }
    }

    monsterInterval = setInterval(()=>{
        for (let x = 0; x < monster.length; x++){
            setTimeout(()=>{
                if (monster[x].dir == 0){
                    if (maze[monster[x].pos[0]+1][monster[x].pos[1]] == "0"){
                        monster[x].pos[0]++
                        if (monster[x].distance <= 10){
                            playSound("audio/stepEvil.mp3", (10-monster[x].distance)*10)
                        }
                    }

                    let turn = Math.random()

                    if (maze[monster[x].pos[0]][monster[x].pos[1]+1] == "0" && turn <= 0.5){
                        monster[x].dir++
                    } else if (maze[monster[x].pos[0]][monster[x].pos[1]-1] == "0" && turn >= 0.5){
                        monster[x].dir--
                    } else if (maze[monster[x].pos[0]+1][monster[x].pos[1]] != "0"){
                        monster[x].dir -= 2
                    }
                } else if (monster[x].dir == 1){
                    if (maze[monster[x].pos[0]][monster[x].pos[1]+1] == "0"){
                        monster[x].pos[1]++
                        if (monster[x].distance <= 10){
                            playSound("audio/stepEvil.mp3", (10-monster[x].distance)*10)
                        }
                    }

                    let turn = Math.random()

                    if (maze[monster[x].pos[0]-1][monster[x].pos[1]] == "0" && turn <= 0.5){
                        monster[x].dir++
                    } else if (maze[monster[x].pos[0]+1][monster[x].pos[1]] == "0" && turn >= 0.5){
                        monster[x].dir--
                    } else if (maze[monster[x].pos[0]][monster[x].pos[1]+1] != "0"){
                        monster[x].dir -= 2
                    }
                } else if (monster[x].dir == 2){
                    if (maze[monster[x].pos[0]-1][monster[x].pos[1]] == "0"){
                        monster[x].pos[0]--
                        if (monster[x].distance <= 10){
                            playSound("audio/stepEvil.mp3", (10-monster[x].distance)*10)
                        }
                    }

                    let turn = Math.random()

                    if (maze[monster[x].pos[0]][monster[x].pos[1]-1] == "0" && turn <= 0.5){
                        monster[x].dir++
                    } else if (maze[monster[x].pos[0]][monster[x].pos[1]+1] == "0" && turn >= 0.5){
                        monster[x].dir--
                    } else if (maze[monster[x].pos[0]-1][monster[x].pos[1]] != "0"){
                        monster[x].dir -= 2
                    }
                } else if (monster[x].dir == 3){
                    if (maze[monster[x].pos[0]][monster[x].pos[1]-1] == "0"){
                        monster[x].pos[1]--
                        if (monster[x].distance <= 10){
                            playSound("audio/stepEvil.mp3", (10-monster[x].distance)*10)
                        }
                    }

                    let turn = Math.random()

                    if (maze[monster[x].pos[0]-1][monster[x].pos[1]] == "0" && turn <= 0.5){
                        monster[x].dir++
                    } else if (maze[monster[x].pos[0]+1][monster[x].pos[1]] == "0" && turn >= 0.5){
                        monster[x].dir--
                    } else if (maze[monster[x].pos[0]][monster[x].pos[1]-1] != "0"){
                        monster[x].dir -= 2
                    }
                }

                if (monster[x].dir > 3){
                    monster[x].dir -= 4
                }
                if (monster[x].dir < 0){
                    monster[x].dir += 4
                }

                if (monster[x].pos[0] == player.pos[0] && monster[x].pos[1] == player.pos[1]){
                    player.dead = true
                }
            }, Math.random()*1000)
        }

        if (lastTaunt < Date.now()-10000 && (Date.now()-lastMitosis)/1000 > 120){
            lastMitosis = Date.now()
            double()
            playTaunt("divideAndConquer")
        }

        if (lastTaunt < Date.now()-10000-(100000*Math.random())){
            playTaunt(Object.keys(subData)[Math.floor(Math.random()*(Object.keys(subData).length-7))])
        }
    }, 1000)

    playerInterval = setInterval(()=>{
        let d = (Date.now()-tick)/1000
        tick = Date.now()

        if (!player.dead){
            calcWalls()
        }

        if (!player.trip && !player.petrified && player.control){
            if (key.ArrowUp && !held.ArrowUp && !player.map){
                held.ArrowUp = true

                let tempPos = Object.assign([], player.pos)
                tempPos[player.dir%2] += [1, -1][Math.floor(player.dir/2)]
                if (maze[tempPos[0]][tempPos[1]] != "1"){
                    player.pos[player.dir%2] += [1, -1][Math.floor(player.dir/2)]

                    if (Date.now()-player.lastMove > 250){
                        player.stamina -= 1*(1+(player.fear/100))
                    } else {
                        player.stamina -= (1000/(Date.now()-player.lastMove))*(1+(player.fear/100))
                    }

                    player.lastMove = Date.now()

                    playSound("audio/step.mp3")

                    if (maze[player.pos[0]][player.pos[1]] == "2"){
                        player.dir -= 2
                    }
                }
            }

            if (key.ArrowDown && !held.ArrowDown && maze[player.pos[0]][player.pos[1]] != "2" && !player.map){
                held.ArrowDown = true

                let tempPos = Object.assign([], player.pos)
                tempPos[player.dir%2] += [-1, 1][Math.floor(player.dir/2)]
                if (maze[tempPos[0]][tempPos[1]] != "1"){
                    if (Date.now()-player.lastMove > 250){
                        player.stamina -= 1*(1+(player.fear/100))
                    } else {
                        player.stamina -= (1000/(Date.now()-player.lastMove))*(1+(player.fear/100))
                    }

                    player.lastMove = Date.now()

                    playSound("audio/step.mp3")
                    
                    player.pos[player.dir%2] += [-1, 1][Math.floor(player.dir/2)]
                }
            }

            if (key.ArrowLeft && !held.ArrowLeft && maze[player.pos[0]][player.pos[1]] != "2"){
                held.ArrowLeft = true
                player.dir++
            }

            if (key.ArrowRight && !held.ArrowRight && maze[player.pos[0]][player.pos[1]] != "2"){
                held.ArrowRight = true
                player.dir--
            }

            if (key.x & !held.x){
                held.x = true
                if (player.map){
                    playSound("audio/mapClose.mp3")
                } else {
                    playSound("audio/mapOpen.mp3")
                }

                player.map = !player.map
            }
        }

        if (player.dir > 3){
            player.dir -= 4
        }
        if (player.dir < 0){
            player.dir += 4
        }

        let chars = document.querySelectorAll(".char")
        for (let x = 0; x < chars.length; x++){
            let move = [Math.random()*0.5*[-1, 1][Math.round(Math.random())], Math.random()*0.5*[-1, 1][Math.round(Math.random())]]
            chars[x].style.marginLeft  = move[0] + "px"
            chars[x].style.paddingLeft = move[0] + "px"
            chars[x].style.marginTop   = move[1] + "px"
            chars[x].style.paddingTop  = move[1] + "px"
        }

        document.querySelector(".stamina").style.height = `${player.stamina}%`
        document.querySelector(".fear").style.height = `${player.fear}%`
        
        document.querySelector(".maps").style.height = `${["768", "512"][player.map+0]}px`
        document.querySelector(".maps").style.width = `${["576", "512"][player.map+0]}px`

        if (player.stamina < 0){
            player.stamina = 0
            player.fear = 100
            player.trip = true
            player.map = false
            playSound("audio/fall.mp3")
            document.querySelector(".walls").style.top = "-80px"
        }
        
        if (Date.now()-player.lastMove > 0){
            player.stamina += (Date.now()-player.lastMove)*d/100
        }
        
        if (player.stamina >= 100){
            player.stamina = 100
            
            if (player.trip){
                player.trip = false
                playSound("audio/recovery.mp3")
            }
            document.querySelector(".walls").style.top = "0px"
        }

        if (!player.control){
            player.fear -= (Date.now()-player.lastMove)*d/1000
        } else if (maze[player.pos[0]][player.pos[1]] == "2"){
            player.fear += (Date.now()-player.lastMove)*d/1000
        } else {
            let fearCache = String(player.fear)
            for (let x = 0; x < monster.length; x++){
                if ((10-(monster[x].distance*2)) > 0){
                    player.fear += (10-(monster[x].distance*2))/monster.length*d
                }
            }
            if (fearCache == String(player.fear)){
                player.fear -= 5*d
            }
        }
        
        if (player.fear < 0){
            player.fear = 0
            document.querySelector(".walls").style.left = "0px"
        } else {
            document.querySelector(".walls").style.left = player.fear*(Math.sin(Date.now()))/20 + "px"
        }
        
        if (player.fear > 100){
            player.fear = 100
            player.petrified = true

            if (maze[player.pos[0]][player.pos[1]] == "2"){
                player.pos[player.dir%2] += [1, -1][Math.floor(player.dir/2)]
            }
        }

        if (player.fear < 90){
            player.petrified = false
        }

        document.body.style.filter = `blur(${4-(player.stamina/25)}px)`

        if (player.dead){
            document.body.style.filter = `blur(0px)`
        }
        
        if (player.control){
            document.querySelector(".timer").innerHTML = renderString(renderTime(Date.now()-start))
            document.querySelector(".timerBlur").innerHTML = renderString(renderTime(Date.now()-start))
            if (mode == 1){
                document.querySelector(".score").innerHTML = renderString(")( " + Math.round((score+((Date.now()-start)/300000))*100)/100)
                document.querySelector(".scoreBlur").innerHTML = renderString(")( " + Math.round((score+((Date.now()-start)/300000))*100)/100)
            } else {
                document.querySelector(".score").innerHTML = ""
                document.querySelector(".scoreBlur").innerHTML = ""
            }
        }

        for (let x = 0; x < monster.length; x++){
            monster[x].distance = distance(Math.abs(player.pos[0] - monster[x].pos[0]), Math.abs(player.pos[1] - monster[x].pos[1]))
        }

        if (player.dead && player.control){

            document.querySelector(".backWall").style.display = "block"
            document.querySelector(".backWall").style.backgroundImage = `url(img/monsternear.png)`

            if (mode == 0){
                unlockMedal(84947)
                if (!offline && !cheat){NGIO.postScore(15010, Date.now()-start, function(){})}
                if (!offline && !cheat){NGIO.postScore(15011, Date.now()-start, function(){})}
                if (!offline && !cheat){NGIO.postScore(15012, Date.now()-start, function(){})}

                player.control = false
                player.map = false

                clearInterval(monsterInterval)

                player.stamina = -1
                player.lastMove = Date.now()+10000
                
                setTimeout(()=>{playTaunt("ending1")}, 0)
                setTimeout(()=>{playTaunt("ending2")}, 5000)
                setTimeout(()=>{playTaunt("ending3")}, 8000)
                setTimeout(()=>{playTaunt("ending5")}, 14000)
                setTimeout(()=>{playTaunt("ending6")}, 22000)
                setTimeout(()=>{playTaunt("ending4")}, 30000)
                setTimeout(()=>{
                    clearInterval(playerInterval)
                    playerInterval = "Ended"
                    playCredits()
                }, 36000)
                
                document.querySelector(".gameovertext").innerHTML = renderStrings(['The End'])
                return
            }

            document.body.style.filter = `none`

            if (mode == 1){
                document.querySelector(".die").style.display = "block"
                if (!offline && !cheat){NGIO.postScore(15012, (score*300000)+(Date.now()-start), function(){})}
                if (!offline && !cheat){NGIO.postScore(15013, Math.round((score+((Date.now()-start)/300000))*100), function(){})}
                if (!offline && !cheat){NGIO.postScore(15014, Math.round((score+((Date.now()-start)/300000))*100), function(){})}
                clearInterval(monsterInterval)
                clearInterval(playerInterval)
                playerInterval = "Ended"

                document.querySelector(".gameovertext").innerHTML = renderStrings(['Game Over', ('Score: )( ' + Math.round((score+((Date.now()-start)/300000))*100)/100), ('Time: ' + renderTime((score*300000)+(Date.now()-start)))])
                return
            }
            
        }

        if (mode == 1 && Date.now()-start > 300000){
            clearInterval(monsterInterval)
            clearInterval(playerInterval)
            score++

            if (unlockMedal(85002, score >= 2)){}
            if (unlockMedal(85003, score >= 4)){}
            if (unlockMedal(85004, score >= 6)){}
            if (unlockMedal(85005, score >= 8)){}
            if (unlockMedal(85006, score >= 10)){}
            
            startGame()
            return
        }
    }, 1000/60)
}

setInterval(()=>{
    if (playerInterval != "Ended"){
        return
    }

    if (document.querySelector(".credits").style.display != "none"){return}

    if (document.querySelector(".title").style.display != "none"){
        if (key.z && !held.z){
            held.z = true

            switch (title.options[title.selection]){
                case "start":
                    mode = 0
                    startGame()
                    break
                
                case "endless )(":
                    mode = 1
                    score = 0
                    startGame()
                    break

                case "fullscreen":
                    window.open(window.location.href, '_blank').focus()
                    break

                case "editor":
                    window.open("./editor.html", '_blank').focus()
                    break

                case "credits":
                    playCredits(true)
                    break
                
                case "import maze":
                    let newMaze = prompt("Please enter a maze code", "")
                    if (newMaze != null && !maze.includes(newMaze)){
                        mazes.push(newMaze)
                        mazePacks.push(newMaze)
                        localStorage.setItem("MAZEMAZES", JSON.stringify(mazePacks))
                    }
                    break

                case "clear mazes":
                    mazePacks = []
                    localStorage.setItem("MAZEMAZES", JSON.stringify(mazePacks))
                    location.reload()
                    break
                    
            }

            buildTitle()
            return
        }

        if ((key.ArrowUp && !held.ArrowUp || key.ArrowDown && !held.ArrowDown)){
            held.ArrowUp = key.ArrowUp
            held.ArrowDown = key.ArrowDown

            if (held.ArrowUp && title.selection > 0){
                playSound("audio/stepEvil.mp3")
                title.selection--
            } else if (held.ArrowDown && title.selection < title.options.length-1){
                playSound("audio/stepEvil.mp3")
                title.selection++
            }

            buildTitle()
            return
        }
    }

    if (document.querySelector(".die").style.display != "none"){
        if (key.z && !held.z){
            held.z = true
            buildTitle()
            document.querySelector(".die").style.display = "none"
            document.querySelector(".title").style.display = "block"
        }
    }
}, 1000/60)

buildTitle()

let cheat = false
let cheatDetect = setInterval(()=>{
    try {
        if (top.innerWidth < top.outerWidth-20 && !mobile){
            clearInterval(cheatDetect)
            cheat = true
            alert("Score submitting is disabled for this session due to the console being opened, local scores will also not be saved to prevent cheating the medals")
        }
    } catch (e){
        console.error(e)
        clearInterval(cheatDetect)
        console.log("I'm fine with cheating, however please do it in the fullscreen version, as that blocks cheating leaderboards and medals, keep it fair for others please :)\nI hate CORS")
    }
}, 1000/60)