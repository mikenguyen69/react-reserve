import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

connectDb()

export default async (req, res) => {
    const { email, password } = req.body
    try {
        // 1. check if user exists in DB
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(422).send(`No user exist with that email`)
        }

        // 2. hased the entered password
        const passwordsMatch = await bcrypt.compare(password, user.password)

        // 3. Compare the passwords
        if (!passwordsMatch) {
            return res.status(401).send('Passwords do not match') 
        }

        // 4. Create token for user 
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        // 5. Send back token
        res.status(200).json(token)
    }
    catch(error) {
        console.error(error)
        res.status(500).send("Error logging in user")
    }
}