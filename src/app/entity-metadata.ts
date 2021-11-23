import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Post: {},
};

const pluralNames = { 
  Post: 'Posts',
 };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
