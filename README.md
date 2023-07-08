# unit2apiproject

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#Shopping-Cart">Shopping Cart</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#PostMan">Postman</a></li>
      </ul>
    </li>
    <li><a href="#challenges">challenges</a></li>
    <li><a href="#note-to-self">note to self</a></li>
    <li><a href="#Built-With-and-Contribution">built with and contribution</a></li>
  </ol>
</details>

# Shopping Cart

-   Link to [trello](https://trello.com/invite/b/ieQ1mtcf/ATTIface979797e68de5cf0f94b9bc46405cE4727943/pack-opening)
-   This code is a RESTful API for an e-commerce application. It allows you to manage users, items, and carts using standard HTTP methods. You can create, retrieve, update, and delete users, items, and carts. The API follows RESTful principles, providing a structured and standardized way to interact with the resources.

## Getting Started

### Prerequisites

|         | List    |         |
| ------- | ------- | ------- |
| Postman | Node.js | Mongodb |
| Github  |         |         |

### Installation

-   copy this link below
<pre><code>https://github.com/bangoo040993/unit2apiproject.git</code></pre>
-   Open up terminal go to your route with this command `cd ~` and then enter following command to create a new folder `mkdir <foldername>`
-   Navigate into the newly created folder using the command `cd <foldername>`
-   Clone the repository using the provided GitHub link by running the following command `git clone <link>`
-   Once the repository has been cloned, use the `ls` command to see the folder name and then navigate into the folder using `cd <foldername>`
-   Install all the required packages by running the command `sudo npm i`
-   Let it cook! Once it's done, creat a file `touch .env`
-   let start coding! In terminal `code .`
-   go to your .env file inside you should have something like this
<pre><code>MONGO_URI=mongodb+srv://Sampleid:samplePassword@cluster0.iAmLost.mongodb.net/samplecluster?retryWrites=true&w=majority
SECRET=i4ml05tn33d460Dh31pM3pu7MyW0r1D1N0rD3R</code></pre>
-   to get the MONGO_URI= you can get this link from your [mongodb](https://www.mongodb.com/) account
-   to get the SECRET= follow this [link](https://emn178.github.io/online-tools/sha256.html)
-   save and then `npm run dev` in terminal
-   open terminal in vs code with `control shift back tic` and run this command `npm run dev`
-   If you're getting invaded my Mongolian and andre 3000 singing then you are good to go!

### PostMan

#### User
-   create a user 'POST' `http://localhost:3000/users/`
<pre><code>{
    "name": "sample",
    "email": "sample",
    "password": "sample"
}</code></pre>
-   login 'POST' `http://localhost:3000/users/login`
 <pre><code>{
    "email": "sample",
    "password": "sample"
}</code></pre>
-   once login you should get something like this ![this](https://i.imgur.com/OEnOoyv.png)
   
-   copy the token from that and paste it here![this](https://i.imgur.com/4cdS0rK.png)

-   any routes that require authetication or authorization will need to have a token 
####
#### Item
-   creat an item or two 'POST'
 <pre><code>{
    "name": "test1",
    "price": "999",
    "description": "test1"
}</code></pre>

-   copy that item _id we will need it for favoriting it to user favorites array `PUT` `http://localhost:3000/items/<ITEM ID HERE!>/favorite`
####
#### Cart
-   now we can make a cart with the id and user id `POST` `http://localhost:3000/carts/<ITEM ID HERE~!>/create`

-   you can see your carts and item with this `GET` `http://localhost:3000/carts/<CARTIDHERE!>`

-   add more item to your cart with this `PUT` `http://localhost:3000/carts/<CARTIDHERE!>/edit`
<pre><code>{
    "item": "itemId"
}</code></pre>
-   remove item from your cart with this `PUT` `http://localhost:3000/carts/<CARTIDHERE!>/remove`
<pre><code>{
    "item": "itemId"
}</code></pre>
-   delete the whole cart with this `DELETE` `http://localhost:3000/carts/<CARTIDHERE!>`
### Challenges

-   When creating or editing names of certain files, there are errors that you can't easily undo. In such cases, it is often best to delete those files and start anew.
-   I had to perform a hard reset on my project twice due to issues with GitHub. I made a big mistake when attempting to dry test cloning, and I learned the importance of always changing the directory before cloning.
-   It's easy to get tunnel vision and focus solely on one problem at a time, which can occasionally yield positive results. However, most of the time, it delays progress on the entire project.
-   Don't get too ahead of yourself. Use the time you save to learn more, understand more, or theoretically test certain aspects of things.
-   DONT STRESS OUT TOO MUCH THIS TOO SHALL PASS
## note to self

-   should have done this in the begining but never lates than never?
-   july 1 going instead of having to manually putting in the userid i need to have the user to create a new cart -done july 1
-   july 1 make a wish list and favorites array for user and
-   july 4 need to finish all the routes
-   finish up

## Built With and Contribution

|                                                       | List                                                                                                |           |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------- |
| JavaScript                                            | ERD Charts                                                                                          | dotenv    |
| dotenv                                                | jest                                                                                                | supertest |
| supertest                                             | artillery                                                                                           | bcrypt    |
| VS Code                                               | Postman                                                                                             | MERN      |
| Trello                                                | sha256                                                                                              | Prettier  |
| mufid[markdownsyntext](https://gist.github.com/mufid) | othneildrew [readmetemplate](https://github.com/othneildrew/Best-README-Template#about-the-project) |@joezari           |

<!-- add more
|                |                 |                 |
-->
