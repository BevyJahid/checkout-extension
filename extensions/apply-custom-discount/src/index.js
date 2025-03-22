export default function applyCustomDiscount(input) {
    const discountAttribute = input.cart.attributes.find(
      (attr) => attr.key === "custom_discount_code"
    );
    
    const discountPercentage = discountAttribute ? parseFloat(discountAttribute.value) : 0;
    if (isNaN(discountPercentage) || discountPercentage <= 0) {
      return {
        discounts: [],
        discountApplicationStrategy: "FIRST",
      };
    }
  
    const cartTotal = parseFloat(input.cart.cost.subtotalAmount.amount);
    const discountAmount = (cartTotal * discountPercentage) / 100;
  
    return {
      discounts: [
        {
          targets: [
            {
              orderSubtotal: {
                excludedVariantIds: [],
              },
            },
          ],
          value: {
            percentage: {
              value: discountPercentage,
            },
          },
          message: `Applied ${discountPercentage}% discount from customer metafield`,
        },
      ],
      discountApplicationStrategy: "FIRST",
    };
  }
  
  applyCustomDiscount.apiVersion = "2024-01";
  applyCustomDiscount.inputQuery = `
    query Input {
      cart {
        attributes {
          key
          value
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `