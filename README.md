# reportbeat
service with API for report to email message if something wrong

how to use...

##create new check service:

curl -d "name=test2&&email=sergeevnitralabs@gmail.com" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://<ip:port>/service

name - unique name for service
email - email for reports
default interval 30 min
you see - "rule created"

##get created check service:

curl http://<ip:port>/service/<name>
you get response, something that - {"name":"test2","email":"sergeevnitralabs@gmail.com","id":"1531148148088"}

##get all check services:

curl http://<ip:port>/service

##delete check service:

curl http://<ip:port>/delete/service/<name>
you see something - "delete successfully"


