#!/bin/bash

exec > /var/log/user-data.log 2>&1

# Update packages
apt update -y

# Install Git, Curl and Node.js
apt install -y git curl

curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Clone repository
git clone https://github.com/singhkuldeep01/AWS-SERVER.git /home/ubuntu/project

# Go to project
cd /home/ubuntu/project

# Install dependencies
npm install

# Start application
pm2 start src/index.js --name node-server

# Save PM2 process
pm2 save

# Configure PM2 to start on reboot
env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
