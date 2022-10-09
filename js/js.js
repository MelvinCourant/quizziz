let responses = [2,0,0,0,0];
let choix;
let barreProgress = 0;
let nQuestions = 0;
let points = 0;

function recupId(n){
    $(".bouton-reponse").removeClass('active');
    $("#"+n).addClass('active');
    choix = n;

    console.log(n);
}

function lancerQuestion() {
    if(nQuestions < 5){
        choix = null;
        $("#remplissage-temps").removeAttr('style');
        $("#remplissage-progress").removeAttr('style');

        barreProgress += 20;
        $("#remplissage-progress").css('width', barreProgress+'%');
        console.log(barreProgress);

        $(".question-reponses").hide();
        $("#quizz").children('.question-reponses').eq(nQuestions-1).children('.reponses').removeClass('affichees');

        $("#quizz").children('.question-reponses').eq(nQuestions).show();
        $("#quizz").children('.question-reponses').eq(nQuestions).children('.reponses').addClass(' affichees');


        $('#remplissage-temps').animate(
            {
                width: [0, "linear"]
            },
            10000,

            function () { // cette fontion est éxécutée quand le temps est écoulé quand l'animation est terminée)
                if ($("#"+choix).hasClass('bouton-reponse vrai') == true  && choix != null){
                    $("#"+choix).addClass('vraiReponse');
                    points++;
                }

                else if ($("#"+choix).hasClass('bouton-reponse vrai') == false && choix != null){
                    $("#"+choix).css('background-color', 'red');
                    $('.affichees').children('.vrai').addClass('vraiReponse');
                }

                else {
                    $('.affichees').children('.vrai').addClass('vraiReponse');
                }

                nQuestions++;
                setTimeout(lancerQuestion, 3000);
        })
    }

    else {

        $(".question-reponses").hide();
        $("#quizz").children('.question-reponses').eq(nQuestions-1).children('.reponses').removeClass('affichees');
        $('#barres').hide();

        $('#resultat').text(points);
        $("#quizz").children('.question-reponses').eq(nQuestions).show();
        console.log(points);
    }
}

$('#sauvegarder').on('click', (event) => {

    alert('Score enregistré');

    if ($('#pseudo').val() == ''){
        $.post('http://iut-deniau.alwaysdata.net/Ux2i/enregistrer_score_quiz.php', {
            quiz: 'quizziz' ,
            pseudo : $('#pseudo').val(),
            score : points
        },"json" )

            .fail(function() {
                alert( "error" );
            })
    }
    else{
        alert('Veuillez mettre un pseudo pour enregistrer le score');
    }
});

$('#voir-score').on('click', (event) => {

    $.getJSON('http://iut-deniau.alwaysdata.net/Ux2i/obtenir_classement_quiz.php?quiz=quizziz', function () {
        console.log("success");
    })

        .done(function (data) {
            for (let i = 0; i < data.classement.length; i++) {
                $("#tableau-score").children("ul").append('<li>Pseudo : ' + data.classement[i].pseudo + '<br>score : ' + data.classement[i].score + '</li>');
            }
        });

    $('#tableau-score').show();
});

$('#tableau-score').on('click', (event) => {
    $('#tableau-score').hide();
});