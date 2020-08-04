#md grpc
#protoc -I=. --go_out=plugins=grpc:./grpc zzz.proto



#protoc --js_out=import_style=commonjs,binary:./ zzz.proto
protoc --js_out=binary:. zzz.proto



