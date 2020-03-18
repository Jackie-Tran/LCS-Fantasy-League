import requests, re, json
from bs4 import BeautifulSoup


class PlayerMatchStats:
    def __init__(self, username, kills, deaths, assists, cs, points):
        self.username = username
        self.kills = kills
        self.deaths = deaths
        self.assists = assists
        self.cs = cs
        self.points = points

    def __str__(self):
        return "username: " + self.username \
               + " kills: " + self.kills \
               + " deaths: " + self.deaths \
               + " assists: " + self.assists \
               + " cs: " + self.cs \
               + " points: {}".format(self.points)


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
    response = requests.get('https://gol.gg/tournament/tournament-stats/LCS%20Spring%202020/')
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find_all('section')[3]
    rows = iter(table.find_all('tr'))

    next(rows) # First row is header-- not important
    player_list = []

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

        if not stats_tab == []:
            player_stats = iter(stats_tab[0].findChildren(["tr"], recursive=False) + stats_tab[1].findChildren(["tr"], recursive=False))
            for player in player_stats:
                username = player.find_all('a')[-1]
                stats = player.find_all("td")
                kda = stats[-2].get_text().split('/')
                cs = stats[-1].get_text()

                # points calculated by kills - deaths + assists for now
                points = int(kda[0]) - int(kda[1]) + int(kda[2])

                new_player = PlayerMatchStats(username.get_text(), kda[0], kda[1], kda[2], cs, points)
                player_list.append(new_player)

    return player_list
