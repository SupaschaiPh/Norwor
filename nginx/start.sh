#!/bin/bash
sudo docker run -p 80:80/tcp -p 1935:1935/tcp -v "./nginx.conf:/usr/local/nginx/conf/nginx.conf:ro" -v "./logs:/usr/local/nginx/logs" -d nginx-cni