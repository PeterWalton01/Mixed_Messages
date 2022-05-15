/*
Application name:   Mixed Modules
File name:          main.jc
Author(s):          Peter Walton
Date:               15th May 2022
Version:            1.0

Description: This file contains the functions needed to
             generate random messages about fictitious football
             matches. The message simulate the final score 
             for a football match between two team. The scores 
             and the teams are randomly calculated and selected.
             There is also a random summary of the match generated
             and provided. This consists of a main part of the 
             message (which is influenced by the score), and an 
             option rider comment.

             For a sense of realism, the score are based on two
             Poisson distributions - one for the home team and 
             one for the away team. The home team distribution
             leads to higher scores than that for the away team.

*/


//
// Function header
//
// the next function returns a random number
// of goals for a home team
function homeGoals() {
// the following array is calculated 
// using the distributionUtility.js.
// the values are calculated once and then
// used in place to reduce the processing overhead.
const cfd = [
    0.47914175191333613,
    0.831674551784904,
    0.9613641211962602,
    0.9931708720768035,
    0.9990213969465103,
    0.9998823120743612,
    0.9999878830664046,
    0.9999989794657066,
    1
  ]

// obtain a random number
val = Math.random()

// use the findIndex function to find where
// in the cfd the random value falls. this gives
// the number of goals scored
goals = cfd.findIndex(function(x) {
    if (val< x) {
        return true;
    } else {
        false;
    }
})
   return goals;
}

//
// Function header
//
// the next function returns a random number
// of goals for an away team
function awayGoals() {
// the following array is calculated 
// using the distributionUtility.js.
// the values are calculated once and then
// used in place to reduce the processing overhead.
    const cfd = [
        0.6430998183988546,
        0.9269996605708867,
        0.9896642097430313,
        0.9988854094753149,
        0.9999030964166478,
        0.9999929490814313,
        0.9999995600710531,
        0.9999999769934247,
        1
      ]

    // obtain a random number
    val = Math.random()
    
    // use the findIndex function to find where
    // in the cfd the random value falls. this gives
    // the number of goals scored  
    goals = cfd.findIndex(function(x) {
        if (val< x) {
            return true;
        } else {
            false;
        }
    })
       return goals;
}

//
// Function header
//
// the next function returns two radomly selected
// teams for the imaginary game
function teams()
{
    // an array of competing teams
    const teams = [
        "Manchester City",					
        "Liverpool",	    				
        "Chelsea",							
        "Arsenal",							
        "Tottenham Hotspur",				
        "Manchester United",				
        "West Ham United",					
        "Wolverhampton Wanderers",			
        "Brighton & Hove Albion",			
        "Leicester City",					
        "Crystal Palace",					
        "Aston Villa",						
        "Brentford",						
        "Newcastle United",				
        "Southampton",						
        "Everton",							
        "Burnley",							
        "Leeds United",					
        "Watford",							
        "Norwich City",
    ];

    // pick two teams but avoid duplication
    home = Math.floor(Math.random()*teams.length)
    do{
        away = Math.floor(Math.random()*teams.length) 
    } while(home === away)

    return [teams[home], teams[away]];
}


//
// Function header
//
// the next function return a random core message
// that is influenced by the outcome of the game.
// an optional rider statement may be added to 
// the core message.
function comment(homeGoals, awayGoals) {

    // A comment on the game is build from an element based
    // on the result, and an optional rider phrase.

    const comments = {
        'h0' : 'A later winner in this game.',
        'h1' : 'The away manager was very unhappy with the referee.',
        'h2' : 'This win was much easier than it should have been.',
        'h3' : 'A bad start for the away team with an own goal.',
        'h4' : 'The game turned on a bad decision by the referee.',
        'h5' : 'A result very much against the run of play.',
        'h6' : 'Routine performance by the home team.',
        'd0' : 'A draw and little football in the second half',
        'd1' : 'The teams cancelled each other out here.',
        'd2' : 'Definitely a game of two halves.',
        'd3' : 'Not a lot of football played here.',
        'd4' : 'Neither manager happy with the referee.',
        'd5' : 'Both teams needed the points, but it wasn\'t to be.',
        'd6' : 'Neither side deserved to win.',
        'a0' : 'A bit of a surprise given recent form.',
        'a1' : 'Never easy to win away from home.',
        'a2' : 'A story of mistakes in this game.',
        'a3' : 'A story of bad luck and missed opportunities.',
        'a4' : 'A classic display of counter attacking football.',
        'a5' : 'The game was all about one player.',
        'a6' : 'The came, they saw they got an away win!',
    }

    const rider = [
        'Not a classic!',
        'VAR was called into play several times.',
        'Eight yellow cards tells its own story.',
        'Key injured player were certainly missed.',
        'Luck played a big part in this game.',
        'A questionable red card changed this game.',
        'Both sides could still be relegated.',
        'No love lost between these teams.'
    ]

    // use the goals to set the first character of the message index.
    //   h = home win
    //   a = away win
    //   d = draw
    if (homeGoals > awayGoals) {
        key = "h"
    } else if (homeGoals < awayGoals) {
        key ="a"
    } else {
        key="d"
    }
    
    // calculate the rest of the comment key
    // using a random number
    rand = Math.floor((Math.random() * 7));
    key += rand;

    // lookup and record the comment
    let line = comments[key];

    rand = Math.floor((Math.random() * rider.length*2.5));
    
    // some of the time, add a rider to the core comment
    if (rand <rider.length) {
        line = line + ' ' + rider[rand];
    }

    return line;


}


//
// Function header
//
// the next function use the functions already defined
// in order to buil the message about the football match
// and its outcome
function showMatch() {

    // build the message elements using the functions
    // defined earlier
    const teamsArr = teams();
    const homeScore = homeGoals()
    const awayScore = awayGoals()
    const summary = comment(homeScore, awayScore)
    
    // build and return the full message
    const mainLine = `${teamsArr[0]} v ${teamsArr[1]} : ${homeScore}-${awayScore}`
    
    return `\nPremier League: Latest result\n\n${mainLine} \n\n${summary}\n`;
}

// run for test purposes
console.log(showMatch())