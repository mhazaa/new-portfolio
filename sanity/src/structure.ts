import { StructureBuilder } from 'sanity/structure';
import { RobotIcon, BillIcon, CubeIcon } from '@sanity/icons';

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

			S.listItem()
				.title('Portfolio')
				.icon(CubeIcon)
				.child(
					S.document()
						.schemaType('portfolio')
						.documentId('portfolio'),
					),
		]);