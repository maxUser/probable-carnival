// Globals
var word = "";
var correct_guesses = [];
var incorrect_guesses = [];
var words = ["account", "allow", "anywhere", "attached", "audience", "available", "balloon", "bare", "bark", "begun", "bent", "biggest", "bill", "blank", "blew", "breathing", "butter", "cap", "carbon", "card", "chain", "cheese", "chest", "chicago", "choice", "circus", "citizen", "classroom", "college", "consist", "continent", "conversation", "courage", "cowboy", "creature", "date", "depend", "differ", "discovery", "disease", "duck", "due", "dutch", "entirely", "environment", "exclaimed", "factor", "fog", "forgot", "forgotten", "frozen", "fuel", "furniture", "gather", "gentle", "globe", "grandfather", "greatly", "helpful", "hidden", "honor", "husband", "involved", "japan", "jet", "layers", "leaf", "leather", "load", "lonely", "march", "meal", "medicine", "merely", "mice", "molecular", "musical", "native", "noon", "occur", "orange", "ought", "pack", "partly", "pet", "pine", "pink", "pitch", "pool", "prepare", "press", "prevent", "pure", "queen", "rabbit", "ranch", "realize", "receive", "recently", "rice", "rising", "rocket", "saturday", "saved", "sedentary", "shade", "shadow", "shirt", "shoot", "shorter", "silence", "slipped", "smith", "snake", "somewhere", "spoken", "standard", "straw", "strip", "substance", "suggest", "sunday", "teach", "tears", "thirty", "thread", "throat", "tight", "tin", "triangle", "truth", "union", "warn", "whispered", "wool"];

function one_player_selected() {
    word = get_random_word()
    document.getElementById("player_pick_screen").style.display = "none";
    document.getElementById("guess_word_screen").style.display = "block";
    for (var i = 0; i < word.length; i++) {
        correct_guesses.push("___ ");
    }
    print_hidden_word()
}

function two_players_selected() {
    document.getElementById("player_pick_screen").style.display = "none";
    document.getElementById("word_pick_screen").style.display = "block";
}

function get_random_word() {
    var ind = Math.floor((Math.random() * words.length) + 1)-1;
    return words[ind]
}

function check_word(word) {
    let re = /^[a-zA-Z]+$/
    var x = re.test(word);
    return x;
}

function show_hangman_game() {
    var x = document.getElementById("hangman_game");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function restart() {
    word = "";
    correct_guesses = [];
    incorrect_guesses = [];

    document.getElementById("player_pick_screen").style.display = "block";
    document.getElementById("guess_word_screen").style.display = "none";
    document.getElementById("restart_btn").style.display = "none";
    document.getElementById("winner").style.display = "none";
    document.getElementById("word_to_guess").value = "";
    document.getElementById("incorrect").innerHTML = "";
    print_hangman();
}

function save_word() {

    word = document.getElementById("word_to_guess").value;
    if (check_word(word)===false) {
        alert("A valid word contains ONLY alphabetic characters.");
        return;
    } else {
        word = word.toLowerCase();
    }

    document.getElementById("word_pick_screen").style.display = "none";
    document.getElementById("guess_word_screen").style.display = "block";
    for (var i = 0; i < word.length; i++) {
        correct_guesses[i] = "___ ";
    }
    print_hidden_word()
}

function print_hidden_word() {
    var temp = correct_guesses
    document.getElementById("hidden_word").innerHTML = temp.join(" ");
}

function print_incorrect_guesses() {
    document.getElementById("incorrect").innerHTML = incorrect_guesses;
}

function print_hangman() {
    var zero = document.getElementById("0_incorrect");
    var one = document.getElementById("1_incorrect");
    var two = document.getElementById("2_incorrect");
    var three = document.getElementById("3_incorrect");
    var four = document.getElementById("4_incorrect");
    var five = document.getElementById("5_incorrect");
    var six = document.getElementById("6_incorrect");

    if (incorrect_guesses.length === 0) {
        zero.style.display = "block";
        one.style.display = "none";
        two.style.display = "none";
        three.style.display = "none";
        four.style.display = "none";
        five.style.display = "none";
        six.style.display = "none";
    } else if (incorrect_guesses.length === 1) {
        zero.style.display = "none";
        one.style.display = "block";
    } else if (incorrect_guesses.length === 2) {
        one.style.display = "none";
        two.style.display = "block";
    } else if (incorrect_guesses.length === 3) {
        two.style.display = "none";
        three.style.display = "block";
    } else if (incorrect_guesses.length === 4) {
        three.style.display = "none";
        four.style.display = "block";
    } else if (incorrect_guesses.length === 5) {
        four.style.display = "none";
        five.style.display = "block";
    } else if (incorrect_guesses.length === 6) {
        five.style.display = "none";
        six.style.display = "block";
    }
}

function check_guess() {
    var win = true;
    var letter = document.getElementById("guess").value;
    if (letter === "") {
        return;
    }
    letter = letter.toLowerCase();
    var correct_ind = []; // hold all indicies where the letter occurs in the word
    for (var i = 0; i < word.length; i++) {
        // check if the letter guessed is in the word
        if (word[i] === letter) {
            // if letter is found within word,
            // push index onto array
            correct_ind.push(i);
        }
    }

    var correct_ind_length = correct_ind.length
    if (correct_ind.length > 0) {
        // if a correct guess has been made
        for (var i = 0; i < correct_ind_length; i++) {
            // put the letter in the correct index in the array,
            // that contains all correct guesses of the player.
            correct_guesses[correct_ind[i]] = letter;
        }
    } else {
        incorrect_guesses.push(letter);
    }
    print_hidden_word();
    print_incorrect_guesses();

    // check if all letters guessed
    for (var i = 0; i < correct_guesses.length; i++) {
        if (correct_guesses[i] === "___ ") {
            win = false;
        }
    }
    // win condition
    if (win===true) {
        document.getElementById("winner").style.display = "block";
        document.getElementById("winner").innerHTML = "YOU WIN";
        document.getElementById("restart_btn").style.display = "block";
    } else {
        print_hangman();
    }
    // lose condition
    if (incorrect_guesses.length === 6) {
        for (var i = 0; i < correct_guesses.length; i++) {
            correct_guesses[i] = word[i]
        }
        print_hidden_word()
        document.getElementById("winner").style.display = "block";
        document.getElementById("winner").innerHTML = "YOU LOSE";
        document.getElementById("restart_btn").style.display = "block";
    }

    document.getElementById("guess").value = "";
}
