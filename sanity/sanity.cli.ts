import { defineCliConfig } from 'sanity/cli'
import { SANITY_PROJECT_ID, SANITY_DATASET } from '../backend/sanityControls';

export default defineCliConfig({
  api: {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
  },
});
