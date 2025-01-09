
import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'


async function createUser(request, reply) {
    const { name, email, password } = request.body;

    const exists = await request.server.prisma.user.findFirst({
        where: {
            OR: [
                {
                    name: name,
                },
                {
                    email: email
                }
            ]
        },
    })

    console.log("COUNT:", exists)

    if (exists) throw new Error('Username or Email already exists')

    const encryptedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))

    const user = await request.server.prisma.user.create({
        data: {
            name: name,
            email: email,
            password: encryptedPassword
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })

    return reply.status(200).send({
        success: true,
        data: user
    })
}

async function updateUser(request, reply) {
    const decodedUser = request.user

    // Nouveau nom depuis le corps de la requête (body postman)
    const { newName } = request.body;

    const userId = parseInt(decodedUser.id, 10);

    const user = await request.server.prisma.user.findUnique({
        where: {
            id: userId, // Conversion de l'ID en entier
        },
    });

    if (!user) {
        return reply.status(404).send({ error: "user not found" });
    }

    // Vérifie si le nouveau nom existe déjà 
    const existingUser = await request.server.prisma.user.findUnique({
        where: {
            name: newName, // Recherche un autre utilisateur avec le même nom
        },
    });

    if (existingUser) {
        return reply.status(409).send({ error: "Username already exists" });
    }

    // Mise à jour du nom d'utilisateur
    const updatedUser = await request.server.prisma.user.update({
        where: {
            id: userId, // Conversion de l'ID en entier
        },
        data: {
            name: newName,
        },
    });



    return reply.status(200).send(updatedUser);
}


async function getUsers(request, reply) {
    const users = await request.server.prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            folders: true,
        }
    })
    console.log("DATA:", users)
    reply.status(200).send(users)
}

async function loginUser(request, reply) {
    const { name, password } = request.body

    const user = await request.server.prisma.user.findFirst({
        where: {
            name
        }
    })

    if (!user) throw new Error('User not found')

    const samePassword = bcrypt.compareSync(password, user.password);

    if (!samePassword) {
        throw new Error('Invalid password')
    }

    // Generate a token here
    // fastify.jwt.sign({ payload })
    const token = request.server.jwt.sign({
        id: user.id,
        name: user.name
    })
    // , process.env.SECRET_KEY, {
    //     expiresIn: '3h'
    // }

    reply.status(200).send({
        success: true,
        message: 'Login successful',
        token: token
    })
}

export {
    createUser,
    updateUser,
    getUsers,
    loginUser,
}
