import BaseStore from "./BaseStore";
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';

class AuthStore extends BaseStore {
    login(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password)
            .then(userCredentials => {
                const firebaseUser = userCredentials.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === "auth/invalid-email" || errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
                    return "wrong-input";
                }
            });
    }

    logout() {
        return signOut(this.auth)
            .then(() => {
                console.log('logout-store');
            }).catch((error) => {
                console.log(error);
            });
    }
}

export default AuthStore;