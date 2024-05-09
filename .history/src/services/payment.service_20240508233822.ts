
export async function generateVnpay(userId : string) {
    let amount = 0;
    let gift = "";
    if (payment.select == "1") {
        amount = 30000
        gift = "1 month"
    }
    else if (payment.select == "2") {
        amount = 150000
        gift = "6 months"
    }
    else if (payment.select == "3") {
        amount = 350000
        gift = "12 months"
    }

    let generatedOTP: string = otpGenerator.generate(10, {digits: false, upperCaseAlphabets: false, specialChars: false });
    let billId: string = uuidv5(payment.userId + "bill" + generatedOTP, uuidv5.URL);

    while (true) {
        const roomSelect =  await this.billRepository.findOne({
            where: {
                id: billId
            }
        });
        if (roomSelect) {
            generatedOTP = otpGenerator.generate(10, {digits: false, upperCaseAlphabets: false, specialChars: false });
            billId = uuidv5(payment.userId + "bill" + generatedOTP, uuidv5.URL);
        }
        else {
            break;
        }
    }

    const billTmp = this.billRepository.create({
        id: billId,
        userId: payment.userId,
        isComplete: false,
        typeGift: payment.select
    })

    await this.billRepository.save(billTmp);

    const ipAddr = req.headers['x-forwarded-for'];

    const tmnCode = "CGXZLS0Z";
    const secretKey = "XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN"
    const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const returnUrl = `http://103.155.161.116:3434/payment/validate/${payment.userId}/${billTmp.id}`

    const date = new Date();
    const createDate = format(date, 'yyyyMMddHHmmss');

    // Ví dụ: Định dạng ngày tháng theo yêu cầu 'HHmmss'
    const orderId = format(date, 'HHmmss');

    const currCode = 'VND';
    const vnp_Params: any = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = "vn";
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
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
