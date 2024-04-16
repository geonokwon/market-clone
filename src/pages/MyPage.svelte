<script>
    import { user$ } from "../store";
    import Nav from "./components/Nav.svelte";
    const logout = () => {
        user$.set(null);
        localStorage.removeItem("token");
    };
</script>

<div>나의 당근</div>
<button class="button-2" on:click={logout}>로그아웃</button>
<Nav location="my" />

<style>
    /* CSS */
    .button-2 {
        background-color: rgba(51, 51, 51, 0.3);
        border-radius: 8px;
        border-width: 0;
        color: #2c2c2c;
        cursor: pointer;
        display: inline-block;
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        list-style: none;
        margin: 0;
        padding: 10px 12px;
        text-align: center;
        transition: all 200ms;
        vertical-align: baseline;
        white-space: nowrap;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }
</style>
