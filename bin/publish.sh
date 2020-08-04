#   https://docs.npmjs.com/creating-and-viewing-authentication-tokens
#https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow

# npm token create

#    npm password:
#    ┌────────────────┬──────────────────────────────────────┐
#    │ token          │ ********-****-****-****-************ │
#    ├────────────────┼──────────────────────────────────────┤
#    │ cidr_whitelist │                                      │
#    ├────────────────┼──────────────────────────────────────┤
#    │ readonly       │ false                                │
#    ├────────────────┼──────────────────────────────────────┤
#    │ created        │ 2019-12-18T02:11:07.210Z             │
#    └────────────────┴──────────────────────────────────────┘
# npm token create --read-only
# npm token create --cidr=192.0.2.0/24
# npm token create --read-only --cidr=192.0.2.0/24
# npm token list

#   $ npm token list
#   ┌────────┬─────────┬────────────┬──────────┬────────────────┐
#   │ id     │ token   │ created    │ readonly │ CIDR whitelist │
#   ├────────┼─────────┼────────────┼──────────┼────────────────┤
#   │ 74*1*0 │ 6*4*9*… │ 2019-12-18 │ no       │                │
#   ├────────┼─────────┼────────────┼──────────┼────────────────┤
#   │ 8*5*** │ 9*0**8… │ 2019-12-18 │ no       │                │
#   ├────────┼─────────┼────────────┼──────────┼────────────────┤
#   │ 78*7*0 │ 38897*… │ 2019-12-11 │ no       │                │
#   ├────────┼─────────┼────────────┼──────────┼────────────────┤
#   │ **813* │ 5**589… │ 2019-02-16 │ no       │                │
#   └────────┴─────────┴────────────┴──────────┴────────────────┘

# npm token delete 123456

#$ npm owner ls
#birdsofsummer <1052334039@qq.com>
#npm owner add xxx yinxing
#npm owner rm xxx yinxing

create_tk(){
    npm token create $*
}

list_tk(){
    npm token list
}

del_tk(){
    npm token delete
}

set_pub(){
    tk=$*
    echo export NPM_TOKEN=${tk} >> ~/.profile
    source ~/.profile
    echo //registry.npmjs.org/:_authToken=$tk >> ~/.npmrc
    #npm config set registry http://registry.npmjs.org
}

set_pub ${NPM_TOKEN}
echo "start..."
echo "--------------------------------------------------------------------------------"
git clone https://github.com/birdsofsummer/yinxing
cd yinxing
npm publish
echo "done"
echo "--------------------------------------------------------------------------------"

#env
