//Book Class: Represents every Book
class Book {
    constructor(name, author, genre) {
        this.name = name;
        this.author = author;
        this.genre = genre;
    }
}

//UI Class: Handles UI tasks
class UI {
    static displayBooks() {
        const storedBooks = [
            {
                name: "Book 1",
                author: "Desmond Desmondson",
                genre: "Fiction"
            },
            {
                name: "Book 2",
                author: "Barnes Barnsley",
                genre: "Programming"
            }
        ];

        const books = storedBooks;

        books.forEach((book) => {
            UI.addBookToList(book);
        })
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-table');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td><a href = "#" class = "btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(newRow);
    }

    static clearFileds() {
        // OLD METHOD:
        // document.querySelector("#add-book").value = "";
        // document.querySelector("#author-name").value = "";
        // NEW METHOD: Pass the parent form elemant
        document.querySelector("form").reset();
    }

    static deleteBooks(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            UI.showAlert("Successfully Deleted", "info")
        }
        
    }

    static showAlert(message,type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-dismissible alert-${type}`
        alert.appendChild(document.createTextNode(message))
        const container = document.querySelector("form");
        const formStart = document.querySelector("#form-start");
        container.insertBefore(alert, formStart)

        // VANISH in 3 seconds
        setTimeout(()=>document.querySelector(".alert").remove(), 2500)
    }
}

// Store Class: Handles Storage
// Event:Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks())

// Event:Add Books

const submit = document.querySelector("#submit");
submit.addEventListener("click", (event) => {
    event.preventDefault()
    const bookName = document.querySelector("#add-book").value
    const authorName = document.querySelector("#author-name").value
    const genre = document.getElementsByName("gridRadios")
    let selectedGenre = ""
    for (i = 0; i < genre.length; i++) {
        if (genre[i].checked) {
            selectedGenre = genre[i].value;
        }

    }

    // Validate if all the fields are filled
    if (bookName === "" || authorName === "") {
        UI.showAlert("Fill the required fields","danger");
    }
    else {

        // Adding New Books
        const newBook = new Book(bookName, authorName, selectedGenre);
        UI.addBookToList(newBook);

        // Resetting all hte fields to blank
        UI.clearFileds();

        // SUCCESS alert
        UI.showAlert("Successfuly added","success")
    }
})
// Event:Remove Books

// *********IMPORTANT******
// Since we have multiple delete buttons, we select the whole table and 
// check if the clicked element is a delete button this is possible by giving the arrow function a parameter "e" 
// and e.target gives the properties of the clicked element 

const table = document.querySelector(".table")
table.addEventListener("click", (e) => {
    UI.deleteBooks(e.target)
})