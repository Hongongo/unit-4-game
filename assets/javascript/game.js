characters = [
    {
        "id"      : 4,
        "name"    : "Jeff",
        "hp"      : 100,
        "attack"  : 12,
        "counter"  : 12,
        "avatar"  : "./assets/images/jeff.png"
    },
    {
        "id"      :12,
        "name"    : "Ness",
        "hp"      : 110,
        "attack"  : 10,
        "counter"  : 8,
        "avatar"  : "./assets/images/ness.png"
    },
    {
        "id"      : 22,
        "name"    : "Paula",
        "hp"      : 130,
        "attack"  : 11,
        "counter"  : 7,
        "avatar"  : "./assets/images/paula.png"
    },
    {
        "id"      : 38,
        "name"    : "Poo",
        "hp"      : 180,
        "attack"  : 18,
        "counter"  : 5,
        "avatar"  : "./assets/images/poo.png"
    }
];

// Variables
var player;
var currentOpponent;

// Hide restart button
$('#restart-button').addClass("invisible");

function savePlayer(playerId) {
    characters.forEach(character => {
        if (character.id == playerId) {
            player = character;
        }
    });
}
function saveOpponent(id) {
    characters.forEach(character => {
        if (character.id == id) {
            currentOpponent = character;
        }
    });
}

function renderCard(character) {
    var card = $("<div>");
    var avatar = "<img src='"+character.avatar+"'>";
    var name = "<h3>"+character.name+"</h3>";
    var hp = "<h4 id='hp"+character.id+"'>"+character.hp+" HP</h4>";
    card.addClass("card");
    card.attr("id", character.id);
    card.html(name);
    card.append(avatar);
    card.append(hp);
    return card;
}

function renderCards(){
    characters.forEach(character => {
        $("#characters").append(renderCard(character));
    });
}

function renderOpponents(playerId) {
    characters.forEach(character => {
        if (character.id == playerId) {
            var theCard = $('#' + character.id);
            theCard.addClass("the-player");
            $('#characters').append(theCard);
        } else {
            var theCard = $('#' + character.id);
            theCard.addClass("the-enemies");
            $('#characterss').append(theCard);
        }
    });
}
renderCards()

$(".card").click(function () {
    if (this.parentElement.id === "characters") {
        if (document.getElementById("fight-section").firstChild === null) {
            savePlayer(this.id);
            renderOpponents(this.id);
        }
    } else if (this.parentElement.id === "characterss") { // Is an opponent
        if (!document.getElementById("fight-section").firstChild) { // Check if there are enemies in the defender area
            saveOpponent(this.id);
            var theCard =  $('#' + this.id);
            theCard.removeClass("the-enemies");
            theCard.addClass("the-defender");
            $('#fight-section').append(this);
            fightLog.html("");
        }
    } else {
        // Do nothing
    }
});

/**
 *
 * Attack Logic
 */

var exp = 1;
var fightLog = $('#fight-log');
$("#attack-button").click(function () {
    console.log("ATTACKED!!");
    if (document.getElementById("fight-section").firstChild !== null) { // Check is there an enemy selected
        currentOpponent.hp -= (player.attack * exp);
        $('#hp' + currentOpponent.id).text(currentOpponent.hp + " HP");
        if (currentOpponent.hp < 1){ // Opponent defeated
            $('#' + currentOpponent.id).remove();
            fightLog.html("You have defeated " + currentOpponent.name + ", you can choose another enemy");
            exp +=1;
            // Check if there are enemies left
            if (document.getElementById("characterss").firstChild === null){
                fightLog.html("You Won!! GAME OVER!!");
                $('#restart-button').removeClass("invisible");
                $('#restart-button').addClass("visible");
            }
        } else { // Here comes the counter
            fightLog.html("You attacked " + currentOpponent.name + " for " + (player.attack * exp) + " damage. <br>" +
                "" + currentOpponent.name + " attacked you back for " + currentOpponent.counter + " damage");
            player.hp -= currentOpponent.counter;
            $('#hp' + player.id).text(player.hp + " HP");
            if (player.hp < 1) { // Player is defeated
                fightLog.html("You been defeated... GAME OVER!!!");
                $('#restart-button').removeClass("invisible");
                $('#restart-button').addClass("visible");
            } else {
                // Battle Continues
                exp +=1;
            }
        }
    } else {
        console.log("NO OPPONENT SELECTED");
        fightLog.html("No opponent here");
    }
});

/**
 *
 * Restart
 */

$('#restart-button').click(function () {
    location.reload();
});


