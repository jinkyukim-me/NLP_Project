#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import matplotlib.pyplot as plt
from collections import Counter
from konlpy.tag import Okt
from wordcloud import WordCloud
from PIL import Image


# In[2]:


def wordcloud(data_path,book_mask_path,font_path):
        f = open(data_path, 'r',encoding='UTF8')
        data = f.read()
        
        engine = Okt() 
        nouns1 = engine.nouns(data)
        nouns1 = [n for n in nouns1 if len(n) > 1]

        # Counter: 단어수 세기, 가장 많이 등장한 단어(명사) 40개
        count = Counter(nouns1)
        tags = count.most_common(100)
        
        # 워드 클라우드 배경 사진
        book_mask = np.array(Image.open(book_mask_path))

        # WordCloud, matplotlib: 단어 구름 그리기
        font_path = font_path
        wc = WordCloud(font_path=font_path, background_color='white', width=800, height=600, mask=book_mask)
        cloud = wc.generate_from_frequencies(dict(tags))
        plt.figure(figsize=(10,8))
        plt.axis('off')
        plt.imshow(cloud)

