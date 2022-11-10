# Recognize

Get to know people.

## Links

- Landing page: https://recognize-landing.vercel.app
- Demo Itsme® page: https://recognize-landing.vercel.app/itsme/index.html
- Demo Europe Commission LiveChat: https://recognize-landing.vercel.app/europe-contact-page/index.html

## Documentation

Here are some links to examples and documentation:

- [Rocket.Chat Apps TypeScript Definitions Documentation](https://rocketchat.github.io/Rocket.Chat.Apps-engine/)
- [Rocket.Chat Apps TypeScript Definitions Repository](https://github.com/RocketChat/Rocket.Chat.Apps-engine)
- [Example Rocket.Chat Apps](https://github.com/graywolf336/RocketChatApps)
- Community Forums
  - [App Requests](https://forums.rocket.chat/c/rocket-chat-apps/requests)
  - [App Guides](https://forums.rocket.chat/c/rocket-chat-apps/guides)
  - [Top View of Both Categories](https://forums.rocket.chat/c/rocket-chat-apps)
- [#rocketchat-apps on Open.Rocket.Chat](https://open.rocket.chat/channel/rocketchat-apps)

## Installation instructions

### Rocket.Chat instance

1. Download Rocket Chat

2. To deploy our Rocket.Chat App, you should enable the development mode:
   - Navigate to Admin
   - Open the General Settings
   - Enable development mode

### Setup the project

Clone this repository, and copy the `.rcappsconfig.example` to `.rcappsconfig`. Fill in the `userId` and `token` that you can generate here under your account.

```bash
npm install
npm run rc-apps deploy
```
