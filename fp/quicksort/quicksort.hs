--qs [1,2,7,3,4]
qs n case of 
     []->[]
     (x:xs)-> qs [l|l<-xs,l<x] ++[x]++qs [r|r<-xs,r>x]
flat a= [y|x<-a,y<-x]
take 2.reverse.qs$ flat a
