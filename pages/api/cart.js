import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    console.log(req.headers);
    if (!('authorization' in req.headers)) {
        return res.status(401).send("No authorization token");
    } 

    try {
        //console.log(req.headers.authorization);

        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        console.log(userId);
        
        const cart = await Cart.findOne({user: userId}).populate({
            path: 'products', 
            populate: { path: 'products' }
        })

        console.log(cart);
        res.status(200).json(cart.products)
    }
    catch(error) {
        //console.error(error)
        res.status(403).send("Please login again")
    }
}