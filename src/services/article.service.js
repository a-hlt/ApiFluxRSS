async function createArticle(request, reply) {
    const { name, idFolder, resume, link } = request.body;

    const folderId = parseInt(idFolder, 10);

    const { id } = request.user;

    if (isNaN(folderId)) {
        return reply.status(400).send({ error: "Invalid idFolder. Must be an integer." });
    }

    const entity = await request.server.prisma.folder.findFirst({
        where: {
            id: folderId,
        }
    });

    if (!entity) {
        return reply.status(400).send({ error: "folder not found" });
    }

    console.log("FOUND FOLDER: ", entity, id)

    if (entity.idUser !== id) {
        return reply.status(400).send({ error: 'source folder does not belong to this user' })
    }

    const article = await request.server.prisma.article.create({
        data: {
            name: name,
            resume: resume,
            link: link,
            idFolder: folderId
        }
    })

    return reply.status(200).send(article);
}




async function getArticle(request, reply) {
    const articles = await request.server.prisma.article.findMany({
        include: {
            folder: true
        }
    })

    return reply.status(200).send(articles);
}


export {
    createArticle,
    getArticle,
}