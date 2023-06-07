import { restaurants, Restaurant } from "./restaurants";
import { orders, Order, PriceBracket } from "./orders";

/// getMaxPrice() function returns the maximum price based on the comments in orders.ts. 
function getMaxPrice(price: PriceBracket): number {
    switch (price) {
        case PriceBracket.Low:
            return 10.0;
        case PriceBracket.Medium:
            return 20.0;
        case PriceBracket.High:
            return 30.0;
    }
}

/// getOrders() function filter the orders from each restaurant that cost below that maximum price
function getOrders(price: PriceBracket, orders: Order[][]) {
    let filteredOrders: Order[][] = [];
    const limit = getMaxPrice(price);
    orders[0].filter((order: Order) => order.price <= limit);

    orders.forEach((restaurant: Order[]) => {
        const result = restaurant.filter((order: Order) => order.price <= limit);
        filteredOrders.push(result);
    });
    return filteredOrders
}
/// printOrders() function prints out the orders for each restaurant.
function printOrders(restaurants: Restaurant[], orders: Order[][]) {
    restaurants.forEach((restaurant: Restaurant, index: number) => {
        if (orders[index].length > 0) {
            console.log(restaurant.name)
            orders[index].forEach((order) => {
                console.log(`- ${order.name}: $${order.price}`);

            });
        }
    });
}

/// Main
const elligibleOrders = getOrders(PriceBracket.Low, orders);
printOrders(restaurants, elligibleOrders);
