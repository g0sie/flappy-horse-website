import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaT9camf1Kuu-uP1_95W6elriPlxmBinM",
  authDomain: "flappy-horse-f5c1d.firebaseapp.com",
  projectId: "flappy-horse-f5c1d",
  storageBucket: "flappy-horse-f5c1d.appspot.com",
  messagingSenderId: "9148462885",
  appId: "1:9148462885:web:c463ef4e7cf95a4c830ccc",
  measurementId: "G-7X9GJZ8ZJV",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account ",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
