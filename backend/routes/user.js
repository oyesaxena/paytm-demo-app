const router = express.Router();
const zod = require('zod');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const signUpBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
    email: zod.string().email(),
});

router.post('/signUp', async (req, res) => {
    const { success } = signUpBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: 'Email already taken / Incorrect inputs',
        });
    }
    const existingUser = await User.findOne({
        username: req.body.username,
    });

    if (existingUser) {
        return res.status(411).json({
            message: 'Email already taken/Incorrect inputs',
        });
    }

    const user = User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    });
    const token = jwt.sign(
        {
            userId: user._id,
        },
        JWT_SECRET
    );

    res.json({
        message: 'User created successfully',
        token: token,
    });
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});
router.post('/signIn', (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        res.status(401).json({
            message: 'Email does not exist',
        });
    }
});

module.exports = router;
