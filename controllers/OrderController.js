import Order from "../models/OrderModels.js";
import sendEmail from "../utils/SandEmail.js";

const CreateOrder = async (req, res) => {
  try {
    const { items, totalAamount, adress, paymentId } = req.body;

    if (
      !items ||
      items.length === 0 ||
      !totalAamount ||
      !adress ||
      !paymentId
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    const order = new Order({
      user: req.user._id,
      items,
      totalAamount,
      adress,
      paymentId,
    });

    await order.save();

    const message = `Dear ${req.user.name},

Thank you very much for visiting my store.

Order ID: ${order._id}

Total Amount: ${totalAamount}

Shipping Address:
${adress.fullName}
${adress.street}
${adress.city}
${adress.postalCode}
${adress.Countery}

Payment ID: ${paymentId}`;

    await sendEmail(req.user.email, "Order Created Successfully", message);

    return res.status(201).json({
      success: true,
      message: "Your order successfully created",
      order,
    });
  } catch (error) {
    console.error("CreateOrder Error:", error);

    return res.status(500).json({
      success: false,
      message: "Order Server ERROR",
      error: error.message,
    });
  }
};

const myorders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "myorder server error", error });
  }
};
const adminGetOrder = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "Id name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "myorder server error", error });
  }
};

const UpdateOrderStatus = async (req, res) => {

  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    order.status = status;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Update order server error",
      error: error.message,
    });
  }
};
export { CreateOrder, myorders, adminGetOrder, UpdateOrderStatus };
