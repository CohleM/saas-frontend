import React from 'react';

const UserPage = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await res.json();
	return (
		<div>This is users page
			{users.map(user => <li key={user.id}>{user.name} </li>)}
		</div>
	)
}

export default UserPage;
