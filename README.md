# reportbeat
service with API for report to email message if something wrong

### install/run 

build...

docker build -t <name_image> .

run...

docker run -dti -p 3001:3001 -v $(pwd):/database <name_image>

and after you will get acces to api http://ip:3001/... 

describe api bellow:

## how to use...

### create new check service:

curl -d "name=test2&&email=sergeevnitralabs@gmail.com" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://<ip:port>/service - post request with params name, email

name - unique name for service
email - email for reports
default interval 30 min
you see somthing that - "rule created"

### get created check service:

curl http://<ip:port>/service/<name> - get request
you see something that - {"name":"test2","email":"sergeevnitralabs@gmail.com","id":"1531148148088"}

### get all check services:

curl http://<ip:port>/service - get request

### delete check service:

curl http://<ip:port>/delete/service/<name> - get request
you see something that - "delete successfully"

### reset timer when all good

curl http://<ip:port>/heart/<name> - post request with params status='ok'
you see something that - "reset timer"

curl http://<ip:port>/heart/<name> - post request with params status='bad' or something else, msg='<body>'
you see something "send bad msg to mail"