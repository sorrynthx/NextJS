"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${id}`);
                const result = await response.json();
                console.log(result);
                setTitle(result.title);
                setBody(result.body);
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
                // You might want to handle the error appropriately here
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]); // Adding id as a dependency ensures that the effect will re-run if the id changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        };

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `topics/`+id, options);
            const result = await response.json();
            console.log(result);
            const lastid = result.id;
            router.refresh();
            router.push(`/read/${lastid}`);
        } catch (error) {
            console.error("There was an error:", error);
            // You might want to handle the error appropriately here
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>
                    <input type="text" name="title" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
                </p>
                <p>
                    <textarea name="body" placeholder="body" value={body} onChange={e => setBody(e.target.value)} />
                </p>

                <p>
                    <input type="submit" value="update" />
                </p>
            </form>
        </>
    );
}