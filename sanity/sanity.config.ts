import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { SANITY_PROJECT_ID, SANITY_DATASET } from '../backend/sanityControls';

export default defineConfig({
  name: 'default',
  title: 'Sanity Project',

  projectId: 'vy0rcbg9'!,
  dataset: 'production'!,

  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
