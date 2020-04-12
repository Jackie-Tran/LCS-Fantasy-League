import requests, re, json
import sys
from bs4 import BeautifulSoup


class PlayerMatchStats:
    def __init__(self, team, username, kills, deaths, assists, cs, points):
        super().__init__()
        self.team = team
        self.name = username
        self.kills = kills
        self.deaths = deaths
        self.assists = assists
        self.cs = cs
        self.points = points

    def __str__(self):
        return "team: " + self.team \
               + " username: " + self.name \
               + " kills: " + self.kills \
               + " deaths: " + self.deaths \
               + " assists: " + self.assists \
               + " cs: " + self.cs \
               + " points: {}".format(self.points)

class Match:
    def __init__(self, date, team1, team2):
        super().__init__()
        self.date = date
        self.team1 = team1
        self.team2 = team2

    def __str__(self):
        return "Date: " + self.date + " Team1: " + self.team1 + " Team2: " + self.team2

def compareDate(date1, date2):
    """date1, date2 are formatted as year-month-day
    return 1 if date1 > date2
    return 0 if date1 = date2
    return -1 if date1 < date2"""
    comparableDate1 = date1.split('-')
    comparableDate2 = date2.split('-')

    if int(comparableDate1[0]) > int(comparableDate2[0]):
        return 1
    elif int(comparableDate1[0]) < int(comparableDate2[0]):
        return -1
    else:
        if int(comparableDate1[1]) > int(comparableDate2[1]):
            return 1
        elif int(comparableDate1[1]) < int(comparableDate2[1]):
            return -1
        else:
            if int(comparableDate1[2]) > int(comparableDate2[2]):
                return 1
            elif int(comparableDate1[2]) < int(comparableDate2[2]):
                return -1
            else:
                return 0


def collectDataForDate(date):
    '''date is formatted as year-month-day
    Gets all the player stats for a specific year-month-date'''
    apiUrl = 'http://localhost:3000'
    response = requests.get('https://gol.gg/tournament/tournament-stats/LCS%20Spring%202020/')
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find_all('section')[3]
    rows = iter(table.find_all('tr'))
    next(rows) # First row is header not important
    player_list = []
    playerScoreDict = {}
    headers = {'[content-type]': 'application/json'}

    for row in rows:
        compared = compareDate(date, row.find_all("td")[-1].get_text())
        if compared == 1:
            break
        elif compared == -1:
            continue

        href = row.find('a')
        link = "https://gol.gg" + (href.get('href').split('..')[1])
        match_page = requests.get(link)
        soup = BeautifulSoup(match_page.text, 'html.parser')
        stats_tab = soup.find_all("table", class_="playersInfosLine footable toggle-square-filled")
        team1 = soup.find(class_="col-12 blue-line-header").find("a").get_text()
        team2 = soup.find(class_="col-12 red-line-header").find("a").get_text()
        teamNumber = 0
        playerCount = 0
        # Create the match
        match = Match(date, team1, team2)
        endpoint = "{0}/matches/createMatch".format(apiUrl)
        response = requests.post(endpoint, json={"date": date, "team1.name": team1, "team2.name": team2})
        if not stats_tab == []:
            player_stats = iter(stats_tab[0].findChildren(["tr"], recursive=False) + stats_tab[1].findChildren(["tr"], recursive=False))
            for player in player_stats:
                teamNumber = 0 if playerCount < 5 else 1
                team = team1 if teamNumber == 0 else team2
                name = player.find_all('a')[-1]
                stats = player.find_all("td")
                kda = stats[-2].get_text().split('/')
                cs = stats[-1].get_text().lstrip()

                # points calculated by kills - deaths + assists for now
                points = int(kda[0]) - int(kda[1]) + int(kda[2])

                if (name.get_text() in playerScoreDict.keys()):
                    playerScoreDict[name.get_text()] += points
                else:
                    playerScoreDict[name.get_text()] = points

                new_player = PlayerMatchStats(team, name.get_text(), kda[0], kda[1], kda[2], cs, points)
                player_list.append(new_player)
                playerCount += 1
                # Make request to create player
                headers = {'[content-type]': 'application/json'}
                endpoint = "{0}/matches/{1}/{2}/{3}/addProStats".format(apiUrl, date, team1, team2)
                response = requests.put(endpoint, json=new_player.__dict__)
                print(endpoint)
                print(response)

    return playerScoreDict

def updateAllTheBullshit(proPoints):
    allPlayers = getTheBullshitPlayers()
    for league in allPlayers.keys():
        for player in allPlayers[league]:
            for key in proPoints.keys():
                if key.upper() in (pros.upper() for pros in player['team']):
                    player['score'] += proPoints[key]

    return allPlayers


def getTheBullshitPlayers():
    leagueBullshitIds = ["5e78d59ddb93b3460488693e", "5e8f96cb9735fc56302613a6"]
    getAllBullShitUsers = {}
    apiUrl = 'http://localhost:3000'

    for each in leagueBullshitIds:
        endpoint = "{0}/leagues/{1}/players".format(apiUrl, each)
        response = requests.get(endpoint)
        getAllBullShitUsers[each] = json.loads(response.text)

    return getAllBullShitUsers

def sendTheBullShitIn(theBullshit):
    apiUrl = 'http://localhost:3000'
    for each in theBullshit.keys():
        for x in theBullshit[each]:
            headers = {'[content-type]': 'application/json'}
            endpoint = "{0}/leagues/{1}/updatescore/{2}/{3}/".format(apiUrl, each, x['uid'], x["score"])
            response = requests.put(endpoint, json=x)

y = collectDataForDate(sys.argv[1])
x = updateAllTheBullshit(y)
sendTheBullShitIn(x)
