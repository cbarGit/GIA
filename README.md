GIF IT ALL
==========

####It is an app based on `electron` that search instantly gifs every time you type a character in the field.

Inspired by this woman **Mary Rose Cook**, from this video:
https://www.youtube.com/watch?v=I8vLt5AB2TI

**Version 0.1**

![Output sample](https://raw.githubusercontent.com/cbarGit/GIA/master/img/sample.gif)

It uses the giphy API, the public beta one, from here:
> https://github.com/Giphy/GiphyAPI .
*If you have a private key, **change the public one with that**. The public beta key should be used only for development.*
Look inside `js/utils.js`.

The font used in the app:
https://fontlibrary.org/en/font/futura-renner

Next steps:
- ~~Add language choice.~~
- ~~Add a context menu for saving gif.~~
- ~~Figure out a better download of gif, now it is limited to 10 gifs.~~ --> No more limited, there is a spinbox.
- ~~Add package binaries.~~ Not possible, but you can do it with `npm build` in the root folder (but before install `electron-packager` with `npm install electron-packager` command).
- Better bandwidth usage.


-----------------------------------------------------------------------------
![alt tag](https://raw.githubusercontent.com/cbarGit/GIA/master/img/logo.png)
