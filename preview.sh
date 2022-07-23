rm -f ./dist/.DS_Store
zip -r preview.zip ./dist
scp preview.zip root@81.70.16.21:/home/
rm -f preview.zip
ssh root@81.70.16.21

# cd /usr/local/lighthouse/softwares/nginx/html
# mv ./dist ./bak/dist$(date +%Y%m%d%H%M)
# unzip /home/dist.zip 
# rm -f ./dist/.DS_Store