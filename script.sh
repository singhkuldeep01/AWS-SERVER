#!/bin/bash

exec > /var/log/user-data.log 2>&1

# Update system
sudo apt update -y

# Install Node.js (better version)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone correct repo
git clone https://github.com/singhkuldeep01/AWS-SERVER.git /home/ubuntu/project

# Go to project
cd /home/ubuntu/project

# Install dependencies
npm install

# Start server (correct path)
sudo pm2 start src/index.js --name node-server

# Save PM2 process
pm2 save