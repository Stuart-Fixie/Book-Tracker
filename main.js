let myLibrary = [];

function Book(title, author, published, pages, rating, read) {
    this.title = title,
    this.author = author,
    this.published = published,
    this.pages = pages,
    this.rating = rating,
    this.read = read;
}

async function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    let rating = document.getElementsByName('stars');
    for(let star of rating) {
        if(star.checked) rating = star.value;
    }
    let bookData = await getBookData(title, author);

    let newBook = new Book(
        bookData.title, 
        bookData.author_name[0], 
        bookData.publish_date[0], 
        bookData.number_of_pages_median,
        rating,
        false
        )

    let alreadyAdded = myLibrary.forEach(entry => entry.name === book.name);
    if(!alreadyAdded) {
        myLibrary.push(newBook);
        console.log(myLibrary)
    }
    else{ console.log("This book has already been added") };
}

async function getBookData(title, author) {
    title = title.replace(" ", "+")
    author = author.replace(" ", "+")
    let response = await fetch("https://openlibrary.org/search.json?title=" + title + "&author=" + author)
    let bookData = await response.json();
    let firstBook = bookData.docs[0]

    return firstBook
}

function addBookModal() {
    const modal = document.getElementById("addBook");
    console.log("model", modal)
    modal.classList.remove("hidden");
    modal.classList.add("add-book");
}