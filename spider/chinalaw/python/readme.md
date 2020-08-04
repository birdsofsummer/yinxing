## 安装

+ 安装python3
+ setup.sh

## 投票方法

### 方法1 手动验证码登录

+ python3 main.py
+ 等待验证码
+ 查看一下验证码code.jpg
+ 输入验证码
+ 回车

### 方法2 百度ocr识别验证码登录

验证码很恶心
ocr准确率不高。。

环境变量配置

```
baidu_ocr_AppID="xxx"
baidu_ocr_APIKey="xxx"
baidu_ocr_SecretKey="xxx"

```
+ 到[百度](https://ai.baidu.com/ai-doc/OCR/Ek3h7xypm "") 申请ak
+ 设置环境变量
+ python3 main.py --ocr

