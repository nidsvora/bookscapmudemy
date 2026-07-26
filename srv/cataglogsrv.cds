using { db.books as myBooks } from '../db/booksdatamodel';

service LibrarySrv {

    entity BooksSet as projection on myBooks.Books;

}
