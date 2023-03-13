import gspread
import pandas as pd
from gspread_dataframe import set_with_dataframe
from google.oauth2.service_account import Credentials
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

import mysql.connector

# Connect to the database
connection = mysql.connector.connect(host='localhost',
                                     user='root',
                                     password='mysqlserver',
                                     database='Idealab',
                                     )

mycursor = connection.cursor()

mycursor.execute("SELECT * FROM requests")

requests = mycursor.fetchall()

mycursor.execute("SELECT * FROM approvedRequests")

approvedRequests = mycursor.fetchall()

Items, Counts, Types, Prices, Totals, Reasons, Notes, URLs, Usernames, Dates = ([] for i in range(10))
 
approvedItems, approvedCounts, approvedTypes, approvedPrices, approvedTotals, approvedReasons, approvedNotes, approvedURLs, approvedUsernames, approvedDates = ([] for i in range(10))

for i in requests:
    Items.append(i[0])
    Counts.append(i[1])
    Types.append(i[8])
    if i[7] == 'TL':
        Prices.append('₺' + str(i[2]))
        Totals.append('₺' + str(i[3]))
    elif i[7] == 'USD':
        Prices.append('$' + str(i[2]))
        Totals.append('$' + str(i[3]))
    elif i[7] == 'EURO':
        Prices.append('€' + str(i[2]))
        Totals.append('€' + str(i[3]))
    elif i[7] == 'GBP':
        Prices.append('£' + str(i[2]))
        Totals.append('£' + str(i[3]))
    else:
        Prices.append('?' + str(i[2]))
        Totals.append('?' + str(i[3]))
    Reasons.append(i[5])
    Notes.append(i[6])
    URLs.append(i[7])
    Usernames.append(i[10])
    Dates.append(i[11])

for i in approvedRequests:
    approvedItems.append(i[0])
    approvedCounts.append(i[1])
    approvedTypes.append(i[8])
    if i[7] == 'TL':
        approvedPrices.append('₺' + str(i[2]))
        approvedTotals.append('₺' + str(i[3]))
    elif i[7] == 'USD':
        approvedPrices.append('$' + str(i[2]))
        approvedTotals.append('$' + str(i[3]))
    elif i[7] == 'EURO':
        approvedPrices.append('€' + str(i[2]))
        approvedTotals.append('€' + str(i[3]))
    elif i[7] == 'GBP':
        approvedPrices.append('£' + str(i[2]))
        approvedTotals.append('£' + str(i[3]))
    else:
        approvedPrices.append('?' + str(i[2]))
        approvedTotals.append('?' + str(i[3]))
    approvedReasons.append(i[5])
    approvedNotes.append(i[6])
    approvedURLs.append(i[7])
    approvedUsernames.append(i[10])
    approvedDates.append(i[11])

scopes = ['https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive']
try:
    credentials = Credentials.from_service_account_file('gscred.json', scopes=scopes)

    gc = gspread.authorize(credentials)

    gauth = GoogleAuth()
    drive = GoogleDrive(gauth)

    # open a google sheet
    gs = gc.open_by_key('1BAeTfn2ws0qltt6rE2HH8cZMnhk12bDLMn7V1R1u4os')# select work sheet from name
    Requests = gs.worksheet('Requests')
    approvedRequests = gs.worksheet('Approved Requests')
except Exception:
    raise Exception

request = pd.DataFrame({'Item': Items, 'Count': Counts, 'Type': Types, 'Price': Prices, 'Total': Totals, 'Reason': Reasons, 'Notes': Notes, 'URL': URLs, 'Username': Usernames, 'Creation Date': Dates})# write to dataframe
approvedRequest = pd.DataFrame({'Item': approvedItems, 'Count': approvedCounts, 'Type': approvedTypes, 'Price': approvedPrices, 'Total': approvedTotals, 'Reason': approvedReasons, 'Notes': approvedNotes, 'URL': approvedURLs, 'Username': approvedUsernames, 'Creation Date': approvedDates})# write to dataframe
Requests.clear()
approvedRequests.clear()


set_with_dataframe(worksheet= Requests, dataframe=request, include_index=False,
include_column_header=True, resize=True)

Requests.format("A1:J1", {
    "backgroundColor": {
      "red": 0.0,
      "green": 1.0,
      "blue": 0.0
    },
    "textFormat": {
        'bold': True
    }
})

Requests.format("B", {
    "horizontalAlignment": "RIGHT",
})

set_with_dataframe(worksheet= approvedRequests, dataframe=approvedRequest, include_index=False,
include_column_header=True, resize=False)

approvedRequests.format("A1:J1", {
    "backgroundColor": {
      "red": 0.76,
      "green": 0.403,
      "blue": 1
    },
    "textFormat": {
        'bold': True
    }
})

approvedRequests.format("B", {
    "horizontalAlignment": "LEFT",
})