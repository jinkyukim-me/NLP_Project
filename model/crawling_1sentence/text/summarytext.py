#!/usr/bin/env python
# coding: utf-8

# In[1]:


import krwordrank
from krwordrank.sentence import summarize_with_sentences


# In[2]:


def summary_text(texts):
    texts = texts
    penalty = lambda x:0 if (25 <= len(x) <= 50) else 1
    stopwords = {'은', '는', '이', '가', '오늘'}
    keywords, sents = summarize_with_sentences(
        texts,
        penalty=penalty,
        stopwords = stopwords,
        diversity=0.7,
        num_keywords=10,
        num_keysents=1,
        scaling=lambda x:1,
        verbose=False,
    )
    keyword = []
    
    for sent in sents:
        print(sent)
    for i in keywords:
        keyword.append(i)
    return print(keyword)

