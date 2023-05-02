// Book class: represent a Book
class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }
  
  // UI class: Handles UI Tasks
  class UI {
    static displayBooks() {
      const books = Store.getBook();
  
      books.forEach(book => UI.addBookToList(book));
    }
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');
      row.classList = 'gap-5 text-center';
  
      row.innerHTML = `
      <td>${book.title}</td>
      <td>by &nbsp;${book.author}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
      list.appendChild(row);
    }
  
    static deleteBook(targetEl) {
      if (targetEl.classList.contains('delete')) {
        targetEl.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.classList = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
      // Vanish in seconds
      setTimeout(() => document.querySelector('.alert').remove(), 1000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#isbn').value = '';
    }
  }
  // Store class: Handles Storage
  class Store {
    static getBook() {
      let books;
      if (localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }
    static addBook(book) {
      const books = Store.getBook();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBooks(author) {
      const books = Store.getBook();
  
      books.forEach((book, index) => {
        if (book.author === author) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  // Event Add Books
  document.querySelector('#book-form').addEventListener('submit', e => {
    e.preventDefault();
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
  
    //   VAlidate
    if (title === '' || author === '' || isbn === '') {
      UI.showAlert('Please fill the fields', 'danger');
    } else {
      //   instantiate book
      const book = new Book(title, author, isbn);
  
      //Add book to UI
      UI.addBookToList(book);
      // Add book to store
      Store.addBook(book);
      // SHow succes message
      UI.showAlert('Book added successfully', 'success');
      //   clear fields
      UI.clearFields();
    }
  });
  // Event: Remov Book
  document.querySelector('#book-list').addEventListener('click', e => {
    // Remove from the UI
    UI.deleteBook(e.target);
    // Remove from the local storage
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book removed', 'success');
  });
  
  // ///////////////////////////
  // Alignments
  const listBtn = document.querySelector('.list');
  const addBtn = document.querySelector('.add-book');
  const contact = document.querySelector('.contact');
  
  const toList = document.querySelector('table');
  const toAdd = document.querySelector('form');
  const toContact = document.querySelector('#contact');
  
  // Default
  // toList.classList = 'd-none';
  // toAdd.style.display = 'block';
  // toContact.classList = 'd-none';
  
  // Go to List
  listBtn.addEventListener('click', e => {
    e.preventDefault();
    toList.classList.remove('d-none');
    toAdd.classList.add('d-none');
    toContact.classList.add('d-none');
  });
  
  // Go to add list
  addBtn.addEventListener('click', e => {
    e.preventDefault();
    toAdd.classList.remove('d-none');
    toList.classList.add('d-none');
    toContact.classList.add('d-none');
  });
  // Go to contactas
  contact.addEventListener('click', e => {
    e.preventDefault();
    toContact.classList.remove('d-none');
    toList.classList.add('d-none');
    toAdd.classList.add('d-none');
  });
  
  setInterval(showTime, 1000);
  function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = 'AM';
  
    if (hour > 12) {
      hour -= 12;
      am_pm = 'PM';
    }
    if (hour == 0) {
      hr = 12;
      am_pm = 'AM';
    }
  
    hour = hour < 10 ? '0' + hour : hour;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
  
    let currentTime = hour + ':' + min + ':' + sec + am_pm;
  
    document.getElementById('clock').innerHTML = currentTime;
  }
  showTime();
  