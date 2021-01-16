//Book Class
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI for USER INTERFACE INTERACTION
class UI {
    static showBooks() {
        
        const books = Store.getBook();
        books.forEach(function(book){
            UI.addBookToList(book);
        })
    }

    //Adding book to list
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.isbn}</td>
                            <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>`;
        list.appendChild(row);
        
    }

    //Clear All field after Adding Book



    static deleteValueFields(){
        const title = document.querySelector('#bookName');
        const author = document.querySelector('#authorName');
        const isbn = document.querySelector('#isbn');
        title.value = '';
        author.value = '';
        isbn.value = '';
       
    }

    //Clear Book

    static clearBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();

        }

    }

    //static for validation

    static validateBookList (message, className) {
        
        const p = document.createElement('p');
        p.className = `alert alert-${className} font-weight-bolder text-center`;
        p.appendChild(document.createTextNode(message));
        const beforeValidate = document.querySelector('#beforeValidate');
        const afterValidate = document.querySelector('#afterValidate');
        beforeValidate.insertBefore(p, afterValidate);
        
        setTimeout(function(){
           const alert = document.querySelector('.alert');
           alert.remove();

        }, 1000)
        
    }
}

//Local Storage
class Store {
    static getBook(){
        let books;
        if (localStorage.getItem('books') === null){
            books = [];

        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static storeBook(book){
        const books = Store.getBook();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));


    }

    static removeBook(isbn){
        const books = Store.getBook();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);

            }
        });
        localStorage.setItem('books', JSON.stringify(books));        

    }
}


//DISPLAY BOOK
addEventListener('DOMContentLoaded', UI.showBooks)



//ADD BOOK
const form = document.querySelector('#book-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    //DEFINE VALUE VARIABLE
    const title = document.querySelector('#bookName').value;
    const author = document.querySelector('#authorName').value;
    const isbn = document.querySelector('#isbn').value;

    if(title.value === '' || author.value === '' || isbn === ''){
        //Validate if empty

        UI.validateBookList('Please fill all fields', 'danger');

    
           } else{

    //INSTANTIATE BOOK
    const book = new Book(title, author, isbn);      
   
    //DISPLAY
    UI.addBookToList(book);
    //Add book to local storage
    Store.storeBook(book);
    //Validate if successful
    UI.validateBookList('Book Added', 'success');


    //Clearfields
    UI.deleteValueFields();

    }

    

    

})

//DELETE BOOK
const deleteBtn = document.querySelector('#book-list');
deleteBtn.addEventListener('click', function(e){    
    UI.clearBook(e.target);
    //remove book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.validateBookList('Book is deleted', 'success');
})