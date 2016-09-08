package com.ai.school.util;

import com.ai.paas.client.PaasContextHolder;
import com.ai.paas.client.security.SHA1WithRSASignature;
import com.ai.paas.client.security.SignatureUtil;
import com.ai.paas.client.utils.CiperTools;
import com.ai.paas.client.utils.CommonTools;
import com.ai.school.gen.ReqMsgGenerate;
import com.ai.school.pay.SignPayDetailVo;
import com.ai.school.pay.SignPayVo;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by chengzheng on 16/9/7.
 */
public class GeneratePayMsg {
    /**
     * 生成支付报文
     * @param TJftOrderVo
     * @return
     * @throws Exception
     */
    public String generateJftPayPacket(Long orderCode) throws Exception {
        SignPayVo signPayVo = new SignPayVo();
        signPayVo.setServiceType("10"); //服务类型
        signPayVo.setClientIp("127.0.0.1");//客户端IP地址
        signPayVo.setPartnerId("1");//合作方标识
        signPayVo.setPartnerVerifyCode("E10ADC3949BA59ABBE56E057F20F883E");//合作方身份校验码
        signPayVo.setRequestTime(new Date());//请求时间
        //请求体
        signPayVo.setPayerPartnerAcctId("test");
        signPayVo.setPayerPartnerAcctName("test");
        signPayVo.setTradeTime(new Date());
        signPayVo.setTotalAmount(1);
        signPayVo.setTotalRecord(1);
        String returnUrl ="";
        returnUrl = "http://111.200.33.66:8080/jft-accept-web/payAction/jftPayResult.do?tradeId="+ orderCode;

        signPayVo.setReturnUrl(returnUrl);
        signPayVo.setNotifyUrl("http://baidu.com");
        signPayVo.setAcctReservedField1("");
        signPayVo.setAcctReservedField2("");
        signPayVo.setAcctReservedField3("");
        signPayVo.setTradeRemark("");
        //交易明细
        List<SignPayDetailVo> payDetail = new ArrayList<SignPayDetailVo>();
        SignPayDetailVo signPayDetailVo = new SignPayDetailVo();
        signPayDetailVo.setPartnerTradeNo(String.valueOf(orderCode));//合作方交易流水号
        signPayDetailVo.setPayAmount(1);//付款金额


        signPayDetailVo.setPayeePartnerAcctId("hongpay_merchant_test");//收款方账户标识
        signPayDetailVo.setPayeePartnerAcctName("亚信大学");//收款方账户名
        signPayDetailVo.setPayeeCardType("");//收款方卡类型
        signPayDetailVo.setPayeeCardNo("");//收款方卡号
        signPayDetailVo.setPayeeBankCode("");//收款方银行卡归属银行编码
        signPayDetailVo.setPayeeCardName("");//收款方开户名
        signPayDetailVo.setPayeeCertType("");//收款方证件类型
        signPayDetailVo.setPayeeCertCode("");//收款方证件号码
        signPayDetailVo.setTradeReservedField1("");//交易明细预留字段1
        signPayDetailVo.setTradeReservedField2("");//交易明细预留字段2
        signPayDetailVo.setTradeReservedField3("");//交易明细预留字段3
        signPayDetailVo.setTradeReservedField4("");//交易明细预留字段4
        signPayDetailVo.setTradeReservedField5("");//交易明细预留字段5
        signPayDetailVo.setDetailRemark("测试交学费");//备注
        payDetail.add(signPayDetailVo);
        signPayVo.setDetail(payDetail);
        //验证工具类
        ReqMsgGenerate reqMsgGenerate = new ReqMsgGenerate();
        //签名
        String signMsg = reqMsgGenerate.generatePayMsg(signPayVo);
        return signMsg;
    }


}
