import { Client, Databases, Account, Storage, Avatars } from "appwrite";

export const config = {
    projectId: import.meta.env.VITE_APPWRITE_ID,
    url: import.meta.env.VITE_URL,
    databaseId: import.meta.env.VITE_DB_ID,
    usersCollection: import.meta.env.VITE_DB_USERS,
    postsCollection: import.meta.env.VITE_DB_POSTS,
    savesCollection: import.meta.env.VITE_DB_SAVES,
    storageId: import.meta.env.VITE_MEDIA_BUCKET,
    commentsCollection: import.meta.env.VITE_DB_COMMENTS,
    followersColletion: import.meta.env.VITE_DB_FOLLOWERS
} 
export const client = new Client().setEndpoint(config.url).setProject(config.projectId)
export const account = new Account(client);
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)