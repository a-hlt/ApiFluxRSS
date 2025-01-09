async function createFolder(request, reply) {
    const { name } = request.body;

    const { id } = request.user

    const folder = await request.server.prisma.folder.create({
        data: {
            name: name,
            idUser: id //id par rapport à l'username
        }
    })

    return reply.status(200).send(folder)
}

async function updateFolder(request, reply) {

    // ID du dossier depuis les paramètres
    let { id } = request.params;
    id = parseInt(id, 10)
    // Nouveau nom depuis le corps de la requête (body postman)
    const { newName } = request.body;

    if (!id || !newName) {
        return reply.status(400).send({ error: "Missing id or newName" });
    }

    // Vérification si le dossier existe
    const folder = await request.server.prisma.folder.findFirst({
        where: { id },
    });

    if (!folder) {
        return reply.status(404).send({ error: "Folder not found" });
    }

    // Vérifie si le nouveau nom existe déjà pour le même utilisateur
    const existingFolder = await request.server.prisma.folder.findFirst({
        where: {
            name: newName,
            idUser: folder.idUser, // S'assurer que c'est pour le même utilisateur
        },
    });

    if (existingFolder) {
        return reply.status(409).send({ error: "Folder name already exists for this user" });
    }

    const updatedFolder = await request.server.prisma.folder.update({
        where: { id },
        data: { name: newName },
    });

    return reply.status(200).send(updatedFolder);
}




async function getFolder(request, reply) {
    const folders = await request.server.prisma.folder.findMany({
        include: {
            user: {
                select: {
                    id: true,        // Inclure l'ID
                    email: true,     // Inclure l'email
                    name: true,      // Inclure le nom
                    // Ne pas inclure le mot de passe ici
                }
            },
            article: true // Les articles liés au dossier
        }
    })

    return reply.status(200).send(folders);
}


export {
    createFolder,
    updateFolder,
    getFolder,
}