import { ID } from "appwrite";
import { config, avatars, account, databases } from "./config";
import { Query } from "appwrite";
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
export async function createPost(){
    try {
        
    } catch (error) {
        console.log(error)
    }
}