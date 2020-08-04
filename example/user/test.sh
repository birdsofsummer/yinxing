wrk  -t12 -c100 -d30s http://localhost:8080/api/list

# Running 30s test @ http://localhost:8080/api/list
#   12 threads and 100 connections
#
#
#
#   Thread Stats   Avg      Stdev     Max   +/- Stdev
#     Latency   617.41ms   77.47ms   1.19s    79.50%
#     Req/Sec    21.55     18.79    70.00     78.24%
#   4640 requests in 30.08s, 1.96MB read
# Requests/sec:    154.25
# Transfer/sec:     66.73KB
