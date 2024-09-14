import { ID } from "appwrite";
import { config, avatars, account, databases, storage } from "./config";
import { Query, Permission, Role } from "appwrite"
export async function createAccount(user) {
    try {
        console.log(user)
        const newAccount = await account.create(ID.unique(), user.email, user.password, user.name)
        if (!newAccount) {
            throw Error("Cannot add user to auth")
        }
        const profilePic = avatars.getInitials(newAccount.name)
        const newUserInDB = await saveUserToDB({
            name: user.name,
            username: user.username,
            email: user.email,
            profileimageurl: profilePic,
            accountid: newAccount.$id,
        })
        return newUserInDB;
    } catch (error) {
        console.log(error)
        throw error
    }
}
export async function saveUserToDB(user) {
    try {
        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollection,
            ID.unique(),
            {
                accountid: user.accountid,
                name: user.name,
                email: user.email,
                profileimageurl: user.profileimageurl,
                username: user.username
            },
            [
                Permission.write(Role.any()),
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
        const session = await account.createEmailSession(user.email, user.password)
        return session;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession("current");
        return session
    } catch (error) {
        console.log(error)
        throw error
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

export async function getUserById(id) {
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
        throw error
    }
}
export async function createPost(data) {
    console.log(data, "Data sent")
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
                user: data.user.$id,
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
        throw error
    }
}
export async function getRecentPosts(userId) {
    try {
        let followers = await databases.listDocuments(config.databaseId, config.followersColletion, [
            Query.equal('following',userId)
        ])
        followers = followers.documents.map((follower) => follower.toFollow.$id)
        const recentPosts = await databases.listDocuments(config.databaseId, config.postsCollection, [
            Query.equal('user', [...followers, userId]),
        ]);
        console.log(recentPosts, "Recent posts")
        if (!recentPosts) {
            throw Error
        }
        return recentPosts.documents
    } catch (error) {
        console.log(error)
        throw Error
    }
}

export async function deleteComment(commentId) {
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

export async function addFollower(followingId, toFollowId) {
    try {
        console.log(followingId, toFollowId)
        const follow = await databases.createDocument(
            config.databaseId,
            config.followersColletion,
            ID.unique(),
            {
                toFollow: toFollowId,
                following: followingId
            }
        )
        if (!follow) {
            throw Error("Cannot add follower")
        }
        return follow;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function removeFollower(id) {
    try {
        const removedfollow = await databases.deleteDocument(
            config.databaseId,
            config.followersColletion,
            id
        )
        if (!removedfollow) throw Error("Cannot remove follower")
        return { status: 'ok' }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function createComment(postId, userId, content) {
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
    console.log(data)
    try {
        let filePreview = null
        let uploadedFile = null
        if (fileToUpdate) {
             uploadedFile = await uploadFileToStorage(data.file[0])
            if (!uploadedFile) {
                throw Error("Error uploading to storage")
            }
             filePreview = getFilePreview(uploadedFile.$id)
            if (!filePreview) {
                deleteFile(uploadedFile.$id)
                throw Error("Error in image retrieval")
            }
        }
        const tags = data.tags.split(',').map((tag) => tag.trimStart().replace(/^#|\s/g, ""))
        let updatedPost = null
        if (fileToUpdate) {
             updatedPost = await databases.updateDocument(
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
        }
        else {
            updatedPost = await databases.updateDocument(
                config.databaseId,
                config.postsCollection,
                data.postId,
                {
                    caption: data.caption,
                    tags: tags,
                    location: data.location
                }
            )
        }
        console.log(!updatedPost, "MAMAMAM")
        if(updatedPost){
            if(fileToUpdate){
                await deleteFile(data.imageId)
            }
            return updatedPost
        }
        if (!updatedPost){
            if(fileToUpdate){
                await deleteFile(uploadedFile.$id)
            }
            throw Error("Cannot update post")
        }
    } catch (error) {
        throw error
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
        } else {
            if(currImage){
                imageURL = image
            }
            else{
                imageURL = avatars.getInitials(name)
            }
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