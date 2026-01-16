import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const stripeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Connect Stripe account
    connectStripe: build.mutation({
      query: (data) => ({
        url: "/stripe/connect",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.vendor],
    }),

    // Create payment intent
    createPaymentIntent: build.mutation({
      query: (data) => ({
        url: "/stripe/create-payment-intent",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.transactions],
    }),

    // Confirm delivery
    confirmDelivery: build.mutation({
      query: (data) => ({
        url: "/delivery/confirm",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.bookings, tagTypes.transactions],
    }),
  }),
});

export const {
  useConnectStripeMutation,
  useCreatePaymentIntentMutation,
  useConfirmDeliveryMutation,
} = stripeApi;
