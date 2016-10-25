# Airport Distance app
The task was to create a web app that calculates the distance (in nautical miles) between two airports. The app should auto-
complete the airports and should feature all airports in the U.S. only. Bonus: plot the trip on Google maps.

## Process
I started by finding a react starter kit that would have a lot of the boilerplate set up without having too much bells and whistles and came across react-boilerplate, which set up Webpack, React, Redux, ES6, Babel transpiler, and file structure.

#### http://mikechabot.github.io/react-boilerplate/

I then proceeded to look for a list of all U.S. airports, and came across a JSON of all airports in the world. This turned out to be my best option (second best was an NPM module that returned a filterable Backbone model), which I then parsed to filter only U.S. airports. I put this in a us_airports.json file.

From there, I put together AirportDistance and AirportDistanceResults components, and set up action-creators and reducers for setting airport model values and distance in Redux.

I used material-ui for an autocomplete dropdown, and google-maps-react, which I had to dig into the source code for to figure out what props I can pass in to have it show the way I wanted. There is a simple server endpoint used to hit a third-party Airport API and fetch the distance between two airports.

Unit tests were written for the Action Creator 'setModelValue' and the reducer 'SET_MODEL_VALUE'. 

Even though there was no time limit, I wanted to complete it in a weekend and get to a working implementation quickly. I then used whatever splotches of time I had in the weekends after to refine. I would be happy to make any updates one would like to see.


## Get Started
1. `npm install`
2. `npm start`

## Run tests
1. `npm test`
