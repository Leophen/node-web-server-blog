#!/bin/sh
cd /Users/dorkiliu/Documents/test/node-web-server-blog/server-project/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log