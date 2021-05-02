
# Codio Dynamic Website Template

To download and configure a copy of this template code for your assignment open your Codio box, locate the Terminal and run the following commend:

```shell
$ curl -sL https://bit.ly/2TJtxjF | sudo -E bash -
```
# Bookshop 




# Functionality

==Instructions==-The functions of Stage 1 (three web pages) and the settlement interface of the shopping cart of Stage 2 have been completed. The username and password I created for testing are aaa and 123456 respectively

==Testing Accounts==-User information is in the table in the Stage1 section of the README

==Failed attempt==-I have completed the three functions of Stage1, but the API obtained in the online book does not have the "EAN (barcode) number information" required in the second part, so it cannot be displayed in the book detail page appear. Even though I have created the page structure of Stage2, the information retrieval fails in the part of getting the link from the database. The code to try is in payment.handlebars payment.js and secure.js.

==The content currently completed is all three functions of Stage1==




 Build a website for an online company selling books.

Existing users:

| username | password | email         |
| -------- | -------- | ------------- |
| bbb      | p455w0rd | bbb@gmail.com |
| ccc      | p455w0rd | ccc@gmail.com |
| ddd      | p455w0rd | ccc@gmail.com |

## Part1



A homepage that can be displayed without logging in.

The database information related to the book has been created in `data/books.sql`

Book database information includes:

| id   | book_id | book_name | author_name | publication_time | URL  | book_price | detailed | publisher |
| ---- | ------- | --------- | ----------- | ---------------- | ---- | ---------- | -------- | --------- |
|      |         |           |             |                  |      |            |          |           |

The created files related to part1 are:

`modules/bookInfo.js`

`views/index.handlebars`

This is an interface that does not require login. This interface displays information about 10 books for sale：`bookPicture` `bookName` ` AuthorName` ` bookPrice `

The button `Add to Basket` cannot be used without logging in





## Part 2

The created files related to part2 are:

`modules/bookInfo.js`

`views/index.handlebars`

Clicking on the thumbnail and the name without authorization will jump to the book's detailed information page

Clicking on the thumbnail or name will load the product details page showing the following content: Use the find method to display

The detailed information of the book includes：

`bookName`

`bookPicture`

`bookPrice`

`bookURL（api）`

`bookDescription`

Which includes the "add to cart" function



## **Part 3**

shopcart.sql is used to store the book information added to the shopping cart

Related documents include：

`shopcard.js`

`secureshopcard.handlebars`

`showshopcard.handlebars`



# Stage2

Provide checkout (incomplete) and delete functions in the shopping cart

The link for checkout is：https://gilbert-asia-8080.codio-box.uk/secure/payment

The relevant documents is：payment.handlebars`



---------------

All content retrieved and processed with the database is done through `secure.js` and `public.js`





## Tips:

The variable name related to the shopping cart is written as card in some places in the file, but it does not affect normal operation (ie: card=cart)

---------------

# Functionality

Instructions - The functions of Stage 1 (three web pages) and the checkout interface of the shopping cart of Stage 2 have been completed. The username and password I created for testing are `aaa` and `123456` respectively

Testing Accounts - User information is in the table in the Stage1 section of the README

Failed attempt - I have completed the three functions of Stage1, but the API obtained in the online book does not have the "EAN (barcode) number information" required in the second part, so it cannot appear on the book detail page. Even though I have created the page structure of Stage2, the information retrieval fails in the part of getting the link from the database. The code to try is in payment.handlebars payment.js and secure.js.

Attempt to deploy server in Heroku but failed

URL:https://liaoy19-sem1.herokuapp.com/ | https://git.heroku.com/liaoy19-sem1.git

Currently completed content is -All three functions of Stage1


