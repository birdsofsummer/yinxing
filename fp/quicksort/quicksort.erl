-module(quicksort).
-export([qs/1,perms/1]).

qs([])->[];
qs([X|XS])->qs([L||L<-XS,L=<X]) ++ [X] ++ qs([R||R<-XS,R>X]).


perms([]) -> [[]];
perms(L) -> [[H|T] || H <- L, T <- perms(L--[H])].
