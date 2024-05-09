import { OrderModel } from "../models";
import { stringify } from 'qs';
export async function generateVnpayService(userId: string, orderId: string) {

    let orderData = await OrderModel.findOne({
        id: orderId,
        userId: userId
    });
    if (!orderData) {
        return { data: { error: "This room is exist!" }, status: 401 };
    }


    const ipAddr = req.headers['x-forwarded-for'];

    const tmnCode = "CGXZLS0Z";
    const secretKey = "XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN"
    const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const returnUrl = `http://103.155.161.116:3434/payment/validate/${payment.userId}/${billTmp.id}`

    const date = new Date();
    const createDate = ;

    const currCode = 'VND';
    const vnp_Params: any = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = "vn";
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = format(date, 'HHmmss');
    vnp_Params['vnp_OrderInfo'] = 'Premium gift ' + gift;
    vnp_Params['vnp_OrderType'] = "billpayment";
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_BankCode'] = 'VNBANK';

    const sortedParams = this.sortObject(vnp_Params);
    const signData = stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    sortedParams['vnp_SecureHash'] = signed;

    const vnpRedirectUrl = vnpUrl + '?' + stringify(sortedParams, { encode: false });


    return { status: 'Ok', url: vnpRedirectUrl };
}
