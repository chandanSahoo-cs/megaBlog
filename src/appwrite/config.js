import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client= new Client();
    database;
    storage;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectID);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    // async createPost({title,slug,content,featuredImage,status, userID,}){
    //     try{
    //         return await this.database.createDocument(
    //             conf.appwriteDatabaseID,
    //             conf.appwriteCollectionID,
    //             slug,
    //             {
    //                 title,
    //                 content,
    //                 featuredImage,
    //                 status,
    //                 userID
    //             }
    //         )
    //     }
    //     catch(error){
    //         console.log("Appwrite service :: createPosts :: error ::", error)
    //     }
    // }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.database.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch(error){
            console.log("Appwrite service :: getPosts :: error ::", error)
        }
    }

    async deletePost(slug){
        try{
            await this.database.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true;
        }
        catch(error){
            console.log("Appwrite service :: deletePost :: error ::", error)
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.database.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        }
        catch(error){
            console.log("Appwrite service :: getPost :: error ::", error)
            return false;
        }
    }

    async getPosts(queries = [Query.equals("status", "active")]){
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        }
        catch(error){
            console.log("Appwrite service :: getPosts :: error ::", error)
            return false;
        }
    }

    //file uploaad methods
    async uploadFile(file){
        try{
            return await this.storage.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("Appwrite service :: uploadFile :: error ::", error)
            return false;
        }
    }

    async deleteFile(fileID){
        try{
            await this.storage.deleteFile(
                conf.appwriteBucketID,
                fileID
            )
            return true;
        }
        catch(error){
            console.log("Appwrite service :: deleteFile :: error ::", error)
            return false;
        }
    }

    getFilePreview(fileID){
        return this.storage.getFilePreview(
            conf.appwriteBucketID,
            fileID
        )
    }
}
const service= new Service();
export default service;