import admin from 'firebase-admin';
import { firebaseStorage, googleCredentials } from './constant.js';

import serviceAccount from '../devfbackendnosqloscar-firebase-adminsdk-fbsvc-28269a529d.json' assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: firebaseStorage,
})

export const bucket = admin.storage().bucket();