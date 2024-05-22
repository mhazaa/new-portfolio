import { StructureBuilder } from 'sanity/structure';
import { RobotIcon, BillIcon, ComponentIcon, StackCompactIcon, SquareIcon, CubeIcon } from '@sanity/icons';

export default (S: StructureBuilder) =>
	S.list()
		.title('All Data')
		.items([
			S.listItem()
				.title('Bio Page')
				.icon(RobotIcon)
				.child(
					S.document()
						.schemaType('bioPage')
						.documentId('bioPage'),
				),

			S.listItem()
				.title('Resume')
				.icon(BillIcon)
				.child(
					S.document()
						.schemaType('resume')
						.documentId('resume'),
				),

			S.divider(),

			S.listItem()
				.title('Posts')
				.icon(ComponentIcon)
				.child(
					S.list().title('Posts').items([	
						S.listItem()
							.title('Artist')
							.icon(StackCompactIcon)
							.child(
								S.documentList()
									.title('Artist')
									.filter(`_type == 'post' && category == 'artist'`),
							),

						S.listItem()
							.title('Writer')
							.icon(StackCompactIcon)
							.child(
								S.documentList()
									.title('Writer')
									.filter(`_type == 'post' && category == 'writer'`),
							),

						S.listItem()
							.title('Uncategorized')
							.icon(SquareIcon)
							.child(
								S.documentList()
									.title('Uncategorized')
									.filter(`_type == 'post' && category != 'artist' && category != 'writer'`),
							),
					]),
				),

			S.listItem()
				.title('Portfolio')
				.icon(CubeIcon)
				.child(
					S.document()
						.schemaType('portfolio')
						.documentId('portfolio'),
				),
		]);