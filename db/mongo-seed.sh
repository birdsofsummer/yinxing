#  https://www.mongodb.com/download-center/community
#  https://www.mongodb.org/dl/linux/x86_64-debian92

#  https://repo.mongodb.org/apt/debian/dists/stretch/mongodb-org/4.2/main/binary-amd64/mongodb-org-server_4.2.2_amd64.deb
#  https://repo.mongodb.org/apt/debian/dists/stretch/mongodb-org/4.2/main/binary-amd64/mongodb-org-tools_4.2.2_amd64.deb
#  https://repo.mongodb.org/apt/debian/dists/stretch/mongodb-org/4.2/main/binary-amd64/mongodb-org-mongos_4.2.2_amd64.deb
#  https://repo.mongodb.org/apt/debian/dists/stretch/mongodb-org/4.2/main/binary-amd64/mongodb-org-shell_4.2.2_amd64.deb
#  https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-debian92-4.2.2.tgz

#https://docs.mongodb.com/v2.2/reference/mongoimport/
#file= ./db/users.json
#mongo="mongodb://localhost:27017?retryWrites=true&w=majority&connect=direct"

file=$*
mongoimport --host $mongo --db blog --collection users --file $file --jsonArray
