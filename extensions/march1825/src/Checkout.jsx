import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
  useApi,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
  useCartLines,
  useMetafield,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const instructions = useInstructions();
  const applyAttributeChange = useApplyAttributeChange();
  const customerMetafield = useMetafield({
    namespace: "custom", 
    key: "discount",      
    ownerType: "customer", 
  });

  console.log("customerMetafield", customerMetafield);
  //consoling undefined after giving 401


  // 2. Check instructions for feature availability, see https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions for details
  if (!instructions.attributes.canUpdateAttributes) {
    // For checkouts such as draft order invoices, cart attributes may not be allowed
    // Consider rendering a fallback UI or nothing at all, if the feature is unavailable
    return (
      <Banner title="march1825" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  // 3. Render a UI
  return (
    <BlockStack border={"dotted"} padding={"tight"}>
      <Banner title="march1825">
        {translate("welcome", {
          target: <Text emphasis="italic">{extension.target}</Text>,
        })}
      </Banner>
      <Checkbox onChange={onCheckboxChange}>
        {translate("iWouldLikeAFreeGiftWithMyOrder")}
      </Checkbox>
    </BlockStack>
  );

  async function onCheckboxChange(isChecked) {
    // 4. Call the API to modify checkout
    const result = await applyAttributeChange({
      key: "requestedFreeGift",
      type: "updateAttribute",
      value: isChecked ? "yes" : "no",
    });
    console.log("applyAttributeChange result", result);
  }
}

// import { useEffect, useState } from "react";
// import {
//   reactExtension,
//   useApi,
//   Banner,
//   BlockStack,
// } from "@shopify/ui-extensions-react/checkout";

// export default reactExtension("purchase.checkout.block.render", () => (
//   <Extension />
// ));

// function Extension() {
//   const { query } = useApi();
//   const [customerMetafield, setCustomerMetafield] = useState(null);

//   useEffect(() => {
//     query(
//       `query {
//         customer {
//           metafield(namespace: "custom", key: "discount") {
//             value
//           }
//         }
//       }`
//     )
//       .then(({ data, errors }) => {
//         if (errors) {
//           console.error("GraphQL Errors:", errors);
//         }
//         setCustomerMetafield(data?.customer?.metafield?.value);
//       })
//       .catch(console.error);
//   }, [query]);

//   return (
//     <BlockStack>
//       <Banner title="Customer Discount Metafield">
//         {customerMetafield ? `Value: ${customerMetafield}` : "No metafield found"}
//       </Banner>
//     </BlockStack>
//   );
// }

