import { MdStore as icon } from 'react-icons/md';

export default {
  name: 'storeSettings',
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'slicemasters',
      title: 'Current Slicemasters Slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices currently available in the case',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
  preview: {
    select: {
      slicemasters: 'slicemasters',
      hotSlices: 'hotSlices',
      media: 'hotSlices.0.image',
    },
    prepare: ({ slicemasters, hotSlices, media }) => ({
      title: `Currently ${slicemasters.length} Slicemasters`,
      subtitle: `and ${hotSlices.length} types of pizza`,
      media,
    }),
  },
};
