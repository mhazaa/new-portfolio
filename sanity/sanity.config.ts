import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import {
  SANITY_STUDIO_PROJECT_TITLE,
  SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET,
} from '../backend/sanityControls';

export default defineConfig({
  name: 'default',
  title: SANITY_STUDIO_PROJECT_TITLE,

  projectId: SANITY_STUDIO_PROJECT_ID,
  dataset: SANITY_STUDIO_DATASET,

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});