import React, { useState, useEffect } from 'react';

const OrderContext = React.createContext();

const OrderProvider = function({ children }) {
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
export { OrderProvider };
