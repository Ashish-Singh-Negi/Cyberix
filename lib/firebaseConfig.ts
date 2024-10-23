import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9uiagiqeSFTgmNNZIi5cG3ryDphKudJM",
  authDomain: "cyberix-a4239.firebaseapp.com",
  projectId: "cyberix-a4239",
  storageBucket: "cyberix-a4239.appspot.com",
  messagingSenderId: "1075026804840",
  appId: "1:1075026804840:web:a7bc691005cdf53f7afbdd",
  measurementId: "G-55V3G15F7Y",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();
const gitHubAuthProvider = new GithubAuthProvider();

const fireStorage = getStorage(app);

export { auth, googleAuthProvider, gitHubAuthProvider, fireStorage };
