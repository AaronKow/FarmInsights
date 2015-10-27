# FarmInsights
Provide farmers with insights about their farm

#How it works
Farminsights is a lite application for farmers, consumers and reseachers, so they can use it to analyse the food supply coming from which states and understand the economics of consumer demand. With FarmInsights, they can know how yields have changed over time and this allow them to predict the future crops and prepare for it. Similarly, they can know what is growing well in their area and what isn’t.


#How to use it
1. Clone this repo to `<yourapp>`

  `git clone https://github.com/AaronKow/FarmInsights.git <yourapp>`

2. Remove `.git`

  `cd <yourapp> && rm -rf .git`

3. Configure your settings.services.opebWeatherMapDataID and settings.services.forecastID with your own ID in server folder.

4. Start coding!


#Features
###Dashboard
Please allow your GPS for FarmInsights. In dashboard, it provides user to the current weather in your area. Also, it will provide you useful forecast data within 24-hours such as precipitation, wind speed and temperature for your area. Additionally, users can also see the temperature pattern within 48-hours for their area.
>Source:
>Weather forecast data from Forecast.io
>
>Source:
>City and country data from OpenWeatherMap.org


###Harvest Analyzer
In this analyzer, farmers can know how yields have changed over time so they can prepare for and predict future crops. They need to know what is growing well in their area and what isn’t.
>Source:
>NASS (Quickstats): Commodity > Category: “Area Harvested"


###Economics Analyzer
In this analyzer, farmers can analyse the economics of consumer demand for crops and animals & products.
>Source:
>NASS (Quickstats): Commodity > Category: “Sales"


###Food Analyzer
In this analyzer, farmers can analyse the food of consumer demand for crops and animals & products.
>Source:
>NASS (Quickstats): Commodity > Category: “Production"

#How FarmInsights is built
FarmInsights is built using an open-source Javascript web application framework called Meteor. To built this application, FarmInsights was built using the packages and plugins as following:
meteor-base, mobile-experience, mongo, blaze-html-templates, session, jquery, tracker, standard-minifiers, es5-shim, ecmascript, iron:router, twbs:bootstrap, http, fortawesome:fontawesome, mdg:geolocation, accounts-password, useraccounts:bootstrap, useraccounts:iron-routing, manuelschoebel:ms-seo, check, zimme:active-route, russ:weather-icons, momentjs:moment, flot, jqvmap, morrisjs, raphael and jquery-steps.

#Challenges I ran into
As an amateur for handling such big data of records, roughly 1,000~100,000 of records per commodity (barley, corn, wheat, etc…). Most often times, I get to crash my web app during fetching the big data from USDA datasets. So, to reduce this problem and focus on  becoming lite as much as possible, I carefully picked the data for use in each analyzer. Thus, not all commodity covered in my lite application.

#For Testing Purpose,
Feel free to use FarmInsights, which user can experience what FarmInsights can offer. You can use the account below or create a new account. (no email required!)
>
>username: testing
>
>password: test123
>

#What's next for FarmInsights
I wish to add more commodities, provide more farm-useful features and optimize FarmInsights on speed as much as possible.