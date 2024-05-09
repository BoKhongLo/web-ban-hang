import { OrderModel } from "../models";
import { stringify } from 'qs';
import { format } from 'date-fns';
import * as crypto from 'crypto';

function sortObject(obj: any) {
    const sorted = {};
    const str = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (let key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

export async function generateVnpayService(userId: string, orderId: string, ipAddr: any) {

    let orderData = await OrderModel.findOne({
        id: orderId,
        userId: userId
    });
    if (!orderData) {
        return { data: { error: "This order is not exist!" }, status: 401 };
    }
    orderData = orderData.toJSON();

    const tmnCode = "CGXZLS0Z";
    const secretKey = "XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN"
    const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const returnUrl = `http:///localhost:3434/payment/vnpay/validate?userId=${orderData.userId}&orderId=${orderData.id}`

    const date = new Date();

    const currCode = 'VND';
    const vnp_Params: any = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = "vn";
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = format(date, 'HHmmss');
    vnp_Params['vnp_OrderInfo'] = 'Bill: ' + `${orderData.listProducts.length} Products`;
    vnp_Params['vnp_OrderType'] = "billpayment";
    const totalAmount = orderData.totalAmount * 1.1 + (orderData.deliveryType === "STANDARD" ? 25000 : orderData.deliveryType === "FAST" ? 50000 : 0);
    const roundedAmount = Math.round(totalAmount * 100);
    vnp_Params['vnp_Amount'] = roundedAmount;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = format(date, 'yyyyMMddHHmmss');
    vnp_Params['vnp_BankCode'] = 'VNBANK';

    const sortedParams = sortObject(vnp_Params);
    const signData = stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    sortedParams['vnp_SecureHash'] = signed;

    const vnpRedirectUrl = vnpUrl + '?' + stringify(sortedParams, { encode: false });

    return { data: { url: vnpRedirectUrl}, status: 201 };
}


export async function validateOrderService(userId: string, orderId: string, bank: string | undefined, trackId: string | undefined) {

    let orderData = await OrderModel.findOne({
        id: orderId,
        userId: userId
    });
    if (!orderData) {
        return { data: { error: "This order is not exist!" }, status: 401 };
    }
    if (orderData.isPay.isPaid === true) {
        return { data: { error: "This order is paid!" }, status: 401 };
    }
    orderData.isPay.isPaid = true;
    orderData.isPay.bank = bank ?? "";
    orderData.isPay.trackId = trackId ?? "";
    await orderData.save();
    return { orderId: orderData.id, status: 201 }
}
