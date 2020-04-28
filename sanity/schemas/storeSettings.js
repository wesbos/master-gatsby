import icon from 'react-icons/lib/md/person';

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
    //   {
    //     name: 'slug',
    //     title: 'Slug',
    //     type: 'slug',
    //     options: {
    //       source: 'name',
    //       maxLength: 100,
    //     },
    //   },
    //   {
    //     name: 'image',
    //     title: 'Image',
    //     type: 'image',
    //     options: {
    //       hotspot: true,
    //     },
    //   },
    //   {
    //     name: 'Toppings',
    //     title: 'toppings',
    //     type: 'array',
    //     of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    //   },
  ],
  // preview: {
  //   select: { title: 'name', media: 'image' },
  // },
};
