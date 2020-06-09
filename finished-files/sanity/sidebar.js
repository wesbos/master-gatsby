import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// This file lets us create a custom sidebar
export default () =>
  // first we create a list
  S.list()
    // And Give a title
    .title(`Slick's Slices`)
    // then we list which items we want
    .items([
      // First first item is a custom singleton
      S.listItem()
        // give it a Title
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        // When you click settings, what happens?
        .child(
          // we show an editor
          S.editor()
            // for the storeSettings Schema Type
            .schemaType('storeSettings')
            // And the ID of the document to edit. In our case Downtown
            .documentId('downtown')
        ),
      ...S.documentTypeListItems(),
    ]);
