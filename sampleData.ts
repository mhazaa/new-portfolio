import { AllData } from "./types"

const data: AllData = {
	bioPage: {
		bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus sem, consectetur in odio sit amet, pharetra sodales libero. Pellentesque molestie mollis massa, sit amet ultricies eros vestibulum id. Phasellus sit amet semper velit, ut vulputate ipsum. Etiam dignissim eros ac lacinia tempor. Morbi eu libero commodo elit blandit pulvinar. Praesent nisl lacus, scelerisque in consequat a, lobortis laoreet lectus. Vivamus ultricies risus at sagittis ultrices. Nam et mi quis leo fringilla finibus.',
	},
	socialMediaLinks: {
		instagram: 'https://www.instagram.com/magdi_hazaa/',
	},
	portfolio: {
		artist: [
			{
				postId: '0',
				title: 'Insomnia',
				medium: 'Painting',
				url: '/artist/insomnia',
				year: '2023',
			},
		],
		writer: [
			{
				postId: '0',
				title: 'The Shams Cabaret',
				medium: 'Short Fiction',
				url: '/writer/the-shams-cabarat',
				year: '2023',
			},
			{
				postId: '0',
				title: 'The Shams Cabaret',
				medium: 'Short Fiction',
				url: '/writer/the-shams-cabarat',
				year: '2023',
			},
		],
	},
}

export default data;