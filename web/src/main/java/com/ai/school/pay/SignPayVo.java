package com.ai.school.pay;

import java.util.Date;
import java.util.List;

public class SignPayVo {
	//请求头
    private String serviceType=""; //服务类型
    private String clientIp="";//客户端IP地址
    private String partnerId="";//合作方标识
    private String partnerVerifyCode="";//合作方身份校验码
    private Date requestTime;//请求时间
    
    //请求体
    private String payerPartnerAcctId="";//付款方账户标识
    private String payerPartnerAcctName="";//付款方账户名称
    private Date tradeTime;//交易时间
    private long totalAmount;//交易总金额
    private int totalRecord;//交易记录数
    private String returnUrl="";//支付结果返回链接地址
    private String notifyUrl="";//支付结果通知链接地址
    private String acctReservedField1="";//账户预留字段1
    private String acctReservedField2="";//账户预留字段2
    private String acctReservedField3="";//账户预留字段3
    private String tradeRemark="";//交易备注
    
    private List<SignPayDetailVo> detail;
    
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public String getClientIp() {
		return clientIp;
	}
	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}
	public String getPartnerId() {
		return partnerId;
	}
	public void setPartnerId(String partnerId) {
		this.partnerId = partnerId;
	}
	public String getPartnerVerifyCode() {
		return partnerVerifyCode;
	}
	public void setPartnerVerifyCode(String partnerVerifyCode) {
		this.partnerVerifyCode = partnerVerifyCode;
	}
	public Date getRequestTime() {
		return requestTime;
	}
	public void setRequestTime(Date requestTime) {
		this.requestTime = requestTime;
	}
	public String getPayerPartnerAcctId() {
		return payerPartnerAcctId;
	}
	public void setPayerPartnerAcctId(String payerPartnerAcctId) {
		this.payerPartnerAcctId = payerPartnerAcctId;
	}
	public String getPayerPartnerAcctName() {
		return payerPartnerAcctName;
	}
	public void setPayerPartnerAcctName(String payerPartnerAcctName) {
		this.payerPartnerAcctName = payerPartnerAcctName;
	}
	public Date getTradeTime() {
		return tradeTime;
	}
	public void setTradeTime(Date tradeTime) {
		this.tradeTime = tradeTime;
	}
	public long getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(long totalAmount) {
		this.totalAmount = totalAmount;
	}
	public int getTotalRecord() {
		return totalRecord;
	}
	public void setTotalRecord(int totalRecord) {
		this.totalRecord = totalRecord;
	}
	public String getReturnUrl() {
		return returnUrl;
	}
	public void setReturnUrl(String returnUrl) {
		this.returnUrl = returnUrl;
	}
	public String getNotifyUrl() {
		return notifyUrl;
	}
	public void setNotifyUrl(String notifyUrl) {
		this.notifyUrl = notifyUrl;
	}
	public String getAcctReservedField1() {
		return acctReservedField1;
	}
	public void setAcctReservedField1(String acctReservedField1) {
		this.acctReservedField1 = acctReservedField1;
	}
	public String getAcctReservedField2() {
		return acctReservedField2;
	}
	public void setAcctReservedField2(String acctReservedField2) {
		this.acctReservedField2 = acctReservedField2;
	}
	public String getAcctReservedField3() {
		return acctReservedField3;
	}
	public void setAcctReservedField3(String acctReservedField3) {
		this.acctReservedField3 = acctReservedField3;
	}
	public String getTradeRemark() {
		return tradeRemark;
	}
	public void setTradeRemark(String tradeRemark) {
		this.tradeRemark = tradeRemark;
	}
	public List<SignPayDetailVo> getDetail() {
		return detail;
	}
	public void setDetail(List<SignPayDetailVo> detail) {
		this.detail = detail;
	}
}
