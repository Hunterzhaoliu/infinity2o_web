# infinity2o.com

## Setup

1. `node -v` = v8.9.3 & `npm -v` = 5.6.0
2. `heroku -v` = `heroku-cli/6.15.13-3dce47c (darwin-x64) node-v9.3.0`

## Backend & frontend development setup

mlab.com databases:

1. login with `qliu` & password = `mxxxxFxxxxxIxxxxxx`
2. `infinity2o-dev` database username = `infinity2o-dev` & password = `2134711p`
3. `infinity2o-prod` database username = `infinity2o-prod` & password = `mxFxxxxxIxxxx`

Google OAuth:

1. login `console.developers.google.com` with `q42liu@gmail.com` under projects
   `infinity2o-dev` & `infinity2o-prod`

Stripe.com login:

1. login with `qn1over12@gmail.com` & password = `mxxxxFxxxxxIxxxxxx`

Sendgrid.com login:

1. login with `qn1over12@gmail.com` & password = `mxxxxFxxxxxIxxxxxx`

Godaddy.com login:

1. login with `q42liu@gmail.com` & password = `49xxxxxx@wxxxxx`

Cloudflare.com

1. login with `qn1over12@gmail.com` & password = `21xxxxx@ix`

Setup:

1. `cd infinity2o_server` then `npm run dev`

## Development workflow checklists

what do u want to add?

1. create `actions/types`
2. create `actions/actionCreator.js`
3. deal with action type in `reducers/actionReducer.js`
4. add `reducers/actionReducer.js` to `reducers/index.js`
5. if state changes add `mapStateToProps` in `containers/Containers.js`
6. if added functions to change state add `mapDispatchToProps` in `containers/Containers.js`

what do u want to remove?

what do u want to change?

## Deployment checklist

1. `cd infinity2o_server`
2. `gitsync`
3. `heroku login` username = `qn1over12@gmail.com` & password = `exxxxxIxxFxxx`
4. `git push heroku master`
5. https://infinity2o.herokuapp.com/
6. check code is deployed on https://www.infinity2o.com/

## Design principles

1. [Fletcher Color Control](http://www.barnstonestudios.com/content/COLOUR-CONTROL-by-Frank-Morley-Fletcher.pdf)
2. `color` beside `opposite color` is the most contrasting.
3. `color` surrounded by grey changes grey into shade of `color`.

## Domain name

The key idea is we want to direct all different ways one can type our
domain name and redirect it to `https://www.infinity2o.com`

Right now if one types `infinity2o.com` or `www.infinity2o.com`

They all get redirected to `https://www.infinity2o.com`

## Useful links

[HTTP status codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
