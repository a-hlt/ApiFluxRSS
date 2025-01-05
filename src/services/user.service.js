
// import fastify from "fastify"


async function createUser(request, reply) {
    const { name, email, password } = request.query;

    const user = await request.server.prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    })
    return { user: user }
}

async function updateUser(request, reply) {

    // ID du dossier depuis les paramètres
    const { id } = request.params;

    // Nouveau nom depuis le corps de la requête (body postman)
    const { newName } = request.body;

    // Vérification si le dossier existe
    const user = await request.server.prisma.user.findUnique({
        where: {
            id: parseInt(id, 10), // Conversion de l'ID en entier
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
            id: parseInt(id, 10), // Conversion de l'ID en entier
        },
        data: {
            name: newName,
        },
    });



    return { user: updatedUser };
}


async function getUsers(request, reply) {
    const users = await request.server.prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            folders: true,
        }
    })
    return { users: users }
}


export {
    createUser,
    updateUser,
    getUsers,
}
