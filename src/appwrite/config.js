import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query} from 'appwrite'

export class Service {
    client= new Client();
    databses;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databses= new Databases(this.client);
        this.bucket= new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databses.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwirite Create Post Error: ",error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databses.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwirite Update Post Error: ",error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databses.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwirite Delete Post Error: ",error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databses.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwirite Get Post Error: ",error)
            return false
        }
    }

    async getPosts(queries= [Query.equal("status", "active")]) {
        try {
            return await this.databses.listDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwirite Get Posts Error: ",error)
            return false
        }
    }

    // file upload
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwirite File Upload Error: ",error)
            return file
        }
    }

    // file delete
    async uploadFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwirite File Delete Error: ",error)
        }
    }

    // file preview
    async getFilePreview(fileId) {
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwirite File Preview Error: ",error)
        }
    }
}

const service= new Service();

export default service;