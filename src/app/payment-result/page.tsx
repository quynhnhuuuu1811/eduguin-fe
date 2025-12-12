"use client";

import { Suspense } from "react";
import PaymentResultPageView from "@/page-views/payment-result/page-view";
import LoadingScreen from "@/components/LoadingScreen";

export default function PaymentResultPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PaymentResultPageView />
    </Suspense>
  );
}
