const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username format" });
  }
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  res.status(201).json({ message: "User successfully registered" });
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.json(books);});
  /*const getAllBooks = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books); 
        }, 1000); 
    });
};

public_users.get('/', async (req, res) => {
    try {
        
        const allBooks = await getAllBooks();
        res.json(allBooks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});*/

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  
  const book = books[isbn];

  if (book) {
      res.json(book);
  } else {
      res.status(404).json({ message: "Book not found" });
  }
  /* Promise callbacks with Axios
  const isbn = req.params.isbn;
  axios.get(`url endpoint`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error fetching book details by ISBN:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});*/
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  
  const booksArray = Object.values(books);

  const booksByAuthor = booksArray.filter(book => book.author === author);

  if (booksByAuthor.length > 0) {
      res.json(booksByAuthor);
  } else {
      res.status(404).json({ message: "Books by author not found" });
  }
  /* Async-Await
  const author = req.params.author;
  try {
    const response = await axios.get(`url endpoint`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching book details by author:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});*/
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  
    const booksArray = Object.values(books);
  
    const booksByTitle = booksArray.filter(book => book.title === title);
  
    if (booksByTitle.length > 0) {
        res.json(booksByTitle);
    } else {
        res.status(404).json({ message: "Books by title not found" });
    }
    /*  Promise callbacks
    const title = req.params.title;
  axios.get(`url endpoint`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error fetching book details by title:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});*/
});

//  Get book review
public_users.get('/review/:isbn',async (req, res) => {
  //Write your code here
  
    const isbn = req.params.isbn;
      await res.send(JSON.stringify(books[isbn].review),null,4);
    
  });

module.exports.general = public_users;
