/**
 document.service.ts
 -------------------
 File  to manage articles collection to firebase.
 @author Ronald Tchuekou
 @email ronaldtchuekou@gmail.com
 */
import {
    addDoc,
    collection,
    doc,
    FirestoreDataConverter,
    getDoc,
    getDocs,
    QueryDocumentSnapshot,
    updateDoc
} from "firebase/firestore"
import {fireFirestore} from "../helpers/firebase.helper.ts";
import ArticleModel from "../models/article.model.ts";

const COLLECTION_NAME = 'Articles'

/**
 * To convert articles
 */
export const articleConverter: FirestoreDataConverter<ArticleModel> = {
    toFirestore(article: ArticleModel) {
        return {
            id: article.id || null,
            content: article.content || null
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<ArticleModel>, options) {
        return snapshot.data(options) || null;
    }
};

/**
 * To create new article.
 * @param article
 */
export const createNewArticle = async (article: ArticleModel) => {
    try {
        const articlesCollection = collection(fireFirestore, COLLECTION_NAME)
        const storeRef = await addDoc(articlesCollection, article);
        await updateDoc(storeRef, {id: storeRef.id})
        return {
            ...article,
            id: storeRef.id
        } as ArticleModel
    } catch (e: any) {
        return {
            error: true,
            message: e.message,
            stack: e
        }
    }
}

/**
 * To update an article.
 * @param article
 * @param article_id
 */
export const updateArticle = async (article: ArticleModel, article_id: string) => {
    try {
        const articlesCollection = collection(fireFirestore, COLLECTION_NAME)
        const docRef = doc(articlesCollection, article_id);
        await updateDoc(docRef, article)
        return {...article, id: article_id}
    } catch (e: any) {
        return {
            error: true,
            message: e.message,
            stack: e
        }
    }
}

/**
 * Method to get articles.
 */
export const getArticles = async () => {
    try {
        const articlesCollection = collection(fireFirestore, COLLECTION_NAME)
            .withConverter(articleConverter);

        const storeRef = await getDocs(articlesCollection)

        return storeRef.docs.map(item => item.data())
    } catch (e: any) {
        return {
            error: true,
            message: e.message,
            stack: e
        }
    }
}

/**
 * Method to get article by id.
 * @param article_id
 */
export const getArticleById = async (article_id: string) => {
    try {
        const articlesCollection = collection(fireFirestore, COLLECTION_NAME)
        const docRef = doc(articlesCollection, article_id)
            .withConverter(articleConverter)
        const storeRef = await getDoc(docRef);
        return storeRef.data() || null
    } catch (e: any) {
        return {
            error: true,
            message: e.message,
            stack: e
        }
    }
}
