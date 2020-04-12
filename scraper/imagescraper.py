import requests, re, json
import sys
import os
from os.path import basename
from bs4 import BeautifulSoup

def collectPlayerImages():
    '''date is formatted as year-month-day
    Gets all the player stats for a specific year-month-date'''

    response = requests.get('https://lol.gamepedia.com/LCS/2019_Season/Spring_Season/Team_Rosters')
    soup = BeautifulSoup(response.text, 'html.parser')

    rows = soup.findAll("td", {"class": "extended-rosters-id"})
    allImages = []

    for row in rows:
        # print(row.findChildren()[0]['href'])
        link = "https://lol.gamepedia.com" + row.findChildren()[0]['href']
        playerPage = requests.get(link)
        soup = BeautifulSoup(playerPage.text, 'html.parser')

        a = soup.findAll("a", {"class": "image"})[1]
        image = a.findChildren()[0]['src']
        ign = row.findChildren()[0]['href'][1:]
        allImages.append((ign, image))
    return allImages


def saveImages(imageList):
    for image in imageList:
        with open('images/' + str(image[0]) + '.jpg', 'wb') as handle:
            response = requests.get(image[1], stream=True)
            if not response.ok:
                print (response)

            for block in response.iter_content(1024):
                if not block:
                    break
                handle.write(block)
    
def uploadImages():
    apiUrl = 'http://localhost:3000'
    directory = os.fsencode('./images')
    for file in os.listdir(directory):
            filename = os.fsencode(file)
            if (filename.endswith(b".jpg")):
                # Make apicall to database
                headers = {'[content-type]': 'multipart/form-data; boundary=<calculated when request is sent>'}
                files = {'file': open('images/' + filename.decode('utf-8'), 'rb')}
                response = requests.post("{0}/players/images/upload".format(apiUrl), files=files)
                print(response)

i = collectPlayerImages()
saveImages(i)
uploadImages()
