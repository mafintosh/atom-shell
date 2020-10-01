# electron-prebuilt

This project has been merged into the
[electron/electron](https://github.com/electron/electron/tree/master/npm)
repository, and the `electron` module is now published to npm as part of the
Electron release process.This module helps you to install the electron command
for use on the command line without having to compile anything.

If you're having trouble installing or using Electron, please 
[file an issue on the electron/electron repo](https://github.com/electron/electron/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aopen%20install%20).

## Backstory

In the early days of Electron, back when it was still called `atom-shell`, there 
was no module published to npm, nor was there even an Electron team at GitHub.
Electron was used primarly by the [Atom](https://atom.io/) team, and it was up 
to early adopters to manually download compiled binary builds of Electron for 
use in their apps.

In early 2015 [Max Ogden](https://github.com/maxogden) created 
[`electron-download`](https://github.com/electron-userland/electron-download) 
and `electron-prebuilt`, two npm modules to simplify the process of installing 
Electron. These tools quickly became de facto standards in the Electron 
community.

Shortly after `electron-prebuilt` was written, 
[John Muhl](https://github.com/johnmuhl/) created
[electron-prebuilt-updater](https://github.com/electron/electron-prebuilt-updater), 
a Heroku app to publish the the prebuilt module to npm automatically as new 
versions of Electron were published on GitHub.

Fast forward to mid-2017, and GitHub now has a team working full-time on 
Electron. We are working towards a more regular release cadence, 
and are incrementally documenting and [improving our release process](https://github.com/electron/electron/blob/master/docs/development/releasing.md). 
As we've added support for things like 
[TypeScript definitions](https://electron.atom.io/blog/2017/06/01/typescript),
it's been challenging to work these additions into the `electron` -> `electron-prebuilt-updater` -> `electron-prebuilt` release flow.

To reduce the number of moving parts in the release process, we imported
the `electron-prebuilt` codebase into [`electron`](https://github.com/electron/electron/tree/master/npm) itself, and have 
[preserved the git history](https://github.com/electron/electron/pull/10172)
to acknowledge the contributions of the 32 open-source community members who 
have helped improve `electron-prebuilt` over the years.
