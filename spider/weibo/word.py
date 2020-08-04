import requests
import re
import jieba
import json

#
black_list= ['是', '也', '人', '在', '都', '有', '不', '这', '说', '和', '他', '就', '很', '好', '你', '让', '但', '去', '对', '看', '到', '还', '要', '而', '被', '又', '会', '得', '转', '上', '她', '多', '吧', '再', '来', '事', '做', '中', '把', '更', '写', '能', '没', '太', '为', '们', '月', '给', '与', '最', '呀', '回', '过', '想', '日', '呢', '大', '才', '用', '着', '后', '吗', '从', '真', '跟', '吃', '已', '时', '谁', '以', '并', '地', '却', '前', '比', '下', '它', '个', '者', '像','的',  '了',  '就是',]


def clearText(TEXT):
    rule = re.compile(u"[^\u4e00-\u9fa5]") #匹配非中文字符
    TEXT = rule.sub('',TEXT) #将非中文字符替换为空
    return TEXT

def sum(t=[]):
    t1=filter(lambda x: x not in black_list,t)
    r={}
    for x in t1:
        if x in r:
          r[x]=r[x]+1
        else:
          r[x]=1
    r1=list(r.items())
    r1.sort(key=lambda x:x[1],reverse = True)
    top=[x[0] for x  in r1[:600]]
    print(top)
    #return [{"name":a,"value":b} for (a,b) in r1]
    return dict(r1)

def save(file2,r=[]):
    with open(file2,"w") as f1:
        j=json.dumps(r,ensure_ascii=False)
        f1.write(j)

def main():
    file1="data/mblog.txt"
    file2="data/mblog-words.json"
    with open(file1) as f:
        t1=f.read()
        t2=clearText(t1)
        t3=jieba.cut(t2)
        words=list(t3)
        r=sum(words)
        save(file2,r)
main()
