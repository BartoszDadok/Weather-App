# Demo
## IOS:
https://github.com/user-attachments/assets/b02be913-dda0-4d33-bc1c-4e538b0fa71d


## Android:
https://github.com/user-attachments/assets/27a40c2f-1c65-4298-8996-bb0ab64476d1


# How to run the project

## 1. Installation:
- Recommended Xcode version: 16.2
- If you have no `bun` installed you can run the command: 
`curl -fsSL https://bun.com/install | bash` to install on macOS

```bash
bun install
```

## 2. To run the project:

```bash
# To run on the simulators run prebuild 
bun run ios
bun run android # Run first the Android simulator from Android Studio

# To run on the real device
bun run prebuild 
bun run ios --device
bun run android --device
```

## 3. To run the tests:

```bash
bun run test 
```

# Architecture

## React Native:
I chose to use Expo with bare workflow because it is easy and fast to set up and run the project. Also, it is much easier to add geo-location with Expo.

## State management (Technical requirement)
Since a tool for state management is a requirement, I implemented Redux with Redux Toolkit. However, I don't see a practical reason for implementing Redux for such a small project; it looks a bit like overkill. 

## API calls
Since I implemented Redux, the most natural way to make API calls was to use Redux Toolkit and RTK Query. If there is no state management requirement I would probably just use React Tanstack with axios.



