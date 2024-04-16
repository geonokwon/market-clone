<script>
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { user$ } from "../store";

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            user$.set(user);
            window.localStorage.setItem("token", token);
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.error(error);
        }
    };
</script>

<div>
    <div>로그인하기</div>
    <button class="login-btn" on:click={loginWithGoogle}>
        <img
            class="login-btn__img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOg4SCkphgqBOTS3finNqYMBwXdUSsfxy2N1eN4hUC0A&s"
            alt="google-icon"
        />
        <div>Google로 시작하기</div>
    </button>
</div>

<style>
    .login-btn__img {
        width: 20px;
    }
    .login-btn {
        width: 200px;
        height: 50px;
        border: 1px solid gray;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        border-radius: 3px;
    }
</style>
