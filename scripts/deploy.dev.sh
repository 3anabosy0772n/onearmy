# set project (default = dev)
firebase use default
# assign variables that can be accessed from firebase config method for backend functions
# NOTE - GA_SERVICE_DEV is json encrypted as base64 string
firebase functions:config:set serviceJson="$GA_SERVICE_DEV" \
# deploy site, functions, rules etc.
#echo $(firebase functions:config:get)
firebase deploy