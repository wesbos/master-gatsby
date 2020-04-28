import icon from 'react-icons/lib/md/person';

export default {
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'What is the name of the topping?',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
    },
    {
      name: 'vegan',
      title: 'vegan',
      type: 'boolean',
    },
    {
      name: 'halal',
      title: 'halal',
      type: 'boolean',
    },
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
};
