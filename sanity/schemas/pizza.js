import icon from 'react-icons/lib/md/person';
import PriceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  initialValue: () => ({ price: 1099 }),
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of Pizza.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
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
      title: 'Toppings',
      name: 'toppings',
      type: 'array',
      editModal: 'popover',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'The price of the pizza in cents',
      validation: Rule => Rule.min(1000),
      inputComponent: PriceInput,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      const tops = Object.values(toppings).filter(Boolean);
      return {
        title,
        media,
        subtitle: tops.join(', '),
      };
    },
  },
};
