# sign

|method|path|data|
|---|---|----
|post|/sign|{}
|post|/resign|{resign_card_id:"xxx",date:"2019-01-01"}
|get|/sign_month|{}
|get|/sign_history|{}
 
===========================

## 签到

```json
{
      "user_id": "xxxxx",
      "is_sign_in": 1,
      "user_sign_rank": 149,
      "sign_count": 149,
      "sign_time": 1577061634,
      "cont_sign_num": 1, 
      "cout_total_sing_num": 1,
      "total_sign_num": 1,  
      "hun_sign_num": 0,
      "total_resign_num": 0  
}

```

|字段|示例|说明|
|---|---|---
|user_id| "xxxx"| _id
|is_sign_in| 1|今天是否已签到
|user_sign_rank| 149|今天签到排名
|sign_count| 149|今天签到总数
|sign_time| 1577061634|今天签到时间
|cont_sign_num| 1|连续签到1天
|cout_total_sing_num| 1|累计签到1天
|total_sign_num| 1|累计签到1天
|hun_sign_num| 0|...
|total_resign_num| 0|补签卡

## 签到月记录

```json
{
    "sign_user_info": {
      "rank": 2,
      "sign_total": 700,
      "sign_keep": 67,
      "is_block": 0,
      "sign_month": [
        {
          "d": "1",
          "t": "0:00",
          "rank": "1",
          "sign_time": "1575129605",
          "is_resign": 0,
          "sign_score": null,
          "term_type": "0",
          "sign_type": "pc"
        }]
    },
    "resign_info": {
      "resign_card_num": 0,
      "mon_miss_sign_num": 0,
      "hun_sign_num": 99,
      "total_resign_num": 0
    },
    "is_detail": 1
}

```

### sign_user_info

|字段|示例|说明|
|---|---|---
rank| 2|排名
sign_total| 700|累计签到数
sign_keep| 67|连续签到天数


### sign_month

|字段|示例|说明|
|---|---|---
d| 1| 日期
t| 0:00|时间
rank| 1|当天第几个签到
sign_time| 1575129605|签到时间戳
is_resign| 0|是否为补签
sign_score| null|得分
term_type| 0|...
sign_type| pc|签到方式

### resign_info

|字段|示例|说明|
|---|---|---
resign_card_num| 0|有几张补签卡?
total_resign_num| 0|?
mon_miss_sign_num| 0|这个月漏签几天?
hun_sign_num| 99|...


## 签到总记录

```json
{
  "current_rank_info": {
    "sign_count": 1431,
    "member_count": 308415,
    "sign_rank": 68,
    "dir_rate": "0.1"
  },
  "yesterday_rank_info": {
    "sign_count": 1898,
    "member_count": 308412,
    "sign_rank": 69,
    "dir_rate": "0.1"
  },
  "weekly_rank_info": {
    "sign_count": 1862,
    "member_count": 308395,
    "sign_rank": 69
  },
  "monthly_rank_info": {
    "sign_count": 0,
    "member_count": 0,
    "sign_rank": 0
  }
}
```
