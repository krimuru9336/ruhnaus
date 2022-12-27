#!/bin/bash

sudo yum update -y
sudo yum install java-1.8.0-openjdk java-1.8.0-openjdk-devel -y
sudo wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
sudo sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
sudo yum install apache-maven -y
sudo  amazon-linux-extras | grep mariadb
sudo tee /etc/yum.repos.d/mariadb.repo<<EOF
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.5/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
EOF
sudo yum makecache
sudo yum repolist
sudo yum install MariaDB-server MariaDB-client -y
sudo systemctl enable --now mariadb
systemctl status mariadb
sudo mysql_secure_installation
