let title = {
    "selection": 0,
    "options": [
        "start",
        "endless )(",
        "editor",
        "import maze",
        "clear mazes"
    ]
}

if (window.location != window.parent.location){
    title.options.push("fullscreen")
}

function buildTitle(){
    let titleBuild = []
    for (let x = 0; x < title.options.length; x++){
        titleBuild.push("")
        if (title.selection == x){
            titleBuild.push("> " + title.options[x] + " <")
        } else {
            titleBuild.push(title.options[x])
        }
    }

    document.querySelector(".select").innerHTML = renderStrings(titleBuild)
}