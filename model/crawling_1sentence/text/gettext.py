#!/usr/bin/env python
# coding: utf-8

# In[5]:


from pykospacing import spacing


# In[6]:


import warnings
warnings.filterwarnings("ignore")


# In[7]:


def get_texts(data_path):
    file = open(data_path, 'r',encoding='UTF-8')
    data =file.readlines()
    data_list = []
    for sentence in data:
        list_sentence = sentence.replace('\n','').split('.')
        for lines in list_sentence:
            line = spacing(lines)
            data_list.append(line)
    texts = list(set(data_list))
    if '' in texts:
        texts.remove('')
    return texts

