import React from 'react';

const Contact: React.FC = () => (
	<div>
		<h2>Contact</h2>
		<form>
			<input type="name" placeholder="Your name"></input>
			<input type="email" placeholder="Your email"></input>
			<textarea rows={10} placeholder="Your message" />
		</form>
		<a><button>Submit</button></a>
	</div>
);

export default Contact;