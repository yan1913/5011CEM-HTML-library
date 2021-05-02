
/** @modules BookInfo */
 
import sqlite from 'sqlite-async'

/**
 * BookInfo
 * ES6 module that manage the bllokist in bookshop
 */

class Shopcard {
	/**
   * Create an account object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   * 建设者
   */
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
 
            const sql='CREATE TABLE IF NOT EXISTS shopCard (id INTEGER NOT NULL,user	TEXT,book_id TEXT,quantity INTEGER,price	real,add_time TIMESTAMP CURRENT_TIMESTAMP,PRIMARY KEY(id AUTOINCREMENT));'
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
    async all(username){
       
        const sql="SELECT * FROM shopCard where user=?";
        const bookInfo=await this.db.all(sql,[username])
        return bookInfo 
    }
	async add(ord){
        if(await this.check(ord.user,ord.book_id))
            {
                console.log("update quantity");
                ///update
                const sql2='update shopCard set quantity=quantity+1 where  user=? and book_id=?';
                return await this.db.run(sql2,[ord.user,ord.book_id]); 
            }
         console.log("add new card "+ord);
        const sql="insert into shopCard(user,book_id,quantity,price)values(?,?,?,?)";
       
        await this.db.run(sql,[ord.user,ord.book_id,ord.quantity,ord.price]);
        //console.log(">>>>>>>>>>>>"+book);
        //return book;
    }
    async del(idvalue){
      
        const sql="delete from  shopCard where id=?";
       
        return await this.db.run(sql,[idvalue]);
    }
   async check(username,book_id){
       return (async() => {
			let rep=false;
            const sql='select count(*)as t from shopCard where user=? and book_id=?';
            const bookInfo=await this.db.all(sql,[username,book_id])
             console.log(">>>>>>>>>>>>"+JSON.stringify(bookInfo));
            //bookInfo.then(data=>{console.log(JSON.stringify(data)+" checkcccccccccccccccccccccc");rep=data.length>0?data[0].t>0:false;})
            rep=bookInfo.length>0?bookInfo[0].t>0:false;
           console.log(">?????????555555555555???????"+rep)
           return rep; 
		})()
        /**let rep=false;
        const sql='select count(*)as t from shopCard where user=? and book_id=?';
         const bookInfo= this.db.all(sql,[username,book_id])
         console.log(">>>>>>>>>>>>size==="+bookInfo);
        bookInfo.then(data=>{console.log(JSON.stringify(data)+" checkcccccccccccccccccccccc");rep=data.length>0?data[0].t>0:false;})
        console.log(">?????????555555555555???????"+rep)
        return rep;**/
    }
    
}

export default Shopcard






























