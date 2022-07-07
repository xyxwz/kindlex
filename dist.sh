#zip ./dist
scp dist.zip root@81.70.16.21:/home/
ssh root@81.70.16.21

#cd /usr/local/lighthouse/softwares/nginx/html
#mv ./dist ./bak/{{name}}
#unzip /home/dist.zip 