package com.ai.school.gen;

import java.text.SimpleDateFormat;


import com.ai.paas.client.utils.Md5Encoder;
import com.ai.school.pay.SignPayDetailVo;
import com.ai.school.pay.SignPayVo;


public class XmlGenerate {
    
	/**
	 * 构造原始支付请求XMl
	 * @param payVo
	 * @return
	 */
	protected String getPayXml(SignPayVo payVo) throws Exception{
			
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String requestTime = df.format(payVo.getRequestTime());
		String tradeTime = df.format(payVo.getTradeTime());
		String partnerVerifyCode = Md5Encoder.encode(payVo.getPartnerVerifyCode() + requestTime);
		
		String payXmlSource = 
	    		"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
	    		    +"<AIPAYTRADE>"
		    			+"<INFO>"
		    				+"<SERVICE_TYPE>"+payVo.getServiceType()+"</SERVICE_TYPE>"
		    				+"<CLIENT_IP>"+payVo.getClientIp()+"</CLIENT_IP>"
		    				+"<PARTNER_ID>"+payVo.getPartnerId()+"</PARTNER_ID>"
		    				+"<PARTNER_VERIFY_CODE>"+partnerVerifyCode+"</PARTNER_VERIFY_CODE>"
		    				+"<REQUEST_TIME>"+requestTime+"</REQUEST_TIME>"
		    				+"<SIGNED_MSG></SIGNED_MSG>"
		    			+"</INFO>"
	    				+"<BODY>"
	    					+"<TRANS_SUM>"
	    						+"<PAYER_PARTNER_ACCT_ID>"+payVo.getPayerPartnerAcctId()+"</PAYER_PARTNER_ACCT_ID>"
	    						+"<PAYER_PARTNER_ACCT_NAME>"+payVo.getPayerPartnerAcctName()+"</PAYER_PARTNER_ACCT_NAME>"
	    						+"<TRADE_TIME>"+tradeTime+"</TRADE_TIME>"
	    						+"<TOTAL_AMOUNT>"+payVo.getTotalAmount()+"</TOTAL_AMOUNT>"
	    						+"<TOTAL_RECORD>"+payVo.getTotalRecord()+"</TOTAL_RECORD>"
	    						+"<RETURN_URL>"+payVo.getReturnUrl()+"</RETURN_URL>"
	    						+"<NOTIFY_URL>"+payVo.getNotifyUrl()+"</NOTIFY_URL>"
	    						+"<ACCT_RESERVED_FIELD1>"+payVo.getAcctReservedField1()+"</ACCT_RESERVED_FIELD1>"
	    						+"<ACCT_RESERVED_FIELD2>"+payVo.getAcctReservedField2()+"</ACCT_RESERVED_FIELD2>"
	    						+"<ACCT_RESERVED_FIELD3>"+payVo.getAcctReservedField3()+"</ACCT_RESERVED_FIELD3>"
	    						+"<TRADE_REMARK>"+payVo.getTradeRemark()+"</TRADE_REMARK>"
	    					+"</TRANS_SUM>"
	    					+"<TRADE_DETAILS>";
	    			        for (SignPayDetailVo detail : payVo.getDetail()) {
	    			        	payXmlSource += "<TRANS_DETAIL>"
									+"<PARTNER_TRADE_NO>"+detail.getPartnerTradeNo()+"</PARTNER_TRADE_NO>"
									+"<PAY_AMOUNT>"+detail.getPayAmount()+"</PAY_AMOUNT>"
									+"<PAYEE_PARTNER_ACCT_ID>"+detail.getPayeePartnerAcctId()+"</PAYEE_PARTNER_ACCT_ID>"
								    +"<PAYEE_PARTNER_ACCT_NAME>"+detail.getPayeePartnerAcctName()+"</PAYEE_PARTNER_ACCT_NAME>"
									+"<PAYEE_CARD_TYPE>"+detail.getPayeeCardType()+"</PAYEE_CARD_TYPE>"
									+"<PAYEE_CARD_NO>"+detail.getPayeeCardNo()+"</PAYEE_CARD_NO>"
									+"<PAYEE_BANK_CODE>"+detail.getPayeeBankCode()+"</PAYEE_BANK_CODE>"
									+"<PAYEE_CARD_NAME>"+detail.getPayeeCardName()+"</PAYEE_CARD_NAME>"
									+"<PAYEE_CERT_TYPE>"+detail.getPayeeCertType()+"</PAYEE_CERT_TYPE>"
									+"<PAYEE_CERT_CODE>"+detail.getPayeeCertCode()+"</PAYEE_CERT_CODE>"
									+"<TRADE_RESERVED_FIELD1>"+detail.getTradeReservedField1()+"</TRADE_RESERVED_FIELD1>"
									+"<TRADE_RESERVED_FIELD2>"+detail.getTradeReservedField2()+"</TRADE_RESERVED_FIELD2>"
									+"<TRADE_RESERVED_FIELD3>"+detail.getTradeReservedField3()+"</TRADE_RESERVED_FIELD3>"
									+"<TRADE_RESERVED_FIELD4>"+detail.getTradeReservedField4()+"</TRADE_RESERVED_FIELD4>"
									+"<TRADE_RESERVED_FIELD5>"+detail.getTradeReservedField5()+"</TRADE_RESERVED_FIELD5>"
									+"<DETAIL_REMARK>"+detail.getDetailRemark()+"</DETAIL_REMARK>"
					           +"</TRANS_DETAIL>";
	    			        }
	    			        payXmlSource += "</TRADE_DETAILS>"
	    		        +"</BODY>"
	    		    +"</AIPAYTRADE>";
		
		return payXmlSource;
	}
	

}
