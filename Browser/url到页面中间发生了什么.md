# What really happened after user entered the URL on browser

The process after URL get typed in the browser is Call Navigation. (I know, I know, but its not what you think). It basically does what it means by Navigation, which navigate through the browser processor to actually render processor. 



## URL Phase

I believe you guys had experience entering the URL to the browser window. 

> Don't you guys have a browser on your machine? (Giggle, No offence to Blizzard.) 

If you enter something like "Has Johnny Depp won the trial today?", the browser is going to take your keywords and stick to the end of search engine query. 

> https://www.youtube.com/results?search_query=johnny+depp

However, if you enter a link which like an actual web URL, the browser will start the Navigation which will show you the webpage. 

After a valid URL is entered, the browser will search the current cache, see if you have the IP address of the URL. If there wasn't, it will get the fresh IP address from DNS service and store it into cache, waiting for next time that you enter the same URL. 



## TCP/IP Phase

When we discuss about TCP, I guess the first action comes in our mind is shaking hands. Indeed. But there is a small step before building the TCP connection. In current version of Google Chrome, each URL can only form up to 6 TCP connections at the same time; therefore, we will need to wait until other TCP terminate their connection, then the TCP we want to connect is started. 





