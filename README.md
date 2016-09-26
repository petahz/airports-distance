# Airport Distance app
The task was to create a web app that calculates the distance (in nautical miles) between two airports. The app should auto-
complete the airports and should feature all airports in the U.S. only. Bonus: plot the trip on Google maps.

#### http://mikechabot.github.io/react-boilerplate/

## Process
I started by finding a react starter kit that would have a lot of the boilerplate set up without having too much bells and whistles and came across react-boilerplate, which set up Webpack, React, Redux, ES6, Babel transpiler, and file structure.

I then proceeded to look for a list of all U.S. airports, and came across a JSON of all airports in the world. This turned out to be my best option (second best was an NPM module that returned a filterable Backbone model), which I then parsed to filter only U.S. airports. I put this in a us_airports.json file.

From there, I, while doing a lot of reading on above technologies, put together AirportDistance and AirportDistanceResults components, and set up action-creators and reducers for setting airport model values and distance in Redux.

Even though there was no time limit, working full-time, I wanted to complete it in a weekend and get to a working implementation quickly. I would be happy to make any updates one would like to see.

Future possibilities:
- Add airport codes to names to allow for typing in and searching on code and name.
- Understanding conventions in React and Redux better to restructure files


## Get Started
1. `npm install`
2. `npm start`
