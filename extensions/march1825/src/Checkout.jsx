
// import {
//   reactExtension,
//   Banner,
//   BlockStack,
//   Checkbox,
//   Text,
//   useApi,
//   useApplyAttributeChange,
//   useInstructions,
//   useTranslate,
//   useCartLines,
//   useMetafield,
//   useAppMetafields,
//   Button
// } from "@shopify/ui-extensions-react/checkout";

// // 1. Choose an extension target
// export default reactExtension("purchase.checkout.cart-line-item.render-after", () => (
//   <Extension />
// ));

// function Extension() {
//   const translate = useTranslate();
//   const { extension,lines} = useApi();
//   const instructions = useInstructions();
//   const applyAttributeChange = useApplyAttributeChange();
//   const fields = useAppMetafields({type: 'customer', namespace:"custom", key:'discount'})
//  const eligbleDiscount = fields[0]?.metafield?.value;
//   console.log('app metafields', eligbleDiscount);
//   console.log('lines',lines.current)
//   if (!instructions.attributes.canUpdateAttributes) {
//     return (
//       <Banner title="march1825" status="warning">
//         asd
//       </Banner>
//     );
//   }

//   // 3. Render a UI
//   return (
//     <BlockStack border={"dotted"} padding={"tight"}>
//       <Banner title="march1825">
//         {translate("welcome", {
//           target: <Text emphasis="italic">{extension.target}</Text>,
//         })}
//       </Banner>
//       <Button
//       onPress={onCheckboxChange}
//     >
//       Apply Discount
//     </Button>
//     </BlockStack>
//   );

// function onCheckboxChange() {
//     console.log("applyAttributeChange result");
//   }
// }
import {
  reactExtension,
  Banner,
  BlockStack,
  Button,
  Text,
  useApi,
  useApplyAttributeChange,
  useTranslate,
  useMetafield,
  useAppMetafields,
  useCartLines,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.cart-line-item.render-after", () => (
  <Extension />
));

function Extension() {
  const { lines } = useApi();
  const applyAttributeChange = useApplyAttributeChange();
  const cartLines = useCartLines();
 const cartTotal = lines.current[0].cost.totalAmount.amount;
 const currentCurrencyCode = lines.current[0].cost.totalAmount.currencyCode;
  const fields = useAppMetafields({
    type: "customer",
    namespace: "custom",
    key: "discount",
  });
  const eligibleDiscount = parseFloat(fields[0]?.metafield?.value || "0");
  const discountAmount = (cartTotal * eligibleDiscount) / 100;
  async function applyDiscount() {
    console.log("Applying discount...");
  
    const isSuccess = await applyAttributeChange({
      key: "custom_discount_code",
      type: "updateAttribute",
      value: `${eligibleDiscount}`,
    });
  
    console.log("Discount attribute applied successfully:", isSuccess);
  }

  return (
    <BlockStack border="dotted" padding="tight">
    <Banner>
      <BlockStack>
        <Text>Cart Value: {cartTotal} {currentCurrencyCode}</Text>
        <Text>Discount ({eligibleDiscount}%): {discountAmount} {currentCurrencyCode}</Text>
      </BlockStack>
    </Banner>
    <Button onPress={applyDiscount}>Apply Discount</Button>
  </BlockStack>
  );
}
