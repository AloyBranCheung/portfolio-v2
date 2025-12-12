import * as migration_20251129_180636 from './20251129_180636';
import * as migration_20251210_045528_add_project_collection from './20251210_045528_add_project_collection';
import * as migration_20251212_012519_add_fields_to_project_collection from './20251212_012519_add_fields_to_project_collection';
import * as migration_20251212_013846_seed_projects from './20251212_013846_seed_projects';
import * as migration_20251212_023900 from './20251212_023900';

export const migrations = [
  {
    up: migration_20251129_180636.up,
    down: migration_20251129_180636.down,
    name: '20251129_180636',
  },
  {
    up: migration_20251210_045528_add_project_collection.up,
    down: migration_20251210_045528_add_project_collection.down,
    name: '20251210_045528_add_project_collection',
  },
  {
    up: migration_20251212_012519_add_fields_to_project_collection.up,
    down: migration_20251212_012519_add_fields_to_project_collection.down,
    name: '20251212_012519_add_fields_to_project_collection',
  },
  {
    up: migration_20251212_013846_seed_projects.up,
    down: migration_20251212_013846_seed_projects.down,
    name: '20251212_013846_seed_projects',
  },
  {
    up: migration_20251212_023900.up,
    down: migration_20251212_023900.down,
    name: '20251212_023900'
  },
];
