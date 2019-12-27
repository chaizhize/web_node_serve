#! /bin/sh
cd /Users/chaizhize/project/webServer/logs/
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log