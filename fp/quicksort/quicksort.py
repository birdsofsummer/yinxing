def concat(xs):
     acc=[]
     if len(xs)==0:
         return []
     else:
         for x in xs:
             for j in x:
                acc.append(j)
     return acc

def qs(arr):
  if len(arr) == 0 :
      return []
  else:
      h=arr[0]
      t=arr[1:]
      l=qs([x for x in t if x <=h])
      r=qs([x for x in t if x >h])
      d=concat([l,arr[0:1],r])
      return d
