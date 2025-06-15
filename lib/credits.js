let credits = [
    "",
    "BY JACOB A. G. TAYLOR",
    "",
    "Chromatic Aberration Filter",
    "Amagi <fand>",
    "https://codepen.io/fand/pen/EgGwjg",
    "",
    "PLAYTESTERS",
    "THOMAS BAKER",
    "JACOB VINCENT",
    "MOLLY HALLETT",
    "",
    "SPECIAL THANKS",
    "THOMAS BAKER",
    "FOR GIVING ME THE IDEA FOR ENDLESS",
    "MODE BY COMPARING THE GAME TO FNAF",
    "",
    "Yes, I did spend two weeks making this game",
    "just for the maze understanding joke",
    "",
    "THANK YOU FOR PLAYING",
    "[:",
    ""
]

document.querySelector(".creditsText").innerHTML = `<div style="height: 512px;"></div><div style="background-image: url(img/logo.png); width: 64px; height: 92px; margin: auto; background-size: cover;"></div>` + renderStrings(credits) + `<div style="height: 256px; width: 256px; margin: auto; background-image: url(img/tesco.png);"></div><div style="height: 600px;"></div>`

function playCredits(long = false){
    let startTime = Date.now()
    let creditsMusic = new Audio(["audio/snd_laughtrack_short.mp3", "audio/credits.mp3"][long+0], 15)
    let creditsText = document.querySelector(".creditsText")
    
    creditsMusic.volume = 0.5
    creditsMusic.play()

    document.querySelector(".credits").style.display = "block"

    let creditslife = setInterval(function(){
        let creditsScroll = 0

        if (!mobile){
            creditsScroll = ((creditsText.getBoundingClientRect().height)-512)*(creditsMusic.currentTime / creditsMusic.duration)
        } else {
            creditsScroll = ((creditsText.getBoundingClientRect().height)-512)*(((Date.now()-startTime)/1000) / [5, 20][long+0])
        }

        creditsText.style.marginTop = "-" + Math.round(creditsScroll) + "px"

        // frame rate of the credits drops if you don't have this?
        if (creditsMusic.playbackRate = 1){
            creditsMusic.playbackRate = 0.99999
        } else {
            creditsMusic.playbackRate = 1
        }

        if ((creditsMusic.currentTime / creditsMusic.duration) >= 1 && !mobile || (((Date.now()-startTime)/1000) / [5, 20][long+0]) >= 1 && mobile){
            clearInterval(creditslife)
            document.querySelector(".credits").style.display = "none"
            document.querySelector(".title").style.display = "block"
            if (!title.options.includes("credits")){
                title.options.push("credits")
            }
            buildTitle()
        }
    }, 10)
}