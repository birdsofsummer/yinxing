# https://hexdocs.pm/elixir/DateTime.html

defmodule Utc do
   def day(d) do
       case d do
            1 -> "Mon"
            2 -> "Tue"
            3 -> "Wed"
            4 -> "Thu"
            5 -> "Fri"
            6 -> "Sat"
            7 -> "Sun"
       end
   end
   def month_to_list(d) do
       case d do
            1  -> "Jan"
            2  -> "Feb"
            3  -> "Mar"
            4  -> "Apr"
            5  -> "May"
            6  -> "Jun"
            7  -> "Jul"
            8  -> "Aug"
            9  -> "Sep"
            10 -> "Oct"
            11 -> "Nov"
            12 -> "Dec"
       end
   end

   def timestamp_to_iso({{year, month, day}, {hour, minute, second}}) do 
        :lists.flatten(
          :io_lib.format("~s, ~2..0w ~s ~4..0w ~2..0w:~2..0w:~2..0w GMT",
                [ day(:calendar.day_of_the_week(year, month, day)), day,month_to_list(month), year, hour, minute, second]))
   end

   def now() do
       :calendar.universal_time() 
       |> timestamp_to_iso
       |> List.to_string
   end
   def now1() do
       DateTime.utc_now |> DateTime.to_string
   end
end

