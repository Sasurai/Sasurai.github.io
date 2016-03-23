---
layout: post
title: "Plans, projects and more"
date: 23-03-2016
---

<p>Fair warning, this post might be lengthy, because I'm going to talk about a bunch of different things. I'm going to try and put section titles so, if you're interested in something in particular, can scroll right down to it.</p>

<h1>So, what's up with the blog?</h1>

<p>The first thing I want to talk about is why I have set up the website and blog. As I mentioned on twitter (where nobody read it, probably XD), I have a plan, and I wasn't kidding. Taking a page from a good friend's book, I'm going to try to make a public log of the useful, interesting (kind of, both) stuff I do on my free time. The main objective of this is not keeping people informed whatsoever, but motivating myself and forcing me to actually progress on my personal projects.</p>

<p>Starting today, I will try to make a post a week, usually on the weekend (but it's holidays this weekend and I'm going to Milan, woohoo), explaining what I've done during the week, how is whatever I'm working on at the moment going, and maybe posting some screenshots or whatever. I will also try to highlight problems and give useful advice, in case someone starts reading me. On this first post I can't really tell you what next week's will be about, mostly because I have several different projects I want to start or continue, some by myself and some with friends, and I don't know what I'll do yet. Anyways, this being the first post, and today being wednesday, I'm going to talk not only about this week, but also about what I did during the weekend, because it's pretty relevant.</p>

<h1>Kobe Team and AirConsole</h1>

<p>Last week a friend found [AirConsole]{https://www.airconsole.com/}, and we thought it was awesome. If you don't know about it, it's a website that let's you play web games using mobile phones as controllers, which makes it excellent for big party games and playing with lots of friends. We also found out that they were holding a contest, and even if we were kind of late to the party, having only the weekend to put our game together, we decided we wanted in. We determined we had the noble purpose of winning and using the cash to go to a good restaurant and eat Kobe meat, and thus the name was decided. To put credit where it's due and make sure I don't forget later, I'll list now the three members of the team: [Manuel Álvarez]{https://twitter.com/adtvergara}(Manu, for future references XD), [Miguel Janer]{https://twitter.com/migueljaner}, and [Jorge Martinez]{https://twitter.com/Sasurai_JMV} (yup, that's me).</p>

<h2>About the game</h2>

<p>The first thing was to figure out what we wanted to do. Of course, being the platform as it is, we quickly decided that some kind of fast and fun multiplayer game was our best option. After doing some brainstorming over breakfast, and checking for free unity assets (because we had no artist, even if Manu ended up modelling the scenario), we decided that playing football with tanks and shooting your friend was bound to be fun. Also, free to use assets from the Unity Tanks! tutorial.<p>

<p>The game was submitted on sunday, and it's already going through the review process, so I'm hoping I'll be able to give you a link soon. I'll update the post when it's published, and I'll probably also post it on twitter. For now I can show you the cover art, which is mostly a screenshot with the title on top. It supports up to sixteen players, and as far as me and my friends are any judge, it's pretty damn fun to play. We are also still working on it, so expect some polish and bugfixing in the near future, when we get more feedback.</p>

![Football with tanks! What could possibly go wrong?]{/images/tankball_cover.png "Tankball! cover art. Again, bear in mind we have no artists on the team.""}

<h2>Working with AirConsole</h2>
<p>This part will probably be a bit more technical, which will be good or bad depending on your background. Anyways, here we go.</p>

<p>AirConsole's API is well described in their website, and they provide some useful examples. We think that the interface between the web game and the mobiles used as controllers is really great an well thought, at least for the kind of simple game we had in mind. You basically have to implement some event listeners (or whatever they are called, I usually program neither in C# nor JavaScript, so I'm not clear on the nomenclature here) on each side of the communication, and then react in whichever way you want. We had a bit of trouble sending the color of the player to the device, mostly because Unity and JavaScript refused to cooperate, but when we figured out that JS didn't like alpha, and that Unity had its own color utilities, we were fine. In case someone is interested, we used *UnityEngine.ColorUtility.ToHtmlStringRGB(PlayerColor)* in Unity, sent the string, and then just did *div.style.backgroundColor = data.color;* in the receiving function on JS.
</p>

<p>Integrating AirConsole in Unity was frankly easy, having to just download the plugin and follow the instructions on the documentation. Lastly, the plugin gives you the option to open a browser with simulted devices for easy testing, and to try extreme cases (like having sixteen players connected) without having to call all your neighbours. Even so, we decided to clearly separate the real input from the logic, and implemented a fake input class that used the keyboard, allowing us to do quick 1v1 matches and spawning as many tanks as we wanted without having to plug any device, virtual or otherwise. This, as you may imagine, proved to be extremely useful.</p>

<p>As for their review process and quality of support after uploading the game, I can't really say much because it has been only a couple of days and we are still in review. However, even after such a short time we have already received some feedback, and they were really quick to answer to a mail we sent with some questions, so things are looking great on that front too.</p>

<h1>So, what's next?</h1>

<p>On the Kobe Team - Tankball! front, as I said, we plan to keep polishing and updating the game until we feel it is as great as it can be. We may also be looking to find an artist and a sound guy to have original assets, but that's kind of a secondary thing, specially for now. We also have some ideas to make versions of the game for playing 1v1 on a single keyboard, and maybe to play on desktop with controllers, but we haven't decided on anything yet.</p>

<p>As for myself, I think a great deal of my free "useful stuff" time will be spent on Tankball! for now. If I have any time left I also have a personal project I want to start, and Manu has another idea for a game that looks promising and in which I may want in, but I won't say anything about them for now. Anyhow, if something is clear is that there are a lot of exciting things on the horizon, and I hope some awesome games will be made, so stay tuned!</p>