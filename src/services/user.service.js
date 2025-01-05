
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
    getUsers,
}
