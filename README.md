# infinity2o.com

## Why
1. store whole genome DNA sequences of your human cells in a private git
repo efficiently

2. have a private hashtable of common DNA sequences for more efficient storage

3. research how to store epigenetic information efficiently

4. have a private hashtable of common epigenetic patterns for more
efficient storage

5. figure out a business model for accelerating genomic && epigenetic
sequences

6. Use product on urself to revert to optimal saved age

## How
1. Find a genetics expert who wants to apply to illumina accelerator with u

## What

1.  `node -v` = v8.9.3 & `npm -v` = 5.6.0
2.  `heroku -v` = `heroku-cli/6.15.13-3dce47c (darwin-x64) node-v9.3.0`

## Backend & frontend development setup

### Local development setup:

1.  `cd infinity2o_web` then `npm run dev`

### AWS development setup:

1.  `cd` into `minerva/config` and SSH into server with `chmod 400 infinity2o-minerva.pem` and `ssh -i infinity2o-minerva.pem ubuntu@18.234.188.1`.
2.  Clone minerva repository and update staging and production config files

### Copy production MongoDB data to other MongoDB database:

1.  clone the remote folder on Bitbucket to local computer
2.  `cd` into `prod`
3.  `mongodump -h ds153412.mlab.com:53412 -d infinity2o-prod -u infinity2o-prod -p mxFxxxxxIxxxx -o <output directory>`
    where `<output directory>` is the current date
4.  commit the new data to Bitbucket
5.  go to the database in MongoDB and find the mongorestore command under the tools tab
6.  delete all collections in database and then mongorestore the production data by `cd` into wanted production data date folder

- Development Example: `mongorestore -h ds121686.mlab.com:21686 -d infinity2o-dev -u infinity2o-dev -p 2134711p <input db directory>`
  where `<input db directory>` is `infinity2o-prod`

### Deployment checklist

1.  `cd infinity2o_web`
2.  If first time, `git remote add heroku-staging https://git.heroku.com/infinity2o-staging.git` and `git remote add heroku https://git.heroku.com/infinity2o.git`
3.  `git checkout staging`
4.  `git push origin staging`
5.  `git push heroku-staging staging:master`
6.  Check code is deployed on https://infinity2o-staging.herokuapp.com/
7.  `git checkout master`
8.  `git merge --no-ff staging`
9.  `git push origin master`
10. `git push heroku master`
11. Check code is deployed on https://infinity2o.herokuapp.com/
12. Check code is deployed on https://www.infinity2o.com/
