# Recognize

Get to know people. \
If you would to get to know us, shoot us a message on [rocket.chat](https://rocketchat.dem.be/)!

## Team

- [Florian Van Damme](https://www.linkedin.com/in/florian-van-damme-5b0187105/)
- [Demian Dekoninck](https://www.linkedin.com/in/demiandekoninck/)
- [Kilian Lievens](https://www.linkedin.com/in/kilian-lievens-231743153/)

## Links

- Landing page: https://recognize-landing.vercel.app
- Demo Itsme® page: https://recognize-landing.vercel.app/itsme/index.html
- Demo Europe Commission LiveChat: https://recognize-landing.vercel.app/europe-contact-page/index.html

## Documentation

An example flow of a Recognize powered rocket.chat exchange between a citizen and service provider.
![A Recognize rocket.chat flow](https://i.imgur.com/1eVEIzW.png)

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

## Identity Provider instructions

### Setting up itsme®

Navigate to `apps` -> `Recognize` -> `settings` in your rocket.chat instance.
The first step is to enable the itsme® integration, this is done by selecting it from the dropdown in the Enabled identification services.

After the itsme® integration is enabled, please provide the application with your client id and secret pair, along with the base URL of your itsme® instance.

See below screenshot for an example integration.
![itsme settings](https://i.imgur.com/XkO6ibv.jpeg)

### Setting up Pexip

Navigate to `apps` -> `Recognize` -> `settings` in your rocket.chat instance.
The first step is to enable the Pexip integration, this is done by selecting it from the dropdown in the Enabled identification services.

After the Pexip integration is enabled, please provide the application with your username and password, along with the base URL of your Pexip management node.
Ensure that your management node is exposed to the public internet and has username / password authentication enabled. In addition, your instance needs to have a policy server that supports ad-hoc VMR creation. For additional information, please check [the official Pexip documentation](https://docs.pexip.com/admin/external_policy.htm) on how to do so.

See below screenshot for an example integration.
![Pexip settings](https://i.imgur.com/8UKGuH9.jpg)


### Adding metadata

Recognize allows identity providers to enrich callbacks done to the Recognize rocket.chat with additional metadata about the user. `meta` is an optional `any` type field stored on a `verified-user`. This data can be read by rocket.chat and other applications and used however they see fit. 
To allow maximum flexibility, this field can contain any data, so the integrator is responsible for parsing and validating this data.

The (optional) meta is passed in the `verify-user` POST body. There's no validation and no restrictions on this field. An example could be:

```shell
curl --location --request POST 'https://<RocketChatInstanceBaseURL>/api/apps/public/<RecognizeAppId>/verify-user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Antonie",
    "lastName": "Puyenbroeck",
    "meta": "My Metadata"
}'
```

Note that the `meta` is a string here, but it could easily be number or any object. Feel free to get creative!

### Integrating your own identity provider

Before starting on integrating a new identity provider, it is important to understand how Recognize sends and receives requests to and from said identity providers.

The following flow chart gives a base overview on how the Recognize internals work:
![Recognize flowchart](https://i.imgur.com/hzwTlyR.png)

1. Recognize prepares the request to the Identity Provider, this is done by creating a state JWT, containing all information required by Recognize to ensure:
   - The request is not tampered with, if the state is manipulated the request is rejected
   - Linking the Identity Provider callback to the correct user
   
2. After activating your integration, and providing Recognize with the necessary information (url, any applicable secrets or ids, ...). Recognize will send a GET request to the Identity Provider endpoint, an example request will look something like this.
    ```shell
    curl --location --request GET 'https://<IdentityProviderBaseURL>?state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb29tSWQiOiI1QkRGeHJYTnZkVFJUc1NlaiIsInVzZXJUb2tlbiI6ImI4YzQxMDZlNjIxZTRlOTM3NzRjMTUzNGZlNmEzOGJkNTcwNTY1NGYwM2M0Nzg0NjgyMTNmZDJiNGZkYzA0MjEiLCJpZGVudGlmaWNhdGlvblJlcXVlc3RlZEJ5IjoiS01oM25pdnc0UHRDeHVZWFQiLCJ2ZXJpZmljYXRpb25NZXNzYWdlSWQiOiJ3S3g1QXlXZnB3TmtYaXgzOCIsInVzZXJuYW1lIjoiZ3Vlc3QtMTgiLCJpZGVudGlmaWVkQnkiOiJJVFNNRSIsInJlZGlyZWN0TG9jYXRpb24iOiJodHRwczovL3JlY29nbml6ZS1sYW5kaW5nLnZlcmNlbC5hcHAvaXRzbWUvaW5kZXguaHRtbCIsImlhdCI6MTY2ODM0NjIxNH0.6OYDbuuUookrp_MGkun7KIKAEg_aQFu7ee221IX3owI&name=Antonie%20Puyenbroeck' \
    --header 'X-Client-ID: ip-client-id' \
    --header 'X-Client-Secret: ip-client-secret'
    ```
    After this request, the user should enter the verification flow of the Identity Provider.

3. Upon successful identification of the user, the Identity Provider MUST respond with a POST to the `/verify-user` endpoint. This request requires the Identity Provider to return the `state` query param untouched. In addition, through the body a `firstName` and `lastName` property MUST be provided. This request can also return any optional metadata to be store along the identified user. See [adding metadata](#adding-metadata) for additional specifics.
   An example response will look something like this:
   ```shell
   curl --location --request POST 'https://<RocketChatInstanceBaseURL>/api/apps/public/<RecognizeAppId>/verify-user?state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb29tSWQiOiI1QkRGeHJYTnZkVFJUc1NlaiIsInVzZXJUb2tlbiI6ImI4YzQxMDZlNjIxZTRlOTM3NzRjMTUzNGZlNmEzOGJkNTcwNTY1NGYwM2M0Nzg0NjgyMTNmZDJiNGZkYzA0MjEiLCJpZGVudGlmaWNhdGlvblJlcXVlc3RlZEJ5IjoiS01oM25pdnc0UHRDeHVZWFQiLCJ2ZXJpZmljYXRpb25NZXNzYWdlSWQiOiJ3S3g1QXlXZnB3TmtYaXgzOCIsInVzZXJuYW1lIjoiZ3Vlc3QtMTgiLCJpZGVudGlmaWVkQnkiOiJJVFNNRSIsInJlZGlyZWN0TG9jYXRpb24iOiJodHRwczovL3JlY29nbml6ZS1sYW5kaW5nLnZlcmNlbC5hcHAvaXRzbWUvaW5kZXguaHRtbCIsImlhdCI6MTY2ODM0NjIxNH0.6OYDbuuUookrp_MGkun7KIKAEg_aQFu7ee221IX3owI' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "firstName": "Antonie",
   "lastName": "Puyenbroeck",
   "meta": "{\\"type\\":\\"Legend of the Puyenbroeck\\",\\"externalId\\":123}"
   }'
    ```
By adhering to this specification, any Identity Provider can be registered in Recognize. If you like professional support or a custom integration, please feel free to message us on [rocket.chat](https://rocketchat.dem.be/).
