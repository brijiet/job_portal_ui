#!/bin/bash

sudo cp -rf /home/jobportal/jobportal-ui/build/. /var/www/connectnext.co/html/
sudo service nginx restart