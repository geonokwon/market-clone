<script>
    import Footer from "./components/Nav.svelte";
    import { getDatabase, ref, push } from "firebase/database";
    import { getStorage, ref as refImage, uploadBytes, getDownloadURL } from "firebase/storage";
    import Compressor from "compressorjs";
    import Nav from "./components/Nav.svelte";

    let title;
    let price;
    let description;
    let place;
    let files;

    const storage = getStorage();
    const db = getDatabase();

    async function writeUserData(imgUrl) {
        push(ref(db, "items/"), {
            title,
            price,
            description,
            place,
            insertAt: new Date().getTime(),
            imgUrl,
        });
        alert("글쓰기가 완료되었습니다.");
        window.location.hash = "/";
    }

    const uploadFile = async () => {
        const file = files[0];
        const name = file.name;

        // 이미지를 압축하여 Blob으로 반환
        const compressedBlob = await compressImage(file);

        // Firebase Storage에 압축된 이미지 업로드
        const imgRef = refImage(storage, name);
        const snapshot = await uploadBytes(imgRef, compressedBlob);

        // 업로드한 이미지의 다운로드 URL 가져오기
        const url = await getDownloadURL(imgRef);

        return url;
    };

    // 이미지를 압축하는 함수
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.6, // 압축 품질 (0에서 1 사이의 값, 기본값은 0.8)
                maxWidth: 800, // 최대 폭 (픽셀)
                maxHeight: 600, // 최대 높이 (픽셀)
                success(result) {
                    resolve(result); // 압축된 이미지 Blob 반환
                },
                error(err) {
                    console.error("이미지 압축 중 오류 발생:", err.message);
                    reject(err);
                },
            });
        });
    };

    // const uploadFile = async () => {
    //     const file = files[0];
    //     const name = file.name;
    //     const imgRef = refImage(storage, name);
    //     await uploadBytes(imgRef, file);
    //     const url = await getDownloadURL(imgRef);
    //     return url;
    // };
    const handleSubmit = async () => {
        const url = await uploadFile();
        writeUserData(url);
    };
</script>

<form id="write-form" on:submit|preventDefault={handleSubmit}>
    <div>
        <label for="image">이미지</label>
        <input type="file" bind:files id="image" name="image" />
    </div>
    <div>
        <label for="title">제목</label>
        <input type="text" id="title" name="title" bind:value={title} />
    </div>
    <div>
        <label for="price">가격</label>
        <input type="number" id="price" name="price" bind:value={price} />
    </div>
    <div>
        <label for="description">설명</label>
        <input type="text" id="description" name="description" bind:value={description} />
    </div>
    <div>
        <label for="place">장소</label>
        <input type="text" id="place" name="place" bind:value={place} />
    </div>
    <div>
        <button class="write-button" type="submit">글쓰기 완료</button>
    </div>
</form>
<Nav location="write" />

<style>
    .write-button {
        background-color: tomato;
        margin: 10px;
        border-radius: 8px;
        padding: 5px 10px 5px 10px;
        color: white;
        cursor: pointer;
    }
</style>
