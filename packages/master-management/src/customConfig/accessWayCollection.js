import { accessWayCustomCollection } from './custom/accessWayCollection';
import { accessWayGeneralCollection } from './general/accessWayCollection';

export const accessWayCollection = {
  ...accessWayGeneralCollection,
  ...accessWayCustomCollection,
};
