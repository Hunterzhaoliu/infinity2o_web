# infinity2o.com

## Setup

1. Get a Mac
2. `node -v` = v8.9.3 & `npm -v` = 5.6.0
3. `heroku -v` = `heroku-cli/6.15.13-3dce47c (darwin-x64) node-v9.3.0`

## Backend & frontend development setup

heroku.com:

1. 1. Login with `qn1over12@gmail.com` & password = `mxxxxFxxxxxIxxxxxx`

mlab.com databases:

1. Login with `qliu` & password = `mxxxxFxxxxxIxxxxxx`
2. `infinity2o-dev` database username = `infinity2o-dev` & password = `2134711p`
3. `infinity2o-staging` database username = `infinity2o-staging` & password = `2134711p`
4. `infinity2o-prod` database username = `infinity2o-prod` & password = `mxFxxxxxIxxxx`

Google OAuth:

1. Login `console.developers.google.com` with `q42liu@gmail.com` under projects
   `infinity2o-dev`, `infinity2o-staging`, & `infinity2o-prod`

LinkedIn OAuth:

1. Login TODO:

Stripe.com login:

1. Login with `qn1over12@gmail.com` & password = `mxxxxFxxxxxIxxxxxx`

Sendgrid.com login:

1. Login with `qn1over12@gmail.com` & password = `mxxxxFxxxxxIxxxxxx`

Godaddy.com login:

1. Login with `q42liu@gmail.com` & password = `49xxxxxx@wxxxxx`
2. Already added name servers(NS) `karl.ns.cloudflare.com` & `wally.ns.cloudflare.com`
3. Add forwarding to domain: `https://www.infinity2o.com` by adding
   subdomains `infinity2o.com` & `www`

Cloudflare.com

1. Login with `qn1over12@gmail.com` & password = `21xxxxx@ix`
2. Already added 2 CNAMEs.
   * Name: `infinity2o.com` Value: `www.infinity2o.com.herokudns.com`
     TTL: `Automatic` Status: `Arrow through cloud`
   * Name: `www` Value: `www.infinity2o.com.herokudns.com`
     TTL: `Automatic` Status: `Arrow through cloud`

E-mail support:

1. `askinfinity2o@gmail.com` & password = `mxxxxFxxxxxIxxxxxx`. Recovery = Hunter's phone & `q42liu@gmail.com`

Local development setup:

1. `cd infinity2o_server` then `npm run dev`

## Development workflow checklists

When you want to add something...

1. Create a `new-branch` off latest `master`
2. Create `actions/types`
3. Create `actions/actionCreator.js`
4. Deal with action type in `reducers/actionReducer.js`
5. Add `reducers/actionReducer.js` to `reducers/index.js`
6. If state changes add `mapStateToProps` in `containers/Containers.js`
7. If added functions to change state add `mapDispatchToProps` in `containers/Containers.js`
8. Test your new code with cypress by writing tests in `cypress/integration/`
   & running the tests in a new terminal with `npm test`
   in `infinity2o_server/`
9. Create a `pull request` for your `new-branch` to merge into `master`

## Deployment checklist

1. `cd infinity2o_server`
2. `heroku login` username = `qn1over12@gmail.com` & password = `mxxxxFxxxxxIxxxxxx`

3. If first time, `git remote add heroku-staging https://git.heroku.com/infinity2o-staging.git` and `git remote add heroku https://git.heroku.com/infinity2o.git`
4. `git checkout staging`
5. `git push origin staging`
6. `git push heroku-staging staging:master`
7. Check code is deployed on https://infinity2o-staging.herokuapp.com/
8. `git checkout master`
9. `git merge staging`
10. `git push origin master`
11. `git push heroku master`
12. Check code is deployed on https://infinity2o.herokuapp.com/
13. Check code is deployed on https://www.infinity2o.com/

## Design principles

1. [Fletcher Color Control](http://www.barnstonestudios.com/content/COLOUR-CONTROL-by-Frank-Morley-Fletcher.pdf)
2. `color` beside `opposite color` is the most contrasting.
3. `color` surrounded by grey changes grey into shade of `color`.

## Domain name

The key idea is we want to direct all different ways one can type our
domain name and redirect it to `https://www.infinity2o.com`

Right now if one types `www.infinity2o.com`

They will get redirected to `https://www.infinity2o.com`

## Useful links

[HTTP status codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
