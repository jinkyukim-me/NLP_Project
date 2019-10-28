from selenium import webdriver
driver = webdriver.Chrome('./driver/chromedriver.exe')
driver.set_window_size(1200, 800)
driver.implicitly_wait(3)
try:
    for j in range (10,300):
        line = 'https://brunch.co.kr/@moviehouse/'+str(j)
        driver.get(line)
        contents = driver.find_element_by_xpath('/html/body/div[3]/div[1]/div[2]/div[1]').text
        if not contents:
            continue
        contents = contents.replace('\n', '')

        a = str(j) + '.txt'
        f2 = open(a, 'a+', encoding='utf-8', newline='')
        f2.write(contents)
        #print(j+':'+a)
except Exception as e:
    print(e)
#f.close()