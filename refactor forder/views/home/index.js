import React from 'react';
import {Container, Card} from 'reactstrap';

function Index() {
	return (
		<Container>
			<Card className='mt-5 p-5'>
				<h1 className='display-4'>&#123;Adrian Carl F. Vargas&#125;</h1>
				<address>
					<a href='mailto:email@address.com'>imadrianvargas@gmail.com</a>
					<br />
				</address>
			</Card>
		</Container>
	);
}

export default Index;
