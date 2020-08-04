#LARGE_SECRET_PASSPHRASE=ttt

for i in `ls secrets`
do
    gpg --symmetric --cipher-algo AES256 --quiet --batch --yes --passphrase="$LARGE_SECRET_PASSPHRASE" secrets/$i
done
