/*
Application name:   Mixed Modules
File name:          distributions.jc
Author(s):          Peter Walton
Date:               15th May 2022
Version:            1.0

Description: In this module is a support module in which there are 
             two functions:

             These two functions return the cumulative probability 
             for the goals scored by a home and away football team.  
             This based on a Poisson distribution with a mean of 2.0 
             goals for a home team, and 1.2 for an away team. The 
             joint average is reported to be 2.8, so we will use these 
             mean values. This should be reasonably accurate. For 
             practical reasons the distribution is limited to a 
             maximum of 8 goals and the cumulative value are scaled 
             to lie between  0 and 1 so that the Math.random function 
             can be used used.  (The probability of 9 goals is less 
             than 0.01%).

             These values need only be calculated once and then the 
             values included in the main.js file where they are needed 
             to calculate random scores. For  goal averages of 2.0 
             and 1.2 these values are:

             Home dist:
             [
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
             Away dist:
             [
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

             So a roll of 0.52 is 1 goal for a home team, but 0
             for an away team, but a roll of 0.7 is 1 goal for
             a home team but also 1 goal for an away team. Please
             be aware there will be two rolls for each game:
             the first for the home team and the second for
             the away team.
*/

const goals = [0,1,2,3,4,5,6,7,8]
const avgHomeGoals = 2.0;
const avgAwayGoals = 1.2;

// The next function delivers the cumulative
// probability distribution for the number
// of gaols scored by a team in a football
// (soccer) match. 
//
// mean: the mean for the Poisson distribution
//       used
//
function probabilityDistribution(mean) {

   // initialise variables
   let cumArr = [];
   let cumulative =0.0
   let factorial = 1;
   
   // calculate to probabilities
   // for the cumulative
   // store the cumulatives on an array
   for (itm of goals) {
      if (itm > 1) {
         factorial = factorial * itm;
      }

      cumulative += Math.pow(mean,itm) * Math.exp(-itm)/factorial;
      cumArr.push(cumulative)
   }

   // scale to cumulative probabilities so they lie between 0 an 1
   const top = Math.max(...cumArr);

   for (let i =0 ; i < cumArr.length ; i++) {
      cumArr[i] = cumArr[i]/top;
   }

   // return the array
   return cumArr;

}

// the next function retruns the cumulative distribution
// for a home team
function homeDistribution () {
    return probabilityDistribution(avgHomeGoals); 
}

// the next function retruns the cumulative distribution
// for an away team
function awayDistribution() {
    return probabilityDistribution(avgAwayGoals); 
}

console.log(homeDistribution())
console.log(awayDistribution())
