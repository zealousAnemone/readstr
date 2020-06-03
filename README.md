# Readstr
## A random book recommendation generator

### Notes:
This is an evolving project. I thought originally that it would be easy to base a book recommendation generator on a popular book site API, e.g. Goodreads or LibraryThing, but neither gave the functionality I wanted. (to pick a book at random and access the book cover and description/tags in addition to basic info like the title and author.) 

I found that the NYT bestsellers list API would give me some of the functionality I wanted (a straight up array of books I could pull from randomly, a high quality image of the cover, and a succinct description,) but any particular endpoint available through the NYT only returns 15 books - far too few for what I wanted to do.

So, I switched gears and started making my own database of books based on <a href="https://thegreatestbooks.org">The Greatest Books</a> website. This works pretty well, except I didn't want to attempt to store book descriptions or (more significantly,) covers, so I decided to hit up the Google Books API for that.

As of the writing of this README, the app is successfully connecting to my book database and the Google Books API, however, there is a mismatch in timing w/ my async functions, so the descriptions and book covers are showing up "a book late." (No, War and Peace is not the story of "Captain Ahab's quest to avenge the whale that 'reaped' his leg", despite what the app says.) I'm currently (as of 5/3/20) working to correct this. The other thing I don't like about the Google Books API is how small many of the book covers are, but c'est la vie I suppose.

I have created two separate branches for these different implementations: nyt-bestseller for my NYT Bestsellers version, and internal-db for the one using the Postgres db I created. Currently, the NYT Bestseller one is much prettier (and more functional,) but the internal database one is more along the lines of what I actually wanted to do in that it already has significantly more content. Master is (currently) in line with the internal-db branch.

Stay tuned for more!
