import * as migration_20251129_180636 from './20251129_180636';
import * as migration_20251210_045528_add_project_collection from './20251210_045528_add_project_collection';

export const migrations = [
  {
    up: migration_20251129_180636.up,
    down: migration_20251129_180636.down,
    name: '20251129_180636',
  },
  {
    up: migration_20251210_045528_add_project_collection.up,
    down: migration_20251210_045528_add_project_collection.down,
    name: '20251210_045528_add_project_collection'
  },
];
