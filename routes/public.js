
import Router from 'koa-router'

const router = new Router()

import Accounts from '../modules/accounts.js'
import BookInfo from '../modules/bookInfo.js'

const dbName = 'website.db'

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
     const bookInfo=await new BookInfo(dbName);
	try {
         const records =await bookInfo.all()
         ctx.hbs.records=records
		await ctx.render('index', ctx.hbs)
	} catch(err) {
		await ctx.render('error', ctx.hbs)
	}
})

/**
 *
 get a book by id
 */ 
router.get('/findbook', async ctx => {
     const bookInfo=await new BookInfo(dbName);
     //console.log(">>>>>>>>>>>>>"+ctx.query.id);
	try {
         const records =await bookInfo.find(ctx.query.id);
         ctx.hbs.records=records
		await ctx.render('bookInfo', ctx.hbs)
	} catch(err) {
		await ctx.render('error', ctx.hbs)
	}
})
/**
 * The user registration page.
 *用户注册页面。
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('register'))

/**
 * The script to process new user registrations.
 * 用于处理新用户注册的脚本。
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', async ctx => {
	const account = await new Accounts(dbName)
	try {
		// call the functions in the module
		await account.register(ctx.request.body.user, ctx.request.body.pass, ctx.request.body.email)
		ctx.redirect(`/login?msg=new user "${ctx.request.body.user}" added, you need to log in`)
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('register', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/login', async ctx => {
	console.log(ctx.hbs)
	await ctx.render('login', ctx.hbs)
})

router.post('/login', async ctx => {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		await account.login(body.user, body.pass)
		ctx.session.authorised = true
        //add user
        ctx.session.user = body.user
		const referrer = body.referrer || '/secure'
		return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})




export default router
