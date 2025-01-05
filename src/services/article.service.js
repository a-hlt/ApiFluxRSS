async function createArticle(request, reply) {
    const { name, idFolder, resume, link } = request.query;

    const folderId = parseInt(idFolder, 10);

    if (isNaN(folderId)) {
        return reply.status(400).send({ error: "Invalid idFolder. Must be an integer." });
    }

    const entity = await request.server.prisma.folder.findUnique({
        where: {
            id: folderId,
        }
    });

    if (!entity) {
        return reply.status(400).send({ error: "folder not found" });
    }
    const article = await request.server.prisma.article.create({
        data: {
            name: name,
            resume: resume,
            link: link,
            idFolder: folderId
        }
    })
    return { article: article }
}




async function getArticle(request, reply) {
    const articles = await request.server.prisma.article.findMany({
        include: {
            folder: true
        }
    })
    return { articles: articles }
}


export {
    createArticle,
    getArticle,
}