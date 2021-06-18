///////////////// DOM///////////////////////
const addBtn = document.querySelector('#add');
const addBookForm = document.querySelector('#addB');
const closeForm = addBookForm.querySelector('span');
const shelf = document.querySelector('.shelf');

////////////// Event listener///////////////
addBtn.addEventListener('click',()=>{
    addBookForm.style.display = "flex";
    addBookForm.reset();
});
closeForm.addEventListener('click', ()=>{
    addBookForm.style.display = "none";
}); 
addBookForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    addBookForm.style.display = "none";
    getInfoAndUpdateLibrary();
    
});

/////////////// GLOBAL Variable /////////////
let myLibrary =[];

///////////// BOOK constructor /////////////
function Books(title,author,pageNum,readYet){
    this.title =title;
    this.author =author;
    this.pageNum = pageNum;
    if(readYet) this.readYet = 'yes';
    else this.readYet='no';
    Books.prototype.info = () =>{
        console.log(`${title} by ${author}, ${pageNum} pages, read: ${readYet}`);
    }
}
//////////// Operaiton Function ////////////
function getInfoAndUpdateLibrary(){
    let formVal = [];
    formVal.push(addBookForm.querySelector('#title').value);
    formVal.push(addBookForm.querySelector('#author').value);
    formVal.push(addBookForm.querySelector('#pageNum').value);
    formVal.push(addBookForm.querySelector('#readYet').checked);
    const newBook = new Books(formVal[0],formVal[1],formVal[2],formVal[3]);
    myLibrary.push(newBook);
    displayShelf(myLibrary);
}
function displayShelf(){
    shelf.innerHTML="";
    let counter = 0;
    if(!myLibrary.length) 
    {
        shelf.innerHTML="";
        return;
    }
    myLibrary.forEach(book => {
        putOnShelf(book.title,counter);
        book['data-num'] = counter;
        counter++;
    });
    //// click book ////
    const booksImg = document.querySelectorAll('.shelf figure');
    booksImg.forEach(book => {
        book.addEventListener('click',(e)=>{
           displayBookInfo(myLibrary[e.target.getAttribute("data-num")],e.target.getAttribute("data-num"));
        })
    });
}

function putOnShelf(title,counter){
    ///  add on UI ///
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const bookTitle = document.createElement('div');
    figure.appendChild(image);
    figure.appendChild(bookTitle);
    /// set attribute ///
    image.setAttribute('src',"./pictures/book.png" );
    image.setAttribute('data-num',`${counter}`);
    bookTitle.textContent = title;
    bookTitle.setAttribute('data-num',`${counter}`)
    shelf.appendChild(figure);
}

function displayBookInfo(book, data_num){
    const displayInfo = document.querySelector('.display .wrapper'); 
    const endBtn = document.querySelector('.display .wrapper button');
    const close = document.querySelector('.display .wrapper span');

    const title = document.createElement('p');
    const author = document.createElement('p');
    const pageNum = document.createElement('p');
    const readYet = document.createElement('p');

    title.textContent=`Title: ${book.title}`;
    author.textContent=`Author: ${book.author}`;
    pageNum.textContent=`Page number: ${book.pageNum}`;
    readYet.textContent=`Read already: ${book.readYet}`;
    
    ///////display///////
   
    displayInfo.parentElement.style.display = "flex";
    displayInfo.insertBefore(title,endBtn);    
    displayInfo.insertBefore(author,endBtn);
    displayInfo.insertBefore(pageNum,endBtn);
    displayInfo.insertBefore(readYet,endBtn);


    function closeDisplay(){
        displayInfo.parentElement.style.display = "none";
        displayInfo.removeChild(title);
        displayInfo.removeChild(author);
        displayInfo.removeChild(pageNum);
        displayInfo.removeChild(readYet);
        endBtn.removeEventListener('click',deleteABook,true);
    }

    function deleteABook(){
        displayInfo.removeChild(title);
        displayInfo.removeChild(author);
        displayInfo.removeChild(pageNum);
        displayInfo.removeChild(readYet);
        displayInfo.parentElement.style.display = "none";
        
        myLibrary.splice(data_num,1);
        displayShelf();
        close.removeEventListener('click',closeDisplay);
    }
    close.addEventListener('click',closeDisplay,{once : true});
    endBtn.addEventListener('click',deleteABook,{once : true});

}

