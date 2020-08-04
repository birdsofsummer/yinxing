s=/data/data/com.android.providers.telephony/databases/mmssms.db
d=`sqlite3 $s "select body from sms where address =106912230005028770  ORDER BY date DESC  limit 1;"`
# 【深圳公益WLAN】您本次的短信验证码为：6283，有效期为7天。您可免费使用SZ-WLAN(free)无线上网服务。请遵守相关法律法规，文明上网。

