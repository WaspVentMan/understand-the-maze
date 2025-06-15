let subData = {
    "whereAreYou": {
        "text": [
            [0.7, "WHERE"],
            [2, "ARE"],
            [3, "YOU?"],
            [5, "/end"]
        ]
    },
    "dontRun": {
        "text": [
            [0.3, "DONT"],
            [2.2, "RUN"],
            [4, "/end"]
        ]
    },
    "comeBackHere": {
        "text": [
            [0.3, "COME"],
            [1.2, "BACK"],
            [2.2, "HERE"],
            [4, "/end"]
        ]
    },
    "areYouLost": {
        "text": [
            [0.3, "ARE"],
            [1.2, "YOU"],
            [2.2, "LOST?"],
            [4, "/end"]
        ]
    },
    "iWontHurtYou": {
        "text": [
            [0.4, "I"],
            [1.6, "WONT"],
            [2.7, "HURT"],
            [3.8, "YOU"],
            [5.5, "/end"]
        ]
    },
    "divideAndConquer": {
        "text": [
            [0.6, "DIVIDE"],
            [2.1, "AND"],
            [3.5, "CONQUER"],
            [5, "/end"]
        ]
    },
    "ending1": {
        "text": [
            [0.1, "I"],
            [1, "FOUND"],
            [2, "YOU"],
            [4, "/end"]
        ]
    },
    "ending2": {
        "text": [
            [0.2, "OH"],
            [1, "SHIT"],
            [2.5, "/end"]
        ]
    },
    "ending3": {
        "text": [
            [0.2, "ARE"],
            [1, "YOU"],
            [1.9, "ALRIGHT?"],
            [3.75, "/end"]
        ]
    },
    "ending4": {
        "text": [
            [0.2, "THIS"],
            [0.9, "IS"],
            [1.3, "ONE"],
            [2.5, "BIG"],
            [3.5, "MAZE"],
            [4.1, "UNDERSTANDING"],
            [6.2, "/end"]
        ]
    },
    "ending5": {
        "text": [
            [0.2, "I"],
            [1.1, "DIDNT"],
            [2.1, "WANT"],
            [2.7, "TO"],
            [3, "HURT"],
            [4.1, "YOU"],
            [5.8, "/end"]
        ]
    },
    "ending6": {
        "text": [
            [0.2, "I"],
            [0.9, "WANTED"],
            [2, "TO"],
            [2.3, "SHOW"],
            [3.1, "YOU"],
            [3.6, "THE"],
            [4.3, "EXIT"],
            [6, "/end"]
        ]
    }
}

function playTaunt(title){
    lastTaunt = Date.now()
    
    document.querySelector(".textbox").innerHTML = ""
    document.querySelector(".textboxfar").innerHTML = ""

    let taunt = new Audio(`audio/dialogue/${title}.mp3`)
    taunt.play()

    let tauntfar = new Audio(`audio/dialogue/far/${title}.mp3`)
    tauntfar.play()

    let distance = 100

    for (let x = 0; x < monster.length; x++){
        if (monster[x].distance < distance){
            distance = monster[x].distance
        }
    }

    if (distance > 10){
        taunt.volume = 0
        tauntfar.volume = 0
        document.querySelector(".textboxfar").style.opacity = "0%"
        document.querySelector(".textbox").style.opacity = "0%"
    } else if (distance >= 5){
        taunt.volume = 0
        tauntfar.volume = (5-(distance-5))/5
        document.querySelector(".textboxfar").style.opacity = (5-(distance-5))*20 + "%"
        document.querySelector(".textbox").style.opacity = "0%"
    } else if (distance < 5 && distance > 0){
        taunt.volume = (5-distance)/5
        document.querySelector(".textboxfar").style.opacity = "100%"
        document.querySelector(".textbox").style.opacity = (10-distance)*10 + "%"
    } else {
        taunt.volume = 1
        document.querySelector(".textboxfar").style.opacity = "100%"
        document.querySelector(".textbox").style.opacity = "50%"
    }
    
    let index = 0
    let subloop = setInterval(()=>{
        let distance = 100
        for (let x = 0; x < monster.length; x++){
            if (monster[x].distance < distance){
                distance = monster[x].distance
            }
        }

        if (distance > 10){
            taunt.volume = 0
            tauntfar.volume = 0
            document.querySelector(".textboxfar").style.opacity = "0%"
            document.querySelector(".textbox").style.opacity = "0%"
        } else if (distance >= 5){
            taunt.volume = 0
            tauntfar.volume = (5-(distance-5))/5
            document.querySelector(".textboxfar").style.opacity = (5-(distance-5))*20 + "%"
            document.querySelector(".textbox").style.opacity = "0%"
        } else if (distance < 5 && distance > 0){
            taunt.volume = (5-distance)/5
            document.querySelector(".textboxfar").style.opacity = "100%"
            document.querySelector(".textbox").style.opacity = (10-distance)*10 + "%"
        } else {
            taunt.volume = 1
            document.querySelector(".textboxfar").style.opacity = "100%"
            document.querySelector(".textbox").style.opacity = "50%"
        }

        if (taunt.currentTime > subData[title].text[index][0]){
            if (subData[title].text[index][1] == "/end"){
                clearInterval(subloop)
                document.querySelector(".textbox").style.opacity = "0%"
                document.querySelector(".textboxfar").style.opacity = "0%"
                return
            }
            let string = subData[title].text[index][1]

            document.querySelector(".textbox").innerHTML += renderString(" ")
            document.querySelector(".textbox").innerHTML += renderString(string)
            document.querySelector(".textboxfar").innerHTML += renderString(" ")
            document.querySelector(".textboxfar").innerHTML += renderString(string)
            index++
        }
    },0)
}