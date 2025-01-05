async function createFolder(request, reply) {
    const { name, username } = request.query;

    const entity = await request.server.prisma.user.findUnique({
        where: {
            name: username
        }
    })

    const folder = await request.server.prisma.folder.create({
        data: {
            name: name,
            idUser: entity.id
        }
    })
    return { folder: folder }
}




async function getFolder(request, reply) {
    const folders = await request.server.prisma.folder.findMany({
        include: {
            user: true
        }
    })
    return { folders: folders }
}


export {
    createFolder,
    getFolder,
}