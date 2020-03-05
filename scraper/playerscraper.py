import requests
import re
from bs4 import BeautifulSoup

class ProPlayer:
    def __init__(self, firstName, lastName, nationality, ign, role, team):
        super().__init__()
        self.firstName = firstName
        self.lastName = lastName
        self.nationality = nationality
        self.ign = ign
        self.role = role
        self.team = team

response = requests.get('https://lol.gamepedia.com/LCS/2020_Season/Spring_Season/Team_Rosters')

soup = BeautifulSoup(response.text, 'html.parser')

teams = soup.find_all(class_="team")
# Go to every team's page and get the roster and team data
for team in teams:
    url = 'https://lol.gamepedia.com/' + team.get_text().replace(' ', '_')
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    print(team.get_text())
    # Find roster table
    table = soup.find(class_="wikitable")
    rows = iter(table.find_all('tr'))
    # We don't need the first row (it is just table headers)
    next(rows)
    for row in rows:
        cols = row.find_all('td')
        # Player data
        nationality = cols[0].get_text().strip()
        ign = cols[2].get_text().strip()
        name = cols[3].get_text().strip().split(" ")
        firstName = name[0]
        lastName = name[1]
        otherName = name[2] if len(name) == 3 else ""
        role = re.sub('[0-9]', '', cols[4].get_text().strip()) 
        print(firstName, lastName, otherName, nationality, ign, role)
    print()

"""
---Credits---
Skip first iteration of loop: https://stackoverflow.com/questions/10079216/skip-first-entry-in-for-loop-in-python
"""
