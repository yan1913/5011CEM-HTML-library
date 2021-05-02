
/** @modules BookInfo */

import bcrypt from 'bcrypt-promise'
import sqlite from 'sqlite-async'

/**
 * BookInfo
 * ES6 module that manage the bllokist in bookshop
 */

class BookInfo {
	/**
   * Create an account object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   * 
   */
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
// 			const sql = 'CREATE TABLE IF NOT EXISTS users\
// 				(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT, email TEXT);'
            const sql='CREATE TABLE IF NOT EXISTS bookInfo (\
                id INTEGER NOT NULL,\
                book_id TEXT,\
                book_name	TEXT,\
                author_name TEXT,\
                publication_time TEXT,\
                URL TEXT,\
                book_price TEXT,\
                detailed	TEXT,\
                publisher	TEXT,\
                FOREIGN KEY(id) REFERENCES users(id),\
                PRIMARY KEY(id AUTOINCREMENT)\
            );'
			await this.db.run(sql)
			return this
		})()
	}

	/**
	 * retrieves all the bools in the system
	 * @param {String} user the chosen username
	 * @param {String} pass the chosen password
	 * @param {String} email the chosen email
	 * @returns {Boolean} returns true if the new user has been added
	 * 
	 */
    async all(){
        //const sql="SELECT bookInfo.id,bookInfo.* FROM bookInfo, users\
        //            WHERE bookInfo.id=users.id;"
        //const sql="SELECT users.*,bookInfo.* FROM bookInfo, users    WHERE bookInfo.id=users.id;"
        const sql="SELECT bookInfo.* FROM bookInfo";
        const bookInfo=await this.db.all(sql)
        return bookInfo
            
    }
	async find(idvalue){
        console.log(idvalue+">>>>>>>>>> for find >>");
        //const sql="SELECT bookInfo.* FROM bookInfo where book_id=?";
        // const sql="SELECT bookInfo.* FROM bookInfo where book_id='"+idvalue+"'";
         const sql="SELECT bookInfo.* FROM bookInfo where book_id=?";

        console.log(">sql>>>>>>>>"+sql);
        //t book=await db.all(sql,idvalue);
        //const book=await this.db.all(sql)
        const book=await this.db.all(sql,[idvalue])
        console.log(">>>>>>>>>>>>"+book);
        return book;
    }
}

export default BookInfo






























