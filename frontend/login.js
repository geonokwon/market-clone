const form = document.querySelector("#login-form");

const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const sha256Password = sha256(formData.get("password"));
    formData.set("password", sha256Password);

    const res = await fetch("/login", {
        method: "post",
        body: formData,
    });
    const data = await res.json();
    const accessToken = data.access_token;
    window.localStorage.setItem("token", accessToken); // 로컬스토리지 익스플로러 종료후에도 저장되어있음.
    // window.sessionStorage.setItem("token1", accessToken); // 세션스토리지 익스플로러 종료후 초기화.
    alert("로그인 되었습니다!");

    window.location.pathname = "/";

    // const btn = document.createElement("button");
    // btn.innerText = "상품 가져오기!";
    // btn.addEventListener("click", async () => {
    //     const res = await fetch("/items", {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     });
    //     const data = await res.json();
    //     console.log(data);
    // });
    // infoDiv.appendChild(btn);
};

form.addEventListener("submit", handleSubmit);
