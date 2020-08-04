#LARGE_SECRET_PASSPHRASE=ttt

mkdir $HOME/secrets

cd scripts

for i in `ls secrets/*gpg`
do
    name=`echo $i|cut -d "." -f1-2`
    gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" --output $HOME/$name $i
done

. $HOME/secrets/*.sh

echo "xxx" $x
echo "yyy" $y
