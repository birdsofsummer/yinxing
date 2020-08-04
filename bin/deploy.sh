git clone $GitUrl
cd ${GitRepository}
p=/tmp/dep
mkdir -p $p
#fn=`ls ${GitRepository}`
fn=`find  . -maxdepth 1 -type d |sed "1d"`

cd $GitRepository
for i in $fn
do
    echo $i
    cd $i
    npm install
    zip  -r $p/$i.zip *
    cd ..
done

echo "done"
ls $p
npm deploy
node index.js
