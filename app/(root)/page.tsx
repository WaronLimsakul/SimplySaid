"use client";
export default function Home() {
    const Postman = async () => {
        const result = await fetch(
            "http://localhost:3000/api/user/67673ae76168b80a5cb198e5",
            { method: "PUT", body: JSON.stringify({ name: "WARON" }) },
        );
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
