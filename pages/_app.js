import { useEffect, useState } from "react";
import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import cart from "../reducers/cart";
import user from "../reducers/user";
import orderHistory from "../reducers/orderHistory";
import CartModal from "../components/layouts/CartModal";
import Loader from "../components/loader/Loader";
import { useRouter } from "next/router";

const reducers = combineReducers({ user, cart, orderHistory });

const persistConfig = { key: "Sunny Case", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Burga</title>
        </Head>
        {loading && <Loader />}
        <CartModal />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
