
import Router from 'koa-router'
import BookInfo from '../modules/bookInfo.js'
import Shopcard from '../modules/shopcard.js'
import Payment from '../modules/payment.js'

const router = new Router({ prefix: '/secure' })
const dbName='website.db'
//const bookInfo=await new BookInfo(dbName)

async function checkAuth(ctx, next) {
	console.log('secure router middleware')
	console.log(ctx.hbs)
	if(ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	await next()
}

router.use(checkAuth)


router.get('/', async ctx => {
    const bookInfo=await new BookInfo(dbName)
    console.log("enter secure.js.............")
	try {
        const records =await bookInfo.all()
        //const records=[{"book_id":1,"book_name":"java"},{"book_id":2,"book_name":"C#"}];
        //bookInfo.all().then(data=>{records=data;console.log(data);})
        //console.log(records)
        
		//await ctx.render('secure', ctx.hbs)
        ctx.hbs.records=records
        await ctx.render('secure', ctx.hbs)
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}  
})

//add to card
router.get('/addToCard', async ctx => {
    const cardInfo=await new Shopcard(dbName)
    console.log("enter card.js.............")
	try {
        //const records =await bookInfo.all()
        //const records=[{"book_id":1,"book_name":"java"},{"book_id":2,"book_name":"C#"}];
        //bookInfo.all().then(data=>{records=data;console.log(data);})
        //console.log(records)
        let card={user:ctx.session.user,book_id:ctx.query.book_id,quantity:1,price:ctx.query.price};
		//await ctx.render('secure', ctx.hbs)
        cardInfo.add(card)
        return ctx.redirect('showcard');
	} catch(err) {
        console.log(err)
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}  
})

//show card
router.get('/showcard', async ctx => {
    const cardInfo=await new Shopcard(dbName)
    console.log("enter card.js.............")
	try {
        const records =await cardInfo.all(ctx.session.user) 
        ctx.hbs.records=records
        await ctx.render('showcard', ctx.hbs)
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}  
})
//delete en item in card
router.get('/delcard', async ctx => {
    const cardInfo=await new Shopcard(dbName)
    const id=ctx.query.id//get parameter from request
    console.log(id+" to be delete")
	try {
        await cardInfo.del(id)  
        await ctx.redirect('showcard?msg=delete successful')
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}  
})




//show payment
router.get('/payment', async ctx => {
    const cardInfo=await new Shopcard(dbName)
    console.log("enter card.js.....aa........")
	try {
        const records =await cardInfo.all(ctx.session.user) 
        ctx.hbs.records=records
        await ctx.render('payment', ctx.hbs)
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
    }
})






export default router
