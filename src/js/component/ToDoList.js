import React from "react";
import { useState } from "react";
const ToDoList = () => {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState("");
	const AddTask = () => {
		const newTodos = todos.concat({ title: task, id: todos.length + 1 });
		setTodos(newTodos);
	};
	fetch("https://assets.breatheco.de/apis/fake/todos/user/mytodoList")
		.then(response => response.json())
        .then(responseJSON => setTodos(responseJSON));
        

    useEffect(() => {
        fetch("http://assets.breatheco.de/apis/fake/todos/user/mytodoList", {
		method: "PUT",
		body: JSON.stringify(todos),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(resp => {
			console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
			console.log(resp.status); // el código de estado = 200 o código = 400 etc.
			console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
			console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
		})
		.catch(error => {
			//manejo de errores
			console.log(error);
		});
     },[todos]);

	
	return (
		<div>
			<input
				type="text"
				value={task}
				onChange={e => {
					setTask(e.target.value);
				}}
			/>
			<button onClick={AddTask}>Add</button>

			<ul>
				{todos.map(todo => {
					console.log(todo);
					return <li key={todo.id}>{todo.label}</li>;
				})}
			</ul>
		</div>
	);
};
// {
// 	array.map(item => {
// 		return <div key={item.id}>I am one Object in the Array {item}</div>;
// 	});
// }

export default ToDoList;
