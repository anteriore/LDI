export const formatProduct = (rawProducts) => {
  if (rawProducts !== null && rawProducts !== undefined) {
    const newFormat = {
      id: rawProducts.id,
      finishedGoodID: rawProducts.product.finishedGood.id,
      product: rawProducts.product.id,
      code: rawProducts.product.finishedGood,
      finishedGood: rawProducts.product.finishedGood,
      quantity: rawProducts.quantity,
      quantityRequested: 0,
      quantityRemaining: rawProducts.quantity,
      unitPrice: 0.0,
      amount: 0,
    };

    return newFormat;
  }

  return {};
};

export const formatProductCalc = (rawProducts) => {
  const existingProducts = [];
  rawProducts.forEach((product) => {
    existingProducts.push({
      id: product.product.id,
      finishedGoodID: product.finishedGood.id,
      code: product.finishedGood,
      product: product.product.id,
      finishedGood: product.finishedGood,
      quantity: product.quantity,
      quantityRequested: product.quantityRequested,
      quantityRemaining: product.quantityRemaining,
      unitPrice: product.unitPrice,
      amount: product.unitPrice * product.quantityRequested,
    });
  });

  return existingProducts;
};

export const formatPayload = (approvalId, company, value) => {
  let totalAmount = 0.0;
  let totalQuantity = 0;
  let formattedValue = {};

  formattedValue = {
    ...formattedValue,
    company: { id: company },
    date: value.date,
    approvedBy: { id: approvalId },
    preparedBy: { id: approvalId },
    checkedBy: { id: approvalId },
    depot: { id: value.depot },
    client: { id: value.client },
    number: value.number,
    remarks: value.remarks,
    type: value.type,
    products: [],
  };

  value.product.forEach((prod) => {
    let newProductValue = {};
    totalAmount += parseFloat(prod.amount);
    totalQuantity += prod.quantity;
    newProductValue = {
      ...newProductValue,
      finishedGood: { id: prod.finishedGood.id },
      product: { id: prod.id },
      quantity: prod.quantity,
      quantityRemaining: prod.quantityRemaining,
      quantityRequested: prod.quantityRequested,
      unitPrice: prod.unitPrice,
      depot: { id: value.depot },
    };

    formattedValue.products.push(newProductValue);
  });

  formattedValue = { ...formattedValue, totalAmount, totalQuantity };

  return formattedValue;
};
