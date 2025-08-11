const conf= {
    apperiteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    apperiteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    apperiteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    apperiteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_IDL),
    apperiteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf