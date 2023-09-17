const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    let eId = await Order.findOne({ email: req.body.email });
    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    }
  } catch (error) {
    res.send("Server Error "+ error.message);
  }
});

router.post('/myOrderData', async (req, res) => {
    try {
        // console.log(req.body.email)
        let myData = await Order.findOne({ 'email': req.body.email })
        console.log("data from atlas ", myData)
        res.json({orderData: myData})
    } catch (error) {
        res.send("Server Error" + error.message)
    }
});

module.exports = router;
