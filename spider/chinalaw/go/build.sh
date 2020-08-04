

win(){
    GOOS=windows
    GOARCH=amd64
    go build  -o vote_win64.exe main.go
    vote_win64.exe
}

android(){
    GOOS=android
    GOARCH=arm
    go build  -o vote_android main.go
}


win


