import _ from 'lodash';

export const formatSOList = (salesOrders) => {
  const newList = [];
  if (salesOrders.length !== 0) {
    salesOrders.forEach((sale) => {
      newList.push({
        id: sale.id,
        code: `${sale.number} - ${sale.client.salesRep.code} - ${sale.client.code} - ${sale.client.name}`,
      });
    });
  }

  return newList;
};

export const formatOrderedProducts = (lotProducts, salesProducts) => {
  if (salesProducts !== null && lotProducts !== null) {
    const { products } = salesProducts;
    const orderedProducts = [];

    lotProducts.forEach((lotProduct) => {
      const mtchdProduct = _.find(
        products,
        (o) =>
          o.product.id === lotProduct.id &&
          o.product.product.finishedGood.id === lotProduct.product.finishedGood.id
      );
      orderedProducts.push(mtchdProduct);
    });

    return orderedProducts;
  }
  return null;
};

export const formatLotProducts = (salesProducts, inventoryProducts) => {
  if (salesProducts !== null) {
    const listLotProducts = [];
    salesProducts.products.forEach((soProduct) => {
      const { product } = soProduct;
      const results = _.filter(inventoryProducts, (o) => {
        return o.product.finishedGood.id === product.product.finishedGood.id && o.quantity !== 0;
      });
      results.forEach((result) => {
        listLotProducts.push(result);
      });
    });

    return _.uniqBy(listLotProducts, 'id');
  }
  return null;
};

export const formatSalesInfo = (sales) => {
  if (sales !== null && sales !== undefined) {
    const { product: info } = sales;
    const formatedList = [
      {
        key: 1,
        fgCode: info.finishedGood.code,
        quantity: info.quantity,
        quantityRemaining: info.quantityRemaining,
        unitPrice: info.unitPrice,
        amount: info.unitPrice * info.quantityRequested,
      },
    ];

    return formatedList;
  }

  return null;
};

export const formatPayload = (approvalId, company, value, salesOrder, orderedProducts) => {
  let formattedValue = {};
  formattedValue = {
    ...formattedValue,
    number: value.number,
    date: value.date,
    preparedBy: { id: approvalId },
    checkedBy: { id: approvalId },
    approvedBy: { id: approvalId },
    releasedBy: { id: approvalId },
    salesOrder: { id: value.salesOrder },
    client: { id: salesOrder.client.id },
    company: { id: company },
    depot: { id: salesOrder.depot.id },
    remarks: value.remarks,
    totalAmount: _.sumBy(orderedProducts, (o) => {
      return o.unitPrice * o.quantityRequested;
    }),
    type: 'OS',
    orderedProducts: [],
  };

  orderedProducts.forEach((orderedProduct) => {
    formattedValue.orderedProducts.push({
      orderSlipNo: value.number,
      quantity: orderedProduct.quantityRequested,
      salesOrderProductId: orderedProduct.id,
      status: salesOrder.status,
      unitPrice: orderedProduct.quantity,
      depot: { id: salesOrder.depot.id },
      product: { id: orderedProduct.product.id },
    });
  });

  return formattedValue;
};
