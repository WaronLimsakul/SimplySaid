"use client";
export default function Home() {
    const Postman = async () => {
        const result = await fetch("http://localhost:3000/api/user/vote", {
            method: "POST",
            body: JSON.stringify({ post_id: "676880224da60d0a2ffae4ff", val: 1 }),
        });
        console.log(result);
        return;
    };
    return (
        <>
            <h1>Hello, world</h1>
            <button className="text-white" onClick={Postman}>
                Postman button
            </button>
        </>
    );
}
