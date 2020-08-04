-module(day).
-export([
     gmt_now/0,
     gmt_now1/0
]).

-import(calendar,[]).

% https://blog.csdn.net/tojohnonly/article/details/70142656
% https://www.cnblogs.com/me-sa/archive/2012/05/17/erlang-calendar-date-time.html

day(1) -> "Mon";
day(2) -> "Tue";
day(3) -> "Wed";
day(4) -> "Thu";
day(5) -> "Fri";
day(6) -> "Sat";
day(7) -> "Sun".

month_to_list(1)  -> "Jan";
month_to_list(2)  -> "Feb";
month_to_list(3)  -> "Mar";
month_to_list(4)  -> "Apr";
month_to_list(5)  -> "May";
month_to_list(6)  -> "Jun";
month_to_list(7)  -> "Jul";
month_to_list(8)  -> "Aug";
month_to_list(9)  -> "Sep";
month_to_list(10) -> "Oct";
month_to_list(11) -> "Nov";
month_to_list(12) -> "Dec".

list_to_month("Jan") -> 1;
list_to_month("Feb") -> 2;
list_to_month("Mar") -> 3;
list_to_month("Apr") -> 4;
list_to_month("May") -> 5;
list_to_month("Jun") -> 6;
list_to_month("Jul") -> 7;
list_to_month("Aug") -> 8;
list_to_month("Sep") -> 9;
list_to_month("Oct") -> 10;
list_to_month("Nov") -> 11;
list_to_month("Dec") -> 12.


% "Thu, 20 Feb 2020 15:36:53 GMT"
timestamp_to_iso({{Year, Month, Day}, {Hour, Minute, Second}}) ->
    lists:flatten(
      io_lib:format("~s, ~2..0w ~s ~4..0w ~2..0w:~2..0w:~2..0w GMT",
            [ day(calendar:day_of_the_week(Year, Month, Day)), Day,month_to_list(Month), Year, Hour, Minute, Second])).

gmt_now()->calendar:system_time_to_rfc3339(erlang:system_time(millisecond),
   [{unit, millisecond}, {time_designator, $\s}, {offset, "Z"}]).

gmt_now1()->timestamp_to_iso(calendar:universal_time()).

