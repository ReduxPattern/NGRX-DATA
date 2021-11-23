import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      optimisticDelete: true,
      optimisticUpdate: true,
    },
  },
};

const pluralNames = { 
  Post: 'Posts',
 };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
