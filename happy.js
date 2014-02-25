function getScores() {
  var scores = [];
  var reverseQs = [1,5,6,10,13,14,19,23,24,27,28,29];

  for (var i=1; i<=29; i++) {
    // Get raw score
    var score = $("#Q"+i).val();
    
    // Check score has been entered by user
    if (score=="") {
      throw "Question number "+i+" has not been answered.";
    }

    // Convert raw scores for the reverse questions
    if (reverseQs.indexOf(i) > -1) {
      // Result should be reversed
      score = 7-score;
    }

    // Push processed score into array
    scores.push( parseFloat(score) );
  }

  return scores;
}


function calcAverageScore( scores ) {
  var total = 0.0;
  for (var i=0; i<scores.length; i++) {
    total += scores[i];
  }
  return (total / scores.length);
}


function onClickCalculateBtn() {

  var scores;
  try {
    scores = getScores();
  }
  catch (e) {
    $("#ResultsSection").slideUp();
    alert(e+" Please answer all questions.");
    return;
  }

  avg = calcAverageScore(scores);
  avg = Math.round(avg*10) / 10; // display to one decimal place
  $("#Score").html(avg);
  $("#ResultsSection").show();

  // Scroll to results section
  $.mobile.silentScroll($("#ResultsSection").offset().top);
}

$(document).on( "pageinit", "#OxfordHappinessQuestionnaire", function(event) {
  $("#ResultsSection").hide();
  $("#CalculateBtn").click( onClickCalculateBtn );
});

