package com.ai.school.pay;

public class SignPayNotifyResDetailVo {
    //明细
    private String tradeNo;//支付平台交易流水号
    private String partnerTradeNo="";//合作方交易流水号
    private String resultCode;//合作方返回结果
    
	public String getTradeNo() {
		return tradeNo;
	}
	public void setTradeNo(String tradeNo) {
		this.tradeNo = tradeNo;
	}
	public String getPartnerTradeNo() {
		return partnerTradeNo;
	}
	public void setPartnerTradeNo(String partnerTradeNo) {
		this.partnerTradeNo = partnerTradeNo;
	}
	public String getResultCode() {
		return resultCode;
	}
	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}
}
