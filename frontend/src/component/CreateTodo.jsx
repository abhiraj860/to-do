import { useState } from "react";

export function CreateTodo() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div>
            <input id="title" style={{
                padding: 10,
                margin: 10
            }} type='text' placeholder="title"  onChange={(e)=>{
                const value = e.target.value;
                setTitle(e.target.value);
            }}/> <br />
            <input id="desc" style={{
                padding: 10,
                margin: 10
            }} type='text' placeholder="description" onChange={(e)=>{
                const value = e.target.value;
                setDescription(e.target.value);
            }}/> <br />
            <button style={{
                padding: 10,
                margin: 10
            }} onClick={async ()=>{
                const resp = await fetch('http://localhost:3000/todo', {
                    method: "POST",
                    body: JSON.stringify({
                        title : title,
                        description : description
                    }),
                    headers: {
                        "Content-type" : "application/json"
                    }
                });
                const json = await resp.json();
                alert('Todo added');
            }}>Add a todo</button>
        </div>
    );
}