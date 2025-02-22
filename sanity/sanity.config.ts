import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import schemas from './schemas';
import structure from './src/structure';

export default defineConfig({
	name: 'default',
	title: 'new-portfolio',
	
	projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
	dataset: process.env.SANITY_STUDIO_DATASET || 'production',
	
	plugins: [
		structureTool({
			structure,
		}),
		visionTool(),
		media(),
	],
	
	schema: {
		types: schemas,
	},
});