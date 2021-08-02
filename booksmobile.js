

const grid = document.querySelector('#grid');
const form = document.querySelector('#popupForm');

const openbtn = document.querySelector('.openButton');
openbtn.addEventListener('click', () => form.style.display = 'block');

const cancelform = document.querySelector('.cancel');
cancelform.addEventListener('click', () => form.style.display='none');

const submit = document.querySelector('#submit');
submit.addEventListener('click', addBookToLibrary);

class Book {
    constructor (title, author, genre, read){
        this.title  = title;
        this.author = author;
        this.genre  = genre;
        this.read   = read;
    };
};

let myLibrary = [];
let newBook;

function addBookToLibrary() {
    event.preventDefault();
    form.style.display = 'none';
    
    let title =  document.querySelector('#title').value;
    let author=  document.querySelector('#author').value;
    let genre =  document.querySelector('#genre').value;
    let read =   document.querySelector('#read').checked;
    newBook =    new Book(title, author, genre, read);
    
    myLibrary.push(newBook);
    setLibrary();
    displayLibrary();
    clearForm();
 }

function clearForm(){
    document.querySelector('#title').value  = '';
    document.querySelector('#author').value = '';
    document.querySelector('#genre').value  = '';
    document.querySelector('#read').checked = false;
 }
 
 function setLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function getLibrary() {
     if  (!localStorage.myLibrary){
        let notice = document.querySelector('#alert');
        notice.textContent = 'Add some books!';
    }else {
        var storage = localStorage.getItem('myLibrary');
        storage    = JSON.parse(storage);
        myLibrary  = storage;
        displayLibrary();
    };
};

function displayLibrary(){
    resetGrid();
    for(i=0; i< myLibrary.length; i++){
        createCardsForDisplay(myLibrary[i]);
    }
};

function resetGrid() {
    grid.innerHTML = '';
};

function createCardsForDisplay(item){
    let bookdiv   = document.createElement('div');
    var cardtitle =  document.createElement('p');
    var cardauthor = document.createElement('p');
    var cardgenre =  document.createElement('p');
    var cardread =   document.createElement('button');
    var delbutton =  document.createElement('button');
    
    title =  item.title;
    author = item.author;
    genre =  item.genre;
    read =   item.read;

    cardtitle.textContent =  title;
    cardauthor.textContent = "by " + author;
    cardgenre.textContent =  genre;
    
        if (item.read === true){
        cardread.textContent = 'I read it!'
        }else{
         cardread.textContent = 'Not read'
         } ;

    delbutton.classList='deletebook';
    delbutton.innerHTML = 'delete';
    delbutton.addEventListener('click', () => {
        delBook(bookdiv.id)
    });
    cardtitle.classList = 'title';
    cardauthor.classList= 'author';
    cardgenre.classList = 'genre';
    cardread.classList = 'pressifread'
    bookdiv.classList = 'book';
    bookdiv.id        =  'id' + (myLibrary.indexOf(item));

    bookdiv.appendChild(cardtitle);
    bookdiv.appendChild(cardauthor);
    bookdiv.appendChild(cardgenre);
    bookdiv.appendChild(cardread); 
    bookdiv.appendChild(delbutton);
                
    grid.appendChild(bookdiv);

    cardread.addEventListener('click', () =>{
        item.read = !item.read;
        setLibrary();
        displayLibrary();
 });
 };

function delBook(divid) {
    var str = divid;
    var num =  str.slice (2);
    
    myLibrary.splice(num, 1)
    setLibrary();
    getLibrary();
};    

getLibrary(); 


 
 /*
 

    
    3 if possible, make sure that new book isn't a duplicate of existing book
 https://www.youtube.com/watch?v=k8yJCeuP6I8 (local storage)
 https://www.youtube.com/watch?v=rVyTjFofok0 (local storage)
https://www.youtube.com/watch?v=jV8B24rSN5o (CSS GRID)
 //https://stackoverflow.com/questions/63310980/how-to-display-my-array-of-objects-into-my-html-pages-table-individually-by

 ************************************************************************************
*/