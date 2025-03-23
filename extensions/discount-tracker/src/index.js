
export default function discountTracker({ analytics, init }) {
    analytics.subscribe("discount_button_clicked", async (event) => {
      const { customerId, discountCode, cartTotal } = event.data;
      const timestamp = new Date().toISOString();
  
      await fetch(`${init.shop.shopify_domain}/api/track-discount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, discountCode, cartTotal, timestamp }),
      });
    });
  }
  
  discountTracker.apiVersion = "2024-01";