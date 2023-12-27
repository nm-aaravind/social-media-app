import { ID } from "appwrite";
import { config, avatars, account, databases, storage } from "./config";
import { Query, Permission, Role } from "appwrite";
export async function createAccount(user) {
    
    try {
        const newAccount = await account.create(ID.unique(), user.email, user.password, user.name)
        if(!newAccount){
            throw Error
        }
        const profilePic = avatars.getInitials(newAccount.name)
        const newUserInDB = await saveUserToDB({
            name: newAccount.name,
            username: user.username,
            email: newAccount.email,
            profileimageurl: profilePic,
            accountid: newAccount.$id,
        })
        return newUserInDB;
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function saveUserToDB(user) {
    try {
        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollection,
            ID.unique(),
            user
        )
        return newUser
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function signIn(user){
    try {
        const session = await account.createEmailSession(user.email, user.password)
        return session;
    } catch (error) {
        console.log(error)
    }
}

export async function signOut(){
    try {
        const session = await account.deleteSession("current");
        return session
    } catch (error) {
       console.log(error)
       return error 
    }
}

export async function getSaves(userId){
    try {
        const userSaves = await databases.listDocuments(
            config.databaseId,
            config.usersCollection,
            [Query.equal('accountid', userId)]
        )
        return userSaves.documents
    } catch (error) {
        console.log(error)
    }
}

export async function getUser(){
    try {
        const currentAccount = await account.get()
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.usersCollection,
            [Query.equal('accountid',currentAccount.$id)]
        )
        if(!currentUser){
            throw Error 
        }
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}
export async function getEmailFromUsername(username){
    try {
        const user = await databases.listDocuments(config.databaseId,
            config.usersCollection,[
            Query.equal('username', username),
        ])
    } catch (error) {
        
    }
}
export async function createPost(data){
    try {
        console.log(data, "inside create post")
        const uploadedFile = await uploadFileToStorage(data.images[0])
        if(!uploadedFile){
            throw Error("Error uploading to storage")
        }
        const filePreview = getFilePreview(uploadedFile.$id)
        if(!filePreview){
            deleteFile(uploadedFile.$id)
            throw Error
        }
        const tags = data.tags.split(',').map((tag) => tag.trimStart().replace(/^#|\s/g, ""))

        const createdPost = await databases.createDocument(
            config.databaseId,
            config.postsCollection,
            ID.unique(),
            {
                user: data.user,
                caption: data.caption,
                tags: tags,
                image: data.images[0],
                imageId: uploadedFile.$id,
                location: data.location
            }
        )

        if(!createdPost){
            deleteFile(uploadedFile.$id)
            throw Error
        }
        return createdPost;
    } catch (error) {
        console.log(error)
    }
}

async function deleteFile(fileId){
    try {
        await storage.deleteFile(config.storageId, fileId)
        return { status: 'ok' }
    } catch (error) {
        console.log(error)
    }
}
export async function getRecentPosts(){
    try {
        const recentPosts = await databases.listDocuments(config.databaseId,config.postsCollection,[Query.orderDesc('$createdAt', Query.limit(40))]);
        if(!recentPosts){
            throw Error
        }
        return recentPosts
    } catch (error) {
        console.log(error)
    }
}

function getFilePreview(fileId){
    try {
        const filePreview = storage.getFilePreview(config.storageId, fileId, 1000,1000,"center", 50)
        return filePreview
    } catch (error) {
        console.log(error)
    }
}

export async function uploadFileToStorage(file){
    try {
        const uploadedFiles = await storage.createFile(
            config.storageId,
            ID.unique(),
            file
        )
        console.log("Hey")
        return uploadedFiles;
    } catch (error) {
        console.log(error)
        throw Error
    }
}

export async function likePost(likeArray, postId){
    try {
        console.log("receing this", likeArray)
        const likedPost = await databases.updateDocument(config.databaseId,
            config.postsCollection,
            postId,
            {
                likes: likeArray
            },[
                Permission.update(Role.any())
            ]
        )
        if(!likedPost){
            throw Error
        }
        return likedPost
    } catch (error) {
        console.log(error)
    }
}

export async function savePost(postId, userId){
    try {
        const savedPost = await databases.createDocument(config.databaseId,
            config.savesCollection,
            ID.unique(),
            {
                users: userId,
                post: postId
            }
        )
        if(!savedPost){
            throw Error
        }
        return savedPost
    } catch (error) {
        console.log(error)
    }
}

export async function removeSavedPost(savedPostId){
    try {
        const status = await databases.deleteDocument(
            config.databaseId,
            config.savesCollection,
            savedPostId
        )
        if(!status) throw Error
        return {status: 'ok'}
    } catch (error) {
        console.log(error)
    }
}