# Good Grid - Healthy Grocery Delivery

A React Native/Expo app for healthy grocery delivery with personalized health recommendations.

## Tech Stack & Patterns

- **Framework**: Expo SDK 54 with Expo Router (file-based routing)
- **State Management**: Zustand for lightweight global state
- **Navigation**: Expo Router with tabs and stack navigation
- **Styling**: React Native StyleSheet with theme constants
- **Icons**: SF Symbols via @expo/vector-icons
- **Live Data Pattern**: `services/api/client.ts` + feature services (e.g. `services/homeFeedService.ts`) using `EXPO_PUBLIC_API_BASE_URL`

## Project Structure

```
app/                    # File-based routing
  (tabs)/              # Tab navigation screens
  cart.tsx             # Cart screen
  checkout.tsx         # Checkout flow
  order-confirmation.tsx
  product-detail.tsx
  store-detail.tsx
  tracking.tsx

stores/                # Zustand state management
  cartStore.ts         # Cart state (items, totals, tips)
  userStore.ts         # User session & addresses
  orderStore.ts        # Orders & checkout state
  types.ts             # Shared TypeScript types

components/            # Reusable UI components
constants/             # Theme colors and fonts
```

## State Management

The app uses Zustand stores located in `/stores`:
- **cartStore**: Cart items, quantities, tips, delivery fees, totals
- **userStore**: User authentication, addresses, payment methods
- **orderStore**: Order history, checkout state, order creation

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure your local environment (for live store data)

   ```bash
   cp .env.example .env.local
   ```

   Update `EXPO_PUBLIC_API_BASE_URL` in `.env.local` to your backend URL.

3. Start the app

   ```bash
   npx expo start
   ```

### Home feed API contract (current integration)

`GET /v1/home-feed`

Expected JSON shape:

```json
{
  "categories": [
    { "id": "produce", "title": "Produce", "imageUrl": "https://..." }
  ],
  "featuredStores": [
    {
      "id": "findlay-market",
      "title": "Findlay Market",
      "distanceLabel": "1.0 km",
      "ratingLabel": "4.8 reviews",
      "imageUrl": "https://..."
    }
  ]
}
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
