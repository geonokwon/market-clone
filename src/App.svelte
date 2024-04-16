<script>
    import Login from "./pages/Login.svelte";
    import Main from "./pages/Main.svelte";
    import NotFound from "./pages/NotFound.svelte";
    import Signup from "./pages/Signup.svelte";
    import Write from "./pages/Write.svelte";
    import Router from "svelte-spa-router";
    import "./css/style.css";
    import { user$ } from "./store";
    import { GoogleAuthProvider, signInWithCredential } from "firebase/auth/cordova";
    import { getAuth } from "firebase/auth";
    import { onMount } from "svelte";
    import Loading from "./pages/Loading.svelte";
    import MyPage from "./pages/MyPage.svelte";

    let isLoading = true;

    const auth = getAuth();

    const checkLogin = async () => {
        const token = window.localStorage.getItem("token");
        if (!token) return (isLoading = false);

        const credential = GoogleAuthProvider.credential(null, token);
        const result = await signInWithCredential(auth, credential);
        const user = result.user;
        user$.set(user);
        isLoading = false;
    };
    onMount(() => checkLogin());
    const routes = {
        "/": Main,
        "/signup": Signup,
        "/write": Write,
        "/my": MyPage,
        "*": NotFound,
    };
</script>

{#if isLoading}
    <Loading />
{:else if !$user$}
    <Login />
{:else}
    <Router {routes} />
{/if}
