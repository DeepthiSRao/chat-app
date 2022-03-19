// importing firebase packages
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { APIKEY,
         AUTH_DOMAIN,
         PROJECT_ID,
         STORAGE_BUCKET,
         MESSAGING_SENDER_ID,
         APP_ID } from '@env';

// Firebase configuration
const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage()