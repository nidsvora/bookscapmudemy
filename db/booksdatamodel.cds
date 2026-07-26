namespace db.books;

entity Books {
   key ID : UUID;
   title : String; 
   author : String;
   price : Decimal(10,2);
   publishedDate : DateTime;
   digitalCopy: Boolean;
}