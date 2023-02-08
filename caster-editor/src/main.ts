import { createApp } from "vue";
import { createPinia } from "pinia";
import urql, { defaultExchanges, subscriptionExchange } from "@urql/vue";
import VNetworkGraph from "v-network-graph";
import { SubscriptionClient } from "subscriptions-transport-ws";
import "v-network-graph/lib/style.css";

import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

import App from "@/App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/scss/main.scss";
import "v-network-graph/lib/style.css";

const app = createApp(App);

app.use(urql, {
  url:
    import.meta.env.VITE_BACKEND_GRAPHQL_URL || "http://127.0.0.1:8081/graphql",
  requestPolicy: "network-only",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) =>
        new SubscriptionClient(
          (
            import.meta.env.VITE_BACKEND_GRAPHQL_URL ||
            "http://127.0.0.1:8081/graphql"
          )
            .replaceAll("https", "wss")
            .replaceAll("http", "ws"),
          { reconnect: true }
        ).request(operation),
    }),
  ],
});
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.use(VNetworkGraph);

app.mount("#app");
