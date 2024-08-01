const Cart = require("../models/cartmodel")
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


exports.addCart = catchAsyncErrors(async(req,res,next)=>{
    const { productId } = req.body;
    const userId = req.user._id;
  const cart = await Cart.findOne({ userId });
  if (cart) {
    const itemIndex = cart.items.findIndex(item => item.productId == productId);

    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
    await cart.save();
  } else {

    await Cart.create({ userId, items: [{ productId, quantity: 1 }] });

  }
  const cartt = await Cart.findOne({ userId });
  res.status(200).json({cart:cartt,
    success:true
  });
})


exports.removeCart = catchAsyncErrors(async(req,res,next)=>{
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
  
    if (cart) {
      cart.items = cart.items.filter(item => item.productId != productId);
      await cart.save();
    }
  
    res.status(200).json({cart,
        success:true
    });
})



exports.getCart = catchAsyncErrors(async(req,res,next)=>{
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    res.status(200).json({cart,
        success: true,
});
})