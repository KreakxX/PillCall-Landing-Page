import { Suspense } from "react";
import GoogleCallbackClient from "./GoogleCallbackClient";

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900">
              Anmeldung wird vorbereitet...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Bitte warten Sie einen Moment.
            </p>
          </div>
        </div>
      }
    >
      <GoogleCallbackClient />
    </Suspense>
  );
}
