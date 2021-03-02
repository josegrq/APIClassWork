function getBooks()
{
    var keyword = document.getElementById('keyword');
    var errorMsg = document.getElementById('error-msg');
    if(keyword.value == "")
    {
        errorMsg.innerHTML = "Invalid input! Please enter a keyword.";
        errorMsg.classList.add('error-message');
        keyword.classList.add('has-error');
        return;
    }

    errorMsg.innerHTML = "";
    errorMsg.classList.remove('error-message');
    keyword.classList.remove('has-error');
    var shelf = document.getElementById('book-shelf');
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword.value}&startIndex=0&maxResults=30`)
    .then(response => response.json())
    .then(books => {
        console.log(books);
        var bookList = `<br>
                        <h2 class="text-center">Here are the TOP ${books.items.length} books</h2>
                        <table class="table table-striped table-bordered table-hover">
                            <thead class="thead thead-dark">
                            <tr>
                                <th scope="col">Book Number</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Author(s)</th>
                                <th scope="col">Publisher</th>
                                <th scope="col">Published Date</th>
                                <th scope="col">More Info</th>
                            </tr>
                            </thead>
                            <tbody>`;
        for(const bookIndex in books.items)
        {
            console.log(books.items[bookIndex]);
            var bookDescription = books.items[bookIndex].volumeInfo;
            bookList += `<tr>
                                    <th scope="row">${parseInt(bookIndex) + 1}</th>
                                    <td>${bookDescription.title}</td>
                                    <td>${bookDescription.description}</td>
                                    <td>${bookDescription.authors}</td>
                                    <td>${bookDescription.publisher}</td>
                                    <td>${bookDescription.publishedDate}</td>
                                    <td><a href="${books.items[bookIndex].selfLink}">Here</a></td>
                                </tr>`;
        }
        bookList += `</tbody>
                    </table>`
        shelf.innerHTML = bookList;
    }).catch(error => console.log(error.message));
}

function resetContent()
{
    var shelf = document.getElementById('book-shelf');
    self.innerHTML = "";
}