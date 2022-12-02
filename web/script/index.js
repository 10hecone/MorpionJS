let table = {
    game: {
        start: false,
    },
    morpion: undefined
};

async function play(btn) {
    if(table.game.start === false) {
        const MorpionClass = await import('../module/Morpion/index.js');
        table.game.start = true;
        table.morpion = new MorpionClass.Morpion();;
        table.morpion.start({evolutin: true});
    };
    coup("X", btn);
};

function setTable(player, id) {
    document.getElementById(id).innerText = player;
    document.getElementById(id).disabled = true;
    document.getElementById(id).style.cursor = "not-allowed";
    document.getElementById(id).style.color = "rgb(0, 0, 0)";
};

function reset() {
    for(let i = 1; i <= 9; i++) {
        document.getElementById(i).disabled = false;
        document.getElementById(i).style.cursor = "pointer";
        document.getElementById(i).innerText = "X";
        document.getElementById(i).style.color = "rgb(112, 112, 112)";
        table.game.start = false;
    };
    for(let i = 1; i <= 1000; i++) {
        document.getElementById("reset").style.opacity = -0.001;
    };
    document.getElementById("reset").style.visibility = "hidden";
};

function coup(player, id) {
    if(table.morpion.checkIdValue(id) !== 0) return alert("Ce coup n'est pas possible.");
    if(table.morpion.res.win === undefined) {
        if(table.morpion.tour === player) {
            setTable(player, id);
            table.morpion.player(id);
            if(table.morpion.res.win === undefined) {
                table.morpion.bot();
                setTable('O', table.morpion.ancienTour);
            };
            if(table.morpion.res.win !== undefined) {
                for(let i = 1; i <= 9; i++) {
                    document.getElementById(i).disabled = true;
                    document.getElementById(i).style.cursor = "not-allowed";
                };
                document.getElementById("reset").style.visibility = "visible";
                document.getElementById("reset").style.opacity = 1;
            };
        };
    };
};