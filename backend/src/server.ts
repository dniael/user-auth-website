import express, { Request, Response } from 'express'
import { UserModel } from './models/user.js'
import { User } from './interfaces/User'
import mongoose, { ConnectOptions } from 'mongoose'
import passportLocal from 'passport-local'
import cors from 'cors'
import bcrypt from 'bcrypt'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import crypto from 'crypto'
import schema from './validatePassword'
import { sendResetPasswordMail } from './email.js'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 6969
const app = express();
const uri = process.env.MONGO_URI;
const LocalStrategy = passportLocal.Strategy

const TOKEN_LENGTH = 20
const HASH_LENGTH = 10

const SENDER_EMAIL = 'resetyourpwdtest@gmail.com'

mongoose.connect(uri as string, 
    { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions
).then(() => console.log('Mongoed?!?!?!?'))



app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(session({
    secret: 'destruco jamaican',
    resave: true,
    saveUninitialized: true,
}))

app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
      UserModel.findOne({ username: username }, (err: Error, user: User) => {
        if (err)  return done(err); 
        if (!user) return done(null, false); 

        bcrypt.compare(password, user.password, (err, result: any) => {
            if (result === true) return done(null, user)
            return done(null, false)
        })
      });
    }
));

passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser((id: string, done) => {
    UserModel.findOne({ _id: id }, (err: any, user: User) => {
        if (!user) return
        const userInfo = {
            username: user.username,
            password: user.password
        }

        done(err, userInfo)
    })
})

app.post('/login', passport.authenticate('local'), (req, res) => res.sendStatus(200))

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body

    UserModel.findOne({ username }, async (err: Error, doc: User) => {

        if (doc && !schema.validate(password)) return res.send('username taken and invalid password')

        if (doc) return res.send('user already exists')

        if (!schema.validate(password)) return res.send('invalid password') 
            
        const hashedPassword = await bcrypt.hash(password, HASH_LENGTH)
        const user = new UserModel({
            username,
            email,
            password: hashedPassword,
            resetPasswordToken: '',
            tokenExpireDate: ''
        })
                
        await user.save()   
                
        return res.send('successfully registered')
                
    })
})
    
app.get('/user', (req, res) => {
    res.send(req.user)
})

app.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err)
        res.redirect('/')
    })
})

app.post('/deleteuser', (req, res) => {
    const { username } = req.body
    UserModel.findOneAndDelete({ username: username }, (err: Error) => {
        if (err) console.log(err)
    })
    res.send('delete success')
})

app.post('/changepass', async (req, res) => {
    const { email, oldPass, newPass } = req.body
    UserModel.findOne({ email }, async (err: Error, doc: User) => {
        bcrypt.compare(oldPass, doc.password, async (err: Error, result: any) => {
            if (result === false) return res.send('incorrect pwd')
            if (oldPass === newPass) return res.send('same pwd')
            if (!schema.validate(newPass)) return res.send('invalid pwd')
            await UserModel.updateOne({ email }, { password: await bcrypt.hash(newPass, HASH_LENGTH) })
            return res.send('pwd updated')
        })
    })
})

app.post('/forgotpassword', async (req, res) => {
    const { email }: any = req.body
    UserModel.findOne({ email }, async (err: Error, doc: User) => {
        if (doc === null) return res.send('unrecognized email')
        if (doc.tokenExpireDate !== null) return res.send('token exists')
        
        const token = crypto.randomBytes(TOKEN_LENGTH).toString('hex')

        await UserModel.updateOne({ email }, {
            resetPassToken: token,
            tokenExpireDate: Date.now() + 1000 * 60 * 60
        })

        const result = await sendResetPasswordMail(email, token)
        
    
        return res.send(result)

    })
})

app.get('/checkresettoken', async (req, res) => {
    if (req.query.resetPassToken?.length !== TOKEN_LENGTH) return res.send('invalid token')
    UserModel.findOne({ 
        resetPassToken: req.query.resetPassToken,
        tokenExpireDate: {
            $gt: Date.now()
        }
    }, async (err: Error, user: User) => {
        if (user === null) res.send('invalid token')
    })
    return
})

app.post('/resetpass', async (req, res) => {
    const { token, newPass } = req.body
    UserModel.findOne({ 
        resetPassToken: token,
        tokenExpireDate: {
            $gt: Date.now()
        }
    }, async (err: Error, user: User) => {
        if (user === null) return res.send('invalid token')
        if (!schema.validate(newPass)) return res.send('invalid pwd')
        const password = await bcrypt.hash(newPass, HASH_LENGTH)
        await UserModel.updateOne({ resetPassToken: token }, { password: password, resetPassToken: '', tokenExpireDate: '' })
        return res.send('pwd updated')
    })
})

app.listen(port, () => {
    console.log(`server is up at http://localhost:${port}`)
})
