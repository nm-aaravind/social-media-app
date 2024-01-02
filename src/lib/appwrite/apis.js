import { ID } from "appwrite";
import { config, avatars, account, databases, storage } from "./config";
import { Query, Permission, Role } from "appwrite";
export async function createAccount(user) {
    try {
        console.log("PPPPP")
        const newAccount = await account.create(ID.unique(), user.email, user.password, user.name)
        if (!newAccount) {
            throw Error
        }
        console.log("TTTTTTTTTTTTTTTT")
        const profilePic = avatars.getInitials(newAccount.name)
        const newUserInDB = await saveUserToDB({
            name: newAccount.name,
            username: user.username,
            email: newAccount.email,
            profileimageurl: profilePic,
            accountid: newAccount.$id,
        })
        console.log(newUser, "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPpp")
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
            user,
            [
                Permission.read(Role.any()),  
            ]
        )
        return newUser
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function signIn(user) {
    try {
        console.log(user, "DEIDIEII")
        const session = await account.createEmailSession(user.email, user.password)
        return session;
    } catch (error) {
        console.log(error)
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession("current");
        return session
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getSaves(userId) {
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
function checkUserPermissions(account) {
    // You can implement your own logic to check user permissions based on account details
    // For example, check if the user has a specific role or attribute

    // Replace the following condition with your own logic
    console.log(account, "Roles")
    if (account.roles.includes("admin")) {
        return true;
    }

    return false;
}

export async function getUserById(id){
    try {
        console.log("Fired", id)
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.usersCollection,
            [Query.equal('accountid', id)]
        )
        if (!currentUser.documents || currentUser.documents.length === 0) {
            throw new Error("User not found");
        }
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUser() {
    try {
        const currentAccount = await account.get()
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.usersCollection,
            [Query.equal('accountid', currentAccount.$id)]
        )
        if (!currentUser.documents || currentUser.documents.length === 0) {
            throw new Error("User not found");
        }
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}
export async function getEmailFromUsername(username) {
    try {
        const user = await databases.listDocuments(config.databaseId,
            config.usersCollection, [
            Query.equal('username', username),
        ])
    } catch (error) {

    }
}
export async function createPost(data) {
    try {
        const uploadedFile = await uploadFileToStorage(data.file[0])
        if (!uploadedFile) {
            throw Error("Error uploading to storage")
        }
        const filePreview = getFilePreview(uploadedFile.$id)
        if (!filePreview) {
            deleteFile(uploadedFile.$id)
            throw Error
        }
        const tags = data.tags.split(',').map((tag) => tag.trimStart().replace(/^#|\s/g, ""))
        const createdPost = await databases.createDocument(
            config.databaseId,
            config.postsCollection,
            ID.unique(),
            {
                user: data.user.accountid,
                caption: data.caption,
                tags: tags,
                image: filePreview,
                imageId: uploadedFile.$id,
                location: data.location
            },
            [
                Permission.read(Role.any()),  
            ]
        )

        if (!createdPost) {
            deleteFile(uploadedFile.$id)
            throw Error
        }
        return createdPost;
    } catch (error) {
        console.log(error)
    }
}

async function deleteFile(fileId) {
    try {
        await storage.deleteFile(config.storageId, fileId)
        return { status: 'ok' }
    } catch (error) {
        console.log(error)
    }
}
export async function getRecentPosts() {
    try {
        const recentPosts = await databases.listDocuments(config.databaseId, config.postsCollection, [Query.orderDesc('$createdAt', Query.limit(40))]);
        if (!recentPosts) {
            throw Error
        }
        return recentPosts.documents
    } catch (error) {
        console.log(error)
        throw Error
    }
}

export async function deleteComment(commentId){
    try {
        const deleteComment = await databases.deleteDocument(
            config.databaseId,
            config.commentsCollection,
            commentId
        )
        return { status: 'ok' }
    } catch (error) {
        console.log(error)
        throw Error("Cannot delete comment")
    }
}

export async function addFollower(followingId, toFollowId){
    try {
        const follow = await databases.createDocument(
            config.databaseId,
            config.followersColletion,
            ID.unique(),
            {
                toFollow: toFollowId,
                following: followingId
            }
        )
        if(!follow){
            throw Error("Cannot add follower")
        }
        console.log("HOHOHOHOHOHOHOHOHOHOHOHO")
        return follow;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function removeFollower(id){
    try {
        const removedfollow = await databases.deleteDocument(
            config.databaseId,
            config.followersColletion,
            id
        )
        if(!removedfollow) throw Error("Cannot remove follower")
        return { status: 'ok' }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function createComment(postId, userId, content){
    try {
        const comment = await databases.createDocument(
            config.databaseId,
            config.commentsCollection,
            ID.unique(),
            {
                content: content,
                post: postId,
                user: userId
            }
        )
        console.log(comment, "Made comment")
    } catch (error) {
        console.log(error)
    }
}

function getFilePreview(fileId) {
    try {
        const filePreview = storage.getFilePreview(config.storageId, fileId, 1000, 1000)
        return filePreview
    } catch (error) {
        console.log(error)
    }
}

export async function uploadFileToStorage(file) {
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

export async function likePost(likeArray, postId) {
    try {
        console.log("receing this", likeArray, postId)
        const likedPost = await databases.updateDocument(config.databaseId,
            config.postsCollection,
            postId,
            {
                likes: likeArray
            }, [
            Permission.update(Role.any())
        ]
        )
        if (!likedPost) {
            throw Error
        }
        console.log("Liked post:", likedPost)
        return likedPost
    } catch (error) {
        console.log(error)
    }
}
export async function getPostById(id) {
    try {
        console.log(id, "Mapula")
        const post = await databases.listDocuments(
            config.databaseId,
            config.postsCollection,
            [Query.equal('$id', id)]
        )
        return post.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export async function savePost(postId, userId) {
    try {
        const savedPost = await databases.createDocument(config.databaseId,
            config.savesCollection,
            ID.unique(),
            {
                users: userId,
                post: postId
            }
        )
        if (!savedPost) {
            throw Error
        }
        return savedPost
    } catch (error) {
        console.log(error)
    }
}

export async function removeSavedPost(savedPostId) {
    try {
        const status = await databases.deleteDocument(
            config.databaseId,
            config.savesCollection,
            savedPostId
        )
        if (!status) throw Error
        return { status: 'ok' }
    } catch (error) {
        console.log(error)
    }
}

export async function updatePost(data) {
    const fileToUpdate = data.file.length ? true : false
    try {
        if (fileToUpdate) {
            const uploadedFile = await uploadFileToStorage(data.file[0])
            if (!uploadedFile) {
                throw Error("Error uploading to storage")
            }
            const filePreview = getFilePreview(uploadedFile.$id)
            if (!filePreview) {
                deleteFile(uploadedFile.$id)
                throw Error
            }
            const tags = data.tags.split(',').map((tag) => tag.trimStart().replace(/^#|\s/g, ""))
            const updatedPost = await databases.updateDocument(
                config.databaseId,
                config.postsCollection,
                data.postId,
                {
                    caption: data.caption,
                    tags: tags,
                    image: filePreview,
                    imageId: uploadedFile.$id,
                    location: data.location
                }
            )
            if (!updatedPost && fileToUpdate) {
                await deleteFile(uploadedFile.$id)
                throw Error("Cannot update post")
            }
            if (fileToUpdate) {
                await deleteFile(data.imageId)
                return updatedPost;
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deletePost(postId, imageId) {
    try {
        const status = await databases.deleteDocument(
            config.databaseId,
            config.postsCollection,
            postId,
        )
        if (!status) {
            throw Error
        }
        await deleteFile(imageId);
        return { status: 'ok' }
    } catch (error) {
        console.log(error)
    }
}

export async function getInfinitePosts({ pageParam }) {
    const queries = [Query.orderDesc('$updatedAt'), Query.limit(5)];
    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()))
    }

    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.postsCollection,
            queries
        )
        if (!posts) throw Error
        return posts
    } catch (error) {
        console.log(error)
    }
}

export async function searchPosts(searchWord) {
    try {
        console.log(searchWord, "THE WORD")
        const posts = await databases.listDocuments(
            config.databaseId,
            config.postsCollection,
            [Query.search('caption', searchWord)]
        )
        if (!posts) throw Error;
        return posts
    } catch (error) {
        console.log(error)
    }
}

export async function updateProfile(userId, name, username, bio, file, image, currImage) {
    try {
        let imageURL = ''
        let uploadedFile = null
        const fileToUpdate = file.length ? true : false
        if (fileToUpdate) {
            uploadedFile = await uploadFileToStorage(file[0])
            if (!uploadedFile) {
                throw Error("Error uploading to storage")
            }
            imageURL = getFilePreview(uploadedFile.$id)
            if (!imageURL) {
                deleteFile(uploadedFile.$id)
                throw Error
            }
        }else{
            imageURL = image
        }
        const updatedPost = await databases.updateDocument(
            config.databaseId,
            config.usersCollection,
            userId,
            {
                name: name,
                username: username,
                bio: bio,
                profileimageid: fileToUpdate ? uploadedFile.$id : null,
                profileimageurl: imageURL
            }
        )
        if (!updatedPost && fileToUpdate) {
            await deleteFile(uploadedFile.$id)
            throw Error("Cannot update profile")
        }
        if (fileToUpdate && currImage) {
            await deleteFile(currImage)
        }
        return updatedPost;
    } catch (error) {
        console.log(error)
    }
}