# Codecademy Portfolio Project - Mixed Messages

## Description:

This project was complete as part of the Codecademy Full-Stack Engineer course. Specifically the project covers the _Mixed Messages_ portfolio project.

The purpose of the project is to provide a utility than returns random messages about a fictitious football game. Each time the utility is run, a new random message is produced. The message consists of several randomly generated elements:

1. A pair of goals-scored values, one for the home team and one for the away team.
2. A pair of competing team are selected at random.
3. A core message about the game is generated. This message is influenced by the outcome of the game - home win, away win or draw.
4. There is an optional rider message which may be produced.

A typical message is:

> Premier League: Latest result
>
> Crystal Palace v Brentford : 0-0
>
> Both teams needed the points, but it wasn't to be.

### Some implementation details

To prevent results such as 7-7 occurring too frequently, the number of goals scored are based on Poisson distributions. This will lead to more realistic scores, usually 4 or below. For implementation reasons, the maximum goals has been limited to 8 goals (quite realistic). The home and away teams have distributions with different means. These means are chosen to favour the home team slightly.

#### Nitty-gritty details

The Poisson distribution for goals 0 to 8 are scaled to lie between 0 and 1. This allow Math.random() to be used to generate scores using a findIndex in the distributions.

## How to use

To simulate a game and to generate a score and comments, simply run the script

> main.js

in node. This will produce a message such as

> Premier League: Latest result
>
> Norwich City v Tottenham Hotspur : 1-0
>
> The away manager was very unhappy with the referee.

If you wish to generate such a message for introduction into a browser simply use the function

> showMatch()

which will return a string containing the message.

If you would like to change the balances between home and away goals, then new distributions can be calculated using **distributionUtility.js**. The process is

1. Change the values against _avgHomeGoals_ and _avgAwayGoals_ in the **distributionUtility.js** file.
2. Run the new file in node or some equivalent way.
3. Two new distributions will be listed to the console.
4. These two distribution must be pasted into the functions _homeGoals_ and _awayGoals_ in the **main.js** file.
5. The **main.js** file will now run with the new distributions.

## License

The code in this project can be freely copied and distributed provided the copies bear an appropriate acknowledgement.
