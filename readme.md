![Master Gatbsy](https://res.cloudinary.com/wesbos/image/upload/c_scale,q_auto,w_1600/v1600356131/GAT-social-share_rxvhdg.png)

# Master Gatsby

A Premium JavaScript + CSS Training Course from Wes Bos. You can grab the course at [MasterGatsby.com](https://mastergatsby.com).

This repo includes the starter files, stepped solutions and sample data for doing the course.

## FAQ

**Q:** How can I set a custom Emmet expand keyboard shortcut?

**A:** In VS Code, you can go to `File` -> `Preferences` -> `Keyboard Shortcuts` (Windows, Linux) or `Code` -> `Preferences` -> `Keyboard Shortcuts` (Mac). Search for `Emmet Expand Abbreviation` and you should see the current keyboard shortcut there. Double-click on the current key-bind to set a new keyboard shortcut. I have mine set to `Ctrl` + `E` which I really like but you can pick any combo you like!

**Q:** Where do I find the nice Pizza images that are used in the course?

**A:** The Pizza images can be found in the Sanity [sample-data folder](https://github.com/wesbos/master-gatsby/tree/master/starter-files/sanity/sample-data/nice-pizza-pics) in the starter files.

**Q:** My data was showing perfectly fine in Gatsby a few days ago and now it isn't.

**A:** Many common issues such as stale data or corrupt data can be fixed by running `gatsby clean` in the terminal - make sure you are in the Gatsby folder in the terminal. Gatsby uses an aggressive cache that can corrupt at times so you can try to fix it by cleaning the cache out.

**Q:** I'm getting a `npm ERR! Cannot read property 'matches' of undefined` message when installing the `gatsby-cli` globally.

**A:** Node 15.x isn't yet supported and will cause that error, it's better to stick with Node 14.x for the course at the moment.

**Q:** I'm getting an error when starting Gatsby that says it's not finding a `gatsby-source-sanity/src/gatsby-node.ts` file.

**A:** This error appears if you have a typo in your `options` that you pass to the `gatsby-source-sanity` plugin in the `gatsby-config.js` file. You can compare your code against the [stepped solution](https://github.com/wesbos/master-gatsby/blob/master/stepped-solutions/17/gatsby-config.js) for that file. Check that you have the same _capitilization_ of the `options` (projectId, dataset, watchMode) as it is a common cause of the issue.

**Q:** I'm getting a `import dotenv from 'dotenv'; SyntaxError: Unexpected identifier` error when starting the Gatsby server.

**A:** Please use the provided [npm scripts](https://github.com/wesbos/master-gatsby/blob/master/starter-files/gatsby/package.json#L7) to start the Gatsby server (such as `npm run develop` or `yarn develop`). Don't use the global `gatsby develop` command as Gatsby doesn't support using ESM imports yet. The provided npm scripts uses an `esm` npm package to add support for the newer import syntax.

**Q:** I'm getting a `Error: GraphQL API not deployed` error when starting the Gatsby server.

**A:** You need to make sure you deployed the Sanity dataset to the GraphQL API by running the `sanity graphql deploy production` command in your terminal before it can be used by Gatsby. _Make sure that you are in the `Sanity` folder in your terminal when you run that command._

**Q:** I made a change to my Sanity content and it's not showing in Gatsby in real-time?

**A:** Please make sure you have the 2 options `watchMode` and `token` configured in the `gatsby-source-sanity` plugin. If the changes you are making to the content is `unpublished` and you'd like to preview that in real-time you would need to add the `overlayDrafts` option to your Gatsby plugin. You can read more about this in the [gatsby-source-sanity readme](https://github.com/sanity-io/gatsby-source-sanity#preview-of-unpublished-content).

**Q:** I made a change to my Sanity schema and it's not showing in Gatsby?

**A:** Changes to the schema in your local Sanity studio will not automatically change the Sanity GraphQL API, you'll have to deploy those changes by using `sanity graphql deploy production`. _Make sure that you are in the `Sanity` folder in your terminal when you run that command._

## Comunity Contributions

Did you blog about your experience? Do the course in Typescript? Use WordPress instead? Send us a PR with links to your implementations!

- [Creating your own Gatsby Live Preview for Sanity](https://www.simeongriggs.dev/roll-your-own-gatsby-live-preview-for-sanity) has never been easier now with DigitalOcean App Platform.
