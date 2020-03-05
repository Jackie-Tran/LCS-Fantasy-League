import requests, re, json
from bs4 import BeautifulSoup

class ProPlayer:
    def __init__(self, firstName, lastName, otherName, nationality, ign, role, team):
        super().__init__()
        self.firstName = firstName
        self.lastName = lastName
        self.otherName = otherName
        self.nationality = nationality
        self.ign = ign
        self.role = role
        self.team = team

response = requests.get('https://lol.gamepedia.com/LCS/2020_Season/Spring_Season/Team_Rosters')
soup = BeautifulSoup(response.text, 'html.parser')

teams = soup.find_all(class_="team")
apiUrl = 'http://localhost:3000'

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
        otherName = name[2].strip('()') if len(name) == 3 else ""
        role = re.sub('[0-9]', '', cols[4].get_text().strip()) 

        # Create player object and convert to json
        player = ProPlayer(firstName, lastName, otherName, nationality, ign, role, team.get_text())
        # Make request to create player
        headers = {'[content-type]': 'application/json'}
        endpoint = "{0}/players/{1}/{2}/{3}".format(apiUrl, firstName, lastName, ign)
        response = requests.put(endpoint, json=player.__dict__)
        print(endpoint)
        print(response)
    print()
"""
---Credits---
Skip first iteration of loop: https://stackoverflow.com/questions/10079216/skip-first-entry-in-for-loop-in-python
Python object to json: https://docs.python.org/3/library/json.html
Python requests: https://requests.readthedocs.io/en/master/api/#requests.PreparedRequest.body 
"""
