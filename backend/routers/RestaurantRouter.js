const express = require('express');
const { createUser, moveToCart, placeOrder, updateOrder, orderHistroy, update_Order } = require('../controllers/RestaurantController');

const RestaurantRouter = express.Router()

RestaurantRouter.post('/user', createUser)
RestaurantRouter.post('/user/moveToCart', moveToCart)
RestaurantRouter.post('/order/place-order', placeOrder)
RestaurantRouter.post('/update-db', updateOrder)
RestaurantRouter.get('/order_history/:profileId/:tableId', orderHistroy)
RestaurantRouter.get('/order_history/:branchId', orderHistroy)
RestaurantRouter.put('/updated_order/:id', update_Order)


module.exports = RestaurantRouter;