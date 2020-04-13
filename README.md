# Fantasy LCS - A LoL Fantasy League

## Team Members

- Jackie Tran
- Joseph Augustine
- Danny Samara

## What is it?

A online web app where people can join leagues and draft a team to compete every weekend in the LCS. In every league users will draft a Top Laner, Jungler, Mid Laner, ADC, Support. During the LCS games that week, your players will earn you points for their performance in the games. For example, kills, assists, dragons, barons, towers etc.

## Key Features for Beta

1. User Registration/Login/Logout
   - New users can register an account
   - Existing users can login
2. Leagues
   - Public Leagues
     - Anyone can join
3. Database of Players
   - A database of all players in the LCS
   - Players will have a signing cost to 
## Additional Features for Final

1. Roster
   - Ability to view roster when currently in the league 
2. Scoreboard
   - Scoreboard that displays users in the league 
   - shows each users cumulative score 
3. Drafting
   - Participants start with an amount of money they can use to draft players
   - For every round of drafts, the draft order will be reversed to ensure fairness

## Tech Stack

MERN Stack

MongoDB

- Store LCS players and their signing costs
- Store Leagues (Users participating, LCS players playing in this league)
- Store User data

Express

- Used for the backend of the app
- Create a REST API for the project

React Native

- Building the entire frontend

Node.js

- Runtime Environment to run our REST API

AWS, Expo

- Deploy frontend/backend

## Top 5 Technical Challenges

1. Learning React
   - We wanted to explore the different frontend libraries available.
2. Grabbing LCS Data
   - Multiple places to get the data from
     - Riot Games LCS API
       - There is unofficial documentation for their eSports API but we are unsure how it works or if we can even use it
     - PandaScore API
       - eSports data API. 
     - Web scraping
       - If we are unable to find a free API that we can use, then we could scrape the data online. This would involve us having to learn how to scrape data online which would be another challenge
3. Security
   - Secure user saving with no ability to steal another persons username/data
   - Possibly using OAuth to signin/send data to email
4. UI/UX
   - Creating a solid experience for the user with decent speed and easy accesiblility
   - Ability to make the pages visually appealing for each user
5. Deploying The app
   - Challenging to deploy the backend and frontend 



Backend Documentation: https://documenter.getpostman.com/view/11051116/SzezbWno?version=latest



Demo: https://youtu.be/mudRZMY2Jo8