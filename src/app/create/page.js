"use client"

import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const title = e.target.title.value;
      const body = e.target.body.value;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      };
  
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"topics", options);
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
            <input type="text" name="title" placeholder="title" />
          </p>
          <p>
            <textarea name="body" placeholder="body" />
          </p>
  
          <p>
            <input type="submit" value="create" />
          </p>
        </form>
      </>
    );
  }