# Mini-cloud storage in AWS

Version right now: v0.0

Next version: \
v0.1:

- .exe console that requires AWS region, key, bucket name etc. And creates folder AWS with files from AWS

user flow:

1. run .exe, which opens console
2. ask for AWS region, api key, bucket name etc.
3. create folder AWS
4. download files from AWS and put in created folder
5. close program

info:

- downloading files includes creating folders if needed based on path in AWS
- zero checking, if file is already downloaded - overwrite (Sync in later versions)
