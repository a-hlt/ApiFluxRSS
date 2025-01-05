async function createFolder(request, reply) {
    const { name, username } = request.query;

    // Trouve l'username de user
    const entity = await request.server.prisma.user.findUnique({
        where: {
            name: username
        }
    })

    const folder = await request.server.prisma.folder.create({
        data: {
            name: name,
            idUser: entity.id //id par rapport à l'username
        }
    })
    return { folder: folder }
}

async function updateFolder(request, reply) {

    // ID du dossier depuis les paramètres
    const { id } = request.params;
    // Nouveau nom depuis le corps de la requête (body postman)
    const { newName } = request.body;

    if (!id || !newName) {
        return reply.status(400).send({ error: "Missing id or newName" });
    }

    // Vérification si le dossier existe
    const folder = await request.server.prisma.folder.findUnique({
        where: { id: parseInt(id, 10) },
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
        where: { id: parseInt(id, 10) },
        data: { name: newName },
    });

    return { folder: updatedFolder };
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
    return { folders: folders }
}


export {
    createFolder,
    updateFolder,
    getFolder,
}